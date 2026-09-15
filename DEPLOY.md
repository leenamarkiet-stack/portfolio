# Deploying the password-protected site

This repo is the **private source**. The public site is built into `dist/` and
published to a **separate public repo** that serves GitHub Pages.

The split exists because StatiCrypt encrypts the *served* HTML only. If the
plaintext lived in a public repo, anyone could read it straight from GitHub and
the password would protect nothing.

## Build

```bash
npm install
STATICRYPT_PASSWORD='your-visitor-password' ./build.sh
```

`dist/` then contains:

- `index.html`, `article.html` — AES-encrypted behind the password
- `admin.html` — **not** encrypted; it has its own login
- all images, `leena-markiet-cv.pdf`, `config.js`
- `vendor/` — React, served same-origin

## What the build does

1. Copies assets and rewrites `raw.githubusercontent.com/...` URLs to relative
   paths, so the pages do not depend on the source repo being public.
2. Vendors React locally. StatiCrypt writes the decrypted page with
   `document.write`, and Chrome blocks parser-blocking cross-site scripts
   injected that way on slow connections.
3. Precompiles the JSX. Babel standalone only transforms `text/babel` scripts on
   `DOMContentLoaded`, which has already fired by the time StatiCrypt injects the
   page — without this step the encrypted build renders a blank page.
4. Runs StatiCrypt over `index.html` and `article.html`.

## Publish

Push the contents of `dist/` to the public repo's default branch, with Pages
serving from the repo root.

## Caveats

- Images and the CV PDF are **not** encrypted — StatiCrypt only covers HTML.
  Anyone with a direct file URL can fetch them.
- The password is not stored in this repo. Keep it somewhere safe; rebuilding
  with a different password invalidates "Remember me" for existing visitors.
