#!/bin/bash
# Capture one window (with its macOS shadow and transparent surroundings) to a PNG
# at the display's native resolution. Pass a max width only if a smaller file is needed.
# Needs Screen Recording permission for the app running this script.
# Usage: capture-window.sh <window_id> <out.png> [max_width]
set -euo pipefail
id="$1"; out="$2"; max="${3:-}"
mkdir -p "$(dirname "$out")"
if ! screencapture -x -l "$id" "$out" 2>/dev/null || [ ! -s "$out" ]; then
  echo "could not create image from window $id: turn on Screen Recording for the app running Claude (see SKILL.md, step 0)" >&2
  exit 1
fi
[ -n "$max" ] && sips -Z "$max" "$out" >/dev/null
sips -g pixelWidth -g pixelHeight "$out" | grep pixel
ls -lh "$out" | awk '{print $5, $9}'
