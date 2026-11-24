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

["js/sisalto.js", "js/main.js", "js/keskustelu.js", "js/tausta.js", "js/erp.js"].forEach(function (tiedosto) {
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
    if (github !== "https://github.com/jokkewedsf/portfolio") fail(koodi + ": GitHub-osoite puuttuu");
    if (linkedin !== "https://www.linkedin.com/in/joakim-rydenfelt") fail(koodi + ": LinkedIn-osoite puuttuu");
    if (sivu.yhteys.sahkoposti !== "joakimrydenfelt@gmail.com") fail(koodi + ": vahvistettu sähköposti puuttuu");
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
    const osiot = ["mindset", "work", "business", "experience", "contact"];
    if (!sivu.valitut || !Array.isArray(sivu.valitut.kohdat) || sivu.valitut.kohdat.length !== 3) {
      fail(koodi + ": valittuja töitä pitää olla kolme");
    }
    if ((sivu.navigointi || []).map(function (kohta) { return kohta.id; }).join("|") !== osiot.join("|")) {
      fail(koodi + ": sivun navigoinnin järjestys ei vastaa lukujärjestystä");
    }
    if (!sivu.ratkaisut || !sivu.chatbot || !sivu.omaChat) fail(koodi + ": ratkaisu tai oma chat puuttuu");
    if (/€|\$|alk\.\s*\d/.test(JSON.stringify(sivu.chatbot || {}))) {
      fail(koodi + ": tuotesivun markkinointi sisältää hinnan");
    }
    (sivu.navigointi || []).forEach(function (kohta) {
      if (!osiot.includes(kohta.id)) fail(koodi + " navigointi viittaa tuntemattomaan osioon: " + kohta.id);
    });
  });
  const fiNimet = (kielet.fi.demo.vaiheet || []).map(function (v) { return v.nimi; });
  const enNimet = (kielet.en.demo.vaiheet || []).map(function (v) { return v.nimi; });
  const fiOdotus = ["Tarjous", "Työmääräys", "Toteutus", "Laskutus"];
  const enOdotus = ["Quote", "Work order", "Delivery", "Invoicing"];
  if (fiNimet.join("|") !== fiOdotus.join("|")) fail("Suomen demovaiheet ovat väärin");
  if (enNimet.join("|") !== enOdotus.join("|")) fail("Englannin demovaiheet ovat väärin");
  const tunnukset = (kielet.fi.demo.vaiheet || []).map(function (v) { return v.id; }).join("|");
  const enTunnukset = (kielet.en.demo.vaiheet || []).map(function (v) { return v.id; }).join("|");
  if (tunnukset !== enTunnukset) fail("Demon tunnukset eivät täsmää kielien välillä");
  if (kielet.fi.business.otsikko !== "Näin työ muuttuu hallittavaksi") fail("Demon otsikko puuttuu");
  if (kielet.fi.business.silma !== "Havainnollistava demo") fail("Demon merkintä puuttuu");
  if (kielet.fi.business.johdanto !== "Sama tieto kulkee mukana. Sitä ei tarvitse kirjoittaa joka vaiheessa uudelleen.") {
    fail("Demon johdanto puuttuu");
  }
  if (kielet.fi.contact.kopioitu !== "Kopioitu") fail("Kopioinnin palaute puuttuu");
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
  if (/(^|[^a-zäöå])oulu/i.test([teksti, lue("index.html"), lue("README.md"), lue("404.html"), lue("ratkaisut/chatbot/index.html")].join("\n"))) {
    fail("Oulu-maininta on vielä lähteessä");
  }
  ["260 000", "260,000", "Oamk", "Codelotus", "Wellthyforce", "Airbnb", "Visuaalinen visionääri", "SERE", "CAC"].forEach(function (kielletty) {
    if (teksti.indexOf(kielletty) !== -1) fail("Sisältö sisältää poistetun kohdan: " + kielletty);
  });
  const valilyonti = function (arvo) { return String(arvo).replace(/\u00A0/g, " "); };
  const fiLuku = valilyonti(kielet.fi.hero.luku + " " + kielet.fi.hero.lukuSelite);
  const enLuku = valilyonti(kielet.en.hero.luku + " " + kielet.en.hero.lukuSelite);
  if (fiLuku !== "Yli 300 000 € SaaS-myyntiä vuonna 2026 (tilanne 11/2026)") fail("Suomen myyntiluku puuttuu");
  if (!/\u00A0/.test(kielet.fi.hero.luku)) fail("Suomen luvusta puuttuu sitova välilyönti");
  if (enLuku !== "Over €300,000 in SaaS sales in 2026 (as of November 2026)") fail("Englannin myyntiluku puuttuu");
  if (kielet.fi.hero.summa !== 300000 || kielet.en.hero.summa !== 300000) fail("Myyntisumma puuttuu");
  if (!/Centria-ammattikorkeakoulu/.test(JSON.stringify(kielet.fi)) || !/Centria University of Applied Sciences/.test(JSON.stringify(kielet.en))) {
    fail("Centrian nimi puuttuu");
  }
  if (/valmistunut|tutkinto on valmis|suorittanut tutkinnon|graduated|degree completed/i.test(teksti)) {
    fail("Sisältö väittää tutkinnon valmistuneen");
  }
}

const tuoteSivu = lue("ratkaisut/chatbot/index.html");
["../../css/styles.css", "../../js/sisalto.js", "../../js/keskustelu.js", "../../js/ratkaisu.js", 'href="../../"'].forEach(function (viite) {
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
if (!/mailto:/.test(main)) fail("Sähköpostilinkki puuttuu");
if (!/aria-live/.test(main)) fail("Tilapäivityksen aria-live puuttuu");
if (!/prefers-reduced-motion/.test(main) || !/prefers-reduced-motion/.test(css)) fail("Liikkeen vähennys puuttuu");
const erpJarjestys = ["Tarjous", "Työmääräys", "Toteutus", "Laskutus"];
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
if (!html.includes("js/keskustelu.js")) fail("Keskustelun skripti puuttuu etusivulta");
function vaadiVersio(lahde, nimi) {
  (lahde.match(/<(?:script|link)\b[^>]*>/gi) || []).forEach(function (tagi) {
    const osoite = (tagi.match(/\b(?:src|href)="([^"]+)"/) || [])[1];
    if (!osoite || /^(https?:)?\/\//.test(osoite)) return;
    if (/\.(?:js|css)(?:\?|$)/.test(osoite) && osoite.indexOf("?v=") === -1) {
      fail(nimi + ": paikallisesta tiedostosta puuttuu ?v=: " + osoite);
    }
  });
}
vaadiVersio(html, "index.html");
vaadiVersio(tuoteSivu, "ratkaisut/chatbot/index.html");
if (!html.includes("Keskustele tekoäly-Joakimin kanssa — vastaukset tuottaa tekoäly Joakimin omien vastausten pohjalta")) {
  fail("noscript-varasta puuttuu tekoälymerkintä");
}
if (!/window\.JOAKIM_AI_ENDPOINT\s*=\s*"https:\/\/joakim-ai\.jokkewedsf\.workers\.dev"/.test(lue("js/sisalto.js"))) {
  fail("Julkinen tekoälyosoite puuttuu");
}
const wrangler = lue("worker/wrangler.toml");
if (!wrangler.includes('MODEL = "grok-4.20-0309-non-reasoning"')) fail("Workerin malli on väärä");
if (!wrangler.includes('id = "bf9b0a0e2ea342e28c3503c447b79fc3"')) fail("KV-nimiavaruuden id puuttuu");
if (data && data.kielet) {
  ["fi", "en"].forEach(function (koodi) {
    const keskustelu = data.kielet[koodi] && data.kielet[koodi].keskustelu;
    if (!keskustelu || !keskustelu.merkinta || !keskustelu.tietosuoja || !(keskustelu.ehdotukset || []).length) {
      fail(koodi + ": keskustelun tekstit puuttuvat");
    }
  });
  if (!data.kielet.fi.keskustelu || !/Keskustele tekoäly-Joakimin kanssa/.test(data.kielet.fi.keskustelu.merkinta)) {
    fail("Suomen tekoälymerkintä puuttuu");
  }
  if (!data.kielet.en.keskustelu || !/Talk with AI Joakim/.test(data.kielet.en.keskustelu.merkinta)) {
    fail("Englannin tekoälymerkintä puuttuu");
  }
}
["worker/worker.js", "worker/wrangler.toml", "worker/README.md", "worker/rakenna-prompti.js", "worker/tietopohja.esimerkki.md"].forEach(function (tiedosto) {
  if (!fs.existsSync(path.join(juuri, tiedosto))) fail("Puuttuva tiedosto: " + tiedosto);
});
const gitignore = lue(".gitignore");
if (!gitignore.includes("worker/tietopohja.md")) fail("Tietopohja ei ole gitignorattu");
const workerLahde = lue("worker/worker.js");
if (/sk-[A-Za-z0-9]{10,}|xai-[A-Za-z0-9]{10,}/.test(workerLahde)) fail("Workerin lähde sisältää avaimen näköisen merkkijonon");
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
  ["himmea", "tausta", 4.5],
  ["teksti", "kortti", 7],
  ["himmea", "kortti", 4.5],
  ["tausta", "teksti", 7],
  ["aksentti", "tausta", 4.5],
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

const vanhaTuote = ["a", "u", "l", "a"].join("");
["index.html", "404.html", "README.md", "js/sisalto.js", "js/main.js", "js/ratkaisu.js", "js/keskustelu.js", "ratkaisut/chatbot/index.html", "css/styles.css", "scripts/tarkista.js"].forEach(function (tiedosto) {
  if (new RegExp(vanhaTuote, "i").test(lue(tiedosto))) fail("Vanha tuotenimi on vielä tiedostossa " + tiedosto);
});

if (virheet.length) {
  console.error(virheet.join("\n"));
  process.exit(1);
}

console.log("Tarkistus kunnossa.");
