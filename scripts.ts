import { save_quiz } from "./api/root.tsx";
import { questions } from "./utils/quizData.ts";

for (const q of questions) {
    await save_quiz(q);
}
