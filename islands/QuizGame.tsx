import { useComputed, useSignal } from "@preact/signals";
import type { Quiz } from "../utils/quizData.ts";
import QuizCardV2 from "./QuizCardV2.tsx";

interface QuizGameProps {
    questions: Quiz[];
}

export default function QuizGame({ questions }: QuizGameProps) {
    const currentQuestionIndex = useSignal(0);
    const selectedAnswer = useSignal<number | null>(null);
    const answeredQuestions = useSignal<number[]>([]);
    const score = useSignal(0);
    const showExplanation = useSignal(false);
    const game_state = useSignal<"start" | "playing" | "completed">("start");

    const currentQuestion = useComputed(
        () => questions[currentQuestionIndex.value],
    );

    const progress = useComputed(
        () => ((currentQuestionIndex.value + 1) / questions.length) * 100,
    );

    const handleStartQuiz = () => {
        game_state.value = "playing";
    };

    const handleAnswerSelect = (answerIndex: number) => {
        if (showExplanation.value) return;
        selectedAnswer.value = answerIndex;
    };

    const handleSubmitAnswer = () => {
        if (selectedAnswer.value === null) return;

        const isCorrect = selectedAnswer.value ===
            currentQuestion.value.answer;

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
            game_state.value = "completed";
        }
    };

    const handleRestartQuiz = () => {
        currentQuestionIndex.value = 0;
        selectedAnswer.value = null;
        answeredQuestions.value = [];
        score.value = 0;
        showExplanation.value = false;
        game_state.value = "start";
    };

    // Instructions Screen
    if (game_state.value == "start") {
        return InstructionCard({ startQuiz: handleStartQuiz });
    }

    // Results Screen
    if (game_state.value == "completed") {
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
                                class="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600  text-base font-bold rounded-xl shadow-lg active:scale-95 transition-transform"
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

    // Quiz Screen
    return <QuizCardV2 data={currentQuestion.value}></QuizCardV2>;
}

function InstructionCard({ startQuiz }: { startQuiz: () => void }) {
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
                        <div class="flex-shrink-0 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center  text-xs font-bold">
                            10
                        </div>
                        <p class="text-xs text-gray-700 pt-0.5">
                            随机题目，涵盖词汇、语法、汉字和阅读
                        </p>
                    </div>
                    <div class="flex items-start gap-2 bg-pink-50 rounded-xl p-2.5">
                        <div class="flex-shrink-0 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center  text-xs font-bold">
                            70
                        </div>
                        <p class="text-xs text-gray-700 pt-0.5">
                            及格分数线（10题中答对7题）
                        </p>
                    </div>
                    <div class="flex items-start gap-2 bg-blue-50 rounded-xl p-2.5">
                        <div class="flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center  text-xs font-bold">
                            ✓
                        </div>
                        <p class="text-xs text-gray-700 pt-0.5">
                            每题都有详细解释，帮助您学习
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={startQuiz}
                    class="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600  text-base font-bold rounded-xl shadow-lg active:scale-95 transition-transform"
                >
                    开始测验 🚀
                </button>
            </div>
        </div>
    );
}
