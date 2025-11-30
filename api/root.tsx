import { define } from "../utils.ts";
import {
    Quiz,
    QuizAttempt,
    QuizAttemptSchema,
    QuizDatabaseSchema,
    QuizSchema,
} from "../api/types.ts";

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
import { record_quiz_attempt, save_quiz } from "./write.ts";
import { get_unique_failed_attempted_quizzes } from "./read.ts";

const db_url = Deno.env.get("db_url");
if (!db_url) throw new Error("db_url not in env");

export const db = createClient({
    url: db_url,
    authToken: Deno.env.get("db_token"),
});

export const appRouter = router({
    get_quizes: publicProcedure
        .input(z.object({
            total: z.number().min(0).max(100),
            include_passed_quiz: z.boolean().optional().default(true),
        }))
        .query(async (args) => {
            return get_random_quiz(args.input);
        }),
    record_attempt: publicProcedure
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

export async function get_quiz_attempts(
    input: { offset?: number; limit?: number; user_is_correct?: boolean },
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
         JOIN quizzes q ON qa.quiz_id = q.id` +
            ` WHERE 1=1` +
            (input.user_is_correct == true
                ? ` AND qa.user_choice = q.answer`
                : input.user_is_correct == false
                ? ` AND qa.user_choice != q.answer`
                : ``) +
            ` ORDER BY qa.created_at DESC
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

export async function get_random_quiz(
    input: {
        total: number;
        include_passed_quiz?: boolean;
        include_failed_attempts?: number;
    },
): Promise<Quiz[] | Error> {
    const include_passed = input.include_passed_quiz ?? true;

    let query: string;
    if (include_passed) {
        query = `SELECT *
                 FROM quizzes
                 ORDER BY RANDOM()
                 LIMIT :total`;
    } else {
        query = `SELECT *
                 FROM quizzes
                 WHERE id NOT IN (
                     SELECT DISTINCT qa.quiz_id
                     FROM quiz_attempts qa
                     JOIN quizzes q ON qa.quiz_id = q.id
                     WHERE qa.user_choice = q.answer
                 )
                 ORDER BY RANDOM()
                 LIMIT :total`;
    }

    const result = await db.execute(query, {
        total: input.total,
    });

    const quizzes = [];
    for (const row of result.rows) {
        const quiz = QuizDatabaseSchema.safeParse(row);
        if (!quiz.success) {
            return quiz.error;
        }
        quizzes.push(quiz.data);
    }

    if (input.include_failed_attempts && input.include_failed_attempts > 0) {
        const failed_quizzes = await get_unique_failed_attempted_quizzes({
            count: input.include_failed_attempts,
        });
        if (failed_quizzes instanceof Error) {
            return failed_quizzes;
        }
        for (const quiz of failed_quizzes) {
            quizzes.push(quiz);
        }
    }
    return quizzes;
}

export type tRPC_Router = typeof appRouter;

export function group_attempts_by_quiz(
    attempts: (QuizAttempt & { quiz: Quiz })[],
) {
    const failed_quizzes = new Map<
        string,
        { quiz: Quiz; attemtps: QuizAttempt[] }
    >();
    for (const attempt of attempts) {
        const quizId = attempt.quiz.id;
        if (!failed_quizzes.has(quizId)) {
            failed_quizzes.set(quizId, { quiz: attempt.quiz, attemtps: [] });
        }
        failed_quizzes.get(quizId)!.attemtps.push(attempt);
    }
    return failed_quizzes;
}
