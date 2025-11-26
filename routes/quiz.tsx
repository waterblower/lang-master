import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { getRandomQuestions } from "../utils/quizData.ts";
import QuizGame from "../islands/QuizGame.tsx";
import NavBar from "../islands/NavBar.tsx";

export default define.page(async function QuizPage() {
    // SSR: Generate questions on the server
    const quizQuestions = getRandomQuestions(10);

    return (
        <>
            <Head>
                <title>日语N5测验 - 外语邪修</title>
                <meta
                    name="description"
                    content="通过互动测验练习日语JLPT N5级别，涵盖词汇、语法、汉字和阅读理解。"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
                />
                <style>
                    {`
            html, body {
              overflow: hidden;
              position: fixed;
              width: 100%;
              height: 100%;
              height: 100vh;
              height: 100dvh; /* Dynamic viewport height for mobile */
              touch-action: pan-y;
              -webkit-overflow-scrolling: touch;
            }
            body {
              overscroll-behavior: none;
              /* Prevent content from appearing under Dynamic Island */
              padding-top: env(safe-area-inset-top);
              padding-bottom: env(safe-area-inset-bottom);
            }
            /* iOS Safari fixes */
            @supports (-webkit-touch-callout: none) {
              html, body {
                height: -webkit-fill-available;
              }
            }
          `}
                </style>
            </Head>

            <div
                class="h-screen w-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col"
                style="height: 100vh; height: 100dvh; padding-top: env(safe-area-inset-top); padding-bottom: env(safe-area-inset-bottom);"
            >
                {/* Navigation Bar */}
                <NavBar currentPath="/quiz" />

                {/* Quiz Content - Scrollable Container with safe area */}
                <div
                    class="flex-1 overflow-y-auto overscroll-contain"
                    style="min-height: 0;"
                >
                    <div class="h-full flex flex-col px-3 py-3 pb-safe">
                        <QuizGame questions={quizQuestions} />
                    </div>
                </div>
            </div>
        </>
    );
});
