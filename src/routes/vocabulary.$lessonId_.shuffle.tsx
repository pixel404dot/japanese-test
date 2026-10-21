import { createFileRoute } from "@tanstack/react-router";
import { VocabSheet } from "@/components/vocab-sheet";

export const Route = createFileRoute("/vocabulary/$lessonId_/shuffle")({
  component: LessonShufflePage,
});

function LessonShufflePage() {
  const { lessonId } = Route.useParams();
  return <VocabSheet lessonId={lessonId} />;
}
