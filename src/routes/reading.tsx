import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/reading")({
  component: ReadingLayout,
});

function ReadingLayout() {
  return <Outlet />;
}
