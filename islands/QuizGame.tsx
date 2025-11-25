import { useComputed, useSignal } from "@preact/signals";
import type { QuizQuestion } from "../utils/quizData.ts";

interface QuizGameProps {
    questions: QuizQuestion[];
}

export default function QuizGame({ questions }: QuizGameProps) {
    const currentQuestionIndex = useSignal(0);
    const selectedAnswer = useSignal<number | null>(null);
    const answeredQuestions = useSignal<number[]>([]);
    const score = useSignal(0);
    const showExplanation = useSignal(false);
    const quizCompleted = useSignal(false);
    const showInstructions = useSignal(true);

    const currentQuestion = useComputed(
        () => questions[currentQuestionIndex.value],
    );

    const progress = useComputed(
        () => ((currentQuestionIndex.value + 1) / questions.length) * 100,
    );

    const handleStartQuiz = () => {
        showInstructions.value = false;
    };

    const handleAnswerSelect = (answerIndex: number) => {
        if (showExplanation.value) return;
        selectedAnswer.value = answerIndex;
    };

    const handleSubmitAnswer = () => {
        if (selectedAnswer.value === null) return;

        const isCorrect = selectedAnswer.value ===
            currentQuestion.value.correctAnswer;

        if (isCorrect) {
            score.value += 1;
        }

        answeredQuestions.value = [
            ...answeredQuestions.value,
            currentQuestionIndex.value,
        ];
        showExplanation.value = true;
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex.value < questions.length - 1) {
            currentQuestionIndex.value += 1;
            selectedAnswer.value = null;
            showExplanation.value = false;
        } else {
            quizCompleted.value = true;
        }
    };

    const handleRestartQuiz = () => {
        currentQuestionIndex.value = 0;
        selectedAnswer.value = null;
        answeredQuestions.value = [];
        score.value = 0;
        showExplanation.value = false;
        quizCompleted.value = false;
        showInstructions.value = true;
    };

    const getAnswerButtonClass = (index: number) => {
        const baseClass =
            "w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 active:scale-95";

        if (!showExplanation.value) {
            if (selectedAnswer.value === index) {
                return `${baseClass} bg-gradient-to-r from-purple-50 to-pink-50 border-purple-400 shadow-md`;
            }
            return `${baseClass} bg-white/90 border-gray-200 active:border-purple-300`;
        }

        if (index === currentQuestion.value.correctAnswer) {
            return `${baseClass} bg-gradient-to-r from-green-50 to-emerald-50 border-green-400 shadow-md`;
        }

        if (selectedAnswer.value === index) {
            return `${baseClass} bg-gradient-to-r from-red-50 to-pink-50 border-red-400 shadow-md`;
        }

        return `${baseClass} bg-gray-50/50 border-gray-200`;
    };

    const getTypeConfig = (type: QuizQuestion["type"]) => {
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

    // Instructions Screen
    if (showInstructions.value) {
        return (
            <div class="min-h-full flex items-center justify-center py-4 overflow-y-auto">
                <div class="w-full max-w-lg mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 border border-purple-100 my-auto">
                    <div class="text-center mb-4">
                        <div class="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                            <span class="text-3xl">🇯🇵</span>
                        </div>
                        <h2 class="text-xl font-bold text-gray-800 mb-1">
                            日语N5测验
                        </h2>
                        <p class="text-sm text-gray-600">
                            JLPT N5 练习测试
                        </p>
                    </div>

                    <div class="space-y-2 mb-4">
                        <div class="flex items-start gap-2 bg-purple-50 rounded-xl p-2.5">
                            <div class="flex-shrink-0 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                10
                            </div>
                            <p class="text-xs text-gray-700 pt-0.5">
                                随机题目，涵盖词汇、语法、汉字和阅读
                            </p>
                        </div>
                        <div class="flex items-start gap-2 bg-pink-50 rounded-xl p-2.5">
                            <div class="flex-shrink-0 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                70
                            </div>
                            <p class="text-xs text-gray-700 pt-0.5">
                                及格分数线（10题中答对7题）
                            </p>
                        </div>
                        <div class="flex items-start gap-2 bg-blue-50 rounded-xl p-2.5">
                            <div class="flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                ✓
                            </div>
                            <p class="text-xs text-gray-700 pt-0.5">
                                每题都有详细解释，帮助您学习
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleStartQuiz}
                        class="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-base font-bold rounded-xl shadow-lg active:scale-95 transition-transform"
                    >
                        开始测验 🚀
                    </button>
                </div>
            </div>
        );
    }

    // Results Screen
    if (quizCompleted.value) {
        const percentage = Math.round((score.value / questions.length) * 100);
        const isPassed = percentage >= 70;

        return (
            <div class="min-h-full flex items-center justify-center overflow-y-auto py-4">
                <div class="w-full max-w-lg mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 border border-purple-100 my-auto">
                    <div class="text-center">
                        <div
                            class={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 ${
                                isPassed
                                    ? "bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg shadow-green-200"
                                    : "bg-gradient-to-br from-orange-400 to-amber-500 shadow-lg shadow-orange-200"
                            }`}
                        >
                            <span class="text-4xl">
                                {isPassed ? "🎉" : "📚"}
                            </span>
                        </div>

                        <h2 class="text-xl font-bold text-gray-800 mb-1">
                            {isPassed ? "恭喜你！" : "继续加油！"}
                        </h2>
                        <p class="text-sm text-gray-600 mb-4">
                            {isPassed
                                ? "おめでとうございます！"
                                : "もう少し練習しましょう！"}
                        </p>

                        <div class="bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 rounded-2xl p-4 mb-4">
                            <div class="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-1">
                                {score.value}/{questions.length}
                            </div>

                            <div class="text-xl font-bold text-gray-700 mb-3">
                                {percentage}% 正确率
                            </div>

                            <div class="grid grid-cols-3 gap-2">
                                <div class="bg-white/90 rounded-xl p-2">
                                    <div class="text-xs text-gray-600 mb-0.5">
                                        正确
                                    </div>
                                    <div class="text-xl font-bold text-green-600">
                                        {score.value}
                                    </div>
                                </div>
                                <div class="bg-white/90 rounded-xl p-2">
                                    <div class="text-xs text-gray-600 mb-0.5">
                                        错误
                                    </div>
                                    <div class="text-xl font-bold text-red-600">
                                        {questions.length - score.value}
                                    </div>
                                </div>
                                <div class="bg-white/90 rounded-xl p-2">
                                    <div class="text-xs text-gray-600 mb-0.5">
                                        及格
                                    </div>
                                    <div class="text-xl font-bold text-orange-600">
                                        {Math.ceil(questions.length * 0.7)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-col gap-2">
                            <button
                                type="button"
                                onClick={handleRestartQuiz}
                                class="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-base font-bold rounded-xl shadow-lg active:scale-95 transition-transform"
                            >
                                🔄 再试一次
                            </button>
                            <a href="/" class="block">
                                <button
                                    type="button"
                                    class="w-full px-6 py-3 bg-white text-gray-800 border-2 border-gray-300 text-base font-bold rounded-xl shadow-md active:scale-95 transition-transform"
                                >
                                    🏠 返回首页
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const typeConfig = getTypeConfig(currentQuestion.value.type);

    // Quiz Screen
    return (
        <div class="h-full flex flex-col">
            {/* Progress Bar */}
            <div class="mb-2 flex-shrink-0">
                <div class="flex justify-between items-center mb-2">
                    <div class="flex items-center gap-1.5">
                        <span class="text-xs font-bold text-gray-700">
                            {currentQuestionIndex.value + 1}/{questions.length}
                        </span>
                    </div>
                    <div class="flex items-center gap-1.5 bg-white/90 px-2.5 py-1 rounded-full shadow-sm">
                        <span class="text-xs text-gray-600">得分:</span>
                        <span class="text-xs font-bold text-purple-600">
                            {score.value}/{answeredQuestions.value.length}
                        </span>
                    </div>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden shadow-inner">
                    <div
                        class="h-2 transition-all duration-500 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"
                        style={{ width: `${progress.value}%` }}
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
                            class={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white font-bold text-xs shadow-md ${typeConfig.bg}`}
                        >
                            <span class="text-sm">{typeConfig.emoji}</span>
                            <span>{typeConfig.name}</span>
                        </div>
                    </div>

                    {/* Question */}
                    <h2 class="text-base font-bold text-gray-800 mb-3 leading-relaxed whitespace-pre-line flex-shrink-0">
                        {currentQuestion.value.question}
                    </h2>

                    {/* Answer Options */}
                    <div class="space-y-2 mb-3 flex-shrink-0">
                        {currentQuestion.value.options.map((option, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => handleAnswerSelect(index)}
                                disabled={showExplanation.value}
                                class={getAnswerButtonClass(index)}
                            >
                                <div class="flex items-center gap-3">
                                    <div
                                        class={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-lg font-bold text-xs transition-all ${
                                            selectedAnswer.value === index &&
                                                !showExplanation.value
                                                ? "bg-gradient-to-br from-purple-500 to-pink-500  shadow-md"
                                                : showExplanation.value &&
                                                        index ===
                                                            currentQuestion
                                                                .value
                                                                .correctAnswer
                                                ? "bg-gradient-to-br from-green-500 to-emerald-500  shadow-md"
                                                : showExplanation.value &&
                                                        selectedAnswer.value ===
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
                                    {showExplanation.value &&
                                        index ===
                                            currentQuestion.value
                                                .correctAnswer &&
                                        (
                                            <span class="text-base flex-shrink-0">
                                                ✓
                                            </span>
                                        )}
                                    {showExplanation.value &&
                                        selectedAnswer.value === index &&
                                        index !==
                                            currentQuestion.value
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
                    {showExplanation.value &&
                        currentQuestion.value.explanation && (
                        <div
                            class={`p-3 rounded-xl border-l-4 flex-shrink-0 ${
                                selectedAnswer.value ===
                                        currentQuestion.value.correctAnswer
                                    ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-500"
                                    : "bg-gradient-to-r from-red-50 to-pink-50 border-red-500"
                            }`}
                        >
                            <div class="flex items-start gap-2">
                                <div
                                    class={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                                        selectedAnswer.value ===
                                                currentQuestion.value
                                                    .correctAnswer
                                            ? "bg-gradient-to-br from-green-500 to-emerald-500"
                                            : "bg-gradient-to-br from-red-500 to-pink-500"
                                    }`}
                                >
                                    <span class="text-xl">
                                        {selectedAnswer.value ===
                                                currentQuestion.value
                                                    .correctAnswer
                                            ? "✅"
                                            : "❌"}
                                    </span>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="font-bold text-sm text-gray-800 mb-0.5">
                                        {selectedAnswer.value ===
                                                currentQuestion.value
                                                    .correctAnswer
                                            ? "正确！"
                                            : "错误"}
                                    </p>
                                    <p class="text-xs text-gray-700 leading-relaxed break-words">
                                        {currentQuestion.value.explanation}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Buttons - Fixed at bottom */}
                <div class="p-3 border-t border-gray-100 flex-shrink-0 bg-white/50">
                    {!showExplanation.value
                        ? (
                            <button
                                type="button"
                                onClick={handleSubmitAnswer}
                                disabled={selectedAnswer.value === null}
                                class={`w-full px-6 py-2.5 text-sm font-bold rounded-xl shadow-lg transition-all ${
                                    selectedAnswer.value === null
                                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                        : "bg-gradient-to-r from-purple-600 to-pink-600 text-white active:scale-95"
                                }`}
                            >
                                提交答案 →
                            </button>
                        )
                        : (
                            <button
                                type="button"
                                onClick={handleNextQuestion}
                                class="w-full px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold rounded-xl shadow-lg active:scale-95 transition-all"
                            >
                                {currentQuestionIndex.value <
                                        questions.length - 1
                                    ? "下一题 →"
                                    : "查看结果 🎯"}
                            </button>
                        )}
                </div>
            </div>
        </div>
    );
}
