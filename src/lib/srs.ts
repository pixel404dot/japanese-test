export type SrsCard = {
  level: number;
  due: number;
};

export type SrsMap = Record<string, SrsCard>;

export type Rating = "again" | "hard" | "good" | "easy";

const HOUR = 3_600_000;
const DAY = 24 * HOUR;

const INTERVALS = [
  10 * 60 * 1000,
  4 * HOUR,
  8 * HOUR,
  1 * DAY,
  3 * DAY,
  7 * DAY,
  14 * DAY,
] as const;

export function srsCorrect(card: SrsCard | undefined, now = Date.now()): SrsCard {
  const level = Math.min(INTERVALS.length - 1, (card?.level ?? 0) + 1);
  return { level, due: now + INTERVALS[level]! };
}

export function srsWrong(now = Date.now()): SrsCard {
  return { level: 0, due: now };
}

export function srsRate(
  card: SrsCard | undefined,
  rating: Rating,
  now = Date.now(),
): SrsCard {
  if (rating === "again") return { level: 0, due: now + INTERVALS[0] };
  const level = card?.level ?? 0;
  if (rating === "hard") {
    const stay = Math.max(0, level);
    return { level: stay, due: now + INTERVALS[stay]! };
  }
  if (rating === "good") return srsCorrect(card, now);
  const next = Math.min(INTERVALS.length - 1, level + 2);
  return { level: next, due: now + INTERVALS[next]! };
}

export function isKnown(card: SrsCard | undefined): boolean {
  return (card?.level ?? 0) >= 1;
}

export function isNew(card: SrsCard | undefined): boolean {
  return !card;
}

export function isDue(card: SrsCard | undefined, now = Date.now()): boolean {
  return Boolean(card && card.due <= now);
}

export function isDueOrNew(card: SrsCard | undefined, now = Date.now()): boolean {
  return !card || card.due <= now;
}

export function lessonScore(
  keys: string[],
  srs: SrsMap,
  now = Date.now(),
): { known: number; due: number; total: number } {
  let known = 0;
  let due = 0;
  for (const key of keys) {
    const card = srs[key];
    if (isKnown(card)) known += 1;
    if (isDue(card, now)) due += 1;
  }
  return { known, due, total: keys.length };
}
