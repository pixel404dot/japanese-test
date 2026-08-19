import {
  type KanaGlyph,
  type QuizMode,
  type ScriptMode,
  type SetupState,
  glyphsForSelection,
} from "@/lib/kana";
import { shuffle } from "@/lib/utils";

export type PromptKind = "read" | "write";

export interface QuizQuestion {
  id: string;
  glyph: KanaGlyph;
  kind: PromptKind;
  choices?: string[];
}

export interface QuizAnswer {
  question: QuizQuestion;
  given: string;
  correct: boolean;
  timedOut?: boolean;
}

export function buildQuiz(setup: SetupState): QuizQuestion[] {
  const pool = glyphsForSelection(setup.script, setup.rows);
  if (pool.length === 0) return [];

  const target = setup.length === "all" ? pool.length : setup.length;
  const picked: KanaGlyph[] = [];
  const shuffled = shuffle(pool);
  while (picked.length < target) {
    picked.push(...shuffle(shuffled));
  }
  const glyphs = picked.slice(0, target);

  return glyphs.map((glyph, index) => {
    const kind: PromptKind =
      setup.mode === "mixed"
        ? Math.random() < 0.5
          ? "read"
          : "write"
        : setup.mode === "read"
          ? "read"
          : "write";

    const question: QuizQuestion = {
      id: `${glyph.script}-${glyph.kana}-${index}`,
      glyph,
      kind,
    };

    if (kind === "write") {
      question.choices = buildChoices(glyph, pool);
    }
    return question;
  });
}

function buildChoices(target: KanaGlyph, pool: KanaGlyph[]): string[] {
  const sameScript = pool.filter(
    (g) => g.script === target.script && g.kana !== target.kana,
  );
  const others =
    sameScript.length >= 3
      ? sameScript
      : pool.filter((g) => g.kana !== target.kana);
  const distractors = shuffle(others)
    .slice(0, 3)
    .map((g) => g.kana);
  while (distractors.length < 3) {
    distractors.push(target.kana);
  }
  return shuffle([target.kana, ...distractors.slice(0, 3)]);
}

export function describeSetup(setup: SetupState): string {
  const script =
    setup.script === "mixed"
      ? "Mixed"
      : setup.script === "hiragana"
        ? "Hiragana"
        : "Katakana";
  const mode =
    setup.mode === "mixed"
      ? "mixed test"
      : setup.mode === "read"
        ? "type the reading"
        : "choose the character";
  const timer = setup.timer > 0 ? ` · ${setup.timer}s each` : "";
  return `${script} · ${setup.rows.length} line${setup.rows.length === 1 ? "" : "s"} · ${mode}${timer}`;
}

export function scriptModeLabel(script: ScriptMode): string {
  if (script === "mixed") return "Mixed";
  if (script === "hiragana") return "Hiragana";
  return "Katakana";
}

export function quizModeLabel(mode: QuizMode): string {
  if (mode === "read") return "Type reading";
  if (mode === "write") return "Choose character";
  return "Mixed test";
}
