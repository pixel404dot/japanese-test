import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { READING_LESSONS } from "@/lib/reading";

export const Route = createFileRoute("/reading/")({
  component: ReadingIndex,
});

function ReadingIndex() {
  return (
    <main className="page">
      <PageHeader
        backTo="/"
        backLabel="Studio"
        glyph="読"
        title="Reading"
        description="Sentence patterns, examples, and conversations from Minna no Nihongo. Listen, then hide the meaning and read again."
      />
      <div className="divide-y divide-border overflow-hidden rounded-2xl bg-surface shadow-[var(--shadow-border)]">
        {READING_LESSONS.map((lesson) => (
          <Link
            key={lesson.id}
            to="/reading/$lessonId"
            params={{ lessonId: lesson.id }}
            className="flex items-center gap-4 px-4 py-5 no-underline transition-colors duration-150 hover:bg-elevated sm:px-5"
          >
            <span className="w-8 shrink-0 font-display text-lg tabular-nums text-subtle">
              {String(lesson.number).padStart(2, "0")}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-fg">{lesson.title}</p>
              <p className="mt-1 font-display text-sm text-muted">
                {lesson.titleJa}
              </p>
              <p className="mt-1 text-sm text-muted">
                {lesson.patterns.length} patterns · {lesson.examples.length}{" "}
                examples · 会話
              </p>
            </div>
            <ChevronRight className="size-4 shrink-0 text-subtle" />
          </Link>
        ))}
      </div>
    </main>
  );
}
