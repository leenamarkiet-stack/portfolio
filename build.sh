#!/usr/bin/env bash
# Builds the public, password-protected copy of the site into dist/.
#
# This repo is the private source. dist/ is what gets published to the public
# repo that serves GitHub Pages, so nothing here should assume the source repo
# is reachable: asset URLs are rewritten from raw.githubusercontent.com to
# plain relative paths and the files are copied in alongside.
#
# index.html and article.html are AES-encrypted by StatiCrypt. admin.html is
# left in the clear because it has its own login.
#
# Usage: STATICRYPT_PASSWORD='...' ./build.sh
set -euo pipefail

if [ -z "${STATICRYPT_PASSWORD:-}" ]; then
  echo "error: set STATICRYPT_PASSWORD to the visitor password" >&2
  exit 1
fi

RAW='https://raw.githubusercontent.com/leenamarkiet-stack/portfolio/main/'
OUT=dist

rm -rf "$OUT"
mkdir -p "$OUT"

# Assets the pages reference, plus the published settings file.
cp ./*.png "$OUT"/
cp ./*.pdf "$OUT"/
# SVG so animated artwork (e.g. the ASDS loading animation) reaches the site;
# nullglob keeps the build working while none exist.
shopt -s nullglob
svgs=(./*.svg); [ ${#svgs[@]} -gt 0 ] && cp "${svgs[@]}" "$OUT"/
shopt -u nullglob
cp config.js "$OUT"/

# Strip the absolute source-repo URLs (and their cache-busting query strings,
# which relative paths do not need) so the pages are self-contained.
for f in index.html article.html admin.html; do
  sed -e "s#${RAW}##g" \
      -e "s#\(\(signature\|leena-profile-photo\)\.png\)?v=[0-9]*#\1#g" \
      "$f" > "$OUT/$f"
done

# Vendor React locally. StatiCrypt writes the decrypted page with document.write,
# and Chrome blocks parser-blocking cross-site scripts injected that way on slow
# connections — so a CDN copy is not just slower here, it is unreliable.
mkdir -p "$OUT/vendor"
cp node_modules/react/umd/react.production.min.js "$OUT/vendor/"
cp node_modules/react-dom/umd/react-dom.production.min.js "$OUT/vendor/"

for f in index.html article.html admin.html; do
  sed -i \
    -e "s#https://unpkg.com/react@18.3.1/umd/react.development.js#vendor/react.production.min.js#g" \
    -e "s#https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js#vendor/react-dom.production.min.js#g" \
    "$OUT/$f"
done

# Compile the JSX before encrypting (see precompile.js for why).
for f in index.html article.html admin.html; do
  node precompile.js "$OUT/$f"
done

npx staticrypt "$OUT/index.html" "$OUT/article.html" \
  --password "$STATICRYPT_PASSWORD" \
  --short \
  --remember 30 \
  --template-title "Leena Markiet" \
  --template-instructions "This portfolio is private. Enter the password to continue." \
  --template-button "Enter" \
  --template-color-primary "#546B41" \
  --template-color-secondary "#F7EBDC" \
  -d "$OUT"

echo "built $OUT/"
