import { db } from "./root.tsx";
import { Quiz, QuizDatabaseSchema } from "./types.ts";

export async function get_unique_failed_attempted_quizzes(
    input: { count: number },
): Promise<Quiz[] | Error> {
    const result = await db.execute(
        `SELECT DISTINCT q.*
         FROM quizzes q
         JOIN quiz_attempts qa ON q.id = qa.quiz_id
         WHERE qa.user_choice != q.answer
         ORDER BY RANDOM()
         LIMIT :count`,
        {
            count: input.count,
        },
    );

    const quizzes: Quiz[] = [];
    for (const row of result.rows) {
        const quiz = QuizDatabaseSchema.safeParse(row);
        if (!quiz.success) {
            return quiz.error;
        }
        quizzes.push(quiz.data);
    }

    return quizzes;
}
