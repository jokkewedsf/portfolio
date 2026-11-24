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

  function asetaMeta(nimi, sisalto) {
    const solmu = document.querySelector('meta[name="' + nimi + '"]');
    if (solmu && sisalto) solmu.setAttribute("content", sisalto);
  }

  function asetaOminaisuus(nimi, sisalto) {
    const solmu = document.querySelector('meta[property="' + nimi + '"]');
    if (solmu && sisalto) solmu.setAttribute("content", sisalto);
  }

  function piirra() {
    const data = sivu();
    const osio = data.omaChat;
    const tuote = data.chatbot;
    if (!osio || !tuote) return;
    document.documentElement.lang = kieli === "en" ? "en" : "fi";
    const otsikko = osio.otsikko + " — " + juuri.etunimi + " " + juuri.sukunimi;
    document.title = otsikko;
    asetaMeta("description", tuote.kuvaus);
    asetaMeta("twitter:title", otsikko);
    asetaMeta("twitter:description", tuote.kuvaus);
    asetaOminaisuus("og:title", otsikko);
    asetaOminaisuus("og:description", tuote.kuvaus);
    asetaOminaisuus("og:locale", kieli === "en" ? "en_US" : "fi_FI");
    const takaisin = document.getElementById("ratkaisu-takaisin");
    if (takaisin) takaisin.textContent = tuote.takaisin;
    ["fi", "en"].forEach(function (koodi) {
      const nappi = document.getElementById("kieli-" + koodi);
      if (nappi) nappi.setAttribute("aria-pressed", kieli === koodi ? "true" : "false");
    });
    const ryhma = document.getElementById("kieli");
    if (ryhma && data.ui && data.ui.kieli) ryhma.setAttribute("aria-label", data.ui.kieli);
    const vaiheet = (osio.vaiheet || []).map(function (vaihe, indeksi) {
      return "<li><span class=\"virta-nro\" aria-hidden=\"true\">" +
        String(indeksi + 1).padStart(2, "0") + "</span><h3>" +
        esc(vaihe.nimi) + "</h3><p>" + esc(vaihe.teksti) + "</p></li>";
    }).join("");
    const faktat = (osio.faktat || []).map(function (rivi) {
      return "<li>" + esc(rivi) + "</li>";
    }).join("");
    main.innerHTML =
      '<article class="tuote-sivu">' +
      '<header class="tuote-hero"><p class="ylateksti"><span class="piste" aria-hidden="true"></span>' +
      esc(tuote.ylateksti) + "</p>" +
      "<h1>" + esc(osio.otsikko) + "</h1>" +
      '<p class="ingressi">' + esc(osio.johdanto) + "</p>" +
      (tuote.kuvaus ? "<p>" + esc(tuote.kuvaus) + "</p>" : "") +
      "</header>" +
      '<h2>' + esc(osio.ketjuOtsikko) + "</h2>" +
      '<ol class="virta" aria-label="' + esc(osio.ketjuOtsikko) + '">' + vaiheet + "</ol>" +
      '<ul class="chat-faktat">' + faktat + "</ul>" +
      '<p class="chat-toiminto"><button type="button" class="nappi nappi-ensisijainen" id="avaa-chat">' +
      esc(osio.cta) + "</button></p></article>";
    const avaa = document.getElementById("avaa-chat");
    if (avaa) {
      avaa.addEventListener("click", function () {
        if (window.avaaKeskustelu) window.avaaKeskustelu();
      });
    }
    if (window.alustaKeskustelu) window.alustaKeskustelu(data.keskustelu || {});
  }

  if (!juuri || !main || !kohta) return;
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
