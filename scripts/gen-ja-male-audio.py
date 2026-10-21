#!/usr/bin/env python3
from __future__ import annotations

import asyncio
import hashlib
import json
import re
from pathlib import Path

import edge_tts

VOICE = "ja-JP-KeitaNeural"
RATE = "-8%"
OUT = Path("public/audio")
MAP = Path("src/lib/audio-male.ts")


def slug(text: str) -> str:
    return hashlib.sha1(text.encode("utf-8")).hexdigest()[:16]


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
    items: list[str] = json.loads(Path("/tmp/ja-audio.json").read_text())
    OUT.mkdir(parents=True, exist_ok=True)
    sem = asyncio.Semaphore(5)
    files: dict[str, str] = load_existing()

    async def one(text: str) -> None:
        path = OUT / f"{slug(text)}-m.mp3"
        if not (path.exists() and path.stat().st_size > 800):
            async with sem:
                await synth(text, path)
                print("ok", text, path.stat().st_size, flush=True)
        files[text] = f"/audio/{path.name}"

    await asyncio.gather(*(one(t) for t in items))
    lines = [
        "/** Male Japanese pronunciation (Keita neural). */",
        "export const AUDIO_MALE: Record<string, string> = {",
    ]
    for text in sorted(files):
        lines.append(f"  {json.dumps(text, ensure_ascii=False)}: {json.dumps(files[text])},")
    lines.append("};")
    lines.append("")
    MAP.write_text("\n".join(lines), encoding="utf-8")
    print("wrote", MAP, "keys", len(files))


if __name__ == "__main__":
    asyncio.run(main())
