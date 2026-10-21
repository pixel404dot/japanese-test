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

export const GRAMMAR_POINTS_REST: GrammarPoint[] = [
  p(61, 7, "～ている①", "An action in progress right now.", "কাজ এখন চলছে।", "Verb て + います", [
    ex("今、雨が降っています。", "ima, ame ga futte imasu.", "It is raining now.", "এখন বৃষ্টি হচ্ছে।"),
    ex("父は電話をしています。", "chichi wa denwa o shite imasu.", "My father is on the phone.", "বাবা ফোনে কথা বলছেন।"),
  ]),
  p(62, 7, "～ている②", "A state that is the result of a change. The action is finished; the result remains.", "কাজ শেষ, কিন্তু তার ফল এখনও আছে।", "Verb て + います", [
    ex("窓が開いています。", "mado ga aite imasu.", "The window is open.", "জানালা খোলা আছে।"),
    ex("姉は結婚しています。", "ane wa kekkon shite imasu.", "My older sister is married.", "আমার বোন বিবাহিত।"),
  ]),
  p(63, 7, "～ている③", "A repeated or habitual action.", "বারবার বা অভ্যাসের কাজ।", "Verb て + います", [
    ex("毎日走っています。", "mainichi hashitte imasu.", "I run every day.", "প্রতিদিন দৌড়াই।"),
    ex("この店でよく買っています。", "kono mise de yoku katte imasu.", "I often shop at this store.", "এই দোকান থেকে প্রায়ই কিনি।"),
  ]),
  p(64, 7, "～てから", "After finishing one action, then the next.", "এক কাজ শেষ হওয়ার পর।", "Verb て + から", [
    ex("宿題をしてから、遊んでもいいです。", "shukudai o shite kara, asonde mo ii desu.", "You may play after you finish the homework.", "হোমওয়ার্ক শেষ করে খেলতে পারো।"),
    ex("手を洗ってから食べます。", "te o aratte kara tabemasu.", "I eat after washing my hands.", "হাত ধুয়ে তারপর খাই।"),
  ]),
  p(65, 7, "前に", "Before. The verb before 前 stays in the plain non-past, even about the past.", "আগে। 前-এর আগের ক্রিয়া plain non-past থাকে।", "Plain verb / Noun の + 前に", [
    ex("寝る前に歯を磨きます。", "neru mae ni ha o migakimasu.", "I brush my teeth before sleeping.", "ঘুমানোর আগে দাঁত মাজি।"),
    ex("食事の前に手を洗ってください。", "shokuji no mae ni te o aratte kudasai.", "Please wash your hands before the meal.", "খাবারের আগে হাত ধুয়ে নিন।"),
  ]),
  p(66, 7, "後で", "After. A verb before 後 is in the た-form. A noun takes の.", "পরে। ক্রিয়া হলে た-form, noun হলে の।", "Verb た / Noun の + 後で", [
    ex("食べた後で薬を飲みます。", "tabeta ato de kusuri o nomimasu.", "I take the medicine after eating.", "খাওয়ার পর ওষুধ খাই।"),
    ex("授業の後で会いましょう。", "jugyou no ato de aimashou.", "Let's meet after class.", "ক্লাসের পর দেখা করি।"),
  ]),
  p(67, 7, "とき", "When. A plain verb or adjective before とき sets the time.", "যখন। とき-এর আগে plain ক্রিয়া বা বিশেষণ।", "Plain clause + とき", [
    ex("子供のとき、よく泳ぎました。", "kodomo no toki, yoku oyogimashita.", "I often swam when I was a child.", "ছোটবেলায় প্রায়ই সাঁতার কাটতাম।"),
    ex("暇なとき、本を読みます。", "hima na toki, hon o yomimasu.", "I read when I am free.", "ফুরসত থাকলে বই পড়ি।"),
  ], "な-adjectives and nouns take な or の before とき."),
  p(68, 7, "ごろ", "Around a point in time.", "সময়ের কাছাকাছি — ঠিক সেই মুহূর্ত নয়।", "Time + ごろ", [
    ex("三時ごろ着きます。", "sanji goro tsukimasu.", "I'll arrive around three.", "তিনটের দিকে পৌঁছাব।"),
    ex("夜ごろ電話します。", "yoru goro denwa shimasu.", "I'll call around evening.", "সন্ধ্যার দিকে ফোন করব।"),
  ]),
  p(69, 7, "くらい／ぐらい", "About, for an approximate amount or length.", "প্রায় — পরিমাণ বা দৈর্ঘ্যের আন্দাজ।", "Amount + くらい / ぐらい", [
    ex("駅まで十分ぐらいです。", "eki made juppun gurai desu.", "It is about ten minutes to the station.", "স্টেশন পর্যন্ত দশ মিনিটের মতো।"),
    ex("一万円くらい持っています。", "ichiman-en kurai motte imasu.", "I have about ten thousand yen.", "দশ হাজার ইয়েনের মতো আছে।"),
  ]),
  p(70, 7, "もう", "Already, with a positive. With a negative it means not anymore.", "ইতিমধ্যে। negative-এর সাথে: আর না।", "もう + Verb", [
    ex("もう昼ごはんを食べました。", "mou hirugohan o tabemashita.", "I already ate lunch.", "দুপুরের খাবার খেয়ে ফেলেছি।"),
    ex("もう待ちません。", "mou machimasen.", "I won't wait any longer.", "আর অপেক্ষা করব না।"),
  ]),
  p(71, 8, "まだ", "Still, with a positive. Not yet, with a negative.", "এখনও। হ্যাঁ-বাক্যে এখনও আছে, না-বাক্যে এখনও হয়নি।", "まだ + phrase", [
    ex("まだ学生です。", "mada gakusei desu.", "I am still a student.", "এখনও ছাত্র।"),
    ex("まだわかりません。", "mada wakarimasen.", "I don't understand yet.", "এখনও বুঝিনি।"),
  ]),
  p(72, 8, "まだ～ていません", "Have not done it yet.", "এখনও করা হয়নি।", "まだ + Verb て + いません", [
    ex("まだ宿題をしていません。", "mada shukudai o shite imasen.", "I haven't done the homework yet.", "এখনও হোমওয়ার্ক করিনি।"),
    ex("田中さんはまだ来ていません。", "Tanaka-san wa mada kite imasen.", "Tanaka has not come yet.", "তানাকা এখনও আসেননি।"),
  ]),
  p(73, 8, "～たい", "Want to do. The ます-stem plus たい, which conjugates like an い-adjective.", "কোনো কাজ করতে চাই। ます-এর stem-এর পর たい।", "Verb stem + たいです", [
    ex("日本へ行きたいです。", "Nihon e ikitai desu.", "I want to go to Japan.", "জাপানে যেতে চাই।"),
    ex("何か冷たいものが飲みたいです。", "nanika tsumetai mono ga nomitai desu.", "I want to drink something cold.", "কোনো ঠান্ডা কিছু খেতে চাই।"),
  ], "たい is for your own wants. For someone else, use たがっています."),
  p(74, 8, "～たくない", "Don't want to do. The negative of たい.", "কাজটি করতে চাই না।", "Verb stem + たくないです", [
    ex("今日は出かけたくないです。", "kyou wa dekaketakunai desu.", "I don't want to go out today.", "আজ বেরোতে চাই না।"),
    ex("あの映画は見たくなかったです。", "ano eiga wa mitakunakatta desu.", "I didn't want to see that film.", "ওই সিনেমা দেখতে চাইনি।"),
  ]),
  p(75, 8, "ほしい", "Want a thing. The thing takes が.", "কোনো জিনিস চাই। জিনিসের আগে が।", "Noun + が + ほしいです", [
    ex("新しいかばんが欲しいです。", "atarashii kaban ga hoshii desu.", "I want a new bag.", "নতুন ব্যাগ চাই।"),
    ex("今は何も欲しくないです。", "ima wa nani mo hoshikunai desu.", "I don't want anything right now.", "এখন কিছু চাই না।"),
  ]),
  p(76, 8, "～ましょう", "Let's. A suggestion that includes the speaker.", "চলুন করি — বক্তাও এর মধ্যে।", "Verb stem + ましょう", [
    ex("一緒に行きましょう。", "issho ni ikimashou.", "Let's go together.", "একসাথে যাই।"),
    ex("少し休みましょう。", "sukoshi yasumimashou.", "Let's rest a little.", "একটু বিশ্রাম নিই।"),
  ]),
  p(77, 8, "～ませんか", "Won't you? An invitation that is easy to decline.", "করবেন না কি — নরম আমন্ত্রণ।", "Verb stem + ませんか", [
    ex("コーヒーを飲みませんか。", "koohii o nomimasen ka.", "Would you like to have coffee?", "কফি খাবেন না?"),
    ex("週末、映画を見ませんか。", "shuumatsu, eiga o mimasen ka.", "Shall we see a film this weekend?", "সপ্তাহান্তে সিনেমা দেখবেন না?"),
  ]),
  p(78, 8, "～ましょうか", "Shall I? An offer to do something for the other person.", "করে দেব? — সাহায্য বা প্রস্তাব।", "Verb stem + ましょうか", [
    ex("荷物を持ちましょうか。", "nimotsu o mochimashou ka.", "Shall I carry your bag?", "ব্যাগটা ধরে দেব?"),
    ex("窓を開けましょうか。", "mado o akemashou ka.", "Shall I open the window?", "জানালা খুলে দেব?"),
  ]),
  p(79, 8, "～に行く／来る／帰る", "Go, come, or return in order to do something.", "কোনো কাজের জন্য যাওয়া, আসা, বা ফেরা।", "Verb stem + に + 行く / 来る / 帰る", [
    ex("映画を見に行きます。", "eiga o mi ni ikimasu.", "I'm going to see a film.", "সিনেমা দেখতে যাচ্ছি।"),
    ex("友達が遊びに来ました。", "tomodachi ga asobi ni kimashita.", "A friend came to hang out.", "এক বন্ধু আড্ডা দিতে এসেছিল।"),
  ]),
  p(80, 8, "～てください", "Please do. A polite request.", "অনুগ্রহ করে করুন।", "Verb て + ください", [
    ex("ここに名前を書いてください。", "koko ni namae o kaite kudasai.", "Please write your name here.", "এখানে নাম লিখুন।"),
    ex("少し待ってください。", "sukoshi matte kudasai.", "Please wait a moment.", "একটু অপেক্ষা করুন।"),
  ]),
  p(81, 9, "～ないでください", "Please don't.", "অনুগ্রহ করে করবেন না।", "ない-form, drop い, + でください", [
    ex("ここで写真を撮らないでください。", "koko de shashin o toranaide kudasai.", "Please don't take photos here.", "এখানে ছবি তুলবেন না।"),
    ex("遅れないでください。", "okurenaide kudasai.", "Please don't be late.", "দেরি করবেন না।"),
  ]),
  p(82, 9, "～てもいい", "It is all right to. Also how you ask permission.", "করলে চলে। অনুমতি চাইতেও।", "Verb て + もいいです", [
    ex("入ってもいいですか。", "haitte mo ii desu ka.", "May I come in?", "ঢুকতে পারি?"),
    ex("写真を撮ってもいいですよ。", "shashin o totte mo ii desu yo.", "You may take photos.", "ছবি তুলতে পারেন।"),
  ]),
  p(83, 9, "～てはいけない", "Must not.", "করা যাবে না।", "Verb て + はいけません", [
    ex("ここでタバコを吸ってはいけません。", "koko de tabako o sutte wa ikemasen.", "You must not smoke here.", "এখানে সিগারেট খাওয়া যাবে না।"),
    ex("図書館で話してはいけません。", "toshokan de hanashite wa ikemasen.", "You must not talk in the library.", "লাইব্রেরিতে কথা বলা যাবে না।"),
  ]),
  p(84, 9, "～ちゃいけない／じゃいけない", "The casual contraction of てはいけない.", "করা যাবে না — কথ্য সংক্ষিপ্ত রূপ।", "〜ちゃ / 〜じゃ + いけない", [
    ex("まだ入っちゃいけない。", "mada haiccha ikenai.", "You can't go in yet.", "এখনও ঢোকা যাবে না।"),
    ex("こんなことをしちゃいけません。", "konna koto o shicha ikemasen.", "You mustn't do this sort of thing.", "এমন কাজ করা যাবে না।"),
  ], "て becomes ちゃ: 食べちゃ. で becomes じゃ: 飲んじゃ."),
  p(85, 9, "な（prohibitive）", "A blunt don't. Dictionary form plus な. Rude unless the situation is urgent.", "কঠোর নিষেধ। dictionary form-এর পর な।", "Dictionary form + な", [
    ex("入るな。", "hairu na.", "Don't enter.", "ঢুকবে না।"),
    ex("触るな。", "sawaru na.", "Don't touch.", "ধরবে না।"),
  ]),
  p(86, 9, "～なくてもいい", "You don't have to.", "না করলেও চলে।", "ない-form, drop い, + くてもいいです", [
    ex("今日は来なくてもいいです。", "kyou wa konakute mo ii desu.", "You don't have to come today.", "আজ না এলেও চলবে।"),
    ex("靴を脱がなくてもいいですか。", "kutsu o nuganakute mo ii desu ka.", "Is it all right if I don't take my shoes off?", "জুতা না খুললে চলবে?"),
  ]),
  p(87, 9, "～なくてはいけない", "Must. You have to.", "করতেই হবে।", "ない-form, drop い, + くてはいけません", [
    ex("薬を飲まなくてはいけません。", "kusuri o nomanakute wa ikemasen.", "You have to take the medicine.", "ওষুধ খেতেই হবে।"),
    ex("明日早く起きなくてはいけない。", "ashita hayaku okinakute wa ikenai.", "I have to get up early tomorrow.", "আগামীকাল সকালে উঠতেই হবে।"),
  ]),
  p(88, 9, "～なくてはならない", "Must, a little more formal than なくてはいけない.", "করতেই হবে — একটু formal।", "ない-form, drop い, + くてはなりません", [
    ex("レポートを出さなくてはなりません。", "repooto o dasanakute wa narimasen.", "I have to submit the report.", "রিপোর্ট জমা দিতেই হবে।"),
    ex("約束を守らなくてはならない。", "yakusoku o mamoranakute wa naranai.", "You must keep your promise.", "প্রতিশ্রুতি রাখতেই হবে।"),
  ]),
  p(89, 9, "～なくちゃ／～なきゃ", "Casual must. Short for なくては and なければ.", "করতেই হবে — কথ্য সংক্ষেপ।", "〜なくちゃ / 〜なきゃ", [
    ex("もう行かなくちゃ。", "mou ikanakucha.", "I have to go now.", "এখন যেতেই হবে।"),
    ex("勉強しなきゃ。", "benkyou shinakya.", "I gotta study.", "পড়তেই হবে।"),
  ]),
  p(90, 9, "～た方がいい", "Had better. Advice to do something.", "করলে ভালো।", "Verb た + 方がいいです", [
    ex("早く寝た方がいいですよ。", "hayaku neta hou ga ii desu yo.", "You had better sleep early.", "তাড়াতাড়ি ঘুমালে ভালো।"),
    ex("医者に行った方がいい。", "isha ni itta hou ga ii.", "You should see a doctor.", "ডাক্তারের কাছে গেলে ভালো।"),
  ]),
  p(91, 10, "～ない方がいい", "Had better not.", "না করাই ভালো।", "ない-form + 方がいいです", [
    ex("夜遅く電話しない方がいいです。", "yoru osoku denwa shinai hou ga ii desu.", "You had better not call late at night.", "রাতে দেরিতে ফোন না করাই ভালো।"),
    ex("一人で行かない方がいい。", "hitori de ikanai hou ga ii.", "You shouldn't go alone.", "একা না যাওয়াই ভালো।"),
  ]),
  p(92, 10, "～たことがある", "Have done it before. Experience.", "আগে কখনও করার অভিজ্ঞতা আছে।", "Verb た + ことがあります", [
    ex("富士山に登ったことがあります。", "Fujisan ni nobotta koto ga arimasu.", "I have climbed Mt. Fuji.", "ফুজি পর্বতে উঠেছি।"),
    ex("すしを食べたことがありません。", "sushi o tabeta koto ga arimasen.", "I have never eaten sushi.", "সুশি কখনও খাইনি।"),
  ]),
  p(93, 10, "～たり～たりする", "Do things like A and B. A sample, not a complete list.", "এটা-ওটা করা — কাজের উদাহরণ, পুরো তালিকা নয়।", "Verb たり、Verb たり + します", [
    ex("週末は映画を見たり、本を読んだりします。", "shuumatsu wa eiga o mitari, hon o yondari shimasu.", "On weekends I do things like watch films and read.", "সপ্তাহান্তে সিনেমা দেখা, বই পড়া — এমন করি।"),
    ex("泣いたり笑ったりしました。", "naitari warattari shimashita.", "I cried and I laughed.", "কেঁদেছি, হেসেছি।"),
  ]),
  p(94, 10, "のが好き", "Like doing. の turns the verb into a noun.", "কোনো কাজ করতে পছন্দ।", "Plain verb + のが好きです", [
    ex("歌を歌うのが好きです。", "uta o utau no ga suki desu.", "I like singing.", "গান গাইতে পছন্দ করি।"),
    ex("料理を作るのが好きじゃありません。", "ryouri o tsukuru no ga suki ja arimasen.", "I don't like cooking.", "রান্না করতে পছন্দ করি না।"),
  ]),
  p(95, 10, "のが嫌い", "Dislike doing.", "কোনো কাজ করতে অপছন্দ।", "Plain verb + のが嫌いです", [
    ex("早起きするのが嫌いです。", "hayaoki suru no ga kirai desu.", "I hate getting up early.", "সকালে উঠতে অপছন্দ।"),
    ex("待つのが嫌いです。", "matsu no ga kirai desu.", "I dislike waiting.", "অপেক্ষা করতে অপছন্দ।"),
  ]),
  p(96, 10, "のが上手", "Good at doing.", "কোনো কাজে ভালো।", "Plain verb + のが上手です", [
    ex("絵をかくのが上手です。", "e o kaku no ga jouzu desu.", "They are good at drawing.", "ছবি আঁকতে ওস্তাদ।"),
    ex("説明するのが上手ですね。", "setsumei suru no ga jouzu desu ne.", "You're good at explaining.", "বোঝাতে আপনি দক্ষ, তাই না?"),
  ]),
  p(97, 10, "のが下手", "Poor at doing.", "কোনো কাজে দুর্বল।", "Plain verb + のが下手です", [
    ex("料理を作るのが下手です。", "ryouri o tsukuru no ga heta desu.", "I am bad at cooking.", "রান্নায় আমি দুর্বল।"),
    ex("人前で話すのが下手です。", "hitomae de hanasu no ga heta desu.", "I am bad at speaking in front of people.", "লোকের সামনে বলতে পারি না।"),
  ]),
  p(98, 10, "のは／のが（nominalization）", "の turns a verb phrase into a noun. は marks the topic. が marks the subject.", "ক্রিয়াকে noun-এর মতো ব্যবহার। は বিষয়, が কর্তা।", "Plain verb + のは / のが", [
    ex("泳ぐのは楽しいです。", "oyogu no wa tanoshii desu.", "Swimming is fun.", "সাঁতার কাটা মজার।"),
    ex("日本語を話すのが難しいです。", "nihongo o hanasu no ga muzukashii desu.", "Speaking Japanese is difficult.", "জাপানি বলা কঠিন।"),
  ]),
  p(99, 10, "Adjective + の", "の stands for a noun you both already know: the big one.", "বিশেষণ + の মানে সেই জিনিসটা — বড়টা, শান্তটা।", "い-adj / な-adj + な + の", [
    ex("大きいのをください。", "ookii no o kudasai.", "The big one, please.", "বড়টা দেবেন।"),
    ex("静かなのがいいです。", "shizuka na no ga ii desu.", "A quiet one would be good.", "শান্তটা ভালো।"),
  ]),
  p(100, 10, "あげる", "I give to someone else, or one person gives to another.", "বক্তা অন্যকে দেয়। অন্য কেউ অন্য কাউকে দিলেও।", "Giver は Receiver に Thing を あげます", [
    ex("友達に花をあげました。", "tomodachi ni hana o agemashita.", "I gave my friend flowers.", "বন্ধুকে ফুল দিয়েছি।"),
    ex("母は弟にお菓子をあげます。", "haha wa otouto ni okashi o agemasu.", "My mother gives my brother sweets.", "মা ছোট ভাইকে মিষ্টি দেয়।"),
  ]),
  p(101, 11, "くれる", "Someone gives to me, or to my side.", "কেউ আমাকে, বা আমার দিকের কাউকে দেয়।", "Giver が わたしに Thing を くれます", [
    ex("友達がわたしに本をくれました。", "tomodachi ga watashi ni hon o kuremashita.", "A friend gave me a book.", "এক বন্ধু আমাকে বই দিয়েছে।"),
    ex("先生が地図をくれました。", "sensei ga chizu o kuremashita.", "The teacher gave me a map.", "শিক্ষক আমাকে ম্যাপ দিয়েছেন।"),
  ]),
  p(102, 11, "もらう", "I receive. The giver takes に or から.", "বক্তা গ্রহণ করে। দাতার আগে に বা から।", "Receiver は Giver に Thing を もらいます", [
    ex("わたしは友達に写真をもらいました。", "watashi wa tomodachi ni shashin o moraimashita.", "I got a photo from my friend.", "বন্ধুর কাছ থেকে একটা ছবি পেয়েছি।"),
    ex("先生からアドバイスをもらいました。", "sensei kara adobaisu o moraimashita.", "I got advice from my teacher.", "শিক্ষকের কাছ থেকে পরামর্শ পেয়েছি।"),
  ]),
  p(103, 11, "～より～の方が", "B is more … than A.", "A-এর চেয়ে B বেশি।", "A より B の方が + Adjective", [
    ex("バスより電車の方が速いです。", "basu yori densha no hou ga hayai desu.", "The train is faster than the bus.", "বাসের চেয়ে ট্রেন দ্রুত।"),
    ex("犬より猫の方が好きです。", "inu yori neko no hou ga suki desu.", "I like cats more than dogs.", "কুকুরের চেয়ে বিড়াল বেশি পছন্দ।"),
  ]),
  p(104, 11, "～の中で～が一番", "The most, inside a group.", "একটা দলের মধ্যে সবচেয়ে।", "Group の中で + Noun が + 一番", [
    ex("クラスの中で田中さんが一番背が高いです。", "kurasu no naka de Tanaka-san ga ichiban se ga takai desu.", "Tanaka is the tallest in the class.", "ক্লাসে তানাকা সবচেয়ে লম্বা।"),
    ex("果物の中でりんごが一番好きです。", "kudamono no naka de ringo ga ichiban suki desu.", "Among fruit, I like apples best.", "ফলের মধ্যে আপেল সবচেয়ে পছন্দ।"),
  ]),
  p(105, 11, "一番", "The most, without naming the group.", "সবচেয়ে।", "一番 + Adjective", [
    ex("この店が一番安いです。", "kono mise ga ichiban yasui desu.", "This shop is the cheapest.", "এই দোকান সবচেয়ে সস্তা।"),
    ex("夏が一番好きです。", "natsu ga ichiban suki desu.", "I like summer the most.", "গ্রীষ্মকাল সবচেয়ে পছন্দ।"),
  ]),
  p(106, 11, "もっと", "More than now, or more than the other one.", "আরও বেশি।", "もっと + Adjective / Verb", [
    ex("もっとゆっくり話してください。", "motto yukkuri hanashite kudasai.", "Please speak more slowly.", "আর একটু আস্তে বলুন।"),
    ex("もっと安いのはありますか。", "motto yasui no wa arimasu ka.", "Do you have a cheaper one?", "আরও সস্তা আছে?"),
  ]),
  p(107, 11, "だけ", "Only.", "শুধু, মাত্র।", "Noun + だけ", [
    ex("水だけください。", "mizu dake kudasai.", "Just water, please.", "শুধু পানি দেবেন।"),
    ex("今日だけ休みます。", "kyou dake yasumimasu.", "I'll take only today off.", "শুধু আজ ছুটি নেব।"),
  ]),
  p(108, 11, "でしょう／だろう", "Probably. Also a soft right? でしょう is polite. だろう is plain.", "সম্ভবত। でしょう polite, だろう plain।", "Sentence + でしょう / だろう", [
    ex("明日は雨でしょう。", "ashita wa ame deshou.", "It will probably rain tomorrow.", "আগামীকাল বৃষ্টি হতে পারে।"),
    ex("あれは田中さんだろう。", "are wa Tanaka-san darou.", "That's probably Tanaka.", "ওটা বোধহয় তানাকা।"),
  ]),
  p(109, 11, "から（reason）", "Because. The reason comes first. More direct than ので.", "কারণ। কারণ আগে, ফল পরে।", "Reason + から", [
    ex("忙しいから、行けません。", "isogashii kara, ikemasen.", "I can't go, because I'm busy.", "ব্যস্ত বলে যেতে পারছি না।"),
    ex("明日テストだから、今日は勉強します。", "ashita tesuto da kara, kyou wa benkyou shimasu.", "There's a test tomorrow, so I'll study today.", "আগামীকাল পরীক্ষা, তাই আজ পড়ব।"),
  ], "Nouns and な-adjectives take だ or です before から."),
  p(110, 11, "ので", "Because, softer than から. Common for excuses.", "কারণ — から-এর চেয়ে নরম।", "Reason + ので", [
    ex("雨が降っているので、家にいます。", "ame ga futte iru node, ie ni imasu.", "It's raining, so I'm staying home.", "বৃষ্টি হচ্ছে, তাই বাড়িতে আছি।"),
    ex("初めてなので、わかりません。", "hajimete na node, wakarimasen.", "It's my first time, so I don't know.", "প্রথমবার, তাই জানি না।"),
  ], "Nouns and な-adjectives take な before ので."),
  p(111, 12, "が（but）", "But, between two clauses. Polite and a little soft.", "কিন্তু — দুটি বাক্যাংশ জোড়ে।", "Clause + が、clause", [
    ex("わかりますが、できません。", "wakarimasu ga, dekimasen.", "I understand, but I can't.", "বুঝি, কিন্তু করতে পারি না।"),
    ex("この店は高いですが、おいしいです。", "kono mise wa takai desu ga, oishii desu.", "This place is expensive, but the food is good.", "এই দোকান দামি, কিন্তু সুস্বাদু।"),
  ]),
  p(112, 12, "けど", "But, in conversation.", "কিন্তু — কথ্য।", "Clause + けど", [
    ex("行きたいけど、時間がありません。", "ikitai kedo, jikan ga arimasen.", "I want to go, but I have no time.", "যেতে চাই, কিন্তু সময় নেই।"),
    ex("ちょっと高いけど、買います。", "chotto takai kedo, kaimasu.", "It's a bit expensive, but I'll buy it.", "একটু দামি, তবু কিনব।"),
  ]),
  p(113, 12, "けれども", "But, more formal than けど.", "কিন্তু — けど-এর formal রূপ।", "Clause + けれども", [
    ex("すみませんけれども、もう一度言ってください。", "sumimasen keredomo, mou ichido itte kudasai.", "I'm sorry, but please say it once more.", "দুঃখিত, আরেকবার বলবেন।"),
    ex("読みましたけれども、忘れました。", "yomimashita keredomo, wasuremashita.", "I read it, but I forgot.", "পড়েছিলাম, কিন্তু ভুলে গেছি।"),
  ]),
  p(114, 12, "でも", "But, at the start of the next sentence.", "কিন্তু — নতুন বাক্যের শুরুতে।", "でも、sentence", [
    ex("疲れました。でも、まだ終わりません。", "tsukaremashita. demo, mada owarimasen.", "I'm tired. But it isn't finished.", "ক্লান্ত। তবু এখনও শেষ হয়নি।"),
    ex("雨です。でも、行きます。", "ame desu. demo, ikimasu.", "It's raining. I'm going anyway.", "বৃষ্টি। তবু যাব।"),
  ]),
  p(115, 12, "だから", "So. The result follows.", "তাই, সেজন্য।", "Reason。だから、result", [
    ex("今日は雨です。だから家にいます。", "kyou wa ame desu. dakara ie ni imasu.", "It's raining today, so I'm at home.", "আজ বৃষ্টি। তাই বাড়িতে আছি।"),
    ex("安い。だからよく買います。", "yasui. dakara yoku kaimasu.", "It's cheap, so I buy it often.", "সস্তা। তাই প্রায়ই কিনি।"),
  ]),
  p(116, 12, "そして", "And then. The next fact or the next event.", "এবং, তারপর।", "Sentence。そして、sentence", [
    ex("京都へ行きました。そして金閣寺を見ました。", "Kyouto e ikimashita. soshite Kinkakuji o mimashita.", "I went to Kyoto, and then I saw Kinkaku-ji.", "কিয়োটো গিয়েছিলাম। তারপর কিনকাকুজি দেখেছি।"),
    ex("彼は親切です。そして面白いです。", "kare wa shinsetsu desu. soshite omoshiroi desu.", "He is kind, and he is funny.", "সে দয়ালু। আর মজার।"),
  ]),
  p(117, 12, "それから", "After that. The next step, or one more thing.", "তারপর। পরের ধাপ, বা আর একটা বিষয়।", "Sentence。それから、sentence", [
    ex("宿題をします。それから寝ます。", "shukudai o shimasu. sorekara nemasu.", "I'll do the homework, and then I'll sleep.", "হোমওয়ার্ক করব। তারপর ঘুমাব।"),
    ex("りんごをください。それから水も。", "ringo o kudasai. sorekara mizu mo.", "Apples, please. And water as well.", "আপেল দেবেন। তারপর পানিও।"),
  ]),
  p(118, 12, "んです／のです", "Explains the situation, or asks what is behind it. んです is the spoken のです.", "কারণ বা পটভূমি বলা, বা জানতে চাওয়া। কথায় んです।", "Plain form + んです", [
    ex("頭が痛いんです。", "atama ga itai n desu.", "The thing is, I have a headache.", "আসলে মাথা ব্যথা করছে।"),
    ex("どうしたんですか。", "dou shita n desu ka.", "What happened?", "কী হয়েছে?"),
  ], "Nouns and な-adjectives take な: 学生なんです."),
];
