import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import { emptyBundle, type DeckBundle } from "@/lib/decks";
import type { StatsMap } from "@/lib/progress";
import type { SrsMap } from "@/lib/srs";

export type CloudProgress = {
  stats: StatsMap;
  vocabSrs: SrsMap;
  decks: DeckBundle;
};

function parseJson<T>(raw: unknown, fallback: T): T {
  if (raw && typeof raw === "object") return raw as T;
  if (typeof raw !== "string" || !raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function parseBundle(raw: unknown): DeckBundle {
  const parsed = parseJson<Partial<DeckBundle>>(raw, {});
  return {
    decks: Array.isArray(parsed.decks) ? parsed.decks : [],
    cards: Array.isArray(parsed.cards) ? parsed.cards : [],
  };
}

export const loadProgress = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<{
      stats_json: string;
      srs_json: string;
      decks_json: string | null;
    }>`
      select stats_json, srs_json, decks_json from user_progress where user_id = ${context.userId}
    `;
    const row = rows[0];
    if (!row) {
      return { stats: {}, vocabSrs: {}, decks: emptyBundle() } satisfies CloudProgress;
    }
    return {
      stats: parseJson<StatsMap>(row.stats_json, {}),
      vocabSrs: parseJson<SrsMap>(row.srs_json, {}),
      decks: parseBundle(row.decks_json),
    } satisfies CloudProgress;
  });

export const saveProgress = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: CloudProgress) => ({
    stats: data.stats ?? {},
    vocabSrs: data.vocabSrs ?? {},
    decks: {
      decks: data.decks?.decks ?? [],
      cards: data.decks?.cards ?? [],
    },
  }))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const statsJson = JSON.stringify(data.stats);
    const srsJson = JSON.stringify(data.vocabSrs);
    const decksJson = JSON.stringify(data.decks);
    await sql`
      insert into user_progress (user_id, stats_json, srs_json, decks_json, updated_at)
      values (${context.userId}, ${statsJson}, ${srsJson}, ${decksJson}, now())
      on conflict (user_id) do update set
        stats_json = excluded.stats_json,
        srs_json = excluded.srs_json,
        decks_json = excluded.decks_json,
        updated_at = now()
    `;
    return { ok: true as const };
  });
