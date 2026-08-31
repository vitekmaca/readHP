// Sestaví index.html ze šablony: vloží obrázky z assets/ jako base64 data URI.
// Spuštění:  node build.mjs
//
// Tokeny v šabloně kamen-mudrcu.template.html:
//   __IMG_<id>__       -> assets/portraits/<id>.jpg  (portréty postav)
//   __SCENE_<n>__      -> assets/scenes/<n>.jpg      (ilustrace kapitol 1..17)
//
// Audio (assets/audio/<gi>.m4a) se do šablony nevkládá jako data URI — je to
// jen odkaz na soubor v repu (base64 by pro audio bylo příliš objemné pro
// jeden HTML soubor). Stačí soubor mít fyzicky v assets/audio/.
//
// Seznam tokenů se čte přímo ze šablony, takže build zůstává v synchronu s ní.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATE = path.join(ROOT, 'kamen-mudrcu.template.html');
const OUT = path.join(ROOT, 'index.html');
const ASSETS = path.join(ROOT, 'assets');

const dataUri = (file) => 'data:image/jpeg;base64,' + fs.readFileSync(file).toString('base64');

// Nevyžaduje všechny obrázky najednou — appka umí chybějící portrét/scénu
// zobrazit jako ikonku (viz hasPortrait()/hasScene() v šabloně), takže build
// jde spustit opakovaně, jak obrázky postupně přibývají.
let html = fs.readFileSync(TEMPLATE, 'utf8');
if (html.charCodeAt(0) === 0xFEFF) html = html.slice(1); // pro jistotu bez BOM na vstupu

const tokens = new Map();
const missing = [];
for (const m of html.matchAll(/__IMG_([a-z0-9-]+)__/g)) {
  const id = m[1];
  const file = path.join(ASSETS, 'portraits', `${id}.jpg`);
  if (fs.existsSync(file)) tokens.set(m[0], dataUri(file)); else missing.push(`portrét ${id}`);
}
for (const m of html.matchAll(/__SCENE_(\d+)__/g)) {
  const n = m[1];
  const file = path.join(ASSETS, 'scenes', `${n}.jpg`);
  if (fs.existsSync(file)) tokens.set(m[0], dataUri(file)); else missing.push(`scéna ${n}`);
}

let count = 0;
for (const [token, uri] of tokens) {
  if (html.includes(token)) { html = html.split(token).join(uri); count++; }
}

fs.writeFileSync(OUT, html, 'utf8'); // bez BOM
const mb = (fs.statSync(OUT).size / 1024 / 1024).toFixed(2);
console.log(`✓ ${path.basename(OUT)} sestaveno — ${count} obrázků vloženo, ${mb} MB`);
if (missing.length) console.log(`… zatím chybí (${missing.length}): ${missing.join(', ')}`);
