import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/cards")({
  component: CardsLayout,
});

function CardsLayout() {
  return <Outlet />;
}
