// Japanese N5 Level Quiz Data
import questions from "./quiz.json" with { type: "json" };
import zod from "zod";

export const WrongAnswerSchema = zod.object({
    id: zod.ulid(),
    quiz_id: zod.string(),
    your_answer: zod.number().min(0),
    created_at: zod.iso.datetime(),
});

export type WrongAnswer = zod.infer<typeof WrongAnswerSchema>;

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
