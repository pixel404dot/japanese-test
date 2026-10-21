import { writeFileSync } from "node:fs";
import { VOCAB_LESSONS } from "../src/lib/vocab.ts";
import { MONEY_LESSON, NUMERALS_LESSON } from "../src/lib/numbers.ts";

function slim(lesson) {
  return {
    id: lesson.id,
    number: lesson.number,
    title: lesson.title,
    titleJa: lesson.titleJa,
    description: lesson.description,
    wordCount: lesson.words.length,
    phraseCount: lesson.words.filter((word) => word.kind === "phrase").length,
    keys: lesson.words.map((word) => word.jp),
  };
}

const lessons = VOCAB_LESSONS.map(slim);
const appendix = [NUMERALS_LESSON, MONEY_LESSON].map(slim);
const file = `// Slim lesson list for home and the vocabulary index. Full words load when a lesson opens.
export type VocabIndexLesson = {
  id: string;
  number: number;
  title: string;
  titleJa: string;
  description: string;
  wordCount: number;
  phraseCount: number;
  keys: string[];
};

export const VOCAB_INDEX: VocabIndexLesson[] = ${JSON.stringify(lessons, null, 2)};

export const APPENDIX_INDEX: VocabIndexLesson[] = ${JSON.stringify(appendix, null, 2)};
`;

writeFileSync(new URL("../src/lib/vocab-index.ts", import.meta.url), file);
const words = lessons.reduce((n, lesson) => n + lesson.wordCount, 0);
console.log(`lessons ${lessons.length} words ${words} bytes ${file.length}`);
console.log(appendix.map((item) => `${item.id} ${item.wordCount}`).join(", "));
