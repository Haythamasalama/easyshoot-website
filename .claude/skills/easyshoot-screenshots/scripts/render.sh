#!/bin/bash
# Render a web page to a PNG at 2x, light mode, with headless Chrome.
# Gives up after 45 seconds (headless Chrome sometimes hangs); just run it again.
# Usage: render.sh <url> <out.png> [width] [height]
set -euo pipefail
url="$1"; out="$2"; w="${3:-1200}"; h="${4:-800}"
mkdir -p "$(dirname "$out")"
rm -f "$out"
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars \
  --blink-settings=preferredColorScheme=1 --force-device-scale-factor=2 \
  --window-size="$w,$h" --virtual-time-budget=12000 --screenshot="$out" "$url" 2>/dev/null &
pid=$!
for _ in $(seq 1 45); do kill -0 "$pid" 2>/dev/null || break; sleep 1; done
if kill -0 "$pid" 2>/dev/null; then kill "$pid"; pkill -P "$pid" 2>/dev/null || true; fi
[ -s "$out" ] || { echo "render failed for $url, try again" >&2; exit 1; }
sips -g pixelWidth -g pixelHeight "$out" | grep pixel
