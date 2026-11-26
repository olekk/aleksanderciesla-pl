#!/usr/bin/env bash
# Kompresuje nagrania stron pod web: public/media/<nazwa>.mp4 + <nazwa>.webp (poster).
# Użycie: bash scripts/encode-videos.sh [katalog_z_nagraniami]
set -euo pipefail
SRC="${1:-../portfolio-nagrania}"
OUT="$(dirname "$0")/../public/media"
mkdir -p "$OUT"
for f in "$SRC"/*.mp4; do
  n="$(basename "$f" .mp4)"
  if [[ "$n" == *-mobile ]]; then scale="520:-2"; else scale="1280:-2"; fi
  if [[ -f "$OUT/$n.mp4" && "$OUT/$n.mp4" -nt "$f" ]]; then echo "pomijam $n (aktualne)"; continue; fi
  echo "koduję $n"
  ffmpeg -v error -y -i "$f" -an -vf "scale=$scale:flags=lanczos,fps=30" \
    -c:v libx264 -preset slow -crf 28 -pix_fmt yuv420p -profile:v high -movflags +faststart "$OUT/$n.mp4"
  ffmpeg -v error -y -ss 0.5 -i "$f" -frames:v 1 -vf "scale=$scale" -c:v libwebp -quality 72 "$OUT/$n.webp"
  # Mniejszy plakat dla małych ekranów (Showcase wybiera go skryptem, Lighthouse: responsive images).
  if [[ "$n" == *-mobile ]]; then small="260:-2"; sn="$n-260"; else small="640:-2"; sn="$n-640"; fi
  ffmpeg -v error -y -ss 0.5 -i "$f" -frames:v 1 -vf "scale=$small:flags=lanczos" -c:v libwebp -quality 78 "$OUT/$sn.webp"
done
ls -la "$OUT"
