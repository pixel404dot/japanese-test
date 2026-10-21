import type { VocabLesson, VocabWord } from "./vocab";

const D = ["", "いち", "に", "さん", "よん", "ご", "ろく", "なな", "はち", "きゅう"];
const R = ["", "ichi", "ni", "san", "yon", "go", "roku", "nana", "hachi", "kyuu"];

function join(
  parts: { jp: string; r: string }[],
): { jp: string; r: string } {
  return {
    jp: parts.map((p) => p.jp).join(""),
    r: parts.map((p) => p.r).join(""),
  };
}

function belowTenThousand(n: number): { jp: string; r: string } {
  const sen = Math.floor(n / 1000);
  const hyaku = Math.floor((n % 1000) / 100);
  const juu = Math.floor((n % 100) / 10);
  const ichi = n % 10;
  const parts: { jp: string; r: string }[] = [];
  if (sen === 1) parts.push({ jp: "せん", r: "sen" });
  else if (sen === 3) parts.push({ jp: "さんぜん", r: "sanzen" });
  else if (sen === 8) parts.push({ jp: "はっせん", r: "hassen" });
  else if (sen > 0) parts.push({ jp: `${D[sen]}せん`, r: `${R[sen]}sen` });
  if (hyaku === 1) parts.push({ jp: "ひゃく", r: "hyaku" });
  else if (hyaku === 3) parts.push({ jp: "さんびゃく", r: "sanbyaku" });
  else if (hyaku === 6) parts.push({ jp: "ろっぴゃく", r: "roppyaku" });
  else if (hyaku === 8) parts.push({ jp: "はっぴゃく", r: "happyaku" });
  else if (hyaku > 0) parts.push({ jp: `${D[hyaku]}ひゃく`, r: `${R[hyaku]}hyaku` });
  if (juu === 1) parts.push({ jp: "じゅう", r: "juu" });
  else if (juu > 0) parts.push({ jp: `${D[juu]}じゅう`, r: `${R[juu]}juu` });
  if (ichi > 0) parts.push({ jp: D[ichi]!, r: R[ichi]! });
  return join(parts);
}

export function yenReading(n: number): { jp: string; romaji: string[] } {
  if (n <= 0) return { jp: "ぜろえん", romaji: ["zeroen", "zero en"] };
  const man = Math.floor(n / 10_000);
  const rest = n % 10_000;
  const parts: { jp: string; r: string }[] = [];
  if (man === 1) parts.push({ jp: "いちまん", r: "ichiman" });
  else if (man > 0) parts.push({ jp: `${D[man]}まん`, r: `${R[man]}man` });
  if (rest > 0) parts.push(belowTenThousand(rest));
  const core = join(parts);
  const jp = `${core.jp}えん`;
  const compact = `${core.r}en`;
  return {
    jp,
    romaji: [compact, `${core.r} en`, jp],
  };
}

const AMOUNTS = [
  1, 5, 10, 50, 80, 100, 150, 200, 300, 400, 500, 600, 800, 900, 1000, 1100,
  1500, 2000, 3000, 3500, 5000, 8000, 9000, 10_000, 12_000, 20_000, 35_000,
  108, 250, 980, 4500, 9900, 21_000, 50_000,
];

export const MONEY_WORDS: VocabWord[] = AMOUNTS.map((n) => {
  const { jp, romaji } = yenReading(n);
  const yen = `¥${n.toLocaleString("en-US")}`;
  return {
    jp,
    romaji,
    meaning: yen,
    bn: `${n.toLocaleString("bn-BD")} ইয়েন`,
    kind: "word" as const,
    note: String(n),
  };
});

export const MONEY_LESSON: VocabLesson = {
  id: "money",
  number: 0,
  title: "Numbers & yen",
  titleJa: "えん",
  description: "Read prices: ひゃく, せん, まん, えん.",
  words: MONEY_WORDS,
};

const n = (
  jp: string,
  romaji: string | string[],
  meaning: string,
  bn: string,
  extra?: Partial<VocabWord>,
): VocabWord => ({
  jp,
  romaji: Array.isArray(romaji) ? romaji : [romaji],
  meaning,
  bn,
  kind: "word",
  ...extra,
});

/** Minna no Nihongo appendix I — Numerals. */
export const NUMERALS_LESSON: VocabLesson = {
  id: "numerals",
  number: 0,
  title: "Numerals",
  titleJa: "すうじ",
  description: "0 to 億, decimals, and fractions from the textbook appendix.",
  words: [
    n("ゼロ", ["zero", "rei"], "0", "শূন্য", {
      kanji: "0　零",
      note: "Also れい, used in decimals (0.5 = れいてんご).",
    }),
    n("いち", "ichi", "1", "এক", { kanji: "1　一" }),
    n("に", "ni", "2", "দুই", { kanji: "2　二" }),
    n("さん", "san", "3", "তিন", {
      kanji: "3　三",
      note: "The number. Same sound as the name suffix さん.",
    }),
    n("よん", ["yon", "shi"], "4", "চার", {
      kanji: "4　四",
      note: "Also し. よん is more common.",
    }),
    n("ご", "go", "5", "পাঁচ", {
      kanji: "5　五",
      note: "The number. Same sound as 語 (language).",
    }),
    n("ろく", "roku", "6", "ছয়", { kanji: "6　六" }),
    n("なな", ["nana", "shichi"], "7", "সাত", {
      kanji: "7　七",
      note: "Also しち. なな is more common.",
    }),
    n("はち", "hachi", "8", "আট", { kanji: "8　八" }),
    n("きゅう", ["kyuu", "ku"], "9", "নয়", {
      kanji: "9　九",
      note: "Also く (clock time: 9時 = くじ).",
    }),
    n("じゅう", "juu", "10", "দশ", { kanji: "10　十" }),
    n("じゅういち", "juuichi", "11", "এগারো", { kanji: "11　十一" }),
    n("じゅうに", "juuni", "12", "বারো", { kanji: "12　十二" }),
    n("じゅうさん", "juusan", "13", "তেরো", { kanji: "13　十三" }),
    n("じゅうよん", ["juuyon", "juushi"], "14", "চৌদ্দ", {
      kanji: "14　十四",
      note: "Also じゅうし.",
    }),
    n("じゅうご", "juugo", "15", "পনেরো", { kanji: "15　十五" }),
    n("じゅうろく", "juuroku", "16", "ষোলো", { kanji: "16　十六" }),
    n("じゅうなな", ["juunana", "juushichi"], "17", "সতেরো", {
      kanji: "17　十七",
      note: "Also じゅうしち.",
    }),
    n("じゅうはち", "juuhachi", "18", "আঠারো", { kanji: "18　十八" }),
    n("じゅうきゅう", ["juukyuu", "juuku"], "19", "উনিশ", {
      kanji: "19　十九",
      note: "Also じゅうく.",
    }),
    n("にじゅう", "nijuu", "20", "বিশ", { kanji: "20　二十" }),
    n("さんじゅう", "sanjuu", "30", "ত্রিশ", { kanji: "30　三十" }),
    n("よんじゅう", "yonjuu", "40", "চল্লিশ", { kanji: "40　四十" }),
    n("ごじゅう", "gojuu", "50", "পঞ্চাশ", { kanji: "50　五十" }),
    n("ろくじゅう", "rokujuu", "60", "ষাট", { kanji: "60　六十" }),
    n("ななじゅう", ["nanajuu", "shichijuu"], "70", "সত্তর", {
      kanji: "70　七十",
      note: "Also しちじゅう.",
    }),
    n("はちじゅう", "hachijuu", "80", "আশি", { kanji: "80　八十" }),
    n("きゅうじゅう", "kyuujuu", "90", "নব্বই", { kanji: "90　九十" }),
    n("ひゃく", "hyaku", "100", "একশ", { kanji: "100　百" }),
    n("にひゃく", "nihyaku", "200", "দুইশ", { kanji: "200　二百" }),
    n("さんびゃく", "sanbyaku", "300", "তিনশ", {
      kanji: "300　三百",
      note: "ひゃく → びゃく after さん.",
    }),
    n("よんひゃく", "yonhyaku", "400", "চারশ", { kanji: "400　四百" }),
    n("ごひゃく", "gohyaku", "500", "পাঁচশ", { kanji: "500　五百" }),
    n("ろっぴゃく", "roppyaku", "600", "ছয়শ", {
      kanji: "600　六百",
      note: "ろく + ひゃく → ろっぴゃく.",
    }),
    n("ななひゃく", "nanahyaku", "700", "সাতশ", { kanji: "700　七百" }),
    n("はっぴゃく", "happyaku", "800", "আটশ", {
      kanji: "800　八百",
      note: "はち + ひゃく → はっぴゃく.",
    }),
    n("きゅうひゃく", "kyuuhyaku", "900", "নয়শ", { kanji: "900　九百" }),
    n("せん", "sen", "1,000", "এক হাজার", { kanji: "1,000　千" }),
    n("にせん", "nisen", "2,000", "দুই হাজার", { kanji: "2,000　二千" }),
    n("さんぜん", "sanzen", "3,000", "তিন হাজার", {
      kanji: "3,000　三千",
      note: "せん → ぜん after さん.",
    }),
    n("よんせん", "yonsen", "4,000", "চার হাজার", { kanji: "4,000　四千" }),
    n("ごせん", "gosen", "5,000", "পাঁচ হাজার", { kanji: "5,000　五千" }),
    n("ろくせん", "rokusen", "6,000", "ছয় হাজার", { kanji: "6,000　六千" }),
    n("ななせん", "nanasen", "7,000", "সাত হাজার", { kanji: "7,000　七千" }),
    n("はっせん", "hassen", "8,000", "আট হাজার", {
      kanji: "8,000　八千",
      note: "はち + せん → はっせん.",
    }),
    n("きゅうせん", "kyuusen", "9,000", "নয় হাজার", { kanji: "9,000　九千" }),
    n("いちまん", "ichiman", "10,000", "দশ হাজার", {
      kanji: "10,000　一万",
      note: "まん = 10,000. Japanese groups digits by four.",
    }),
    n("じゅうまん", "juuman", "100,000", "এক লাখ", { kanji: "100,000　十万" }),
    n("ひゃくまん", "hyakuman", "1,000,000", "দশ লাখ", {
      kanji: "1,000,000　百万",
    }),
    n("せんまん", "senman", "10,000,000", "এক কোটি", {
      kanji: "10,000,000　千万",
    }),
    n("いちおく", "ichioku", "100,000,000", "দশ কোটি", {
      kanji: "100,000,000　一億",
      note: "おく = 100 million.",
    }),
    n("じゅうななてんご", "juunana ten go", "17.5", "১৭.৫", {
      kanji: "17.5",
      note: "てん = decimal point.",
    }),
    n("れいてんはちさん", "rei ten hachi san", "0.83", "০.৮৩", {
      kanji: "0.83",
      note: "0 before the point is れい.",
    }),
    n("にぶんのいち", ["nibun no ichi", "nibunnoichi"], "1/2", "১/২", {
      kanji: "1/2　二分の一",
      note: "AぶんのB = B/A. Denominator first.",
    }),
    n("よんぶんのさん", ["yonbun no san", "yonbunnosan"], "3/4", "৩/৪", {
      kanji: "3/4　四分の三",
      note: "AぶんのB = B/A. Denominator first.",
    }),
  ],
};

