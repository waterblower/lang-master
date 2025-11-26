import type { Quiz } from "../utils/quizData.ts";

interface QuizCardProps {
    currentQuestion: Quiz;
    currentQuestionIndex: number;
    totalQuestions: number;
    selectedAnswer: number | null;
    showExplanation: boolean;
    score: number;
    answeredQuestions: number;
    progress: number;
    onAnswerSelect: (answerIndex: number) => void;
    onSubmitAnswer: () => void;
    onNextQuestion: () => void;
}

export default function QuizCard({
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    selectedAnswer,
    showExplanation,
    score,
    answeredQuestions,
    progress,
    onAnswerSelect,
    onSubmitAnswer,
    onNextQuestion,
}: QuizCardProps) {
    const getAnswerButtonClass = (index: number) => {
        const baseClass =
            "w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 active:scale-95";

        if (!showExplanation) {
            if (selectedAnswer === index) {
                return `${baseClass} bg-gradient-to-r from-purple-50 to-pink-50 border-purple-400 shadow-md`;
            }
            return `${baseClass} bg-white/90 border-gray-200 active:border-purple-300`;
        }

        if (index === currentQuestion.correctAnswer) {
            return `${baseClass} bg-gradient-to-r from-green-50 to-emerald-50 border-green-400 shadow-md`;
        }

        if (selectedAnswer === index) {
            return `${baseClass} bg-gradient-to-r from-red-50 to-pink-50 border-red-400 shadow-md`;
        }

        return `${baseClass} bg-gray-50/50 border-gray-200`;
    };

    const getTypeConfig = (type: Quiz["type"]) => {
        switch (type) {
            case "vocabulary":
                return {
                    bg: "bg-gradient-to-r from-purple-500 to-purple-600",
                    name: "词汇",
                    emoji: "📚",
                };
            case "grammar":
                return {
                    bg: "bg-gradient-to-r from-blue-500 to-blue-600",
                    name: "语法",
                    emoji: "✍️",
                };
            case "reading":
                return {
                    bg: "bg-gradient-to-r from-green-500 to-green-600",
                    name: "阅读",
                    emoji: "📖",
                };
            case "kanji":
                return {
                    bg: "bg-gradient-to-r from-orange-500 to-orange-600",
                    name: "汉字",
                    emoji: "漢",
                };
            default:
                return {
                    bg: "bg-gradient-to-r from-gray-500 to-gray-600",
                    name: "问题",
                    emoji: "❓",
                };
        }
    };

    const typeConfig = getTypeConfig(currentQuestion.type);

    return (
        <div class="h-full flex flex-col">
            {/* Progress Bar */}
            <div class="mb-2 flex-shrink-0">
                <div class="flex justify-between items-center mb-2">
                    <div class="flex items-center gap-1.5">
                        <span class="text-xs font-bold text-gray-700">
                            {currentQuestionIndex + 1}/{totalQuestions}
                        </span>
                    </div>
                    <div class="flex items-center gap-1.5 bg-white/90 px-2.5 py-1 rounded-full shadow-sm">
                        <span class="text-xs text-gray-600">得分:</span>
                        <span class="text-xs font-bold text-purple-600">
                            {score}/{answeredQuestions}
                        </span>
                    </div>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden shadow-inner">
                    <div
                        class="h-2 transition-all duration-500 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Quiz Card - Scrollable */}
            <div class="flex-1 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-100 flex flex-col overflow-hidden">
                <div
                    class="flex-1 overflow-y-auto overscroll-contain p-3"
                    style="-webkit-overflow-scrolling: touch;"
                >
                    {/* Question Type Badge */}
                    <div class="mb-3 flex-shrink-0">
                        <div
                            class={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full  font-bold text-xs shadow-md ${typeConfig.bg}`}
                        >
                            <span class="text-sm">{typeConfig.emoji}</span>
                            <span>{typeConfig.name}</span>
                        </div>
                    </div>

                    {/* Question */}
                    <h2 class="text-base font-bold text-gray-800 mb-3 leading-relaxed whitespace-pre-line flex-shrink-0">
                        {currentQuestion.question}
                    </h2>

                    {/* Answer Options */}
                    <div class="space-y-2 mb-3 flex-shrink-0">
                        {currentQuestion.options.map((option, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => onAnswerSelect(index)}
                                disabled={showExplanation}
                                class={getAnswerButtonClass(index)}
                            >
                                <div class="flex items-center gap-3">
                                    <div
                                        class={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-lg font-bold text-xs transition-all ${
                                            selectedAnswer === index &&
                                                !showExplanation
                                                ? "bg-gradient-to-br from-purple-500 to-pink-500  shadow-md"
                                                : showExplanation &&
                                                        index ===
                                                            currentQuestion
                                                                .correctAnswer
                                                ? "bg-gradient-to-br from-green-500 to-emerald-500  shadow-md"
                                                : showExplanation &&
                                                        selectedAnswer ===
                                                            index
                                                ? "bg-gradient-to-br from-red-500 to-pink-500  shadow-md"
                                                : "bg-gray-100 text-gray-700"
                                        }`}
                                    >
                                        {String.fromCharCode(65 + index)}
                                    </div>
                                    <span class="text-sm font-medium text-gray-800 flex-1">
                                        {option}
                                    </span>
                                    {showExplanation &&
                                        index ===
                                            currentQuestion
                                                .correctAnswer &&
                                        (
                                            <span class="text-base flex-shrink-0">
                                                ✓
                                            </span>
                                        )}
                                    {showExplanation &&
                                        selectedAnswer === index &&
                                        index !==
                                            currentQuestion
                                                .correctAnswer &&
                                        (
                                            <span class="text-base flex-shrink-0">
                                                ✗
                                            </span>
                                        )}
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Explanation */}
                    {showExplanation &&
                        currentQuestion.explanation && (
                        <div
                            class={`p-3 rounded-xl border-l-4 flex-shrink-0 ${
                                selectedAnswer ===
                                        currentQuestion.correctAnswer
                                    ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-500"
                                    : "bg-gradient-to-r from-red-50 to-pink-50 border-red-500"
                            }`}
                        >
                            <div class="flex items-start gap-2">
                                <div
                                    class={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                                        selectedAnswer ===
                                                currentQuestion
                                                    .correctAnswer
                                            ? "bg-gradient-to-br from-green-500 to-emerald-500"
                                            : "bg-gradient-to-br from-red-500 to-pink-500"
                                    }`}
                                >
                                    <span class="text-xl">
                                        {selectedAnswer ===
                                                currentQuestion
                                                    .correctAnswer
                                            ? "✅"
                                            : "❌"}
                                    </span>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="font-bold text-sm text-gray-800 mb-0.5">
                                        {selectedAnswer ===
                                                currentQuestion
                                                    .correctAnswer
                                            ? "正确！"
                                            : "错误"}
                                    </p>
                                    <p class="text-xs text-gray-700 leading-relaxed break-words">
                                        {currentQuestion.explanation}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Buttons - Fixed at bottom */}
                <div class="p-3 border-t border-gray-100 flex-shrink-0 bg-white/50">
                    {!showExplanation
                        ? (
                            <button
                                type="button"
                                onClick={onSubmitAnswer}
                                disabled={selectedAnswer === null}
                                class={`w-full px-6 py-2.5 text-sm font-bold rounded-xl shadow-lg transition-all ${
                                    selectedAnswer === null
                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        : "bg-gradient-to-r from-purple-600 to-pink-600  active:scale-95"
                                }`}
                            >
                                提交答案 →
                            </button>
                        )
                        : (
                            <button
                                type="button"
                                onClick={onNextQuestion}
                                class="w-full px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600  text-sm font-bold rounded-xl shadow-lg active:scale-95 transition-all"
                            >
                                {currentQuestionIndex <
                                        totalQuestions - 1
                                    ? "下一题 →"
                                    : "查看结果 🎯"}
                            </button>
                        )}
                </div>
            </div>
        </div>
    );
}
