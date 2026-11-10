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

["js/sisalto.js", "js/main.js", "js/tausta.js", "js/erp.js"].forEach(function (tiedosto) {
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
  const kielet = data.kielet || {};
  ["fi", "en"].forEach(function (koodi) {
    const sivu = kielet[koodi];
    if (!sivu) {
      fail("Kieli puuttuu: " + koodi);
      return;
    }
    const github = sivu.yhteys && sivu.yhteys.github && sivu.yhteys.github.osoite;
    const linkedin = sivu.yhteys && sivu.yhteys.linkedin && sivu.yhteys.linkedin.osoite;
    if (github !== "https://github.com/jokkewedsf") fail(koodi + ": GitHub-osoite puuttuu");
    if (linkedin !== "https://www.linkedin.com/in/joakim-rydenfelt") fail(koodi + ": LinkedIn-osoite puuttuu");
    if (sivu.yhteys.sahkoposti !== "") fail(koodi + ": sähköpostia ei ole vahvistettu");
    if (!sivu.osaaminen || !Array.isArray(sivu.osaaminen.kohdat) || sivu.osaaminen.kohdat.length < 4) {
      fail(koodi + ": osaamiskokonaisuuksia pitää olla vähintään neljä");
    }
    const osaaminenTeksti = JSON.stringify(sivu.osaaminen.kohdat || []);
    if (!/CRM/i.test(osaaminenTeksti) || !/ERP/i.test(osaaminenTeksti)) {
      fail(koodi + ": osaamisesta pitää kertoa CRM- ja ERP-työskentely");
    }
    if (!Array.isArray(sivu.tyot.projektit) || !sivu.tyot.projektit.length) fail(koodi + ": työt puuttuvat");
    sivu.tyot.projektit.forEach(function (projekti, indeksi) {
      if (projekti.onEsimerkki !== false) fail(koodi + " työkortti " + indeksi + " on esimerkki");
      if (!projekti.nimi || !projekti.organisaatio || !projekti.rooli) fail(koodi + " työkortilta puuttuu nimi");
      if (projekti.linkki) fail(koodi + " työkortissa on vahvistamaton linkki");
    });
    const osiot = ["tietoa", "osaaminen", "tyot", "ratkaisut", "erp", "taustat", "yhteys"];
    if ((sivu.navigointi || []).map(function (kohta) { return kohta.id; }).join("|") !== osiot.join("|")) {
      fail(koodi + ": sivun navigoinnin järjestys ei vastaa lukujärjestystä");
    }
    if (!sivu.ratkaisut || !sivu.chatbot || !sivu.aula) fail(koodi + ": ratkaisu tai demo puuttuu");
    if (!/Interaktiivinen demo|Interactive demo/.test(sivu.aula.ui.demoLabel)) {
      fail(koodi + ": demon merkintä ei ole vaaditussa muodossa");
    }
    if (/€|\$|alk\.\s*\d/.test(JSON.stringify(sivu.chatbot || {}))) {
      fail(koodi + ": tuotesivun markkinointi sisältää hinnan");
    }
    (sivu.navigointi || []).forEach(function (kohta) {
      if (!osiot.includes(kohta.id)) fail(koodi + " navigointi viittaa tuntemattomaan osioon: " + kohta.id);
    });
  });
  const fiNimet = (kielet.fi.erp.vaiheet || []).map(function (v) { return v.nimi; });
  const enNimet = (kielet.en.erp.vaiheet || []).map(function (v) { return v.nimi; });
  const fiOdotus = ["Asiakkaat", "Dokumentit", "Tarjouspyynnöt", "Myynti", "CRM", "Projektit", "Tilaukset", "Varasto", "Hallinta", "Integraatiot", "Laskutus", "Raportointi"];
  const enOdotus = ["Customers", "Documents", "Quote requests", "Sales", "CRM", "Projects", "Orders", "Inventory", "Management", "Integrations", "Invoicing", "Reporting"];
  if (fiNimet.join("|") !== fiOdotus.join("|")) fail("Suomen ERP-vaiheet ovat väärin");
  if (enNimet.join("|") !== enOdotus.join("|")) fail("Englannin ERP-vaiheet ovat väärin");
  const tunnukset = (kielet.fi.erp.vaiheet || []).map(function (v) { return v.id; }).join("|");
  const enTunnukset = (kielet.en.erp.vaiheet || []).map(function (v) { return v.id; }).join("|");
  if (tunnukset !== enTunnukset) fail("ERP-tunnukset eivät täsmää kielien välillä");
  if (!Array.isArray(data.katalogi) || data.katalogi.length !== 1 || data.katalogi[0].id !== "chatbot") {
    fail("Katalogissa saa toistaiseksi olla vain chatbot");
  }
  if (data.katalogi[0].polku !== "ratkaisut/chatbot/") fail("Chatbotin polku on väärä");
  const teksti = JSON.stringify(data);
  ["Paikkamerkki", "Esimerkkiprojekti", "seuraajaa", "Open to work", "software engineer", "ohjelmistokehittäjä"].forEach(function (kielletty) {
    if (teksti.toLowerCase().includes(kielletty.toLowerCase())) fail("Sisältö sisältää kielletyn tekstin: " + kielletty);
  });
  if (!/opinnot käynnissä/i.test(kielet.fi && JSON.stringify(kielet.fi))) fail("Centrian opinnot eivät näy käynnissä olevina");
  if (!/studies in progress/i.test(JSON.stringify(kielet.en || {}))) fail("Englanninkielinen teksti ei kerro opintojen olevan kesken");
  if (/oulu/i.test([teksti, lue("index.html"), lue("README.md"), lue("404.html"), lue("ratkaisut/chatbot/index.html")].join("\n"))) {
    fail("Oulu-maininta on vielä lähteessä");
  }
  if (/valmistunut|tutkinto on valmis|suorittanut tutkinnon|graduated|degree completed/i.test(teksti)) {
    fail("Sisältö väittää tutkinnon valmistuneen");
  }
}

const tuoteSivu = lue("ratkaisut/chatbot/index.html");
["../../css/styles.css", "../../js/sisalto.js", "../../js/aula-demo.js", "../../js/ratkaisu.js", 'href="../../"'].forEach(function (viite) {
  if (!tuoteSivu.includes(viite)) fail("Tuotesivulta puuttuu suhteellinen viite: " + viite);
});
if (/href="\//.test(tuoteSivu)) fail("Tuotesivu käyttää juuripolkuja, jotka hajoavat alikansiossa");
const tuoteOsoite = "https://jokkewedsf.github.io/portfolio/ratkaisut/chatbot/index.html";
if (new URL("../../css/styles.css", tuoteOsoite).href !== "https://jokkewedsf.github.io/portfolio/css/styles.css") {
  fail("Tuotesivun tyylit eivät ratkea Pages-alikansioon");
}
if (new URL("../../", tuoteOsoite).href !== "https://jokkewedsf.github.io/portfolio/") {
  fail("Paluu portfolioon ei ratkea Pages-alikansioon");
}
const html = lue("index.html");
const css = lue("css/styles.css");
const main = lue("js/main.js");
const tausta = lue("js/tausta.js");
const lahde = [html, css, main, tausta, lue("js/erp.js")].join("\n");
if (lahde.includes("piirraToripolliisi") || lahde.includes("Toripolliisi")) fail("Toripolliisi on yhä mukana");
if (!html.includes('id="kieli"') || !main.includes("localStorage")) fail("Kielivalinta puuttuu");
const erpJarjestys = ["Asiakkaat", "Dokumentit", "Tarjouspyynnöt", "Myynti", "CRM", "Projektit", "Tilaukset", "Varasto", "Hallinta", "Integraatiot", "Laskutus", "Raportointi"];
let edellinen = -1;
erpJarjestys.forEach(function (nimi) {
  const kohta = html.indexOf("<li>" + nimi + "</li>");
  if (kohta < 0 || kohta < edellinen) fail("noscript-listasta puuttuu tai järjestys on väärä: " + nimi);
  edellinen = kohta;
});

const neljasataa = lue("404.html");
const robotit = lue("robots.txt");
const sivukartta = lue("sitemap.xml");
if (!html.includes('rel="canonical" href="https://jokkewedsf.github.io/portfolio/"')) {
  fail("Etusivulta puuttuu kanoninen osoite");
}
if (!tuoteSivu.includes('rel="canonical" href="https://jokkewedsf.github.io/portfolio/ratkaisut/chatbot/"')) {
  fail("Tuotesivulta puuttuu kanoninen osoite");
}
if (!neljasataa.includes("Sivua ei löydy") || !robotit.includes("Sitemap:") || !sivukartta.includes("/ratkaisut/chatbot/")) {
  fail("Julkaisutiedostot 404, robots tai sivukartta ovat puutteelliset");
}
if (!html.includes('lang="fi"')) fail('html-kielisyys puuttuu');
if (!html.includes("https://github.com/jokkewedsf")) fail("noscript-varasta puuttuu vahvistettu GitHub-osoite");
if (!html.includes("https://www.linkedin.com/in/joakim-rydenfelt")) {
  fail("noscript-varasta puuttuu vahvistettu LinkedIn-osoite");
}
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
