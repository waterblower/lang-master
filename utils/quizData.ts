// Japanese N5 Level Quiz Data
import zod from "zod";

export const QuizAttemptSchema = zod.object({
    id: zod.ulid(),
    quiz_id: zod.string(),
    your_answer: zod.number().min(0),
    created_at: zod.iso.datetime(),
});

export type QuizAttempt = zod.infer<typeof QuizAttemptSchema>;

// Schema for Quiz objects in memory (with options as array)
export const QuizSchema = zod.object({
    id: zod.ulid(),
    type: zod.enum(["vocabulary", "grammar", "reading", "kanji"]),
    level: zod.enum(["N5", "N4", "N3", "N2", "N1"]).optional().nullable(),
    question: zod.string(),
    options: zod.array(zod.string()),
    answer: zod.number().min(0).max(3),
    explanation: zod.string(),
});

export type Quiz = zod.infer<typeof QuizSchema>;

// Schema for Quiz records from database (with options as JSON string)
// This will parse the JSON string and validate it as an array
export const QuizDatabaseSchema = zod.object({
    id: zod.ulid(),
    type: zod.enum(["vocabulary", "grammar", "reading", "kanji"]),
    level: zod.enum(["N5", "N4", "N3", "N2", "N1"]).optional().nullable(),
    question: zod.string(),
    options: zod.string().transform((str, ctx) => {
        try {
            const parsed = JSON.parse(str);
            // Validate it's an array of strings
            if (!Array.isArray(parsed)) {
                ctx.addIssue({
                    code: "custom",
                    message: "Options must be an array",
                });
                return zod.NEVER;
            }
            if (!parsed.every((item) => typeof item === "string")) {
                ctx.addIssue({
                    code: "custom",
                    message: "All options must be strings",
                });
                return zod.NEVER;
            }
            return parsed as string[];
        } catch (e) {
            ctx.addIssue({
                code: "custom",
                message: "Invalid JSON string for options",
            });
            return zod.NEVER;
        }
    }),
    answer: zod.number().min(0).max(3),
    explanation: zod.string(),
});

export type QuizDb = zod.infer<typeof QuizDatabaseSchema>;
