// 五十音图数据

export interface KanaChar {
    hiragana: string;
    katakana: string;
    romaji: string;
    row: string; // あ行、か行等
    column: string; // あ段、い段等
}

// 清音（基本五十音图）
export const SEION: KanaChar[] = [
    // あ行
    {
        hiragana: "あ",
        katakana: "ア",
        romaji: "a",
        row: "あ行",
        column: "あ段",
    },
    {
        hiragana: "い",
        katakana: "イ",
        romaji: "i",
        row: "あ行",
        column: "い段",
    },
    {
        hiragana: "う",
        katakana: "ウ",
        romaji: "u",
        row: "あ行",
        column: "う段",
    },
    {
        hiragana: "え",
        katakana: "エ",
        romaji: "e",
        row: "あ行",
        column: "え段",
    },
    {
        hiragana: "お",
        katakana: "オ",
        romaji: "o",
        row: "あ行",
        column: "お段",
    },

    // か行
    {
        hiragana: "か",
        katakana: "カ",
        romaji: "ka",
        row: "か行",
        column: "あ段",
    },
    {
        hiragana: "き",
        katakana: "キ",
        romaji: "ki",
        row: "か行",
        column: "い段",
    },
    {
        hiragana: "く",
        katakana: "ク",
        romaji: "ku",
        row: "か行",
        column: "う段",
    },
    {
        hiragana: "け",
        katakana: "ケ",
        romaji: "ke",
        row: "か行",
        column: "え段",
    },
    {
        hiragana: "こ",
        katakana: "コ",
        romaji: "ko",
        row: "か行",
        column: "お段",
    },

    // さ行
    {
        hiragana: "さ",
        katakana: "サ",
        romaji: "sa",
        row: "さ行",
        column: "あ段",
    },
    {
        hiragana: "し",
        katakana: "シ",
        romaji: "shi",
        row: "さ行",
        column: "い段",
    },
    {
        hiragana: "す",
        katakana: "ス",
        romaji: "su",
        row: "さ行",
        column: "う段",
    },
    {
        hiragana: "せ",
        katakana: "セ",
        romaji: "se",
        row: "さ行",
        column: "え段",
    },
    {
        hiragana: "そ",
        katakana: "ソ",
        romaji: "so",
        row: "さ行",
        column: "お段",
    },

    // た行
    {
        hiragana: "た",
        katakana: "タ",
        romaji: "ta",
        row: "た行",
        column: "あ段",
    },
    {
        hiragana: "ち",
        katakana: "チ",
        romaji: "chi",
        row: "た行",
        column: "い段",
    },
    {
        hiragana: "つ",
        katakana: "ツ",
        romaji: "tsu",
        row: "た行",
        column: "う段",
    },
    {
        hiragana: "て",
        katakana: "テ",
        romaji: "te",
        row: "た行",
        column: "え段",
    },
    {
        hiragana: "と",
        katakana: "ト",
        romaji: "to",
        row: "た行",
        column: "お段",
    },

    // な行
    {
        hiragana: "な",
        katakana: "ナ",
        romaji: "na",
        row: "な行",
        column: "あ段",
    },
    {
        hiragana: "に",
        katakana: "ニ",
        romaji: "ni",
        row: "な行",
        column: "い段",
    },
    {
        hiragana: "ぬ",
        katakana: "ヌ",
        romaji: "nu",
        row: "な行",
        column: "う段",
    },
    {
        hiragana: "ね",
        katakana: "ネ",
        romaji: "ne",
        row: "な行",
        column: "え段",
    },
    {
        hiragana: "の",
        katakana: "ノ",
        romaji: "no",
        row: "な行",
        column: "お段",
    },

    // は行
    {
        hiragana: "は",
        katakana: "ハ",
        romaji: "ha",
        row: "は行",
        column: "あ段",
    },
    {
        hiragana: "ひ",
        katakana: "ヒ",
        romaji: "hi",
        row: "は行",
        column: "い段",
    },
    {
        hiragana: "ふ",
        katakana: "フ",
        romaji: "fu",
        row: "は行",
        column: "う段",
    },
    {
        hiragana: "へ",
        katakana: "ヘ",
        romaji: "he",
        row: "は行",
        column: "え段",
    },
    {
        hiragana: "ほ",
        katakana: "ホ",
        romaji: "ho",
        row: "は行",
        column: "お段",
    },

    // ま行
    {
        hiragana: "ま",
        katakana: "マ",
        romaji: "ma",
        row: "ま行",
        column: "あ段",
    },
    {
        hiragana: "み",
        katakana: "ミ",
        romaji: "mi",
        row: "ま行",
        column: "い段",
    },
    {
        hiragana: "む",
        katakana: "ム",
        romaji: "mu",
        row: "ま行",
        column: "う段",
    },
    {
        hiragana: "め",
        katakana: "メ",
        romaji: "me",
        row: "ま行",
        column: "え段",
    },
    {
        hiragana: "も",
        katakana: "モ",
        romaji: "mo",
        row: "ま行",
        column: "お段",
    },

    // や行
    {
        hiragana: "や",
        katakana: "ヤ",
        romaji: "ya",
        row: "や行",
        column: "あ段",
    },
    {
        hiragana: "ゆ",
        katakana: "ユ",
        romaji: "yu",
        row: "や行",
        column: "う段",
    },
    {
        hiragana: "よ",
        katakana: "ヨ",
        romaji: "yo",
        row: "や行",
        column: "お段",
    },

    // ら行
    {
        hiragana: "ら",
        katakana: "ラ",
        romaji: "ra",
        row: "ら行",
        column: "あ段",
    },
    {
        hiragana: "り",
        katakana: "リ",
        romaji: "ri",
        row: "ら行",
        column: "い段",
    },
    {
        hiragana: "る",
        katakana: "ル",
        romaji: "ru",
        row: "ら行",
        column: "う段",
    },
    {
        hiragana: "れ",
        katakana: "レ",
        romaji: "re",
        row: "ら行",
        column: "え段",
    },
    {
        hiragana: "ろ",
        katakana: "ロ",
        romaji: "ro",
        row: "ら行",
        column: "お段",
    },

    // わ行
    {
        hiragana: "わ",
        katakana: "ワ",
        romaji: "wa",
        row: "わ行",
        column: "あ段",
    },
    {
        hiragana: "を",
        katakana: "ヲ",
        romaji: "wo",
        row: "わ行",
        column: "お段",
    },
    { hiragana: "ん", katakana: "ン", romaji: "n", row: "わ行", column: "ん" },
];

// 浊音
export const DAKUON: KanaChar[] = [
    // が行
    {
        hiragana: "が",
        katakana: "ガ",
        romaji: "ga",
        row: "が行",
        column: "あ段",
    },
    {
        hiragana: "ぎ",
        katakana: "ギ",
        romaji: "gi",
        row: "が行",
        column: "い段",
    },
    {
        hiragana: "ぐ",
        katakana: "グ",
        romaji: "gu",
        row: "が行",
        column: "う段",
    },
    {
        hiragana: "げ",
        katakana: "ゲ",
        romaji: "ge",
        row: "が行",
        column: "え段",
    },
    {
        hiragana: "ご",
        katakana: "ゴ",
        romaji: "go",
        row: "が行",
        column: "お段",
    },

    // ざ行
    {
        hiragana: "ざ",
        katakana: "ザ",
        romaji: "za",
        row: "ざ行",
        column: "あ段",
    },
    {
        hiragana: "じ",
        katakana: "ジ",
        romaji: "ji",
        row: "ざ行",
        column: "い段",
    },
    {
        hiragana: "ず",
        katakana: "ズ",
        romaji: "zu",
        row: "ざ行",
        column: "う段",
    },
    {
        hiragana: "ぜ",
        katakana: "ゼ",
        romaji: "ze",
        row: "ざ行",
        column: "え段",
    },
    {
        hiragana: "ぞ",
        katakana: "ゾ",
        romaji: "zo",
        row: "ざ行",
        column: "お段",
    },

    // だ行
    {
        hiragana: "だ",
        katakana: "ダ",
        romaji: "da",
        row: "だ行",
        column: "あ段",
    },
    {
        hiragana: "ぢ",
        katakana: "ヂ",
        romaji: "ji",
        row: "だ行",
        column: "い段",
    },
    {
        hiragana: "づ",
        katakana: "ヅ",
        romaji: "zu",
        row: "だ行",
        column: "う段",
    },
    {
        hiragana: "で",
        katakana: "デ",
        romaji: "de",
        row: "だ行",
        column: "え段",
    },
    {
        hiragana: "ど",
        katakana: "ド",
        romaji: "do",
        row: "だ行",
        column: "お段",
    },

    // ば行
    {
        hiragana: "ば",
        katakana: "バ",
        romaji: "ba",
        row: "ば行",
        column: "あ段",
    },
    {
        hiragana: "び",
        katakana: "ビ",
        romaji: "bi",
        row: "ば行",
        column: "い段",
    },
    {
        hiragana: "ぶ",
        katakana: "ブ",
        romaji: "bu",
        row: "ば行",
        column: "う段",
    },
    {
        hiragana: "べ",
        katakana: "ベ",
        romaji: "be",
        row: "ば行",
        column: "え段",
    },
    {
        hiragana: "ぼ",
        katakana: "ボ",
        romaji: "bo",
        row: "ば行",
        column: "お段",
    },
];

// 半浊音
export const HANDAKUON: KanaChar[] = [
    // ぱ行
    {
        hiragana: "ぱ",
        katakana: "パ",
        romaji: "pa",
        row: "ぱ行",
        column: "あ段",
    },
    {
        hiragana: "ぴ",
        katakana: "ピ",
        romaji: "pi",
        row: "ぱ行",
        column: "い段",
    },
    {
        hiragana: "ぷ",
        katakana: "プ",
        romaji: "pu",
        row: "ぱ行",
        column: "う段",
    },
    {
        hiragana: "ぺ",
        katakana: "ペ",
        romaji: "pe",
        row: "ぱ行",
        column: "え段",
    },
    {
        hiragana: "ぽ",
        katakana: "ポ",
        romaji: "po",
        row: "ぱ行",
        column: "お段",
    },
];

// 所有假名（清音+浊音+半浊音）
export const ALL_KANA: KanaChar[] = [...SEION, ...DAKUON, ...HANDAKUON];

// 按行分组
export const KANA_ROWS = [
    "あ行",
    "か行",
    "さ行",
    "た行",
    "な行",
    "は行",
    "ま行",
    "や行",
    "ら行",
    "わ行",
    "が行",
    "ざ行",
    "だ行",
    "ば行",
    "ぱ行",
];

// 辅助函数：按行获取假名
export function getKanaByRow(row: string): KanaChar[] {
    return ALL_KANA.filter((kana) => kana.row === row);
}

// 辅助函数：随机获取指定数量的假名
export function getRandomKana(
    count: number,
    type: "hiragana" | "katakana" | "both" = "both",
    includeSeion = true,
    includeDakuon = true,
    includeHandakuon = true,
): KanaChar[] {
    let pool: KanaChar[] = [];

    if (includeSeion) pool = [...pool, ...SEION];
    if (includeDakuon) pool = [...pool, ...DAKUON];
    if (includeHandakuon) pool = [...pool, ...HANDAKUON];

    // 洗牌算法
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
}

// 辅助函数：生成错误选项（罗马音）
export function generateWrongOptions(
    correctRomaji: string,
    count: number,
): string[] {
    const allRomaji = ALL_KANA.map((k) => k.romaji).filter((r) =>
        r !== correctRomaji
    );
    const shuffled = [...allRomaji].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

// 辅助函数：生成错误选项（假名）
export function generateWrongKanaOptions(
    correctKana: string,
    type: "hiragana" | "katakana",
    count: number,
): string[] {
    const allKanaChars = ALL_KANA.map((k) => k[type]).filter((k) =>
        k !== correctKana
    );
    const shuffled = [...allKanaChars].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}
