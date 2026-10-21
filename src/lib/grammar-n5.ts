import type { GrammarExample, GrammarPoint } from "./grammar";

const ex = (
  jp: string,
  romaji: string,
  meaning: string,
  bn: string,
): GrammarExample => ({ jp, romaji, meaning, bn });

const p = (
  n: number,
  phase: number,
  pattern: string,
  meaning: string,
  bn: string,
  form: string,
  examples: GrammarExample[],
  note?: string,
): GrammarPoint => ({ n, phase, pattern, meaning, bn, form, examples, note });

export const GRAMMAR_POINTS: GrammarPoint[] = [
  p(1, 1, "は", "Marks the topic — what the sentence is about.", "বাক্যের বিষয় চিহ্নিত করে। যার কথা বলা হচ্ছে, তার পরে は।", "Noun + は", [
    ex("わたしは学生です。", "watashi wa gakusei desu.", "I am a student.", "আমি ছাত্র।"),
    ex("今日は暑いです。", "kyou wa atsui desu.", "Today is hot.", "আজ গরম।"),
  ], "Written は, read wa."),
  p(2, 1, "です / だ", "The copula: polite です and plain だ. Says what something is, or how it is.", "কোনো কিছু কী বা কেমন, তা বলার polite ও plain রূপ।", "Noun / な-adjective + です（だ）", [
    ex("これは本です。", "kore wa hon desu.", "This is a book.", "এটা একটি বই।"),
    ex("今日は休みだ。", "kyou wa yasumi da.", "Today is a day off.", "আজ ছুটি।"),
  ], "だ is plain speech. Use です with people you don't know well."),
  p(3, 1, "じゃない／ではありません", "Negative of a noun or な-adjective. じゃない is plain; ではありません is polite.", "না — noun বা な-adjective-এর negative।", "Noun / な-adj + じゃない / ではありません", [
    ex("わたしは先生じゃありません。", "watashi wa sensei ja arimasen.", "I am not a teacher.", "আমি শিক্ষক নই।"),
    ex("この部屋は静かじゃない。", "kono heya wa shizuka ja nai.", "This room is not quiet.", "এই ঘরটি শান্ত নয়।"),
  ]),
  p(4, 1, "か（question）", "Turns a sentence into a question. The question mark is optional.", "প্রশ্ন বোঝাতে বাক্যের শেষে か।", "Sentence + か", [
    ex("あなたは学生ですか。", "anata wa gakusei desu ka.", "Are you a student?", "আপনি কি ছাত্র?"),
    ex("これは何ですか。", "kore wa nan desu ka.", "What is this?", "এটা কী?"),
  ]),
  p(5, 1, "の（possession）", "Links two nouns: possession, relation, or which kind.", "মালিকানা, সম্পর্ক, বা কোন ধরনের — দুটি noun জোড়ে।", "Noun + の + Noun", [
    ex("これはわたしの本です。", "kore wa watashi no hon desu.", "This is my book.", "এটা আমার বই।"),
    ex("日本の車です。", "Nihon no kuruma desu.", "It is a Japanese car.", "এটা জাপানি গাড়ি।"),
  ]),
  p(6, 1, "も", "Also. Replaces は when the same thing is true of another topic.", "এছাড়াও। একই কথা অন্য বিষয়ের জন্যও সত্য।", "Noun + も", [
    ex("わたしも学生です。", "watashi mo gakusei desu.", "I am a student too.", "আমিও ছাত্র।"),
    ex("コーヒーも飲みます。", "koohii mo nomimasu.", "I drink coffee as well.", "কফিও খাই।"),
  ]),
  p(7, 1, "が（subject）", "Marks the subject, especially new information, questions words, and what exists.", "কর্তা বা নতুন তথ্য চিহ্নিত করে। প্রশ্নশব্দের পরেও が।", "Noun + が", [
    ex("だれが来ますか。", "dare ga kimasu ka.", "Who is coming?", "কে আসবে?"),
    ex("猫がいます。", "neko ga imasu.", "There is a cat.", "একটা বিড়াল আছে।"),
  ], "は is the topic you are talking about. が points at the doer or the new fact."),
  p(8, 1, "よ", "Sentence-ending particle. You are telling the listener something they may not know.", "শ্রোতা না-জানা কথা জোর দিয়ে জানানো।", "Sentence + よ", [
    ex("この店は安いですよ。", "kono mise wa yasui desu yo.", "This shop is cheap, you know.", "এই দোকান সস্তা, জানেন।"),
    ex("もう三時だよ。", "mou sanji da yo.", "It's already three.", "ইতিমধ্যে তিনটে বাজে।"),
  ]),
  p(9, 1, "ね", "Sentence-ending particle. Seeks agreement, or softens: isn't it?", "তাই না — সম্মতি চায়, বা কথা নরম করে।", "Sentence + ね", [
    ex("今日はいい天気ですね。", "kyou wa ii tenki desu ne.", "Nice weather today, isn't it?", "আজ আবহাওয়া ভালো, তাই না?"),
    ex("おいしいね。", "oishii ne.", "It's tasty, huh?", "সুস্বাদু, না?"),
  ]),
  p(10, 1, "なあ", "Plain sentence ending for a feeling: wonder, admiration, or a sigh.", "অনুভূতি, বিস্ময় বা প্রশংসা। কথ্য।", "Plain sentence + なあ", [
    ex("きれいだなあ。", "kirei da naa.", "How beautiful.", "কী সুন্দর।"),
    ex("また日本へ行きたいなあ。", "mata Nihon e ikitai naa.", "I want to go to Japan again.", "আবার জাপানে যেতে ইচ্ছে করে।"),
  ]),
  p(11, 2, "これ", "This one, near the speaker. A noun by itself.", "এটা — বক্তার কাছের জিনিস। একাই noun।", "これ + は / を …", [
    ex("これはいくらですか。", "kore wa ikura desu ka.", "How much is this?", "এটার দাম কত?"),
    ex("これをください。", "kore o kudasai.", "This one, please.", "এটা দেবেন।"),
  ]),
  p(12, 2, "それ", "That one, near the listener.", "ওটা — শ্রোতার কাছের জিনিস।", "それ + は / を …", [
    ex("それはわたしの傘です。", "sore wa watashi no kasa desu.", "That is my umbrella.", "ওটা আমার ছাতা।"),
    ex("それは何ですか。", "sore wa nan desu ka.", "What is that?", "ওটা কী?"),
  ]),
  p(13, 2, "あれ", "That one over there, away from both speaker and listener.", "ওইটা — দুজনের থেকে দূরে।", "あれ + は …", [
    ex("あれは学校です。", "are wa gakkou desu.", "That over there is a school.", "ওইটা স্কুল।"),
    ex("あれを見てください。", "are o mite kudasai.", "Please look at that.", "ওইটা দেখুন।"),
  ]),
  p(14, 2, "どれ", "Which one, of several things.", "কোনটা — কয়েকটির মধ্যে।", "どれ + が / を …", [
    ex("どれがあなたの傘ですか。", "dore ga anata no kasa desu ka.", "Which one is your umbrella?", "কোনটা আপনার ছাতা?"),
    ex("どれにしますか。", "dore ni shimasu ka.", "Which one will you take?", "কোনটা নেবেন?"),
  ]),
  p(15, 2, "この／その／あの", "This / that / that over there, before a noun.", "এই / ওই / ওই দূরের — noun-এর আগে।", "この / その / あの + Noun", [
    ex("この本はおもしろいです。", "kono hon wa omoshiroi desu.", "This book is interesting.", "এই বই মজার।"),
    ex("あの人はだれですか。", "ano hito wa dare desu ka.", "Who is that person?", "ওই মানুষটি কে?"),
  ], "これ is the thing itself. この needs a noun after it."),
  p(16, 2, "どの", "Which, before a noun.", "কোন — noun-এর আগে।", "どの + Noun", [
    ex("どのバスに乗りますか。", "dono basu ni norimasu ka.", "Which bus do you take?", "কোন বাসে উঠবেন?"),
    ex("どの色が好きですか。", "dono iro ga suki desu ka.", "Which color do you like?", "কোন রং পছন্দ?"),
  ]),
  p(17, 2, "ここ／そこ／あそこ", "Here / there / over there. Places, not things.", "এখানে / ওখানে / ওইখানে। জায়গা।", "ここ / そこ / あそこ", [
    ex("ここに座ってください。", "koko ni suwatte kudasai.", "Please sit here.", "এখানে বসুন।"),
    ex("トイレはあそこです。", "toire wa asoko desu.", "The toilet is over there.", "টয়লেট ওইখানে।"),
  ]),
  p(18, 2, "どこ", "Where.", "কোথায়।", "どこ", [
    ex("駅はどこですか。", "eki wa doko desu ka.", "Where is the station?", "স্টেশন কোথায়?"),
    ex("どこで食べますか。", "doko de tabemasu ka.", "Where shall we eat?", "কোথায় খাব?"),
  ]),
  p(19, 2, "だれ", "Who. どなた is the polite word.", "কে। ভদ্রভাবে どなた।", "だれ + が / ですか", [
    ex("あの人はだれですか。", "ano hito wa dare desu ka.", "Who is that person?", "ওই মানুষটি কে?"),
    ex("だれと行きますか。", "dare to ikimasu ka.", "Who are you going with?", "কার সাথে যাবেন?"),
  ]),
  p(20, 2, "なに／なん", "What. なん before です, counters, and some sounds. なに elsewhere.", "কী। です বা সংখ্যার আগে なん, অন্যত্র なに।", "なに / なん", [
    ex("これは何ですか。", "kore wa nan desu ka.", "What is this?", "এটা কী?"),
    ex("何を食べますか。", "nani o tabemasu ka.", "What will you eat?", "কী খাবেন?"),
  ]),
  p(21, 3, "に（destination）", "The point you arrive at: a destination.", "গন্তব্য — যেখানে পৌঁছানো হয়।", "Place + に + 行きます / 来ます / 帰ります", [
    ex("明日京都に行きます。", "ashita Kyouto ni ikimasu.", "I will go to Kyoto tomorrow.", "আগামীকাল কিয়োটো যাব।"),
    ex("七時に家に帰ります。", "shichiji ni uchi ni kaerimasu.", "I go home at seven.", "সাতটায় বাড়ি ফিরি।"),
  ]),
  p(22, 3, "へ", "Direction: toward a place. With 行く, 来る, 帰る it often matches に.", "দিকে — কোনো দিকে যাওয়া। 行く/来る/帰る-এর সাথে に-এর কাছাকাছি।", "Place + へ + 行きます / 来ます", [
    ex("日本へ行きたいです。", "Nihon e ikitai desu.", "I want to go to Japan.", "জাপানে যেতে চাই।"),
    ex("右へ曲がってください。", "migi e magatte kudasai.", "Please turn right.", "ডানে ঘুরুন।"),
  ], "へ is written he and read e."),
  p(23, 3, "に（time）", "A specific time when something happens.", "নির্দিষ্ট সময় — কখন কিছু হয়।", "Time + に", [
    ex("六時に起きます。", "rokuji ni okimasu.", "I get up at six.", "ছয়টায় উঠি।"),
    ex("日曜日に映画を見ます。", "nichiyoubi ni eiga o mimasu.", "I watch a film on Sunday.", "রবিবার সিনেমা দেখি।"),
  ], "に is not used with 今日, 明日, 毎週, or 毎〜."),
  p(24, 3, "に（existence location）", "The place where someone or something exists, with います or あります.", "কোথায় কেউ বা কিছু আছে — います / あります-এর সাথে।", "Place + に + います / あります", [
    ex("机の上に本があります。", "tsukue no ue ni hon ga arimasu.", "There is a book on the desk.", "টেবিলের ওপর একটা বই আছে।"),
    ex("公園に子どもがいます。", "kouen ni kodomo ga imasu.", "There are children in the park.", "পার্কে বাচ্চারা আছে।"),
  ]),
  p(25, 3, "で（place of action）", "The place where an action happens.", "যেখানে কাজটি হয়।", "Place + で + Verb", [
    ex("図書館で勉強します。", "toshokan de benkyou shimasu.", "I study at the library.", "লাইব্রেরিতে পড়াশোনা করি।"),
    ex("ここで写真を撮ってもいいですか。", "koko de shashin o totte mo ii desu ka.", "May I take a photo here?", "এখানে ছবি তুলতে পারি?"),
  ], "に is where something is. で is where you do something."),
  p(26, 3, "で（means/tool）", "The means, tool, or language used to do something.", "উপায়, যান, যন্ত্র, বা ভাষা।", "Noun + で + Verb", [
    ex("バスで学校へ行きます。", "basu de gakkou e ikimasu.", "I go to school by bus.", "বাসে স্কুলে যাই।"),
    ex("ペンで書いてください。", "pen de kaite kudasai.", "Please write with a pen.", "কলম দিয়ে লিখুন।"),
  ]),
  p(27, 3, "を", "Marks the direct object — the thing the verb acts on.", "কর্ম — ক্রিয়া যার ওপর পড়ে।", "Noun + を + Verb", [
    ex("水を飲みます。", "mizu o nomimasu.", "I drink water.", "পানি খাই।"),
    ex("日本語を勉強しています。", "nihongo o benkyou shite imasu.", "I am studying Japanese.", "জাপানি পড়ছি।"),
  ], "を is written wo and read o."),
  p(28, 3, "と（with）", "Together with someone.", "কারও সাথে।", "Person + と", [
    ex("友達と映画を見ます。", "tomodachi to eiga o mimasu.", "I watch a film with a friend.", "বন্ধুর সাথে সিনেমা দেখি।"),
    ex("家族と住んでいます。", "kazoku to sunde imasu.", "I live with my family.", "পরিবারের সাথে থাকি।"),
  ]),
  p(29, 3, "から（from）", "Starting point: from a place or from a time.", "থেকে — জায়গা বা সময়ের শুরু।", "Place / Time + から", [
    ex("九時から働きます。", "kuji kara hatarakimasu.", "I work from nine.", "নয়টা থেকে কাজ করি।"),
    ex("家から駅まで歩きます。", "uchi kara eki made arukimasu.", "I walk from home to the station.", "বাড়ি থেকে স্টেশন পর্যন্ত হাঁটি।"),
  ]),
  p(30, 3, "まで", "Ending point: until a place or until a time.", "পর্যন্ত — জায়গা বা সময়ের শেষ।", "Place / Time + まで", [
    ex("五時までいます。", "goji made imasu.", "I will stay until five.", "পাঁচটা পর্যন্ত থাকব।"),
    ex("ここから京都まで二時間です。", "koko kara Kyouto made nijikan desu.", "It is two hours from here to Kyoto.", "এখান থেকে কিয়োটো দুই ঘণ্টা।"),
  ]),
  p(31, 4, "と（and）", "And, for a complete list. Nothing is left out.", "এবং — পুরো তালিকা, কিছু বাদ নেই।", "A と B と C", [
    ex("りんごとバナナを買いました。", "ringo to banana o kaimashita.", "I bought apples and bananas.", "আপেল আর কলা কিনেছি।"),
    ex("母と父と行きます。", "haha to chichi to ikimasu.", "I will go with my mother and father.", "মা আর বাবার সাথে যাব।"),
  ]),
  p(32, 4, "や", "And, for an incomplete list: things like these.", "ইত্যাদি — তালিকা পুরো নয়।", "A や B", [
    ex("野菜や果物を食べます。", "yasai ya kudamono o tabemasu.", "I eat vegetables, fruit, and so on.", "সবজি, ফল ইত্যাদি খাই।"),
    ex("本やノートがあります。", "hon ya nooto ga arimasu.", "There are books, notebooks, and such.", "বই, খাতা ইত্যাদি আছে।"),
  ]),
  p(33, 4, "か（or）", "Or, between nouns.", "অথবা — noun-এর মাঝে।", "A か B", [
    ex("お茶かコーヒーを飲みます。", "ocha ka koohii o nomimasu.", "I'll drink tea or coffee.", "চা অথবা কফি খাব।"),
    ex("バスか電車で行きます。", "basu ka densha de ikimasu.", "I'll go by bus or train.", "বাস অথবা ট্রেনে যাব।"),
  ]),
  p(34, 4, "あります", "Exists, for things, plants, and events. Not for people or animals.", "আছে — জিনিস, গাছ, অনুষ্ঠান। মানুষ বা পশু নয়।", "Place に + Thing が + あります", [
    ex("あそこに銀行があります。", "asoko ni ginkou ga arimasu.", "There is a bank over there.", "ওইখানে একটা ব্যাংক আছে।"),
    ex("時間がありますか。", "jikan ga arimasu ka.", "Do you have time?", "সময় আছে?"),
  ]),
  p(35, 4, "います", "Exists, for people and animals.", "আছে — মানুষ ও প্রাণী।", "Place に + Person / Animal が + います", [
    ex("部屋に犬がいます。", "heya ni inu ga imasu.", "There is a dog in the room.", "ঘরে একটা কুকুর আছে।"),
    ex("田中さんはいますか。", "Tanaka-san wa imasu ka.", "Is Tanaka here?", "তানাকা আছেন?"),
  ]),
  p(36, 4, "がある + N", "A noun described by what it has: the one that has…", "যার কিছু আছে, সেই noun।", "Noun が ある + Noun", [
    ex("庭がある家に住みたいです。", "niwa ga aru ie ni sumitai desu.", "I want to live in a house that has a garden.", "যে বাড়িতে বাগান আছে, সেখানে থাকতে চাই।"),
    ex("子どもがいる人は手を挙げてください。", "kodomo ga iru hito wa te o agete kudasai.", "People who have children, please raise your hand.", "যাদের সন্তান আছে, হাত তুলুন।"),
  ], "People and animals use いる, not ある."),
  p(37, 4, "い-adjective（present/negative）", "Present い-adjectives, and the negative くない.", "い-adjective-এর বর্তমান হ্যাঁ ও না।", "〜い / 〜くないです", [
    ex("このスープは熱いです。", "kono suupu wa atsui desu.", "This soup is hot.", "এই স্যুপ গরম।"),
    ex("あまり高くないです。", "amari takakunai desu.", "It is not very expensive.", "খুব একটা দামি নয়।"),
  ]),
  p(38, 4, "い-adjective（past/negative past）", "Past い-adjectives: かった, and negative past くなかった.", "い-adjective-এর অতীত হ্যাঁ ও না।", "〜かったです / 〜くなかったです", [
    ex("昨日は寒かったです。", "kinou wa samukatta desu.", "Yesterday was cold.", "গতকাল ঠান্ডা ছিল।"),
    ex("試験は難しくなかったです。", "shiken wa muzukashikunakatta desu.", "The exam was not difficult.", "পরীক্ষা কঠিন ছিল না।"),
  ]),
  p(39, 4, "な-adjective（present/negative）", "Present な-adjectives with です, and the negative じゃありません.", "な-adjective-এর বর্তমান হ্যাঁ ও না।", "〜です / 〜じゃありません", [
    ex("この町は静かです。", "kono machi wa shizuka desu.", "This town is quiet.", "এই শহর শান্ত।"),
    ex("彼は有名じゃありません。", "kare wa yuumei ja arimasen.", "He is not famous.", "সে বিখ্যাত নয়।"),
  ]),
  p(40, 4, "な-adjective（past/negative past）", "Past な-adjectives: でした, and negative past じゃありませんでした.", "な-adjective-এর অতীত হ্যাঁ ও না।", "〜でした / 〜じゃありませんでした", [
    ex("子供の時、そこはきれいでした。", "kodomo no toki, soko wa kirei deshita.", "When I was a child, that place was pretty.", "ছোটবেলায় সেই জায়গা সুন্দর ছিল।"),
    ex("昨日は暇じゃありませんでした。", "kinou wa hima ja arimasen deshita.", "I was not free yesterday.", "গতকাল ফুরসত ছিল না।"),
  ]),
  p(41, 5, "い-adjective + N", "An い-adjective directly before the noun it describes.", "い-adjective সরাসরি noun-এর আগে বসে তাকে বর্ণনা করে।", "〜い + Noun", [
    ex("新しい電話が欲しいです。", "atarashii denwa ga hoshii desu.", "I want a new phone.", "নতুন ফোন চাই।"),
    ex("大きい犬ですね。", "ookii inu desu ne.", "That's a big dog, isn't it?", "বড় কুকুর, তাই না?"),
  ]),
  p(42, 5, "な-adjective + N", "A な-adjective takes な before the noun it describes.", "な-adjective noun-এর আগে な নেয়।", "〜な + Noun", [
    ex("静かな部屋を探しています。", "shizuka na heya o sagashite imasu.", "I am looking for a quiet room.", "শান্ত ঘর খুঁজছি।"),
    ex("便利なアプリです。", "benri na apuri desu.", "It is a convenient app.", "এটা সুবিধাজনক অ্যাপ।"),
  ]),
  p(43, 5, "Adjective + て／Noun + で", "Joins qualities. い-adjectives use くて. Nouns and な-adjectives use で.", "গুণ জোড়া লাগানো। い হলে くて, noun বা な হলে で।", "〜くて / 〜で", [
    ex("この料理は安くておいしいです。", "kono ryouri wa yasukute oishii desu.", "This dish is cheap and tasty.", "এই খাবার সস্তা আর সুস্বাদু।"),
    ex("姉は看護師で、二十五歳です。", "ane wa kangoshi de, nijuugosai desu.", "My older sister is a nurse, and she is twenty-five.", "আমার বোন নার্স, আর তার বয়স পঁচিশ।"),
  ]),
  p(44, 5, "とても", "Very. Used with a positive adjective or verb.", "খুব — ইতিবাচক বিশেষণ বা ক্রিয়ার সাথে।", "とても + Adjective / Verb", [
    ex("この映画はとてもおもしろいです。", "kono eiga wa totemo omoshiroi desu.", "This film is very interesting.", "এই সিনেমা খুব মজার।"),
    ex("とても疲れました。", "totemo tsukaremashita.", "I am very tired.", "খুব ক্লান্ত।"),
  ]),
  p(45, 5, "あまり～ない", "Not very. あまり only pairs with a negative.", "খুব একটা … না। あまり negative-এর সাথে।", "あまり + negative", [
    ex("あまり野菜を食べません。", "amari yasai o tabemasen.", "I don't eat many vegetables.", "খুব একটা সবজি খাই না।"),
    ex("この問題はあまり難しくないです。", "kono mondai wa amari muzukashikunai desu.", "This problem is not very hard.", "এই সমস্যা খুব একটা কঠিন নয়।"),
  ]),
  p(46, 5, "すぎる", "Too much. The verb or adjective stem plus すぎる.", "অতিরিক্ত। ক্রিয়া বা বিশেষণের stem-এর পর すぎる।", "Verb stem / Adj stem + すぎる", [
    ex("この靴は小さすぎます。", "kono kutsu wa chiisasugimasu.", "These shoes are too small.", "এই জুতা খুব ছোট।"),
    ex("昨日食べすぎました。", "kinou tabesugimashita.", "I ate too much yesterday.", "গতকাল বেশি খেয়ে ফেলেছি।"),
  ], "い-adjectives drop い: 高い → 高すぎる. な-adjectives drop な: 静かすぎる."),
  p(47, 5, "どう", "How, or in what way. Asks about a state or a method.", "কেমন, বা কীভাবে।", "どう", [
    ex("調子はどうですか。", "choushi wa dou desu ka.", "How are you feeling?", "শরীর কেমন?"),
    ex("駅までどう行きますか。", "eki made dou ikimasu ka.", "How do I get to the station?", "স্টেশন পর্যন্ত কীভাবে যাব?"),
  ]),
  p(48, 5, "どんな", "What kind of, before a noun.", "কী ধরনের — noun-এর আগে।", "どんな + Noun", [
    ex("どんな音楽が好きですか。", "donna ongaku ga suki desu ka.", "What kind of music do you like?", "কী ধরনের গান পছন্দ?"),
    ex("どんな人ですか。", "donna hito desu ka.", "What kind of person are they?", "কেমন মানুষ?"),
  ]),
  p(49, 5, "好き／嫌い", "Like and dislike. The thing liked takes が, not を.", "পছন্দ ও অপছন্দ। যা পছন্দ, তার আগে が, を নয়।", "Noun + が + 好き / 嫌い + です", [
    ex("猫が好きです。", "neko ga suki desu.", "I like cats.", "আমি বিড়াল পছন্দ করি।"),
    ex("辛い食べ物が嫌いです。", "karai tabemono ga kirai desu.", "I dislike spicy food.", "ঝাল খাবার অপছন্দ।"),
  ]),
  p(50, 5, "上手／下手", "Good at, and poor at. The skill takes が.", "দক্ষ ও অদক্ষ। দক্ষতার বিষয়ের আগে が।", "Noun + が + 上手 / 下手 + です", [
    ex("妹は料理が上手です。", "imouto wa ryouri ga jouzu desu.", "My younger sister is good at cooking.", "আমার বোন রান্নায় দক্ষ।"),
    ex("わたしは歌が下手です。", "watashi wa uta ga heta desu.", "I am bad at singing.", "আমি গানে খারাপ।"),
  ]),
  p(51, 6, "ました／ませんでした", "Polite past, and polite negative past, of a verb.", "ক্রিয়ার polite অতীত, হ্যাঁ ও না।", "Verb stem + ました / ませんでした", [
    ex("昨日映画を見ました。", "kinou eiga o mimashita.", "I watched a film yesterday.", "গতকাল সিনেমা দেখেছি।"),
    ex("朝ごはんを食べませんでした。", "asagohan o tabemasen deshita.", "I did not eat breakfast.", "সকালের নাস্তা খাইনি।"),
  ]),
  p(52, 6, "Dictionary form", "The plain non-past form you find in a dictionary. Also the casual present and future.", "অভিধানের রূপ — plain বর্তমান ও ভবিষ্যৎ।", "食べる / 飲む / 行く", [
    ex("明日何する？", "ashita nani suru?", "What are you doing tomorrow?", "আগামীকাল কী করবি?"),
    ex("本を読む人が多いです。", "hon o yomu hito ga ooi desu.", "There are many people who read books.", "বই পড়ে এমন মানুষ অনেক।"),
  ]),
  p(53, 6, "ない-form", "The plain negative. Group 1: change the last u-sound to a, then ない. Group 2: drop る, add ない.", "plain negative। Group 1-এ শেষ স্বর a হয়ে ない। Group 2-এ る বাদ দিয়ে ない।", "飲まない / 食べない", [
    ex("今日はどこへも行かない。", "kyou wa doko e mo ikanai.", "I'm not going anywhere today.", "আজ কোথাও যাব না।"),
    ex("肉を食べない人です。", "niku o tabenai hito desu.", "They are a person who doesn't eat meat.", "মাংস খায় না এমন মানুষ।"),
  ], "する → しない. 来る → 来ない (こない)."),
  p(54, 6, "た-form", "The plain past. Built from the same stem changes as the て-form, with た instead of て.", "plain অতীত। て-form-এর মতোই, শেষে た।", "行った / 食べた / した", [
    ex("もう宿題をした。", "mou shukudai o shita.", "I already did the homework.", "হোমওয়ার্ক করে ফেলেছি।"),
    ex("昨日友達に会った。", "kinou tomodachi ni atta.", "I met a friend yesterday.", "গতকাল বন্ধুর সাথে দেখা হয়েছে।"),
  ]),
  p(55, 6, "なかった-form", "The plain negative past. ない-form with ない changed to なかった.", "plain negative অতীত। ない হয় なかった।", "行かなかった / 食べなかった", [
    ex("パーティーに行かなかった。", "paatii ni ikanakatta.", "I didn't go to the party.", "পার্টিতে যাইনি।"),
    ex("何も食べなかった。", "nani mo tabenakatta.", "I didn't eat anything.", "কিছু খাইনি।"),
  ]),
  p(56, 6, "て-form", "The て-form links verbs, makes requests, and builds ている. Same sound changes as た.", "て-form — ক্রিয়া জোড়া, অনুরোধ, আর ている।", "行って / 食べて / 飲んで", [
    ex("手を洗って、食べましょう。", "te o aratte, tabemashou.", "Let's wash our hands and eat.", "হাত ধুয়ে খাই।"),
    ex("窓を閉めてください。", "mado o shimete kudasai.", "Please close the window.", "জানালা বন্ধ করুন।"),
  ], "う・つ・る → って. む・ぶ・ぬ → んで. く → いて. ぐ → いで. す → して."),
  p(57, 6, "する", "Irregular verb: to do. Also turns a noun into a verb, as in 勉強する.", "অনিয়মিত ক্রিয়া: করা। noun-এর সাথেও, যেমন 勉強する।", "します / して / した / しない", [
    ex("毎晩日本語を勉強します。", "maiban nihongo o benkyou shimasu.", "I study Japanese every night.", "প্রতি রাতে জাপানি পড়ি।"),
    ex("昨日買い物をしました。", "kinou kaimono o shimashita.", "I went shopping yesterday.", "গতকাল কেনাকাটা করেছি।"),
  ]),
  p(58, 6, "来る", "Irregular verb: to come. The stem changes: き, く, こ.", "অনিয়মিত ক্রিয়া: আসা। রূপ বদলায় — き, く, こ।", "来ます / 来て / 来た / 来ない", [
    ex("友達がうちに来ます。", "tomodachi ga uchi ni kimasu.", "A friend is coming to my place.", "এক বন্ধু আমার বাড়িতে আসবে।"),
    ex("昨日来なかった。", "kinou konakatta.", "They didn't come yesterday.", "গতকাল আসেনি।"),
  ]),
  p(59, 6, "Verb (plain) + N", "A plain verb before a noun describes that noun, like a relative clause.", "plain ক্রিয়া noun-এর আগে বসে তাকে বর্ণনা করে।", "Plain verb + Noun", [
    ex("あそこにある店は安いです。", "asoko ni aru mise wa yasui desu.", "The shop over there is cheap.", "ওইখানের দোকান সস্তা।"),
    ex("日本語を話す人が少ないです。", "nihongo o hanasu hito ga sukunai desu.", "There are few people who speak Japanese.", "জাপানি বলে এমন মানুষ কম।"),
  ]),
  p(60, 6, "～て（sequence）", "Do one action, and then another. The て-form joins them in order.", "এক কাজ, তারপর আরেক কাজ। て-form ক্রম জোড়ে।", "Verb て、Verb", [
    ex("朝ごはんを食べて、学校へ行きます。", "asagohan o tabete, gakkou e ikimasu.", "I eat breakfast and then go to school.", "সকালের নাস্তা খেয়ে স্কুলে যাই।"),
    ex("シャワーを浴びて、寝ました。", "shawaa o abite, nemashita.", "I took a shower and went to bed.", "গোসল করে ঘুমিয়েছি।"),
  ]),
];

