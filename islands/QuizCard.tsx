import { useSignal } from "@preact/signals";
import type { Quiz, QuizAttempt } from "../api/types.ts";
import {
    CorrectAnswerCard,
    QuizCardNormal,
    WrongAnswerCard,
} from "../components/QuizCard.tsx";
import { api } from "../trpc-client.ts";
import { ulid } from "@std/ulid";

export function QuizCard({ quiz }: { quiz: Quiz }) {
    const user_attempt = useSignal<QuizAttempt | undefined>(undefined);

    if (user_attempt.value === undefined) {
        return (
            <QuizCardNormal
                quiz={quiz}
                onSelect={async (index) => {
                    user_attempt.value = {
                        id: ulid(),
                        quiz_id: quiz.id,
                        user_choice: index,
                        created_at: new Date(),
                    };
                    if (index != quiz.answer) {
                        await api.record_wrong_answer.mutate(
                            {
                                ...user_attempt.value,
                                created_at: user_attempt.value.created_at
                                    .toISOString(),
                            },
                        );
                    }
                }}
            />
        );
    } else if (user_attempt.value.user_choice == quiz.answer) {
        return <CorrectAnswerCard quiz={quiz} />;
    } else {
        return (
            <WrongAnswerCard
                quiz={quiz}
                attempt={user_attempt.value}
            />
        );
    }
}
