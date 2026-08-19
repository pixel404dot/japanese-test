import { o as __toESM } from "../_runtime.mjs";
import { a as LOCAL_SESSIONS_KEY, o as LOCAL_STATS_KEY } from "./kana-CVQEIrkA.mjs";
import { r as speakJa, t as cn } from "./utils-G0otvq4O.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { R as require_jsx_runtime, _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./button-Du2q4OTM.mjs";
import { n as useCurrentUserState } from "./router-DsPMTSZ9.mjs";
import { n as listPracticeSessions, t as listKanaStats } from "./progress-C8oWb5fZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/progress-B-JOW4jm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProgressPage() {
	const { user, isPending } = useCurrentUserState();
	const [sessions, setSessions] = (0, import_react.useState)([]);
	const [stats, setStats] = (0, import_react.useState)([]);
	const [source, setSource] = (0, import_react.useState)("device");
	(0, import_react.useEffect)(() => {
		if (isPending) return;
		let cancelled = false;
		async function load() {
			if (user) try {
				const [remoteSessions, remoteStats] = await Promise.all([listPracticeSessions(), listKanaStats()]);
				if (cancelled) return;
				setSessions(remoteSessions);
				setStats(remoteStats);
				setSource("account");
				return;
			} catch {}
			if (cancelled) return;
			setSessions(readLocalSessions());
			setStats(readLocalStats());
			setSource("device");
		}
		load();
		return () => {
			cancelled = true;
		};
	}, [user, isPending]);
	const weak = stats.filter((s) => s.attempts > 0).sort((a, b) => a.correct / a.attempts - b.correct / b.attempts).slice(0, 16);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-5xl flex-1 space-y-10 px-4 py-8 sm:px-6 sm:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium tracking-[0.18em] text-primary uppercase",
						children: "Progress"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-4xl",
						children: "Your weakest kana"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-xl text-muted",
						children: source === "account" ? "Saved to your account from every signed-in drill." : user ? "Showing this device until the next saved session syncs." : "Saved on this device. Sign in to keep a longer history."
					}),
					!user && !isPending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						size: "sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							children: "Sign in to sync"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg",
					children: "Needs review"
				}), weak.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid grid-cols-2 gap-2 sm:grid-cols-4",
					children: weak.map((stat) => {
						const rate = Math.round(stat.correct / stat.attempts * 100);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => speakJa(stat.kana),
							className: "flex w-full items-center gap-3 rounded-xl bg-surface p-3 text-left shadow-border hover:shadow-border-hover",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-12 place-items-center rounded-lg bg-bg font-serif text-2xl",
								children: stat.kana
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "block text-sm font-medium tabular-nums",
								children: [rate, "%"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-muted",
								children: [
									stat.correct,
									"/",
									stat.attempts,
									" · ",
									stat.script
								]
							})] })]
						}) }, `${stat.script}-${stat.kana}`);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg",
					children: "Recent drills"
				}), sessions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Finish a drill to see it here."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-ink/8 overflow-hidden rounded-xl bg-surface shadow-border",
					children: sessions.map((session, i) => {
						const rate = Math.round(session.score / session.total * 100);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-4 px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-medium capitalize",
								children: [
									session.script,
									" · ",
									session.mode
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted",
								children: [
									session.lines.split(",").length,
									" lines ·",
									" ",
									formatWhen(session.created_at)
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: cn("font-serif text-2xl tabular-nums", rate >= 80 ? "text-moss" : "text-ink"),
								children: [rate, "%"]
							})]
						}, session.id ?? i);
					})
				})]
			})
		]
	});
}
function EmptyState() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-surface px-5 py-8 text-center shadow-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-serif text-2xl",
				children: "まだ"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "No stats yet. Run a mixed test on the first five lines to start a record."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					children: "Start a drill"
				})
			})
		]
	});
}
function readLocalSessions() {
	try {
		const raw = localStorage.getItem(LOCAL_SESSIONS_KEY);
		if (!raw) return [];
		return JSON.parse(raw).map((row, i) => ({
			id: typeof row.id === "number" ? row.id : i,
			script: String(row.script ?? "mixed"),
			lines: String(row.lines ?? ""),
			mode: String(row.mode ?? "mixed"),
			score: Number(row.score ?? 0),
			total: Number(row.total ?? 1),
			created_at: String(row.created_at ?? "")
		}));
	} catch {
		return [];
	}
}
function readLocalStats() {
	try {
		const raw = localStorage.getItem(LOCAL_STATS_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Object.values(parsed);
	} catch {
		return [];
	}
}
function formatWhen(value) {
	if (!value) return "just now";
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return "recently";
	return date.toLocaleString(void 0, {
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit"
	});
}
//#endregion
export { ProgressPage as component };
