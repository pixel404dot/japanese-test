import type { Dialogue, VocabLesson, VocabWord } from "./vocab";

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

export const VOCAB_LESSONS_21_25: VocabLesson[] = [
  {
    id: "lesson-21",
    number: 21,
    title: "Think and say",
    titleJa: "だい21か",
    description: "Think, say, win or lose, and talk about the news.",
    words: [
      r("おもいます", "omoimasu", "think", "ভাবা", { kanji: "思います", note: "Group I" }),
      r("いいます", "iimasu", "say", "বলা", { kanji: "言います", note: "Group I" }),
      r("かちます", "kachimasu", "win", "জেতা", { kanji: "勝ちます", note: "Group I" }),
      r("まけます", "makemasu", "lose, be beaten", "হারা", {
        kanji: "負けます",
        note: "Group II*",
      }),
      r("あります", "arimasu", "[a festival] be held, take place", "অনুষ্ঠিত হওয়া", {
        kanji: "あります [お祭りが〜]",
        note: "Group I. おまつりがあります. Not possession (lesson 9) or exist (lesson 10).",
      }),
      r("やくにたちます", ["yaku ni tachimasu", "yakunitachimasu"], "be useful", "কাজে লাগা", {
        kanji: "役に立ちます",
        note: "Group I",
      }),
      r("うごきます", "ugokimasu", "move, work", "নড়া / চলা", { kanji: "動きます", note: "Group I" }),
      r("やめます", "yamemasu", "quit or retire from [a company], stop, give up", "ছাড়া দেওয়া / থামানো", {
        kanji: "やめます [会社を〜]",
        note: "Group II. かいしゃをやめます",
      }),
      r("きをつけます", ["ki o tsukemasu", "kiotsukemasu"], "pay attention, take care", "খেয়াল রাখা", {
        kanji: "気をつけます",
        note: "Group II",
      }),
      r("りゅうがくします", ["ryuugaku shimasu", "ryuugakushimasu"], "study abroad", "বিদেশে পড়াশোনা", {
        kanji: "留学します",
        note: "Group III",
      }),
      r("むだ", "muda", "wasteful", "অপচয়", { note: "な-adjective. むだ[な]" }),
      r("ふべん", "fuben", "inconvenient", "অসুবিধাজনক", {
        kanji: "不便",
        note: "な-adjective. ふべん[な]",
      }),
      r("すごい", "sugoi", "awful, great", "দারুণ / অবাক করা", {
        note: "Expresses astonishment or admiration",
      }),
      r("ほんとう", ["hontou", "honto"], "true", "সত্য", { kanji: "本当" }),
      r("うそ", "uso", "lie", "মিথ্যা", { note: "Marked * in the textbook" }),
      r("じどうしゃ", "jidousha", "car, automobile", "গাড়ি", { kanji: "自動車" }),
      r("こうつう", ["koutsuu", "koutsu"], "transport, traffic", "যানবাহন / ট্রাফিক", { kanji: "交通" }),
      r("ぶっか", "bukka", "[commodity] prices", "দাম", { kanji: "物価" }),
      r("ほうそう", ["housou", "hoso"], "announcement, broadcast", "সম্প্রচার", { kanji: "放送" }),
      r("ニュース", ["nyuusu", "nyusu"], "news", "খবর"),
      r("アニメ", "anime", "anime (Japanese animated film)", "অ্যানিমে"),
      r("マンガ", "manga", "comic book", "কমিক"),
      r("デザイン", "dezain", "design, artwork", "নকশা"),
      r("ゆめ", "yume", "dream", "স্বপ্ন", { kanji: "夢" }),
      r("てんさい", "tensai", "genius", "প্রতিভা", { kanji: "天才" }),
      r("しあい", "shiai", "game, match", "খেলা / ম্যাচ", {
        kanji: "試合",
        note: "〜をします: play a game or match",
      }),
      r("いけん", "iken", "opinion", "মতামত", { kanji: "意見" }),
      r("はなし", "hanashi", "talk, speech, story", "কথা / গল্প", {
        kanji: "話",
        note: "〜をします: talk, tell a story",
      }),
      r("ちきゅう", ["chikyuu", "chikyu"], "earth", "পৃথিবী", { kanji: "地球" }),
      r("つき", "tsuki", "moon", "চাঁদ", {
        kanji: "月",
        note: "This lesson: the moon. 月 is also month / the day counter.",
      }),
      r("さいきん", "saikin", "recently, these days", "ইদানীং", { kanji: "最近" }),
      r("たぶん", "tabun", "probably, perhaps, maybe", "হয়তো"),
      r("きっと", "kitto", "surely, definitely", "নিশ্চয়ই"),
      r("ほんとうに", ["hontou ni", "hontouni"], "really", "সত্যিই", { kanji: "本当に" }),
      r("そんなに", "sonna ni", "not so (used with negatives)", "ততটা নয়"),
      r("〜について", ["ni tsuite", "nitsuite"], "about 〜, concerning 〜", "সম্পর্কে"),
      p("ひさしぶりですね", ["hisashiburi desu ne", "hisashiburidesune"], "It's been a long time.", "অনেক দিন পর।", {
        kanji: "久しぶりですね",
      }),
      p(
        "コーヒーでも飲みませんか",
        ["koohii demo nomimasen ka", "koohiidemonomimasenka"],
        "How about a coffee or something?",
        "কফি বা কিছু খেয়ে নিই না?",
        { note: "Pattern: 〜でも飲みませんか" },
      ),
      r("もちろん", "mochiron", "of course", "অবশ্যই"),
      p("もう帰らないと", ["mou kaeranai to", "moukaeranaito"], "I have to get home now.", "এখন বাড়ি যেতে হবে।", {
        kanji: "もう帰らないと",
        note: "Textbook: もう帰らないと……",
      }),
    ],
  },
  {
    id: "lesson-22",
    number: 22,
    title: "Clothes",
    titleJa: "だい22か",
    description: "Put clothes on, be born, and look for a room.",
    words: [
      r("きます", "kimasu", "put on (a shirt, etc.)", "পরা (জামা)", {
        kanji: "着ます",
        note: "Group II. Lesson 5 きます is come (来ます).",
      }),
      r("はきます", "hakimasu", "put on (shoes, trousers, etc.)", "পরা (জুতা / প্যান্ট)", {
        note: "Group I",
      }),
      r("かぶります", "kaburimasu", "put on (a hat, etc.)", "পরা (টুপি)", { note: "Group I" }),
      r("かけます", "kakemasu", "put on [glasses]", "চশমা পরা", {
        kanji: "かけます [眼鏡を〜]",
        note: "Group II. めがねをかけます. Lesson 7 かけます is make a phone call.",
      }),
      r("します", "shimasu", "put on [a tie]", "টাই পরা", {
        note: "Group III. ネクタイをします. Lesson 6 します is do / play.",
      }),
      r("うまれます", "umaremasu", "be born", "জন্মানো", { kanji: "生まれます", note: "Group II" }),
      r("わたしたち", "watashitachi", "we", "আমরা"),
      r("コート", "kooto", "coat", "কোট"),
      r("セーター", ["seetaa", "seeta"], "sweater", "সোয়েটার"),
      r("スーツ", "suutsu", "suit", "স্যুট", { note: "Marked * in the textbook" }),
      r("ぼうし", ["boushi", "boshi"], "hat, cap", "টুপি", { kanji: "帽子" }),
      r("めがね", "megane", "glasses", "চশমা", { kanji: "眼鏡" }),
      r("ケーキ", ["keeki", "keki"], "cake", "কেক"),
      r("おべんとう", ["obentou", "obento"], "box lunch", "বেন্টো", {
        kanji: "お弁当",
        note: "[お]べんとう",
      }),
      r("ロボット", "robotto", "robot", "রোবট"),
      r("ユーモア", ["yuumoa", "yumor"], "humor", "রসিকতা"),
      r("つごう", ["tsugou", "tsugo"], "convenience", "সুবিধা", { kanji: "都合" }),
      r("よく", "yoku", "often", "প্রায়ই", {
        note: "This lesson: often. Lesson 9 よく is well / much.",
      }),
      p("えーと", "eeto", "well, let me see", "আচ্ছা, দেখি"),
      p("おめでとうございます", ["omedetou gozaimasu", "omedetougozaimasu"], "Congratulations.", "অভিনন্দন।", {
        note: "おめでとう is shorter. Birthdays, weddings, New Year.",
      }),
      p("おさがしですか", ["osagashi desu ka", "osagashidesuka"], "Are you looking for 〜?", "খুঁজছেন?", {
        kanji: "お探しですか",
      }),
      r("では", "dewa", "well then", "তাহলে"),
      r("こちら", "kochira", "this (polite equivalent of これ)", "এটি (ভদ্র)", {
        note: "This lesson: polite これ. Lesson 3 こちら is this way.",
      }),
      r("やちん", "yachin", "rent", "ভাড়া", { kanji: "家賃" }),
      r("ダイニングキッチン", ["dainingu kicchin", "dainingukicchin"], "kitchen with a dining area", "ডাইনিং কিচেন"),
      r("わしつ", "washitsu", "Japanese-style room", "জাপানি ঘর", { kanji: "和室" }),
      r("おしいれ", "oshiire", "Japanese-style closet", "ওশিইরে (জাপানি আলমারি)", { kanji: "押し入れ" }),
      r("ふとん", "futon", "Japanese-style mattress and quilt", "ফুতন", { kanji: "布団" }),
      r("パリ", "pari", "Paris", "প্যারিস"),
      r("ばんりのちょうじょう", ["banri no choujou", "banrinochoujou"], "the Great Wall of China", "চীনের প্রাচীর", {
        kanji: "万里の長城",
      }),
      r("みんなのアンケート", ["minna no ankeeto", "minnanoankeeto"], "a fictitious questionnaire", "কাল্পনিক জরিপ"),
    ],
  },
  {
    id: "lesson-23",
    number: 23,
    title: "Ask the way",
    titleJa: "だい23か",
    description: "Ask, turn, walk, and find the way.",
    words: [
      r("ききます", "kikimasu", "ask [the teacher]", "জিজ্ঞেস করা", {
        kanji: "聞きます",
        note: "Group I. せんせいにききます. Lesson 6 ききます is hear / listen.",
      }),
      r("まわします", "mawashimasu", "turn", "ঘোরানো", { kanji: "回します", note: "Group I" }),
      r("ひきます", "hikimasu", "pull", "টানা", {
        kanji: "引きます",
        note: "Group I. Lesson 18 ひきます is play a stringed instrument (弾きます).",
      }),
      r("かえます", "kaemasu", "change", "বদলানো", {
        kanji: "変えます",
        note: "Group II. Lesson 18 かえます is exchange (換えます). Not 帰ります (go home).",
      }),
      r("さわります", "sawarimasu", "touch [a door]", "ছোঁয়া", {
        kanji: "触ります",
        note: "Group I. ドアにさわります",
      }),
      r("でます", "demasu", "[change] come out", "বেরিয়ে আসা", {
        kanji: "出ます [お釣りが〜]",
        note: "Group II. おつりがでます. Also go out (lesson 14) and graduate (lesson 16).",
      }),
      r("あるきます", "arukimasu", "walk", "হাঁটা", { kanji: "歩きます", note: "Group I" }),
      r("わたります", "watarimasu", "cross [a bridge]", "পার হওয়া", {
        kanji: "渡ります",
        note: "Group I. はしをわたります",
      }),
      r("まがります", "magarimasu", "turn [to the right]", "মোড় নেওয়া", {
        kanji: "曲がります",
        note: "Group I. みぎへまがります",
      }),
      r("さびしい", "sabishii", "lonely", "একা লাগা", { kanji: "寂しい" }),
      r("おゆ", "oyu", "hot water", "গরম পানি", { kanji: "お湯", note: "[お]ゆ" }),
      r("おと", "oto", "sound", "শব্দ", { kanji: "音" }),
      r("サイズ", "saizu", "size", "সাইজ"),
      r("こしょう", ["koshou", "kosho"], "breakdown", "নষ্ট", {
        kanji: "故障",
        note: "〜します: break down",
      }),
      r("みち", "michi", "road, way", "রাস্তা", { kanji: "道" }),
      r("こうさてん", ["kousaten", "kosaten"], "crossroads", "চৌরাস্তা", { kanji: "交差点" }),
      r("しんごう", ["shingou", "shingo"], "traffic lights", "ট্রাফিক সিগন্যাল", { kanji: "信号" }),
      r("かど", "kado", "corner", "মোড়", { kanji: "角" }),
      r("はし", "hashi", "bridge", "সেতু", {
        kanji: "橋",
        note: "Bridge. Lesson 7 はし is chopsticks.",
      }),
      r("ちゅうしゃじょう", ["chuushajou", "chushajo"], "car park, parking lot", "পার্কিং", {
        kanji: "駐車場",
      }),
      r("たてもの", "tatemono", "building", "ভবন", { kanji: "建物" }),
      r("なんかいも", ["nankai mo", "nankaimo"], "many times", "অনেকবার", { kanji: "何回も" }),
      r("〜め", "me", "the -th (indicating order)", "-তম", {
        kanji: "〜目",
        note: "さんばんめ: the third",
      }),
      r("しょうとくたいし", ["shoutoku taishi", "shoutokutaishi"], "Prince Shotoku (574–622)", "প্রিন্স শোতোকু", {
        kanji: "聖徳太子",
      }),
      r(
        "ほうりゅうじ",
        ["houryuuji", "horyuji"],
        "Horyuji Temple (Nara)",
        "হোরিউজি মন্দির",
        {
          kanji: "法隆寺",
          note: "Built by Prince Shotoku at the beginning of the 7th century",
        },
      ),
      r("げんきちゃ", ["genki cha", "genkicha"], "a fictitious tea", "কাল্পনিক চা", { kanji: "元気茶" }),
      r("ほんだえき", ["honda eki", "hondaeki"], "a fictitious station", "কাল্পনিক স্টেশন", {
        kanji: "本田駅",
      }),
      r("としょかんまえ", ["toshokan mae", "toshokanmae"], "a fictitious bus stop", "কাল্পনিক বাসস্টপ", {
        kanji: "図書館前",
      }),
    ],
  },
  {
    id: "lesson-24",
    number: 24,
    title: "Give and bring",
    titleJa: "だい24か",
    description: "Give, bring someone, introduce, and explain.",
    words: [
      r("くれます", "kuremasu", "give (me)", "আমাকে দেওয়া", { note: "Group II" }),
      r("なおします", "naoshimasu", "repair, correct", "মেরামত করা / শুধরে দেওয়া", {
        kanji: "直します",
        note: "Group I",
      }),
      r("つれていきます", ["tsurete ikimasu", "tsureteikimasu"], "take (someone)", "কাউকে নিয়ে যাওয়া", {
        kanji: "連れて行きます",
        note: "Group I",
      }),
      r("つれてきます", ["tsurete kimasu", "tsuretekimasu"], "bring (someone)", "কাউকে নিয়ে আসা", {
        kanji: "連れて来ます",
        note: "Group III*. Not もってきます (bring a thing).",
      }),
      r("おくります", "okurimasu", "escort [someone], go with", "এগিয়ে দেওয়া", {
        kanji: "送ります",
        note: "Group I. ひとをおくります. Lesson 7 おくります is send.",
      }),
      r("しょうかいします", ["shoukai shimasu", "shoukaishimasu"], "introduce", "পরিচয় করানো", {
        kanji: "紹介します",
        note: "Group III",
      }),
      r("あんないします", ["annai shimasu", "annaishimasu"], "show around, show the way", "ঘুরিয়ে দেখানো", {
        kanji: "案内します",
        note: "Group III",
      }),
      r("せつめいします", ["setsumei shimasu", "setsumeishimasu"], "explain", "বুঝিয়ে বলা", {
        kanji: "説明します",
        note: "Group III",
      }),
      r("おじいさん", ["ojiisan", "ojisan"], "grandfather, old man", "দাদা / বৃদ্ধ"),
      r("おじいちゃん", ["ojiichan", "ojichan"], "grandfather, old man (casual)", "দাদু"),
      r("おばあさん", ["obaasan", "obasan"], "grandmother, old woman", "দিদিমা / বৃদ্ধা"),
      r("おばあちゃん", ["obaachan", "obachan"], "grandmother, old woman (casual)", "দিদা"),
      r("じゅんび", "junbi", "preparation", "প্রস্তুতি", {
        kanji: "準備",
        note: "〜[を]します: prepare",
      }),
      r("ひっこし", "hikkoshi", "moving out", "বাড়ি বদল", {
        kanji: "引っ越し",
        note: "〜[を]します: move out",
      }),
      r("おかし", "okashi", "sweets, snacks", "মিষ্টি", { kanji: "お菓子", note: "[お]かし" }),
      r("ホームステイ", ["hoomusutei", "homusutei"], "homestay", "হোমস্টে"),
      r("ぜんぶ", "zenbu", "all", "সব", {
        kanji: "全部",
        note: "Lesson 11 ぜんぶで is in total.",
      }),
      r("じぶんで", ["jibun de", "jibunde"], "by oneself", "নিজে", { kanji: "自分で" }),
    ],
  },
  {
    id: "lesson-25",
    number: 25,
    title: "If and goodbye",
    titleJa: "だい25か",
    description: "Consider, arrive, grow old, and say goodbye.",
    words: [
      r("かんがえます", "kangaemasu", "think, consider", "ভেবে দেখা", {
        kanji: "考えます",
        note: "Group II. Lesson 21 おもいます is think / believe.",
      }),
      r("つきます", "tsukimasu", "arrive", "পৌঁছানো", {
        kanji: "着きます",
        note: "Group I. Not 着ます (put on, lesson 22).",
      }),
      r("とります", "torimasu", "grow old", "বয়স বাড়া", {
        kanji: "取ります [年を〜]",
        note: "Group I. としをとります. Lesson 6 is take a photograph. Lesson 14 is take / pass.",
      }),
      r("たります", "tarimasu", "be enough, be sufficient", "যথেষ্ট হওয়া", {
        kanji: "足ります",
        note: "Group II",
      }),
      r("いなか", "inaka", "countryside, hometown", "গ্রাম / নিজের এলাকা", { kanji: "田舎" }),
      r("チャンス", ["chansu"], "chance", "সুযোগ"),
      r("おく", "oku", "hundred million", "দশ কোটি", { kanji: "億" }),
      r("もし", "moshi", "if", "যদি", { note: "もし〜たら" }),
      r("いみ", "imi", "meaning", "অর্থ", { kanji: "意味" }),
      p("もしもし", "moshimoshi", "hello (used on the phone)", "হ্যালো (ফোনে)"),
      r("てんきん", "tenkin", "transfer", "বদলি", {
        kanji: "転勤",
        note: "〜します: be transferred to another office",
      }),
      r("こと", "koto", "thing, matter", "ব্যাপার", { note: "〜のこと: a thing about 〜" }),
      r("ひま", "hima", "free time", "ফুরসত", {
        kanji: "暇",
        note: "な-adjective. Same as lesson 8.",
      }),
      p(
        "いろいろお世話になりました",
        ["iroiro osewa ni narimashita", "iroiroosewaninarimashita"],
        "Thank you for everything you've done for me.",
        "আপনি অনেক করেছেন, ধন্যবাদ।",
        { kanji: "いろいろお世話になりました", note: "Textbook: [いろいろ]お世話になりました" },
      ),
      r("がんばります", "ganbarimasu", "do one's best", "চেষ্টা করা", {
        kanji: "頑張ります",
        note: "Group I",
      }),
      p("どうぞお元気で", ["douzo ogenki de", "douzoogenkide"], "Please take care of yourself.", "ভালো থাকবেন।", {
        kanji: "どうぞお元気で",
        note: "Said when expecting a long separation",
      }),
      r("ベトナム", ["betonamu"], "Vietnam", "ভিয়েতনাম"),
    ],
  },
];

export const LESSON_DIALOGUES_21_25: Record<string, Dialogue> = {
  "lesson-21": {
    title: "It's been a while",
    setting: "Two friends meet, then one has to leave.",
    speakers: { A: "ともだち", B: "ともだち" },
    voices: { A: "female", B: "male" },
    lines: [
      {
        speaker: "A",
        jp: "久しぶりですね。",
        romaji: "hisashiburi desu ne",
        meaning: "It's been a long time.",
        bn: "অনেক দিন পর।",
      },
      {
        speaker: "B",
        jp: "コーヒーでも飲みませんか。",
        romaji: "koohii demo nomimasen ka",
        meaning: "How about a coffee or something?",
        bn: "কফি বা কিছু খেয়ে নিই না?",
      },
      {
        speaker: "A",
        jp: "もちろん。",
        romaji: "mochiron",
        meaning: "Of course.",
        bn: "অবশ্যই।",
      },
      {
        speaker: "B",
        jp: "もう帰らないと。",
        romaji: "mou kaeranai to",
        meaning: "I have to get home now.",
        bn: "এখন বাড়ি যেতে হবে।",
      },
    ],
  },
  "lesson-22": {
    title: "Looking for a room",
    setting: "At a housing agency.",
    speakers: { A: "てんいん", B: "きゃく" },
    voices: { A: "female", B: "male" },
    lines: [
      {
        speaker: "A",
        jp: "お探しですか。",
        romaji: "osagashi desu ka",
        meaning: "Are you looking for a place?",
        bn: "খুঁজছেন?",
      },
      {
        speaker: "B",
        jp: "家賃はいくらですか。",
        romaji: "yachin wa ikura desu ka",
        meaning: "How much is the rent?",
        bn: "ভাড়া কত?",
      },
      {
        speaker: "A",
        jp: "では、こちらです。和室があります。",
        romaji: "dewa, kochira desu. washitsu ga arimasu",
        meaning: "Well then, this one. There is a Japanese-style room.",
        bn: "তাহলে, এইটা। জাপানি ঘর আছে।",
      },
    ],
  },
  "lesson-23": {
    title: "Turn at the lights",
    setting: "Asking the way past the crossroads.",
    speakers: { A: "おんな", B: "おとこ" },
    voices: { A: "female", B: "male" },
    lines: [
      {
        speaker: "A",
        jp: "交差点を右へ曲がってください。",
        romaji: "kousaten o migi e magatte kudasai",
        meaning: "Turn right at the crossroads.",
        bn: "চৌরাস্তায় ডানে মোড় নিন।",
      },
      {
        speaker: "B",
        jp: "橋を渡りますか。",
        romaji: "hashi o watarimasu ka",
        meaning: "Do I cross the bridge?",
        bn: "সেতু পার হব?",
      },
      {
        speaker: "A",
        jp: "はい。駐車場は建物の前です。",
        romaji: "hai. chuushajou wa tatemono no mae desu",
        meaning: "Yes. The car park is in front of the building.",
        bn: "হ্যাঁ। পার্কিং ভবনের সামনে।",
      },
    ],
  },
  "lesson-24": {
    title: "I'll bring him",
    setting: "Before showing someone around.",
    speakers: { A: "ともだち", B: "ともだち" },
    voices: { A: "female", B: "male" },
    lines: [
      {
        speaker: "A",
        jp: "おじいちゃんを連れて来ます。",
        romaji: "ojiichan o tsurete kimasu",
        meaning: "I'll bring my grandfather.",
        bn: "দাদুকে নিয়ে আসব।",
      },
      {
        speaker: "B",
        jp: "案内します。全部説明します。",
        romaji: "annai shimasu. zenbu setsumei shimasu",
        meaning: "I'll show you around. I'll explain everything.",
        bn: "ঘুরিয়ে দেখাব। সব বুঝিয়ে বলব।",
      },
      {
        speaker: "A",
        jp: "自分で直します。",
        romaji: "jibun de naoshimasu",
        meaning: "I'll fix it myself.",
        bn: "নিজে ঠিক করব।",
      },
    ],
  },
  "lesson-25": {
    title: "Please take care",
    setting: "A colleague is transferred.",
    speakers: { A: "かいしゃいん", B: "かいしゃいん" },
    voices: { A: "male", B: "female" },
    lines: [
      {
        speaker: "A",
        jp: "転勤します。いろいろお世話になりました。",
        romaji: "tenkin shimasu. iroiro osewa ni narimashita",
        meaning: "I'm being transferred. Thank you for everything.",
        bn: "বদলি হচ্ছি। আপনি অনেক করেছেন, ধন্যবাদ।",
      },
      {
        speaker: "B",
        jp: "どうぞお元気で。",
        romaji: "douzo ogenki de",
        meaning: "Please take care of yourself.",
        bn: "ভালো থাকবেন।",
      },
      {
        speaker: "A",
        jp: "はい、頑張ります。",
        romaji: "hai, ganbarimasu",
        meaning: "Yes, I'll do my best.",
        bn: "হ্যাঁ, চেষ্টা করব।",
      },
    ],
  },
};
