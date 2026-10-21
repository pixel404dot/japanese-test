#!/usr/bin/env python3
"""Generate Bangla mp3s with Microsoft Nabanita neural voice."""
from __future__ import annotations

import asyncio
import hashlib
import json
import re
import sys
from pathlib import Path

import edge_tts

VOICE = "bn-BD-NabanitaNeural"
RATE = "-5%"
OUT = Path("public/audio")
MAP = Path("src/lib/audio-bn.ts")


def slug(text: str) -> str:
    return hashlib.sha1(("bn:" + text).encode("utf-8")).hexdigest()[:16]


def load_existing() -> dict[str, str]:
    if not MAP.exists():
        return {}
    text = MAP.read_text(encoding="utf-8")
    found: dict[str, str] = {}
    for m in re.finditer(r'^\s*("(?:\\.|[^"\\])*")\s*:\s*("(?:\\.|[^"\\])*")', text, re.M):
        found[json.loads(m.group(1))] = json.loads(m.group(2))
    return found


async def synth(text: str, path: Path) -> None:
    comm = edge_tts.Communicate(text, VOICE, rate=RATE)
    await comm.save(str(path))


async def main() -> None:
    items: list[str] = json.loads(Path("/tmp/bn-audio.json").read_text())
    existing = load_existing()
    OUT.mkdir(parents=True, exist_ok=True)
    sem = asyncio.Semaphore(5)
    ok = 0
    fail: list[str] = []

    async def one(text: str) -> None:
        nonlocal ok
        path = OUT / f"bn-{slug(text)}.mp3"
        if path.exists() and path.stat().st_size > 800:
            existing[text] = f"/audio/{path.name}"
            ok += 1
            return
        async with sem:
            try:
                await synth(text, path)
                if path.stat().st_size < 800:
                    path.unlink(missing_ok=True)
                    raise RuntimeError("tiny file")
                existing[text] = f"/audio/{path.name}"
                ok += 1
                print("ok", text, path.stat().st_size, flush=True)
            except Exception as e:
                fail.append(f"{text}: {e}")
                print("fail", text, e, flush=True)

    await asyncio.gather(*(one(t) for t in items))

    lines = [
        "/** Bangla meanings (Nabanita neural). */",
        "export const AUDIO_BN: Record<string, string> = {",
    ]
    for text in sorted(existing, key=lambda s: s):
        lines.append(f"  {json.dumps(text, ensure_ascii=False)}: {json.dumps(existing[text])},")
    lines.append("};")
    lines.append("")
    MAP.write_text("\n".join(lines), encoding="utf-8")
    print(f"done ok={ok} fail={len(fail)} map={MAP} keys={len(existing)}")
    if fail:
        print("\n".join(fail), file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    asyncio.run(main())
