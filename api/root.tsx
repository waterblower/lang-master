import { define } from "../utils.ts";
import {
    Quiz,
    QuizAttempt,
    QuizAttemptSchema,
    QuizDatabaseSchema,
    QuizSchema,
} from "../utils/quizData.ts";

export const handler = define.handlers({
    GET(ctx) {
        const name = ctx.params.name;
        return new Response(
            `Hello, ${name.charAt(0).toUpperCase() + name.slice(1)}!`,
        );
    },
});

import { initTRPC } from "@trpc/server";

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.create();

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;

import { createClient } from "@libsql/client";
import { z } from "zod";

const db_url = Deno.env.get("db_url");
if (!db_url) throw new Error("db_url not in env");

export const db = createClient({
    url: db_url,
    authToken: Deno.env.get("db_token"),
});

export const appRouter = router({
    get_quizes: publicProcedure
        .input(z.object({
            count: z.number().min(0).max(100),
        }))
        .query(async (args) => {
            return get_random_quiz(args.input.count);
        }),
    record_wrong_answer: publicProcedure
        .input(QuizAttemptSchema)
        .mutation(async ({ input }) => {
            await record_quiz_attempt(input);
        }),
    save_quiz: publicProcedure
        .input(QuizSchema)
        .mutation(async ({ input }) => {
            await save_quiz(input);
        }),
});

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

export async function list_quiz_attempts(
    input: { offset?: number; limit?: number },
): Promise<(QuizAttempt & { quiz: Quiz })[] | Error> {
    const result = await db.execute(
        `SELECT
            qa.id,
            qa.quiz_id,
            qa.user_choice,
            qa.created_at,
            q.id as quiz_id,
            q.type as quiz_type,
            q.level as quiz_level,
            q.question as quiz_question,
            q.options as quiz_options,
            q.answer as quiz_answer,
            q.explanation as quiz_explanation
         FROM quiz_attempts qa
         JOIN quizzes q ON qa.quiz_id = q.id
         ORDER BY qa.created_at DESC
         LIMIT :limit
         OFFSET :offset`,
        {
            limit: input.limit ?? 100,
            offset: input.offset ?? 0,
        },
    );

    const attempts: (QuizAttempt & { quiz: Quiz })[] = [];
    for (const row of result.rows) {
        const attempt: QuizAttempt & { quiz: Quiz } = {
            id: row.id as string,
            quiz_id: row.quiz_id as string,
            user_choice: row.user_choice as number,
            created_at: new Date(row.created_at as string),
            quiz: QuizSchema.parse({
                id: row.quiz_id as string,
                type: row.quiz_type as string,
                level: row.quiz_level as string | undefined,
                question: row.quiz_question as string,
                options: JSON.parse(row.quiz_options as string),
                answer: row.quiz_answer as number,
                explanation: row.quiz_explanation as string,
            }),
        };
        attempts.push(attempt);
    }
    return attempts;
}

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

export async function get_random_quiz(count: number): Promise<Quiz[] | Error> {
    const result = await db.execute(
        `SELECT *
         FROM quizzes
         ORDER BY RANDOM()
         LIMIT ?`,
        [count],
    );

    const quizzes = [];
    for (const row of result.rows) {
        console.log(row);
        const quiz = QuizDatabaseSchema.safeParse(row);
        if (!quiz.success) {
            return quiz.error;
        }
        quizzes.push(quiz.data);
    }
    return quizzes;
}

export type tRPC_Router = typeof appRouter;
