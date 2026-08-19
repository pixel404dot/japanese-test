import { o as __toESM } from "../_runtime.mjs";
import { c as ROW_GROUPS, g as scriptLabel, h as scriptJa, s as ROWS } from "./kana-CVQEIrkA.mjs";
import { r as speakJa, t as cn } from "./utils-G0otvq4O.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { R as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Volume2 } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chart-DHe43XL0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ChartPage() {
	const [script, setScript] = (0, import_react.useState)("hiragana");
	const [active, setActive] = (0, import_react.useState)(null);
	const groups = (0, import_react.useMemo)(() => ROW_GROUPS.map((group) => ({
		...group,
		rows: ROWS.filter((row) => row.group === group.id)
	})), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium tracking-[0.18em] text-primary uppercase",
							children: "Reference"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-4xl",
							children: "Gojūon chart"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-xl text-muted",
							children: "Tap any character to hear it. Use the drill to practice a line — or mix hiragana and katakana from the first five."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex rounded-full bg-surface p-1 shadow-border",
					children: ["hiragana", "katakana"].map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setScript(id),
						className: cn("h-10 rounded-full px-4 text-sm transition-colors", script === id ? "bg-ink text-bg" : "text-muted hover:text-ink"),
						children: scriptJa(id)
					}, id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-10",
				children: groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg",
						children: group.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: group.note
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2",
						children: group.rows.map((row) => {
							const kana = script === "hiragana" ? splitKana(row.preview.hiragana, row.group === "yoon") : splitKana(row.preview.katakana, row.group === "yoon");
							const readings = splitReadings(row.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-[4.5rem_1fr] items-stretch gap-2 sm:grid-cols-[6rem_1fr]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center rounded-lg bg-ink/5 px-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-medium tracking-wide text-muted uppercase",
										children: row.label
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-5 gap-2",
									children: [kana.map((char, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => {
											setActive(char);
											speakJa(char);
										},
										className: cn("flex min-h-16 flex-col items-center justify-center rounded-lg bg-surface shadow-border transition-[box-shadow,transform] duration-150", "hover:shadow-border-hover", active === char && "ring-2 ring-primary/60"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-serif text-2xl sm:text-3xl",
											children: char
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] text-muted",
											children: readings[i]
										})]
									}, `${row.id}-${char}-${i}`)), kana.length < 5 && Array.from({ length: 5 - kana.length }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}, `pad-${row.id}-${i}`))]
								})]
							}, row.id);
						})
					})]
				}, group.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-10 flex items-center gap-2 text-sm text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-4" }),
					"Hearing uses your device voice for ",
					scriptLabel(script),
					"."
				]
			})
		]
	});
}
function splitKana(preview, yoon) {
	if (!yoon) return Array.from(preview);
	const chars = Array.from(preview);
	const out = [];
	for (let i = 0; i < chars.length; i += 2) out.push(`${chars[i] ?? ""}${chars[i + 1] ?? ""}`);
	return out.filter(Boolean);
}
var READINGS = {
	a: [
		"a",
		"i",
		"u",
		"e",
		"o"
	],
	ka: [
		"ka",
		"ki",
		"ku",
		"ke",
		"ko"
	],
	sa: [
		"sa",
		"shi",
		"su",
		"se",
		"so"
	],
	ta: [
		"ta",
		"chi",
		"tsu",
		"te",
		"to"
	],
	na: [
		"na",
		"ni",
		"nu",
		"ne",
		"no"
	],
	ha: [
		"ha",
		"hi",
		"fu",
		"he",
		"ho"
	],
	ma: [
		"ma",
		"mi",
		"mu",
		"me",
		"mo"
	],
	ya: [
		"ya",
		"yu",
		"yo"
	],
	ra: [
		"ra",
		"ri",
		"ru",
		"re",
		"ro"
	],
	wa: [
		"wa",
		"wo",
		"n"
	],
	ga: [
		"ga",
		"gi",
		"gu",
		"ge",
		"go"
	],
	za: [
		"za",
		"ji",
		"zu",
		"ze",
		"zo"
	],
	da: [
		"da",
		"ji",
		"zu",
		"de",
		"do"
	],
	ba: [
		"ba",
		"bi",
		"bu",
		"be",
		"bo"
	],
	pa: [
		"pa",
		"pi",
		"pu",
		"pe",
		"po"
	],
	kya: [
		"kya",
		"kyu",
		"kyo"
	],
	sha: [
		"sha",
		"shu",
		"sho"
	],
	cha: [
		"cha",
		"chu",
		"cho"
	],
	nya: [
		"nya",
		"nyu",
		"nyo"
	],
	hya: [
		"hya",
		"hyu",
		"hyo"
	],
	mya: [
		"mya",
		"myu",
		"myo"
	],
	rya: [
		"rya",
		"ryu",
		"ryo"
	],
	gya: [
		"gya",
		"gyu",
		"gyo"
	],
	ja: [
		"ja",
		"ju",
		"jo"
	],
	bya: [
		"bya",
		"byu",
		"byo"
	],
	pya: [
		"pya",
		"pyu",
		"pyo"
	]
};
function splitReadings(id) {
	return READINGS[id] ?? [];
}
//#endregion
export { ChartPage as component };
