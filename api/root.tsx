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
            await record_wrong_answer(input);
        }),
    save_quiz: publicProcedure
        .input(QuizSchema)
        .mutation(async ({ input }) => {
            await save_quiz(input);
        }),
});

export async function record_wrong_answer(input: QuizAttempt) {
    await db.execute(
        `INSERT INTO wrong_answers (id, quiz_id, your_answer, created_at) VALUES (:id, :quiz_id, :your_answer, :created_at)`,
        input,
    );
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
