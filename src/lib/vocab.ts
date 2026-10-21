import { MONEY_LESSON, NUMERALS_LESSON } from "./numbers";
export { MONEY_LESSON, NUMERALS_LESSON };
import { APPENDIX_INDEX, VOCAB_INDEX } from "./vocab-index";
import { LESSON_DIALOGUES_11_20, VOCAB_LESSONS_11_20 } from "./vocab-l11-20";
import { LESSON_DIALOGUES_21_25, VOCAB_LESSONS_21_25 } from "./vocab-l21-25";

export type VocabWord = {
  jp: string;
  kanji?: string;
  romaji: string[];
  meaning: string;
  bn: string;
  note?: string;
  kind?: "word" | "phrase";
};

export type VocabLesson = {
  id: string;
  number: number;
  title: string;
  titleJa: string;
  description: string;
  words: VocabWord[];
};

export function shuffleList<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = a[i]!;
    a[i] = a[j]!;
    a[j] = t;
  }
  return a;
}

const r = (
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

const p = (
  jp: string,
  romaji: string | string[],
  meaning: string,
  bn: string,
  extra?: Partial<VocabWord>,
): VocabWord => r(jp, romaji, meaning, bn, { kind: "phrase", ...extra });

export const VOCAB_LESSONS: VocabLesson[] = [
  {
    id: "lesson-1",
    number: 1,
    title: "People & introductions",
    titleJa: "だい1か",
    description: "Who people are, jobs, age, countries, and first greetings.",
    words: [
      r("わたし", "watashi", "I", "আমি"),
      r("あなた", "anata", "you", "আপনি"),
      r("あのひと", ["anohito", "ano hito"], "that person, he, she", "সেই ব্যক্তি, তিনি", {
        kanji: "あの人",
      }),
      r("あのかた", ["anokata", "ano kata"], "that person (polite)", "সেই ব্যক্তি (শালীন)", {
        kanji: "あの方",
        note: "Polite equivalent of あのひと",
      }),
      r("さん", "san", "Mr., Ms.", "জনাব / জনাবা", {
        note: "Suffix added to a name",
      }),
      r("ちゃん", "chan", "suffix for a child's name", "শিশুর নামের সাথে", {
        note: "Often used instead of さん",
      }),
      r("じん", "jin", "a national of ~", "~ দেশের নাগরিক", {
        kanji: "人",
        note: "e.g. アメリカじん, an American",
      }),
      r("せんせい", ["sensei"], "teacher, instructor", "শিক্ষক", {
        kanji: "先生",
        note: "Not used when referring to one's own job",
      }),
      r("きょうし", ["kyoushi", "kyoshi"], "teacher, instructor", "শিক্ষক", {
        kanji: "教師",
      }),
      r("がくせい", "gakusei", "student", "শিক্ষার্থী", { kanji: "学生" }),
      r("かいしゃいん", "kaishain", "company employee", "কোম্পানির কর্মী", {
        kanji: "会社員",
      }),
      r("しゃいん", "shain", "employee of ~ company", "~ কোম্পানির কর্মী", {
        kanji: "社員",
        note: "Used with a company name, e.g. IMCのしゃいん",
      }),
      r("ぎんこういん", ["ginkouin", "ginkoin"], "bank employee", "ব্যাংক কর্মী", {
        kanji: "銀行員",
      }),
      r("いしゃ", "isha", "doctor", "ডাক্তার", { kanji: "医者" }),
      r("けんきゅうしゃ", ["kenkyuusha", "kenkyusha"], "researcher, scholar", "গবেষক", {
        kanji: "研究者",
      }),
      r("だいがく", "daigaku", "university", "বিশ্ববিদ্যালয়", { kanji: "大学" }),
      r("びょういん", ["byouin", "byooin"], "hospital", "হাসপাতাল", { kanji: "病院" }),
      r("だれ", "dare", "who", "কে"),
      r("どなた", "donata", "who (polite)", "কে (শালীন)", {
        note: "Polite equivalent of だれ",
      }),
      r("さい", ["sai"], "years old", "বছর বয়স", { kanji: "歳" }),
      r("なんさい", "nansai", "how old", "কত বছর", { kanji: "何歳" }),
      r("おいくつ", "oikutsu", "how old (polite)", "কত বছর (শালীন)", {
        note: "Polite equivalent of なんさい",
      }),
      r("はい", "hai", "yes", "হ্যাঁ"),
      r("いいえ", "iie", "no", "না"),
      r("アメリカ", "amerika", "U.S.A.", "মার্কিন যুক্তরাষ্ট্র"),
      r("イギリス", "igirisu", "U.K.", "যুক্তরাজ্য"),
      r("インド", "indo", "India", "ভারত"),
      r("インドネシア", "indoneshia", "Indonesia", "ইন্দোনেশিয়া"),
      r("かんこく", "kankoku", "South Korea", "দক্ষিণ কোরিয়া", { kanji: "韓国" }),
      r("タイ", "tai", "Thailand", "থাইল্যান্ড"),
      r("ちゅうごく", ["chuugoku", "chugoku"], "China", "চীন", { kanji: "中国" }),
      r("ドイツ", "doitsu", "Germany", "জার্মানি"),
      r("にほん", ["nihon", "nippon"], "Japan", "জাপান", { kanji: "日本" }),
      r("ブラジル", "burajiru", "Brazil", "ব্রাজিল"),
      r("パワーでんき", ["pawaadenki", "power denki", "pawa denki"], "Power Electric", "পাওয়ার ইলেকট্রিক", {
        kanji: "パワー電気",
        note: "Fictitious company",
      }),
      r("ブラジルエアー", ["burajirueaa", "brazil air"], "Brazil Air", "ব্রাজিল এয়ার", {
        note: "Fictitious company",
      }),
      r("こうべびょういん", ["koubebyouin", "kobe byouin", "koube byooin"], "Kobe Hospital", "কোবে হাসপাতাল", {
        kanji: "神戸病院",
        note: "Fictitious hospital",
      }),
      r("さくらだいがく", "sakuradaigaku", "Sakura University", "সাকুরা বিশ্ববিদ্যালয়", {
        kanji: "さくら大学",
        note: "Fictitious university",
      }),
      r("ふじだいがく", "fujidaigaku", "Fuji University", "ফুজি বিশ্ববিদ্যালয়", {
        kanji: "富士大学",
        note: "Fictitious university",
      }),
      p("はじめまして", "hajimemashite", "How do you do?", "কেমন আছেন? (প্রথম পরিচয়)", {
        note: "Used when introducing yourself for the first time",
      }),
      p("からきました", ["kara kimashita", "karakimashita"], "I'm from ~", "আমি ~ থেকে এসেছি", {
        kanji: "から来ました",
      }),
      p(
        "どうぞよろしくおねがいします",
        [
          "douzo yoroshiku onegaishimasu",
          "dozo yoroshiku onegaishimasu",
          "douzoyoroshikuonegaishimasu",
          "yoroshiku onegaishimasu",
        ],
        "Pleased to meet you.",
        "আপনার সাথে পরিচিত হয়ে খুশি",
        { kanji: "どうぞよろしくお願いします" },
      ),
      p(
        "しつれいですが",
        ["shitsurei desu ga", "shitsureidesuga", "shitsurei desuga"],
        "Excuse me, but",
        "দুঃখিত, কিন্তু",
        {
          kanji: "失礼ですが",
          note: "Used when asking for personal information",
        },
      ),
      p("おなまえは", ["onamae wa", "onamaewa", "onamaeha"], "May I have your name?", "আপনার নাম কী?", {
        kanji: "お名前は",
      }),
      p("こちらは", ["kochira wa", "kochirawa"], "This is Mr./Ms. ~", "ইনি হলেন ~"),
    ],
  },
  {
    id: "lesson-2",
    number: 2,
    title: "Things around you",
    titleJa: "だい2か",
    description: "This and that, everyday objects, and simple replies.",
    words: [
      r("これ", "kore", "this (thing here)", "এটা (কাছের জিনিস)"),
      r("それ", "sore", "that (thing near the listener)", "ওটা (শ্রোতার কাছের)"),
      r("あれ", "are", "that (thing over there)", "সেটা (দূরের জিনিস)"),
      r("この", "kono", "this ~, this ~ here", "এই ~"),
      r("その", "sono", "that ~, that ~ near the listener", "ওই ~"),
      r("あの", "ano", "that ~, that ~ over there", "সেই ~"),
      r("ほん", "hon", "book", "বই", { kanji: "本" }),
      r("じしょ", "jisho", "dictionary", "অভিধান", { kanji: "辞書" }),
      r("ざっし", "zasshi", "magazine", "ম্যাগাজিন", { kanji: "雑誌" }),
      r("しんぶん", "shinbun", "newspaper", "সংবাদপত্র", { kanji: "新聞" }),
      r("ノート", ["nooto", "noto"], "notebook", "খাতা"),
      r("てちょう", ["techou", "techo"], "personal organiser", "পকেট ডায়েরি", {
        kanji: "手帳",
      }),
      r("めいし", "meishi", "business card", "ভিজিটিং কার্ড", { kanji: "名刺" }),
      r("カード", ["kaado", "kado"], "card, credit card", "কার্ড"),
      r("えんぴつ", "enpitsu", "pencil", "পেন্সিল", { kanji: "鉛筆" }),
      r("ボールペン", ["boorupen", "borupen"], "ballpoint pen", "বলপয়েন্ট কলম"),
      r(
        "シャープペンシル",
        ["shaapupenshiru", "sharpupenshiru", "shaapu penshiru"],
        "mechanical pencil",
        "শার্প পেন্সিল",
      ),
      r("かぎ", "kagi", "key", "চাবি"),
      r("とけい", "tokei", "watch, clock", "ঘড়ি", { kanji: "時計" }),
      r("かさ", "kasa", "umbrella", "ছাতা", { kanji: "傘" }),
      r("かばん", "kaban", "bag, briefcase", "ব্যাগ"),
      r("CD", ["shiidii", "cd", "shidii"], "CD, compact disc", "সিডি"),
      r("テレビ", "terebi", "television", "টেলিভিশন"),
      r("ラジオ", "rajio", "radio", "রেডিও"),
      r("カメラ", "kamera", "camera", "ক্যামেরা"),
      r("コンピューター", ["konpyuutaa", "konpyuta"], "computer", "কম্পিউটার"),
      r("くるま", "kuruma", "car, vehicle", "গাড়ি", { kanji: "車" }),
      r("つくえ", "tsukue", "desk", "টেবিল / ডেস্ক", { kanji: "机" }),
      r("いす", "isu", "chair", "চেয়ার"),
      r("チョコレート", ["chokoreeto", "chokoreto"], "chocolate", "চকলেট"),
      r("コーヒー", ["koohii", "kohii", "coffee"], "coffee", "কফি"),
      r("おみやげ", "omiyage", "souvenir, present", "উপহার / সুভেনির", {
        kanji: "お土産",
      }),
      r("みやげ", "miyage", "souvenir, present", "উপহার", { kanji: "土産" }),
      r("えいご", "eigo", "the English language", "ইংরেজি ভাষা", { kanji: "英語" }),
      r("にほんご", "nihongo", "the Japanese language", "জাপানি ভাষা", {
        kanji: "日本語",
      }),
      r("ご", "go", "language", "ভাষা", {
        kanji: "語",
        note: "Suffix, e.g. フランスご",
      }),
      r("なん", "nan", "what", "কী", { kanji: "何" }),
      r("そう", "sou", "so", "তাই / সেরকম"),
      p("あのう", ["anou", "ano"], "Er…", "ওহ…", {
        note: "Used to show hesitation",
      }),
      p("えっ", ["e", "eh"], "Oh? What!", "হ্যাঁ? কী!", {
        note: "Used when hearing something unexpected",
      }),
      p("どうぞ", ["douzo", "dozo"], "Here you are.", "নিন", {
        note: "Used when offering someone something",
      }),
      p("ありがとう", ["arigatou", "arigato"], "Thank you", "ধন্যবাদ"),
      p(
        "ありがとうございます",
        ["arigatou gozaimasu", "arigatougozaimasu", "arigato gozaimasu"],
        "Thank you very much",
        "অনেক ধন্যবাদ",
      ),
      p(
        "どうもありがとうございます",
        [
          "doumo arigatou gozaimasu",
          "domo arigatou gozaimasu",
          "doumoarigatougozaimasu",
        ],
        "Thank you very much",
        "অসংখ্য ধন্যবাদ",
      ),
      p("そうですか", ["sou desu ka", "soudesuka", "so desu ka"], "I see.", "আচ্ছা"),
      p("ちがいます", "chigaimasu", "No, it isn't. You are wrong.", "না, তা নয়", {
        kanji: "違います",
      }),
      p("あ", "a", "Oh!", "আহ!", {
        note: "Used when becoming aware of something",
      }),
      p(
        "これからおせわになります",
        ["korekara osewa ni narimasu", "korekaraosewaninarimasu"],
        "Thank you in advance for your kindness.",
        "এখন থেকে আপনার যত্নে থাকব",
        { kanji: "これからお世話になります" },
      ),
      p(
        "こちらこそよろしくおねがいします",
        [
          "kochirakoso yoroshiku onegaishimasu",
          "kochirakosoyoroshikuonegaishimasu",
        ],
        "Pleased to meet you, too.",
        "আমিও, পরিচিত হয়ে খুশি",
        { kanji: "こちらこそよろしくお願いします" },
      ),
    ],
  },
  {
    id: "lesson-3",
    number: 3,
    title: "Places & shopping",
    titleJa: "だい3か",
    description: "Here and there, rooms in a building, floors, prices, and shops.",
    words: [
      r("ここ", "koko", "here, this place", "এখানে"),
      r("そこ", "soko", "there, that place near the listener", "ওখানে"),
      r("あそこ", "asoko", "that place over there", "সেখানে"),
      r("どこ", "doko", "where, what place", "কোথায়"),
      r("こちら", "kochira", "this way, this place", "এদিকে / এখানে", {
        note: "Polite equivalent of ここ",
      }),
      r("そちら", "sochira", "that way, that place near the listener", "ওদিকে", {
        note: "Polite equivalent of そこ",
      }),
      r("あちら", "achira", "that way, that place over there", "সেদিকে", {
        note: "Polite equivalent of あそこ",
      }),
      r("どちら", "dochira", "which way, where", "কোন দিকে / কোথায়", {
        note: "Polite equivalent of どこ",
      }),
      r("きょうしつ", ["kyoushitsu", "kyoshitsu"], "classroom", "শ্রেণিকক্ষ", {
        kanji: "教室",
      }),
      r("しょくどう", ["shokudou", "shokudo"], "dining hall, canteen", "ক্যান্টিন", {
        kanji: "食堂",
      }),
      r("じむしょ", "jimusho", "office", "অফিস", { kanji: "事務所" }),
      r("かいぎしつ", "kaigishitsu", "conference room, meeting room", "মিটিং রুম", {
        kanji: "会議室",
      }),
      r("うけつけ", "uketsuke", "reception desk", "রিসেপশন", { kanji: "受付" }),
      r("ロビー", ["robii", "robi"], "lobby", "লবি"),
      r("へや", "heya", "room", "ঘর", { kanji: "部屋" }),
      r("トイレ", "toire", "toilet, rest room", "টয়লেট"),
      r("おてあらい", "otearai", "toilet, rest room", "ওয়াশরুম", {
        kanji: "お手洗い",
      }),
      r("かいだん", "kaidan", "staircase", "সিঁড়ি", { kanji: "階段" }),
      r("エレベーター", ["erebeetaa", "erebeta"], "lift, elevator", "লিফট"),
      r("エスカレーター", ["esukareetaa", "esukareta"], "escalator", "এস্কেলেটর"),
      r("じどうはんばいき", ["jidouhanbaiki", "jidohanbaiki"], "vending machine", "ভেন্ডিং মেশিন", {
        kanji: "自動販売機",
      }),
      r("でんわ", "denwa", "telephone, telephone call", "টেলিফোন", { kanji: "電話" }),
      r("くに", "kuni", "country", "দেশ", { kanji: "国" }),
      r("おくに", "okuni", "country (polite)", "দেশ (শালীন)", { kanji: "お国" }),
      r("かいしゃ", "kaisha", "company", "কোম্পানি", { kanji: "会社" }),
      r("うち", "uchi", "house, home", "বাড়ি"),
      r("くつ", "kutsu", "shoes", "জুতা", { kanji: "靴" }),
      r("ネクタイ", "nekutai", "tie, necktie", "নেকটাই"),
      r("ワイン", "wain", "wine", "ওয়াইন"),
      r("うりば", "uriba", "department, counter", "কাউন্টার / বিভাগ", {
        kanji: "売り場",
        note: "In a department store, etc.",
      }),
      r("ちか", "chika", "basement", "বেসমেন্ট", { kanji: "地下" }),
      r("かい", "kai", "-th floor", "তলা", { kanji: "階" }),
      r("なんがい", "nangai", "what floor", "কত তলা", { kanji: "何階" }),
      r("えん", "en", "yen", "ইয়েন", { kanji: "円" }),
      r("いくら", "ikura", "how much", "কত দাম"),
      r("ひゃく", "hyaku", "hundred", "একশ", { kanji: "百" }),
      r("せん", "sen", "thousand", "এক হাজার", { kanji: "千" }),
      r("まん", "man", "ten thousand", "দশ হাজার", { kanji: "万" }),
      r("イタリア", "itaria", "Italy", "ইতালি"),
      r("スイス", "suisu", "Switzerland", "সুইজারল্যান্ড"),
      r("フランス", "furansu", "France", "ফ্রান্স"),
      r("ジャカルタ", "jakaruta", "Jakarta", "জাকার্তা"),
      r("バンコク", "bankoku", "Bangkok", "ব্যাংকক"),
      r("ベルリン", "berurin", "Berlin", "বার্লিন"),
      r("しんおおさか", ["shinoosaka", "shin oosaka", "shin-oosaka"], "Shin-Osaka", "শিন-ওসাকা", {
        kanji: "新大阪",
        note: "A station in Osaka",
      }),
      p("すみません", "sumimasen", "Excuse me.", "দুঃখিত / মাফ করবেন"),
      p("どうも", ["doumo", "domo"], "Thanks.", "ধন্যবাদ"),
      p("いらっしゃいませ", "irasshaimase", "Welcome. May I help you?", "স্বাগতম", {
        note: "Greeting to a customer entering a shop",
      }),
      p("みせてください", ["misete kudasai", "misetekudasai"], "Please show me ~", "অনুগ্রহ করে দেখান", {
        kanji: "見せてください",
      }),
      p("じゃ", "ja", "well, then, in that case", "তাহলে"),
      p("ください", "kudasai", "Give me ~, please.", "দিন, অনুগ্রহ করে", {
        kanji: "下さい",
      }),
    ],
  },
  {
    id: "lesson-4",
    number: 4,
    title: "Time & daily life",
    titleJa: "だい4か",
    description: "Getting up and working, the time, days of the week, and places in town.",
    words: [
      r("おきます", "okimasu", "get up, wake up", "ওঠা", { kanji: "起きます" }),
      r("ねます", "nemasu", "sleep, go to bed", "ঘুমানো", { kanji: "寝ます" }),
      r("はたらきます", "hatarakimasu", "work", "কাজ করা", { kanji: "働きます" }),
      r("やすみます", "yasumimasu", "take a rest, take a holiday", "বিশ্রাম নেওয়া / ছুটি নেওয়া", {
        kanji: "休みます",
      }),
      r("べんきょうします", ["benkyoushimasu", "benkyou shimasu", "benkyoshimasu"], "study", "পড়াশোনা করা", {
        kanji: "勉強します",
      }),
      r("おわります", "owarimasu", "finish", "শেষ করা", { kanji: "終わります" }),
      r("デパート", ["depaato", "depato"], "department store", "ডিপার্টমেন্ট স্টোর"),
      r("ぎんこう", ["ginkou", "ginko"], "bank", "ব্যাংক", { kanji: "銀行" }),
      r("ゆうびんきょく", ["yuubinkyoku", "yubinkyoku"], "post office", "ডাকঘর", {
        kanji: "郵便局",
      }),
      r("としょかん", "toshokan", "library", "গ্রন্থাগার", { kanji: "図書館" }),
      r("びじゅつかん", "bijutsukan", "art museum, art gallery", "আর্ট মিউজিয়াম", {
        kanji: "美術館",
      }),
      r("いま", "ima", "now", "এখন", { kanji: "今" }),
      r("じ", "ji", "o'clock", "টা", {
        kanji: "時",
        note: "e.g. いちじ, くじ",
      }),
      r("ふん", ["fun", "pun"], "minute", "মিনিট", {
        kanji: "分",
        note: "ーふん or ーぷん, depending on the number",
      }),
      r("はん", "han", "half", "সাড়ে", { kanji: "半" }),
      r("なんじ", "nanji", "what time", "কয়টা", { kanji: "何時" }),
      r("なんぷん", ["nanpun", "nanfun"], "what minute", "কত মিনিট", {
        kanji: "何分",
      }),
      r("ごぜん", "gozen", "a.m., morning", "সকাল (AM)", { kanji: "午前" }),
      r("ごご", "gogo", "p.m., afternoon", "বিকাল (PM)", { kanji: "午後" }),
      r("あさ", "asa", "morning", "সকাল", { kanji: "朝" }),
      r("ひる", "hiru", "daytime, noon", "দুপুর", { kanji: "昼" }),
      r("ばん", "ban", "night, evening", "রাত / সন্ধ্যা", {
        kanji: "晩",
        note: "よる is also used",
      }),
      r("よる", "yoru", "night", "রাত", { kanji: "夜" }),
      r("おととい", "ototoi", "the day before yesterday", "গত পরশু"),
      r("きのう", ["kinou", "kinoo"], "yesterday", "গতকাল"),
      r("きょう", ["kyou", "kyo"], "today", "আজ"),
      r("あした", "ashita", "tomorrow", "আগামীকাল"),
      r("あさって", "asatte", "the day after tomorrow", "আগামী পরশু"),
      r("けさ", "kesa", "this morning", "আজ সকালে", { kanji: "今朝" }),
      r("こんばん", "konban", "this evening, tonight", "আজ রাতে", { kanji: "今晩" }),
      r("やすみ", "yasumi", "rest, a holiday, a day off", "ছুটি / বিশ্রাম", {
        kanji: "休み",
      }),
      r("ひるやすみ", "hiruyasumi", "lunchtime", "দুপুরের বিরতি", { kanji: "昼休み" }),
      r("しけん", "shiken", "examination, test", "পরীক্ষা", { kanji: "試験" }),
      r("かいぎ", "kaigi", "meeting, conference", "মিটিং", {
        kanji: "会議",
        note: "〜をします: hold a meeting",
      }),
      r("えいが", "eiga", "film, movie", "সিনেমা", { kanji: "映画" }),
      r("まいあさ", "maiasa", "every morning", "প্রতি সকালে", { kanji: "毎朝" }),
      r("まいばん", "maiban", "every night", "প্রতি রাতে", { kanji: "毎晩" }),
      r("まいにち", "mainichi", "every day", "প্রতিদিন", { kanji: "毎日" }),
      r("げつようび", ["getsuyoubi", "getsuyobi"], "Monday", "সোমবার", {
        kanji: "月曜日",
      }),
      r("かようび", ["kayoubi", "kayobi"], "Tuesday", "মঙ্গলবার", { kanji: "火曜日" }),
      r("すいようび", ["suiyoubi", "suiyobi"], "Wednesday", "বুধবার", {
        kanji: "水曜日",
      }),
      r("もくようび", ["mokuyoubi", "mokuyobi"], "Thursday", "বৃহস্পতিবার", {
        kanji: "木曜日",
      }),
      r("きんようび", ["kinyoubi", "kinyobi"], "Friday", "শুক্রবার", {
        kanji: "金曜日",
      }),
      r("どようび", ["doyoubi", "doyobi"], "Saturday", "শনিবার", { kanji: "土曜日" }),
      r("にちようび", ["nichiyoubi", "nichiyobi"], "Sunday", "রবিবার", {
        kanji: "日曜日",
      }),
      r("なんようび", ["nanyoubi", "nanyobi"], "what day of the week", "কোন বার", {
        kanji: "何曜日",
      }),
      r("から", "kara", "from ~", "থেকে"),
      r("まで", "made", "up to ~, until ~", "পর্যন্ত"),
      r("と", "to", "and (connects nouns)", "এবং"),
      r("ばんごう", ["bangou", "bango"], "number", "নম্বর", { kanji: "番号" }),
      r("なんばん", "nanban", "what number", "কত নম্বর", { kanji: "何番" }),
      r("ニューヨーク", ["nyuuyooku", "nyuyoku"], "New York", "নিউ ইয়র্ক"),
      r("ペキン", "pekin", "Beijing", "বেইজিং", { kanji: "北京" }),
      r("ロサンゼルス", "rosanzerusu", "Los Angeles", "লস অ্যাঞ্জেলেস"),
      r("ロンドン", "rondon", "London", "লন্ডন"),
      r("あすか", "asuka", "Asuka", "আসুকা", {
        note: "Fictitious Japanese restaurant",
      }),
      r("アップルぎんこう", ["appuruginkou", "apple ginkou"], "Apple Bank", "অ্যাপল ব্যাংক", {
        kanji: "アップル銀行",
        note: "Fictitious bank",
      }),
      r("みどりとしょかん", "midoritoshokan", "Midori Library", "মিদোরি গ্রন্থাগার", {
        kanji: "みどり図書館",
        note: "Fictitious library",
      }),
      r("やまとびじゅつかん", "yamatobijutsukan", "Yamato Art Museum", "ইয়ামাতো আর্ট গ্যালারি", {
        kanji: "やまと美術館",
        note: "Fictitious art gallery",
      }),
      p("たいへんですね", ["taihen desu ne", "taihendesune"], "That's tough, isn't it?", "কষ্ট হয়েছে, তাই না?", {
        kanji: "大変ですね",
        note: "Used when expressing sympathy",
      }),
    ],
  },
  {
    id: "lesson-5",
    number: 5,
    title: "Going & coming",
    titleJa: "だい5か",
    description: "Travel, transport, people, weeks and months, and dates.",
    words: [
      r("いきます", "ikimasu", "go", "যাওয়া", { kanji: "行きます" }),
      r("きます", "kimasu", "come", "আসা", { kanji: "来ます" }),
      r("かえります", "kaerimasu", "go home, return", "বাড়ি ফেরা", { kanji: "帰ります" }),
      r("がっこう", "gakkou", "school", "স্কুল", { kanji: "学校" }),
      r("スーパー", ["suupaa", "supa"], "supermarket", "সুপারমার্কেট"),
      r("えき", "eki", "station", "স্টেশন", { kanji: "駅" }),
      r("ひこうき", ["hikouki", "hikoki"], "aeroplane, airplane", "বিমান", {
        kanji: "飛行機",
      }),
      r("ふね", "fune", "ship", "জাহাজ", { kanji: "船" }),
      r("でんしゃ", "densha", "electric train", "ট্রেন", { kanji: "電車" }),
      r("ちかてつ", "chikatetsu", "underground, subway", "মেট্রো", { kanji: "地下鉄" }),
      r("しんかんせん", "shinkansen", "the Shinkansen, the bullet train", "শিনকানসেন", {
        kanji: "新幹線",
      }),
      r("バス", "basu", "bus", "বাস"),
      r("タクシー", ["takushii", "takushi"], "taxi", "ট্যাক্সি"),
      r("じてんしゃ", "jitensha", "bicycle", "সাইকেল", { kanji: "自転車" }),
      r("あるいて", "aruite", "on foot", "হেঁটে", { kanji: "歩いて" }),
      r("ひと", "hito", "person, people", "মানুষ", { kanji: "人" }),
      r("ともだち", "tomodachi", "friend", "বন্ধু", { kanji: "友達" }),
      r("かれ", "kare", "he, boyfriend", "সে (ছেলে) / বয়ফ্রেন্ড", { kanji: "彼" }),
      r("かのじょ", "kanojo", "she, girlfriend", "সে (মেয়ে) / গার্লফ্রেন্ড", {
        kanji: "彼女",
      }),
      r("かぞく", "kazoku", "family", "পরিবার", { kanji: "家族" }),
      r("ひとりで", ["hitoride", "hitori de"], "alone, by oneself", "একা", {
        kanji: "一人で",
      }),
      r("せんしゅう", ["senshuu", "senshu"], "last week", "গত সপ্তাহ", { kanji: "先週" }),
      r("こんしゅう", ["konshuu", "konshu"], "this week", "এই সপ্তাহ", { kanji: "今週" }),
      r("らいしゅう", ["raishuu", "raishu"], "next week", "আগামী সপ্তাহ", {
        kanji: "来週",
      }),
      r("せんげつ", "sengetsu", "last month", "গত মাস", { kanji: "先月" }),
      r("こんげつ", "kongetsu", "this month", "এই মাস", { kanji: "今月" }),
      r("らいげつ", "raigetsu", "next month", "আগামী মাস", { kanji: "来月" }),
      r("きょねん", "kyonen", "last year", "গত বছর", { kanji: "去年" }),
      r("ことし", "kotoshi", "this year", "এই বছর", { kanji: "今年" }),
      r("らいねん", "rainen", "next year", "আগামী বছর", { kanji: "来年" }),
      r("ねん", "nen", "-th year", "সাল / বছর", {
        kanji: "年",
        note: "e.g. にせんねん",
      }),
      r("なんねん", "nannen", "what year", "কত সাল", { kanji: "何年" }),
      r("がつ", "gatsu", "-th month of the year", "মাস", {
        kanji: "月",
        note: "e.g. いちがつ, January",
      }),
      r("なんがつ", "nangatsu", "what month", "কোন মাস", { kanji: "何月" }),
      r("ついたち", "tsuitachi", "first day of the month", "মাসের ১ তারিখ", {
        kanji: "1日",
      }),
      r("ふつか", "futsuka", "second, two days", "২ তারিখ / দুই দিন", { kanji: "2日" }),
      r("みっか", "mikka", "third, three days", "৩ তারিখ / তিন দিন", { kanji: "3日" }),
      r("よっか", "yokka", "fourth, four days", "৪ তারিখ / চার দিন", { kanji: "4日" }),
      r("いつか", "itsuka", "fifth, five days", "৫ তারিখ / পাঁচ দিন", { kanji: "5日" }),
      r("むいか", "muika", "sixth, six days", "৬ তারিখ / ছয় দিন", { kanji: "6日" }),
      r("なのか", "nanoka", "seventh, seven days", "৭ তারিখ / সাত দিন", {
        kanji: "7日",
      }),
      r("ようか", ["youka", "yoka"], "eighth, eight days", "৮ তারিখ / আট দিন", {
        kanji: "8日",
      }),
      r("ここのか", "kokonoka", "ninth, nine days", "৯ তারিখ / নয় দিন", {
        kanji: "9日",
      }),
      r("とおか", ["tooka", "toka"], "tenth, ten days", "১০ তারিখ / দশ দিন", {
        kanji: "10日",
      }),
      r("じゅうよっか", ["juuyokka", "juyokka"], "fourteenth, fourteen days", "১৪ তারিখ", {
        kanji: "14日",
      }),
      r("はつか", "hatsuka", "twentieth, twenty days", "২০ তারিখ", { kanji: "20日" }),
      r("にじゅうよっか", ["nijuuyokka", "nijuyokka"], "twenty-fourth, twenty-four days", "২৪ তারিখ", {
        kanji: "24日",
      }),
      r("にち", "nichi", "-th day of the month, day(s)", "তারিখ / দিন", {
        kanji: "日",
        note: "e.g. じゅういちにち",
      }),
      r("なんにち", "nannichi", "which day of the month, how many days", "কত তারিখ / কত দিন", {
        kanji: "何日",
      }),
      r("いつ", "itsu", "when", "কখন"),
      r("たんじょうび", ["tanjoubi", "tanjobi"], "birthday", "জন্মদিন", {
        kanji: "誕生日",
      }),
      r("ばんせん", "bansen", "platform —, -th platform", "প্ল্যাটফর্ম", {
        kanji: "番線",
        note: "e.g. いちばんせん",
      }),
      r("つぎの", ["tsugi no", "tsugino"], "next", "পরের", { kanji: "次の" }),
      r("ふつう", "futsuu", "local (train)", "লোকাল ট্রেন", { kanji: "普通" }),
      r("きゅうこう", ["kyuukou", "kyuko"], "rapid", "র‌্যাপিড ট্রেন", { kanji: "急行" }),
      r("とっきゅう", ["tokkyuu", "tokkyu"], "express", "এক্সপ্রেস", { kanji: "特急" }),
      r("こうしえん", "koushien", "Koshien", "কোশিয়েন", {
        kanji: "甲子園",
        note: "A town near Osaka",
      }),
      r("おおさかじょう", ["oosakajou", "osakajo"], "Osaka Castle", "ওসাকা ক্যাসল", {
        kanji: "大阪城",
        note: "A famous castle in Osaka",
      }),
      p("そうですね", ["sou desu ne", "soudesune"], "Yes, it is.", "তাই তো।", {
        note: "Used when agreeing",
      }),
      p(
        "ありがとうございました",
        [
          "arigatou gozaimashita",
          "arigatougozaimashita",
          "doumo arigatou gozaimashita",
        ],
        "Thank you very much.",
        "অনেক ধন্যবাদ।",
        { note: "Often どうもありがとうございました" },
      ),
      p("どういたしまして", ["dou itashimashite", "douitashimashite"], "You're welcome. Don't mention it.", "স্বাগতম / কিছু না।"),
    ],
  },
  {
    id: "lesson-6",
    number: 6,
    title: "Eating & doing",
    titleJa: "だい6か",
    description: "Eat, drink, food, sports, and doing things together.",
    words: [
      r("たべます", "tabemasu", "eat", "খাওয়া", { kanji: "食べます" }),
      r("のみます", "nomimasu", "drink", "পান করা", { kanji: "飲みます" }),
      r("すいます", "suimasu", "smoke [a cigarette]", "ধূমপান করা", {
        kanji: "吸います",
        note: "たばこをすいます",
      }),
      r("みます", "mimasu", "see, look at, watch", "দেখা", { kanji: "見ます" }),
      r("ききます", "kikimasu", "hear, listen", "শোনা", { kanji: "聞きます" }),
      r("よみます", "yomimasu", "read", "পড়া", { kanji: "読みます" }),
      r("かきます", "kakimasu", "write", "লেখা", {
        note: "Can also mean draw or paint; this book writes it in hiragana",
      }),
      r("かいます", "kaimasu", "buy", "কেনা", { kanji: "買います" }),
      r("とります", "torimasu", "take [a photograph]", "ছবি তোলা", {
        kanji: "撮ります",
        note: "しゃしんをとります / 写真を撮ります",
      }),
      r("します", "shimasu", "do, play", "করা / খেলা"),
      r("あいます", "aimasu", "meet [a friend]", "দেখা করা", {
        kanji: "会います",
        note: "ともだちにあいます / 友達に会います",
      }),
      r("ごはん", "gohan", "a meal, cooked rice", "ভাত / খাবার"),
      r("あさごはん", "asagohan", "breakfast", "সকালের খাবার", { kanji: "朝ごはん" }),
      r("ひるごはん", "hirugohan", "lunch", "দুপুরের খাবার", { kanji: "昼ごはん" }),
      r("ばんごはん", "bangohan", "supper, dinner", "রাতের খাবার", { kanji: "晩ごはん" }),
      r("パン", "pan", "bread", "পাউরুটি"),
      r("たまご", "tamago", "egg", "ডিম", { kanji: "卵" }),
      r("にく", "niku", "meat", "মাংস", { kanji: "肉" }),
      r("さかな", "sakana", "fish", "মাছ", { kanji: "魚" }),
      r("やさい", "yasai", "vegetable", "সবজি", { kanji: "野菜" }),
      r("くだもの", "kudamono", "fruit", "ফল", { kanji: "果物" }),
      r("みず", "mizu", "water", "পানি", { kanji: "水" }),
      r("おちゃ", "ocha", "tea, green tea", "চা / গ্রিন টি", { kanji: "お茶" }),
      r("こうちゃ", ["koucha", "kocha"], "black tea", "কালো চা", { kanji: "紅茶" }),
      r("ぎゅうにゅう", ["gyuunyuu", "gyunyu"], "milk", "দুধ", {
        kanji: "牛乳",
        note: "Also ミルク",
      }),
      r("ミルク", "miruku", "milk", "দুধ", { note: "Same as ぎゅうにゅう" }),
      r("ジュース", ["juusu", "jusu"], "juice", "জুস"),
      r("ビール", ["biiru", "biru"], "beer", "বিয়ার"),
      r("おさけ", "osake", "alcohol, Japanese rice wine", "মদ / সাকে", {
        kanji: "お酒",
        note: "お is optional",
      }),
      r("たばこ", "tabako", "tobacco, cigarette", "সিগারেট"),
      r("てがみ", "tegami", "letter", "চিঠি", { kanji: "手紙" }),
      r("レポート", "repooto", "report", "রিপোর্ট"),
      r("しゃしん", "shashin", "photograph", "ছবি", { kanji: "写真" }),
      r("ビデオ", "bideo", "video [tape], video deck", "ভিডিও"),
      r("みせ", "mise", "shop, store", "দোকান", { kanji: "店" }),
      r("にわ", "niwa", "garden", "বাগান", { kanji: "庭" }),
      r("しゅくだい", "shukudai", "homework", "বাড়ির কাজ", {
        kanji: "宿題",
        note: "しゅくだいをします — do homework",
      }),
      r("テニス", "tenisu", "tennis", "টেনিস", {
        note: "テニスをします — play tennis",
      }),
      r("サッカー", "sakkaa", "soccer, football", "ফুটবল", {
        note: "サッカーをします — play soccer",
      }),
      r("おはなみ", "ohanami", "cherry-blossom viewing", "চেরি ফুল দেখা", {
        kanji: "お花見",
        note: "おはなみをします — view the cherry blossoms; お is optional",
      }),
      r("なに", "nani", "what", "কী", { kanji: "何" }),
      r("いっしょに", "issho ni", "together", "একসাথে"),
      r("ちょっと", "chotto", "a little while, a little bit", "একটু"),
      r("いつも", "itsumo", "always, usually", "সবসময়"),
      r("ときどき", ["tokidoki"], "sometimes", "মাঝে মাঝে", { kanji: "時々" }),
      r("それから", "sorekara", "after that, and then", "তারপর"),
      r("ええ", "ee", "yes", "হ্যাঁ"),
      r("メキシコ", "mekishiko", "Mexico", "মেক্সিকো"),
      r("おおさかデパート", ["oosaka depaato", "osakadepato"], "a fictitious department store", "কাল্পনিক ডিপার্টমেন্ট স্টোর", {
        kanji: "大阪デパート",
      }),
      r("つるや", "tsuruya", "a fictitious restaurant", "কাল্পনিক রেস্তোরাঁ"),
      r("フランスや", ["furansu ya", "furansuya"], "a fictitious supermarket", "কাল্পনিক সুপারমার্কেট", {
        kanji: "フランス屋",
      }),
      r("まいにちや", ["mainichi ya", "mainichiya"], "a fictitious supermarket", "কাল্পনিক সুপারমার্কেট", {
        kanji: "毎日屋",
      }),
      p("いいですね", ["ii desu ne", "iidesune"], "That's good.", "ভাল তো।"),
      p("わかりました", "wakarimashita", "I see.", "বুঝেছি।"),
      p("なんですか", "nan desu ka", "Yes? (lit. What is it?)", "কী বলুন?", {
        kanji: "何ですか",
      }),
      p(
        "じゃ、またあした",
        ["ja mata ashita", "jamataashita"],
        "See you [tomorrow].",
        "তাহলে, আবার কাল দেখা হবে।",
        { note: "あした is optional: じゃ、また" },
      ),
    ],
  },
  {
    id: "lesson-7",
    number: 7,
    title: "Giving & receiving",
    titleJa: "だい7か",
    description: "Give, lend, borrow, everyday things, family, and visiting.",
    words: [
      r("きります", "kirimasu", "cut, slice", "কাটা", { kanji: "切ります" }),
      r("おくります", "okurimasu", "send", "পাঠানো", { kanji: "送ります" }),
      r("あげます", "agemasu", "give", "দেওয়া"),
      r("もらいます", "moraimasu", "receive", "পাওয়া"),
      r("かします", "kashimasu", "lend", "ধার দেওয়া", { kanji: "貸します" }),
      r("かります", "karimasu", "borrow", "ধার নেওয়া", { kanji: "借ります" }),
      r("おしえます", "oshiemasu", "teach", "শেখানো", { kanji: "教えます" }),
      r("ならいます", "naraimasu", "learn", "শেখা", { kanji: "習います" }),
      r("かけます", "kakemasu", "make [a telephone call]", "ফোন করা", {
        note: "でんわをかけます / 電話をかけます",
      }),
      r("て", "te", "hand, arm", "হাত", { kanji: "手" }),
      r("はし", "hashi", "chopsticks", "চপস্টিক"),
      r("スプーン", ["supuun", "supun"], "spoon", "চামচ"),
      r("ナイフ", "naifu", "knife", "ছুরি"),
      r("フォーク", ["fooku", "foku"], "fork", "কাঁটাচামচ"),
      r("はさみ", "hasami", "scissors", "কাঁচি"),
      r("パソコン", "pasokon", "personal computer", "কম্পিউটার"),
      r("ケータイ", ["keetai", "ketai"], "mobile phone, cell phone", "মোবাইল"),
      r("メール", ["meeru", "meru"], "e-mail", "ইমেইল"),
      r("ねんがじょう", ["nengajou", "nengajo"], "New Year's greeting card", "নববর্ষের কার্ড", {
        kanji: "年賀状",
      }),
      r("パンチ", "panchi", "punch", "পাঞ্চ"),
      r("ホッチキス", "hotchikisu", "stapler", "স্ট্যাপলার"),
      r("セロテープ", ["seroteepu", "serotepu"], "Sellotape, Scotch tape, clear adhesive tape", "সেলোটেপ"),
      r("けしゴム", "keshigomu", "rubber, eraser", "রাবার", { kanji: "消しゴム" }),
      r("かみ", "kami", "paper", "কাগজ", { kanji: "紙" }),
      r("はな", "hana", "flower, blossom", "ফুল", { kanji: "花" }),
      r("シャツ", "shatsu", "shirt", "শার্ট"),
      r("プレゼント", "purezento", "present, gift", "উপহার"),
      r("にもつ", "nimotsu", "luggage, baggage, parcel", "মালপত্র", { kanji: "荷物" }),
      r("おかね", "okane", "money", "টাকা", { kanji: "お金" }),
      r("きっぷ", "kippu", "ticket", "টিকিট", { kanji: "切符" }),
      r("クリスマス", "kurisumasu", "Christmas", "বড়দিন"),
      r("ちち", "chichi", "(my) father", "বাবা (নিজের)", { kanji: "父" }),
      r("はは", "haha", "(my) mother", "মা (নিজের)", { kanji: "母" }),
      r("おとうさん", ["otousan", "otosan"], "(someone else's) father", "বাবা (অন্যের / ডাকতে)", {
        kanji: "お父さん",
        note: "Also used to address one's own father",
      }),
      r("おかあさん", ["okaasan", "okasan"], "(someone else's) mother", "মা (অন্যের / ডাকতে)", {
        kanji: "お母さん",
        note: "Also used to address one's own mother",
      }),
      r("もう", "mou", "already", "ইতিমধ্যে"),
      r("まだ", "mada", "not yet", "এখনো না"),
      r("これから", "korekara", "from now on, soon", "এখন থেকে / শিগগির"),
      r("スペイン", "supein", "Spain", "স্পেন"),
      p("すてきですね", ["suteki desu ne", "sutekidesune"], "What a nice [〜]!", "কী সুন্দর!"),
      p("いらっしゃい", "irasshai", "How nice of you to come. Welcome.", "আসুন। স্বাগতম।", {
        note: "Said when someone arrives at your home",
      }),
      p(
        "どうぞおあがりください",
        ["douzo oagari kudasai", "douzooagarikudasai"],
        "Do come in.",
        "ভিতরে আসুন।",
        { kanji: "どうぞお上がりください" },
      ),
      p("しつれいします", "shitsurei shimasu", "May I? (lit. I commit an incivility.)", "ক্ষমা করবেন।", {
        kanji: "失礼します",
        note: "Said when entering someone's home",
      }),
      p("いかがですか", "ikaga desu ka", "Won't you have [〜]? Would you like [〜]?", "নেবেন? কেমন লাগবে?", {
        note: "〜はいかがですか — used when offering something",
      }),
      p("いただきます", "itadakimasu", "Thank you. I accept. (before eating or drinking)", "খাওয়া শুরু করছি।"),
      p(
        "ごちそうさまでした",
        ["gochisousama deshita", "gochisousamadeshita", "gochisousama"],
        "That was delicious. (after eating or drinking)",
        "ভাল লাগল। ধন্যবাদ।",
        { kanji: "ごちそうさまでした", note: "でした is optional" },
      ),
    ],
  },
  {
    id: "lesson-8",
    number: 8,
    title: "Describing things",
    titleJa: "だい8か",
    description: "い-adjectives and な-adjectives, places, and leaving a friend's home.",
    words: [
      r("ハンサム", "hansamu", "handsome", "সুদর্শন", { note: "な-adjective" }),
      r("きれい", "kirei", "beautiful, clean", "সুন্দর / পরিষ্কার", { note: "な-adjective" }),
      r("しずか", "shizuka", "quiet", "শান্ত", { kanji: "静か", note: "な-adjective" }),
      r("にぎやか", "nigiyaka", "lively", "জমজমাট", { note: "な-adjective" }),
      r("ゆうめい", ["yuumei", "yumei"], "famous", "বিখ্যাত", {
        kanji: "有名",
        note: "な-adjective",
      }),
      r("しんせつ", "shinsetsu", "kind, helpful, considerate", "দয়ালু / সহায়ক", {
        kanji: "親切",
        note: "な-adjective. Not used about one's own family.",
      }),
      r("げんき", "genki", "healthy, energetic, cheerful", "সুস্থ / প্রাণবন্ত", {
        kanji: "元気",
        note: "な-adjective",
      }),
      r("ひま", "hima", "free (time)", "ফাঁকা সময়", { kanji: "暇", note: "な-adjective" }),
      r("べんり", "benri", "convenient", "সুবিধাজনক", { kanji: "便利", note: "な-adjective" }),
      r("すてき", "suteki", "fine, nice, wonderful", "চমৎকার", { note: "な-adjective" }),
      r("おおきい", ["ookii", "okii"], "big, large", "বড়", { kanji: "大きい" }),
      r("ちいさい", ["chiisai", "chisai"], "small, little", "ছোট", { kanji: "小さい" }),
      r("あたらしい", "atarashii", "new, fresh", "নতুন", { kanji: "新しい" }),
      r("ふるい", "furui", "old", "পুরনো", {
        kanji: "古い",
        note: "Not used to describe a person's age",
      }),
      r("いい", ["ii", "yoi"], "good", "ভালো", { note: "Also よい" }),
      r("わるい", "warui", "bad", "খারাপ", { kanji: "悪い" }),
      r("あつい", "atsui", "hot", "গরম", {
        kanji: "暑い・熱い",
        note: "暑い: weather. 熱い: to the touch.",
      }),
      r("さむい", "samui", "cold (temperature)", "ঠান্ডা (আবহাওয়া)", { kanji: "寒い" }),
      r("つめたい", "tsumetai", "cold (to the touch)", "ঠান্ডা (স্পর্শে)", { kanji: "冷たい" }),
      r("むずかしい", "muzukashii", "difficult", "কঠিন", { kanji: "難しい" }),
      r("やさしい", "yasashii", "easy", "সহজ", {
        kanji: "易しい",
        note: "This lesson: easy. Kind is also やさしい, written 優しい.",
      }),
      r("たかい", "takai", "expensive, tall, high", "দামি / উঁচু", { kanji: "高い" }),
      r("やすい", "yasui", "inexpensive, cheap", "সস্তা", { kanji: "安い" }),
      r("ひくい", "hikui", "low", "নিচু", { kanji: "低い" }),
      r("おもしろい", "omoshiroi", "interesting", "মজার"),
      r("おいしい", "oishii", "delicious, tasty", "সুস্বাদু"),
      r("いそがしい", "isogashii", "busy", "ব্যস্ত", { kanji: "忙しい" }),
      r("たのしい", "tanoshii", "enjoyable", "আনন্দদায়ক", { kanji: "楽しい" }),
      r("しろい", "shiroi", "white", "সাদা", { kanji: "白い" }),
      r("くろい", "kuroi", "black", "কালো", { kanji: "黒い" }),
      r("あかい", "akai", "red", "লাল", { kanji: "赤い" }),
      r("あおい", "aoi", "blue", "নীল", { kanji: "青い" }),
      r("さくら", "sakura", "cherry (blossom)", "চেরি ফুল", { kanji: "桜" }),
      r("やま", "yama", "mountain", "পাহাড়", { kanji: "山" }),
      r("まち", "machi", "town, city", "শহর", { kanji: "町" }),
      r("たべもの", "tabemono", "food", "খাবার", { kanji: "食べ物" }),
      r("ところ", "tokoro", "place", "জায়গা", { kanji: "所" }),
      r("りょう", ["ryou", "ryo"], "dormitory", "হোস্টেল", { kanji: "寮" }),
      r("レストラン", "resutoran", "restaurant", "রেস্তোরাঁ"),
      r("せいかつ", "seikatsu", "life", "জীবন", { kanji: "生活" }),
      r("しごと", "shigoto", "work, job, business", "কাজ", {
        kanji: "仕事",
        note: "Often おしごと. 〜をします: do one's job.",
      }),
      r("どう", "dou", "how", "কেমন"),
      r("どんな", "donna", "what kind of 〜", "কেমন / কী রকম"),
      r("とても", "totemo", "very", "খুব"),
      r("あまり", "amari", "not so (with negatives)", "তেমন না", {
        note: "Used with negatives: あまり〜ません",
      }),
      r("そして", "soshite", "and (connecting sentences)", "আর / তারপর"),
      p("おげんきですか", ["ogenki desu ka", "ogenkidesuka"], "How are you?", "কেমন আছেন?", {
        kanji: "お元気ですか",
      }),
      p(
        "もういっぱいいかがですか",
        ["mou ippai ikaga desu ka", "mouippaikagadesuka"],
        "Won't you have another cup of [〜]?",
        "আরেক কাপ নেবেন?",
        { kanji: "もう一杯いかがですか" },
      ),
      p("けっこうです", ["kekkou desu", "kekkodesu", "kekko desu"], "No, thank you. I'm fine.", "থাক, ধন্যবাদ।"),
      p(
        "そろそろしつれいします",
        ["sorosoro shitsurei shimasu", "sorosoroshitsureishimasu"],
        "It's time I was going.",
        "এবার উঠি।",
        { kanji: "そろそろ失礼します" },
      ),
      p(
        "またいらっしゃってください",
        ["mata irasshatte kudasai", "matairasshattekudasai"],
        "Please come again.",
        "আবার আসবেন।",
      ),
      r("シャンハイ", "shanhai", "Shanghai", "সাংহাই", { kanji: "上海" }),
      r("きんかくじ", "kinkakuji", "Kinkakuji Temple (the Golden Pavilion)", "কিঙ্কাকুজি মন্দির", {
        kanji: "金閣寺",
      }),
      r("ならこうえん", ["nara kouen", "narakouen", "narakoen"], "Nara Park", "নারা পার্ক", {
        kanji: "奈良公園",
      }),
      r("ふじさん", "fujisan", "Mt. Fuji", "ফুজি পর্বত", {
        kanji: "富士山",
        note: "The highest mountain in Japan",
      }),
      r("しちにんのさむらい", ["shichinin no samurai", "shichininnosamurai"], "The Seven Samurai", "সেভেন সামুরাই", {
        kanji: "七人の侍",
        note: "A classic film by Akira Kurosawa",
      }),
    ],
  },
  {
    id: "lesson-9",
    number: 9,
    title: "Likes & reasons",
    titleJa: "だい9か",
    description: "Like, dislike, hobbies, family, and turning down an invitation.",
    words: [
      r("わかります", "wakarimasu", "understand", "বোঝা"),
      r("あります", "arimasu", "have", "আছে / থাকা", {
        note: "This lesson: possession. Lesson 10: exist (inanimate).",
      }),
      r("すき", "suki", "like", "পছন্দ", { kanji: "好き", note: "な-adjective" }),
      r("きらい", "kirai", "dislike", "অপছন্দ", { kanji: "嫌い", note: "な-adjective" }),
      r("じょうず", ["jouzu", "jozu"], "good at", "পটু", { kanji: "上手", note: "な-adjective" }),
      r("へた", "heta", "poor at", "কাঁচা", { kanji: "下手", note: "な-adjective" }),
      r("のみもの", "nomimono", "drinks", "পানীয়", { kanji: "飲み物" }),
      r("りょうり", ["ryouri", "ryori"], "dish (cooked food), cooking", "রান্না / রান্না করা খাবার", {
        kanji: "料理",
        note: "〜をします: cook",
      }),
      r("スポーツ", ["supootsu", "supotsu"], "sport", "খেলাধুলা", {
        note: "〜をします: play sports",
      }),
      r("やきゅう", ["yakyuu", "yakyu"], "baseball", "বেসবল", {
        kanji: "野球",
        note: "〜をします: play baseball",
      }),
      r("ダンス", "dansu", "dance", "নাচ", { note: "〜をします: dance" }),
      r("りょこう", ["ryokou", "ryoko"], "trip, tour", "ভ্রমণ", {
        kanji: "旅行",
        note: "〜をします: travel, make a trip",
      }),
      r("おんがく", "ongaku", "music", "সঙ্গীত", { kanji: "音楽" }),
      r("うた", "uta", "song", "গান", { kanji: "歌" }),
      r("クラシック", "kurashikku", "classical music", "ক্লাসিক্যাল সঙ্গীত"),
      r("ジャズ", "jazu", "jazz", "জ্যাজ"),
      r("コンサート", ["konsaato", "konsato"], "concert", "কনসার্ট"),
      r("カラオケ", "karaoke", "karaoke", "কারাওকে"),
      r("かぶき", "kabuki", "Kabuki", "কাবুকি", {
        kanji: "歌舞伎",
        note: "Traditional Japanese musical drama",
      }),
      r("え", "e", "picture, drawing", "ছবি / আঁকা", { kanji: "絵" }),
      r("じ", "ji", "letter, character", "অক্ষর", { kanji: "字" }),
      r("かんじ", "kanji", "Chinese character", "কানজি", { kanji: "漢字" }),
      r("ひらがな", "hiragana", "hiragana script", "হিরাগানা"),
      r("かたかな", "katakana", "katakana script", "কাতাকানা"),
      r("ローマじ", ["roomaji", "romaji"], "the Roman alphabet", "রোমাজি", { kanji: "ローマ字" }),
      r("こまかいおかね", ["komakai okane", "komakaiokane"], "small change", "খুচরা টাকা", {
        kanji: "細かいお金",
      }),
      r("チケット", "chiketto", "ticket", "টিকিট"),
      r("じかん", "jikan", "time", "সময়", { kanji: "時間" }),
      r("ようじ", ["youji", "yoji"], "something to do, errand", "কাজ / দরকারি কাজ", {
        kanji: "用事",
      }),
      r("やくそく", "yakusoku", "appointment, promise", "অঙ্গীকার / অ্যাপয়েন্টমেন্ট", {
        kanji: "約束",
        note: "〜をします: promise",
      }),
      r("アルバイト", "arubaito", "side job, part-time work", "পার্টটাইম কাজ", {
        note: "〜をします: work part-time",
      }),
      r("ごしゅじん", "goshujin", "(someone else's) husband", "স্বামী (অন্যের)", {
        kanji: "ご主人",
      }),
      r("おっと", "otto", "(my) husband", "স্বামী (নিজের)", { kanji: "夫" }),
      r("しゅじん", "shujin", "(my) husband", "স্বামী (নিজের)", {
        kanji: "主人",
        note: "Same as おっと",
      }),
      r("おくさん", "okusan", "(someone else's) wife", "স্ত্রী (অন্যের)", { kanji: "奥さん" }),
      r("つま", "tsuma", "(my) wife", "স্ত্রী (নিজের)", { kanji: "妻" }),
      r("かない", "kanai", "(my) wife", "স্ত্রী (নিজের)", {
        kanji: "家内",
        note: "Same as つま",
      }),
      r("こども", "kodomo", "child", "বাচ্চা", { kanji: "子ども" }),
      r("よく", "yoku", "well, much", "ভালো করে / অনেক"),
      r("だいたい", "daitai", "mostly, roughly", "মোটামুটি"),
      r("たくさん", "takusan", "many, much", "অনেক"),
      r("すこし", "sukoshi", "a little, a few", "একটু / কিছু", { kanji: "少し" }),
      r("ぜんぜん", "zenzen", "not at all (with negatives)", "একেবারেই না", {
        kanji: "全然",
        note: "Used with negatives: ぜんぜん〜ません",
      }),
      r("はやく", "hayaku", "early, quickly, fast", "তাড়াতাড়ি", {
        kanji: "早く・速く",
        note: "早く: early. 速く: quickly, fast.",
      }),
      r("どうして", "doushite", "why", "কেন", {
        note: "Answer with 〜から: because 〜",
      }),
      p(
        "かしてください",
        ["kashite kudasai", "kashitekudasai"],
        "Please lend (it to me).",
        "ধার দেবেন?",
        { kanji: "貸してください" },
      ),
      p("いいですよ", ["ii desu yo", "iidesuyo"], "Sure. / Certainly.", "হ্যাঁ, দিতে পারি।"),
      p("ざんねんですが", ["zannen desu ga", "zannendesuga"], "I'm sorry, but… unfortunately", "দুঃখিত, কিন্তু…", {
        kanji: "残念ですが",
      }),
      p("ああ", "aa", "oh", "আহ"),
      p(
        "いっしょにいかがですか",
        ["issho ni ikaga desu ka", "isshoniikagadesuka"],
        "Won't you join me (us)?",
        "একসাথে যাবেন?",
      ),
      p("ちょっと……", ["chotto", "chotto…"], "[〜] is a bit difficult.", "একটু…", {
        note: "Euphemism when declining an invitation",
      }),
      p("だめですか", ["dame desu ka", "damedesuka"], "So you can't (come)?", "যাওয়া যাবে না?"),
      p(
        "またこんどおねがいします",
        ["mata kondo onegaishimasu", "matakondoonegaishimasu"],
        "Please ask me again some other time.",
        "পরের বার বলবেন।",
        {
          kanji: "また今度お願いします",
          note: "Used when refusing an invitation indirectly",
        },
      ),
    ],
  },
  {
    id: "lesson-10",
    number: 10,
    title: "There is / there are",
    titleJa: "だい10か",
    description: "People, animals, places, position words, and asking where something is.",
    words: [
      r("あります", "arimasu", "exist, be (inanimate)", "আছে (জড় জিনিস)", {
        note: "Things. Lesson 9 あります is possession (have).",
      }),
      r("います", "imasu", "exist, be (animate)", "আছে (প্রাণী / মানুষ)", {
        note: "People and animals",
      }),
      r("いろいろ", "iroiro", "various", "নানা রকম", { note: "な-adjective" }),
      r("おとこのひと", ["otoko no hito", "otokonohito"], "man", "পুরুষ", { kanji: "男の人" }),
      r("おんなのひと", ["onna no hito", "onnanohito"], "woman", "নারী", { kanji: "女の人" }),
      r("おとこのこ", ["otoko no ko", "otokonoko"], "boy", "ছেলে", { kanji: "男の子" }),
      r("おんなのこ", ["onna no ko", "onnanoko"], "girl", "মেয়ে", { kanji: "女の子" }),
      r("いぬ", "inu", "dog", "কুকুর", { kanji: "犬" }),
      r("ねこ", "neko", "cat", "বিড়াল", { kanji: "猫" }),
      r("パンダ", "panda", "panda", "পান্ডা"),
      r("ぞう", ["zou", "zo"], "elephant", "হাতি", { kanji: "象" }),
      r("き", "ki", "tree, wood", "গাছ / কাঠ", { kanji: "木" }),
      r("もの", "mono", "thing", "জিনিস", { kanji: "物" }),
      r("でんち", "denchi", "battery", "ব্যাটারি", { kanji: "電池" }),
      r("はこ", "hako", "box", "বাক্স", { kanji: "箱" }),
      r("スイッチ", "suicchi", "switch", "সুইচ"),
      r("れいぞうこ", ["reizouko", "reizoko"], "refrigerator", "ফ্রিজ", { kanji: "冷蔵庫" }),
      r("テーブル", ["teeburu", "teburu"], "table", "টেবিল"),
      r("ベッド", "beddo", "bed", "বিছানা"),
      r("たな", "tana", "shelf", "তাক", { kanji: "棚" }),
      r("ドア", "doa", "door", "দরজা"),
      r("まど", "mado", "window", "জানালা", { kanji: "窓" }),
      r("ポスト", "posuto", "postbox, mailbox", "ডাকবাক্স"),
      r("ビル", "biru", "building", "বিল্ডিং"),
      r("ATM", "ATM", "cash machine, ATM", "এটিএম", {
        note: "Automatic Teller Machine",
      }),
      r("コンビニ", "konbini", "convenience store", "কনবিনি"),
      r("こうえん", ["kouen", "koen"], "park", "পার্ক", { kanji: "公園" }),
      r("きっさてん", "kissaten", "café, coffee shop", "ক্যাফে", { kanji: "喫茶店" }),
      r("や", "ya", "〜 shop, 〜 store", "〜য়ের দোকান", {
        kanji: "屋",
        note: "Suffix: パンや a bakery, 花屋 a flower shop",
      }),
      r("のりば", "noriba", "a place to catch taxis, trains, etc.", "স্ট্যান্ড / প্ল্যাটফর্ম", {
        kanji: "乗り場",
      }),
      r("けん", "ken", "prefecture", "প্রিফেকচার", { kanji: "県" }),
      r("うえ", "ue", "on, above, over", "উপর", { kanji: "上" }),
      r("した", "shita", "under, below, beneath", "নিচে", { kanji: "下" }),
      r("まえ", "mae", "front, before", "সামনে", { kanji: "前" }),
      r("うしろ", "ushiro", "back, behind", "পিছনে", { kanji: "後" }),
      r("みぎ", "migi", "right [side]", "ডান", { kanji: "右" }),
      r("ひだり", "hidari", "left [side]", "বাম", { kanji: "左" }),
      r("なか", "naka", "in, inside", "ভিতরে", { kanji: "中" }),
      r("そと", "soto", "outside", "বাইরে", { kanji: "外" }),
      r("となり", "tonari", "next, next door", "পাশে", { kanji: "隣" }),
      r("ちかく", "chikaku", "near, vicinity", "কাছে", { kanji: "近く" }),
      r("あいだ", "aida", "between, among", "মাঝে", { kanji: "間" }),
      r("など", "nado", "and so on", "ইত্যাদি", {
        note: "〜や〜など: 〜, 〜, and so on",
      }),
      p(
        "どうもすみません",
        ["doumo sumimasen", "doumosumimasen"],
        "Thank you.",
        "ধন্যবাদ।",
        { note: "This lesson: thanks. Also used as excuse me." },
      ),
      r("ナンプラー", ["nanpuraa", "nampuraa"], "nam pla", "নাম প্লা", {
        note: "Thai fish sauce",
      }),
      r("コーナー", ["koonaa", "konaa"], "corner, section", "কর্নার"),
      r("いちばんした", ["ichiban shita", "ichibanshita"], "the bottom", "একদম নিচে", {
        kanji: "いちばん下",
      }),
      r(
        "とうきょうディズニーランド",
        ["toukyou dizuniirando", "tokyo disneyland", "toukyoudizuniirando"],
        "Tokyo Disneyland",
        "টোকিও ডিজনিল্যান্ড",
        { kanji: "東京ディズニーランド" },
      ),
      r("アジアストア", ["ajia sutoa", "ajiasutoa"], "a fictitious supermarket", "এশিয়া স্টোর"),
    ],
  },
  ...VOCAB_LESSONS_11_20,
  ...VOCAB_LESSONS_21_25,
];


let indexChecked = false;

function assertVocabIndex() {
  if (indexChecked) return;
  indexChecked = true;
  for (const lesson of VOCAB_LESSONS) {
    if (!indexMatches(lesson, VOCAB_INDEX)) {
      throw new Error(
        `Vocab index is out of date for ${lesson.id}. Run scripts/gen-vocab-index.mjs`,
      );
    }
  }
  for (const lesson of [NUMERALS_LESSON, MONEY_LESSON]) {
    if (!indexMatches(lesson, APPENDIX_INDEX)) {
      throw new Error(
        `Vocab index is out of date for ${lesson.id}. Run scripts/gen-vocab-index.mjs`,
      );
    }
  }
}

export function getLesson(id: string): VocabLesson | undefined {
  assertVocabIndex();
  if (id === "all") {
    return {
      id: "all",
      number: 0,
      title: "All lessons",
      titleJa: "ぜんぶ",
      description: "Every word from all lessons.",
      words: VOCAB_LESSONS.flatMap((l) => l.words),
    };
  }
  if (id === "numerals") return NUMERALS_LESSON;
  if (id === "money") return MONEY_LESSON;
  return VOCAB_LESSONS.find((l) => l.id === id);
}

export function lessonWordCount(lesson: VocabLesson): number {
  return lesson.words.length;
}

export function wordMatches(word: VocabWord, q: string): boolean {
  const n = q.trim().toLowerCase();
  if (!n) return true;
  const blob = [
    word.jp,
    word.kanji ?? "",
    word.meaning,
    word.bn,
    word.note ?? "",
    ...word.romaji,
  ]
    .join("\n")
    .toLowerCase();
  return blob.includes(n);
}

export type DialogueLine = {
  speaker: "A" | "B";
  jp: string;
  romaji: string;
  meaning: string;
  bn: string;
};

export type Dialogue = {
  title: string;
  setting: string;
  speakers: { A: string; B: string };
  voices: { A: "female" | "male"; B: "female" | "male" };
  lines: DialogueLine[];
};

export const LESSON_DIALOGUES: Record<string, Dialogue> = {
  "lesson-1": {
    title: "First meeting",
    setting: "Two people introduce themselves.",
    speakers: { A: "スミス", B: "ミラー" },
    voices: { A: "female", B: "male" },
    lines: [
      {
        speaker: "A",
        jp: "はじめまして。",
        romaji: "hajimemashite",
        meaning: "How do you do?",
        bn: "কেমন আছেন?",
      },
      {
        speaker: "B",
        jp: "はじめまして。",
        romaji: "hajimemashite",
        meaning: "How do you do?",
        bn: "কেমন আছেন?",
      },
      {
        speaker: "A",
        jp: "おなまえは？",
        romaji: "onamae wa",
        meaning: "May I have your name?",
        bn: "আপনার নাম কী?",
      },
      {
        speaker: "B",
        jp: "ミラーです。どうぞよろしくおねがいします。",
        romaji: "miraa desu. douzo yoroshiku onegaishimasu",
        meaning: "I'm Miller. Pleased to meet you.",
        bn: "আমি মিলার। পরিচিত হয়ে খুশি।",
      },
      {
        speaker: "A",
        jp: "スミスです。こちらこそよろしくおねがいします。",
        romaji: "sumisu desu. kochirakoso yoroshiku onegaishimasu",
        meaning: "I'm Smith. Pleased to meet you, too.",
        bn: "আমি স্মিথ। আমিও, পরিচিত হয়ে খুশি।",
      },
    ],
  },
  "lesson-2": {
    title: "A small gift",
    setting: "Miller offers a souvenir.",
    speakers: { A: "ミラー", B: "せんせい" },
    voices: { A: "male", B: "female" },
    lines: [
      {
        speaker: "A",
        jp: "あのう、どうぞ。",
        romaji: "anou, douzo",
        meaning: "Er… here you are.",
        bn: "ওহ… নিন।",
      },
      {
        speaker: "B",
        jp: "えっ、おみやげですか。",
        romaji: "e, omiyage desu ka",
        meaning: "Oh? A souvenir?",
        bn: "হ্যাঁ? উপহার?",
      },
      {
        speaker: "A",
        jp: "はい。",
        romaji: "hai",
        meaning: "Yes.",
        bn: "হ্যাঁ।",
      },
      {
        speaker: "B",
        jp: "ありがとうございます。",
        romaji: "arigatou gozaimasu",
        meaning: "Thank you very much.",
        bn: "অনেক ধন্যবাদ।",
      },
      {
        speaker: "A",
        jp: "いいえ。",
        romaji: "iie",
        meaning: "Not at all.",
        bn: "কিছু না।",
      },
    ],
  },
  "lesson-3": {
    title: "At the shop",
    setting: "A customer buys something.",
    speakers: { A: "てんいん", B: "きゃく" },
    voices: { A: "female", B: "male" },
    lines: [
      {
        speaker: "A",
        jp: "いらっしゃいませ。",
        romaji: "irasshaimase",
        meaning: "Welcome. May I help you?",
        bn: "স্বাগতম।",
      },
      {
        speaker: "B",
        jp: "すみません、これをみせてください。",
        romaji: "sumimasen, kore o misete kudasai",
        meaning: "Excuse me, please show me this.",
        bn: "দুঃখিত, এটা দেখান।",
      },
      {
        speaker: "A",
        jp: "どうぞ。",
        romaji: "douzo",
        meaning: "Here you are.",
        bn: "নিন।",
      },
      {
        speaker: "B",
        jp: "いくらですか。",
        romaji: "ikura desu ka",
        meaning: "How much is it?",
        bn: "দাম কত?",
      },
      {
        speaker: "A",
        jp: "せんえんです。",
        romaji: "sen en desu",
        meaning: "It's 1,000 yen.",
        bn: "এক হাজার ইয়েন।",
      },
      {
        speaker: "B",
        jp: "じゃ、これをください。",
        romaji: "ja, kore o kudasai",
        meaning: "Well then, I'll take this.",
        bn: "তাহলে এটা দিন।",
      },
      {
        speaker: "A",
        jp: "どうもありがとうございます。",
        romaji: "doumo arigatou gozaimasu",
        meaning: "Thank you very much.",
        bn: "অসংখ্য ধন্যবাদ।",
      },
    ],
  },
  "lesson-4": {
    title: "On the phone",
    setting: "Calling the bank about opening hours.",
    speakers: { A: "うけつけ", B: "きゃく" },
    voices: { A: "female", B: "male" },
    lines: [
      {
        speaker: "A",
        jp: "はい、アップルぎんこうです。",
        romaji: "hai, appuru ginkou desu",
        meaning: "Hello, Apple Bank.",
        bn: "হ্যালো, অ্যাপল ব্যাংক।",
      },
      {
        speaker: "B",
        jp: "すみません、そちらはなんじからですか。",
        romaji: "sumimasen, sochira wa nanji kara desu ka",
        meaning: "Excuse me, what time do you open?",
        bn: "দুঃখিত, আপনারা কয়টায় খোলে?",
      },
      {
        speaker: "A",
        jp: "くじからです。",
        romaji: "kuji kara desu",
        meaning: "From nine o'clock.",
        bn: "নয়টা থেকে।",
      },
      {
        speaker: "B",
        jp: "なんじまでですか。",
        romaji: "nanji made desu ka",
        meaning: "Until what time?",
        bn: "কয়টা পর্যন্ত?",
      },
      {
        speaker: "A",
        jp: "ごごさんじまでです。",
        romaji: "gogo sanji made desu",
        meaning: "Until 3 p.m.",
        bn: "দুপুর তিনটা পর্যন্ত।",
      },
      {
        speaker: "B",
        jp: "ばんごうはなんばんですか。",
        romaji: "bangou wa nanban desu ka",
        meaning: "What number is it?",
        bn: "নম্বর কত?",
      },
      {
        speaker: "A",
        jp: "にばんです。",
        romaji: "niban desu",
        meaning: "Number two.",
        bn: "দুই নম্বর।",
      },
      {
        speaker: "B",
        jp: "わかりました。ありがとうございます。",
        romaji: "wakarimashita. arigatou gozaimasu",
        meaning: "I see. Thank you.",
        bn: "বুঝেছি। ধন্যবাদ।",
      },
    ],
  },
  "lesson-5": {
    title: "At the station",
    setting: "Asking which platform for Koshien.",
    speakers: { A: "きゃく", B: "えきいん" },
    voices: { A: "male", B: "female" },
    lines: [
      {
        speaker: "A",
        jp: "すみません、こうしえんはなんばんせんですか。",
        romaji: "sumimasen, koushien wa nanbansen desu ka",
        meaning: "Excuse me, which platform is it for Koshien?",
        bn: "দুঃখিত, কোশিয়েন কোন প্ল্যাটফর্ম?",
      },
      {
        speaker: "B",
        jp: "にばんせんです。",
        romaji: "nibansen desu",
        meaning: "Platform two.",
        bn: "দুই নম্বর প্ল্যাটফর্ম।",
      },
      {
        speaker: "A",
        jp: "つぎのでんしゃはきゅうこうですか。",
        romaji: "tsugi no densha wa kyuukou desu ka",
        meaning: "Is the next train a rapid?",
        bn: "পরের ট্রেনটা র‌্যাপিড?",
      },
      {
        speaker: "B",
        jp: "いいえ、ふつうです。",
        romaji: "iie, futsuu desu",
        meaning: "No, it's a local.",
        bn: "না, লোকাল।",
      },
      {
        speaker: "A",
        jp: "どうもありがとうございました。",
        romaji: "doumo arigatou gozaimashita",
        meaning: "Thank you very much.",
        bn: "অনেক ধন্যবাদ।",
      },
      {
        speaker: "B",
        jp: "どういたしまして。",
        romaji: "dou itashimashite",
        meaning: "You're welcome.",
        bn: "স্বাগতম।",
      },
    ],
  },
  "lesson-6": {
    title: "Let's go together",
    setting: "Inviting a friend to view the cherry blossoms.",
    speakers: { A: "さとう", B: "ミラー" },
    voices: { A: "female", B: "male" },
    lines: [
      {
        speaker: "A",
        jp: "ミラーさん。",
        romaji: "miraa san",
        meaning: "Mr. Miller.",
        bn: "মিলার সাহেব।",
      },
      {
        speaker: "B",
        jp: "なんですか。",
        romaji: "nan desu ka",
        meaning: "Yes? What is it?",
        bn: "কী বলুন?",
      },
      {
        speaker: "A",
        jp: "あしたいっしょにおはなみをしませんか。",
        romaji: "ashita issho ni ohanami o shimasen ka",
        meaning: "Shall we go cherry-blossom viewing together tomorrow?",
        bn: "কাল একসাথে চেরি ফুল দেখতে যাবেন?",
      },
      {
        speaker: "B",
        jp: "いいですね。",
        romaji: "ii desu ne",
        meaning: "That's good.",
        bn: "ভাল তো।",
      },
      {
        speaker: "A",
        jp: "じゃ、またあした。",
        romaji: "ja, mata ashita",
        meaning: "See you tomorrow.",
        bn: "তাহলে, আবার কাল দেখা হবে।",
      },
      {
        speaker: "B",
        jp: "わかりました。",
        romaji: "wakarimashita",
        meaning: "I see.",
        bn: "বুঝেছি।",
      },
    ],
  },
  "lesson-7": {
    title: "At a friend's house",
    setting: "A guest arrives and is offered something to drink.",
    speakers: { A: "ホスト", B: "きゃく" },
    voices: { A: "female", B: "male" },
    lines: [
      {
        speaker: "A",
        jp: "いらっしゃい。",
        romaji: "irasshai",
        meaning: "How nice of you to come.",
        bn: "আসুন। স্বাগতম।",
      },
      {
        speaker: "A",
        jp: "どうぞおあがりください。",
        romaji: "douzo oagari kudasai",
        meaning: "Do come in.",
        bn: "ভিতরে আসুন।",
      },
      {
        speaker: "B",
        jp: "しつれいします。",
        romaji: "shitsurei shimasu",
        meaning: "May I?",
        bn: "ক্ষমা করবেন।",
      },
      {
        speaker: "A",
        jp: "コーヒーはいかがですか。",
        romaji: "koohii wa ikaga desu ka",
        meaning: "Would you like some coffee?",
        bn: "কফি নেবেন?",
      },
      {
        speaker: "B",
        jp: "いただきます。",
        romaji: "itadakimasu",
        meaning: "Thank you. I accept.",
        bn: "ধন্যবাদ। খাওয়া শুরু করছি।",
      },
      {
        speaker: "B",
        jp: "ごちそうさまでした。",
        romaji: "gochisousama deshita",
        meaning: "That was delicious.",
        bn: "ভাল লাগল।",
      },
    ],
  },
  "lesson-8": {
    title: "Another cup?",
    setting: "After coffee, a guest declines a refill and gets ready to leave.",
    speakers: { A: "ホスト", B: "きゃく" },
    voices: { A: "female", B: "male" },
    lines: [
      {
        speaker: "A",
        jp: "コーヒー、もう一杯いかがですか。",
        romaji: "koohii, mou ippai ikaga desu ka",
        meaning: "Won't you have another cup of coffee?",
        bn: "আরেক কাপ কফি নেবেন?",
      },
      {
        speaker: "B",
        jp: "いいえ、けっこうです。",
        romaji: "iie, kekkou desu",
        meaning: "No, thank you.",
        bn: "না, থাক।",
      },
      {
        speaker: "B",
        jp: "あ、もう6時ですね。そろそろ失礼します。",
        romaji: "a, mou roku-ji desu ne. sorosoro shitsurei shimasu",
        meaning: "Oh, it's already 6. It's time I was going.",
        bn: "ওহ, ইতিমধ্যে ৬টা। এবার উঠি।",
      },
      {
        speaker: "A",
        jp: "いいえ。またいらっしゃってください。",
        romaji: "iie. mata irasshatte kudasai",
        meaning: "Not at all. Please come again.",
        bn: "কিছু না। আবার আসবেন।",
      },
    ],
  },
  "lesson-9": {
    title: "Won't you join me?",
    setting: "Someone invites a friend out, who declines politely.",
    speakers: { A: "ミラー", B: "きむら" },
    voices: { A: "male", B: "male" },
    lines: [
      {
        speaker: "A",
        jp: "いっしょにいかがですか。",
        romaji: "issho ni ikaga desu ka",
        meaning: "Won't you join me?",
        bn: "একসাথে যাবেন?",
      },
      {
        speaker: "B",
        jp: "ちょっと……。",
        romaji: "chotto…",
        meaning: "That's a bit…",
        bn: "একটু…",
      },
      {
        speaker: "A",
        jp: "だめですか。",
        romaji: "dame desu ka",
        meaning: "So you can't come?",
        bn: "যাওয়া যাবে না?",
      },
      {
        speaker: "B",
        jp: "ええ、残念ですが。また今度お願いします。",
        romaji: "ee, zannen desu ga. mata kondo onegaishimasu",
        meaning: "Yes, I'm afraid so. Please ask me another time.",
        bn: "হ্যাঁ, দুঃখিত। পরের বার বলবেন।",
      },
    ],
  },
  "lesson-10": {
    title: "Nam pla",
    setting: "Asking where something is, then finding nam pla on the bottom shelf.",
    speakers: { A: "きゃく", B: "てんいん" },
    voices: { A: "male", B: "female" },
    lines: [
      {
        speaker: "A",
        jp: "どうもすみません。",
        romaji: "doumo sumimasen",
        meaning: "Thank you.",
        bn: "ধন্যবাদ।",
      },
      {
        speaker: "A",
        jp: "ナンプラー、ありますか。",
        romaji: "nanpuraa, arimasu ka",
        meaning: "Do you have nam pla?",
        bn: "নাম প্লা আছে?",
      },
      {
        speaker: "B",
        jp: "あちらにタイ料理のコーナーがあります。",
        romaji: "achira ni Tai ryouri no koonaa ga arimasu",
        meaning: "There's a Thai-food section over that way.",
        bn: "ওদিকে থাই খাবারের কর্নার আছে।",
      },
      {
        speaker: "B",
        jp: "ナンプラーはいちばん下です。",
        romaji: "nanpuraa wa ichiban shita desu",
        meaning: "Nam pla is on the bottom shelf.",
        bn: "নাম প্লা একদম নিচে।",
      },
    ],
  },
  ...LESSON_DIALOGUES_11_20,
  ...LESSON_DIALOGUES_21_25,
};

export function getDialogues(lessonId: string): Dialogue[] {
  if (lessonId === "all") return VOCAB_LESSONS.flatMap((l) => {
    const d = LESSON_DIALOGUES[l.id];
    return d ? [d] : [];
  });
  const d = LESSON_DIALOGUES[lessonId];
  return d ? [d] : [];
}

function indexMatches(
  lesson: { id: string; words: { jp: string; kind?: string }[] },
  list: typeof VOCAB_INDEX,
) {
  const meta = list.find((item) => item.id === lesson.id);
  const keys = lesson.words.map((word) => word.jp);
  const phrases = lesson.words.filter((word) => word.kind === "phrase").length;
  return (
    !!meta &&
    meta.wordCount === keys.length &&
    meta.phraseCount === phrases &&
    meta.keys.length === keys.length &&
    meta.keys.every((key, i) => key === keys[i])
  );
}

for (const lesson of VOCAB_LESSONS) {
  if (!indexMatches(lesson, VOCAB_INDEX)) {
    throw new Error(
      `Vocab index is out of date for ${lesson.id}. Run scripts/gen-vocab-index.mjs`,
    );
  }
}
for (const lesson of [NUMERALS_LESSON, MONEY_LESSON]) {
  if (!indexMatches(lesson, APPENDIX_INDEX)) {
    throw new Error(
      `Vocab index is out of date for ${lesson.id}. Run scripts/gen-vocab-index.mjs`,
    );
  }
}

