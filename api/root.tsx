import { define } from "../utils.ts";
import {
    getRandomQuestions,
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
});

export async function record_wrong_answer(input: WrongAnswer) {
    await db.execute(
        `INSERT INTO wrong_answers (id, quiz_id, your_answer, created_at) VALUES (:id, :quiz_id, :your_answer, :created_at)`,
        input,
    );
}

export type tRPC_Router = typeof appRouter;
