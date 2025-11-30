import { db } from "./root.tsx";
import { Quiz, QuizAttempt } from "./types.ts";

export async function save_quiz(input: Quiz) {
    await db.execute(
        `INSERT INTO quizzes (id, type, level, question, options, answer, explanation)
         VALUES (:id, :type, :level, :question, :options, :answer, :explanation)
         ON CONFLICT(id) DO UPDATE SET
            type = :type,
            level = :level,
            question = :question,
            options = :options,
            answer = :answer,
            explanation = :explanation`,
        {
            ...input,
            options: JSON.stringify(input.options),
            level: input.level ?? null,
        },
    );
}

export async function record_quiz_attempt(input: QuizAttempt) {
    await db.execute(
        `INSERT INTO quiz_attempts
          (id, quiz_id, user_choice, created_at)
        VALUES
          (:id, :quiz_id, :user_choice, :created_at)`,
        {
            ...input,
            created_at: input.created_at.toISOString(),
        },
    );
}
