import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import NavBar from "../islands/NavBar.tsx";
import { get_random_quiz } from "../api/root.tsx";
import { QuizCard } from "../islands/QuizCard.tsx";
import { ErrorView } from "../components/ErrorView.tsx";

export default define.page(async function QuizzesPage() {
    // Parse and transform quizzes using QuizDbSchema
    const quizzes = await get_random_quiz({
        total: 0,
        include_failed_attempts: 2,
    });
    if (quizzes instanceof Error) {
        return ErrorView(quizzes);
    }

    return (
        <>
            <Head>
                <title>题库 - 外语邪修</title>
                <meta
                    name="description"
                    content="浏览所有日语JLPT测验题目，包含词汇、语法、汉字和阅读理解。"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
                />
            </Head>

            <div
                class="min-h-full w-full bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col"
                style="padding-top: env(safe-area-inset-top); padding-bottom: env(safe-area-inset-bottom); height: 100vh; max-height: -webkit-fill-available;"
            >
                {/* Main Content */}
                <div
                    class="flex-1 overflow-y-auto"
                    style="-webkit-overflow-scrolling: touch; position: relative;"
                >
                    <div class="max-w-4xl mx-auto px-4 py-6 pb-safe">
                        {/* Header */}
                        <div class="mb-6">
                            <h1 class="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                                📚 题库
                            </h1>
                            <p class="text-gray-600">
                                共{" "}
                                <span class="font-semibold text-purple-600">
                                    {quizzes.length}
                                </span>{" "}
                                道题目
                            </p>
                        </div>

                        {/* Quizzes List */}
                        {quizzes.length === 0
                            ? (
                                <div class="bg-white rounded-2xl shadow-md p-12 text-center">
                                    <div class="text-6xl mb-4">📝</div>
                                    <h2 class="text-2xl font-bold text-gray-800 mb-2">
                                        暂无题目
                                    </h2>
                                    <p class="text-gray-600">
                                        题库中还没有题目，请先添加题目。
                                    </p>
                                </div>
                            )
                            : (
                                <div class="space-y-4">
                                    {quizzes.map((quiz) => (
                                        <QuizCard
                                            key={quiz.id}
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
