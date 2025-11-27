import { define } from "../utils.ts";
import {
    getRandomQuestions,
    Quiz,
    QuizSchema,
    WrongAnswer,
    WrongAnswerSchema,
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

const db_url = Deno.env.get("db_url");
if (!db_url) throw new Error("db_url not in env");

export const db = createClient({
    url: db_url,
    authToken: Deno.env.get("db_token"),
});

export const appRouter = router({
    get_quizes: publicProcedure
        .query(async () => {
            return getRandomQuestions();
        }),
    record_wrong_answer: publicProcedure
        .input(WrongAnswerSchema)
        .mutation(async ({ input }) => {
            await record_wrong_answer(input);
        }),
    save_quiz: publicProcedure
        .input(QuizSchema)
        .mutation(async ({ input }) => {
            await save_quiz(input);
        }),
});

export async function record_wrong_answer(input: WrongAnswer) {
    await db.execute(
        `INSERT INTO wrong_answers (id, quiz_id, your_answer, created_at) VALUES (:id, :quiz_id, :your_answer, :created_at)`,
        input,
    );
}

export async function save_quiz(input: Quiz) {
    await db.execute(
        `INSERT INTO quiz (id, type, level, question, options, correct_answer, explanation)
         VALUES (:id, :type, :level, :question, :options, :correct_answer, :explanation)
         ON CONFLICT(id) DO UPDATE SET
            type = :type,
            level = :level,
            question = :question,
            options = :options,
            correct_answer = :correct_answer,
            explanation = :explanation`,
        {
            id: input.id,
            type: input.type,
            level: input.level ?? null,
            question: input.question,
            options: JSON.stringify(input.options),
            correct_answer: input.answer,
            explanation: input.explanation,
        },
    );
}

export type tRPC_Router = typeof appRouter;
