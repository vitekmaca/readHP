// Sestaví kamen-mudrcu.html ze šablony: vloží obrázky z assets/ jako base64 data URI.
// Spuštění:  node build.mjs
//
// Tokeny v šabloně kamen-mudrcu.template.html:
//   __MAP_DATA_URI__   -> assets/map.jpg            (mapa Bradavic a okolí)
//   __IMG_<id>__       -> assets/portraits/<id>.jpg  (portréty postav)
//   __SCENE_<n>__      -> assets/scenes/<n>.jpg      (ilustrace kapitol 1..17)
//
// Seznam tokenů se čte přímo ze šablony, takže build zůstává v synchronu s ní.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATE = path.join(ROOT, 'kamen-mudrcu.template.html');
const OUT = path.join(ROOT, 'kamen-mudrcu.html');
const ASSETS = path.join(ROOT, 'assets');

const dataUri = (file) => 'data:image/jpeg;base64,' + fs.readFileSync(file).toString('base64');

function requireAsset(file, label) {
  if (!fs.existsSync(file)) {
    console.error(`✗ Chybí ${label}: ${path.relative(ROOT, file)}`);
    process.exit(1);
  }
  return file;
}

let html = fs.readFileSync(TEMPLATE, 'utf8');
if (html.charCodeAt(0) === 0xFEFF) html = html.slice(1); // pro jistotu bez BOM na vstupu

// Sestav mapu token -> data URI podle toho, co je v šabloně.
const tokens = new Map();
tokens.set('__MAP_DATA_URI__', dataUri(requireAsset(path.join(ASSETS, 'map.jpg'), 'mapa')));
for (const m of html.matchAll(/__IMG_([a-z0-9-]+)__/g)) {
  const id = m[1];
  tokens.set(m[0], dataUri(requireAsset(path.join(ASSETS, 'portraits', `${id}.jpg`), `portrét ${id}`)));
}
for (const m of html.matchAll(/__SCENE_(\d+)__/g)) {
  const n = m[1];
  tokens.set(m[0], dataUri(requireAsset(path.join(ASSETS, 'scenes', `${n}.jpg`), `scéna ${n}`)));
}

let count = 0;
for (const [token, uri] of tokens) {
  if (html.includes(token)) { html = html.split(token).join(uri); count++; }
}

// Pojistka: v sestaveném souboru nesmí zbýt žádný __token__.
const leftover = html.match(/__[A-Za-z0-9-]+__/);
if (leftover) { console.error(`✗ Nenahrazený token: ${leftover[0]}`); process.exit(1); }

fs.writeFileSync(OUT, html, 'utf8'); // bez BOM
const mb = (fs.statSync(OUT).size / 1024 / 1024).toFixed(2);
console.log(`✓ ${path.basename(OUT)} sestaveno — ${count} obrázků vloženo, ${mb} MB`);
