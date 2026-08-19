import { i as createServerFn, t as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { A as boolean, D as _enum, F as object, P as number, R as string, k as array } from "../_libs/@better-auth/core+[...].mjs";
import { r as getSql } from "./db-CTLH9AFC.mjs";
import { t as authMiddleware } from "./middleware-FDx1m7fe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/progress-R79Xdylf.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var answerSchema = object({
	kana: string().min(1).max(8),
	script: _enum(["hiragana", "katakana"]),
	correct: boolean()
});
var saveSessionSchema = object({
	script: _enum([
		"hiragana",
		"katakana",
		"mixed"
	]),
	lines: string().min(1).max(400),
	mode: _enum([
		"read",
		"write",
		"mixed"
	]),
	score: number().int().min(0).max(500),
	total: number().int().min(1).max(500),
	answers: array(answerSchema).max(500)
});
var savePracticeSession_createServerFn_handler = createServerRpc({
	id: "e44571a36dbaf665d9f8e2a8d415628d8166034356b0f7e835e5abbc4905c9ee",
	name: "savePracticeSession",
	filename: "src/lib/progress.ts"
}, (opts) => savePracticeSession.__executeServer(opts));
var savePracticeSession = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => saveSessionSchema.parse(input)).handler(savePracticeSession_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const inserted = await sql`
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
var listPracticeSessions_createServerFn_handler = createServerRpc({
	id: "68d603d0e14232cd4897bbae6eb361e7cdae1a2bc87ad7c4efa588f267199fdc",
	name: "listPracticeSessions",
	filename: "src/lib/progress.ts"
}, (opts) => listPracticeSessions.__executeServer(opts));
var listPracticeSessions = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listPracticeSessions_createServerFn_handler, async ({ context }) => {
	return (await getSql())`
      select id, script, lines, mode, score, total, created_at
      from practice_sessions
      where user_id = ${context.userId}
      order by created_at desc
      limit 20
    `;
});
var listKanaStats_createServerFn_handler = createServerRpc({
	id: "521f1401ac3e5a31b0ca8960728d3d82abc7bbef17dd3be6ba14b0a2fa92b31a",
	name: "listKanaStats",
	filename: "src/lib/progress.ts"
}, (opts) => listKanaStats.__executeServer(opts));
var listKanaStats = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listKanaStats_createServerFn_handler, async ({ context }) => {
	return (await getSql())`
      select kana, script, correct, attempts
      from kana_stats
      where user_id = ${context.userId}
      order by
        case when attempts = 0 then 1 else (correct::float / attempts) end asc,
        attempts desc
      limit 40
    `;
});
//#endregion
export { listKanaStats_createServerFn_handler, listPracticeSessions_createServerFn_handler, savePracticeSession_createServerFn_handler };
