/**
 * Kokoaa sivun js/sisalto.js-tiedoston tiedoista ja kytkee valikon,
 * kortit, vierityksen ja näppäimistön. Ei lomaketta eikä keksittyjä linkkejä.
 */
(function () {
  const data = window.SIVUN_SISALTO;
  const main = document.getElementById("sisalto");
  const nav = document.getElementById("navigaatio");
  const footer = document.getElementById("alatunniste");
  const header = document.getElementById("ylapalkki");
  const nappi = document.getElementById("valikko-nappi");
  const merkki = document.querySelector(".merkki");
  const ohitus = document.querySelector(".ohitus");
  const palkki = document.getElementById("eteneminen-palkki");
  const valikkoMq = window.matchMedia("(max-width: 860px)");
  const liikeMq = window.matchMedia("(prefers-reduced-motion: reduce)");
  let valikkoAuki = false;
  let palautusKohde = null;

  if (!data || !main) {
    if (main) {
      main.innerHTML =
        '<p class="virhe" role="alert">Sisältötiedosto js/sisalto.js puuttuu tai on virheellinen.</p>';
    }
    return;
  }

  const nimi = [data.etunimi, data.sukunimi].filter(Boolean).join(" ").trim();

  function esc(arvo) {
    return String(arvo == null ? "" : arvo).replace(/[&<>"']/g, function (merkki) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[merkki];
    });
  }

  function httpUrl(osoite) {
    if (typeof osoite !== "string" || !osoite.trim()) return "";
    try {
      const url = new URL(osoite.trim());
      if (url.protocol === "https:" || url.protocol === "http:") return url.href;
    } catch (virhe) {
      return "";
    }
    return "";
  }

  function ankkuri(osoite) {
    return typeof osoite === "string" && /^#[a-z0-9-]+$/i.test(osoite) ? osoite : "";
  }

  function sahkoposti(osoite) {
    if (typeof osoite !== "string") return "";
    const siisti = osoite.trim();
    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(siisti)) return "";
    return siisti;
  }

  function vari(arvo, oletus) {
    return typeof arvo === "string" && /^#[0-9a-fA-F]{6}$/.test(arvo) ? arvo : oletus;
  }

  function tori() {
    const muoto =
      '<rect x="86" y="196" width="38" height="96" rx="18"/>' +
      '<rect x="212" y="196" width="38" height="96" rx="18"/>' +
      '<ellipse cx="102" cy="296" rx="15" ry="13"/>' +
      '<ellipse cx="234" cy="296" rx="15" ry="13"/>' +
      '<rect x="122" y="318" width="38" height="56" rx="12"/>' +
      '<rect x="176" y="318" width="38" height="56" rx="12"/>' +
      '<ellipse cx="136" cy="374" rx="26" ry="14"/>' +
      '<ellipse cx="200" cy="374" rx="26" ry="14"/>' +
      '<path d="M118 176 C78 198 68 244 86 286 C100 332 126 344 168 346 C210 344 236 332 250 286 C268 244 258 198 218 176 Q168 158 118 176 Z"/>' +
      '<rect x="104" y="252" width="128" height="18" rx="4"/>' +
      '<path d="M126 184 L214 256" fill="none"/>' +
      '<ellipse cx="168" cy="136" rx="42" ry="36"/>' +
      '<ellipse cx="126" cy="140" rx="8" ry="11"/>' +
      '<ellipse cx="210" cy="140" rx="8" ry="11"/>' +
      '<path d="M126 118 L128 92 Q128 78 146 76 L190 76 Q208 78 208 92 L210 118 Z"/>' +
      '<path d="M132 116 Q168 142 204 116 L196 122 Q168 136 140 122 Z"/>';
    return (
      '<figure class="tori-kehys">' +
      '<svg class="tori-kuva" viewBox="0 0 336 460" role="img" aria-labelledby="tori-nimi tori-selite" tabindex="0">' +
      "<title id=\"tori-nimi\">Toripolliisi</title>" +
      "<desc id=\"tori-selite\">Tyylitelty muistuma Kaarlo Mikkosen pronssipatsaasta Oulun kauppatorilla. Ei Oulun kaupungin virallinen tunnus.</desc>" +
      "<defs>" +
      '<radialGradient id="tori-halo" cx="50%" cy="46%" r="50%">' +
      '<stop offset="0%" stop-color="#e2b56a" stop-opacity="0.28"/>' +
      '<stop offset="55%" stop-color="#9af0d0" stop-opacity="0.08"/>' +
      '<stop offset="100%" stop-color="#9af0d0" stop-opacity="0"/>' +
      "</radialGradient>" +
      '<linearGradient id="tori-pronssi" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="#8a6844"/>' +
      '<stop offset="42%" stop-color="#4a3424"/>' +
      '<stop offset="100%" stop-color="#241910"/>' +
      "</linearGradient>" +
      '<linearGradient id="tori-valo" x1="0" y1="0" x2="1" y2="0">' +
      '<stop offset="0%" stop-color="#fff6e4" stop-opacity="0"/>' +
      '<stop offset="45%" stop-color="#f3efe4" stop-opacity="0.55"/>' +
      '<stop offset="100%" stop-color="#9af0d0" stop-opacity="0"/>' +
      "</linearGradient>" +
      '<mask id="tori-mask"><g fill="#fff">' + muoto + "</g></mask>" +
      "</defs>" +
      '<ellipse class="tori-halo" cx="168" cy="230" rx="132" ry="168" fill="url(#tori-halo)"/>' +
      '<g class="tori-muoto" fill="url(#tori-pronssi)">' + muoto +
      '<circle cx="168" cy="92" r="5" fill="#e2b56a"/>' +
      '<circle cx="168" cy="196" r="3.2" fill="#e2b56a"/>' +
      '<circle cx="168" cy="214" r="3.2" fill="#e2b56a"/>' +
      '<circle cx="168" cy="232" r="3.2" fill="#e2b56a"/>' +
      '<path d="M148 142 h8 M180 142 h8 M154 162 h28" fill="none" stroke="#1b140c" stroke-width="2" stroke-linecap="round"/>' +
      "</g>" +
      '<g class="tori-piirto" fill="none" stroke="#e2b56a" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round">' +
      muoto + "</g>" +
      '<rect class="tori-pyyhka" mask="url(#tori-mask)" x="-40" y="50" width="64" height="360" fill="url(#tori-valo)"/>' +
      '<rect x="78" y="392" width="180" height="18" rx="3" fill="#1b1612"/>' +
      '<rect x="96" y="378" width="144" height="16" rx="2" fill="#3a2c22"/>' +
      "</svg>" +
      "<figcaption>Toripolliisi, Oulun tori</figcaption>" +
      "</figure>"
    );
  }

  function ulkoinenLinkki(luokka, href, teksti, selite) {
    const url = httpUrl(href);
    if (!url) return "";
    const piilo =
      '<span class="sr-only"> (' + esc(data.ui.uusiValilehti) + ")</span>";
    const nuoli =
      '<svg class="nuoli" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18L18 6M9 6h9v9" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
    return (
      '<a class="' + luokka + '" href="' + esc(url) + '" target="_blank" rel="me noopener noreferrer">' +
      esc(teksti) +
      piilo +
      nuoli +
      (selite ? '<span class="sr-only">. ' + esc(selite) + "</span>" : "") +
      "</a>"
    );
  }

  function rakennaNavigointi() {
    const osiot = (data.navigointi || [])
      .filter(function (kohta) {
        return kohta && ankkuri("#" + kohta.id) && document.getElementById(kohta.id);
      })
      .map(function (kohta) {
        const otsikko = [kohta.numero, kohta.teksti || kohta.id].filter(Boolean).join(" ");
        return (
          '<a href="#' + esc(kohta.id) + '" aria-label="' + esc(otsikko) + '"><span class="nav-nro">' +
          esc(kohta.numero || "") +
          "</span>" +
          esc(kohta.teksti || kohta.id) +
          "</a>"
        );
      });
    ["linkedin", "github"].forEach(function (avain) {
      const kanava = data.yhteys && data.yhteys[avain];
      const osoite = httpUrl(kanava && kanava.osoite);
      if (!osoite) return;
      osiot.push(ulkoinenLinkki("nav-ulkoinen", osoite, kanava.navTeksti || avain, kanava.selite || ""));
    });
    nav.innerHTML = osiot.join("");
  }

  function sisallysLista() {
    const kohdat = (data.navigointi || [])
      .filter(function (kohta) {
        return kohta && kohta.id;
      })
      .map(function (kohta) {
        const otsikko = [kohta.numero, kohta.teksti].filter(Boolean).join(" ");
        return (
          "<li><a href=\"#" + esc(kohta.id) + '" aria-label="' + esc(otsikko) + '"><span>' +
          esc(kohta.numero || "") +
          "</span>" +
          esc(kohta.teksti || "") +
          "</a></li>"
        );
      })
      .join("");
    if (!kohdat) return "";
    return '<ol class="sisallys">' + kohdat + "</ol>";
  }

  function hero() {
    const linkedin = data.yhteys && data.yhteys.linkedin ? data.yhteys.linkedin : {};
    const linkedinNappi = ulkoinenLinkki(
      "nappi nappi-ensisijainen",
      linkedin.osoite,
      data.hero.linkedinNappi || "LinkedIn",
      linkedin.selite || ""
    );
    const otsikko = data.hero.otsikko
      ? '<p class="ammattiotsikko">' + esc(data.hero.otsikko) + "</p>"
      : "";
    const huomautus = data.hero.huomautus
      ? '<p class="huomautus">' + esc(data.hero.huomautus) + "</p>"
      : "";
    return (
      '<section class="hero" id="alku" aria-labelledby="nimi-otsikko">' +
      '<div class="hero-teksti paljasta">' +
      '<p class="ylateksti"><span class="piste" aria-hidden="true"></span>' +
      esc(data.hero.ylateksti) +
      "</p>" +
      '<h1 id="nimi-otsikko"><span class="sr-only">' +
      esc(nimi) +
      '</span><span class="nimi-etu" aria-hidden="true">' +
      esc(data.etunimi) +
      '</span><span class="nimi-suku" aria-hidden="true">' +
      esc(data.sukunimi) +
      "</span></h1>" +
      otsikko +
      '<p class="ingressi">' +
      esc(data.hero.ingressi) +
      "</p>" +
      '<div class="toiminnot">' +
      linkedinNappi +
      '<a class="nappi nappi-toissijainen" href="#tyot">' +
      esc(data.hero.selaaNappi) +
      "</a></div>" +
      huomautus +
      sisallysLista() +
      "</div>" +
      tori() +
      "</section>"
    );
  }

  function tietoa() {
    const osio = data.tietoa;
    const kappaleet = (osio.kappaleet || [])
      .filter(Boolean)
      .map(function (kappale) {
        return "<p>" + esc(kappale) + "</p>";
      })
      .join("");
    return (
      '<section class="osio" id="tietoa" aria-labelledby="tietoa-otsikko">' +
      '<p class="osio-numero" aria-hidden="true">' + esc(osio.numero) + "</p>" +
      '<div class="osio-otsake paljasta"><p class="silma">' +
      esc(osio.numero) +
      '</p><h2 id="tietoa-otsikko">' +
      esc(osio.otsikko) +
      "</h2></div>" +
      '<div class="tietoa-asetelma">' +
      '<p class="suuri-lause paljasta">' +
      esc(osio.avaus) +
      "</p>" +
      '<div class="paikka-kortti paljasta">' +
      (osio.merkinta
        ? '<p class="merkinta merkinta-paikka">' + esc(osio.merkinta) + "</p>"
        : "") +
      kappaleet +
      (osio.muokkaus ? '<p class="muokkaus">' + esc(osio.muokkaus) + "</p>" : "") +
      "</div></div></section>"
    );
  }

  function osaaminen() {
    const osio = data.osaaminen;
    const kortit = (osio.kohdat || [])
      .map(function (kohta, indeksi) {
        return (
          '<li class="osa-kortti paljasta">' +
          (osio.merkinta
            ? '<p class="merkinta merkinta-paikka">' + esc(osio.merkinta) + "</p>"
            : "") +
          "<h3>" +
          esc(kohta.nimi) +
          "</h3><p>" +
          esc(kohta.kuvaus) +
          "</p><span class=\"osa-nro\" aria-hidden=\"true\">" +
          String(indeksi + 1).padStart(2, "0") +
          "</span></li>"
        );
      })
      .join("");
    return (
      '<section class="osio" id="osaaminen" aria-labelledby="osaaminen-otsikko">' +
      '<p class="osio-numero" aria-hidden="true">' + esc(osio.numero) + "</p>" +
      '<div class="osio-otsake paljasta"><p class="silma">' +
      esc(osio.numero) +
      '</p><h2 id="osaaminen-otsikko">' +
      esc(osio.otsikko) +
      '</h2><p class="johdanto">' +
      esc(osio.johdanto) +
      "</p></div>" +
      '<ul class="osaaminen-lista">' +
      kortit +
      "</ul></section>"
    );
  }

  function projektit() {
    const osio = data.tyot;
    const sallitut = { kaari: true, viiva: true, piste: true };
    const kortit = (osio.projektit || [])
      .map(function (projekti, indeksi) {
        const esimerkki = projekti.onEsimerkki !== false;
        const motiivi = sallitut[projekti.motiivi] ? projekti.motiivi : "kaari";
        const savy = Array.isArray(projekti.savy) ? projekti.savy : [];
        const a = vari(savy[0], "#12352f");
        const b = vari(savy[1], "#9af0d0");
        const id = "projekti-" + (indeksi + 1);
        const linkki = httpUrl(projekti.linkki);
        const linkinTeksti = projekti.linkinTeksti || (linkki ? new URL(linkki).host : "");
        const tunnisteet = (projekti.tunnisteet || [])
          .filter(Boolean)
          .map(function (tunniste) {
            return "<li>" + esc(tunniste) + "</li>";
          })
          .join("");
        const linkkiHtml = linkki
          ? ulkoinenLinkki("tekstilinkki", linkki, linkinTeksti, "")
          : esimerkki
            ? '<p class="ei-linkkia">' + esc(osio.eiLinkkia) + "</p>"
            : "";
        const merkkiHtml = esimerkki
          ? '<p class="merkinta merkinta-esimerkki">' + esc(osio.esimerkkiMerkinta) + "</p>"
          : "";
        const meta = [projekti.organisaatio, projekti.rooli].filter(Boolean).join(" · ");
        const ala = [projekti.aika, projekti.paikka].filter(Boolean).join(" · ");
        return (
          '<article class="kortti paljasta" style="--savy-a:' + a + ";--savy-b:" + b + '">' +
          '<div class="kortti-motiivi motiivi-' + motiivi + '" aria-hidden="true"></div>' +
          '<div class="kortti-runko">' +
          merkkiHtml +
          "<h3 id=\"" + id + '-otsikko">' +
          esc(projekti.nimi) +
          "</h3>" +
          (meta ? '<p class="kortti-meta">' + esc(meta) + "</p>" : "") +
          (ala ? '<p class="kortti-meta">' + esc(ala) + "</p>" : "") +
          "<p>" +
          esc(projekti.tiivis) +
          "</p>" +
          '<button type="button" class="nappi-teksti" aria-expanded="false" aria-controls="' +
          id +
          '-lisa">' +
          esc(osio.nayta) +
          "</button>" +
          '<div id="' + id + '-lisa" class="kortti-lisa" hidden>' +
          "<p>" +
          esc(projekti.kuvaus) +
          "</p>" +
          (tunnisteet
            ? '<p class="tunniste-otsikko">' +
              esc(osio.tunnisteOtsikko) +
              '</p><ul class="tunnisteet">' +
              tunnisteet +
              "</ul>"
            : "") +
          linkkiHtml +
          "</div></div></article>"
        );
      })
      .join("");
    return (
      '<section class="osio" id="tyot" aria-labelledby="tyot-otsikko">' +
      '<p class="osio-numero" aria-hidden="true">' + esc(osio.numero) + "</p>" +
      '<div class="osio-otsake paljasta"><p class="silma">' +
      esc(osio.numero) +
      '</p><h2 id="tyot-otsikko">' +
      esc(osio.otsikko) +
      '</h2><p class="johdanto">' +
      esc(osio.johdanto) +
      "</p></div>" +
      '<div class="tyot-ruudukko">' +
      kortit +
      "</div></section>"
    );
  }

  function kanavaPaikka(otsikko, arvo, selite) {
    return (
      '<div class="kanava kanava-paikka"><p class="kanava-otsikko">' +
      esc(otsikko) +
      '</p><p class="kanava-arvo">' +
      esc(arvo) +
      '</p><p class="kanava-selite">' +
      esc(selite) +
      "</p></div>"
    );
  }

  function kanavaLinkki(otsikko, kanava) {
    const url = httpUrl(kanava && kanava.osoite);
    if (!url) return "";
    const nimiTeksti = [otsikko, kanava.teksti || url, kanava.selite || ""].filter(Boolean).join(". ");
    return (
      '<a class="kanava kanava-linkki" aria-label="' + esc(nimiTeksti) + '" href="' +
      esc(url) +
      '" target="_blank" rel="me noopener noreferrer">' +
      '<span class="kanava-otsikko">' + esc(otsikko) + "</span>" +
      '<svg class="nuoli" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18L18 6M9 6h9v9" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>' +
      '<span class="kanava-arvo">' + esc(kanava.teksti || url) + "</span>" +
      '<span class="kanava-selite">' + esc(kanava.selite || "") +
      '<span class="sr-only"> ' + esc(data.ui.uusiValilehti) + "</span></span></a>"
    );
  }

  function tausta() {
    const osio = data.tausta;
    if (!osio || !Array.isArray(osio.kohdat) || !osio.kohdat.length) return "";
    const kohdat = osio.kohdat
      .map(function (kohta) {
        return (
          '<li class="tausta-kohta paikka-kortti paljasta">' +
          (kohta.meta ? '<p class="kanava-otsikko">' + esc(kohta.meta) + "</p>" : "") +
          "<h3>" + esc(kohta.nimi) + "</h3>" +
          (kohta.teksti ? "<p>" + esc(kohta.teksti) + "</p>" : "") +
          "</li>"
        );
      })
      .join("");
    return (
      '<section class="osio" id="taustat" aria-labelledby="tausta-otsikko">' +
      '<p class="osio-numero" aria-hidden="true">' + esc(osio.numero) + "</p>" +
      '<div class="osio-otsake paljasta"><p class="silma">' +
      esc(osio.numero) +
      '</p><h2 id="tausta-otsikko">' +
      esc(osio.otsikko) +
      '</h2><p class="johdanto">' +
      esc(osio.johdanto) +
      "</p></div>" +
      '<ul class="tausta-lista">' +
      kohdat +
      "</ul></section>"
    );
  }

  function yhteys() {
    const osio = data.yhteys;
    const posti = sahkoposti(osio.sahkoposti);
    const linkedinHtml = kanavaLinkki("LinkedIn", osio.linkedin);
    const githubHtml = kanavaLinkki("GitHub", osio.github);
    const postiHtml = posti
      ? '<a class="kanava kanava-linkki" href="mailto:' +
        esc(posti) +
        '"><span class="kanava-otsikko">' +
        esc(osio.sahkopostiOtsikko) +
        '</span><svg class="nuoli" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18L18 6M9 6h9v9" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg><span class="kanava-arvo">' +
        esc(posti) +
        '</span><span class="kanava-selite">mailto</span></a>'
      : osio.sahkopostiTyhja
        ? kanavaPaikka(osio.sahkopostiOtsikko, osio.sahkopostiTyhja, osio.sahkopostiSelite)
        : "";

    const muut = Array.isArray(osio.muut) ? osio.muut : [];
    let muutHtml = "";
    if (!muut.length && osio.muutTyhja) {
      muutHtml = kanavaPaikka(osio.muutOtsikko, osio.muutTyhja, "");
    } else {
      muutHtml = muut
        .map(function (kohta) {
          const osoite = httpUrl(kohta.osoite);
          if (!osoite) {
            return kanavaPaikka(kohta.nimi || osio.muutOtsikko, kohta.teksti || osio.muutTyhja, kohta.selite || "");
          }
          return (
            '<a class="kanava kanava-linkki" href="' +
            esc(osoite) +
            '" target="_blank" rel="noopener noreferrer"><span class="kanava-otsikko">' +
            esc(kohta.nimi || "") +
            '</span><svg class="nuoli" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18L18 6M9 6h9v9" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg><span class="kanava-arvo">' +
            esc(kohta.teksti || osoite) +
            '</span><span class="kanava-selite">' +
            esc(kohta.selite || data.ui.uusiValilehti) +
            "</span></a>"
          );
        })
        .join("");
    }

    return (
      '<section class="osio" id="yhteys" aria-labelledby="yhteys-otsikko">' +
      '<p class="osio-numero" aria-hidden="true">' + esc(osio.numero) + "</p>" +
      '<div class="osio-otsake paljasta"><p class="silma">' +
      esc(osio.numero) +
      '</p><h2 id="yhteys-otsikko">' +
      esc(osio.otsikko) +
      '</h2><p class="johdanto">' +
      esc(osio.johdanto) +
      "</p></div>" +
      '<div class="yhteys-lista paljasta">' +
      linkedinHtml +
      githubHtml +
      postiHtml +
      muutHtml +
      "</div></section>"
    );
  }

  function alatunniste() {
    footer.innerHTML =
      '<div class="kehys alatunniste-sisus"><p class="alatunniste-nimi">' +
      esc(nimi) +
      '</p><p>' +
      esc(data.alatunniste.kuvaus) +
      "</p>" +
      (data.alatunniste.muokkaus
        ? '<p class="muokkaus">' + esc(data.alatunniste.muokkaus) + "</p>"
        : "") +
      '<a class="tekstilinkki" href="#alku">' +
      esc(data.alatunniste.ylos) +
      "</a></div>";
  }

  function rakennaSivu() {
    document.title = nimi || "Henkilökohtainen sivu";
    const kuvaus = document.querySelector('meta[name="description"]');
    if (kuvaus && data.kuvaus) kuvaus.setAttribute("content", data.kuvaus);
    if (merkki) merkki.textContent = nimi;
    if (ohitus && data.ui.ohitus) ohitus.textContent = data.ui.ohitus;
    const valikkoTeksti = nappi && nappi.querySelector(".valikko-teksti");
    if (valikkoTeksti) valikkoTeksti.textContent = data.ui.avaaValikko;

    main.innerHTML = '<div class="kehys">' + hero() + tietoa() + osaaminen() + projektit() + tausta() + yhteys() + "</div>";
    rakennaNavigointi();
    alatunniste();
    lisaaRakenteinenData();
  }

  function lisaaRakenteinenData() {
    const sameAs = ["linkedin", "github"]
      .map(function (avain) {
        return httpUrl(data.yhteys && data.yhteys[avain] && data.yhteys[avain].osoite);
      })
      .filter(Boolean);
    const kuvaus = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: nimi,
    };
    if (sameAs.length) kuvaus.sameAs = sameAs;
    if (data.paikka) kuvaus.homeLocation = { "@type": "Place", name: data.paikka };
    if (data.nykyinenRooli) kuvaus.jobTitle = data.nykyinenRooli;
    if (data.tyonantaja) kuvaus.worksFor = { "@type": "Organization", name: data.tyonantaja };
    let solmu = document.getElementById("rakenteinen-data");
    if (!solmu) {
      solmu = document.createElement("script");
      solmu.id = "rakenteinen-data";
      solmu.type = "application/ld+json";
      document.head.appendChild(solmu);
    }
    solmu.textContent = JSON.stringify(kuvaus);
  }

  function paivitaInert() {
    const mobiili = valikkoMq.matches;
    if (nav) nav.toggleAttribute("inert", mobiili && !valikkoAuki);
    if (main) main.toggleAttribute("inert", mobiili && valikkoAuki);
    if (footer) footer.toggleAttribute("inert", mobiili && valikkoAuki);
    if (merkki) merkki.toggleAttribute("inert", mobiili && valikkoAuki);
  }

  function asetaValikko(auki) {
    valikkoAuki = auki;
    if (!nappi) return;
    nappi.setAttribute("aria-expanded", auki ? "true" : "false");
    const teksti = nappi.querySelector(".valikko-teksti");
    if (teksti) teksti.textContent = auki ? data.ui.suljeValikko : data.ui.avaaValikko;
    if (nav) nav.classList.toggle("on-auki", auki);
    document.body.classList.toggle("valikko-auki", auki);
    paivitaInert();
  }

  function suljeValikko(palauta) {
    if (!valikkoAuki) return;
    asetaValikko(false);
    if (palauta && palautusKohde && typeof palautusKohde.focus === "function") {
      palautusKohde.focus();
    }
  }

  function alustaValikko() {
    if (!nappi || !nav) return;
    asetaValikko(false);
    nappi.addEventListener("click", function () {
      if (valikkoAuki) {
        suljeValikko(false);
        nappi.focus();
        return;
      }
      palautusKohde = nappi;
      asetaValikko(true);
      const ensimmainen = nav.querySelector("a");
      if (ensimmainen) ensimmainen.focus();
    });
    nav.addEventListener("click", function (tapahtuma) {
      if (tapahtuma.target.closest("a")) suljeValikko(false);
    });
    document.addEventListener("keydown", function (tapahtuma) {
      if (tapahtuma.key === "Escape" && valikkoAuki) {
        tapahtuma.preventDefault();
        suljeValikko(true);
      }
      if (tapahtuma.key !== "Tab" || !valikkoAuki || !valikkoMq.matches) return;
      const kohteet = [nappi].concat(Array.from(nav.querySelectorAll("a")));
      const ensimmäinen = kohteet[0];
      const viimeinen = kohteet[kohteet.length - 1];
      if (tapahtuma.shiftKey && document.activeElement === ensimmäinen) {
        tapahtuma.preventDefault();
        viimeinen.focus();
      } else if (!tapahtuma.shiftKey && document.activeElement === viimeinen) {
        tapahtuma.preventDefault();
        ensimmäinen.focus();
      }
    });
    valikkoMq.addEventListener("change", function () {
      if (!valikkoMq.matches) suljeValikko(false);
      else paivitaInert();
    });
  }

  function alustaKortit() {
    const tyot = document.getElementById("tyot");
    if (!tyot) return;
    tyot.addEventListener("click", function (tapahtuma) {
      const painike = tapahtuma.target.closest(".nappi-teksti");
      if (!painike) return;
      const paneeli = document.getElementById(painike.getAttribute("aria-controls"));
      if (!paneeli) return;
      const auki = painike.getAttribute("aria-expanded") === "true";
      painike.setAttribute("aria-expanded", auki ? "false" : "true");
      painike.textContent = auki ? data.tyot.nayta : data.tyot.piilota;
      paneeli.hidden = auki;
    });
  }

  function alustaPaljastukset() {
    const kohteet = main.querySelectorAll(".paljasta");
    if (liikeMq.matches || !("IntersectionObserver" in window)) {
      kohteet.forEach(function (el) {
        el.classList.add("on-nakyvissa");
      });
      return;
    }
    document.documentElement.classList.add("liike");
    const tarkkailija = new IntersectionObserver(
      function (merkinnat) {
        merkinnat.forEach(function (merkinta) {
          if (!merkinta.isIntersecting) return;
          merkinta.target.classList.add("on-nakyvissa");
          tarkkailija.unobserve(merkinta.target);
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    kohteet.forEach(function (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) el.classList.add("on-nakyvissa");
      else tarkkailija.observe(el);
    });
  }

  function alustaNykyinenOsio() {
    if (!("IntersectionObserver" in window)) return;
    const osiot = ["alku"]
      .concat((data.navigointi || []).map(function (kohta) { return kohta.id; }))
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);
    const tarkkailija = new IntersectionObserver(
      function (merkinnat) {
        const nakyva = merkinnat
          .filter(function (merkinta) { return merkinta.isIntersecting; })
          .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; })[0];
        if (!nakyva) return;
        const id = nakyva.target.id;
        nav.querySelectorAll("a[href^='#']").forEach(function (linkki) {
          if (linkki.getAttribute("href") === "#" + id) linkki.setAttribute("aria-current", "true");
          else linkki.removeAttribute("aria-current");
        });
      },
      { rootMargin: "-28% 0px -55% 0px", threshold: [0.15, 0.4, 0.7] }
    );
    osiot.forEach(function (osio) { tarkkailija.observe(osio); });
  }

  function alustaVieritys() {
    const paivita = function () {
      if (header) header.classList.toggle("on-vieritetty", window.scrollY > 8);
      if (!palkki) return;
      const matka = document.documentElement.scrollHeight - window.innerHeight;
      const osuus = matka > 0 ? window.scrollY / matka : 0;
      palkki.style.transform = "scaleX(" + Math.min(1, Math.max(0, osuus)) + ")";
    };
    window.addEventListener("scroll", paivita, { passive: true });
    paivita();
  }

  rakennaSivu();
  alustaValikko();
  alustaKortit();
  alustaPaljastukset();
  alustaNykyinenOsio();
  alustaVieritys();
})();
