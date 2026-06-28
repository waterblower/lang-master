import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { TinderCard, TinderCardList } from "../islands/TinderCardList.tsx";

export default define.page(function TinderPage() {
    return (
        <>
            <Head>
                <title>Tinder 滑动卡片 - 外语邪修</title>
                <meta
                    name="description"
                    content="体验 Tinder 风格的滑动卡片交互"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
                />
            </Head>

            <div
                class="min-h-full w-full bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex flex-col"
                style="padding-top: env(safe-area-inset-top); padding-bottom: env(safe-area-inset-bottom); height: 100vh; max-height: -webkit-fill-available;"
            >
                {/* Header */}
                <div class="bg-white/80 backdrop-blur-md shadow-sm">
                    <div class="max-w-4xl mx-auto px-4 py-4">
                        <div class="flex items-center justify-between">
                            <div>
                                <h1 class="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                                    💝 Tinder 滑动卡片
                                </h1>
                                <p class="text-sm text-gray-600 mt-1">
                                    左滑不喜欢 · 右滑喜欢 · 上滑超级喜欢
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
                <div class="flex-1 overflow-hidden">
                    <div class="h-full px-4 py-6">
                        <TinderCardList
                            onSwipeLeft={(index) =>
                                console.log("Swiped left on card", index)}
                            onSwipeRight={(index) =>
                                console.log("Swiped right on card", index)}
                            onSwipeUp={(index) =>
                                console.log("Super liked card", index)}
                            onEmpty={() => console.log("All cards finished!")}
                        >
                            <TinderCard>
                                <div class="w-full h-full bg-gradient-to-br from-pink-400 to-purple-500 flex flex-col items-center justify-center p-8 text-white">
                                    <div class="text-8xl mb-6">🍕</div>
                                    <h2 class="text-4xl font-bold mb-4">
                                        披萨
                                    </h2>
                                    <p class="text-xl text-center opacity-90">
                                        意大利经典美食
                                    </p>
                                    <p class="mt-4 text-sm opacity-75 text-center">
                                        滑动进行选择
                                    </p>
                                </div>
                            </TinderCard>

                            <TinderCard>
                                <div class="w-full h-full bg-gradient-to-br from-blue-400 to-cyan-500 flex flex-col items-center justify-center p-8 text-white">
                                    <div class="text-8xl mb-6">🍣</div>
                                    <h2 class="text-4xl font-bold mb-4">
                                        寿司
                                    </h2>
                                    <p class="text-xl text-center opacity-90">
                                        日本传统料理
                                    </p>
                                    <p class="mt-4 text-sm opacity-75 text-center">
                                        向左或向右滑动
                                    </p>
                                </div>
                            </TinderCard>

                            <TinderCard>
                                <div class="w-full h-full bg-gradient-to-br from-yellow-400 to-orange-500 flex flex-col items-center justify-center p-8 text-white">
                                    <div class="text-8xl mb-6">🍜</div>
                                    <h2 class="text-4xl font-bold mb-4">
                                        拉面
                                    </h2>
                                    <p class="text-xl text-center opacity-90">
                                        日式经典面食
                                    </p>
                                    <p class="mt-4 text-sm opacity-75 text-center">
                                        尝试向上滑动超级喜欢
                                    </p>
                                </div>
                            </TinderCard>

                            <TinderCard>
                                <div class="w-full h-full bg-gradient-to-br from-green-400 to-emerald-500 flex flex-col items-center justify-center p-8 text-white">
                                    <div class="text-8xl mb-6">🥗</div>
                                    <h2 class="text-4xl font-bold mb-4">
                                        沙拉
                                    </h2>
                                    <p class="text-xl text-center opacity-90">
                                        健康清爽选择
                                    </p>
                                    <p class="mt-4 text-sm opacity-75 text-center">
                                        继续滑动探索
                                    </p>
                                </div>
                            </TinderCard>

                            <TinderCard>
                                <div class="w-full h-full bg-gradient-to-br from-red-400 to-pink-500 flex flex-col items-center justify-center p-8 text-white">
                                    <div class="text-8xl mb-6">🍔</div>
                                    <h2 class="text-4xl font-bold mb-4">
                                        汉堡
                                    </h2>
                                    <p class="text-xl text-center opacity-90">
                                        美式快餐之王
                                    </p>
                                    <p class="mt-4 text-sm opacity-75 text-center">
                                        最后一张卡片了
                                    </p>
                                </div>
                            </TinderCard>
                        </TinderCardList>
                    </div>
                </div>

                {/* Instructions */}
                <div class="bg-white/80 backdrop-blur-md border-t border-gray-200 px-4 py-4">
                    <div class="max-w-4xl mx-auto">
                        <div class="flex items-center justify-center gap-8 text-sm text-gray-600">
                            <div class="flex items-center gap-2">
                                <span class="text-2xl">👈</span>
                                <span>左滑 = 不喜欢</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="text-2xl">👆</span>
                                <span>上滑 = 超级喜欢</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="text-2xl">👉</span>
                                <span>右滑 = 喜欢</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});
