import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import NavBar from "../islands/NavBar.tsx";
import { db } from "../api/root.tsx";
import type { Quiz } from "../utils/quizData.ts";

interface WrongAnswerWithQuiz {
    id: string;
    quiz_id: string;
    your_answer: number;
    created_at: string;
    quiz: Quiz | null;
}

export default define.page(async function WrongAnswersPage() {
    // SSR: Fetch wrong answers from database
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
            q.correct_answer as q_correct_answer,
            q.explanation as q_explanation
        FROM wrong_answers wa
        LEFT JOIN quiz q ON wa.quiz_id = q.id
        ORDER BY wa.created_at DESC
        LIMIT 100
    `);
    console.log(wrongAnswersResult.rows);
    const wrongAnswers: WrongAnswerWithQuiz[] = wrongAnswersResult.rows.map(
        (row) => {
            const quiz = row.q_id
                ? {
                    id: row.q_id as string,
                    type: row.q_type as string,
                    level: row.q_level as string | undefined,
                    question: row.q_question as string,
                    options: JSON.parse(row.q_options as string) as string[],
                    answer: row.q_correct_answer as number,
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
                style="padding-top: env(safe-area-inset-top); padding-bottom: env(safe-area-inset-bottom);"
            >
                {/* Navigation Bar */}
                <NavBar currentPath="/wronganswers" />

                {/* Main Content */}
                <div class="flex-1 overflow-y-auto">
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
                                    {wrongAnswers.map((wrongAnswer) => (
                                        <WrongAnswerCard
                                            wrongAnswer={wrongAnswer}
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

function WrongAnswerCard(
    { wrongAnswer }: { wrongAnswer: WrongAnswerWithQuiz },
) {
    const optionLabels = ["A", "B", "C", "D"];
    return (
        <div
            key={wrongAnswer.id}
            class="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
        >
            {wrongAnswer.quiz
                ? (
                    <>
                        {/* Card Header */}
                        <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <span
                                    class={`px-3 py-1 rounded-full text-white text-sm font-semibold bg-gradient-to-r ${
                                        getTypeColor(
                                            wrongAnswer
                                                .quiz
                                                .type,
                                        )
                                    }`}
                                >
                                    {getTypeLabel(
                                        wrongAnswer
                                            .quiz
                                            .type,
                                    )}
                                </span>
                                {wrongAnswer
                                    .quiz
                                    .level && (
                                    <span class="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-semibold">
                                        {wrongAnswer
                                            .quiz
                                            .level}
                                    </span>
                                )}
                            </div>
                            <span class="text-sm text-gray-500">
                                {formatDate(
                                    wrongAnswer
                                        .created_at,
                                )}
                            </span>
                        </div>

                        {/* Card Body */}
                        <div class="px-5 py-5">
                            {/* Question */}
                            <div class="mb-4">
                                <h3 class="text-lg font-semibold text-gray-800 mb-3">
                                    {wrongAnswer
                                        .quiz
                                        .question}
                                </h3>
                            </div>

                            {/* Options */}
                            <div class="space-y-2 mb-4">
                                {wrongAnswer
                                    .quiz
                                    .options
                                    .map(
                                        (
                                            option,
                                            index,
                                        ) => {
                                            const isCorrect = index ===
                                                wrongAnswer
                                                    .quiz!
                                                    .answer;
                                            const isYourAnswer = index ===
                                                wrongAnswer
                                                    .your_answer;

                                            return (
                                                <div
                                                    key={index}
                                                    class={`px-4 py-3 rounded-xl border-2 transition-all ${
                                                        isCorrect
                                                            ? "bg-green-50 border-green-500"
                                                            : isYourAnswer
                                                            ? "bg-red-50 border-red-500"
                                                            : "bg-gray-50 border-gray-200"
                                                    }`}
                                                >
                                                    <div class="flex items-center gap-3">
                                                        <span
                                                            class={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold ${
                                                                isCorrect
                                                                    ? "bg-green-500 text-white"
                                                                    : isYourAnswer
                                                                    ? "bg-red-500 text-white"
                                                                    : "bg-gray-300 text-gray-700"
                                                            }`}
                                                        >
                                                            {optionLabels[
                                                                index
                                                            ]}
                                                        </span>
                                                        <span
                                                            class={`flex-1 ${
                                                                isCorrect ||
                                                                    isYourAnswer
                                                                    ? "font-semibold"
                                                                    : ""
                                                            }`}
                                                        >
                                                            {option}
                                                        </span>
                                                        {isCorrect &&
                                                            (
                                                                <span class="text-green-600 text-sm font-semibold">
                                                                    ✓ 正确答案
                                                                </span>
                                                            )}
                                                        {isYourAnswer &&
                                                            !isCorrect &&
                                                            (
                                                                <span class="text-red-600 text-sm font-semibold">
                                                                    ✗ 你的答案
                                                                </span>
                                                            )}
                                                    </div>
                                                </div>
                                            );
                                        },
                                    )}
                            </div>

                            {/* Explanation */}
                            <div class="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl">
                                <div class="flex items-start gap-2">
                                    <span class="text-blue-600 font-semibold text-sm mt-0.5">
                                        💡
                                    </span>
                                    <div>
                                        <p class="text-sm font-semibold text-blue-900 mb-1">
                                            解析
                                        </p>
                                        <p class="text-sm text-blue-800">
                                            {wrongAnswer
                                                .quiz
                                                .explanation}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
                : (
                    <div class="px-5 py-4">
                        <p class="text-gray-500 text-sm">
                            题目数据不可用 (ID: {wrongAnswer
                                .quiz_id})
                        </p>
                    </div>
                )}
        </div>
    );
}

const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
        vocabulary: "词汇",
        grammar: "语法",
        reading: "阅读",
        kanji: "汉字",
    };
    return labels[type] || type;
};

const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
        vocabulary: "from-blue-500 to-blue-600",
        grammar: "from-green-500 to-green-600",
        reading: "from-purple-500 to-purple-600",
        kanji: "from-orange-500 to-orange-600",
    };
    return colors[type] || "from-gray-500 to-gray-600";
};

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "刚刚";
    if (diffMins < 60) return `${diffMins}分钟前`;
    if (diffHours < 24) return `${diffHours}小时前`;
    if (diffDays < 7) return `${diffDays}天前`;

    return date.toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
};
