import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { VOCAB_INDEX, type VocabIndexLesson } from "@/lib/vocab-index";
import { lessonScore, type SrsMap } from "@/lib/srs";
import { useKanaStore } from "@/lib/store";

const CHAPTERS = [
  { id: "i", label: "Lessons 1–10", range: "01 — 10", from: 1, to: 10 },
  { id: "ii", label: "Lessons 11–20", range: "11 — 20", from: 11, to: 20 },
  { id: "iii", label: "Lessons 21–25", range: "21 — 25", from: 21, to: 25 },
];

export function LessonCatalog({
  extras = [],
}: {
  extras?: { lessonId: string; mark: string; title: string; meta: string; keys?: string[] }[];
}) {
  const srs = useKanaStore((s) => s.vocabSrs);

  return (
    <div className="space-y-8">
      {CHAPTERS.map((chapter) => {
        const rows = VOCAB_INDEX.filter(
          (lesson) => lesson.number >= chapter.from && lesson.number <= chapter.to,
        );
        return (
          <section key={chapter.id}>
            <div className="mb-3 flex items-baseline justify-between gap-4 px-1">
              <h2 className="font-display text-xl tracking-tight sm:text-2xl">
                {chapter.label}
              </h2>
              <p className="kicker">{chapter.range}</p>
            </div>
            <div className="catalog">
              {rows.map((lesson) => (
                <LessonRow key={lesson.id} lesson={lesson} srs={srs} />
              ))}
            </div>
          </section>
        );
      })}
      {extras.length > 0 ? (
        <section>
          <div className="mb-3 flex items-baseline justify-between gap-4 px-1">
            <h2 className="font-display text-xl tracking-tight sm:text-2xl">
              Reference
            </h2>
            <p className="kicker">Appendix</p>
          </div>
          <div className="catalog">
            {extras.map((extra) => {
              const score = lessonScore(extra.keys ?? [], srs);
              const pct = score.total
                ? Math.round((score.known / score.total) * 100)
                : 0;
              return (
                <Link
                  key={extra.lessonId}
                  to="/vocabulary/$lessonId"
                  params={{ lessonId: extra.lessonId }}
                  className="catalog-row"
                >
                  <span className="w-8 shrink-0 font-display text-lg text-subtle">
                    {extra.mark}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium text-fg">
                      {extra.title}
                    </span>
                    <span className="mt-0.5 block text-sm text-muted">
                      {extra.meta}
                    </span>
                  </span>
                  {extra.keys ? <Meter pct={pct} /> : null}
                  <ChevronRight className="size-4 shrink-0 text-subtle" />
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function LessonRow({
  lesson,
  srs,
}: {
  lesson: VocabIndexLesson;
  srs: SrsMap;
}) {
  const score = lessonScore(lesson.keys, srs);
  const pct = score.total ? Math.round((score.known / score.total) * 100) : 0;
  return (
    <Link
      to="/vocabulary/$lessonId"
      params={{ lessonId: lesson.id }}
      className="catalog-row sm:px-5"
    >
      <span className="w-8 shrink-0 font-display text-lg tabular-nums text-subtle">
        {String(lesson.number).padStart(2, "0")}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-medium text-fg">{lesson.title}</span>
        <span className="mt-0.5 block text-sm text-muted">
          {lesson.wordCount} words
          {lesson.phraseCount > 0 ? ` · ${lesson.phraseCount} phrases` : ""}
          {score.due > 0 ? ` · ${score.due} due` : ""}
        </span>
      </span>
      <Meter pct={pct} />
      <ChevronRight className="size-4 shrink-0 text-subtle" />
    </Link>
  );
}

function Meter({ pct }: { pct: number }) {
  return (
    <span className="hidden w-16 shrink-0 sm:block">
      <span className="block text-right text-xs tabular-nums text-muted">{pct}%</span>
      <span className="meter mt-1.5 block">
        <span style={{ width: `${pct}%` }} />
      </span>
    </span>
  );
}
