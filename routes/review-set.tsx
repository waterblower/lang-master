import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import NavBar from "../islands/NavBar.tsx";
import { list_quiz_attempts } from "../api/root.tsx";
import { WrongAnswerCard } from "../components/QuizCard.tsx";
import { ErrorView } from "../components/ErrorView.tsx";

export default define.page(async function WrongAnswersPage() {
    const attempts = await list_quiz_attempts({ user_is_correct: false });
    if (attempts instanceof Error) {
        return ErrorView(attempts);
    }

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
                                    {attempts.length}
                                </span>{" "}
                                道错题
                            </p>
                        </div>

                        {/* Wrong Answers List */}
                        {attempts.length === 0
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
                                        href="/quizzes"
                                        class="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                                    >
                                        开始测验
                                    </a>
                                </div>
                            )
                            : (
                                <div class="space-y-4">
                                    {attempts.map((attempt) => (
                                        <WrongAnswerCard
                                            attempt={attempt}
                                            quiz={attempt.quiz}
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
