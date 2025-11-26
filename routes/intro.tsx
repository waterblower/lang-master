import { Head } from "fresh/runtime";
import { define } from "../utils.ts";

export default define.page(function Home() {
    return (
        <>
            <Head>
                <title>外语邪修 - 日语学习大师</title>
                <meta
                    name="description"
                    content="通过互动测验和练习测试掌握日语，JLPT N5级别。"
                />
            </Head>

            <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
                {/* Navigation */}
                <nav class="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="flex justify-between items-center h-16">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                                    <span class="text-2xl">🇯🇵</span>
                                </div>
                                <span class="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    外语邪修
                                </span>
                            </div>
                            <div class="flex items-center gap-6">
                                <a
                                    href="#features"
                                    class="text-gray-600 hover:text-purple-600 transition-colors font-medium hidden sm:block"
                                >
                                    功能特点
                                </a>
                                <a
                                    href="#about"
                                    class="text-gray-600 hover:text-purple-600 transition-colors font-medium hidden sm:block"
                                >
                                    关于
                                </a>
                                <a
                                    href="/quiz"
                                    class="px-4 sm:px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600  font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all text-sm sm:text-base"
                                >
                                    开始测验
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section class="pt-20 pb-32 px-4">
                    <div class="max-w-7xl mx-auto">
                        <div class="text-center">
                            <div class="inline-block mb-6">
                                <span class="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                                    JLPT N5 Level Practice
                                </span>
                            </div>
                            <h1 class="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
                                掌握日语
                                <span class="block bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mt-2 text-4xl md:text-6xl">
                                    日本語をマスターしよう
                                </span>
                            </h1>
                            <p class="text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
                                通过专为JLPT
                                N5级别设计的互动测验学习日语。练习词汇、语法、汉字和阅读理解。
                            </p>
                            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <a
                                    href="/quiz"
                                    class="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600  text-base sm:text-lg font-bold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                                >
                                    🚀 立即开始学习
                                </a>
                                <a
                                    href="#features"
                                    class="px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-800 text-base sm:text-lg font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                                >
                                    了解更多
                                </a>
                            </div>

                            {/* Stats */}
                            <div class="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                                <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                                    <div class="text-4xl font-bold text-purple-600 mb-2">
                                        30+
                                    </div>
                                    <div class="text-gray-600 font-medium">
                                        练习题目
                                    </div>
                                </div>
                                <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                                    <div class="text-4xl font-bold text-pink-600 mb-2">
                                        4
                                    </div>
                                    <div class="text-gray-600 font-medium">
                                        题型种类
                                    </div>
                                </div>
                                <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                                    <div class="text-4xl font-bold text-orange-600 mb-2">
                                        N5
                                    </div>
                                    <div class="text-gray-600 font-medium">
                                        JLPT 级别
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" class="py-20 px-4">
                    <div class="max-w-7xl mx-auto">
                        <div class="text-center mb-16">
                            <h2 class="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                                为什么选择 外语邪修？
                            </h2>
                            <p class="text-lg md:text-xl text-gray-600">
                                通过JLPT N5考试所需的一切
                            </p>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Feature 1 */}
                            <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
                                <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                                    <span class="text-3xl">📚</span>
                                </div>
                                <h3 class="text-xl font-bold text-gray-900 mb-3">
                                    词汇 Vocabulary
                                </h3>
                                <p class="text-gray-600">
                                    通过情境示例和含义掌握基本的日语单词和短语。
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
                                <div class="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                                    <span class="text-3xl">✍️</span>
                                </div>
                                <h3 class="text-xl font-bold text-gray-900 mb-3">
                                    语法 Grammar
                                </h3>
                                <p class="text-gray-600">
                                    通过详细解释练习助词、动词形式和句子结构。
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
                                <div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                                    <span class="text-3xl">漢</span>
                                </div>
                                <h3 class="text-xl font-bold text-gray-900 mb-3">
                                    汉字 Kanji
                                </h3>
                                <p class="text-gray-600">
                                    学习阅读和理解日常日语中使用的基本汉字。
                                </p>
                            </div>

                            {/* Feature 4 */}
                            <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
                                <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                                    <span class="text-3xl">📖</span>
                                </div>
                                <h3 class="text-xl font-bold text-gray-900 mb-3">
                                    阅读 Reading
                                </h3>
                                <p class="text-gray-600">
                                    通过真实的日语句子和段落提高理解能力。
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section class="py-20 px-4 bg-white/50">
                    <div class="max-w-7xl mx-auto">
                        <div class="text-center mb-16">
                            <h2 class="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                                使用方法
                            </h2>
                            <p class="text-lg md:text-xl text-gray-600">
                                只需三个简单步骤即可开始学习
                            </p>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div class="text-center">
                                <div class="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                    <span class="text-3xl font-bold ">
                                        1
                                    </span>
                                </div>
                                <h3 class="text-2xl font-bold text-gray-900 mb-3">
                                    开始测验
                                </h3>
                                <p class="text-gray-600">
                                    点击开始按钮，开始包含10道随机题目的个性化测验。
                                </p>
                            </div>

                            <div class="text-center">
                                <div class="w-20 h-20 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                    <span class="text-3xl font-bold ">
                                        2
                                    </span>
                                </div>
                                <h3 class="text-2xl font-bold text-gray-900 mb-3">
                                    回答问题
                                </h3>
                                <p class="text-gray-600">
                                    从多个选项中选择答案，获得即时反馈和解释。
                                </p>
                            </div>

                            <div class="text-center">
                                <div class="w-20 h-20 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                    <span class="text-3xl font-bold ">
                                        3
                                    </span>
                                </div>
                                <h3 class="text-2xl font-bold text-gray-900 mb-3">
                                    跟踪进度
                                </h3>
                                <p class="text-gray-600">
                                    查看得分、复习错题，每次练习都有提高。
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section class="py-20 px-4">
                    <div class="max-w-4xl mx-auto">
                        <div class="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-3xl p-8 sm:p-12 shadow-2xl text-center">
                            <h2 class="text-3xl md:text-5xl font-bold  mb-6">
                                准备好掌握日语了吗？
                            </h2>
                            <p class="text-lg md:text-xl /90 mb-8">
                                加入数千名学习者，为JLPT N5考试成功而练习
                            </p>
                            <a
                                href="/quiz"
                                class="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-white text-purple-600 text-base sm:text-lg font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                            >
                                立即开始你的第一次测验 🎯
                            </a>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" class="py-20 px-4 bg-white/50">
                    <div class="max-w-4xl mx-auto text-center px-4">
                        <h2 class="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                            关于 JLPT N5
                        </h2>
                        <p class="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
                            日本语能力测试（JLPT）N5级是标准化水平参照测试的最基础级别，用于评估和认证非母语人士的日语能力。
                        </p>
                        <p class="text-base md:text-lg text-gray-600 leading-relaxed">
                            N5级别需要掌握大约100个汉字、800个词汇和基础语法。我们的测验系统通过即时反馈和详细解释帮助您练习所有这些领域。
                        </p>
                    </div>
                </section>

                {/* Footer */}
                <footer class="py-12 px-4 bg-gray-900 ">
                    <div class="max-w-7xl mx-auto text-center">
                        <div class="flex items-center justify-center gap-3 mb-4">
                            <div class="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                                <span class="text-2xl">🇯🇵</span>
                            </div>
                            <span class="text-2xl font-bold">外语邪修</span>
                        </div>
                        <p class="text-gray-400 mb-6">
                            通过互动练习掌握日语
                        </p>
                        <div class="flex justify-center gap-8 mb-6 text-sm sm:text-base">
                            <a
                                href="/quiz"
                                class="text-gray-400 hover: transition-colors"
                            >
                                测验
                            </a>
                            <a
                                href="#features"
                                class="text-gray-400 hover: transition-colors"
                            >
                                功能
                            </a>
                            <a
                                href="#about"
                                class="text-gray-400 hover: transition-colors"
                            >
                                关于
                            </a>
                        </div>
                        <p class="text-gray-500 text-sm">
                            © 2024 外语邪修. 使用 Fresh & Preact Signals 构建。
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
});
