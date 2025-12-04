import { KanaChar } from "../_data/kana.ts";

interface KanaChartProps {
    kanas: KanaChar[];
    kanaType: "hiragana" | "katakana";
    title: string;
}

export function KanaChart({ kanas, kanaType, title }: KanaChartProps) {
    return (
        <div class="bg-white rounded-2xl shadow-lg p-6">
            <h3 class="text-lg font-bold text-gray-800 mb-4">{title}</h3>
            <div class="grid grid-cols-5 gap-2 sm:gap-3">
                {kanas.map((kana) => (
                    <div
                        key={kana.romaji}
                        class="aspect-square flex flex-col items-center justify-center p-2 sm:p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg hover:from-blue-50 hover:to-indigo-50 hover:shadow-md transition-all cursor-pointer group"
                    >
                        <div class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors mb-1">
                            {kanaType === "hiragana"
                                ? kana.hiragana
                                : kana.katakana}
                        </div>
                        <div class="text-xs sm:text-sm text-gray-500 group-hover:text-blue-500 transition-colors font-medium">
                            {kana.romaji}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

interface KanaGridProps {
    rows: string[];
    getKanaByRow: (row: string) => KanaChar[];
    kanaType: "hiragana" | "katakana";
}

export function KanaGrid({ rows, getKanaByRow, kanaType }: KanaGridProps) {
    return (
        <div class="space-y-4">
            {rows.map((row) => {
                const kanas = getKanaByRow(row);
                if (kanas.length === 0) return null;

                return (
                    <div
                        key={row}
                        class="bg-white rounded-xl shadow-md p-4 border border-gray-100"
                    >
                        <div class="flex items-center justify-between mb-3">
                            <div class="text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                                {row}
                            </div>
                            <div class="text-xs text-gray-400">
                                {kanas.length} 个假名
                            </div>
                        </div>
                        <div class="grid grid-cols-5 gap-2">
                            {kanas.map((kana) => (
                                <div
                                    key={kana.romaji}
                                    class="text-center p-3 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer group"
                                >
                                    <div class="text-3xl font-bold text-gray-800 group-hover:text-blue-600 group-hover:scale-110 transition-all mb-1">
                                        {kanaType === "hiragana"
                                            ? kana.hiragana
                                            : kana.katakana}
                                    </div>
                                    <div class="text-xs text-gray-500 group-hover:text-blue-500 font-medium">
                                        {kana.romaji}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
