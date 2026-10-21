import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

export function PageHeader({
  glyph,
  kicker,
  title,
  description,
  backTo,
  backLabel,
  children,
}: {
  glyph?: string;
  kicker?: string;
  title: string;
  description?: ReactNode;
  backTo?: LinkProps["to"];
  backLabel?: string;
  children?: ReactNode;
}) {
  return (
    <header className="mb-8">
      {backTo ? (
        <Link to={backTo} className="back-link">
          <ArrowLeft className="size-3.5" />
          {backLabel ?? "Back"}
        </Link>
      ) : null}
      {glyph ? (
        <p className={backTo ? "glyph mt-5" : "glyph"}>{glyph}</p>
      ) : null}
      {kicker ? (
        <p className={glyph || backTo ? "kicker mt-5" : "kicker"}>{kicker}</p>
      ) : null}
      <h1
        className={
          glyph || kicker || backTo
            ? "mt-2 font-display text-4xl tracking-tight sm:text-5xl"
            : "font-display text-4xl tracking-tight sm:text-5xl"
        }
      >
        {title}
      </h1>
      {description ? (
        <div className="mt-3 max-w-xl text-muted">{description}</div>
      ) : null}
      {children}
    </header>
  );
}
