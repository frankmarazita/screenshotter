#!/usr/bin/env bash

# get current directory of this script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

CURRENT_TIME=$(date +"%Y-%m-%d_%H-%M-%S")

mkdir -p "$DIR/../out"

rm -f "$DIR/../out/output.png"

curl -X POST http://localhost:3000/screenshot \
-H "Content-Type:application/json" \
-H "x-custom-header: My Custom Header" \
-H "x-timestamp: $CURRENT_TIME" \
-d '{"url": "https://showheaders.com/headers.php", "dimensions": {"height": 1448, "width": 1072}, "color": false}' \
--output "$DIR/../out/output.png"
