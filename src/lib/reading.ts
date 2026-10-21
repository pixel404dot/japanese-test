import { READING_LESSONS_11_20 } from "./reading-l11-20";
import { READING_LESSONS_14_20 } from "./reading-l14-20";

export type RubyPart = { t: string; f?: string };

export type ReadingLine = {
  speak: string;
  parts: RubyPart[];
  romaji: string;
  meaning: string;
  bn: string;
  note?: string;
};

export type Pattern = {
  n: number;
  line: ReadingLine;
};

export type Example = {
  n: number;
  lines: ReadingLine[];
};

export type ConvoLine = {
  speaker: string;
  speakerRuby?: RubyPart[];
  voice: "female" | "male";
  line: ReadingLine;
  sceneBreak?: boolean;
};

export type ReadingLesson = {
  id: string;
  number: number;
  title: string;
  titleJa: string;
  description: string;
  patterns: Pattern[];
  examples: Example[];
  conversation: {
    title: string;
    titleJa: string;
    cd?: string;
    setting: string;
    lines: ConvoLine[];
  };
};

const t = (s: string): RubyPart => ({ t: s });
const k = (s: string, f: string): RubyPart => ({ t: s, f });

const line = (
  speak: string,
  parts: RubyPart[],
  romaji: string,
  meaning: string,
  bn: string,
  note?: string,
): ReadingLine => ({ speak, parts, romaji, meaning, bn, note });

export const READING_LESSONS: ReadingLesson[] = [
  {
    id: "lesson-1",
    number: 1,
    title: "Introductions",
    titleJa: "だい1か",
    description: "Sentence patterns, examples, and the first conversation.",
    patterns: [
      {
        n: 1,
        line: line(
          "わたしはマイク・ミラーです。",
          [t("わたしは マイク・ミラーです。")],
          "watashi wa Maiku Miraa desu.",
          "I am Mike Miller.",
          "আমি মাইক মিলার।",
        ),
      },
      {
        n: 2,
        line: line(
          "サントスさんは学生じゃありません。",
          [
            t("サントスさんは "),
            k("学生", "がくせい"),
            t("じゃ ありません。"),
          ],
          "Santosu-san wa gakusei ja arimasen.",
          "Mr. Santos is not a student.",
          "সান্তোস-সান ছাত্র নন।",
          "では is also used: 学生ではありません。",
        ),
      },
      {
        n: 3,
        line: line(
          "ミラーさんは会社員ですか。",
          [t("ミラーさんは "), k("会社員", "かいしゃいん"), t("ですか。")],
          "Miraa-san wa kaishain desu ka.",
          "Is Mr. Miller an office worker?",
          "মিলার-সান কি অফিস কর্মী?",
        ),
      },
      {
        n: 4,
        line: line(
          "サントスさんも会社員です。",
          [t("サントスさんも "), k("会社員", "かいしゃいん"), t("です。")],
          "Santosu-san mo kaishain desu.",
          "Mr. Santos is also an office worker.",
          "সান্তোস-সানও অফিস কর্মী।",
        ),
      },
    ],
    examples: [
      {
        n: 1,
        lines: [
          line(
            "あなたはマイク・ミラーさんですか。",
            [t("[あなたは] マイク・ミラーさんですか。")],
            "[anata wa] Maiku Miraa-san desu ka.",
            "Are you Mike Miller?",
            "আপনি কি মাইক মিলার?",
          ),
          line(
            "はい、わたしはマイク・ミラーです。",
            [t("……はい、[わたしは] マイク・ミラーです。")],
            "hai, [watashi wa] Maiku Miraa desu.",
            "Yes, I am Mike Miller.",
            "হ্যাঁ, আমি মাইক মিলার।",
          ),
        ],
      },
      {
        n: 2,
        lines: [
          line(
            "ミラーさんは学生ですか。",
            [t("ミラーさんは "), k("学生", "がくせい"), t("ですか。")],
            "Miraa-san wa gakusei desu ka.",
            "Is Mr. Miller a student?",
            "মিলার-সান কি ছাত্র?",
          ),
          line(
            "いいえ、わたしは学生じゃありません。",
            [
              t("……いいえ、[わたしは] "),
              k("学生", "がくせい"),
              t("じゃ ありません。"),
            ],
            "iie, [watashi wa] gakusei ja arimasen.",
            "No, I am not a student.",
            "না, আমি ছাত্র নই।",
          ),
        ],
      },
      {
        n: 3,
        lines: [
          line(
            "ワンさんは銀行員ですか。",
            [t("ワンさんは "), k("銀行員", "ぎんこういん"), t("ですか。")],
            "Wan-san wa ginkouin desu ka.",
            "Is Mr. Wang a bank employee?",
            "ওয়ান-সান কি ব্যাংক কর্মী?",
          ),
          line(
            "いいえ、ワンさんは銀行員じゃありません。",
            [
              t("……いいえ、[ワンさんは] "),
              k("銀行員", "ぎんこういん"),
              t("じゃ ありません。"),
            ],
            "iie, [Wan-san wa] ginkouin ja arimasen.",
            "No, Mr. Wang is not a bank employee.",
            "না, ওয়ান-সান ব্যাংক কর্মী নন।",
          ),
          line(
            "医者です。",
            [k("医者", "いしゃ"), t("です。")],
            "isha desu.",
            "He is a doctor.",
            "তিনি ডাক্তার।",
          ),
        ],
      },
      {
        n: 4,
        lines: [
          line(
            "あの方はどなたですか。",
            [t("あの "), k("方", "かた"), t("は どなたですか。")],
            "ano kata wa donata desu ka.",
            "Who is that person?",
            "সেই ব্যক্তি কে?",
          ),
          line(
            "ワットさんです。さくら大学の先生です。",
            [
              t("……ワットさんです。さくら"),
              k("大学", "だいがく"),
              t("の "),
              k("先生", "せんせい"),
              t("です。"),
            ],
            "Watto-san desu. Sakura daigaku no sensei desu.",
            "That's Mr. Watt. He is a teacher at Sakura University.",
            "ওয়াট-সান। তিনি সাকুরা বিশ্ববিদ্যালয়ের শিক্ষক।",
          ),
        ],
      },
      {
        n: 5,
        lines: [
          line(
            "グプタさんは会社員ですか。",
            [t("グプタさんは "), k("会社員", "かいしゃいん"), t("ですか。")],
            "Guputa-san wa kaishain desu ka.",
            "Is Mr. Gupta an office worker?",
            "গুপ্ত-সান কি অফিস কর্মী?",
          ),
          line(
            "はい、会社員です。",
            [t("……はい、"), k("会社員", "かいしゃいん"), t("です。")],
            "hai, kaishain desu.",
            "Yes, he is an office worker.",
            "হ্যাঁ, অফিস কর্মী।",
          ),
          line(
            "カリナさんも会社員ですか。",
            [t("カリナさんも "), k("会社員", "かいしゃいん"), t("ですか。")],
            "Karina-san mo kaishain desu ka.",
            "Is Karina also an office worker?",
            "ক্যারিনা-সানও কি অফিস কর্মী?",
          ),
          line(
            "いいえ。カリナさんは学生です。",
            [
              t("……いいえ。[カリナさんは] "),
              k("学生", "がくせい"),
              t("です。"),
            ],
            "iie. [Karina-san wa] gakusei desu.",
            "No. Karina is a student.",
            "না। ক্যারিনা-সান ছাত্রী।",
          ),
        ],
      },
      {
        n: 6,
        lines: [
          line(
            "テレサちゃんは何歳ですか。",
            [t("テレサちゃんは "), k("何歳", "なんさい"), t("ですか。")],
            "Teresa-chan wa nansai desu ka.",
            "How old is Teresa?",
            "তেরেসা-চান কত বছরের?",
          ),
          line(
            "9歳です。",
            [t("……9"), k("歳", "さい"), t("です。")],
            "kyuu-sai desu.",
            "She is nine years old.",
            "৯ বছর।",
          ),
        ],
      },
    ],
    conversation: {
      title: "Nice to meet you",
      titleJa: "初めまして",
      cd: "CD01",
      setting: "Yamada introduces Miller to Sato at the office.",
      lines: [
        {
          speaker: "佐藤",
          speakerRuby: [k("佐藤", "さとう")],
          voice: "female",
          line: line(
            "おはようございます。",
            [t("おはよう ございます。")],
            "ohayou gozaimasu.",
            "Good morning.",
            "সুপ্রভাত।",
          ),
        },
        {
          speaker: "山田",
          speakerRuby: [k("山田", "やまだ")],
          voice: "male",
          line: line(
            "おはようございます。",
            [t("おはよう ございます。")],
            "ohayou gozaimasu.",
            "Good morning.",
            "সুপ্রভাত।",
          ),
        },
        {
          speaker: "山田",
          speakerRuby: [k("山田", "やまだ")],
          voice: "male",
          line: line(
            "佐藤さん、こちらはマイク・ミラーさんです。",
            [
              k("佐藤", "さとう"),
              t("さん、こちらは マイク・ミラーさんです。"),
            ],
            "Satou-san, kochira wa Maiku Miraa-san desu.",
            "Ms. Sato, this is Mr. Mike Miller.",
            "সাতো-সান, ইনি মাইক মিলার-সান।",
          ),
        },
        {
          speaker: "ミラー",
          voice: "male",
          line: line(
            "初めまして。",
            [k("初", "はじ"), t("めまして。")],
            "hajimemashite.",
            "Nice to meet you.",
            "আপনার সাথে পরিচিত হয়ে খুশি।",
          ),
        },
        {
          speaker: "ミラー",
          voice: "male",
          line: line(
            "マイク・ミラーです。",
            [t("マイク・ミラーです。")],
            "Maiku Miraa desu.",
            "I'm Mike Miller.",
            "আমি মাইক মিলার।",
          ),
        },
        {
          speaker: "ミラー",
          voice: "male",
          line: line(
            "アメリカから来ました。",
            [t("アメリカから "), k("来", "き"), t("ました。")],
            "Amerika kara kimashita.",
            "I came from America.",
            "আমি আমেরিকা থেকে এসেছি।",
          ),
        },
        {
          speaker: "ミラー",
          voice: "male",
          line: line(
            "どうぞよろしく。",
            [t("どうぞ よろしく。")],
            "douzo yoroshiku.",
            "Pleased to meet you.",
            "পরিচিত হয়ে খুশি।",
          ),
        },
        {
          speaker: "佐藤",
          speakerRuby: [k("佐藤", "さとう")],
          voice: "female",
          line: line(
            "佐藤けい子です。",
            [k("佐藤", "さとう"), k("けい子", "けいこ"), t("です。")],
            "Satou Keiko desu.",
            "I'm Keiko Sato.",
            "আমি সাতো কেইকো।",
          ),
        },
        {
          speaker: "佐藤",
          speakerRuby: [k("佐藤", "さとう")],
          voice: "female",
          line: line(
            "どうぞよろしく。",
            [t("どうぞ よろしく。")],
            "douzo yoroshiku.",
            "Pleased to meet you.",
            "পরিচিত হয়ে খুশি।",
          ),
        },
      ],
    },
  },
  {
    id: "lesson-2",
    number: 2,
    title: "This is ~",
    titleJa: "だい2か",
    description:
      "これ／それ／あれ, whose it is, and meeting a new neighbor.",
    patterns: [
      {
        n: 1,
        line: line(
          "これは辞書です。",
          [t("これは "), k("辞書", "じしょ"), t("です。")],
          "kore wa jisho desu.",
          "This is a dictionary.",
          "এটা অভিধান।",
        ),
      },
      {
        n: 2,
        line: line(
          "それはわたしの傘です。",
          [t("それは わたしの "), k("傘", "かさ"), t("です。")],
          "sore wa watashi no kasa desu.",
          "That is my umbrella.",
          "ওটা আমার ছাতা।",
        ),
      },
      {
        n: 3,
        line: line(
          "この本はわたしのです。",
          [t("この "), k("本", "ほん"), t("は わたしのです。")],
          "kono hon wa watashi no desu.",
          "This book is mine.",
          "এই বইটা আমার।",
        ),
      },
    ],
    examples: [
      {
        n: 1,
        lines: [
          line(
            "これはボールペンですか。",
            [t("これは ボールペンですか。")],
            "kore wa boorupen desu ka.",
            "Is this a ballpoint pen?",
            "এটা কি বলপয়েন্ট কলম?",
          ),
          line(
            "はい、そうです。",
            [t("……はい、そうです。")],
            "hai, sou desu.",
            "Yes, it is.",
            "হ্যাঁ, তাই।",
          ),
        ],
      },
      {
        n: 2,
        lines: [
          line(
            "それはノートですか。",
            [t("それは ノートですか。")],
            "sore wa nooto desu ka.",
            "Is that a notebook?",
            "ওটা কি খাতা?",
          ),
          line(
            "いいえ、これは手帳です。",
            [
              t("……いいえ、[これは] "),
              k("手帳", "てちょう"),
              t("です。"),
            ],
            "iie, [kore wa] techou desu.",
            "No, this is a personal organiser.",
            "না, [এটা] পকেট ডায়েরি।",
          ),
        ],
      },
      {
        n: 3,
        lines: [
          line(
            "それは何ですか。",
            [t("それは "), k("何", "なん"), t("ですか。")],
            "sore wa nan desu ka.",
            "What is that?",
            "ওটা কী?",
          ),
          line(
            "名刺です。",
            [t("……"), k("名刺", "めいし"), t("です。")],
            "meishi desu.",
            "It's a business card.",
            "ভিজিটিং কার্ড।",
          ),
        ],
      },
      {
        n: 4,
        lines: [
          line(
            "これは「9」ですか、「7」ですか。",
            [t("これは 「9」ですか、「7」ですか。")],
            "kore wa kyuu desu ka, nana desu ka.",
            "Is this a 9 or a 7?",
            "এটা কি ৯ নাকি ৭?",
            "Handwritten 9 and 7 can look similar.",
          ),
          line(
            "「9」です。",
            [t("……「9」です。")],
            "kyuu desu.",
            "It's a 9.",
            "৯।",
          ),
        ],
      },
      {
        n: 5,
        lines: [
          line(
            "それは何の雑誌ですか。",
            [
              t("それは "),
              k("何", "なん"),
              t("の "),
              k("雑誌", "ざっし"),
              t("ですか。"),
            ],
            "sore wa nan no zasshi desu ka.",
            "What magazine is that?",
            "ওটা কীসের ম্যাগাজিন?",
          ),
          line(
            "コンピューターの雑誌です。",
            [
              t("……コンピューターの "),
              k("雑誌", "ざっし"),
              t("です。"),
            ],
            "konpyuutaa no zasshi desu.",
            "It's a computer magazine.",
            "কম্পিউটারের ম্যাগাজিন।",
          ),
        ],
      },
      {
        n: 6,
        lines: [
          line(
            "あれはだれのかばんですか。",
            [t("あれは だれの かばんですか。")],
            "are wa dare no kaban desu ka.",
            "Whose bag is that over there?",
            "ওদিকের ব্যাগটা কার?",
          ),
          line(
            "佐藤さんのかばんです。",
            [
              t("……"),
              k("佐藤", "さとう"),
              t("さんの かばんです。"),
            ],
            "Satou-san no kaban desu.",
            "It's Mr. Sato's bag.",
            "সাতো-সানের ব্যাগ।",
          ),
        ],
      },
      {
        n: 7,
        lines: [
          line(
            "これはミラーさんのですか。",
            [t("これは ミラーさんのですか。")],
            "kore wa Miraa-san no desu ka.",
            "Is this Mr. Miller's?",
            "এটা কি মিলার-সানের?",
          ),
          line(
            "いいえ、わたしのじゃありません。",
            [t("……いいえ、わたしのじゃ ありません。")],
            "iie, watashi no ja arimasen.",
            "No, it isn't mine.",
            "না, এটা আমার নয়।",
          ),
        ],
      },
      {
        n: 8,
        lines: [
          line(
            "このかぎはだれのですか。",
            [t("この かぎは だれのですか。")],
            "kono kagi wa dare no desu ka.",
            "Whose key is this?",
            "এই চাবিটা কার?",
          ),
          line(
            "わたしのです。",
            [t("……わたしのです。")],
            "watashi no desu.",
            "It's mine.",
            "আমার।",
          ),
        ],
      },
    ],
    conversation: {
      title: "I'll be in your care",
      titleJa: "これから お世話に なります",
      setting:
        "Santos rings from the intercom, then greets his new neighbor Yamada Ichiro at the door of 408.",
      lines: [
        {
          speaker: "山田一郎",
          speakerRuby: [k("山田", "やまだ"), k("一郎", "いちろう")],
          voice: "male",
          line: line(
            "はい。どなたですか。",
            [t("はい。 どなたですか。")],
            "hai. donata desu ka.",
            "Yes? Who is it?",
            "হ্যাঁ? কে?",
          ),
        },
        {
          speaker: "サントス",
          voice: "male",
          line: line(
            "408のサントスです。",
            [t("408の サントスです。")],
            "yon-maru-hachi no Santosu desu.",
            "This is Santos from 408.",
            "৪০৮-এর সান্তোস।",
          ),
        },
        {
          speaker: "サントス",
          voice: "male",
          sceneBreak: true,
          line: line(
            "こんにちは。サントスです。",
            [t("こんにちは。 サントスです。")],
            "konnichiwa. Santosu desu.",
            "Hello. I'm Santos.",
            "নমস্কার। আমি সান্তোস।",
            "Santos is now at the door.",
          ),
        },
        {
          speaker: "サントス",
          voice: "male",
          line: line(
            "これからお世話になります。",
            [t("これから お"), k("世話", "せわ"), t("に なります。")],
            "kore kara osewa ni narimasu.",
            "I'll be in your care from now on.",
            "এখন থেকে আপনার যত্নে থাকব।",
          ),
        },
        {
          speaker: "サントス",
          voice: "male",
          line: line(
            "どうぞよろしくお願いします。",
            [
              t("どうぞ よろしく お"),
              k("願", "ねが"),
              t("いします。"),
            ],
            "douzo yoroshiku onegaishimasu.",
            "Pleased to meet you.",
            "আপনার সাথে পরিচিত হয়ে খুশি।",
          ),
        },
        {
          speaker: "山田一郎",
          speakerRuby: [k("山田", "やまだ"), k("一郎", "いちろう")],
          voice: "male",
          line: line(
            "こちらこそよろしくお願いします。",
            [
              t("こちらこそ よろしく お"),
              k("願", "ねが"),
              t("いします。"),
            ],
            "kochira koso yoroshiku onegaishimasu.",
            "Pleased to meet you, too.",
            "আমিও, পরিচিত হয়ে খুশি।",
          ),
        },
        {
          speaker: "サントス",
          voice: "male",
          line: line(
            "あのう、これ、コーヒーです。どうぞ。",
            [t("あのう、これ、コーヒーです。 どうぞ。")],
            "anou, kore, koohii desu. douzo.",
            "Um, this is coffee. Please have it.",
            "ওহ, এটা কফি। নিন।",
          ),
        },
        {
          speaker: "山田一郎",
          speakerRuby: [k("山田", "やまだ"), k("一郎", "いちろう")],
          voice: "male",
          line: line(
            "どうもありがとうございます。",
            [t("どうも ありがとう ございます。")],
            "doumo arigatou gozaimasu.",
            "Thank you very much.",
            "অসংখ্য ধন্যবাদ।",
          ),
        },
      ],
    },
  },
  {
    id: "lesson-3",
    number: 3,
    title: "Here and there",
    titleJa: "だい3か",
    description:
      "ここ／そこ／あそこ, where things are, whose country, prices, and buying wine.",
    patterns: [
      {
        n: 1,
        line: line(
          "ここは食堂です。",
          [t("ここは "), k("食堂", "しょくどう"), t("です。")],
          "koko wa shokudou desu.",
          "This is the cafeteria.",
          "এটা ক্যান্টিন।",
        ),
      },
      {
        n: 2,
        line: line(
          "エレベーターはあそこです。",
          [t("エレベーターは あそこです。")],
          "erebeetaa wa asoko desu.",
          "The elevator is over there.",
          "লিফটটা ওদিকে।",
        ),
      },
    ],
    examples: [
      {
        n: 1,
        lines: [
          line(
            "ここは新大阪ですか。",
            [t("ここは "), k("新大阪", "しんおおさか"), t("ですか。")],
            "koko wa Shin-Oosaka desu ka.",
            "Is this Shin-Osaka?",
            "এটা কি শিন-ওসাকা?",
          ),
          line(
            "はい、そうです。",
            [t("……はい、そうです。")],
            "hai, sou desu.",
            "Yes, it is.",
            "হ্যাঁ, তাই।",
          ),
        ],
      },
      {
        n: 2,
        lines: [
          line(
            "トイレはどこですか。",
            [t("トイレは どこですか。")],
            "toire wa doko desu ka.",
            "Where is the toilet?",
            "টয়লেট কোথায়?",
          ),
          line(
            "あそこです。",
            [t("……あそこです。")],
            "asoko desu.",
            "It's over there.",
            "ওদিকে।",
          ),
        ],
      },
      {
        n: 3,
        lines: [
          line(
            "山田さんはどこですか。",
            [k("山田", "やまだ"), t("さんは どこですか。")],
            "Yamada-san wa doko desu ka.",
            "Where is Mr. Yamada?",
            "ইয়ামাদা-সান কোথায়?",
          ),
          line(
            "会議室です。",
            [t("……"), k("会議室", "かいぎしつ"), t("です。")],
            "kaigishitsu desu.",
            "He's in the meeting room.",
            "মিটিং রুমে।",
          ),
        ],
      },
      {
        n: 4,
        lines: [
          line(
            "事務所はどちらですか。",
            [k("事務所", "じむしょ"), t("は どちらですか。")],
            "jimusho wa dochira desu ka.",
            "Where is the office?",
            "অফিস কোন দিকে?",
            "どちら is the polite form of どこ.",
          ),
          line(
            "あちらです。",
            [t("……あちらです。")],
            "achira desu.",
            "It's that way.",
            "সেদিকে।",
          ),
        ],
      },
      {
        n: 5,
        lines: [
          line(
            "お国はどちらですか。",
            [t("[お]"), k("国", "くに"), t("は どちらですか。")],
            "okuni wa dochira desu ka.",
            "Which country are you from?",
            "আপনার দেশ কোনটি?",
            "お国 is a polite way to ask someone's country.",
          ),
          line(
            "アメリカです。",
            [t("……アメリカです。")],
            "Amerika desu.",
            "America.",
            "আমেরিকা।",
          ),
        ],
      },
      {
        n: 6,
        lines: [
          line(
            "それはどこの靴ですか。",
            [t("それは どこの "), k("靴", "くつ"), t("ですか。")],
            "sore wa doko no kutsu desu ka.",
            "Where are those shoes from?",
            "ওই জুতো কোন দেশের?",
          ),
          line(
            "イタリアの靴です。",
            [t("……イタリアの "), k("靴", "くつ"), t("です。")],
            "Itaria no kutsu desu.",
            "They're Italian shoes.",
            "ইতালির জুতো।",
          ),
        ],
      },
      {
        n: 7,
        lines: [
          line(
            "この時計はいくらですか。",
            [t("この "), k("時計", "とけい"), t("は いくらですか。")],
            "kono tokei wa ikura desu ka.",
            "How much is this watch?",
            "এই ঘড়িটা কত?",
          ),
          line(
            "18,600円です。",
            [t("……18,600"), k("円", "えん"), t("です。")],
            "ichiman-hassen-roppyaku-en desu.",
            "It's 18,600 yen.",
            "১৮,৬০০ ইয়েন।",
          ),
        ],
      },
    ],
    conversation: {
      title: "I'll take this",
      titleJa: "これを ください",
      cd: "CD09",
      setting:
        "Maria asks for the wine section at the information desk, then buys a Japanese wine.",
      lines: [
        {
          speaker: "店員A",
          speakerRuby: [k("店員", "てんいん"), t("A")],
          voice: "female",
          line: line(
            "いらっしゃいませ。",
            [t("いらっしゃいませ。")],
            "irasshaimase.",
            "Welcome.",
            "স্বাগতম।",
          ),
        },
        {
          speaker: "マリア",
          voice: "female",
          line: line(
            "すみません。ワイン売り場はどこですか。",
            [
              t("すみません。 ワイン"),
              k("売り場", "うりば"),
              t("は どこですか。"),
            ],
            "sumimasen. wain uriba wa doko desu ka.",
            "Excuse me. Where is the wine section?",
            "দুঃখিত। ওয়াইন কাউন্টার কোথায়?",
          ),
        },
        {
          speaker: "店員A",
          speakerRuby: [k("店員", "てんいん"), t("A")],
          voice: "female",
          line: line(
            "地下1階です。",
            [k("地下", "ちか"), k("1階", "いっかい"), t("です。")],
            "chika ikkai desu.",
            "It's on basement floor 1.",
            "বেসমেন্ট ১ তলায়।",
          ),
        },
        {
          speaker: "マリア",
          voice: "female",
          line: line(
            "どうも。",
            [t("どうも。")],
            "doumo.",
            "Thanks.",
            "ধন্যবাদ।",
          ),
        },
        {
          speaker: "マリア",
          voice: "female",
          sceneBreak: true,
          line: line(
            "すみません。そのワインを見せてください。",
            [
              t("すみません。 その ワインを "),
              k("見", "み"),
              t("せて ください。"),
            ],
            "sumimasen. sono wain o misete kudasai.",
            "Excuse me. Please show me that wine.",
            "দুঃখিত। ওই ওয়াইনটা দেখান।",
            "Maria is now at the wine counter.",
          ),
        },
        {
          speaker: "店員B",
          speakerRuby: [k("店員", "てんいん"), t("B")],
          voice: "female",
          line: line(
            "はい、どうぞ。",
            [t("はい、どうぞ。")],
            "hai, douzo.",
            "Yes, here you are.",
            "হ্যাঁ, নিন।",
          ),
        },
        {
          speaker: "マリア",
          voice: "female",
          line: line(
            "これはどこのワインですか。",
            [t("これは どこの ワインですか。")],
            "kore wa doko no wain desu ka.",
            "Where is this wine from?",
            "এটা কোন দেশের ওয়াইন?",
          ),
        },
        {
          speaker: "店員B",
          speakerRuby: [k("店員", "てんいん"), t("B")],
          voice: "female",
          line: line(
            "日本のです。",
            [k("日本", "にほん"), t("のです。")],
            "Nihon no desu.",
            "It's from Japan.",
            "জাপানের।",
          ),
        },
        {
          speaker: "マリア",
          voice: "female",
          line: line(
            "いくらですか。",
            [t("いくらですか。")],
            "ikura desu ka.",
            "How much is it?",
            "কত?",
          ),
        },
        {
          speaker: "店員B",
          speakerRuby: [k("店員", "てんいん"), t("B")],
          voice: "female",
          line: line(
            "2,500円です。",
            [t("2,500"), k("円", "えん"), t("です。")],
            "nisen-gohyaku-en desu.",
            "It's 2,500 yen.",
            "২,৫০০ ইয়েন।",
          ),
        },
        {
          speaker: "マリア",
          voice: "female",
          line: line(
            "じゃ、これをください。",
            [t("じゃ、これを ください。")],
            "ja, kore o kudasai.",
            "Then I'll take this, please.",
            "তাহলে এটা দিন।",
          ),
        },
      ],
    },
  },
  {
    id: "lesson-4",
    number: 4,
    title: "Time & daily life",
    titleJa: "だい4か",
    description:
      "What time it is, days of the week, and when you get up, work, and study.",
    patterns: [
      {
        n: 1,
        line: line(
          "今4時5分です。",
          [
            k("今", "いま"),
            t(" 4"),
            k("時", "じ"),
            t("5"),
            k("分", "ふん"),
            t("です。"),
          ],
          "ima yo-ji go-fun desu.",
          "It's 4:05 now.",
          "এখন ৪টা ৫ মিনিট।",
        ),
      },
      {
        n: 2,
        line: line(
          "わたしは毎朝6時に起きます。",
          [
            t("わたしは "),
            k("毎朝", "まいあさ"),
            t(" 6"),
            k("時", "じ"),
            t("に "),
            k("起", "お"),
            t("きます。"),
          ],
          "watashi wa maiasa roku-ji ni okimasu.",
          "I get up at 6 every morning.",
          "আমি প্রতি সকালে ৬টায় উঠি।",
        ),
      },
      {
        n: 3,
        line: line(
          "わたしはきのう勉強しました。",
          [
            t("わたしは きのう "),
            k("勉強", "べんきょう"),
            t("しました。"),
          ],
          "watashi wa kinou benkyou shimashita.",
          "I studied yesterday.",
          "আমি গতকাল পড়াশোনা করেছি।",
        ),
      },
    ],
    examples: [
      {
        n: 1,
        lines: [
          line(
            "今何時ですか。",
            [k("今", "いま"), t(" "), k("何時", "なんじ"), t("ですか。")],
            "ima nanji desu ka.",
            "What time is it now?",
            "এখন কয়টা?",
          ),
          line(
            "2時10分です。",
            [t("……2"), k("時", "じ"), t("10"), k("分", "ふん"), t("です。")],
            "ni-ji juppun desu.",
            "It's 2:10.",
            "২টা ১০ মিনিট।",
          ),
          line(
            "ニューヨークは今何時ですか。",
            [
              t("ニューヨークは "),
              k("今", "いま"),
              t(" "),
              k("何時", "なんじ"),
              t("ですか。"),
            ],
            "Nyuuyooku wa ima nanji desu ka.",
            "What time is it now in New York?",
            "নিউইয়র্কে এখন কয়টা?",
          ),
          line(
            "午前0時10分です。",
            [
              t("……"),
              k("午前", "ごぜん"),
              t(" 0"),
              k("時", "じ"),
              t("10"),
              k("分", "ふん"),
              t("です。"),
            ],
            "gozen rei-ji juppun desu.",
            "It's 12:10 a.m.",
            "রাত ১২টা ১০ মিনিট।",
          ),
        ],
      },
      {
        n: 2,
        lines: [
          line(
            "休みは何曜日ですか。",
            [
              k("休", "やす"),
              t("みは "),
              k("何曜日", "なんようび"),
              t("ですか。"),
            ],
            "yasumi wa nanyoubi desu ka.",
            "What day is your day off?",
            "ছুটি কোনবার?",
          ),
          line(
            "土曜日と日曜日です。",
            [
              t("……"),
              k("土曜日", "どようび"),
              t("と "),
              k("日曜日", "にちようび"),
              t("です。"),
            ],
            "doyoubi to nichiyoubi desu.",
            "Saturday and Sunday.",
            "শনিবার ও রবিবার।",
          ),
        ],
      },
      {
        n: 3,
        lines: [
          line(
            "アップル銀行は何時から何時までですか。",
            [
              t("アップル"),
              k("銀行", "ぎんこう"),
              t("は "),
              k("何時", "なんじ"),
              t("から "),
              k("何時", "なんじ"),
              t("までですか。"),
            ],
            "Appuru ginkou wa nanji kara nanji made desu ka.",
            "From what time to what time is Apple Bank open?",
            "অ্যাপল ব্যাংক কয়টা থেকে কয়টা পর্যন্ত খোলা?",
          ),
          line(
            "9時から3時までです。",
            [
              t("……9"),
              k("時", "じ"),
              t("から 3"),
              k("時", "じ"),
              t("までです。"),
            ],
            "ku-ji kara san-ji made desu.",
            "From 9 to 3.",
            "৯টা থেকে ৩টা পর্যন্ত।",
          ),
        ],
      },
      {
        n: 4,
        lines: [
          line(
            "毎晩何時に寝ますか。",
            [
              k("毎晩", "まいばん"),
              t(" "),
              k("何時", "なんじ"),
              t("に "),
              k("寝", "ね"),
              t("ますか。"),
            ],
            "maiban nanji ni nemasu ka.",
            "What time do you go to bed every night?",
            "আপনি প্রতি রাতে কয়টায় ঘুমান?",
          ),
          line(
            "11時に寝ます。",
            [t("……11"), k("時", "じ"), t("に "), k("寝", "ね"), t("ます。")],
            "juuichi-ji ni nemasu.",
            "I go to bed at 11.",
            "১১টায় ঘুমাই।",
          ),
        ],
      },
      {
        n: 5,
        lines: [
          line(
            "毎日何時から何時まで勉強しますか。",
            [
              k("毎日", "まいにち"),
              t(" "),
              k("何時", "なんじ"),
              t("から "),
              k("何時", "なんじ"),
              t("まで "),
              k("勉強", "べんきょう"),
              t("しますか。"),
            ],
            "mainichi nanji kara nanji made benkyou shimasu ka.",
            "From what time to what time do you study every day?",
            "প্রতিদিন কয়টা থেকে কয়টা পর্যন্ত পড়াশোনা করেন?",
          ),
          line(
            "朝9時から午後3時まで勉強します。",
            [
              t("……"),
              k("朝", "あさ"),
              t(" 9"),
              k("時", "じ"),
              t("から "),
              k("午後", "ごご"),
              t(" 3"),
              k("時", "じ"),
              t("まで "),
              k("勉強", "べんきょう"),
              t("します。"),
            ],
            "asa ku-ji kara gogo san-ji made benkyou shimasu.",
            "I study from 9 in the morning until 3 in the afternoon.",
            "সকাল ৯টা থেকে দুপুর ৩টা পর্যন্ত পড়াশোনা করি।",
          ),
        ],
      },
      {
        n: 6,
        lines: [
          line(
            "土曜日働きますか。",
            [k("土曜日", "どようび"), t(" "), k("働", "はたら"), t("きますか。")],
            "doyoubi hatarakimasu ka.",
            "Do you work on Saturday?",
            "শনিবার কি কাজ করেন?",
          ),
          line(
            "いいえ、働きません。",
            [t("……いいえ、"), k("働", "はたら"), t("きません。")],
            "iie, hatarakimasen.",
            "No, I don't work.",
            "না, কাজ করি না।",
          ),
        ],
      },
      {
        n: 7,
        lines: [
          line(
            "きのう勉強しましたか。",
            [t("きのう "), k("勉強", "べんきょう"), t("しましたか。")],
            "kinou benkyou shimashita ka.",
            "Did you study yesterday?",
            "গতকাল কি পড়াশোনা করেছেন?",
          ),
          line(
            "いいえ、勉強しませんでした。",
            [
              t("……いいえ、"),
              k("勉強", "べんきょう"),
              t("しませんでした。"),
            ],
            "iie, benkyou shimasen deshita.",
            "No, I didn't study.",
            "না, পড়াশোনা করিনি।",
          ),
        ],
      },
    ],
    conversation: {
      title: "Until what time?",
      titleJa: "そちらは 何時までですか",
      cd: "CD12",
      setting:
        "Miller asks Sato for Asuka's number, then phones the restaurant about closing time and the day off.",
      lines: [
        {
          speaker: "ミラー",
          voice: "male",
          line: line(
            "すみません、「あすか」の電話番号は何番ですか。",
            [
              t("すみません、「あすか」の "),
              k("電話番号", "でんわばんごう"),
              t("は "),
              k("何番", "なんばん"),
              t("ですか。"),
            ],
            "sumimasen, Asuka no denwa bangou wa nanban desu ka.",
            "Excuse me, what's the phone number of Asuka?",
            "দুঃখিত, আসুকার ফোন নম্বর কত?",
          ),
        },
        {
          speaker: "佐藤",
          speakerRuby: [k("佐藤", "さとう")],
          voice: "female",
          line: line(
            "「あすか」ですか。5275の2725です。",
            [t("「あすか」ですか。 5275の 2725です。")],
            "Asuka desu ka. go-ni-nana-go no ni-nana-ni-go desu.",
            "Asuka? It's 5275-2725.",
            "আসুকা? ৫২৭৫-এর ২৭২৫।",
          ),
        },
        {
          speaker: "ミラー",
          voice: "male",
          line: line(
            "どうもありがとうございます。",
            [t("どうも ありがとう ございます。")],
            "doumo arigatou gozaimasu.",
            "Thank you very much.",
            "অনেক ধন্যবাদ।",
          ),
        },
        {
          speaker: "店の人",
          speakerRuby: [k("店", "みせ"), t("の"), k("人", "ひと")],
          voice: "female",
          sceneBreak: true,
          line: line(
            "はい、「あすか」です。",
            [t("はい、「あすか」です。")],
            "hai, Asuka desu.",
            "Yes, this is Asuka.",
            "হ্যাঁ, আসুকা।",
            "Miller is now on the phone with the restaurant.",
          ),
        },
        {
          speaker: "ミラー",
          voice: "male",
          line: line(
            "すみません。そちらは何時までですか。",
            [
              t("すみません。 そちらは "),
              k("何時", "なんじ"),
              t("までですか。"),
            ],
            "sumimasen. sochira wa nanji made desu ka.",
            "Excuse me. Until what time are you open?",
            "দুঃখিত। আপনারা কয়টা পর্যন্ত খোলা?",
          ),
        },
        {
          speaker: "店の人",
          speakerRuby: [k("店", "みせ"), t("の"), k("人", "ひと")],
          voice: "female",
          line: line(
            "10時までです。",
            [t("10"), k("時", "じ"), t("までです。")],
            "juu-ji made desu.",
            "Until 10 o'clock.",
            "১০টা পর্যন্ত।",
          ),
        },
        {
          speaker: "ミラー",
          voice: "male",
          line: line(
            "休みは何曜日ですか。",
            [
              k("休", "やす"),
              t("みは "),
              k("何曜日", "なんようび"),
              t("ですか。"),
            ],
            "yasumi wa nanyoubi desu ka.",
            "What day is your day off?",
            "ছুটি কোনবার?",
          ),
        },
        {
          speaker: "店の人",
          speakerRuby: [k("店", "みせ"), t("の"), k("人", "ひと")],
          voice: "female",
          line: line(
            "日曜日です。",
            [k("日曜日", "にちようび"), t("です。")],
            "nichiyoubi desu.",
            "Sunday.",
            "রবিবার।",
          ),
        },
        {
          speaker: "ミラー",
          voice: "male",
          line: line(
            "そうですか。どうも。",
            [t("そうですか。 どうも。")],
            "sou desu ka. doumo.",
            "I see. Thanks.",
            "আচ্ছা। ধন্যবাদ।",
          ),
        },
      ],
    },
  },
  {
    id: "lesson-5",
    number: 5,
    title: "Going & coming",
    titleJa: "だい5か",
    description:
      "行く／来る／帰る, how you go, who you go with, and dates.",
    patterns: [
      {
        n: 1,
        line: line(
          "わたしは京都へ行きます。",
          [
            t("わたしは "),
            k("京都", "きょうと"),
            t("へ "),
            k("行", "い"),
            t("きます。"),
          ],
          "watashi wa Kyouto e ikimasu.",
          "I will go to Kyoto.",
          "আমি কিয়োটো যাব।",
        ),
      },
      {
        n: 2,
        line: line(
          "わたしはタクシーでうちへ帰ります。",
          [
            t("わたしは タクシーで うちへ "),
            k("帰", "かえ"),
            t("ります。"),
          ],
          "watashi wa takushii de uchi e kaerimasu.",
          "I go home by taxi.",
          "আমি ট্যাক্সিতে বাড়ি ফিরি।",
        ),
      },
      {
        n: 3,
        line: line(
          "わたしは家族と日本へ来ました。",
          [
            t("わたしは "),
            k("家族", "かぞく"),
            t("と "),
            k("日本", "にほん"),
            t("へ "),
            k("来", "き"),
            t("ました。"),
          ],
          "watashi wa kazoku to Nihon e kimashita.",
          "I came to Japan with my family.",
          "আমি পরিবারের সাথে জাপানে এসেছি।",
        ),
      },
    ],
    examples: [
      {
        n: 1,
        lines: [
          line(
            "あしたどこへ行きますか。",
            [t("あした どこへ "), k("行", "い"), t("きますか。")],
            "ashita doko e ikimasu ka.",
            "Where will you go tomorrow?",
            "কাল কোথায় যাবেন?",
          ),
          line(
            "奈良へ行きます。",
            [t("……"), k("奈良", "なら"), t("へ "), k("行", "い"), t("きます。")],
            "Nara e ikimasu.",
            "I'll go to Nara.",
            "নারা যাব।",
          ),
        ],
      },
      {
        n: 2,
        lines: [
          line(
            "日曜日どこへ行きましたか。",
            [
              k("日曜日", "にちようび"),
              t(" どこへ "),
              k("行", "い"),
              t("きましたか。"),
            ],
            "nichiyoubi doko e ikimashita ka.",
            "Where did you go on Sunday?",
            "রবিবার কোথায় গিয়েছিলেন?",
          ),
          line(
            "どこへも行きませんでした。",
            [t("……どこ[へ]も "), k("行", "い"), t("きませんでした。")],
            "doko [e] mo ikimasen deshita.",
            "I didn't go anywhere.",
            "কোথাও যাইনি।",
            "へ is often dropped: どこも行きませんでした。",
          ),
        ],
      },
      {
        n: 3,
        lines: [
          line(
            "何で東京へ行きますか。",
            [
              k("何", "なん"),
              t("で "),
              k("東京", "とうきょう"),
              t("へ "),
              k("行", "い"),
              t("きますか。"),
            ],
            "nan de Toukyou e ikimasu ka.",
            "How will you go to Tokyo?",
            "টোকিও কীভাবে যাবেন?",
          ),
          line(
            "新幹線で行きます。",
            [
              t("……"),
              k("新幹線", "しんかんせん"),
              t("で "),
              k("行", "い"),
              t("きます。"),
            ],
            "shinkansen de ikimasu.",
            "I'll go by shinkansen.",
            "শিঙ্কানসেনে যাব।",
          ),
        ],
      },
      {
        n: 4,
        lines: [
          line(
            "だれと東京へ行きますか。",
            [
              t("だれと "),
              k("東京", "とうきょう"),
              t("へ "),
              k("行", "い"),
              t("きますか。"),
            ],
            "dare to Toukyou e ikimasu ka.",
            "Who will you go to Tokyo with?",
            "কার সাথে টোকিও যাবেন?",
          ),
          line(
            "山田さんと行きます。",
            [
              t("……"),
              k("山田", "やまだ"),
              t("さんと "),
              k("行", "い"),
              t("きます。"),
            ],
            "Yamada-san to ikimasu.",
            "I'll go with Mr. Yamada.",
            "ইয়ামাদা-সানের সাথে যাব।",
          ),
        ],
      },
      {
        n: 5,
        lines: [
          line(
            "いつ日本へ来ましたか。",
            [
              t("いつ "),
              k("日本", "にほん"),
              t("へ "),
              k("来", "き"),
              t("ましたか。"),
            ],
            "itsu Nihon e kimashita ka.",
            "When did you come to Japan?",
            "জাপানে কখন এসেছেন?",
          ),
          line(
            "3月25日に来ました。",
            [
              t("……3"),
              k("月", "がつ"),
              t("25"),
              k("日", "にち"),
              t("に "),
              k("来", "き"),
              t("ました。"),
            ],
            "sangatsu nijuugo-nichi ni kimashita.",
            "I came on March 25th.",
            "২৫ মার্চ এসেছি।",
          ),
        ],
      },
      {
        n: 6,
        lines: [
          line(
            "誕生日はいつですか。",
            [k("誕生日", "たんじょうび"), t("は いつですか。")],
            "tanjoubi wa itsu desu ka.",
            "When is your birthday?",
            "আপনার জন্মদিন কবে?",
          ),
          line(
            "6月13日です。",
            [t("……6"), k("月", "がつ"), t("13"), k("日", "にち"), t("です。")],
            "rokugatsu juusan-nichi desu.",
            "It's June 13th.",
            "১৩ জুন।",
          ),
        ],
      },
    ],
    conversation: {
      title: "Does this train go to Koshien?",
      titleJa: "この 電車は 甲子園へ 行きますか",
      cd: "CD17",
      setting:
        "Santos buys a ticket to Koshien, asks which platform, then checks the train.",
      lines: [
        {
          speaker: "サントス",
          voice: "male",
          line: line(
            "すみません。甲子園までいくらですか。",
            [
              t("すみません。 "),
              k("甲子園", "こうしえん"),
              t("まで いくらですか。"),
            ],
            "sumimasen. Koushien made ikura desu ka.",
            "Excuse me. How much is it to Koshien?",
            "দুঃখিত। কোশিয়েন পর্যন্ত কত?",
          ),
        },
        {
          speaker: "女の人",
          speakerRuby: [k("女", "おんな"), t("の"), k("人", "ひと")],
          voice: "female",
          line: line(
            "350円です。",
            [t("350"), k("円", "えん"), t("です。")],
            "sanbyaku-gojuu-en desu.",
            "It's 350 yen.",
            "৩৫০ ইয়েন।",
          ),
        },
        {
          speaker: "サントス",
          voice: "male",
          line: line(
            "350円ですね。ありがとうございました。",
            [
              t("350"),
              k("円", "えん"),
              t("ですね。 ありがとう ございました。"),
            ],
            "sanbyaku-gojuu-en desu ne. arigatou gozaimashita.",
            "350 yen, I see. Thank you.",
            "৩৫০ ইয়েন, তাই তো। ধন্যবাদ।",
          ),
        },
        {
          speaker: "女の人",
          speakerRuby: [k("女", "おんな"), t("の"), k("人", "ひと")],
          voice: "female",
          line: line(
            "どういたしまして。",
            [t("どう いたしまして。")],
            "dou itashimashite.",
            "You're welcome.",
            "আপনাকে স্বাগতম।",
          ),
        },
        {
          speaker: "サントス",
          voice: "male",
          sceneBreak: true,
          line: line(
            "すみません。甲子園は何番線ですか。",
            [
              t("すみません。 "),
              k("甲子園", "こうしえん"),
              t("は "),
              k("何番線", "なんばんせん"),
              t("ですか。"),
            ],
            "sumimasen. Koushien wa nanbansen desu ka.",
            "Excuse me. Which platform is Koshien?",
            "দুঃখিত। কোশিয়েন কোন প্ল্যাটফর্ম?",
            "Santos is now at the station window.",
          ),
        },
        {
          speaker: "駅員",
          speakerRuby: [k("駅員", "えきいん")],
          voice: "male",
          line: line(
            "5番線です。",
            [t("5"), k("番線", "ばんせん"), t("です。")],
            "go-bansen desu.",
            "Platform 5.",
            "৫ নম্বর লাইন।",
          ),
        },
        {
          speaker: "サントス",
          voice: "male",
          line: line(
            "どうも。",
            [t("どうも。")],
            "doumo.",
            "Thanks.",
            "ধন্যবাদ।",
          ),
        },
        {
          speaker: "サントス",
          voice: "male",
          sceneBreak: true,
          line: line(
            "あのう、この電車は甲子園へ行きますか。",
            [
              t("あのう、この "),
              k("電車", "でんしゃ"),
              t("は "),
              k("甲子園", "こうしえん"),
              t("へ "),
              k("行", "い"),
              t("きますか。"),
            ],
            "anou, kono densha wa Koushien e ikimasu ka.",
            "Um, does this train go to Koshien?",
            "ওহ, এই ট্রেনটা কি কোশিয়েনে যায়?",
            "Santos asks a passenger on the platform.",
          ),
        },
        {
          speaker: "男の人",
          speakerRuby: [k("男", "おとこ"), t("の"), k("人", "ひと")],
          voice: "male",
          line: line(
            "いいえ。次の「普通」ですよ。",
            [
              t("いいえ。 "),
              k("次", "つぎ"),
              t("の 「"),
              k("普通", "ふつう"),
              t("」ですよ。"),
            ],
            "iie. tsugi no futsuu desu yo.",
            "No. The next local train does.",
            "না। পরের লোকালটা যায়।",
          ),
        },
        {
          speaker: "サントス",
          voice: "male",
          line: line(
            "そうですか。どうも。",
            [t("そうですか。 どうも。")],
            "sou desu ka. doumo.",
            "I see. Thanks.",
            "আচ্ছা। ধন্যবাদ।",
          ),
        },
      ],
    },
  },
  {
    id: "lesson-6",
    number: 6,
    title: "Eating & doing",
    titleJa: "だい6か",
    description:
      "Eat, drink, buy, invite someone, and make plans together.",
    patterns: [
      {
        n: 1,
        line: line(
          "わたしは本を読みます。",
          [t("わたしは "), k("本", "ほん"), t("を "), k("読", "よ"), t("みます。")],
          "watashi wa hon o yomimasu.",
          "I read a book.",
          "আমি বই পড়ি।",
        ),
      },
      {
        n: 2,
        line: line(
          "わたしは駅で新聞を買います。",
          [
            t("わたしは "),
            k("駅", "えき"),
            t("で "),
            k("新聞", "しんぶん"),
            t("を "),
            k("買", "か"),
            t("います。"),
          ],
          "watashi wa eki de shinbun o kaimasu.",
          "I buy a newspaper at the station.",
          "আমি স্টেশনে খবরের কাগজ কিনি।",
        ),
      },
      {
        n: 3,
        line: line(
          "いっしょに神戸へ行きませんか。",
          [
            t("いっしょに "),
            k("神戸", "こうべ"),
            t("へ "),
            k("行", "い"),
            t("きませんか。"),
          ],
          "issho ni Koube e ikimasen ka.",
          "Won't you go to Kobe with me?",
          "একসাথে কোবে যাবেন না?",
        ),
      },
      {
        n: 4,
        line: line(
          "ちょっと休みましょう。",
          [t("ちょっと "), k("休", "やす"), t("みましょう。")],
          "chotto yasumimashou.",
          "Let's take a short rest.",
          "একটু বিশ্রাম নিই।",
        ),
      },
    ],
    examples: [
      {
        n: 1,
        lines: [
          line(
            "お酒を飲みますか。",
            [t("お"), k("酒", "さけ"), t("を "), k("飲", "の"), t("みますか。")],
            "osake o nomimasu ka.",
            "Do you drink alcohol?",
            "আপনি কি মদ খান?",
          ),
          line(
            "いいえ、飲みません。",
            [t("……いいえ、"), k("飲", "の"), t("みません。")],
            "iie, nomimasen.",
            "No, I don't drink.",
            "না, খাই না।",
          ),
        ],
      },
      {
        n: 2,
        lines: [
          line(
            "毎朝何を食べますか。",
            [
              k("毎朝", "まいあさ"),
              t(" "),
              k("何", "なに"),
              t("を "),
              k("食", "た"),
              t("べますか。"),
            ],
            "maiasa nani o tabemasu ka.",
            "What do you eat every morning?",
            "প্রতি সকালে কী খান?",
          ),
          line(
            "パンと卵を食べます。",
            [
              t("……パンと "),
              k("卵", "たまご"),
              t("を "),
              k("食", "た"),
              t("べます。"),
            ],
            "pan to tamago o tabemasu.",
            "I eat bread and eggs.",
            "রুটি আর ডিম খাই।",
          ),
        ],
      },
      {
        n: 3,
        lines: [
          line(
            "けさ何を食べましたか。",
            [t("けさ "), k("何", "なに"), t("を "), k("食", "た"), t("べましたか。")],
            "kesa nani o tabemashita ka.",
            "What did you eat this morning?",
            "আজ সকালে কী খেয়েছেন?",
          ),
          line(
            "何も食べませんでした。",
            [
              t("……"),
              k("何", "なに"),
              t("も "),
              k("食", "た"),
              t("べませんでした。"),
            ],
            "nani mo tabemasen deshita.",
            "I didn't eat anything.",
            "কিছুই খাইনি।",
          ),
        ],
      },
      {
        n: 4,
        lines: [
          line(
            "土曜日何をしましたか。",
            [k("土曜日", "どようび"), t(" "), k("何", "なに"), t("を しましたか。")],
            "doyoubi nani o shimashita ka.",
            "What did you do on Saturday?",
            "শনিবার কী করেছেন?",
          ),
          line(
            "日本語を勉強しました。それから友達と映画を見ました。",
            [
              t("……"),
              k("日本語", "にほんご"),
              t("を "),
              k("勉強", "べんきょう"),
              t("しました。 それから "),
              k("友達", "ともだち"),
              t("と "),
              k("映画", "えいが"),
              t("を "),
              k("見", "み"),
              t("ました。"),
            ],
            "Nihongo o benkyou shimashita. sore kara tomodachi to eiga o mimashita.",
            "I studied Japanese. Then I watched a movie with a friend.",
            "জাপানি পড়েছি। তারপর বন্ধুর সাথে সিনেমা দেখেছি।",
          ),
        ],
      },
      {
        n: 5,
        lines: [
          line(
            "どこでそのかばんを買いましたか。",
            [t("どこで その かばんを "), k("買", "か"), t("いましたか。")],
            "doko de sono kaban o kaimashita ka.",
            "Where did you buy that bag?",
            "ওই ব্যাগটা কোথায় কিনেছেন?",
          ),
          line(
            "メキシコで買いました。",
            [t("……メキシコで "), k("買", "か"), t("いました。")],
            "Mekishiko de kaimashita.",
            "I bought it in Mexico.",
            "মেক্সিকোতে কিনেছি।",
          ),
        ],
      },
      {
        n: 6,
        lines: [
          line(
            "あしたテニスをしませんか。",
            [t("あした テニスを しませんか。")],
            "ashita tenisu o shimasen ka.",
            "Won't you play tennis tomorrow?",
            "কাল টেনিস খেলবেন না?",
          ),
          line(
            "ええ、いいですね。",
            [t("……ええ、いいですね。")],
            "ee, ii desu ne.",
            "Yes, that sounds good.",
            "হ্যাঁ, ভালো তো।",
          ),
        ],
      },
      {
        n: 7,
        lines: [
          line(
            "あした10時に駅で会いましょう。",
            [
              t("あした 10"),
              k("時", "じ"),
              t("に "),
              k("駅", "えき"),
              t("で "),
              k("会", "あ"),
              t("いましょう。"),
            ],
            "ashita juu-ji ni eki de aimashou.",
            "Let's meet at the station at 10 tomorrow.",
            "কাল ১০টায় স্টেশনে দেখা করি।",
          ),
          line(
            "わかりました。",
            [t("……わかりました。")],
            "wakarimashita.",
            "Understood.",
            "বুঝেছি।",
          ),
        ],
      },
    ],
    conversation: {
      title: "Won't you come along?",
      titleJa: "いっしょに 行きませんか",
      setting:
        "Sato invites Miller to go cherry-blossom viewing at Osaka Castle.",
      lines: [
        {
          speaker: "佐藤",
          speakerRuby: [k("佐藤", "さとう")],
          voice: "female",
          line: line(
            "ミラーさん。",
            [t("ミラーさん。")],
            "Miraa-san.",
            "Mr. Miller.",
            "মিলার-সান।",
          ),
        },
        {
          speaker: "ミラー",
          voice: "male",
          line: line(
            "何ですか。",
            [k("何", "なん"), t("ですか。")],
            "nan desu ka.",
            "What is it?",
            "কী?",
          ),
        },
        {
          speaker: "佐藤",
          speakerRuby: [k("佐藤", "さとう")],
          voice: "female",
          line: line(
            "あした友達とお花見をします。",
            [
              t("あした "),
              k("友達", "ともだち"),
              t("と お"),
              k("花見", "はなみ"),
              t("を します。"),
            ],
            "ashita tomodachi to ohanami o shimasu.",
            "Tomorrow I'm going cherry-blossom viewing with friends.",
            "কাল বন্ধুদের সাথে চেরি ফুল দেখতে যাব।",
          ),
        },
        {
          speaker: "佐藤",
          speakerRuby: [k("佐藤", "さとう")],
          voice: "female",
          line: line(
            "ミラーさんもいっしょに行きませんか。",
            [
              t("ミラーさんも いっしょに "),
              k("行", "い"),
              t("きませんか。"),
            ],
            "Miraa-san mo issho ni ikimasen ka.",
            "Won't you come along too, Mr. Miller?",
            "মিলার-সানও কি একসাথে যাবেন?",
          ),
        },
        {
          speaker: "ミラー",
          voice: "male",
          line: line(
            "いいですね。どこへ行きますか。",
            [t("いいですね。 どこへ "), k("行", "い"), t("きますか。")],
            "ii desu ne. doko e ikimasu ka.",
            "Sounds good. Where are you going?",
            "ভালো তো। কোথায় যাবেন?",
          ),
        },
        {
          speaker: "佐藤",
          speakerRuby: [k("佐藤", "さとう")],
          voice: "female",
          line: line(
            "大阪城です。",
            [k("大阪城", "おおさかじょう"), t("です。")],
            "Oosakajou desu.",
            "Osaka Castle.",
            "ওসাকা ক্যাসল।",
          ),
        },
        {
          speaker: "ミラー",
          voice: "male",
          line: line(
            "何時に行きますか。",
            [k("何時", "なんじ"), t("に "), k("行", "い"), t("きますか。")],
            "nanji ni ikimasu ka.",
            "What time are you going?",
            "কয়টায় যাবেন?",
          ),
        },
        {
          speaker: "佐藤",
          speakerRuby: [k("佐藤", "さとう")],
          voice: "female",
          line: line(
            "10時に大阪駅で会いましょう。",
            [
              t("10"),
              k("時", "じ"),
              t("に "),
              k("大阪駅", "おおさかえき"),
              t("で "),
              k("会", "あ"),
              t("いましょう。"),
            ],
            "juu-ji ni Oosaka-eki de aimashou.",
            "Let's meet at Osaka Station at 10.",
            "১০টায় ওসাকা স্টেশনে দেখা করি।",
          ),
        },
        {
          speaker: "ミラー",
          voice: "male",
          line: line(
            "わかりました。",
            [t("わかりました。")],
            "wakarimashita.",
            "Understood.",
            "বুঝেছি।",
          ),
        },
        {
          speaker: "佐藤",
          speakerRuby: [k("佐藤", "さとう")],
          voice: "female",
          line: line(
            "じゃ、またあした。",
            [t("じゃ、また あした。")],
            "ja, mata ashita.",
            "See you tomorrow then.",
            "তাহলে কাল দেখা হবে।",
          ),
        },
      ],
    },
  },
  {
    id: "lesson-7",
    number: 7,
    title: "Giving & receiving",
    titleJa: "だい7か",
    description:
      "あげる／もらう／送る, tools you use, and visiting a home.",
    patterns: [
      {
        n: 1,
        line: line(
          "わたしはパソコンで映画を見ます。",
          [
            t("わたしは パソコンで "),
            k("映画", "えいが"),
            t("を "),
            k("見", "み"),
            t("ます。"),
          ],
          "watashi wa pasokon de eiga o mimasu.",
          "I watch movies on the computer.",
          "আমি কম্পিউটারে সিনেমা দেখি।",
        ),
      },
      {
        n: 2,
        line: line(
          "わたしは木村さんに花をあげます。",
          [
            t("わたしは "),
            k("木村", "きむら"),
            t("さんに "),
            k("花", "はな"),
            t("を あげます。"),
          ],
          "watashi wa Kimura-san ni hana o agemasu.",
          "I give flowers to Ms. Kimura.",
          "আমি কিমুরা-সানকে ফুল দিই।",
        ),
      },
      {
        n: 3,
        line: line(
          "わたしはカリナさんにチョコレートをもらいました。",
          [t("わたしは カリナさんに チョコレートを もらいました。")],
          "watashi wa Karina-san ni chokoreeto o moraimashita.",
          "I received chocolate from Karina.",
          "আমি ক্যারিনা-সানের কাছ থেকে চকলেট পেয়েছি।",
          "に can also be から: カリナさんから.",
        ),
      },
      {
        n: 4,
        line: line(
          "わたしはもうメールを送りました。",
          [t("わたしは もう メールを "), k("送", "おく"), t("りました。")],
          "watashi wa mou meeru o okurimashita.",
          "I have already sent the email.",
          "আমি ইতিমধ্যে মেইল পাঠিয়েছি।",
        ),
      },
    ],
    examples: [
      {
        n: 1,
        lines: [
          line(
            "テレビで日本語を勉強しましたか。",
            [
              t("テレビで "),
              k("日本語", "にほんご"),
              t("を "),
              k("勉強", "べんきょう"),
              t("しましたか。"),
            ],
            "terebi de Nihongo o benkyou shimashita ka.",
            "Did you study Japanese on TV?",
            "টিভিতে জাপানি পড়েছেন?",
          ),
          line(
            "いいえ、ラジオで勉強しました。",
            [
              t("……いいえ、ラジオで "),
              k("勉強", "べんきょう"),
              t("しました。"),
            ],
            "iie, rajio de benkyou shimashita.",
            "No, I studied on the radio.",
            "না, রেডিওতে পড়েছি।",
          ),
        ],
      },
      {
        n: 2,
        lines: [
          line(
            "日本語でレポートを書きますか。",
            [
              k("日本語", "にほんご"),
              t("で レポートを "),
              k("書", "か"),
              t("きますか。"),
            ],
            "Nihongo de repooto o kakimasu ka.",
            "Will you write the report in Japanese?",
            "রিপোর্টটা কি জাপানিতে লিখবেন?",
          ),
          line(
            "いいえ、英語で書きます。",
            [
              t("……いいえ、"),
              k("英語", "えいご"),
              t("で "),
              k("書", "か"),
              t("きます。"),
            ],
            "iie, eigo de kakimasu.",
            "No, I'll write it in English.",
            "না, ইংরেজিতে লিখব।",
          ),
        ],
      },
      {
        n: 3,
        lines: [
          line(
            "Goodbyeは日本語で何ですか。",
            [
              t("\"Goodbye\"は "),
              k("日本語", "にほんご"),
              t("で "),
              k("何", "なん"),
              t("ですか。"),
            ],
            "Goodbye wa Nihongo de nan desu ka.",
            'What is "Goodbye" in Japanese?',
            "জাপানিতে Goodbye কী?",
          ),
          line(
            "さようならです。",
            [t("……「さようなら」です。")],
            "sayounara desu.",
            "It's 「さようなら」.",
            "「さようなら」。",
          ),
        ],
      },
      {
        n: 4,
        lines: [
          line(
            "だれに年賀状を書きますか。",
            [
              t("だれに "),
              k("年賀状", "ねんがじょう"),
              t("を "),
              k("書", "か"),
              t("きますか。"),
            ],
            "dare ni nengajou o kakimasu ka.",
            "Who will you write New Year's cards to?",
            "কাদের নববর্ষের কার্ড লিখবেন?",
          ),
          line(
            "先生と友達に書きます。",
            [
              t("……"),
              k("先生", "せんせい"),
              t("と "),
              k("友達", "ともだち"),
              t("に "),
              k("書", "か"),
              t("きます。"),
            ],
            "sensei to tomodachi ni kakimasu.",
            "I'll write to my teacher and friends.",
            "শিক্ষক আর বন্ধুদের লিখব।",
          ),
        ],
      },
      {
        n: 5,
        lines: [
          line(
            "それは何ですか。",
            [t("それは "), k("何", "なん"), t("ですか。")],
            "sore wa nan desu ka.",
            "What is that?",
            "ওটা কী?",
          ),
          line(
            "手帳です。山田さんにもらいました。",
            [
              t("……"),
              k("手帳", "てちょう"),
              t("です。 "),
              k("山田", "やまだ"),
              t("さんに もらいました。"),
            ],
            "techou desu. Yamada-san ni moraimashita.",
            "It's a personal organiser. I got it from Mr. Yamada.",
            "পকেট ডায়েরি। ইয়ামাদা-সানের কাছ থেকে পেয়েছি।",
          ),
        ],
      },
      {
        n: 6,
        lines: [
          line(
            "もう新幹線の切符を買いましたか。",
            [
              t("もう "),
              k("新幹線", "しんかんせん"),
              t("の "),
              k("切符", "きっぷ"),
              t("を "),
              k("買", "か"),
              t("いましたか。"),
            ],
            "mou shinkansen no kippu o kaimashita ka.",
            "Have you already bought the shinkansen ticket?",
            "শিঙ্কানসেনের টিকিট কি ইতিমধ্যে কিনেছেন?",
          ),
          line(
            "はい、もう買いました。",
            [t("……はい、もう "), k("買", "か"), t("いました。")],
            "hai, mou kaimashita.",
            "Yes, I already bought it.",
            "হ্যাঁ, ইতিমধ্যে কিনেছি।",
          ),
        ],
      },
      {
        n: 7,
        lines: [
          line(
            "もう昼ごはんを食べましたか。",
            [
              t("もう "),
              k("昼", "ひる"),
              t("ごはんを "),
              k("食", "た"),
              t("べましたか。"),
            ],
            "mou hirugohan o tabemashita ka.",
            "Have you already had lunch?",
            "দুপুরের খাবার কি ইতিমধ্যে খেয়েছেন?",
          ),
          line(
            "いいえ、まだです。これから食べます。",
            [
              t("……いいえ、まだです。 これから "),
              k("食", "た"),
              t("べます。"),
            ],
            "iie, mada desu. kore kara tabemasu.",
            "No, not yet. I'll eat now.",
            "না, এখনও না। এখন খাব।",
          ),
        ],
      },
    ],
    conversation: {
      title: "Come in",
      titleJa: "いらっしゃい",
      cd: "CD24",
      setting:
        "Jose Santos visits the Yamadas. Tomoko serves coffee to Maria.",
      lines: [
        {
          speaker: "山田一郎",
          speakerRuby: [k("山田", "やまだ"), k("一郎", "いちろう")],
          voice: "male",
          line: line(
            "はい。",
            [t("はい。")],
            "hai.",
            "Yes?",
            "হ্যাঁ?",
          ),
        },
        {
          speaker: "ジョゼ・サントス",
          voice: "male",
          line: line(
            "サントスです。",
            [t("サントスです。")],
            "Santosu desu.",
            "It's Santos.",
            "সান্তোস।",
          ),
        },
        {
          speaker: "山田一郎",
          speakerRuby: [k("山田", "やまだ"), k("一郎", "いちろう")],
          voice: "male",
          sceneBreak: true,
          line: line(
            "いらっしゃい。どうぞお上がりください。",
            [
              t("いらっしゃい。 どうぞ お"),
              k("上", "あ"),
              t("がり ください。"),
            ],
            "irasshai. douzo oagari kudasai.",
            "Come in. Please come up.",
            "আসুন। উপরে আসুন।",
            "Santos is now at the door.",
          ),
        },
        {
          speaker: "ジョゼ・サントス",
          voice: "male",
          line: line(
            "失礼します。",
            [k("失礼", "しつれい"), t("します。")],
            "shitsurei shimasu.",
            "Excuse me for coming in.",
            "অনুমতি নিয়ে ঢুকছি।",
          ),
        },
        {
          speaker: "山田友子",
          speakerRuby: [k("山田", "やまだ"), k("友子", "ともこ")],
          voice: "female",
          sceneBreak: true,
          line: line(
            "コーヒーはいかがですか。",
            [t("コーヒーは いかがですか。")],
            "koohii wa ikaga desu ka.",
            "Would you like some coffee?",
            "কফি নেবেন?",
            "Inside, Tomoko offers coffee.",
          ),
        },
        {
          speaker: "マリア・サントス",
          voice: "female",
          line: line(
            "ありがとうございます。",
            [t("ありがとう ございます。")],
            "arigatou gozaimasu.",
            "Thank you.",
            "ধন্যবাদ।",
          ),
        },
        {
          speaker: "山田友子",
          speakerRuby: [k("山田", "やまだ"), k("友子", "ともこ")],
          voice: "female",
          sceneBreak: true,
          line: line(
            "どうぞ。",
            [t("どうぞ。")],
            "douzo.",
            "Here you are.",
            "নিন।",
          ),
        },
        {
          speaker: "マリア・サントス",
          voice: "female",
          line: line(
            "いただきます。",
            [t("いただきます。")],
            "itadakimasu.",
            "Thank you for the food.",
            "খাচ্ছি, ধন্যবাদ।",
          ),
        },
        {
          speaker: "マリア・サントス",
          voice: "female",
          line: line(
            "このスプーン、すてきですね。",
            [t("この スプーン、すてきですね。")],
            "kono supuun, suteki desu ne.",
            "This spoon is lovely.",
            "এই চামচটা সুন্দর।",
          ),
        },
        {
          speaker: "山田友子",
          speakerRuby: [k("山田", "やまだ"), k("友子", "ともこ")],
          voice: "female",
          line: line(
            "ええ。会社の人にもらいました。",
            [
              t("ええ。 "),
              k("会社", "かいしゃ"),
              t("の "),
              k("人", "ひと"),
              t("に もらいました。"),
            ],
            "ee. kaisha no hito ni moraimashita.",
            "Yes. I got it from someone at the company.",
            "হ্যাঁ। অফিসের কারও কাছ থেকে পেয়েছি।",
          ),
        },
        {
          speaker: "山田友子",
          speakerRuby: [k("山田", "やまだ"), k("友子", "ともこ")],
          voice: "female",
          line: line(
            "メキシコのお土産です。",
            [t("メキシコの お"), k("土産", "みやげ"), t("です。")],
            "Mekishiko no omiyage desu.",
            "It's a souvenir from Mexico.",
            "মেক্সিকোর উপহার।",
          ),
        },
      ],
    },
  },
  {
    id: "lesson-8",
    number: 8,
    title: "Describing things",
    titleJa: "だい8か",
    description:
      "い-adjectives and な-adjectives, and leaving a friend's home.",
    patterns: [
      {
        n: 1,
        line: line(
          "桜はきれいです。",
          [k("桜", "さくら"), t("は きれいです。")],
          "sakura wa kirei desu.",
          "Cherry blossoms are beautiful.",
          "চেরি ফুল সুন্দর।",
        ),
      },
      {
        n: 2,
        line: line(
          "富士山は高いです。",
          [k("富士山", "ふじさん"), t("は "), k("高", "たか"), t("いです。")],
          "Fujisan wa takai desu.",
          "Mt. Fuji is tall.",
          "ফুজি পর্বত উঁচু।",
        ),
      },
      {
        n: 3,
        line: line(
          "桜はきれいな花です。",
          [
            k("桜", "さくら"),
            t("は きれいな "),
            k("花", "はな"),
            t("です。"),
          ],
          "sakura wa kirei na hana desu.",
          "Cherry blossoms are beautiful flowers.",
          "চেরি সুন্দর ফুল।",
        ),
      },
      {
        n: 4,
        line: line(
          "富士山は高い山です。",
          [
            k("富士山", "ふじさん"),
            t("は "),
            k("高", "たか"),
            t("い "),
            k("山", "やま"),
            t("です。"),
          ],
          "Fujisan wa takai yama desu.",
          "Mt. Fuji is a tall mountain.",
          "ফুজি একটি উঁচু পাহাড়।",
        ),
      },
    ],
    examples: [
      {
        n: 1,
        lines: [
          line(
            "大阪はにぎやかですか。",
            [k("大阪", "おおさか"), t("は にぎやかですか。")],
            "Oosaka wa nigiyaka desu ka.",
            "Is Osaka lively?",
            "ওসাকা কি ব্যস্ত-জমজমাট?",
          ),
          line(
            "はい、にぎやかです。",
            [t("……はい、にぎやかです。")],
            "hai, nigiyaka desu.",
            "Yes, it is lively.",
            "হ্যাঁ, জমজমাট।",
          ),
        ],
      },
      {
        n: 2,
        lines: [
          line(
            "さくら大学は有名ですか。",
            [
              t("さくら"),
              k("大学", "だいがく"),
              t("は "),
              k("有名", "ゆうめい"),
              t("ですか。"),
            ],
            "Sakura daigaku wa yuumei desu ka.",
            "Is Sakura University famous?",
            "সাকুরা বিশ্ববিদ্যালয় কি বিখ্যাত?",
          ),
          line(
            "いいえ、有名じゃありません。",
            [
              t("……いいえ、"),
              k("有名", "ゆうめい"),
              t("じゃ ありません。"),
            ],
            "iie, yuumei ja arimasen.",
            "No, it isn't famous.",
            "না, বিখ্যাত নয়।",
          ),
        ],
      },
      {
        n: 3,
        lines: [
          line(
            "ペキンは今寒いですか。",
            [
              t("ペキンは "),
              k("今", "いま"),
              t(" "),
              k("寒", "さむ"),
              t("いですか。"),
            ],
            "Pekin wa ima samui desu ka.",
            "Is Beijing cold now?",
            "বেইজিং এখন কি ঠান্ডা?",
          ),
          line(
            "はい、とても寒いです。",
            [t("……はい、とても "), k("寒", "さむ"), t("いです。")],
            "hai, totemo samui desu.",
            "Yes, it's very cold.",
            "হ্যাঁ, খুব ঠান্ডা।",
          ),
          line(
            "シャンハイも寒いですか。",
            [t("シャンハイも "), k("寒", "さむ"), t("いですか。")],
            "Shanhai mo samui desu ka.",
            "Is Shanghai cold too?",
            "সাংহাইও কি ঠান্ডা?",
          ),
          line(
            "いいえ、あまり寒くないです。",
            [t("……いいえ、あまり "), k("寒", "さむ"), t("くないです。")],
            "iie, amari samuku nai desu.",
            "No, it's not very cold.",
            "না, খুব একটা ঠান্ডা নয়।",
          ),
        ],
      },
      {
        n: 4,
        lines: [
          line(
            "大学の寮はどうですか。",
            [
              k("大学", "だいがく"),
              t("の "),
              k("寮", "りょう"),
              t("は どうですか。"),
            ],
            "daigaku no ryou wa dou desu ka.",
            "How is the university dormitory?",
            "বিশ্ববিদ্যালয়ের হোস্টেল কেমন?",
          ),
          line(
            "古いですが、便利です。",
            [
              t("……"),
              k("古", "ふる"),
              t("いですが、"),
              k("便利", "べんり"),
              t("です。"),
            ],
            "furui desu ga, benri desu.",
            "It's old, but convenient.",
            "পুরোনো, তবে সুবিধাজনক।",
          ),
        ],
      },
      {
        n: 5,
        lines: [
          line(
            "きのう松本さんのうちへ行きました。",
            [
              t("きのう "),
              k("松本", "まつもと"),
              t("さんの うちへ "),
              k("行", "い"),
              t("きました。"),
            ],
            "kinou Matsumoto-san no uchi e ikimashita.",
            "I went to Mr. Matsumoto's house yesterday.",
            "গতকাল মাৎসুমোতো-সানের বাড়িতে গিয়েছি।",
          ),
          line(
            "どんなうちですか。",
            [t("……どんな うちですか。")],
            "donna uchi desu ka.",
            "What kind of house is it?",
            "কেমন বাড়ি?",
          ),
          line(
            "きれいなうちです。そして、大きいうちです。",
            [
              t("きれいな うちです。 そして、"),
              k("大", "おお"),
              t("きい うちです。"),
            ],
            "kirei na uchi desu. soshite, ookii uchi desu.",
            "It's a beautiful house. And it's a big house.",
            "সুন্দর বাড়ি। আর বড়ও।",
          ),
        ],
      },
      {
        n: 6,
        lines: [
          line(
            "きのうおもしろい映画を見ました。",
            [
              t("きのう おもしろい "),
              k("映画", "えいが"),
              t("を "),
              k("見", "み"),
              t("ました。"),
            ],
            "kinou omoshiroi eiga o mimashita.",
            "I watched an interesting movie yesterday.",
            "গতকাল মজার সিনেমা দেখেছি।",
          ),
          line(
            "何を見ましたか。",
            [t("……"), k("何", "なに"), t("を "), k("見", "み"), t("ましたか。")],
            "nani o mimashita ka.",
            "What did you watch?",
            "কী দেখেছেন?",
          ),
          line(
            "七人の侍です。",
            [
              t("「"),
              k("七人", "しちにん"),
              t("の "),
              k("侍", "さむらい"),
              t("」です。"),
            ],
            "Shichinin no Samurai desu.",
            "It's Seven Samurai.",
            "সেভেন সামুরাই।",
          ),
        ],
      },
    ],
    conversation: {
      title: "We should be going",
      titleJa: "そろそろ 失礼します",
      cd: "CD28",
      setting:
        "After coffee at the Yamadas', the Santoses talk about life in Japan, then leave.",
      lines: [
        {
          speaker: "山田一郎",
          speakerRuby: [k("山田", "やまだ"), k("一郎", "いちろう")],
          voice: "male",
          line: line(
            "マリアさん、日本の生活はどうですか。",
            [
              t("マリアさん、"),
              k("日本", "にほん"),
              t("の "),
              k("生活", "せいかつ"),
              t("は どうですか。"),
            ],
            "Maria-san, Nihon no seikatsu wa dou desu ka.",
            "Maria, how is life in Japan?",
            "মারিয়া-সান, জাপানের জীবন কেমন?",
          ),
        },
        {
          speaker: "マリア・サントス",
          voice: "female",
          line: line(
            "毎日とても楽しいです。",
            [
              k("毎日", "まいにち"),
              t(" とても "),
              k("楽", "たの"),
              t("しいです。"),
            ],
            "mainichi totemo tanoshii desu.",
            "Every day is a lot of fun.",
            "প্রতিদিন খুব মজা।",
          ),
        },
        {
          speaker: "山田一郎",
          speakerRuby: [k("山田", "やまだ"), k("一郎", "いちろう")],
          voice: "male",
          line: line(
            "そうですか。サントスさん、お仕事はどうですか。",
            [
              t("そうですか。 サントスさん、お"),
              k("仕事", "しごと"),
              t("は どうですか。"),
            ],
            "sou desu ka. Santosu-san, oshigoto wa dou desu ka.",
            "I see. Santos, how is work?",
            "আচ্ছা। সান্তোস-সান, কাজ কেমন?",
          ),
        },
        {
          speaker: "ジョゼ・サントス",
          voice: "male",
          line: line(
            "そうですね。忙しいですが、おもしろいです。",
            [
              t("そうですね。 "),
              k("忙", "いそが"),
              t("しいですが、おもしろいです。"),
            ],
            "sou desu ne. isogashii desu ga, omoshiroi desu.",
            "Well, it's busy, but interesting.",
            "হ্যাঁ, ব্যস্ত, তবে মজার।",
          ),
        },
        {
          speaker: "山田友子",
          speakerRuby: [k("山田", "やまだ"), k("友子", "ともこ")],
          voice: "female",
          sceneBreak: true,
          line: line(
            "コーヒー、もう一杯いかがですか。",
            [t("コーヒー、もう "), k("一杯", "いっぱい"), t(" いかがですか。")],
            "koohii, mou ippai ikaga desu ka.",
            "Would you like another cup of coffee?",
            "আরেক কাপ কফি নেবেন?",
          ),
        },
        {
          speaker: "マリア・サントス",
          voice: "female",
          line: line(
            "いいえ、けっこうです。",
            [t("いいえ、けっこうです。")],
            "iie, kekkou desu.",
            "No, I'm fine, thank you.",
            "না, থাক।",
          ),
        },
        {
          speaker: "ジョゼ・サントス",
          voice: "male",
          sceneBreak: true,
          line: line(
            "あ、もう6時ですね。そろそろ失礼します。",
            [
              t("あ、もう 6"),
              k("時", "じ"),
              t("ですね。 そろそろ "),
              k("失礼", "しつれい"),
              t("します。"),
            ],
            "a, mou roku-ji desu ne. sorosoro shitsurei shimasu.",
            "Oh, it's already 6. We should be going.",
            "ওহ, ইতিমধ্যে ৬টা। আমরা উঠি।",
          ),
        },
        {
          speaker: "山田一郎",
          speakerRuby: [k("山田", "やまだ"), k("一郎", "いちろう")],
          voice: "male",
          line: line(
            "そうですか。",
            [t("そうですか。")],
            "sou desu ka.",
            "Is that so.",
            "আচ্ছা।",
          ),
        },
        {
          speaker: "マリア・サントス",
          voice: "female",
          line: line(
            "きょうはどうもありがとうございました。",
            [t("きょうは どうも ありがとう ございました。")],
            "kyou wa doumo arigatou gozaimashita.",
            "Thank you very much for today.",
            "আজকের জন্য অনেক ধন্যবাদ।",
          ),
        },
        {
          speaker: "山田友子",
          speakerRuby: [k("山田", "やまだ"), k("友子", "ともこ")],
          voice: "female",
          line: line(
            "いいえ。またいらっしゃってください。",
            [t("いいえ。 また いらっしゃって ください。")],
            "iie. mata irasshatte kudasai.",
            "Not at all. Please come again.",
            "কিছু না। আবার আসবেন।",
          ),
        },
      ],
    },
  },
  {
    id: "lesson-9",
    number: 9,
    title: "Likes & reasons",
    titleJa: "だい9か",
    description:
      "好き／上手／わかる, から reasons, and turning down an invitation.",
    patterns: [
      {
        n: 1,
        line: line(
          "わたしはイタリア料理が好きです。",
          [
            t("わたしは イタリア"),
            k("料理", "りょうり"),
            t("が "),
            k("好", "す"),
            t("きです。"),
          ],
          "watashi wa Itaria ryouri ga suki desu.",
          "I like Italian food.",
          "আমি ইতালিয়ান খাবার পছন্দ করি।",
        ),
      },
      {
        n: 2,
        line: line(
          "わたしは日本語が少しわかります。",
          [
            t("わたしは "),
            k("日本語", "にほんご"),
            t("が "),
            k("少", "すこ"),
            t("し わかります。"),
          ],
          "watashi wa Nihongo ga sukoshi wakarimasu.",
          "I understand a little Japanese.",
          "আমি একটু জাপানি বুঝি।",
        ),
      },
      {
        n: 3,
        line: line(
          "きょうは子どもの誕生日ですから、早く帰ります。",
          [
            t("きょうは "),
            k("子", "こ"),
            t("どもの "),
            k("誕生日", "たんじょうび"),
            t("ですから、"),
            k("早", "はや"),
            t("く "),
            k("帰", "かえ"),
            t("ります。"),
          ],
          "kyou wa kodomo no tanjoubi desu kara, hayaku kaerimasu.",
          "I'll go home early because it's my child's birthday today.",
          "আজ সন্তানের জন্মদিন, তাই তাড়াতাড়ি ফিরব।",
        ),
      },
    ],
    examples: [
      {
        n: 1,
        lines: [
          line(
            "お酒が好きですか。",
            [t("お"), k("酒", "さけ"), t("が "), k("好", "す"), t("きですか。")],
            "osake ga suki desu ka.",
            "Do you like alcohol?",
            "মদ পছন্দ করেন?",
          ),
          line(
            "いいえ、好きじゃありません。",
            [
              t("……いいえ、"),
              k("好", "す"),
              t("きじゃ ありません。"),
            ],
            "iie, suki ja arimasen.",
            "No, I don't like it.",
            "না, পছন্দ করি না।",
          ),
        ],
      },
      {
        n: 2,
        lines: [
          line(
            "どんなスポーツが好きですか。",
            [t("どんな スポーツが "), k("好", "す"), t("きですか。")],
            "donna supootsu ga suki desu ka.",
            "What kind of sports do you like?",
            "কোন খেলা পছন্দ করেন?",
          ),
          line(
            "サッカーが好きです。",
            [t("……サッカーが "), k("好", "す"), t("きです。")],
            "sakkaa ga suki desu.",
            "I like soccer.",
            "ফুটবল পছন্দ করি।",
          ),
        ],
      },
      {
        n: 3,
        lines: [
          line(
            "カリナさんは絵が上手ですか。",
            [
              t("カリナさんは "),
              k("絵", "え"),
              t("が "),
              k("上手", "じょうず"),
              t("ですか。"),
            ],
            "Karina-san wa e ga jouzu desu ka.",
            "Is Karina good at drawing?",
            "ক্যারিনা-সান কি ছবি আঁকতে পারদর্শী?",
          ),
          line(
            "はい、とても上手です。",
            [
              t("……はい、[カリナさんは] とても "),
              k("上手", "じょうず"),
              t("です。"),
            ],
            "hai, [Karina-san wa] totemo jouzu desu.",
            "Yes, she is very good.",
            "হ্যাঁ, খুব পারদর্শী।",
          ),
        ],
      },
      {
        n: 4,
        lines: [
          line(
            "田中さんはインドネシア語がわかりますか。",
            [
              k("田中", "たなか"),
              t("さんは インドネシア"),
              k("語", "ご"),
              t("が わかりますか。"),
            ],
            "Tanaka-san wa Indoneshia-go ga wakarimasu ka.",
            "Does Mr. Tanaka understand Indonesian?",
            "তানাকা-সান কি ইন্দোনেশীয় বোঝেন?",
          ),
          line(
            "いいえ、全然わかりません。",
            [t("……いいえ、"), k("全然", "ぜんぜん"), t(" わかりません。")],
            "iie, zenzen wakarimasen.",
            "No, not at all.",
            "না, একেবারেই বুঝি না।",
          ),
        ],
      },
      {
        n: 5,
        lines: [
          line(
            "細かいお金がありますか。",
            [
              k("細", "こま"),
              t("かい お"),
              k("金", "かね"),
              t("が ありますか。"),
            ],
            "komakai okane ga arimasu ka.",
            "Do you have small change?",
            "খুচরা টাকা আছে?",
          ),
          line(
            "いいえ、ありません。",
            [t("……いいえ、ありません。")],
            "iie, arimasen.",
            "No, I don't.",
            "না, নেই।",
          ),
        ],
      },
      {
        n: 6,
        lines: [
          line(
            "毎朝新聞を読みますか。",
            [
              k("毎朝", "まいあさ"),
              t(" "),
              k("新聞", "しんぶん"),
              t("を "),
              k("読", "よ"),
              t("みますか。"),
            ],
            "maiasa shinbun o yomimasu ka.",
            "Do you read the newspaper every morning?",
            "প্রতি সকালে খবরের কাগজ পড়েন?",
          ),
          line(
            "いいえ、時間がありませんから、読みません。",
            [
              t("……いいえ、"),
              k("時間", "じかん"),
              t("が ありませんから、"),
              k("読", "よ"),
              t("みません。"),
            ],
            "iie, jikan ga arimasen kara, yomimasen.",
            "No, I don't have time, so I don't read it.",
            "না, সময় নেই তাই পড়ি না।",
          ),
        ],
      },
      {
        n: 7,
        lines: [
          line(
            "どうしてきのう早く帰りましたか。",
            [
              t("どうして きのう "),
              k("早", "はや"),
              t("く "),
              k("帰", "かえ"),
              t("りましたか。"),
            ],
            "doushite kinou hayaku kaerimashita ka.",
            "Why did you go home early yesterday?",
            "গতকাল কেন তাড়াতাড়ি ফিরেছিলেন?",
          ),
          line(
            "用事がありましたから。",
            [t("……"), k("用事", "ようじ"), t("が ありましたから。")],
            "youji ga arimashita kara.",
            "Because I had an errand.",
            "কাজ ছিল বলে।",
          ),
        ],
      },
    ],
    conversation: {
      title: "I'm afraid I can't",
      titleJa: "残念ですが",
      setting:
        "Miller phones Kimura to invite him to a classical concert, but Friday evening is taken.",
      lines: [
        {
          speaker: "木村",
          speakerRuby: [k("木村", "きむら")],
          voice: "male",
          line: line(
            "はい。",
            [t("はい。")],
            "hai.",
            "Hello?",
            "হ্যাঁ?",
          ),
        },
        {
          speaker: "ミラー",
          voice: "male",
          line: line(
            "木村さんですか。ミラーです。",
            [k("木村", "きむら"), t("さんですか。 ミラーです。")],
            "Kimura-san desu ka. Miraa desu.",
            "Is this Mr. Kimura? It's Miller.",
            "কিমুরা-সান? আমি মিলার।",
          ),
        },
        {
          speaker: "木村",
          speakerRuby: [k("木村", "きむら")],
          voice: "male",
          line: line(
            "ああ、ミラーさん、こんばんは。お元気ですか。",
            [
              t("ああ、ミラーさん、こんばんは。 お"),
              k("元気", "げんき"),
              t("ですか。"),
            ],
            "aa, Miraa-san, konbanwa. ogenki desu ka.",
            "Ah, Mr. Miller, good evening. How are you?",
            "আহ, মিলার-সান, সন্ধ্যা। কেমন আছেন?",
          ),
        },
        {
          speaker: "ミラー",
          voice: "male",
          line: line(
            "ええ、元気です。",
            [t("ええ、"), k("元気", "げんき"), t("です。")],
            "ee, genki desu.",
            "Yes, I'm well.",
            "হ্যাঁ, ভালো আছি।",
          ),
        },
        {
          speaker: "ミラー",
          voice: "male",
          line: line(
            "あのう、木村さん、クラシックのコンサート、いっしょにいかがですか。",
            [
              t("あのう、"),
              k("木村", "きむら"),
              t("さん、クラシックの コンサート、いっしょに いかがですか。"),
            ],
            "anou, Kimura-san, kurashikku no konsaato, issho ni ikaga desu ka.",
            "Um, Mr. Kimura, would you like to go to a classical concert together?",
            "ওহ, কিমুরা-সান, ক্লাসিক্যাল কনসার্টে একসাথে যাবেন?",
          ),
        },
        {
          speaker: "木村",
          speakerRuby: [k("木村", "きむら")],
          voice: "male",
          line: line(
            "いいですね。いつですか。",
            [t("いいですね。 いつですか。")],
            "ii desu ne. itsu desu ka.",
            "That sounds good. When is it?",
            "ভালো তো। কবে?",
          ),
        },
        {
          speaker: "ミラー",
          voice: "male",
          line: line(
            "来週の金曜日の晩です。",
            [
              k("来週", "らいしゅう"),
              t("の "),
              k("金曜日", "きんようび"),
              t("の "),
              k("晩", "ばん"),
              t("です。"),
            ],
            "raishuu no kinyoubi no ban desu.",
            "Next Friday evening.",
            "আগামী শুক্রবার সন্ধ্যায়।",
          ),
        },
        {
          speaker: "木村",
          speakerRuby: [k("木村", "きむら")],
          voice: "male",
          line: line(
            "金曜日ですか。",
            [k("金曜日", "きんようび"), t("ですか。")],
            "kinyoubi desu ka.",
            "Friday?",
            "শুক্রবার?",
          ),
        },
        {
          speaker: "木村",
          speakerRuby: [k("木村", "きむら")],
          voice: "male",
          line: line(
            "金曜日の晩はちょっと……。",
            [
              k("金曜日", "きんようび"),
              t("の "),
              k("晩", "ばん"),
              t("は ちょっと……。"),
            ],
            "kinyoubi no ban wa chotto…",
            "Friday evening is a bit…",
            "শুক্রবার সন্ধ্যা একটু…",
          ),
        },
        {
          speaker: "ミラー",
          voice: "male",
          line: line(
            "だめですか。",
            [t("だめですか。")],
            "dame desu ka.",
            "Is it no good?",
            "কি সম্ভব নয়?",
          ),
        },
        {
          speaker: "木村",
          speakerRuby: [k("木村", "きむら")],
          voice: "male",
          line: line(
            "ええ、残念ですが、友達と約束がありますから、……。",
            [
              t("ええ、"),
              k("残念", "ざんねん"),
              t("ですが、"),
              k("友達", "ともだち"),
              t("と "),
              k("約束", "やくそく"),
              t("が ありますから、……。"),
            ],
            "ee, zannen desu ga, tomodachi to yakusoku ga arimasu kara…",
            "Yes, I'm afraid I have plans with a friend, so…",
            "হ্যাঁ, দুঃখিত, বন্ধুর সাথে অঙ্গীকার আছে তাই…",
          ),
        },
        {
          speaker: "ミラー",
          voice: "male",
          line: line(
            "そうですか。",
            [t("そうですか。")],
            "sou desu ka.",
            "I see.",
            "আচ্ছা।",
          ),
        },
        {
          speaker: "木村",
          speakerRuby: [k("木村", "きむら")],
          voice: "male",
          line: line(
            "ええ。また今度お願いします。",
            [
              t("ええ。 また "),
              k("今度", "こんど"),
              t(" お"),
              k("願", "ねが"),
              t("いします。"),
            ],
            "ee. mata kondo onegaishimasu.",
            "Yes. Please ask me another time.",
            "হ্যাঁ। পরের বার বলবেন।",
          ),
        },
      ],
    },
  },
  {
    id: "lesson-10",
    number: 10,
    title: "There is / there are",
    titleJa: "だい10か",
    description:
      "あります／います, where things and people are, and finding nam pla.",
    patterns: [
      {
        n: 1,
        line: line(
          "あそこにコンビニがあります。",
          [t("あそこに コンビニが あります。")],
          "asoko ni konbini ga arimasu.",
          "There's a convenience store over there.",
          "ওদিকে কনবিনি আছে।",
        ),
      },
      {
        n: 2,
        line: line(
          "ロビーに佐藤さんがいます。",
          [t("ロビーに "), k("佐藤", "さとう"), t("さんが います。")],
          "robii ni Satou-san ga imasu.",
          "Ms. Sato is in the lobby.",
          "লবিতে সাতো-সান আছেন।",
        ),
      },
      {
        n: 3,
        line: line(
          "東京ディズニーランドは千葉県にあります。",
          [
            k("東京", "とうきょう"),
            t("ディズニーランドは "),
            k("千葉県", "ちばけん"),
            t("に あります。"),
          ],
          "Toukyou Dizuniirando wa Chiba-ken ni arimasu.",
          "Tokyo Disneyland is in Chiba Prefecture.",
          "টোকিও ডিজনিল্যান্ড চিবা প্রিফেকচারে আছে।",
        ),
      },
      {
        n: 4,
        line: line(
          "家族はニューヨークにいます。",
          [k("家族", "かぞく"), t("は ニューヨークに います。")],
          "kazoku wa Nyuuyooku ni imasu.",
          "My family is in New York.",
          "আমার পরিবার নিউইয়র্কে আছে।",
        ),
      },
    ],
    examples: [
      {
        n: 1,
        lines: [
          line(
            "このビルにATMがありますか。",
            [t("この ビルに ATMが ありますか。")],
            "kono biru ni eetiiemu ga arimasu ka.",
            "Is there an ATM in this building?",
            "এই বিল্ডিংয়ে ATM আছে?",
          ),
          line(
            "はい、2階にあります。",
            [t("……はい、2"), k("階", "かい"), t("に あります。")],
            "hai, ni-kai ni arimasu.",
            "Yes, it's on the second floor.",
            "হ্যাঁ, দ্বিতীয় তলায় আছে।",
          ),
        ],
      },
      {
        n: 2,
        lines: [
          line(
            "あそこに男の人がいますね。あの人はだれですか。",
            [
              t("あそこに "),
              k("男", "おとこ"),
              t("の "),
              k("人", "ひと"),
              t("が いますね。 あの "),
              k("人", "ひと"),
              t("は だれですか。"),
            ],
            "asoko ni otoko no hito ga imasu ne. ano hito wa dare desu ka.",
            "There's a man over there, isn't there. Who is that person?",
            "ওদিকে একজন পুরুষ আছেন। তিনি কে?",
          ),
          line(
            "IMCの松本さんです。",
            [t("……IMCの "), k("松本", "まつもと"), t("さんです。")],
            "IMC no Matsumoto-san desu.",
            "That's Mr. Matsumoto from IMC.",
            "IMC-এর মাৎসুমোতো-সান।",
          ),
        ],
      },
      {
        n: 3,
        lines: [
          line(
            "庭にだれがいますか。",
            [k("庭", "にわ"), t("に だれが いますか。")],
            "niwa ni dare ga imasu ka.",
            "Who is in the garden?",
            "বাগানে কে আছে?",
          ),
          line(
            "だれもいません。猫がいます。",
            [
              t("……だれも いません。 "),
              k("猫", "ねこ"),
              t("が います。"),
            ],
            "dare mo imasen. neko ga imasu.",
            "Nobody is there. There's a cat.",
            "কেউ নেই। বিড়াল আছে।",
          ),
        ],
      },
      {
        n: 4,
        lines: [
          line(
            "箱の中に何がありますか。",
            [
              k("箱", "はこ"),
              t("の "),
              k("中", "なか"),
              t("に "),
              k("何", "なに"),
              t("が ありますか。"),
            ],
            "hako no naka ni nani ga arimasu ka.",
            "What's in the box?",
            "বাক্সে কী আছে?",
          ),
          line(
            "古い手紙や写真などがあります。",
            [
              t("……"),
              k("古", "ふる"),
              t("い "),
              k("手紙", "てがみ"),
              t("や "),
              k("写真", "しゃしん"),
              t("[など]が あります。"),
            ],
            "furui tegami ya shashin [nado] ga arimasu.",
            "There are old letters and photos, among other things.",
            "পুরোনো চিঠি আর ছবি ইত্যাদি আছে।",
          ),
        ],
      },
      {
        n: 5,
        lines: [
          line(
            "郵便局はどこにありますか。",
            [k("郵便局", "ゆうびんきょく"), t("は どこに ありますか。")],
            "yuubinkyoku wa doko ni arimasu ka.",
            "Where is the post office?",
            "পোস্ট অফিস কোথায়?",
          ),
          line(
            "駅の近くです。銀行の前にあります。",
            [
              t("……"),
              k("駅", "えき"),
              t("の "),
              k("近", "ちか"),
              t("くです。 "),
              k("銀行", "ぎんこう"),
              t("の "),
              k("前", "まえ"),
              t("に あります。"),
            ],
            "eki no chikaku desu. ginkou no mae ni arimasu.",
            "It's near the station. It's in front of the bank.",
            "স্টেশনের কাছে। ব্যাংকের সামনে আছে।",
          ),
        ],
      },
      {
        n: 6,
        lines: [
          line(
            "ミラーさんはどこにいますか。",
            [t("ミラーさんは どこに いますか。")],
            "Miraa-san wa doko ni imasu ka.",
            "Where is Mr. Miller?",
            "মিলার-সান কোথায়?",
          ),
          line(
            "会議室にいます。",
            [t("……"), k("会議室", "かいぎしつ"), t("に います。")],
            "kaigishitsu ni imasu.",
            "He's in the meeting room.",
            "মিটিং রুমে আছেন।",
          ),
        ],
      },
    ],
    conversation: {
      title: "Do you have nam pla?",
      titleJa: "ナンプラー、ありますか",
      setting:
        "Miller asks for Asia Store, then finds nam pla on the bottom shelf of the Thai-food aisle.",
      lines: [
        {
          speaker: "ミラー",
          voice: "male",
          line: line(
            "すみません。アジアストアはどこですか。",
            [t("すみません。 アジアストアは どこですか。")],
            "sumimasen. Ajia Sutoa wa doko desu ka.",
            "Excuse me. Where is Asia Store?",
            "দুঃখিত। এশিয়া স্টোর কোথায়?",
          ),
        },
        {
          speaker: "女の人",
          speakerRuby: [k("女", "おんな"), t("の"), k("人", "ひと")],
          voice: "female",
          line: line(
            "アジアストアですか。",
            [t("アジアストアですか。")],
            "Ajia Sutoa desu ka.",
            "Asia Store?",
            "এশিয়া স্টোর?",
          ),
        },
        {
          speaker: "女の人",
          speakerRuby: [k("女", "おんな"), t("の"), k("人", "ひと")],
          voice: "female",
          line: line(
            "あそこに白いビルがありますね。",
            [
              t("あそこに "),
              k("白", "しろ"),
              t("い ビルが ありますね。"),
            ],
            "asoko ni shiroi biru ga arimasu ne.",
            "There's a white building over there.",
            "ওদিকে সাদা বিল্ডিং আছে।",
          ),
        },
        {
          speaker: "女の人",
          speakerRuby: [k("女", "おんな"), t("の"), k("人", "ひと")],
          voice: "female",
          line: line(
            "あのビルの中です。",
            [t("あの ビルの "), k("中", "なか"), t("です。")],
            "ano biru no naka desu.",
            "It's inside that building.",
            "ওই বিল্ডিংয়ের ভিতরে।",
          ),
        },
        {
          speaker: "ミラー",
          voice: "male",
          line: line(
            "そうですか。どうもすみません。",
            [t("そうですか。 どうも すみません。")],
            "sou desu ka. doumo sumimasen.",
            "I see. Thank you.",
            "আচ্ছা। ধন্যবাদ।",
          ),
        },
        {
          speaker: "女の人",
          speakerRuby: [k("女", "おんな"), t("の"), k("人", "ひと")],
          voice: "female",
          line: line(
            "いいえ。",
            [t("いいえ。")],
            "iie.",
            "Not at all.",
            "কিছু না।",
          ),
        },
        {
          speaker: "ミラー",
          voice: "male",
          sceneBreak: true,
          line: line(
            "あのう、ナンプラー、ありますか。",
            [t("あのう、ナンプラー、ありますか。")],
            "anou, nanpuraa, arimasu ka.",
            "Um, do you have nam pla?",
            "ওহ, নাম প্লা আছে?",
            "Miller is now at the register.",
          ),
        },
        {
          speaker: "店員",
          speakerRuby: [k("店員", "てんいん")],
          voice: "female",
          line: line(
            "はい。",
            [t("はい。")],
            "hai.",
            "Yes.",
            "হ্যাঁ।",
          ),
        },
        {
          speaker: "店員",
          speakerRuby: [k("店員", "てんいん")],
          voice: "female",
          line: line(
            "あちらにタイ料理のコーナーがあります。",
            [
              t("あちらに タイ"),
              k("料理", "りょうり"),
              t("の コーナーが あります。"),
            ],
            "achira ni Tai ryouri no koonaa ga arimasu.",
            "There's a Thai-food section over that way.",
            "ওদিকে থাই খাবারের কর্নার আছে।",
          ),
        },
        {
          speaker: "店員",
          speakerRuby: [k("店員", "てんいん")],
          voice: "female",
          line: line(
            "ナンプラーはいちばん下です。",
            [t("ナンプラーは いちばん "), k("下", "した"), t("です。")],
            "nanpuraa wa ichiban shita desu.",
            "Nam pla is on the bottom shelf.",
            "নাম প্লা একদম নিচে।",
          ),
        },
        {
          speaker: "ミラー",
          voice: "male",
          line: line(
            "わかりました。どうも。",
            [t("わかりました。 どうも。")],
            "wakarimashita. doumo.",
            "Got it. Thanks.",
            "বুঝেছি। ধন্যবাদ।",
          ),
        },
      ],
    },
  },
  ...READING_LESSONS_11_20,
  ...READING_LESSONS_14_20,
];

export function getReadingLesson(id: string) {
  return READING_LESSONS.find((l) => l.id === id);
}
