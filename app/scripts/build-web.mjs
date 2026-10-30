// Wraps the single-file game (../yerin-alti.html, also the published artifact) into an
// offline www/ bundle for Capacitor: real document shell, safe-area padding, local fonts.
import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const game = readFileSync(join(root, '..', 'yerin-alti.html'), 'utf8')
  .replace(/<link rel="(preconnect|stylesheet)" href="https:\/\/fonts\.(googleapis|gstatic)\.com[^>]*>\n?/g, '');
const title = (game.match(/<title>([^<]*)<\/title>/) || [, 'Kazdıkça'])[1];
const body = game.replace(/<title>[^<]*<\/title>\n?/, '').replace(/<meta name="claude:[^>]*>\n?/g, '');

const html = `<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no">
<meta name="theme-color" content="#14161b">
<title>${title}</title>
<link rel="stylesheet" href="fonts.css">
<style>
:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);box-sizing:border-box;height:100%}
body{margin:0;-webkit-touch-callout:none}
img{max-width:100%}
[hidden]{display:none!important}
</style>
</head>
<body>
${body}
</body>
</html>
`;
const out = join(root, 'www');
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
writeFileSync(join(out, 'index.html'), html);
cpSync(join(root, 'web', 'fonts'), join(out, 'fonts'), { recursive: true });
cpSync(join(root, 'web', 'fonts.css'), join(out, 'fonts.css'));
console.log(`www/index.html yazıldı (${(html.length / 1024).toFixed(0)} KB)`);
