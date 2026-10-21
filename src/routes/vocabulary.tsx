import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/vocabulary")({
  component: VocabularyLayout,
});

function VocabularyLayout() {
  return <Outlet />;
}
