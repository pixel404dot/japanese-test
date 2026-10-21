#!/usr/bin/env python3
"""Record each grammar lesson in Grok's Ara voice, with line start times."""

import base64
import json
import os
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

ROOT = Path("/workspace/public/audio/grammar")
SCRIPTS = Path("/tmp/grammar-scripts.json")
API = "https://api.x.ai/v1/tts"


def starts_for(text: str, spans: list, chars: list, times: list, duration: float) -> list[float]:
    if chars and len(chars) == len(text):
        return [round(times[start][0], 3) for start, _end in spans]
    total = max(1, len(text))
    return [round(duration * (start / total), 3) for start, _end in spans]


def synth(item: dict, key: str) -> str:
    body = json.dumps(
        {
            "text": item["text"],
            "voice_id": "ara",
            "language": "auto",
            "with_timestamps": True,
            "output_format": {"codec": "mp3", "sample_rate": 24000, "bit_rate": 128000},
        }
    ).encode()
    last = "failed"
    for attempt in range(3):
        req = urllib.request.Request(
            API,
            data=body,
            headers={
                "Authorization": f"Bearer {key}",
                "Content-Type": "application/json",
            },
        )
        try:
            with urllib.request.urlopen(req, timeout=180) as res:
                payload = json.load(res)
            break
        except urllib.error.HTTPError as err:
            last = f"HTTP {err.code}"
            if err.code not in (429, 500, 502, 503):
                detail = err.read()[:200]
                raise RuntimeError(f"{item['id']} {last} {detail!r}") from err
        except Exception as err:  # noqa: BLE001
            last = str(err)
        else:
            continue
    else:
        raise RuntimeError(f"{item['id']} {last}")

    audio = base64.b64decode(payload["audio"])
    stamps = payload["audio_timestamps"]
    duration = float(payload.get("duration") or 0)
    starts = starts_for(
        item["text"],
        item["spans"],
        stamps.get("graph_chars") or [],
        stamps.get("graph_times") or [],
        duration,
    )
    (ROOT / f"{item['id']}.mp3").write_bytes(audio)
    (ROOT / f"{item['id']}.json").write_text(
        json.dumps({"starts": starts, "duration": round(duration, 3)})
    )
    return f"{item['id']} {len(audio)} {duration:.1f}s {len(starts)} lines"


def main() -> None:
    key = os.environ["XAI_API_KEY"]
    items = json.loads(SCRIPTS.read_text())
    ROOT.mkdir(parents=True, exist_ok=True)
    pending = []
    for item in items:
        mp3 = ROOT / f"{item['id']}.mp3"
        meta = ROOT / f"{item['id']}.json"
        if mp3.stat().st_size > 1000 and meta.exists() if mp3.exists() else False:
            continue
        pending.append(item)
    print(f"todo {len(pending)} / {len(items)}", flush=True)
    done = 0
    with ThreadPoolExecutor(max_workers=4) as pool:
        futures = [pool.submit(synth, item, key) for item in pending]
        for future in as_completed(futures):
            done += 1
            print(f"{done}/{len(pending)} {future.result()}", flush=True)


if __name__ == "__main__":
    main()
