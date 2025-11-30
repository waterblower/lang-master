import { useSignal } from "@preact/signals";

interface NavBarProps {
    currentPath?: string;
}

export default function NavBar({ currentPath = "/" }: NavBarProps) {
    const isMenuOpen = useSignal(false);
    const path = useSignal(currentPath);
    console.log(currentPath);

    const toggleMenu = () => {
        isMenuOpen.value = !isMenuOpen.value;
    };

    const closeMenu = () => {
        isMenuOpen.value = false;
    };

    const navLinks = [
        { href: "/", label: "首页", icon: "🏠", description: "Home" },
        { href: "/quizzes", label: "测验", icon: "📝", description: "Quiz" },
        {
            href: "/review-set",
            label: "错题集",
            icon: "📚",
            description: "Wrong Answers",
        },
    ];

    return (
        <>
            <nav class="bg-white/95 backdrop-blur-md shadow-md flex-shrink-0 border-b border-purple-100 sticky top-0 z-50">
                <div class="px-4">
                    <div class="flex justify-between items-center h-14">
                        {/* Logo */}
                        <a
                            href="/"
                            class="flex items-center gap-2.5"
                            onClick={closeMenu}
                        >
                            <img
                                class="w-12 h-12 rounded-xl"
                                src="icons/icon-256x256.png"
                            />
                            <span class="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                外语邪修
                            </span>
                        </a>

                        {/* Desktop Navigation - Hidden on mobile */}
                        <div class="hidden md:flex items-center gap-1">
                            {navLinks.slice(0, 5).map((link) => (
                                <button type="button" disabled>
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        class={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                                            currentPath === link.href
                                                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md"
                                                : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                                        }`}
                                        onClick={() => {}}
                                    >
                                        <span class="mr-1.5">{link.icon}</span>
                                        {link.label}
                                    </a>
                                </button>
                            ))}
                        </div>

                        {/* Hamburger Menu Button */}
                        <button
                            type="button"
                            onClick={toggleMenu}
                            class="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-purple-50 active:bg-purple-100 transition-colors"
                            aria-label="Toggle menu"
                        >
                            <div class="w-6 h-5 flex flex-col justify-between">
                                <span
                                    class={`block h-0.5 w-full bg-gray-700 rounded-full transition-all duration-300 ${
                                        isMenuOpen.value
                                            ? "rotate-45 translate-y-2"
                                            : ""
                                    }`}
                                />
                                <span
                                    class={`block h-0.5 w-full bg-gray-700 rounded-full transition-all duration-300 ${
                                        isMenuOpen.value ? "opacity-0" : ""
                                    }`}
                                />
                                <span
                                    class={`block h-0.5 w-full bg-gray-700 rounded-full transition-all duration-300 ${
                                        isMenuOpen.value
                                            ? "-rotate-45 -translate-y-2"
                                            : ""
                                    }`}
                                />
                            </div>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <div
                    class={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                        isMenuOpen.value
                            ? "max-h-[600px] opacity-100"
                            : "max-h-0 opacity-0"
                    }`}
                >
                    <div class="px-4 py-3 bg-gradient-to-b from-white to-purple-50/30 border-t border-purple-100">
                        <div class="space-y-1">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={closeMenu}
                                    class={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-base transition-all ${
                                        currentPath === link.href
                                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-[1.02]"
                                            : "text-gray-700 hover:bg-white hover:shadow-md active:scale-[0.98]"
                                    }`}
                                >
                                    <span class="text-2xl">{link.icon}</span>
                                    <div class="flex-1">
                                        <div
                                            class={currentPath === link.href
                                                ? "text-white"
                                                : "text-gray-900"}
                                        >
                                            {link.label}
                                        </div>
                                        <div
                                            class={`text-xs ${
                                                currentPath === link.href
                                                    ? "text-white/80"
                                                    : "text-gray-500"
                                            }`}
                                        >
                                            {link.description}
                                        </div>
                                    </div>
                                    {currentPath === link.href && (
                                        <span class="text-white">✓</span>
                                    )}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Overlay for mobile menu */}
            {isMenuOpen.value && (
                <div
                    class="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                    onClick={closeMenu}
                    style="top: 56px"
                />
            )}
        </>
    );
}
