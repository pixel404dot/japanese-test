import { similarKana } from "./kana";

export type DailyStat = {
  date: number;
  right: number;
  wrong: number;
  help: number;
  edits: number;
  wrongSubmissions: number;
  timeSum: number;
};

export type CharStat = {
  shown: number;
  right: number;
  wrong: number;
  help: number;
  edits: number;
  wrongSubmissions: number;
  timeSum: number;
  daily: DailyStat[];
};

export type StatsMap = Record<string, CharStat>;

export type StatEvent =
  | "shown"
  | "correct"
  | "wrong"
  | "help"
  | "edit"
  | "wrongSubmission";

function emptyStat(): CharStat {
  return {
    shown: 0,
    right: 0,
    wrong: 0,
    help: 0,
    edits: 0,
    wrongSubmissions: 0,
    timeSum: 0,
    daily: [],
  };
}

function todayStart(): number {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

function todayBucket(stat: CharStat): DailyStat {
  const date = todayStart();
  let bucket = stat.daily.find((d) => d.date === date);
  if (!bucket) {
    bucket = {
      date,
      right: 0,
      wrong: 0,
      help: 0,
      edits: 0,
      wrongSubmissions: 0,
      timeSum: 0,
    };
    stat.daily.push(bucket);
    if (stat.daily.length > 90) stat.daily = stat.daily.slice(-90);
  }
  return bucket;
}

export function applyStat(
  stats: StatsMap,
  key: string,
  event: StatEvent,
  timeMs = 0,
): StatsMap {
  const next: StatsMap = { ...stats };
  const prev = next[key];
  const stat: CharStat = {
    ...(prev ?? emptyStat()),
    daily: [...(prev?.daily ?? [])],
  };
  const day = { ...todayBucket(stat) };
  stat.daily = stat.daily.filter((d) => d.date !== day.date).concat(day);

  if (event === "shown") stat.shown += 1;
  if (event === "correct") {
    const t = Math.min(timeMs, 10_000);
    stat.right += 1;
    stat.timeSum += t;
    day.right += 1;
    day.timeSum += t;
  }
  if (event === "wrong") {
    stat.wrong += 1;
    day.wrong += 1;
  }
  if (event === "help") {
    stat.help += 1;
    day.help += 1;
  }
  if (event === "edit") {
    stat.edits += 1;
    day.edits += 1;
  }
  if (event === "wrongSubmission") {
    stat.wrongSubmissions += 1;
    day.wrongSubmissions += 1;
  }
  next[key] = stat;
  return next;
}

export function mastery(stat: CharStat | undefined): number | null {
  if (!stat) return null;
  const total = stat.right + stat.wrong;
  if (total === 0) return null;
  const acc = stat.right / total;
  const avg = stat.right > 0 ? stat.timeSum / stat.right / 1000 : 5;
  const speed = Math.max(0, 1 - avg / 5);
  const help = Math.max(0, 1 - stat.help / total);
  const edits = Math.max(0, 1 - (stat.right > 0 ? stat.edits / stat.right : 0) / 5);
  const wrongSub = Math.max(0, 1 - stat.wrongSubmissions / total);
  const volume = Math.min(total / 20, 1);
  return Math.round(
    (acc * 0.4 + speed * 0.15 + help * 0.1 + edits * 0.15 + wrongSub * 0.1 + volume * 0.1) *
      100,
  );
}

export function avgTime(stat: CharStat | undefined): number | null {
  if (!stat || stat.right === 0) return null;
  return stat.timeSum / stat.right / 1000;
}

export type PromptItem = {
  key: string;
  jp: string;
  answers: string[];
  meaning?: string;
  meaningBn?: string;
  kind: "kana" | "word";
  speak?: string;
};

function familyOf(item: PromptItem): string {
  const a = (item.answers[0] ?? "").toLowerCase();
  return a.replace(/[aiueo]+$/i, "") || a || item.jp;
}

export function shuffleNoRepeat(items: PromptItem[]): PromptItem[] {
  const pool = [...items];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = pool[i]!;
    pool[i] = pool[j]!;
    pool[j] = tmp;
  }
  const out: PromptItem[] = [];
  while (pool.length) {
    let best = 0;
    let bestScore = -Infinity;
    const last = out[out.length - 1];
    const last2 = out[out.length - 2];
    const f1 = last ? familyOf(last) : null;
    const f2 = last2 ? familyOf(last2) : null;
    for (let i = 0; i < pool.length; i++) {
      const item = pool[i]!;
      const fam = familyOf(item);
      let score = Math.random();
      if (f1 && fam === f1) score -= 10;
      if (f2 && fam === f2) score -= 4;
      if (last && similarKana(last.jp).includes(item.jp)) score -= 5;
      if (score > bestScore) {
        bestScore = score;
        best = i;
      }
    }
    out.push(pool.splice(best, 1)[0]!);
  }
  return out;
}

export function pickNext(
  items: PromptItem[],
  last?: PromptItem | null,
): PromptItem {
  if (items.length === 0) throw new Error("No prompts");
  if (items.length === 1) return items[0]!;
  const lastFam = last ? familyOf(last) : null;
  const scored = items.map((item) => {
    let w = 1 + Math.random();
    if (last && item.key === last.key) w *= 0.08;
    if (lastFam && familyOf(item) === lastFam) w *= 0.15;
    if (last && similarKana(last.jp).includes(item.jp)) w *= 0.3;
    return { item, w };
  });
  const total = scored.reduce((s, x) => s + x.w, 0);
  let r = Math.random() * total;
  for (const row of scored) {
    r -= row.w;
    if (r <= 0) return row.item;
  }
  return scored[scored.length - 1]!.item;
}
