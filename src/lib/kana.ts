export type Script = "hiragana" | "katakana";
export type GroupTag = "main" | "dakuten" | "yoon";

export type KanaChar = {
  k: string;
  r: string[];
  v: string;
};

export type KanaGroup = {
  id: string;
  script: Script;
  key: string;
  title: string;
  tag: GroupTag;
  chars: KanaChar[];
};

function g(
  id: string,
  script: Script,
  key: string,
  title: string,
  tag: GroupTag,
  chars: KanaChar[],
): KanaGroup {
  return { id, script, key, title, tag, chars };
}

const HIRA_MAIN: KanaGroup[] = [
  g("h-a", "hiragana", "a", "あ", "main", [
    { k: "あ", r: ["a"], v: "a" },
    { k: "い", r: ["i"], v: "i" },
    { k: "う", r: ["u"], v: "u" },
    { k: "え", r: ["e"], v: "e" },
    { k: "お", r: ["o"], v: "o" },
  ]),
  g("h-k", "hiragana", "k", "か", "main", [
    { k: "か", r: ["ka"], v: "a" },
    { k: "き", r: ["ki"], v: "i" },
    { k: "く", r: ["ku"], v: "u" },
    { k: "け", r: ["ke"], v: "e" },
    { k: "こ", r: ["ko"], v: "o" },
  ]),
  g("h-s", "hiragana", "s", "さ", "main", [
    { k: "さ", r: ["sa"], v: "a" },
    { k: "し", r: ["shi", "si"], v: "i" },
    { k: "す", r: ["su"], v: "u" },
    { k: "せ", r: ["se"], v: "e" },
    { k: "そ", r: ["so"], v: "o" },
  ]),
  g("h-t", "hiragana", "t", "た", "main", [
    { k: "た", r: ["ta"], v: "a" },
    { k: "ち", r: ["chi", "ti"], v: "i" },
    { k: "つ", r: ["tsu", "tu"], v: "u" },
    { k: "て", r: ["te"], v: "e" },
    { k: "と", r: ["to"], v: "o" },
  ]),
  g("h-n", "hiragana", "n", "な", "main", [
    { k: "な", r: ["na"], v: "a" },
    { k: "に", r: ["ni"], v: "i" },
    { k: "ぬ", r: ["nu"], v: "u" },
    { k: "ね", r: ["ne"], v: "e" },
    { k: "の", r: ["no"], v: "o" },
  ]),
  g("h-h", "hiragana", "h", "は", "main", [
    { k: "は", r: ["ha"], v: "a" },
    { k: "ひ", r: ["hi"], v: "i" },
    { k: "ふ", r: ["fu", "hu"], v: "u" },
    { k: "へ", r: ["he"], v: "e" },
    { k: "ほ", r: ["ho"], v: "o" },
  ]),
  g("h-m", "hiragana", "m", "ま", "main", [
    { k: "ま", r: ["ma"], v: "a" },
    { k: "み", r: ["mi"], v: "i" },
    { k: "む", r: ["mu"], v: "u" },
    { k: "め", r: ["me"], v: "e" },
    { k: "も", r: ["mo"], v: "o" },
  ]),
  g("h-y", "hiragana", "y", "や", "main", [
    { k: "や", r: ["ya"], v: "a" },
    { k: "ゆ", r: ["yu"], v: "u" },
    { k: "よ", r: ["yo"], v: "o" },
  ]),
  g("h-r", "hiragana", "r", "ら", "main", [
    { k: "ら", r: ["ra"], v: "a" },
    { k: "り", r: ["ri"], v: "i" },
    { k: "る", r: ["ru"], v: "u" },
    { k: "れ", r: ["re"], v: "e" },
    { k: "ろ", r: ["ro"], v: "o" },
  ]),
  g("h-w", "hiragana", "w", "わ", "main", [
    { k: "わ", r: ["wa"], v: "a" },
    { k: "を", r: ["wo", "o"], v: "o" },
    { k: "ん", r: ["n"], v: "u" },
  ]),
];

const HIRA_DAKUTEN: KanaGroup[] = [
  g("h-g", "hiragana", "g", "が", "dakuten", [
    { k: "が", r: ["ga"], v: "a" },
    { k: "ぎ", r: ["gi"], v: "i" },
    { k: "ぐ", r: ["gu"], v: "u" },
    { k: "げ", r: ["ge"], v: "e" },
    { k: "ご", r: ["go"], v: "o" },
  ]),
  g("h-z", "hiragana", "z", "ざ", "dakuten", [
    { k: "ざ", r: ["za"], v: "a" },
    { k: "じ", r: ["ji", "zi"], v: "i" },
    { k: "ず", r: ["zu", "du"], v: "u" },
    { k: "ぜ", r: ["ze"], v: "e" },
    { k: "ぞ", r: ["zo"], v: "o" },
  ]),
  g("h-d", "hiragana", "d", "だ", "dakuten", [
    { k: "だ", r: ["da"], v: "a" },
    { k: "ぢ", r: ["ji", "zi"], v: "i" },
    { k: "づ", r: ["zu", "du"], v: "u" },
    { k: "で", r: ["de"], v: "e" },
    { k: "ど", r: ["do"], v: "o" },
  ]),
  g("h-b", "hiragana", "b", "ば", "dakuten", [
    { k: "ば", r: ["ba"], v: "a" },
    { k: "び", r: ["bi"], v: "i" },
    { k: "ぶ", r: ["bu"], v: "u" },
    { k: "べ", r: ["be"], v: "e" },
    { k: "ぼ", r: ["bo"], v: "o" },
  ]),
  g("h-p", "hiragana", "p", "ぱ", "dakuten", [
    { k: "ぱ", r: ["pa"], v: "a" },
    { k: "ぴ", r: ["pi"], v: "i" },
    { k: "ぷ", r: ["pu"], v: "u" },
    { k: "ぺ", r: ["pe"], v: "e" },
    { k: "ぽ", r: ["po"], v: "o" },
  ]),
];

const HIRA_YOON: KanaGroup[] = [
  g("h-ky", "hiragana", "ky", "きゃ", "yoon", [
    { k: "きゃ", r: ["kya"], v: "a" },
    { k: "きゅ", r: ["kyu"], v: "u" },
    { k: "きょ", r: ["kyo"], v: "o" },
  ]),
  g("h-sh", "hiragana", "sh", "しゃ", "yoon", [
    { k: "しゃ", r: ["sha", "sya"], v: "a" },
    { k: "しゅ", r: ["shu", "syu"], v: "u" },
    { k: "しょ", r: ["sho", "syo"], v: "o" },
  ]),
  g("h-ch", "hiragana", "ch", "ちゃ", "yoon", [
    { k: "ちゃ", r: ["cha", "tya"], v: "a" },
    { k: "ちゅ", r: ["chu", "tyu"], v: "u" },
    { k: "ちょ", r: ["cho", "tyo"], v: "o" },
  ]),
  g("h-ny", "hiragana", "ny", "にゃ", "yoon", [
    { k: "にゃ", r: ["nya"], v: "a" },
    { k: "にゅ", r: ["nyu"], v: "u" },
    { k: "にょ", r: ["nyo"], v: "o" },
  ]),
  g("h-hy", "hiragana", "hy", "ひゃ", "yoon", [
    { k: "ひゃ", r: ["hya"], v: "a" },
    { k: "ひゅ", r: ["hyu"], v: "u" },
    { k: "ひょ", r: ["hyo"], v: "o" },
  ]),
  g("h-my", "hiragana", "my", "みゃ", "yoon", [
    { k: "みゃ", r: ["mya"], v: "a" },
    { k: "みゅ", r: ["myu"], v: "u" },
    { k: "みょ", r: ["myo"], v: "o" },
  ]),
  g("h-ry", "hiragana", "ry", "りゃ", "yoon", [
    { k: "りゃ", r: ["rya"], v: "a" },
    { k: "りゅ", r: ["ryu"], v: "u" },
    { k: "りょ", r: ["ryo"], v: "o" },
  ]),
  g("h-gy", "hiragana", "gy", "ぎゃ", "yoon", [
    { k: "ぎゃ", r: ["gya"], v: "a" },
    { k: "ぎゅ", r: ["gyu"], v: "u" },
    { k: "ぎょ", r: ["gyo"], v: "o" },
  ]),
  g("h-j", "hiragana", "j", "じゃ", "yoon", [
    { k: "じゃ", r: ["ja", "jya", "zya"], v: "a" },
    { k: "じゅ", r: ["ju", "jyu", "zyu"], v: "u" },
    { k: "じょ", r: ["jo", "jyo", "zyo"], v: "o" },
  ]),
  g("h-by", "hiragana", "by", "びゃ", "yoon", [
    { k: "びゃ", r: ["bya"], v: "a" },
    { k: "びゅ", r: ["byu"], v: "u" },
    { k: "びょ", r: ["byo"], v: "o" },
  ]),
  g("h-py", "hiragana", "py", "ぴゃ", "yoon", [
    { k: "ぴゃ", r: ["pya"], v: "a" },
    { k: "ぴゅ", r: ["pyu"], v: "u" },
    { k: "ぴょ", r: ["pyo"], v: "o" },
  ]),
];

function kataFromHira(groups: KanaGroup[], prefix: string): KanaGroup[] {
  const map: Record<string, string> = {
    あ: "ア",
    い: "イ",
    う: "ウ",
    え: "エ",
    お: "オ",
    か: "カ",
    き: "キ",
    く: "ク",
    け: "ケ",
    こ: "コ",
    さ: "サ",
    し: "シ",
    す: "ス",
    せ: "セ",
    そ: "ソ",
    た: "タ",
    ち: "チ",
    つ: "ツ",
    て: "テ",
    と: "ト",
    な: "ナ",
    に: "ニ",
    ぬ: "ヌ",
    ね: "ネ",
    の: "ノ",
    は: "ハ",
    ひ: "ヒ",
    ふ: "フ",
    へ: "ヘ",
    ほ: "ホ",
    ま: "マ",
    み: "ミ",
    む: "ム",
    め: "メ",
    も: "モ",
    や: "ヤ",
    ゆ: "ユ",
    よ: "ヨ",
    ら: "ラ",
    り: "リ",
    る: "ル",
    れ: "レ",
    ろ: "ロ",
    わ: "ワ",
    を: "ヲ",
    ん: "ン",
    が: "ガ",
    ぎ: "ギ",
    ぐ: "グ",
    げ: "ゲ",
    ご: "ゴ",
    ざ: "ザ",
    じ: "ジ",
    ず: "ズ",
    ぜ: "ゼ",
    ぞ: "ゾ",
    だ: "ダ",
    ぢ: "ヂ",
    づ: "ヅ",
    で: "デ",
    ど: "ド",
    ば: "バ",
    び: "ビ",
    ぶ: "ブ",
    べ: "ベ",
    ぼ: "ボ",
    ぱ: "パ",
    ぴ: "ピ",
    ぷ: "プ",
    ぺ: "ペ",
    ぽ: "ポ",
    ゃ: "ャ",
    ゅ: "ュ",
    ょ: "ョ",
  };
  const toKata = (s: string) =>
    [...s].map((ch) => map[ch] ?? ch).join("");
  return groups.map((group) => ({
    ...group,
    id: group.id.replace(/^h-/, prefix),
    script: "katakana",
    title: toKata(group.title),
    chars: group.chars.map((c) => ({ ...c, k: toKata(c.k) })),
  }));
}

export const HIRAGANA: KanaGroup[] = [
  ...HIRA_MAIN,
  ...HIRA_DAKUTEN,
  ...HIRA_YOON,
];
export const KATAKANA: KanaGroup[] = kataFromHira(
  [...HIRA_MAIN, ...HIRA_DAKUTEN, ...HIRA_YOON],
  "k-",
);
export const ALL_GROUPS: KanaGroup[] = [...HIRAGANA, ...KATAKANA];

export function groupsFor(script: Script): KanaGroup[] {
  return script === "hiragana" ? HIRAGANA : KATAKANA;
}

export function defaultGroupId(script: Script): string {
  return script === "hiragana" ? "h-a" : "k-a";
}

export type PromptChar = KanaChar & { groupId: string; script: Script };

export function charsForGroups(ids: string[]): PromptChar[] {
  const set = new Set(ids);
  const out: PromptChar[] = [];
  for (const group of ALL_GROUPS) {
    if (!set.has(group.id)) continue;
    for (const ch of group.chars) {
      out.push({ ...ch, groupId: group.id, script: group.script });
    }
  }
  return out;
}

export function romajiPreview(group: KanaGroup): string {
  return group.chars.map((c) => c.r[0]).join(" ");
}

const SIMILAR: Record<string, string[]> = {
  あ: ["お"],
  お: ["あ"],
  い: ["り"],
  り: ["い"],
  う: ["つ", "ら"],
  つ: ["う", "し"],
  ら: ["ち", "う"],
  き: ["さ"],
  さ: ["き", "ち"],
  こ: ["い"],
  し: ["つ", "ん"],
  そ: ["ろ", "ん"],
  ろ: ["る", "そ"],
  る: ["ろ"],
  ち: ["ら", "さ"],
  ぬ: ["め"],
  め: ["ぬ"],
  ね: ["れ", "わ"],
  れ: ["ね", "わ"],
  わ: ["ね", "れ"],
  は: ["ほ"],
  ほ: ["は", "ま"],
  ま: ["ほ"],
  ン: ["ソ", "シ"],
  ソ: ["ン", "ツ", "ノ"],
  シ: ["ツ", "ン"],
  ツ: ["シ", "ソ"],
  ア: ["マ"],
  マ: ["ム", "ア"],
  ウ: ["ワ", "フ"],
  ワ: ["ウ", "フ"],
  フ: ["ワ", "ヌ"],
  ク: ["ケ", "タ"],
  ケ: ["ク"],
  ス: ["ヌ"],
  ヌ: ["ス", "メ"],
  タ: ["ヌ", "ク"],
  ナ: ["メ"],
  メ: ["ナ", "ヌ"],
  ハ: ["ヘ"],
  ヘ: ["ハ"],
  ロ: ["コ"],
  コ: ["ロ"],
  ト: ["ヲ"],
  ヲ: ["ト"],
  きゃ: ["しゃ", "ちゃ"],
  きゅ: ["しゅ", "ちゅ"],
  きょ: ["しょ", "ちょ"],
  しゃ: ["ちゃ", "きゃ"],
  しゅ: ["ちゅ", "きゅ"],
  しょ: ["ちょ", "きょ"],
  ちゃ: ["しゃ", "きゃ"],
  ちゅ: ["しゅ", "きゅ"],
  ちょ: ["しょ", "きょ"],
  にゃ: ["ひゃ", "みゃ"],
  にゅ: ["ひゅ", "みゅ"],
  にょ: ["ひょ", "みょ"],
  ひゃ: ["ぴゃ", "びゃ"],
  ひゅ: ["ぴゅ", "びゅ"],
  ひょ: ["ぴょ", "びょ"],
  ぎゃ: ["じゃ", "きゃ"],
  ぎゅ: ["じゅ", "きゅ"],
  ぎょ: ["じょ", "きょ"],
  じゃ: ["ぎゃ", "ちゃ"],
  じゅ: ["ぎゅ", "ちゅ"],
  じょ: ["ぎょ", "ちょ"],
  びゃ: ["ぴゃ", "ひゃ"],
  びゅ: ["ぴゅ", "ひゅ"],
  びょ: ["ぴょ", "ひょ"],
  ぴゃ: ["びゃ", "ひゃ"],
  ぴゅ: ["びゅ", "ひゅ"],
  ぴょ: ["びょ", "ひょ"],
  キャ: ["シャ", "チャ"],
  キュ: ["シュ", "チュ"],
  キョ: ["ショ", "チョ"],
  シャ: ["チャ", "キャ"],
  シュ: ["チュ", "キュ"],
  ショ: ["チョ", "キョ"],
  チャ: ["シャ", "キャ"],
  チュ: ["シュ", "キュ"],
  チョ: ["ショ", "キョ"],
  ギャ: ["ジャ", "キャ"],
  ギュ: ["ジュ", "キュ"],
  ギョ: ["ジョ", "キョ"],
  ジャ: ["ギャ", "チャ"],
  ジュ: ["ギュ", "チュ"],
  ジョ: ["ギョ", "チョ"],
};

export function similarKana(jp: string): string[] {
  return SIMILAR[jp] ?? [];
}

export function lookupKana(jp: string): { romaji: string; script: Script } | null {
  for (const group of ALL_GROUPS) {
    const found = group.chars.find((c) => c.k === jp);
    if (found) return { romaji: found.r[0] ?? "", script: group.script };
  }
  return null;
}

const YOON_MARKERS = [
  { re: /きゃ|きゅ|きょ|キャ|キュ|キョ/, hira: "きゃ", kata: "キャ" },
  { re: /しゃ|しゅ|しょ|シャ|シュ|ショ/, hira: "しゃ", kata: "シャ" },
  { re: /ちゃ|ちゅ|ちょ|チャ|チュ|チョ/, hira: "ちゃ", kata: "チャ" },
  { re: /にゃ|にゅ|にょ|ニャ|ニュ|ニョ/, hira: "にゃ", kata: "ニャ" },
  { re: /ひゃ|ひゅ|ひょ|ヒャ|ヒュ|ヒョ/, hira: "ひゃ", kata: "ヒャ" },
  { re: /みゃ|みゅ|みょ|ミャ|ミュ|ミョ/, hira: "みゃ", kata: "ミャ" },
  { re: /りゃ|りゅ|りょ|リャ|リュ|リョ/, hira: "りゃ", kata: "リャ" },
  { re: /ぎゃ|ぎゅ|ぎょ|ギャ|ギュ|ギョ/, hira: "ぎゃ", kata: "ギャ" },
  { re: /じゃ|じゅ|じょ|ジャ|ジュ|ジョ/, hira: "じゃ", kata: "ジャ" },
  { re: /びゃ|びゅ|びょ|ビャ|ビュ|ビョ/, hira: "びゃ", kata: "ビャ" },
  { re: /ぴゃ|ぴゅ|ぴょ|ピャ|ピュ|ピョ/, hira: "ぴゃ", kata: "ピャ" },
];

export function yoonTitlesIn(word: string): string[] {
  const found: string[] = [];
  for (const marker of YOON_MARKERS) {
    const m = word.match(marker.re);
    if (!m) continue;
    const first = m[0][0] ?? "";
    const kata = first >= "ァ" && first <= "ン";
    found.push(kata ? marker.kata : marker.hira);
  }
  return found;
}
