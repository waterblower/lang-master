import { useSignal } from "@preact/signals";
import type { Quiz } from "../utils/quizData.ts";
import {
    CorrectAnswerCard,
    QuizCardNormal,
    WrongAnswerCard,
} from "../components/QuizCard.tsx";

export function QuizCard({ quiz }: { quiz: Quiz }) {
    const user_answer = useSignal<number | undefined>(undefined);

    if (user_answer.value === undefined) {
        return <QuizCardNormal quiz={quiz} user_answer={user_answer} />;
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
