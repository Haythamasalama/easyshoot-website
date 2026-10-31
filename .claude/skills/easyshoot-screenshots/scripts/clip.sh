#!/bin/bash
# Put a PNG on the clipboard, ready for EasyShoot's File > Annotate Clipboard Image.
# Usage: clip.sh <image.png>
set -euo pipefail
file="$(cd "$(dirname "$1")" && pwd)/$(basename "$1")"
osascript -e "set the clipboard to (read (POSIX file \"$file\") as «class PNGf»)"
echo "On the clipboard: $file"
