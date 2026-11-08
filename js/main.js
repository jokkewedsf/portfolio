/**
 * Kokoaa sivun js/sisalto.js-tiedoston tiedoista ja kytkee valikon,
 * kortit, vierityksen ja näppäimistön. Ei lomaketta eikä keksittyjä linkkejä.
 */
(function () {
  const juuri = window.SIVUN_SISALTO;

  function lueKieli() {
    try {
      const tallennettu = window.localStorage.getItem("kieli");
      if (tallennettu === "en" || tallennettu === "fi") return tallennettu;
    } catch (virhe) {
      return "fi";
    }
    return "fi";
  }

  let kieli = lueKieli();
  let data = (juuri && juuri.kielet && juuri.kielet[kieli]) || juuri;
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

  const nimi = [juuri && juuri.etunimi, juuri && juuri.sukunimi].filter(Boolean).join(" ").trim();
  let osioTarkkailija = null;

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

  function nimiAnimaatio() {
    function rivi(sana, alku, luokka) {
      const kirjaimet = String(sana)
        .split("")
        .map(function (merkki, indeksi) {
          return '<span class="nimi-kirjain" style="--i:' + (alku + indeksi) + '">' + esc(merkki) + "</span>";
        })
        .join("");
      return '<span class="nimi-rivi ' + luokka + '" aria-hidden="true">' + kirjaimet + "</span>";
    }
    const etunimi = (juuri && juuri.etunimi) || "";
    const sukunimi = (juuri && juuri.sukunimi) || "";
    return (
      '<h1 id="nimi-otsikko" class="nimi-animaatio">' +
      '<span class="sr-only">' + esc(nimi) + "</span>" +
      rivi(etunimi, 0, "nimi-etu") +
      rivi(sukunimi, etunimi.length, "nimi-suku") +
      "</h1>"
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
          '<a href="#' + esc(kohta.id) + '" aria-label="' + esc(otsikko) + '">' +
          esc(kohta.teksti || kohta.id) +
          "</a>"
        );
      });
    ["linkedin"].forEach(function (avain) {
      const kanava = data.yhteys && data.yhteys[avain];
      const osoite = httpUrl(kanava && kanava.osoite);
      if (!osoite) return;
      const luokka = avain === "linkedin" ? "nav-ulkoinen nav-yhteys" : "nav-ulkoinen";
      osiot.push(ulkoinenLinkki(luokka, osoite, kanava.navTeksti || avain, kanava.selite || ""));
    });
    nav.innerHTML = osiot.join("");
    if (data.ui && data.ui.navAria) nav.setAttribute("aria-label", data.ui.navAria);
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
      '<div class="hero-teksti">' +
      '<p class="ylateksti"><span class="piste" aria-hidden="true"></span>' +
      esc(data.hero.ylateksti) +
      "</p>" +
      nimiAnimaatio() +
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
      "</div></section>"
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
          '<button type="button" class="nappi-teksti" id="' + id + '-nappi" aria-expanded="false" aria-controls="' +
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

  function paivitaKieli() {
    document.documentElement.lang = kieli === "en" ? "en" : "fi";
    const ryhma = document.getElementById("kieli");
    if (ryhma && data.ui && data.ui.kieli) ryhma.setAttribute("aria-label", data.ui.kieli);
    ["fi", "en"].forEach(function (koodi) {
      const nappiKieli = document.getElementById("kieli-" + koodi);
      if (nappiKieli) nappiKieli.setAttribute("aria-pressed", kieli === koodi ? "true" : "false");
    });
    const locale = document.querySelector('meta[property="og:locale"]');
    if (locale) locale.setAttribute("content", kieli === "en" ? "en_US" : "fi_FI");
  }

  function fokusMerkki(el) {
    if (!el || el === document.body) return "";
    if (el.id) return "id:" + el.id;
    const erp = el.closest && el.closest("[data-erp]");
    if (erp) return "erp:" + erp.getAttribute("data-erp");
    const href = el.getAttribute && el.getAttribute("href");
    if (href) return "href:" + href;
    return "";
  }

  function palautaFokus(merkkiFokus) {
    let kohde = null;
    if (merkkiFokus.indexOf("id:") === 0) kohde = document.getElementById(merkkiFokus.slice(3));
    else if (merkkiFokus.indexOf("erp:") === 0) {
      kohde = document.querySelector('.erp-piste[data-erp="' + merkkiFokus.slice(4) + '"]');
    } else if (merkkiFokus.indexOf("href:") === 0) {
      const href = merkkiFokus.slice(5);
      kohde = document.querySelector('a[href="' + href.replace(/"/g, "") + '"]');
    }
    if (kohde && typeof kohde.focus === "function") kohde.focus({ preventScroll: true });
  }

  function vaihdaKieli(uusi) {
    if (uusi !== "fi" && uusi !== "en") return;
    if (!juuri.kielet || !juuri.kielet[uusi] || uusi === kieli) return;
    const y = window.scrollY;
    const avoimet = Array.prototype.map.call(
      document.querySelectorAll('.nappi-teksti[aria-expanded="true"]'),
      function (el) { return el.getAttribute("aria-controls"); }
    );
    const merkkiFokus = fokusMerkki(document.activeElement);
    try {
      window.localStorage.setItem("kieli", uusi);
    } catch (virhe) {
      /* tallennus ei ole välttämätön */
    }
    kieli = uusi;
    data = juuri.kielet[kieli];
    rakennaSivu();
    alustaKortit();
    alustaPaljastukset();
    alustaNykyinenOsio();
    avoimet.forEach(function (id) {
      if (!id) return;
      const paneeli = document.getElementById(id);
      const painike = document.querySelector('[aria-controls="' + id + '"]');
      if (!paneeli || !painike) return;
      painike.setAttribute("aria-expanded", "true");
      painike.textContent = data.tyot.piilota;
      paneeli.hidden = false;
    });
    const juuriHtml = document.documentElement;
    const aiempi = juuriHtml.style.scrollBehavior;
    juuriHtml.style.scrollBehavior = "auto";
    window.scrollTo(0, y);
    juuriHtml.style.scrollBehavior = aiempi;
    palautaFokus(merkkiFokus);
  }

  function alustaKieli() {
    const ryhma = document.getElementById("kieli");
    if (!ryhma) return;
    ryhma.addEventListener("click", function (tapahtuma) {
      const nappiKieli = tapahtuma.target.closest("button[data-kieli]");
      if (!nappiKieli) return;
      vaihdaKieli(nappiKieli.getAttribute("data-kieli"));
    });
  }

  function rakennaSivu() {
    document.title = nimi || "Joakim Rydenfelt";
    const kuvaus = document.querySelector('meta[name="description"]');
    if (kuvaus && data.kuvaus) kuvaus.setAttribute("content", data.kuvaus);
    const og = document.querySelector('meta[property="og:description"]');
    if (og && data.kuvaus) og.setAttribute("content", data.kuvaus);
    if (merkki) merkki.textContent = nimi;
    if (ohitus && data.ui.ohitus) ohitus.textContent = data.ui.ohitus;
    const valikkoTeksti = nappi && nappi.querySelector(".valikko-teksti");
    if (valikkoTeksti) valikkoTeksti.textContent = valikkoAuki ? data.ui.suljeValikko : data.ui.avaaValikko;
    if (nappi) nappi.setAttribute("aria-label", valikkoAuki ? data.ui.suljeValikko : data.ui.avaaValikko);
    paivitaKieli();

    main.innerHTML =
      '<div class="kehys">' + hero() + tietoa() + osaaminen() + "</div>" +
      (window.piirraErp ? window.piirraErp(data.erp) : "") +
      aulaOsio() +
      '<div class="kehys">' + projektit() + tausta() + yhteys() + "</div>";
    rakennaNavigointi();
    alatunniste();
    lisaaRakenteinenData();
    if (window.alustaErp) window.alustaErp();
    alustaAula();
  }

  function aulaOsio() {
    const osio = data.ratkaisut;
    const demo = data.aula;
    const tuote = data.chatbot;
    const kohta = (juuri.katalogi || [])[0];
    if (!osio || !demo || !tuote || !kohta) return "";
    return (
      '<section class="osio aula-osio" id="ratkaisut" aria-labelledby="aula-otsikko">' +
      '<div class="aula-asetelma">' +
      '<div class="aula-johdanto"><p class="silma">' + esc(osio.numero) + "</p>" +
      '<h2 id="aula-otsikko">' + esc(osio.otsikko) + "</h2>" +
      '<p class="johdanto">' + esc(osio.johdanto) + "</p>" +
      '<article class="ratkaisu-kortti">' +
      '<p class="silma">' + esc(demo.tuote) + " · " + esc(demo.huom) + "</p>" +
      "<h3>" + esc(tuote.ylateksti) + "</h3>" +
      "<p>" + esc(tuote.arvo) + "</p>" +
      '<div class="toiminnot">' +
      '<a class="nappi nappi-ensisijainen" href="' + esc(kohta.polku) + '">' + esc(osio.tutustu) + "</a>" +
      '<a class="nappi nappi-toissijainen" href="#aula-demo">' + esc(osio.kokeile) + "</a>" +
      "</div></article></div>" +
      '<div class="ratkaisu-demo" id="aula-demo">' +
      "<h3>" + esc(osio.demoOtsikko) + "</h3>" +
      '<div id="aula-demo-juuri"></div></div></div></section>'
    );
  }

  function aulaAsetukset() {
    const osio = data.aula;
    if (!osio) return null;
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

  function alustaAula() {
    if (window.__aulaKahva && typeof window.__aulaKahva.destroy === "function") {
      window.__aulaKahva.destroy();
      window.__aulaKahva = null;
    }
    const juuri = document.getElementById("aula-demo-juuri");
    if (!juuri || !window.AulaDemo) return;
    window.__aulaKahva = window.AulaDemo.mount(juuri, aulaAsetukset());
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
      const kieliNapit = Array.from(document.querySelectorAll("#kieli button"));
      const kohteet = kieliNapit.concat([nappi], Array.from(nav.querySelectorAll("a")));
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
    if (osioTarkkailija) {
      osioTarkkailija.disconnect();
      osioTarkkailija = null;
    }
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
    osioTarkkailija = tarkkailija;
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
  alustaKieli();
  alustaValikko();
  alustaKortit();
  alustaPaljastukset();
  alustaNykyinenOsio();
  alustaVieritys();
})();
