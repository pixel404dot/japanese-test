import type { RubyPart } from "@/lib/reading";

export function JpRuby({
  parts,
  className,
}: {
  parts: RubyPart[];
  className?: string;
}) {
  return (
    <span className={className}>
      {parts.map((p, i) =>
        p.f ? (
          <ruby key={i}>
            {p.t}
            <rt>{p.f}</rt>
          </ruby>
        ) : (
          <span key={i}>{p.t}</span>
        ),
      )}
    </span>
  );
}
