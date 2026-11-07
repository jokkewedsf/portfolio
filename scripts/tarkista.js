/**
 * Paikallinen tarkistus ilman ulkoisia palveluita.
 * Aja repositorion juuressa: node scripts/tarkista.js
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { spawnSync } = require("child_process");

const juuri = path.resolve(__dirname, "..");
const virheet = [];

function fail(viesti) {
  virheet.push(viesti);
}

function lue(rel) {
  const tiedosto = path.join(juuri, rel);
  if (!fs.existsSync(tiedosto)) {
    fail("Puuttuu: " + rel);
    return "";
  }
  return fs.readFileSync(tiedosto, "utf8");
}

["js/sisalto.js", "js/main.js", "js/tausta.js"].forEach(function (tiedosto) {
  const tulos = spawnSync(process.execPath, ["--check", path.join(juuri, tiedosto)], { encoding: "utf8" });
  if (tulos.status !== 0) fail(tiedosto + " ei ole kelvollista JavaScriptiä:\n" + (tulos.stderr || tulos.stdout));
});

const hiekkalaatikko = { window: {} };
vm.createContext(hiekkalaatikko);
try {
  vm.runInContext(lue("js/sisalto.js"), hiekkalaatikko, { filename: "js/sisalto.js" });
} catch (virhe) {
  fail("js/sisalto.js ei latautunut: " + virhe.message);
}

const data = hiekkalaatikko.window.SIVUN_SISALTO;
if (!data) {
  fail("SIVUN_SISALTO puuttuu");
} else {
  if (data.etunimi !== "Joakim" || data.sukunimi !== "Rydenfelt") {
    fail("Nimen on pysyttävä vahvistettuna, kunnes sitä muokataan tietoisesti: Joakim Rydenfelt");
  }
  const github = data.yhteys && data.yhteys.github && data.yhteys.github.osoite;
  if (github !== "https://github.com/jokkewedsf") {
    fail("Vahvistettu GitHub-osoite puuttuu tai on muuttunut: " + github);
  }
  const posti = data.yhteys.sahkoposti;
  if (posti !== "" && !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(posti)) {
    fail("Sähköposti on täytetty, mutta se ei ole kelvollinen osoite");
  }
  if (!Array.isArray(data.tyot.projektit) || !data.tyot.projektit.length) {
    fail("Työt-osiosta puuttuvat projektit");
  }
  data.tyot.projektit.forEach(function (projekti, indeksi) {
    if (typeof projekti.onEsimerkki !== "boolean") fail("Projektilla " + indeksi + " on oltava boolean onEsimerkki");
    if (!projekti.nimi) fail("Projektilla " + indeksi + " ei ole nimeä");
    if (projekti.linkki && !/^https?:\/\//.test(projekti.linkki)) {
      fail("Projektin " + indeksi + " linkki ei ole http(s)-osoite");
    }
    if (!["kaari", "viiva", "piste"].includes(projekti.motiivi)) fail("Tuntematon motiivi projektissa " + indeksi);
  });
  const osiot = ["tietoa", "osaaminen", "tyot", "yhteys"];
  (data.navigointi || []).forEach(function (kohta) {
    if (!osiot.includes(kohta.id)) fail("Navigointi viittaa osioon, jota sivupohja ei piirrä: " + kohta.id);
  });
}

const html = lue("index.html");
const css = lue("css/styles.css");
const main = lue("js/main.js");
const tausta = lue("js/tausta.js");
const lahde = [html, css, main, tausta].join("\n");

if (!html.includes('lang="fi"')) fail('html-kielisyys puuttuu');
if (!html.includes("https://github.com/jokkewedsf")) fail("noscript-varasta puuttuu vahvistettu GitHub-osoite");
if (!/prefers-reduced-motion/.test(css)) fail("CSS ei huomioi liikkeen vähentämistä");
if (!/:focus-visible/.test(css)) fail("CSS:stä puuttuu näkyvä fokus");
if (/href\s*=\s*"#"/.test(lahde) || /href\s*=\s*'#'/.test(lahde)) {
  fail('Lähde sisältää tyhjän href="#"-linkin');
}
if (/javascript\s*:/i.test(lahde)) fail("Lähde sisältää javascript:-osoitteen");

[
  "fonts/fraunces-latin-wght-normal.woff2",
  "fonts/fraunces-latin-wght-italic.woff2",
  "fonts/outfit-latin-wght-normal.woff2",
  "fonts/OFL-fraunces.txt",
  "fonts/OFL-outfit.txt",
  "assets/favicon.svg",
  "assets/rae.png",
  "css/styles.css",
  "js/sisalto.js",
  "js/main.js",
  "js/tausta.js",
].forEach(function (tiedosto) {
  if (!fs.existsSync(path.join(juuri, tiedosto))) fail("Puuttuva tiedosto: " + tiedosto);
});

function kanava(hex) {
  const arvo = parseInt(hex, 16) / 255;
  return arvo <= 0.04045 ? arvo / 12.92 : ((arvo + 0.055) / 1.055) ** 2.4;
}

function kontrasti(a, b) {
  const lum = function (hex) {
    const h = hex.replace("#", "");
    const r = kanava(h.slice(0, 2));
    const g = kanava(h.slice(2, 4));
    const bl = kanava(h.slice(4, 6));
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl;
  };
  const L1 = lum(a);
  const L2 = lum(b);
  const vaalea = Math.max(L1, L2);
  const tumma = Math.min(L1, L2);
  return (vaalea + 0.05) / (tumma + 0.05);
}

const muuttujat = {};
css.replace(/--([a-z0-9-]+):\s*(#[0-9a-fA-F]{6})/g, function (_, nimi, vari) {
  muuttujat[nimi] = vari.toLowerCase();
});

const parit = [
  ["teksti", "tausta", 7],
  ["leipa", "tausta", 7],
  ["himmea", "tausta", 4.5],
  ["teksti", "pinta", 7],
  ["leipa", "pinta", 4.5],
  ["himmea", "pinta", 4.5],
  ["nappi-teksti", "nappi", 7],
  ["kajo", "tausta", 4.5],
  ["messinki", "tausta", 4.5],
];

parit.forEach(function (pari) {
  const vaalea = muuttujat[pari[0]];
  const tumma = muuttujat[pari[1]];
  if (!vaalea || !tumma) {
    fail("Välimuuttuja puuttuu: " + pari[0] + " / " + pari[1]);
    return;
  }
  const suhde = kontrasti(vaalea, tumma);
  if (suhde < pari[2]) fail(pari[0] + " / " + pari[1] + " kontrasti " + suhde.toFixed(2) + " < " + pari[2]);
});

const merkkiPaikka = kontrasti("#1b140c", muuttujat.messinki || "#000000");
const merkkiEsimerkki = kontrasti("#06211a", muuttujat.kajo || "#ffffff");
if (merkkiPaikka < 7) fail("Paikkamerkkimerkin kontrasti on liian heikko");
if (merkkiEsimerkki < 7) fail("Esimerkkimerkin kontrasti on liian heikko");

if (virheet.length) {
  console.error(virheet.join("\n"));
  process.exit(1);
}

console.log("Tarkistus kunnossa.");
