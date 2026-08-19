import { o as __toESM } from "../_runtime.mjs";
import { a as LOCAL_SESSIONS_KEY, c as ROW_GROUPS, d as glyphsForSelection, f as isFirst5, g as scriptLabel, h as scriptJa, i as FIRST5_ROWS, l as SETUP_STORAGE_KEY, m as sameRows, n as DAKUTEN_ROWS, o as LOCAL_STATS_KEY, p as matchesRomaji, r as DEFAULT_SETUP, s as ROWS, t as BASIC_ROWS, u as YOON_ROWS } from "./kana-CVQEIrkA.mjs";
import { n as shuffle, r as speakJa, t as cn } from "./utils-G0otvq4O.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { R as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Layers, i as Trophy, l as Check, n as Volume2, o as Shuffle, r as Type, s as RotateCcw, t as X } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-Du2q4OTM.mjs";
import { n as useCurrentUserState } from "./router-DsPMTSZ9.mjs";
import { r as savePracticeSession } from "./progress-C8oWb5fZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Uftoi4eF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SCRIPTS = [
	{
		id: "hiragana",
		ja: "ひらがな",
		en: "Hiragana",
		blurb: "The rounded script"
	},
	{
		id: "katakana",
		ja: "カタカナ",
		en: "Katakana",
		blurb: "The angular script"
	},
	{
		id: "mixed",
		ja: "混ぜる",
		en: "Mixed",
		blurb: "Both in one drill"
	}
];
var MODES = [
	{
		id: "read",
		icon: Type,
		title: "Type the reading",
		blurb: "See kana, write romaji"
	},
	{
		id: "write",
		icon: Layers,
		title: "Choose the character",
		blurb: "See romaji, tap the kana"
	},
	{
		id: "mixed",
		icon: Shuffle,
		title: "Mixed test",
		blurb: "Both directions, shuffled"
	}
];
var LENGTHS = [
	10,
	20,
	40,
	"all"
];
function SetupPanel({ setup, onChange, onStart }) {
	const selectedCount = ROWS.filter((row) => setup.rows.includes(row.id)).length;
	const poolNote = setup.script === "mixed" ? "hiragana + katakana of the selected lines" : setup.script;
	function toggleRow(id) {
		const rows = setup.rows.includes(id) ? setup.rows.filter((r) => r !== id) : [...setup.rows, id];
		onChange({
			...setup,
			rows
		});
	}
	function setRows(rows) {
		onChange({
			...setup,
			rows: [...rows]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "max-w-xl space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium tracking-[0.18em] text-primary uppercase",
						children: "Gojūon drill"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-4xl leading-tight sm:text-5xl",
						children: "Practice by the line."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-base leading-relaxed text-muted",
						children: "Pick hiragana, katakana, or a proper mixed test. Start from the first five lines — あかさたな — or choose any row you want."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg",
					children: "Script"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-3",
					children: SCRIPTS.map((item) => {
						const active = setup.script === item.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => onChange({
								...setup,
								script: item.id
							}),
							className: cn("rounded-xl bg-surface p-4 text-left shadow-border transition-[box-shadow,transform] duration-150", "hover:shadow-border-hover", active && "ring-2 ring-primary/70 ring-offset-2 ring-offset-bg"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-serif text-2xl",
									children: item.ja
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 font-medium",
									children: item.en
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: item.blurb
								})
							]
						}, item.id);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-end justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg",
						children: "Lines"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							selectedCount,
							" selected · ",
							poolNote
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PresetChip, {
								active: isFirst5(setup.rows),
								onClick: () => setRows(FIRST5_ROWS),
								children: "First 5 · あかさたな"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PresetChip, {
								active: sameRows(setup.rows, BASIC_ROWS),
								onClick: () => setRows(BASIC_ROWS),
								children: "All basic"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PresetChip, {
								active: setup.rows.length === 0,
								onClick: () => setRows([]),
								children: "Clear"
							})
						]
					})]
				}), ROW_GROUPS.map((group) => {
					const groupRows = ROWS.filter((row) => row.group === group.id);
					const groupIds = groupRows.map((row) => row.id);
					const allOn = groupIds.every((id) => setup.rows.includes(id));
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: group.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted",
									children: group.note
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setRows(allOn ? setup.rows.filter((id) => !groupIds.includes(id)) : Array.from(/* @__PURE__ */ new Set([...setup.rows, ...groupIds]))),
									className: "text-sm text-muted underline-offset-4 hover:text-ink hover:underline",
									children: allOn ? "Deselect" : "Select all"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5",
								children: groupRows.map((row) => {
									const active = setup.rows.includes(row.id);
									const preview = setup.script === "katakana" ? row.preview.katakana : setup.script === "hiragana" ? row.preview.hiragana : `${row.preview.hiragana} ${row.preview.katakana}`;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => toggleRow(row.id),
										className: cn("relative min-h-20 rounded-lg bg-surface px-3 py-2.5 text-left shadow-border transition-[box-shadow,transform] duration-150", "hover:shadow-border-hover", active && "ring-2 ring-ink/70 ring-offset-2 ring-offset-bg"),
										children: [
											active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "absolute top-2 right-2 size-3.5 text-primary" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs font-medium tracking-wide text-muted uppercase",
												children: row.label
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-serif text-lg leading-tight tracking-wide",
												children: setup.script === "mixed" ? row.preview.hiragana : preview
											}),
											setup.script === "mixed" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-serif text-sm tracking-wide text-muted",
												children: row.preview.katakana
											})
										]
									}, row.id);
								})
							}),
							group.id === "basic" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2 pt-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setRows(Array.from(/* @__PURE__ */ new Set([...setup.rows, ...DAKUTEN_ROWS]))),
									className: "text-xs text-muted underline-offset-4 hover:text-ink hover:underline",
									children: "Add voiced marks"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setRows(Array.from(/* @__PURE__ */ new Set([...setup.rows, ...YOON_ROWS]))),
									className: "text-xs text-muted underline-offset-4 hover:text-ink hover:underline",
									children: "Add combinations"
								})]
							})
						]
					}, group.id);
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg",
					children: "Test style"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-3",
					children: MODES.map((item) => {
						const active = setup.mode === item.id;
						const Icon = item.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => onChange({
								...setup,
								mode: item.id
							}),
							className: cn("flex gap-3 rounded-xl bg-surface p-4 text-left shadow-border transition-[box-shadow] duration-150", "hover:shadow-border-hover", active && "ring-2 ring-primary/70 ring-offset-2 ring-offset-bg"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "mt-0.5 size-4 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-medium",
								children: item.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-muted",
								children: item.blurb
							})] })]
						}, item.id);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg",
						children: "Length"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: LENGTHS.map((len) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => onChange({
								...setup,
								length: len
							}),
							className: cn("h-10 min-w-14 rounded-full px-3 text-sm shadow-border transition-colors", setup.length === len ? "bg-ink text-bg" : "bg-surface text-ink hover:bg-ink/5"),
							children: len === "all" ? "All unique" : len
						}, String(len)))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						onClick: () => onChange(DEFAULT_SETUP),
						children: "Reset first 5 mixed"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "xl",
						disabled: setup.rows.length === 0,
						onClick: onStart,
						children: "Start drill"
					})]
				})]
			})
		]
	});
}
function PresetChip({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("h-9 rounded-full px-3 text-sm shadow-border transition-colors", active ? "bg-primary text-primary-fg" : "bg-surface hover:bg-ink/5"),
		children
	});
}
var Input = (0, import_react.forwardRef)(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		ref,
		className: cn("h-12 w-full rounded-lg bg-surface px-4 text-base text-ink shadow-border", "placeholder:text-muted/70", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35", "disabled:opacity-50", className),
		...props
	});
});
Input.displayName = "Input";
function QuizSession({ questions, summary, onExit, onFinish }) {
	const [index, setIndex] = (0, import_react.useState)(0);
	const [answers, setAnswers] = (0, import_react.useState)([]);
	const [typed, setTyped] = (0, import_react.useState)("");
	const [verdict, setVerdict] = (0, import_react.useState)(null);
	const inputRef = (0, import_react.useRef)(null);
	const question = questions[index];
	const progress = questions.length === 0 ? 0 : index / questions.length;
	(0, import_react.useEffect)(() => {
		if (question?.kind === "read" && !verdict) inputRef.current?.focus();
	}, [question, verdict]);
	(0, import_react.useEffect)(() => {
		if (!verdict) return;
		if (!verdict.correct) return;
		const timer = window.setTimeout(() => advance(verdict), 750);
		return () => window.clearTimeout(timer);
	}, [verdict]);
	if (!question) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No questions in this set." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			onClick: onExit,
			children: "Back"
		})]
	});
	function grade(given) {
		if (verdict || !question) return;
		const correct = question.kind === "read" ? matchesRomaji(question.glyph, given) : given === question.glyph.kana;
		setVerdict({
			question,
			given,
			correct
		});
		if (correct) speakJa(question.glyph.kana);
	}
	function advance(current) {
		const nextAnswers = [...answers, current];
		if (index + 1 >= questions.length) {
			onFinish(nextAnswers);
			return;
		}
		setAnswers(nextAnswers);
		setIndex((i) => i + 1);
		setTyped("");
		setVerdict(null);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3 text-sm text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onExit,
						className: "underline-offset-4 hover:text-ink hover:underline",
						children: "Exit"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "hidden text-center sm:block",
						children: summary
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "tabular-nums",
						children: [
							index + 1,
							" / ",
							questions.length
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-1 overflow-hidden rounded-full bg-ink/10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full bg-primary transition-[width] duration-200 ease-out",
					style: { width: `${Math.max(progress * 100, 4)}%` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("rounded-xl bg-surface px-5 py-10 text-center shadow-border sm:px-8 sm:py-14", verdict?.correct && "ring-2 ring-moss/50", verdict && !verdict.correct && "ring-2 ring-primary/50"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-[0.18em] text-muted uppercase",
						children: question.kind === "read" ? "Read this" : "Find this reading"
					}),
					question.kind === "read" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-serif text-7xl leading-none sm:text-8xl",
						children: question.glyph.kana
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-serif text-6xl tracking-tight sm:text-7xl",
						children: question.glyph.romaji
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 flex items-center justify-center gap-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => speakJa(question.glyph.kana),
							className: "inline-flex h-11 items-center gap-2 rounded-full bg-bg px-3.5 text-sm shadow-border hover:shadow-border-hover",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-4" }), "Hear"]
						})
					}),
					verdict && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-col items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: cn("inline-flex items-center gap-1.5 text-sm font-medium", verdict.correct ? "text-moss" : "text-primary"),
								children: [verdict.correct ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), verdict.correct ? "Correct" : "Not quite"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-serif text-xl",
								children: [
									question.glyph.kana,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mx-2 text-muted",
										children: "·"
									}),
									question.glyph.romaji
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted",
								children: [
									scriptLabel(question.glyph.script),
									" ·",
									" ",
									scriptJa(question.glyph.script)
								]
							})
						]
					})
				]
			}),
			question.kind === "read" && !verdict && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "space-y-3",
				onSubmit: (event) => {
					event.preventDefault();
					grade(typed);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					ref: inputRef,
					value: typed,
					onChange: (event) => setTyped(event.target.value),
					autoCapitalize: "none",
					autoComplete: "off",
					autoCorrect: "off",
					spellCheck: false,
					placeholder: "Type romaji — shi, tsu, fu…",
					"aria-label": "Romaji reading"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					className: "w-full",
					size: "lg",
					disabled: !typed.trim(),
					children: "Check"
				})]
			}),
			question.kind === "write" && !verdict && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3",
				children: (question.choices ?? []).map((choice) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => grade(choice),
					className: "flex min-h-20 items-center justify-center rounded-xl bg-surface font-serif text-4xl shadow-border transition-[box-shadow,transform] duration-150 hover:shadow-border-hover",
					children: choice
				}, choice))
			}),
			verdict && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				className: "w-full",
				size: "lg",
				variant: verdict.correct ? "moss" : "ink",
				onClick: () => advance(verdict),
				children: index + 1 >= questions.length ? "See results" : "Next"
			})
		]
	});
}
function ResultsPanel({ answers, summary, savedNote, onRetryMissed, onAgain, onHome }) {
	const score = answers.filter((a) => a.correct).length;
	const total = answers.length;
	const percent = total === 0 ? 0 : Math.round(score / total * 100);
	const missed = answers.filter((a) => !a.correct);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl bg-surface px-6 py-10 text-center shadow-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "mx-auto size-8 text-gold" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm font-medium tracking-[0.18em] text-muted uppercase",
						children: "Drill complete"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 font-serif text-6xl tabular-nums",
						children: [percent, "%"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-muted",
						children: [
							score,
							" of ",
							total,
							" correct"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-muted",
						children: summary
					}),
					savedNote && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-moss",
						children: savedNote
					})
				]
			}),
			missed.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg",
					children: "Missed"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-ink/8 overflow-hidden rounded-xl bg-surface shadow-border",
					children: missed.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-4 px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => speakJa(item.question.glyph.kana),
							className: "grid size-14 shrink-0 place-items-center rounded-lg bg-bg font-serif text-3xl",
							children: item.question.glyph.kana
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-medium",
								children: [item.question.glyph.romaji, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-2 text-sm font-normal text-muted",
									children: scriptLabel(item.question.glyph.script)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate text-sm text-muted",
								children: [
									"You answered",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-primary",
										children: item.given || "—"
									})
								]
							})]
						})]
					}, item.question.id))
				})]
			}),
			missed.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center text-moss",
				children: "Clean run. Every character held."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "outline",
						disabled: missed.length === 0,
						onClick: onRetryMissed,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {}), "Retry missed"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ink",
						onClick: onAgain,
						children: "New drill"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						onClick: onHome,
						children: "Change lines"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg",
					children: "All answers"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "grid grid-cols-5 gap-2 sm:grid-cols-8",
					children: answers.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						title: `${item.question.glyph.kana} = ${item.question.glyph.romaji}`,
						onClick: () => speakJa(item.question.glyph.kana),
						className: cn("grid aspect-square w-full place-items-center rounded-lg font-serif text-xl shadow-border", item.correct ? "bg-moss/12 text-ink" : "bg-primary/12 text-ink"),
						children: item.question.glyph.kana
					}) }, item.question.id))
				})]
			})
		]
	});
}
function buildQuiz(setup) {
	const pool = glyphsForSelection(setup.script, setup.rows);
	if (pool.length === 0) return [];
	const target = setup.length === "all" ? pool.length : setup.length;
	const picked = [];
	const shuffled = shuffle(pool);
	while (picked.length < target) picked.push(...shuffle(shuffled));
	return picked.slice(0, target).map((glyph, index) => {
		const kind = setup.mode === "mixed" ? Math.random() < .5 ? "read" : "write" : setup.mode === "read" ? "read" : "write";
		const question = {
			id: `${glyph.script}-${glyph.kana}-${index}`,
			glyph,
			kind
		};
		if (kind === "write") question.choices = buildChoices(glyph, pool);
		return question;
	});
}
function buildChoices(target, pool) {
	const sameScript = pool.filter((g) => g.script === target.script && g.kana !== target.kana);
	const others = sameScript.length >= 3 ? sameScript : pool.filter((g) => g.kana !== target.kana);
	const distractors = shuffle(others).slice(0, 3).map((g) => g.kana);
	while (distractors.length < 3) distractors.push(target.kana);
	return shuffle([target.kana, ...distractors.slice(0, 3)]);
}
function describeSetup(setup) {
	const script = setup.script === "mixed" ? "Mixed" : setup.script === "hiragana" ? "Hiragana" : "Katakana";
	const mode = setup.mode === "mixed" ? "mixed test" : setup.mode === "read" ? "type the reading" : "choose the character";
	return `${script} · ${setup.rows.length} line${setup.rows.length === 1 ? "" : "s"} · ${mode}`;
}
function Home() {
	const { user } = useCurrentUserState();
	const [setup, setSetup] = (0, import_react.useState)(DEFAULT_SETUP);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	const [view, setView] = (0, import_react.useState)("setup");
	const [questions, setQuestions] = (0, import_react.useState)([]);
	const [answers, setAnswers] = (0, import_react.useState)([]);
	const [savedNote, setSavedNote] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(SETUP_STORAGE_KEY);
			if (raw) {
				const parsed = JSON.parse(raw);
				setSetup({
					...DEFAULT_SETUP,
					...parsed,
					rows: Array.isArray(parsed.rows) ? parsed.rows : DEFAULT_SETUP.rows
				});
			}
		} catch {}
		setHydrated(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		localStorage.setItem(SETUP_STORAGE_KEY, JSON.stringify(setup));
	}, [setup, hydrated]);
	const summary = (0, import_react.useMemo)(() => describeSetup(setup), [setup]);
	function startWith(nextQuestions) {
		if (nextQuestions.length === 0) return;
		setQuestions(nextQuestions);
		setAnswers([]);
		setSavedNote(null);
		setView("quiz");
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}
	function handleFinish(nextAnswers) {
		setAnswers(nextAnswers);
		setView("results");
		persistProgress(nextAnswers, Boolean(user), setup).then((note) => setSavedNote(note)).catch(() => setSavedNote("Could not save this session."));
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12",
		children: [
			view === "setup" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SetupPanel, {
				setup,
				onChange: setSetup,
				onStart: () => startWith(buildQuiz(setup))
			}),
			view === "quiz" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizSession, {
				questions,
				summary,
				onExit: () => setView("setup"),
				onFinish: handleFinish
			}),
			view === "results" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultsPanel, {
				answers,
				summary,
				savedNote,
				onRetryMissed: () => {
					startWith(answers.filter((a) => !a.correct).map((a, i) => ({
						...a.question,
						id: `${a.question.id}-retry-${i}`
					})));
				},
				onAgain: () => startWith(buildQuiz(setup)),
				onHome: () => setView("setup")
			})
		]
	});
}
async function persistProgress(answers, signedIn, setup) {
	const score = answers.filter((a) => a.correct).length;
	const payload = {
		script: setup.script,
		lines: setup.rows.join(","),
		mode: setup.mode,
		score,
		total: answers.length,
		answers: answers.map((a) => ({
			kana: a.question.glyph.kana,
			script: a.question.glyph.script,
			correct: a.correct
		}))
	};
	writeLocalProgress(payload, answers);
	if (!signedIn) return "Saved on this device. Sign in to keep progress across browsers.";
	await savePracticeSession({ data: payload });
	return "Saved to your account.";
}
function writeLocalProgress(payload, answers) {
	try {
		const sessions = readJson(LOCAL_SESSIONS_KEY, []);
		sessions.unshift({
			...payload,
			created_at: (/* @__PURE__ */ new Date()).toISOString()
		});
		localStorage.setItem(LOCAL_SESSIONS_KEY, JSON.stringify(sessions.slice(0, 20)));
		const stats = readJson(LOCAL_STATS_KEY, {});
		for (const answer of answers) {
			const key = `${answer.question.glyph.script}:${answer.question.glyph.kana}`;
			const prev = stats[key] ?? {
				kana: answer.question.glyph.kana,
				script: answer.question.glyph.script,
				correct: 0,
				attempts: 0
			};
			prev.attempts += 1;
			if (answer.correct) prev.correct += 1;
			stats[key] = prev;
		}
		localStorage.setItem(LOCAL_STATS_KEY, JSON.stringify(stats));
	} catch {}
}
function readJson(key, fallback) {
	const raw = localStorage.getItem(key);
	if (!raw) return fallback;
	return JSON.parse(raw);
}
//#endregion
export { Home as component };
