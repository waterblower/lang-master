import { save_quiz } from "./api/root.tsx";
import questions from "./_data/quiz.json" with { type: "json" };
import { quizzes } from "./_data/2.ts";
import { Quiz } from "./api/types.ts";
import { ulid } from "@std/ulid";

for (const q of quizzes) {
    q.id = ulid();
    await save_quiz(q);
}
