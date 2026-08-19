import { i as createServerFn, o as getServerFnById, t as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { A as boolean, D as _enum, F as object, P as number, R as string, k as array } from "../_libs/@better-auth/core+[...].mjs";
import { t as authMiddleware } from "./middleware-FDx1m7fe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/progress-C8oWb5fZ.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
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
var savePracticeSession = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => saveSessionSchema.parse(input)).handler(createSsrRpc("e44571a36dbaf665d9f8e2a8d415628d8166034356b0f7e835e5abbc4905c9ee"));
var listPracticeSessions = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("68d603d0e14232cd4897bbae6eb361e7cdae1a2bc87ad7c4efa588f267199fdc"));
var listKanaStats = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("521f1401ac3e5a31b0ca8960728d3d82abc7bbef17dd3be6ba14b0a2fa92b31a"));
//#endregion
export { listPracticeSessions as n, savePracticeSession as r, listKanaStats as t };
