import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { getRandomQuestions } from "../utils/quizData.ts";
import QuizGame from "../islands/QuizGame.tsx";

export default define.page(function QuizPage() {
    // SSR: Generate questions on the server
    const quizQuestions = getRandomQuestions(10);

    return (
        <>
            <Head>
                <title>日语N5测验 - Lang Master</title>
                <meta
                    name="description"
                    content="通过互动测验练习日语JLPT N5级别，涵盖词汇、语法、汉字和阅读理解。"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                />
                <style>
                    {`
            html, body {
              overflow: hidden;
              position: fixed;
              width: 100%;
              height: 100%;
              touch-action: pan-y;
            }
            body {
              overscroll-behavior: none;
            }
          `}
                </style>
            </Head>

            <div class="h-screen w-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col">
                {/* Fixed Navigation - Compact */}
                <nav class="bg-white/90 backdrop-blur-md shadow-sm flex-shrink-0 border-b border-purple-100">
                    <div class="px-3 sm:px-4">
                        <div class="flex justify-between items-center h-12 sm:h-14">
                            <a href="/" class="flex items-center gap-2">
                                <div class="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                                    <span class="text-lg sm:text-xl">🇯🇵</span>
                                </div>
                                <span class="text-base sm:text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hidden xs:inline">
                                    Lang Master
                                </span>
                            </a>
                            <a
                                href="/"
                                class="text-gray-600 hover:text-purple-600 transition-colors font-medium text-sm sm:text-base"
                            >
                                ← 返回
                            </a>
                        </div>
                    </div>
                </nav>

                {/* Quiz Content - Scrollable Container */}
                <div class="flex-1 overflow-y-auto overscroll-contain">
                    <div class="h-full flex flex-col px-3 sm:px-4 py-4 sm:py-6">
                        <QuizGame questions={quizQuestions} />
                    </div>
                </div>
            </div>
        </>
    );
});
