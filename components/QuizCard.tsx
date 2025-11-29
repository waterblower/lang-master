import type { Quiz } from "../utils/quizData.ts";

export interface QuizCardProps {
    quiz: Quiz;
}

export function QuizCard({ quiz }: QuizCardProps) {
    const optionLabels = ["A", "B", "C", "D"];

    return (
        <div class="bg-white rounded-2xl shadow-md overflow-hidden">
            {/* Card Header */}
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
                            <div
                                key={index}
                                class={`px-4 py-3 rounded-xl border-2 transition-all hover:bg-green-50      active:bg-green-50 bg-gray-50
                                hover:border-green-500 border-gray-200
                                hover:cursor-pointer
                                touch-manipulation`}
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
                            </div>
                        );
                    })}
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
