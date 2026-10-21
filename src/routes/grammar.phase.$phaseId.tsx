import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { GRAMMAR_PHASES, grammarId, pointsInPhase } from "@/lib/grammar";

export const Route = createFileRoute("/grammar/phase/$phaseId")({
  component: GrammarPhasePage,
});

function GrammarPhasePage() {
  const { phaseId } = Route.useParams();
  const phase = GRAMMAR_PHASES.find((item) => String(item.number) === phaseId);
  if (!phase) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="font-display text-2xl">Phase not found</p>
        <Button asChild variant="secondary">
          <Link to="/grammar">Back to grammar</Link>
        </Button>
      </main>
    );
  }
  const points = pointsInPhase(phase.number);

  return (
    <main className="page">
      <PageHeader
        backTo="/grammar"
        backLabel="Phases"
        kicker={`Phase ${String(phase.number).padStart(2, "0")}`}
        title={phase.title}
        description={phase.blurb}
      />
      <div className="catalog">
        {points.map((point, index) => (
          <Link
            key={point.n}
            to="/grammar/$pointId"
            params={{ pointId: grammarId(point.n) }}
            className="catalog-row sm:px-5"
          >
            <span className="w-8 shrink-0 font-display text-lg tabular-nums text-subtle">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate font-kana text-lg leading-tight text-fg">
                {point.pattern}
              </span>
              <span className="mt-0.5 block truncate font-bn text-sm text-muted">{point.bn}</span>
            </span>
            <ChevronRight className="size-4 shrink-0 text-subtle" />
          </Link>
        ))}
      </div>
    </main>
  );
}
