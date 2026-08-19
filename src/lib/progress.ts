import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";

const answerSchema = z.object({
  kana: z.string().min(1).max(8),
  script: z.enum(["hiragana", "katakana"]),
  correct: z.boolean(),
});

const saveSessionSchema = z.object({
  script: z.enum(["hiragana", "katakana", "mixed"]),
  lines: z.string().min(1).max(400),
  mode: z.enum(["read", "write", "mixed"]),
  score: z.number().int().min(0).max(500),
  total: z.number().int().min(1).max(500),
  answers: z.array(answerSchema).max(500),
});

export type SavedSession = {
  id: number;
  script: string;
  lines: string;
  mode: string;
  score: number;
  total: number;
  created_at: string;
};

export type KanaStat = {
  kana: string;
  script: string;
  correct: number;
  attempts: number;
};

export const savePracticeSession = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => saveSessionSchema.parse(input))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const inserted = await sql<{ id: number }>`
      insert into practice_sessions (user_id, script, lines, mode, score, total)
      values (${context.userId}, ${data.script}, ${data.lines}, ${data.mode}, ${data.score}, ${data.total})
      returning id
    `;

    for (const answer of data.answers) {
      const correctInc = answer.correct ? 1 : 0;
      await sql`
        insert into kana_stats (user_id, kana, script, correct, attempts, updated_at)
        values (${context.userId}, ${answer.kana}, ${answer.script}, ${correctInc}, 1, now())
        on conflict (user_id, kana, script) do update set
          correct = kana_stats.correct + ${correctInc},
          attempts = kana_stats.attempts + 1,
          updated_at = now()
      `;
    }

    return { id: inserted[0]?.id ?? 0 };
  });

export const listPracticeSessions = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    return sql<SavedSession>`
      select id, script, lines, mode, score, total, created_at
      from practice_sessions
      where user_id = ${context.userId}
      order by created_at desc
      limit 20
    `;
  });

export const listKanaStats = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    return sql<KanaStat>`
      select kana, script, correct, attempts
      from kana_stats
      where user_id = ${context.userId}
      order by
        case when attempts = 0 then 1 else (correct::float / attempts) end asc,
        attempts desc
      limit 40
    `;
  });
