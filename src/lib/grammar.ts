import { GRAMMAR_POINTS as GRAMMAR_CORE } from "./grammar-n5";
import { GRAMMAR_POINTS_REST } from "./grammar-n5-rest";

export type GrammarExample = {
  jp: string;
  romaji: string;
  meaning: string;
  bn: string;
};

export type GrammarPoint = {
  n: number;
  phase: number;
  pattern: string;
  meaning: string;
  bn: string;
  form: string;
  examples: GrammarExample[];
  note?: string;
};

export type GrammarCue = {
  jp?: string;
  bn?: string;
  en?: string;
};

export type GrammarPhase = {
  number: number;
  title: string;
  blurb: string;
};

export const GRAMMAR_PHASES: GrammarPhase[] = [
  { number: 1, title: "Topic and the copula", blurb: "は, です, questions, and sentence endings" },
  { number: 2, title: "This, that, who, what", blurb: "これ, この, ここ, だれ, なに" },
  { number: 3, title: "Place, time, direction", blurb: "に, へ, で, を, と, から, まで" },
  { number: 4, title: "Lists, existence, adjectives", blurb: "と, や, あります, い and な adjectives" },
  { number: 5, title: "Describing things", blurb: "Modifiers, すぎる, 好き, 上手" },
  { number: 6, title: "Verb forms", blurb: "ます, dictionary, ない, た, て, する, 来る" },
  { number: 7, title: "Ongoing actions and time", blurb: "ている, てから, 前に, とき, ごろ" },
  { number: 8, title: "Want, let's, please", blurb: "たい, ほしい, ましょう, てください" },
  { number: 9, title: "May and must", blurb: "てもいい, てはいけない, なくてはいけない" },
  { number: 10, title: "Experience and giving", blurb: "たことがある, たり, のが好き, あげる" },
  { number: 11, title: "Compare and because", blurb: "より, 一番, だけ, から, ので" },
  { number: 12, title: "But, so, explanation", blurb: "が, けど, だから, そして, んです" },
];

export const GRAMMAR_POINTS = [...GRAMMAR_CORE, ...GRAMMAR_POINTS_REST];

export function grammarId(n: number) {
  return `g${String(n).padStart(3, "0")}`;
}

export function getGrammarPoint(id: string): GrammarPoint | undefined {
  const n = Number(id.replace(/^g/i, ""));
  return GRAMMAR_POINTS.find((point) => point.n === n);
}

export function pointsInPhase(phase: number) {
  return GRAMMAR_POINTS.filter((point) => point.phase === phase);
}

/** Lesson order: pattern, form, note, then each example — the way a spoken lesson moves. */
export function grammarCues(point: GrammarPoint): GrammarCue[] {
  const cues: GrammarCue[] = [
    { jp: point.pattern, bn: point.bn, en: point.meaning },
    { jp: point.form, bn: "এইভাবে গঠন হয়।" },
  ];
  if (point.note) cues.push({ en: point.note });
  cues.push({ bn: "উদাহরণ শুনুন।" });
  for (const example of point.examples) {
    cues.push({ jp: example.jp, bn: example.bn, en: example.meaning });
  }
  return cues;
}
