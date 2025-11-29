import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import NavBar from "../islands/NavBar.tsx";
import { db } from "../api/root.tsx";
import { WrongAnswerCard } from "../components/QuizCard.tsx";

export default define.page(async function WrongAnswersPage() {
    const wrongAnswersResult = await db.execute(`
        SELECT
            wa.id,
            wa.quiz_id,
            wa.your_answer,
            wa.created_at,
            q.id as q_id,
            q.type as q_type,
            q.level as q_level,
            q.question as q_question,
            q.options as q_options,
            q.answer as q_answer,
            q.explanation as q_explanation
        FROM wrong_answers wa
        LEFT JOIN quizzes q ON wa.quiz_id = q.id
        ORDER BY wa.created_at DESC
        LIMIT 100
    `);
    console.log(wrongAnswersResult.rows);
    const wrongAnswers = wrongAnswersResult.rows.map(
        (row) => {
            const quiz = row.q_id
                ? {
                    id: row.q_id as string,
                    type: row.q_type as string,
                    level: row.q_level as string | undefined,
                    question: row.q_question as string,
                    options: JSON.parse(row.q_options as string) as string[],
                    answer: row.q_answer as number,
                    explanation: row.q_explanation as string,
                }
                : null;

            return {
                id: row.id as string,
                quiz_id: row.quiz_id as string,
                your_answer: row.your_answer as number,
                created_at: row.created_at as string,
                quiz,
            };
        },
    );

    return (
        <>
            <Head>
                <title>错题集 - 外语邪修</title>
                <meta
                    name="description"
                    content="查看你的错题记录，复习错误的题目以提高学习效果。"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
                />
            </Head>

            <div
                class="min-h-screen w-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col"
                style="padding-top: env(safe-area-inset-top); padding-bottom: env(safe-area-inset-bottom); height: 100vh; max-height: -webkit-fill-available;"
            >
                {/* Navigation Bar */}
                <NavBar currentPath="/wronganswers" />

                {/* Main Content */}
                <div
                    class="flex-1 overflow-y-auto"
                    style="-webkit-overflow-scrolling: touch; position: relative;"
                >
                    <div class="max-w-4xl mx-auto px-4 py-6 pb-safe">
                        {/* Header */}
                        <div class="mb-6">
                            <h1 class="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                                📚 错题集
                            </h1>
                            <p class="text-gray-600">
                                共{" "}
                                <span class="font-semibold text-purple-600">
                                    {wrongAnswers.length}
                                </span>{" "}
                                道错题
                            </p>
                        </div>

                        {/* Wrong Answers List */}
                        {wrongAnswers.length === 0
                            ? (
                                <div class="bg-white rounded-2xl shadow-md p-12 text-center">
                                    <div class="text-6xl mb-4">🎉</div>
                                    <h2 class="text-2xl font-bold text-gray-800 mb-2">
                                        太棒了！
                                    </h2>
                                    <p class="text-gray-600">
                                        你还没有错题记录，继续保持！
                                    </p>
                                    <a
                                        href="/quiz"
                                        class="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                                    >
                                        开始测验
                                    </a>
                                </div>
                            )
                            : (
                                <div class="space-y-4">
                                    {wrongAnswers.map((attempt) => (
                                        <WrongAnswerCard
                                            attempt={attempt}
                                            quiz={quiz}
                                        />
                                    ))}
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </>
    );
});
