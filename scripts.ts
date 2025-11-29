import { save_quiz } from "./api/root.tsx";
import questions from "./utils/quiz.json" with { type: "json" };
import { Quiz } from "./utils/quizData.ts";
import { ulid } from "@std/ulid";

for (const q of questions as Quiz[]) {
    q.id = ulid();
    await save_quiz(q as Quiz);
}
