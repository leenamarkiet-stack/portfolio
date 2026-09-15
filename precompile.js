// StatiCrypt injects the decrypted document after DOMContentLoaded has already
// fired, and Babel standalone only auto-transforms text/babel scripts on that
// event — so an encrypted build would never mount React. Compile the JSX ahead
// of time instead, which also drops the 3MB Babel download from the page.
const fs = require('fs');
const babel = require('@babel/core');

const file = process.argv[2];
let html = fs.readFileSync(file, 'utf8');

const open = '<script type="text/babel">';
const start = html.indexOf(open);
if (start === -1) { process.exit(0); }
const from = start + open.length;
const end = html.indexOf('</script>', from);
if (end === -1) { throw new Error('unterminated text/babel script in ' + file); }

const jsx = html.slice(from, end);
const { code } = babel.transform(jsx, {
  presets: [[require('@babel/preset-react'), { runtime: 'classic' }]],
  filename: file,
  compact: false,
  babelrc: false,
  configFile: false,
});

html = html.slice(0, start) + '<script>' + code + html.slice(end);
// The standalone transformer is dead weight once the JSX is compiled.
html = html.replace(/\s*<script src="https:\/\/unpkg\.com\/@babel\/standalone@[^"]*"><\/script>/, '');
fs.writeFileSync(file, html);
console.log('precompiled ' + file);
