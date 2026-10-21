export type KanjiItem = {
  n: number;
  kanji: string;
  reading: string;
  romaji: string;
  meaning: string;
  bn: string;
  note?: string;
};

const k = (
  n: number,
  kanji: string,
  reading: string,
  romaji: string,
  meaning: string,
  bn: string,
  note?: string,
): KanjiItem => ({ n, kanji, reading, romaji, meaning, bn, note });

export const KANJI_ITEMS: KanjiItem[] = [
  k(1, "日", "ひ", "hi", "sun", "সূর্য"),
  k(2, "日曜日", "にちようび", "nichiyoubi", "Sunday", "রবিবার"),
  k(3, "日本", "にほん", "nihon", "Japan", "জাপান"),
  k(4, "4日", "よっか", "yokka", "four days", "চারদিন", "Also 四日"),
  k(5, "月", "つき", "tsuki", "moon", "চাঁদ"),
  k(6, "1月", "いちがつ", "ichigatsu", "January", "জানুয়ারি"),
  k(7, "〜か月", "かげつ", "kagetsu", "~ months (duration)", "কয় মাস"),
  k(8, "木", "き", "ki", "tree", "গাছ"),
  k(9, "木曜日", "もくようび", "mokuyoubi", "Thursday", "বৃহস্পতিবার"),
  k(10, "山", "やま", "yama", "mountain", "পাহাড়"),
  k(11, "川", "かわ", "kawa", "river", "নদী"),
  k(12, "口", "くち", "kuchi", "mouth", "মুখ"),
  k(13, "出口", "でぐち", "deguchi", "exit", "বেরোনোর পথ"),
  k(14, "入口", "いりぐち", "iriguchi", "entrance", "প্রবেশ পথ"),
  k(15, "人", "ひと", "hito", "person", "মানুষ"),
  k(16, "一人", "ひとり", "hitori", "one person", "একজন"),
  k(17, "日本人", "にほんじん", "nihonjin", "Japanese person", "জাপানি মানুষ"),
  k(18, "電車", "でんしゃ", "densha", "train", "ট্রেন"),
  k(19, "車", "くるま", "kuruma", "car", "গাড়ি"),
  k(20, "門", "もん", "mon", "gate", "বড় দরজা"),
  k(21, "四日", "よっか", "yokka", "4th (date)", "চার তারিখ", "Also written 4日"),
  k(22, "八日", "ようか", "youka", "8th (date)", "আট তারিখ", "Also written 8日"),
  k(23, "火", "ひ", "hi", "fire", "আগুন"),
  k(24, "火曜日", "かようび", "kayoubi", "Tuesday", "মঙ্গলবার"),
  k(25, "水", "みず", "mizu", "water", "পানি"),
  k(26, "水曜日", "すいようび", "suiyoubi", "Wednesday", "বুধবার"),
  k(27, "お金", "おかね", "okane", "money", "টাকা"),
  k(28, "金曜日", "きんようび", "kinyoubi", "Friday", "শুক্রবার"),
  k(29, "土", "と", "to", "earth, soil", "মাটি", "On-yomi used in 土曜日"),
  k(30, "土曜日", "どようび", "doyoubi", "Saturday", "শনিবার"),
  k(31, "子ども", "こども", "kodomo", "child", "শিশু"),
  k(32, "女の子", "おんなのこ", "onnanoko", "girl", "মেয়ে শিশু"),
  k(33, "女", "おんな", "onna", "woman", "মহিলা"),
  k(34, "女の人", "おんなのひと", "onnanohito", "woman (person)", "মহিলা"),
  k(35, "学生", "がくせい", "gakusei", "student", "ছাত্র ছাত্রী"),
  k(36, "大学", "だいがく", "daigaku", "university", "বিশ্ববিদ্যালয়"),
  k(37, "学校", "がっこう", "gakkou", "school", "স্কুল"),
  k(38, "生きる", "いきる", "ikiru", "to live", "বাঁচা"),
  k(39, "生まれる", "うまれる", "umareru", "to be born", "জন্ম নেওয়া"),
  k(40, "先生", "せんせい", "sensei", "teacher", "শিক্ষক"),
  k(41, "先", "さき", "saki", "ahead, before", "আগে"),
  k(42, "先月", "せんげつ", "sengetsu", "last month", "গতমাস"),
  k(43, "私", "わたし", "watashi", "I", "আমি"),
  k(44, "生年月日", "せいねんがっぴ", "seinengappi", "date of birth", "জন্ম তারিখ"),
  k(45, "一つ", "ひとつ", "hitotsu", "one (thing)", "একটি"),
  k(46, "一月", "いちがつ", "ichigatsu", "January", "জানুয়ারি মাস"),
  k(47, "一年", "いちねん", "ichinen", "one year", "এক বছর"),
  k(48, "二", "に", "ni", "two", "দুই"),
  k(49, "二人", "ふたり", "futari", "two people", "দুই জন"),
  k(50, "二月", "にがつ", "nigatsu", "February", "ফেব্রুয়ারি মাস"),
  k(51, "三月", "さんがつ", "sangatsu", "March", "মার্চ মাস"),
  k(52, "三つ", "みっつ", "mittsu", "three (things)", "তিনটি"),
  k(53, "三日", "みっか", "mikka", "3rd (date)", "তিন তারিখ"),
  k(54, "四つ", "よっつ", "yottsu", "four (things)", "চারটি"),
  k(55, "四日", "よっか", "yokka", "4th (date)", "চার তারিখ"),
  k(56, "四月", "しがつ", "shigatsu", "April", "এপ্রিল মাস"),
  k(57, "四年", "よねん", "yonen", "four years", "চার বছর"),
  k(58, "五つ", "いつつ", "itsutsu", "five (things)", "পাঁচটি"),
  k(59, "五日", "いつか", "itsuka", "5th (date)", "পাঁচ তারিখ"),
];

export const KANJI_LESSON_ID = "kanji";

export function kanjiSpeak(item: KanjiItem) {
  return item.reading
    .split("/")
    .map((s) => s.trim())
    .filter(Boolean)
    .join("、");
}

export function kanjiAnswers(item: KanjiItem) {
  const parts = (s: string) =>
    s
      .split("/")
      .map((x) => x.trim())
      .filter(Boolean);
  return [...parts(item.reading), ...parts(item.romaji)];
}

export function kanjiMatches(item: KanjiItem, q: string) {
  const n = q.trim().toLowerCase();
  if (!n) return true;
  return [
    String(item.n),
    item.kanji,
    item.reading,
    item.romaji,
    item.meaning,
    item.bn,
    item.note ?? "",
  ]
    .join("\n")
    .toLowerCase()
    .includes(n);
}
