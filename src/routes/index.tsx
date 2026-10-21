import { createFileRoute, Link } from "@tanstack/react-router";
import { LessonCatalog } from "@/components/lesson-catalog";
import { cardSrsKey } from "@/lib/decks";
import { VOCAB_INDEX } from "@/lib/vocab-index";
import { isDueOrNew, lessonScore } from "@/lib/srs";
import { useKanaStore } from "@/lib/store";

export const Route = createFileRoute("/")({ component: Home });

const SCRIPTS = [
  {
    to: "/hiragana" as const,
    glyph: "あ",
    title: "Hiragana",
    meta: "Gojuon rows",
  },
  {
    to: "/katakana" as const,
    glyph: "ア",
    title: "Katakana",
    meta: "Loanwords",
  },
  {
    to: "/reading" as const,
    glyph: "読",
    title: "Reading",
    meta: "Lessons 1–20 · 会話",
  },
  {
    to: "/kanji" as const,
    glyph: "漢",
    title: "Kanji",
    meta: "124 singles · 59 words",
  },
];

function Home() {
  const srs = useKanaStore((s) => s.vocabSrs);
  const decks = useKanaStore((s) => s.decks);
  const cards = useKanaStore((s) => s.cards);
  const allKeys = VOCAB_INDEX.flatMap((lesson) => lesson.keys);
  const overall = lessonScore(allKeys, srs);
  const pct = overall.total ? Math.round((overall.known / overall.total) * 100) : 0;
  const dueCards = cards.filter((c) => isDueOrNew(srs[cardSrsKey(c.id)])).length;

  return (
    <main className="page page-wide">
      <section className="grid items-end gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="kicker">Minna no Nihongo</p>
          <h1 className="mt-5 max-w-xl font-display text-5xl tracking-tight sm:text-6xl">
            Learn Japanese from the first stroke.
          </h1>
          <p className="mt-5 max-w-md text-muted">
            Hiragana, katakana, kanji, and the lesson book — English and Bangla
            beside every line, spoken by native voices.
          </p>
        </div>
        <Link
          to="/progress"
          className="panel block p-6 no-underline sm:p-7 lg:col-span-5"
        >
          <p className="kicker">Known</p>
          <p className="mt-3 font-display text-6xl tabular-nums leading-none tracking-tight">
            {pct}
            <span className="ml-1 align-top text-2xl text-muted">%</span>
          </p>
          <div className="meter mt-5">
            <span style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-3 text-sm text-muted">
            {pct > 0
              ? `${overall.known} of ${overall.total} words`
              : "Open a lesson to begin"}
            {overall.due > 0 ? ` · ${overall.due} due` : ""}
          </p>
        </Link>
      </section>

      <section className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {SCRIPTS.map((item) => (
          <Link key={item.to} to={item.to} className="script-card">
            <span className="font-display text-5xl leading-none">{item.glyph}</span>
            <span>
              <span className="block text-sm font-medium">{item.title}</span>
              <span className="mt-1 block text-xs text-muted">{item.meta}</span>
            </span>
          </Link>
        ))}
        <Link to="/grammar" className="script-card col-span-2">
          <span className="font-display text-5xl leading-none">文</span>
          <span>
            <span className="block text-sm font-medium">Grammar</span>
            <span className="mt-1 block text-xs text-muted">118 N5 points · 12 phases</span>
          </span>
        </Link>
        <Link to="/cards" className="script-card col-span-2 min-h-28 sm:min-h-32">
          <span className="font-display text-4xl leading-none">札</span>
          <span>
            <span className="block text-sm font-medium">Cards</span>
            <span className="mt-1 block text-xs text-muted">
              {decks.length === 0
                ? "Make a lesson, add kanji, review like Anki"
                : `${decks.length} deck${decks.length === 1 ? "" : "s"} · ${cards.length} card${cards.length === 1 ? "" : "s"}${dueCards > 0 ? ` · ${dueCards} due` : ""}`}
            </span>
          </span>
        </Link>
      </section>

      <section className="mt-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="kicker">Vocabulary</p>
            <h2 className="mt-2 font-display text-3xl tracking-tight">Lessons</h2>
          </div>
          <Link
            to="/vocabulary"
            className="text-sm text-muted no-underline hover:text-fg"
          >
            Full index
          </Link>
        </div>
        <LessonCatalog />
      </section>
    </main>
  );
}
