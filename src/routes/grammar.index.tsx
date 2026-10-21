import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import {
  GRAMMAR_PHASES,
  GRAMMAR_POINTS,
  grammarId,
  pointsInPhase,
} from "@/lib/grammar";

export const Route = createFileRoute("/grammar/")({
  component: GrammarIndex,
});

function pad(n: number) {
  return String(n).padStart(3, "0");
}

function GrammarIndex() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const hits = useMemo(() => {
    if (!q) return [];
    return GRAMMAR_POINTS.filter((point) => {
      const blob = [point.pattern, point.meaning, point.bn, point.form, point.note ?? ""]
        .join("\n")
        .toLowerCase();
      return blob.includes(q);
    });
  }, [q]);

  return (
    <main className="page">
      <PageHeader
        backTo="/"
        backLabel="Studio"
        glyph="文"
        title="Grammar"
        description="Twelve phases. Open one, then play the lesson: the line in front of you is the line being spoken. Hide the meaning and listen again."
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search は, topic, কারণ…"
          aria-label="Search grammar"
          className="field mt-6"
        />
      </PageHeader>

      {q ? (
        <div>
          <p className="kicker mb-3">
            {hits.length} match{hits.length === 1 ? "" : "es"}
          </p>
          {hits.length === 0 ? (
            <p className="text-sm text-muted">No matches.</p>
          ) : (
            <div className="catalog">
              {hits.map((point) => (
                <Link
                  key={point.n}
                  to="/grammar/$pointId"
                  params={{ pointId: grammarId(point.n) }}
                  className="catalog-row sm:px-5"
                >
                  <span className="w-10 shrink-0 font-display text-lg tabular-nums text-subtle">
                    {pad(point.n)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-kana text-lg text-fg">{point.pattern}</span>
                    <span className="mt-0.5 block truncate font-bn text-sm text-muted">{point.bn}</span>
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="grid gap-3">
          {GRAMMAR_PHASES.map((phase) => {
            const points = pointsInPhase(phase.number);
            const from = points[0]?.n ?? 0;
            const to = points.at(-1)?.n ?? 0;
            return (
              <Link
                key={phase.number}
                to="/grammar/phase/$phaseId"
                params={{ phaseId: String(phase.number) }}
                className="script-card min-h-0"
              >
                <span className="kicker">Phase {String(phase.number).padStart(2, "0")}</span>
                <span>
                  <span className="mt-3 block font-display text-2xl tracking-tight">{phase.title}</span>
                  <span className="mt-1 block text-sm text-muted">
                    Grammar {pad(from)}–{pad(to)}
                  </span>
                  <span className="mt-1 block text-sm text-subtle">{phase.blurb}</span>
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
