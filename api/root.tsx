import { define } from "../utils.ts";
import { getRandomQuestions } from "../utils/quizData.ts";

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

import * as z from "zod";

const kv = await Deno.openKv();

export const appRouter = router({
    get_quizes: publicProcedure
        .query(async () => {
            return getRandomQuestions();
        }),
    answer_quiz: publicProcedure
        .input(z.object({ id: z.string(), answer: z.boolean() }))
        .mutation(async ({ input }) => {
        }),
});
export type tRPC_Router = typeof appRouter;
