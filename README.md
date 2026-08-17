# Kámen mudrců 🪄

Interaktivní průvodce prvním rokem v Bradavicích, pro předčítání dětem. Postavené stejně jako [readLOTR](https://github.com/brychtaj/readLOTR) — fanouškovský projekt, žádná oficiální appka.

➡️ Živě na **https://vitekmaca.github.io/readHP/** (GitHub Pages, zatím bez portrétů/ilustrací — viz níže; audio ke kapitole 1 už tam je). Po doplnění obrázků (viz níže) jde appku spustit i lokálně: otevři **`index.html`** v prohlížeči.

## Co appka umí

- 🎧 **Namluvené kapitoly** — audiopřehrávač u každé kapitoly, doplňuje se postupně jak přibývají nahrávky (soubory v `assets/audio/`).
- 🧙 **31 postav** s portréty a „příběhem zatím", který se dopisuje podle toho, co už bylo přečteno.
- 🖼️ **Malovaná ilustrace** klíčového momentu ke každé ze 17 kapitol.
- 📖 **Dva režimy**: *Rodiče* (shrnutí, na co se zaměřit, otázky pro děti, „metr strašidelnosti" ⚠️) a *Děti* (bez spoilerů — jen „co bylo minule" a kvízy).
- 🌍 **Svět** — Kámen mudrců, Voldemort, Zrcadlo z Erisedu, Chloupek, národy kouzelnického světa (kouzelníci, mudlové, skřeti, kentauři…) a časová osa před začátkem příběhu.
- 🌗 Světlý/tmavý motiv v hlavičce.

Appka je jen česky (žádný jazykový přepínač). Jména míst a postav drží oficiální překlad **Pavla Medka** (Bradavice, Nebelvír, Brumbál…) — u pár méně známých jmen (viz níže) to prosím ověř podle svého výtisku, nejsem si u nich stoprocentně jistý přesným zněním.

## Struktura projektu

- `index.html` — **sestavená appka** (jeden soubor). Slouží GitHub Pages i pro lokální otevření. Dokud nejsou portréty/ilustrace v `assets/`, je to jen kopie šablony bez vložených obrázků (postavy mají místo portrétu ikonku) — po buildu s doplněnými obrázky se přepíše finální verzí.
- `kamen-mudrcu.template.html` — **zdrojová šablona** (HTML/CSS/JS + veškerý text). Tady se edituje obsah.
- `assets/` — obrázky a audio (zatím prázdné/částečné složky, viz seznam níže):
  - `portraits/<id>.jpg` — portréty postav (vkládají se do `index.html` při buildu),
  - `scenes/<n>.jpg` — ilustrace kapitol `1`–`17` (vkládají se při buildu),
  - `audio/<gi>.m4a` — namluvené kapitoly (**odkazované**, ne vkládané do HTML — jsou moc velké na base64). `1.m4a` už je nahraný.
- `build.mjs` — build skript (Node), stejný princip jako u LOTR appky. Audio soubory nijak nezpracovává, jen očekává, že fyzicky existují na správné cestě.

## Build

Po doplnění obrázků do `assets/` spusť:

```bash
node build.mjs
```

Skript vezme `kamen-mudrcu.template.html`, nahradí tokeny obrázků z `assets/` (jako base64 data URI) a zapíše `index.html`. Pokud něco chybí, build to nahlásí a skončí chybou — takže se nedá omylem odeslat appka s rozbitým obrázkem. Po buildu stačí `index.html` commitnout a pushnout — GitHub Pages se sama aktualizuje.

---

## Co přesně potřebuju od tebe (obrázky)

Appka bez obrázků nezobrazí nic u postav a scén kapitol (jen ikonku/prázdno — build navíc bez nich rovnou selže). Potřebuju **48 souborů**, všechny `.jpg`:

### 17 ilustrací kapitol

`assets/scenes/1.jpg` … `assets/scenes/17.jpg` — malovaná scéna klíčového momentu dané kapitoly, orientace na šířku. Doporučuju se podívat na captions přímo v šabloně (proměnná `ILLUS`, řádky u `var ILLUS={` — tam je u každého čísla přesně popsaný moment, který má ilustrace zachytit), např.:

| # | Klíčový moment |
|---|---|
| 1 | Brumbál, McGonagallová a Hagrid nechávají miminko Harryho přede dveřmi v Zobí ulici |
| 2 | V zoo mizí sklo teraria, had vyklouzne, Dudley padá do vody |
| 3 | Stovky dopisů létají komínem a okny |
| 4 | Hagrid vyráží dveře chatrče, popřeje Harrymu k narozeninám |
| 5 | Harryho hůlka z cesmíny se sama rozzáří u Ollivandera |
| 6 | Ron a Harry se poznávají v kupé Bradavického expresu |
| 7 | Moudrý klobouk na Harryho hlavě křičí „NEBELVÍR!" |
| 8 | Snape se sklání nad Harrym v podzemní učebně lektvarů |
| 9 | Chloupek, třihlavý pes, ve dveřích zapovězené chodby |
| 10 | Troll v dívčí toaletě, Harry mu skáče na záda |
| 11 | Harry visí na vzpurném koštěti nad famfrpálovým hřištěm |
| 12 | Harry v Zrcadle z Erisedu vidí své rodiče |
| 13 | Hermiona nachází jméno Mikuláš Flamel v knihovně |
| 14 | Hagrid pyšně chová dráčka Norberta |
| 15 | Zahalená postava pije jednorožčí krev, přibíhá kentaur Firenze |
| 16 | Ron se obětuje v obřích kouzelnických šachách |
| 17 | Quirrell si sundá turban a odhalí Voldemortovu tvář |

(Přesné anglické/české popisky jsou v šabloně — klidně mi je vytáhnu do samostatného souboru, kdyby se ti to hodilo pro zadávání do generátoru.)

### 31 portrétů postav

`assets/portraits/<id>.jpg` — orientace na výšku (poměr stran 3:4). Seznam id → jméno (přesně takhle se musí jmenovat soubor):

| soubor | postava |
|---|---|
| `harry.jpg` | Harry Potter |
| `ron.jpg` | Ron Weasley |
| `hermiona.jpg` | Hermiona Grangerová |
| `hagrid.jpg` | Hagrid |
| `brumbal.jpg` | Albus Brumbál |
| `mcgonagallova.jpg` | Minerva McGonagallová |
| `snape.jpg` | Severus Snape |
| `draco.jpg` | Draco Malfoy |
| `neville.jpg` | Neville Longbottom |
| `nick.jpg` | Skoro bezhlavý Nick |
| `filch.jpg` | Argus Filch |
| `voldemort.jpg` | Voldemort |
| `quirrell.jpg` | Quirinus Quirrell |
| `chloupek.jpg` | Chloupek (třihlavý pes) |
| `norbert.jpg` | Norbert (dráček) |
| `firenze.jpg` | Firenze (kentaur) |
| `ollivander.jpg` | Ollivander |
| `flamel.jpg` | Mikuláš Flamel |
| `vernon.jpg` | Strýc Vernon Dursley |
| `petunie.jpg` | Teta Petunie Dursleyová |
| `dudley.jpg` | Dudley Dursley |
| `james.jpg` | James Potter |
| `lily.jpg` | Lily Potterová |
| `protiva.jpg` | Protiva (Peeves) |
| `paninorrisova.jpg` | Paní Norrisová (kočka) |
| `fredgeorge.jpg` | Fred a George Weasleyovi (dvojčata) |
| `percy.jpg` | Percy Weasley |
| `madamhoochova.jpg` | Madame Hoochová |
| `madampomfreyova.jpg` | Madame Pomfreyová |
| `griphook.jpg` | Griphook (bankovní skřet) |
| `buclatadama.jpg` | Buclatá dáma (mluvící portrét) |

### Styl

LOTR appka používala malované ilustrace ve stylu Midjourney ("styl C", teplá kamenná paleta). Pro konzistentní vzhled doporučuju:

- **Jednotný malovaný/ilustrovaný styl** napříč všemi 48 obrázky (ne fotky, ne mix stylů) — ideálně stejný seed/styl parametr v generátoru pro všechny.
- **Teplá, "svíčkami osvětlená" paleta** — appka má barevné schéma pergamen + zlatá + tmavě vínová (viz CSS proměnné `--gold`, `--ember` v šabloně), takže ilustrace v teplých tónech budou sedět nejlíp.
- **Žádná oficiální loga/erby** — vyhni se přesné reprodukci skutečného erbu Bradavic nebo log filmové série (jsou to chráněné ochranné známky Warner Bros.). Já jsem proto pro appku nakreslil vlastní jednoduchou ikonku (hůlka + jiskra), ne oficiální erb.
- **Žádná podobizna filmových herců** — bezpečnější je malovaná/stylizovaná podoba než realistická podobizna konkrétního herce.

### Jména k ověření

U pár méně známých jmen jsem si nebyl stoprocentně jistý přesným zněním v Medkově překladu — než to pošleš dál, zkontroluj prosím v knize:
- **Madame Hoochová** (Madam Hooch, učitelka létání)
- **Madame Pomfreyová** (Madam Pomfrey, školní ošetřovatelka)
- **Griphook** (možná má v knize počeštěné jméno, nechal jsem anglické jako bezpečnou variantu)

Názvy kapitol v appce jsou moje vlastní parafráze (ne doslovný text knihy) — pokud chceš, aby přesně seděly s tvým výtiskem, klidně mi řekni a upravím.
