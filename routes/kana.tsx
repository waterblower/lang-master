import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { KanaPractice } from "../islands/KanaPractice.tsx";

export default define.page(function KanaPage() {
    return (
        <>
            <Head>
                <title>五十音图练习 - 外语邪修</title>
                <meta
                    name="description"
                    content="通过互动练习掌握日语五十音图，包括平假名和片假名的认读练习。"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
                />
            </Head>

            <div
                class="min-h-full w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col"
                style="padding-top: env(safe-area-inset-top); padding-bottom: env(safe-area-inset-bottom); height: 100vh; max-height: -webkit-fill-available;"
            >
                {/* Header */}
                <div class="bg-white/80 backdrop-blur-md shadow-sm">
                    <div class="max-w-4xl mx-auto px-4 py-4">
                        <div class="flex items-center justify-between">
                            <div>
                                <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    🈷️ 五十音图练习
                                </h1>
                                <p class="text-sm text-gray-600 mt-1">
                                    掌握日语的基础 - 平假名和片假名
                                </p>
                            </div>
                            <a
                                href="/"
                                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                            >
                                返回首页
                            </a>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div
                    class="flex-1 overflow-y-auto"
                    style="-webkit-overflow-scrolling: touch; position: relative;"
                >
                    <div
                        class="max-w-4xl mx-auto px-4 py-6"
                        style="padding-bottom: calc(2rem + env(safe-area-inset-bottom));"
                    >
                        <KanaPractice />
                    </div>
                </div>
            </div>
        </>
    );
});
