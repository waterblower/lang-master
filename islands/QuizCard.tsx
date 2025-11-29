import { useSignal } from "@preact/signals";
import type { Quiz } from "../utils/quizData.ts";
import {
    CorrectAnswerCard,
    QuizCardNormal,
    WrongAnswerCard,
} from "../components/QuizCard.tsx";
import { api } from "../trpc-client.ts";
import { ulid } from "@std/ulid";

export function QuizCard({ quiz }: { quiz: Quiz }) {
    const user_answer = useSignal<number | undefined>(undefined);

    if (user_answer.value === undefined) {
        return (
            <QuizCardNormal
                quiz={quiz}
                onSelect={async (index) => {
                    user_answer.value = index;
                    if (user_answer.value != quiz.answer) {
                        await api.record_wrong_answer.mutate({
                            id: ulid(),
                            quiz_id: quiz.id,
                            your_answer: user_answer.value,
                            created_at: new Date().toISOString(),
                        });
                    }
                }}
            />
        );
    } else if (user_answer.value == quiz.answer) {
        return <CorrectAnswerCard quiz={quiz} />;
    } else {
        return (
            <WrongAnswerCard
                quiz={quiz}
                user_answer={user_answer.value}
                created_at={new Date()}
            />
        );
    }
}
