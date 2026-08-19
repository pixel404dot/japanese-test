export type Script = "hiragana" | "katakana";
export type ScriptMode = Script | "mixed";
export type QuizMode = "read" | "write" | "mixed";
export type RowGroup = "basic" | "dakuten" | "yoon";

export type RowId =
  | "a"
  | "ka"
  | "sa"
  | "ta"
  | "na"
  | "ha"
  | "ma"
  | "ya"
  | "ra"
  | "wa"
  | "ga"
  | "za"
  | "da"
  | "ba"
  | "pa"
  | "kya"
  | "sha"
  | "cha"
  | "nya"
  | "hya"
  | "mya"
  | "rya"
  | "gya"
  | "ja"
  | "bya"
  | "pya";

export interface KanaGlyph {
  kana: string;
  romaji: string;
  alts: string[];
  row: RowId;
  script: Script;
}

export interface KanaRow {
  id: RowId;
  label: string;
  group: RowGroup;
  preview: { hiragana: string; katakana: string };
}

const FIRST5: RowId[] = ["a", "ka", "sa", "ta", "na"];
const BASIC: RowId[] = [
  "a",
  "ka",
  "sa",
  "ta",
  "na",
  "ha",
  "ma",
  "ya",
  "ra",
  "wa",
];
const DAKUTEN: RowId[] = ["ga", "za", "da", "ba", "pa"];
const YOON: RowId[] = [
  "kya",
  "sha",
  "cha",
  "nya",
  "hya",
  "mya",
  "rya",
  "gya",
  "ja",
  "bya",
  "pya",
];

type Pair = [hira: string, kata: string, romaji: string, alts?: string[]];

const ROW_PAIRS: Record<RowId, Pair[]> = {
  a: [
    ["あ", "ア", "a"],
    ["い", "イ", "i"],
    ["う", "ウ", "u"],
    ["え", "エ", "e"],
    ["お", "オ", "o"],
  ],
  ka: [
    ["か", "カ", "ka"],
    ["き", "キ", "ki"],
    ["く", "ク", "ku"],
    ["け", "ケ", "ke"],
    ["こ", "コ", "ko"],
  ],
  sa: [
    ["さ", "サ", "sa"],
    ["し", "シ", "shi", ["si"]],
    ["す", "ス", "su"],
    ["せ", "セ", "se"],
    ["そ", "ソ", "so"],
  ],
  ta: [
    ["た", "タ", "ta"],
    ["ち", "チ", "chi", ["ti"]],
    ["つ", "ツ", "tsu", ["tu"]],
    ["て", "テ", "te"],
    ["と", "ト", "to"],
  ],
  na: [
    ["な", "ナ", "na"],
    ["に", "ニ", "ni"],
    ["ぬ", "ヌ", "nu"],
    ["ね", "ネ", "ne"],
    ["の", "ノ", "no"],
  ],
  ha: [
    ["は", "ハ", "ha"],
    ["ひ", "ヒ", "hi"],
    ["ふ", "フ", "fu", ["hu"]],
    ["へ", "ヘ", "he"],
    ["ほ", "ホ", "ho"],
  ],
  ma: [
    ["ま", "マ", "ma"],
    ["み", "ミ", "mi"],
    ["む", "ム", "mu"],
    ["め", "メ", "me"],
    ["も", "モ", "mo"],
  ],
  ya: [
    ["や", "ヤ", "ya"],
    ["ゆ", "ユ", "yu"],
    ["よ", "ヨ", "yo"],
  ],
  ra: [
    ["ら", "ラ", "ra"],
    ["り", "リ", "ri"],
    ["る", "ル", "ru"],
    ["れ", "レ", "re"],
    ["ろ", "ロ", "ro"],
  ],
  wa: [
    ["わ", "ワ", "wa"],
    ["を", "ヲ", "wo", ["o"]],
    ["ん", "ン", "n", ["nn"]],
  ],
  ga: [
    ["が", "ガ", "ga"],
    ["ぎ", "ギ", "gi"],
    ["ぐ", "グ", "gu"],
    ["げ", "ゲ", "ge"],
    ["ご", "ゴ", "go"],
  ],
  za: [
    ["ざ", "ザ", "za"],
    ["じ", "ジ", "ji", ["zi"]],
    ["ず", "ズ", "zu", ["zu"]],
    ["ぜ", "ゼ", "ze"],
    ["ぞ", "ゾ", "zo"],
  ],
  da: [
    ["だ", "ダ", "da"],
    ["ぢ", "ヂ", "ji", ["di", "dzi", "dji"]],
    ["づ", "ヅ", "zu", ["du", "dzu"]],
    ["で", "デ", "de"],
    ["ど", "ド", "do"],
  ],
  ba: [
    ["ば", "バ", "ba"],
    ["び", "ビ", "bi"],
    ["ぶ", "ブ", "bu"],
    ["べ", "ベ", "be"],
    ["ぼ", "ボ", "bo"],
  ],
  pa: [
    ["ぱ", "パ", "pa"],
    ["ぴ", "ピ", "pi"],
    ["ぷ", "プ", "pu"],
    ["ぺ", "ペ", "pe"],
    ["ぽ", "ポ", "po"],
  ],
  kya: [
    ["きゃ", "キャ", "kya"],
    ["きゅ", "キュ", "kyu"],
    ["きょ", "キョ", "kyo"],
  ],
  sha: [
    ["しゃ", "シャ", "sha", ["sya"]],
    ["しゅ", "シュ", "shu", ["syu"]],
    ["しょ", "ショ", "sho", ["syo"]],
  ],
  cha: [
    ["ちゃ", "チャ", "cha", ["tya"]],
    ["ちゅ", "チュ", "chu", ["tyu"]],
    ["ちょ", "チョ", "cho", ["tyo"]],
  ],
  nya: [
    ["にゃ", "ニャ", "nya"],
    ["にゅ", "ニュ", "nyu"],
    ["にょ", "ニョ", "nyo"],
  ],
  hya: [
    ["ひゃ", "ヒャ", "hya"],
    ["ひゅ", "ヒュ", "hyu"],
    ["ひょ", "ヒョ", "hyo"],
  ],
  mya: [
    ["みゃ", "ミャ", "mya"],
    ["みゅ", "ミュ", "myu"],
    ["みょ", "ミョ", "myo"],
  ],
  rya: [
    ["りゃ", "リャ", "rya"],
    ["りゅ", "リュ", "ryu"],
    ["りょ", "リョ", "ryo"],
  ],
  gya: [
    ["ぎゃ", "ギャ", "gya"],
    ["ぎゅ", "ギュ", "gyu"],
    ["ぎょ", "ギョ", "gyo"],
  ],
  ja: [
    ["じゃ", "ジャ", "ja", ["jya", "zya"]],
    ["じゅ", "ジュ", "ju", ["jyu", "zyu"]],
    ["じょ", "ジョ", "jo", ["jyo", "zyo"]],
  ],
  bya: [
    ["びゃ", "ビャ", "bya"],
    ["びゅ", "ビュ", "byu"],
    ["びょ", "ビョ", "byo"],
  ],
  pya: [
    ["ぴゃ", "ピャ", "pya"],
    ["ぴゅ", "ピュ", "pyu"],
    ["ぴょ", "ピョ", "pyo"],
  ],
};

function previewOf(id: RowId): { hiragana: string; katakana: string } {
  const pairs = ROW_PAIRS[id];
  return {
    hiragana: pairs.map((p) => p[0]).join(""),
    katakana: pairs.map((p) => p[1]).join(""),
  };
}

export const ROWS: KanaRow[] = (
  [
    ["a", "A line", "basic"],
    ["ka", "Ka line", "basic"],
    ["sa", "Sa line", "basic"],
    ["ta", "Ta line", "basic"],
    ["na", "Na line", "basic"],
    ["ha", "Ha line", "basic"],
    ["ma", "Ma line", "basic"],
    ["ya", "Ya line", "basic"],
    ["ra", "Ra line", "basic"],
    ["wa", "Wa line", "basic"],
    ["ga", "Ga line", "dakuten"],
    ["za", "Za line", "dakuten"],
    ["da", "Da line", "dakuten"],
    ["ba", "Ba line", "dakuten"],
    ["pa", "Pa line", "dakuten"],
    ["kya", "Kya", "yoon"],
    ["sha", "Sha", "yoon"],
    ["cha", "Cha", "yoon"],
    ["nya", "Nya", "yoon"],
    ["hya", "Hya", "yoon"],
    ["mya", "Mya", "yoon"],
    ["rya", "Rya", "yoon"],
    ["gya", "Gya", "yoon"],
    ["ja", "Ja", "yoon"],
    ["bya", "Bya", "yoon"],
    ["pya", "Pya", "yoon"],
  ] as const
).map(([id, label, group]) => ({
  id,
  label,
  group,
  preview: previewOf(id),
}));

export const ROW_GROUPS: { id: RowGroup; label: string; note: string }[] = [
  { id: "basic", label: "Basic lines", note: "Gojūon — あいうえお" },
  { id: "dakuten", label: "Voiced marks", note: "Dakuten & handakuten" },
  { id: "yoon", label: "Combinations", note: "Contracted sounds" },
];

export const FIRST5_ROWS = FIRST5;
export const BASIC_ROWS = BASIC;
export const DAKUTEN_ROWS = DAKUTEN;
export const YOON_ROWS = YOON;

function glyphsFor(script: Script, rows: RowId[]): KanaGlyph[] {
  const out: KanaGlyph[] = [];
  for (const row of rows) {
    for (const [hira, kata, romaji, alts = []] of ROW_PAIRS[row]) {
      out.push({
        kana: script === "hiragana" ? hira : kata,
        romaji,
        alts,
        row,
        script,
      });
    }
  }
  return out;
}

export function glyphsForSelection(
  script: ScriptMode,
  rows: RowId[],
): KanaGlyph[] {
  if (rows.length === 0) return [];
  if (script === "mixed") {
    return [...glyphsFor("hiragana", rows), ...glyphsFor("katakana", rows)];
  }
  return glyphsFor(script, rows);
}

export function normalizeRomaji(value: string): string {
  return value.toLowerCase().trim().replace(/[\s\-']/g, "");
}

export function matchesRomaji(glyph: KanaGlyph, input: string): boolean {
  const value = normalizeRomaji(input);
  if (!value) return false;
  return value === glyph.romaji || glyph.alts.includes(value);
}

export function scriptLabel(script: Script): string {
  return script === "hiragana" ? "Hiragana" : "Katakana";
}

export function scriptJa(script: Script): string {
  return script === "hiragana" ? "ひらがな" : "カタカナ";
}

export const SETUP_STORAGE_KEY = "kana-line-setup";
export const LOCAL_STATS_KEY = "kana-line-stats";
export const LOCAL_SESSIONS_KEY = "kana-line-sessions";

export interface SetupState {
  script: ScriptMode;
  rows: RowId[];
  mode: QuizMode;
  length: 10 | 20 | 40 | "all";
  /** Seconds allowed per question. 0 = no timer. */
  timer: number;
}

export const DEFAULT_SETUP: SetupState = {
  script: "mixed",
  rows: [...FIRST5],
  mode: "mixed",
  length: 20,
  timer: 0,
};

export const TIMER_PRESETS = [0, 3, 5, 8, 10, 15] as const;
export const TIMER_MIN = 1;
export const TIMER_MAX = 120;

export function clampTimer(value: unknown): number {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n) || n <= 0) return 0;
  return Math.min(TIMER_MAX, Math.max(TIMER_MIN, Math.round(n)));
}

export function isFirst5(rows: RowId[]): boolean {
  if (rows.length !== FIRST5.length) return false;
  return FIRST5.every((id) => rows.includes(id));
}

export function sameRows(a: RowId[], b: RowId[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((id) => b.includes(id));
}
