import { useComputed, useSignal } from "@preact/signals";
import {
    ALL_KANA,
    generateWrongKanaOptions,
    generateWrongOptions,
    getKanaByRow,
    getRandomKana,
    KANA_ROWS,
} from "../_data/kana.ts";

type PracticeMode = "recognize" | "type" | "chart";
type KanaType = "hiragana" | "katakana";
type QuestionType = "kana-to-romaji" | "romaji-to-kana";

interface Question {
    kana: string;
    romaji: string;
    options: string[];
    correctAnswer: string;
    type: QuestionType;
}

export function KanaPractice() {
    const mode = useSignal<PracticeMode>("chart");
    const kanaType = useSignal<KanaType>("hiragana");
    const selectedRow = useSignal<string | null>(null);

    // Quiz mode states
    const currentQuestion = useSignal<Question | null>(null);
    const selectedAnswer = useSignal<string | null>(null);
    const showResult = useSignal(false);
    const score = useSignal(0);
    const questionCount = useSignal(0);
    const userInput = useSignal("");

    // Generate new question
    const generateQuestion = () => {
        const kanas = selectedRow.value
            ? getKanaByRow(selectedRow.value)
            : getRandomKana(50);

        if (kanas.length === 0) return;

        const randomKana = kanas[Math.floor(Math.random() * kanas.length)];
        const questionType: QuestionType = Math.random() > 0.5
            ? "kana-to-romaji"
            : "romaji-to-kana";

        let question: Question;

        if (questionType === "kana-to-romaji") {
            const wrongOptions = generateWrongOptions(randomKana.romaji, 3);
            const allOptions = [randomKana.romaji, ...wrongOptions].sort(() =>
                Math.random() - 0.5
            );

            question = {
                kana: randomKana[kanaType.value],
                romaji: randomKana.romaji,
                options: allOptions,
                correctAnswer: randomKana.romaji,
                type: questionType,
            };
        } else {
            const wrongOptions = generateWrongKanaOptions(
                randomKana[kanaType.value],
                kanaType.value,
                3,
            );
            const allOptions = [randomKana[kanaType.value], ...wrongOptions]
                .sort(() => Math.random() - 0.5);

            question = {
                kana: randomKana[kanaType.value],
                romaji: randomKana.romaji,
                options: allOptions,
                correctAnswer: randomKana[kanaType.value],
                type: questionType,
            };
        }

        currentQuestion.value = question;
        selectedAnswer.value = null;
        showResult.value = false;
        userInput.value = "";
    };

    // Start quiz
    const startQuiz = () => {
        mode.value = "recognize";
        score.value = 0;
        questionCount.value = 0;
        generateQuestion();
    };

    // Start typing practice
    const startTyping = () => {
        mode.value = "type";
        score.value = 0;
        questionCount.value = 0;
        generateQuestion();
    };

    // Check answer (for recognize mode)
    const checkAnswer = (answer: string) => {
        if (!currentQuestion.value || showResult.value) return;

        selectedAnswer.value = answer;
        showResult.value = true;

        if (answer === currentQuestion.value.correctAnswer) {
            score.value++;
        }
        questionCount.value++;
    };

    // Check typed answer
    const checkTypedAnswer = () => {
        if (!currentQuestion.value || showResult.value) return;

        const isCorrect =
            userInput.value.toLowerCase().trim() ===
                currentQuestion.value.correctAnswer.toLowerCase();
        showResult.value = true;

        if (isCorrect) {
            score.value++;
        }
        questionCount.value++;
    };

    // Next question
    const nextQuestion = () => {
        generateQuestion();
    };

    // Back to menu
    const backToMenu = () => {
        mode.value = "chart";
        currentQuestion.value = null;
        selectedAnswer.value = null;
        showResult.value = false;
    };

    return (
        <div class="space-y-6">
            {/* Mode Selection */}
            {mode.value === "chart" && (
                <>
                    {/* Kana Type Toggle */}
                    <div class="bg-white rounded-2xl shadow-lg p-6">
                        <h2 class="text-xl font-bold text-gray-800 mb-4">
                            选择假名类型
                        </h2>
                        <div class="flex gap-4">
                            <button
                                onClick={() => kanaType.value = "hiragana"}
                                class={`flex-1 py-4 px-6 rounded-xl font-bold text-lg transition-all ${
                                    kanaType.value === "hiragana"
                                        ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg scale-105"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                            >
                                <div class="text-3xl mb-2">あ</div>
                                <div>平假名</div>
                            </button>
                            <button
                                onClick={() => kanaType.value = "katakana"}
                                class={`flex-1 py-4 px-6 rounded-xl font-bold text-lg transition-all ${
                                    kanaType.value === "katakana"
                                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                            >
                                <div class="text-3xl mb-2">ア</div>
                                <div>片假名</div>
                            </button>
                        </div>
                    </div>

                    {/* Practice Mode Selection */}
                    <div class="bg-white rounded-2xl shadow-lg p-6">
                        <h2 class="text-xl font-bold text-gray-800 mb-4">
                            选择练习模式
                        </h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button
                                onClick={startQuiz}
                                class="p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 hover:border-green-400 transition-all hover:shadow-lg group"
                            >
                                <div class="text-4xl mb-3 group-hover:scale-110 transition-transform">
                                    📝
                                </div>
                                <div class="text-lg font-bold text-gray-800 mb-2">
                                    认读练习
                                </div>
                                <div class="text-sm text-gray-600">
                                    看假名选择正确的罗马音
                                </div>
                            </button>

                            <button
                                onClick={startTyping}
                                class="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 hover:border-blue-400 transition-all hover:shadow-lg group"
                            >
                                <div class="text-4xl mb-3 group-hover:scale-110 transition-transform">
                                    ⌨️
                                </div>
                                <div class="text-lg font-bold text-gray-800 mb-2">
                                    打字练习
                                </div>
                                <div class="text-sm text-gray-600">
                                    看假名输入对应的罗马音
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Kana Chart */}
                    <div class="bg-white rounded-2xl shadow-lg p-6">
                        <h2 class="text-xl font-bold text-gray-800 mb-4">
                            五十音图表
                        </h2>
                        <div class="space-y-4">
                            {KANA_ROWS.map((row) => {
                                const kanas = getKanaByRow(row);
                                if (kanas.length === 0) return null;

                                return (
                                    <div
                                        key={row}
                                        class="border border-gray-200 rounded-lg p-4"
                                    >
                                        <div class="text-sm font-semibold text-gray-600 mb-3">
                                            {row}
                                        </div>
                                        <div class="grid grid-cols-5 gap-2">
                                            {kanas.map((kana) => (
                                                <div
                                                    key={kana.romaji}
                                                    class="text-center p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
                                                >
                                                    <div class="text-2xl font-bold text-gray-800 mb-1">
                                                        {kanaType.value ===
                                                                "hiragana"
                                                            ? kana.hiragana
                                                            : kana.katakana}
                                                    </div>
                                                    <div class="text-xs text-gray-500">
                                                        {kana.romaji}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}

            {/* Recognize Mode */}
            {mode.value === "recognize" && currentQuestion.value && (
                <div class="space-y-6">
                    {/* Score Display */}
                    <div class="bg-white rounded-2xl shadow-lg p-4">
                        <div class="flex justify-between items-center">
                            <div class="text-sm text-gray-600">
                                题目:{" "}
                                <span class="font-bold text-blue-600">
                                    {questionCount.value}
                                </span>
                            </div>
                            <div class="text-sm text-gray-600">
                                得分:{" "}
                                <span class="font-bold text-green-600">
                                    {score.value}
                                </span>{" "}
                                / {questionCount.value}
                            </div>
                            <button
                                onClick={backToMenu}
                                class="text-sm text-gray-600 hover:text-gray-800 font-medium"
                            >
                                返回菜单
                            </button>
                        </div>
                    </div>

                    {/* Question Card */}
                    <div class="bg-white rounded-2xl shadow-lg p-8">
                        <div class="text-center mb-8">
                            <div class="text-sm text-gray-500 mb-4">
                                {currentQuestion.value.type === "kana-to-romaji"
                                    ? "这个假名的读音是？"
                                    : "选择对应的假名"}
                            </div>
                            <div class="text-8xl font-bold text-gray-800 mb-4">
                                {currentQuestion.value.type === "kana-to-romaji"
                                    ? currentQuestion.value.kana
                                    : currentQuestion.value.romaji}
                            </div>
                        </div>

                        {/* Options */}
                        <div class="grid grid-cols-2 gap-4 max-w-md mx-auto">
                            {currentQuestion.value.options.map(
                                (option, index) => {
                                    const isSelected =
                                        selectedAnswer.value === option;
                                    const isCorrect =
                                        option ===
                                            currentQuestion.value!
                                                .correctAnswer;
                                    const showCorrectness = showResult.value;

                                    let buttonClass =
                                        "p-6 rounded-xl font-bold text-xl transition-all border-2 ";

                                    if (showCorrectness) {
                                        if (isCorrect) {
                                            buttonClass +=
                                                "bg-green-50 border-green-500 text-green-700";
                                        } else if (isSelected && !isCorrect) {
                                            buttonClass +=
                                                "bg-red-50 border-red-500 text-red-700";
                                        } else {
                                            buttonClass +=
                                                "bg-gray-50 border-gray-300 text-gray-400";
                                        }
                                    } else {
                                        buttonClass += isSelected
                                            ? "bg-blue-100 border-blue-500 text-blue-700 scale-105"
                                            : "bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400";
                                    }

                                    return (
                                        <button
                                            key={index}
                                            onClick={() => checkAnswer(option)}
                                            disabled={showResult.value}
                                            class={buttonClass}
                                        >
                                            {option}
                                        </button>
                                    );
                                },
                            )}
                        </div>

                        {/* Result */}
                        {showResult.value && (
                            <div class="mt-8">
                                <div
                                    class={`text-center p-6 rounded-xl ${
                                        selectedAnswer.value ===
                                                currentQuestion.value
                                                    .correctAnswer
                                            ? "bg-green-50 border-2 border-green-200"
                                            : "bg-red-50 border-2 border-red-200"
                                    }`}
                                >
                                    <div class="text-4xl mb-3">
                                        {selectedAnswer.value ===
                                                currentQuestion.value
                                                    .correctAnswer
                                            ? "🎉"
                                            : "💪"}
                                    </div>
                                    <div
                                        class={`text-xl font-bold mb-2 ${
                                            selectedAnswer.value ===
                                                    currentQuestion.value
                                                        .correctAnswer
                                                ? "text-green-700"
                                                : "text-red-700"
                                        }`}
                                    >
                                        {selectedAnswer.value ===
                                                currentQuestion.value
                                                    .correctAnswer
                                            ? "正确！"
                                            : "再接再厉！"}
                                    </div>
                                    <div class="text-gray-600 mb-4">
                                        {currentQuestion.value.kana} ={" "}
                                        {currentQuestion.value.romaji}
                                    </div>
                                    <button
                                        onClick={nextQuestion}
                                        class="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                                    >
                                        下一题 →
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Type Mode */}
            {mode.value === "type" && currentQuestion.value && (
                <div class="space-y-6">
                    {/* Score Display */}
                    <div class="bg-white rounded-2xl shadow-lg p-4">
                        <div class="flex justify-between items-center">
                            <div class="text-sm text-gray-600">
                                题目:{" "}
                                <span class="font-bold text-blue-600">
                                    {questionCount.value}
                                </span>
                            </div>
                            <div class="text-sm text-gray-600">
                                得分:{" "}
                                <span class="font-bold text-green-600">
                                    {score.value}
                                </span>{" "}
                                / {questionCount.value}
                            </div>
                            <button
                                onClick={backToMenu}
                                class="text-sm text-gray-600 hover:text-gray-800 font-medium"
                            >
                                返回菜单
                            </button>
                        </div>
                    </div>

                    {/* Question Card */}
                    <div class="bg-white rounded-2xl shadow-lg p-8">
                        <div class="text-center mb-8">
                            <div class="text-sm text-gray-500 mb-4">
                                输入这个假名的罗马音
                            </div>
                            <div class="text-8xl font-bold text-gray-800 mb-8">
                                {currentQuestion.value.kana}
                            </div>
                        </div>

                        {/* Input */}
                        {!showResult.value && (
                            <div class="max-w-md mx-auto">
                                <input
                                    type="text"
                                    value={userInput.value}
                                    onInput={(e) =>
                                        userInput.value =
                                            (e.target as HTMLInputElement)
                                                .value}
                                    onKeyPress={(e) => {
                                        if (e.key === "Enter") {
                                            checkTypedAnswer();
                                        }
                                    }}
                                    placeholder="输入罗马音..."
                                    class="w-full px-6 py-4 text-2xl text-center border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                                    autoFocus
                                />
                                <button
                                    onClick={checkTypedAnswer}
                                    class="w-full mt-4 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all"
                                >
                                    提交答案
                                </button>
                            </div>
                        )}

                        {/* Result */}
                        {showResult.value && (
                            <div class="mt-8">
                                <div
                                    class={`text-center p-6 rounded-xl ${
                                        userInput.value.toLowerCase().trim() ===
                                                currentQuestion.value
                                                    .correctAnswer.toLowerCase()
                                            ? "bg-green-50 border-2 border-green-200"
                                            : "bg-red-50 border-2 border-red-200"
                                    }`}
                                >
                                    <div class="text-4xl mb-3">
                                        {userInput.value.toLowerCase()
                                                .trim() ===
                                                currentQuestion.value
                                                    .correctAnswer.toLowerCase()
                                            ? "🎉"
                                            : "💪"}
                                    </div>
                                    <div
                                        class={`text-xl font-bold mb-2 ${
                                            userInput.value.toLowerCase()
                                                    .trim() ===
                                                    currentQuestion.value
                                                        .correctAnswer
                                                        .toLowerCase()
                                                ? "text-green-700"
                                                : "text-red-700"
                                        }`}
                                    >
                                        {userInput.value.toLowerCase()
                                                .trim() ===
                                                currentQuestion.value
                                                    .correctAnswer.toLowerCase()
                                            ? "正确！"
                                            : "再接再厉！"}
                                    </div>
                                    {userInput.value.toLowerCase().trim() !==
                                            currentQuestion.value.correctAnswer
                                                .toLowerCase() && (
                                        <div class="text-gray-600 mb-2">
                                            你的答案:{" "}
                                            <span class="font-bold text-red-600">
                                                {userInput.value}
                                            </span>
                                        </div>
                                    )}
                                    <div class="text-gray-600 mb-4">
                                        正确答案: {currentQuestion.value.kana} =
                                        {" "}
                                        <span class="font-bold text-green-600">
                                            {currentQuestion.value.romaji}
                                        </span>
                                    </div>
                                    <button
                                        onClick={nextQuestion}
                                        class="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                                    >
                                        下一题 →
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
