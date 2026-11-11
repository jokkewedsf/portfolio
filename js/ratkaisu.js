(function () {
  const juuri = window.SIVUN_SISALTO;
  const main = document.getElementById("sisalto");
  const tuoteId = (location.pathname.split("/").filter(Boolean).pop() || "").replace(/\.html$/, "");
  const kohta = (juuri && juuri.katalogi || []).filter(function (tuote) { return tuote.id === tuoteId; })[0];

  function lueKieli() {
    try {
      const arvo = window.localStorage.getItem("kieli");
      if (arvo === "en" || arvo === "fi") return arvo;
    } catch (virhe) {
      return "fi";
    }
    return "fi";
  }

  function esc(arvo) {
    return String(arvo == null ? "" : arvo).replace(/[&<>"']/g, function (merkki) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[merkki];
    });
  }

  let kieli = lueKieli();

  function sivu() {
    return juuri.kielet[kieli];
  }

  function aulaAsetukset(data) {
    const osio = data.aula;
    return {
      productName: osio.tuote,
      nameNote: osio.huom,
      businessName: osio.yritys,
      industry: osio.ala,
      city: osio.kaupunki,
      greeting: osio.tervehdys,
      profile: osio.profiili,
      faqs: osio.ukk,
      contact: osio.yhteys,
      ui: osio.ui
    };
  }

  function lista(kohdat, tila) {
    return "<ul class=\"tuote-lista\">" + kohdat.map(function (kohta) {
      if (typeof kohta === "string") return "<li><p>" + esc(kohta) + "</p></li>";
      return "<li>" + (tila && kohta.tila ? '<p class="tuote-tila">' + esc(kohta.tila) + "</p>" : "") +
        "<h3>" + esc(kohta.nimi) + "</h3><p>" + esc(kohta.teksti) + "</p></li>";
    }).join("") + "</ul>";
  }

  function piirra() {
    const data = sivu();
    const tuote = data.chatbot;
    const demo = data.aula;
    const linkedin = data.yhteys.linkedin.osoite;
    document.documentElement.lang = kieli === "en" ? "en" : "fi";
    document.title = demo.tuote + " — " + juuri.etunimi + " " + juuri.sukunimi;
    const takaisin = document.getElementById("ratkaisu-takaisin");
    if (takaisin) takaisin.textContent = tuote.takaisin;
    ["fi", "en"].forEach(function (koodi) {
      const nappi = document.getElementById("kieli-" + koodi);
      if (nappi) nappi.setAttribute("aria-pressed", kieli === koodi ? "true" : "false");
    });
    const ryhma = document.getElementById("kieli");
    if (ryhma && data.ui.kieli) ryhma.setAttribute("aria-label", data.ui.kieli);
    if (window.__aulaKahva && window.__aulaKahva.destroy) window.__aulaKahva.destroy();
    main.innerHTML =
      '<article class="tuote-sivu">' +
      '<header class="tuote-hero"><p class="ylateksti"><span class="piste" aria-hidden="true"></span>' + esc(tuote.ylateksti) + "</p>" +
      "<h1>" + esc(demo.tuote) + "</h1>" +
      '<p class="silma">' + esc(demo.huom) + "</p>" +
      '<p class="ammattiotsikko">' + esc(tuote.ingressi) + "</p>" +
      "<p class=\"ingressi\">" + esc(tuote.arvo) + "</p></header>" +
      '<div class="tuote-asetelma">' +
      "<div>" +
      "<h2>" + esc(tuote.ongelmaOtsikko) + "</h2>" + lista(tuote.ongelmat) +
      "<h2>" + esc(tuote.kykyOtsikko) + "</h2>" + lista(tuote.kyvyt, true) +
      "<h2>" + esc(tuote.toimintaOtsikko) + "</h2>" + lista(tuote.toiminta) +
      "<h2>" + esc(tuote.rajaOtsikko) + "</h2>" + lista(tuote.rajat) +
      "<h2>" + esc(tuote.ctaOtsikko) + "</h2>" +
      "<p>" + esc(tuote.cta) + "</p>" +
      '<p class="toiminnot"><a class="nappi nappi-ensisijainen" href="' + esc(linkedin) + '" target="_blank" rel="noopener noreferrer">' +
      esc(data.hero.linkedinNappi) + "</a></p>" +
      "</div>" +
      '<div id="demo"><h2>' + esc(data.ratkaisut.demoOtsikko) + '</h2><div id="aula-demo-juuri"></div></div>' +
      "</div></article>";
    window.__aulaKahva = window.AulaDemo.mount(document.getElementById("aula-demo-juuri"), aulaAsetukset(data));
  }

  if (!juuri || !main || !kohta || !window.AulaDemo) return;
  document.getElementById("kieli").addEventListener("click", function (tapahtuma) {
    const nappi = tapahtuma.target.closest("button[data-kieli]");
    if (!nappi) return;
    const uusi = nappi.getAttribute("data-kieli");
    if (uusi !== "fi" && uusi !== "en") return;
    try { window.localStorage.setItem("kieli", uusi); } catch (virhe) {}
    kieli = uusi;
    const y = window.scrollY;
    piirra();
    window.scrollTo(0, y);
    nappi.focus();
  });
  piirra();
})();
