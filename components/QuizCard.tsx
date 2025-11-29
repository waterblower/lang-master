import type { Quiz, QuizAttempt } from "../utils/quizData.ts";

export interface QuizCardProps {
    quiz: Quiz;
    onSelect: (index: number) => void;
}

export function QuizCardNormal({ quiz, onSelect }: QuizCardProps) {
    const optionLabels = ["A", "B", "C", "D"];

    return (
        <div class="bg-white rounded-2xl shadow-md overflow-hidden">
            {/* Card Header */}
            <CardHeader quiz={quiz} />
            {/* Card Body */}
            <div class="px-5 py-5">
                {/* Question */}
                <div class="mb-4">
                    <h3 class="text-lg font-semibold text-gray-800 mb-3">
                        {quiz.question}
                    </h3>
                </div>

                {/* Options */}
                <div class="space-y-2 mb-4">
                    {quiz.options.map((option, index) => {
                        return (
                            <button
                                key={index}
                                class={`flex w-full
                                  px-4 py-3 rounded-xl border-2 transition-all hover:bg-green-50      active:bg-green-50 bg-gray-50
                                hover:border-green-500 border-gray-200
                                hover:cursor-pointer
                                touch-manipulation`}
                                onClick={() => {
                                    onSelect(index);
                                }}
                            >
                                <div class="flex items-center gap-3">
                                    <span
                                        class={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold bg-green-500 text-white`}
                                    >
                                        {optionLabels[index]}
                                    </span>
                                    <span
                                        class={`flex-1`}
                                    >
                                        {option}
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export function CorrectAnswerCard({ quiz }: { quiz: Quiz }) {
    const optionLabels = ["A", "B", "C", "D"];

    return (
        <div class="bg-white rounded-2xl shadow-md overflow-hidden">
            <CardHeader quiz={quiz} />

            {/* Card Body */}
            <div class="px-5 py-5">
                {/* Question */}
                <div class="mb-4">
                    <h3 class="text-lg font-semibold text-gray-800 mb-3">
                        {quiz.question}
                    </h3>
                </div>

                {/* Options */}
                <div class="space-y-2 mb-4">
                    {quiz.options.map((option, index) => {
                        const isCorrect = index === quiz.answer;

                        return (
                            <div
                                key={index}
                                class={`px-4 py-3 rounded-xl border-2 transition-all ${
                                    isCorrect
                                        ? "bg-green-50 border-green-500"
                                        : "bg-gray-50 border-gray-200"
                                }`}
                            >
                                <div class="flex items-center gap-3">
                                    <span
                                        class={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold ${
                                            isCorrect
                                                ? "bg-green-500 text-white"
                                                : "bg-gray-300 text-gray-700"
                                        }`}
                                    >
                                        {optionLabels[index]}
                                    </span>
                                    <span
                                        class={`flex-1 ${
                                            isCorrect ? "font-semibold" : ""
                                        }`}
                                    >
                                        {option}
                                    </span>
                                    {isCorrect && (
                                        <span class="text-green-600 text-sm font-semibold">
                                            ✓ 正确答案
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Explanation */}
                <Explanation explanation={quiz.explanation} />
            </div>
        </div>
    );
}

function CardHeader({ quiz }: { quiz: Quiz }) {
    return (
        <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <span
                    class={`px-3 py-1 rounded-full text-white text-sm font-semibold bg-gradient-to-r ${
                        getTypeColor(quiz.type)
                    }`}
                >
                    {getTypeLabel(quiz.type)}
                </span>
                {quiz.level && (
                    <span class="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-semibold">
                        {quiz.level}
                    </span>
                )}
            </div>
        </div>
    );
}

export function WrongAnswerCard(
    { attempt, quiz }: { attempt: QuizAttempt; quiz: Quiz },
) {
    const optionLabels = ["A", "B", "C", "D"];
    return (
        <div class="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
            {/* Card Header */}
            <div class="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <span
                        class={`px-3 py-1 rounded-full text-white text-sm font-semibold bg-gradient-to-r ${
                            getTypeColor(
                                quiz
                                    .type,
                            )
                        }`}
                    >
                        {getTypeLabel(
                            quiz
                                .type,
                        )}
                    </span>
                    {quiz
                        .level && (
                        <span class="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-semibold">
                            {quiz
                                .level}
                        </span>
                    )}
                </div>
                <span class="text-sm text-gray-500">
                    {formatDate(
                        attempt.created_at,
                    )}
                </span>
            </div>

            {/* Card Body */}
            <div class="px-5 py-5">
                {/* Question */}
                <div class="mb-4">
                    <h3 class="text-lg font-semibold text-gray-800 mb-3">
                        {quiz
                            .question}
                    </h3>
                </div>

                {/* Options */}
                <div class="space-y-2 mb-4">
                    {quiz
                        .options
                        .map(
                            (
                                option,
                                index,
                            ) => {
                                const isCorrect = index ===
                                    quiz
                                        .answer;
                                const isYourAnswer = index ===
                                    attempt.your_answer;

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
                <Explanation
                    explanation={quiz.explanation}
                />
            </div>
        </div>
    );
}

function Explanation({ explanation }: { explanation: string }) {
    return (
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
                        {explanation}
                    </p>
                </div>
            </div>
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

const formatDate = (date: Date) => {
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
