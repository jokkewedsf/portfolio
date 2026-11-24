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
  let data = juuri && juuri.kielet && juuri.kielet[kieli];
  const main = document.getElementById("sisalto");
  const nav = document.getElementById("navigaatio");
  const footer = document.getElementById("alatunniste");
  const nappi = document.getElementById("valikko-nappi");
  const puhutaan = document.querySelector(".puhutaan");
  const valikkoMq = window.matchMedia("(max-width: 860px)");
  let valikkoAuki = false;
  let demoTila = "tarjous";
  let demoLukko = 0;
  let navTarkkailija = null;
  let liikeTarkkailija = null;
  let viivaKuuntelija = null;
  let dialogiPalautus = null;

  function esc(arvo) {
    return String(arvo == null ? "" : arvo).replace(/[&<>"']/g, function (merkki) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[merkki];
    });
  }

  function vahennaLiiketta() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function nuoli() {
    return '<span class="nuoli" aria-hidden="true">↗</span>';
  }

  function ulkoinen(href, teksti, luokka) {
    return '<a class="' + luokka + '" href="' + esc(href) + '" target="_blank" rel="noopener noreferrer">' +
      esc(teksti) + nuoli() +
      '<span class="sr-only"> (' + esc(data.ui.uusiValilehti) + ")</span></a>";
  }

  if (!data || !main) return;

  function asetaMeta(valitsin, sisalto) {
    const solmu = document.querySelector(valitsin);
    if (solmu && sisalto) solmu.setAttribute("content", sisalto);
  }

  function hero() {
    const h = data.hero;
    const kuvio = h.jarjestelma;
    const kortit = (kuvio.kortit || []).map(function (kortti) {
      return '<li class="jarjestelma-kortti" data-kortti="' + esc(kortti.id) + '">' +
        '<span class="jarjestelma-nro">' + esc(kortti.nro) + "</span>" +
        '<p class="jarjestelma-nimi">' + esc(kortti.nimi) + "</p>" +
        '<p class="jarjestelma-ala">' + esc(kortti.ala) + "</p></li>";
    }).join("");
    return (
      '<section class="hero" id="alku">' +
      '<div class="hero-sisus">' +
      "<div>" +
      '<p class="silma">' + esc(h.ylateksti) + "</p>" +
      "<h1>" + esc(h.otsikko) + "</h1>" +
      '<p class="lead">' + esc(h.ingressi) + "</p>" +
      '<div class="hero-napit">' +
      '<a class="nappi" href="' + esc(h.yhteysKohde || "#yhteys") + '">' + esc(h.linkedinNappi) + "</a>" +
      '<a class="tekstilinkki" href="' + esc(h.selaaKohde || "#kokemus") + '">' + esc(h.selaaNappi) + ' <span aria-hidden="true">↓</span></a>' +
      "</div>" +
      '<p class="allekirjoitus">' + esc(h.allekirjoitus) + "</p>" +
      "</div>" +
      '<div class="jarjestelma" id="jarjestelma">' +
      '<p class="sr-only">' + esc(kuvio.ruudunlukija) + "</p>" +
      '<div class="jarjestelma-kentta">' +
      '<svg class="jarjestelma-viivat" aria-hidden="true" focusable="false">' +
      "<line></line><line></line><line></line><line></line>" +
      "</svg>" +
      "<ol>" + kortit + "</ol>" +
      "</div>" +
      '<p class="jarjestelma-kuvaus">' + esc(kuvio.kuvaus) + "</p>" +
      "</div></div></section>"
    );
  }

  function osioPaa(id, numero, silma, otsikko, johdanto) {
    return (
      '<section class="osio" id="' + id + '" tabindex="-1">' +
      '<div class="osio-paa">' +
      '<p class="silma">' + esc(numero) + " / " + esc(silma) + "</p>" +
      "<h2>" + esc(otsikko) + "</h2>" +
      (johdanto ? '<p class="osio-johdanto">' + esc(johdanto) + "</p>" : "") +
      "</div>"
    );
  }

  function ankkuri(id) {
    return '<span id="' + esc(id) + '" class="ankkuri"></span>';
  }

  function proosa(kappaleet) {
    return '<div class="proosa">' + (kappaleet || []).map(function (kappale) {
      return "<p>" + esc(kappale) + "</p>";
    }).join("") + "</div>";
  }

  function osioAlku(id, silma, otsikko) {
    return (
      '<section class="osio" id="' + esc(id) + '" tabindex="-1">' +
      '<p class="silma">' + esc(silma) + "</p>" +
      "<h2>" + esc(otsikko) + "</h2>"
    );
  }

  function johtaminen() {
    const osio = data.johtaminen;
    return osioAlku("johtaminen", osio.silma, osio.otsikko) + proosa(osio.kappaleet) + "</section>";
  }

  function myynti() {
    const osio = data.myynti;
    return osioAlku("myynti", osio.silma, osio.otsikko) + proosa(osio.kappaleet) +
      '<p class="luku-huom">' + esc(data.hero.luku) + " " + esc(data.hero.lukuSelite) + ".</p></section>";
  }

  function tyolinkki(href, teksti, ulko) {
    if (ulko) return ulkoinen(href, teksti, "tekstilinkki aksentti");
    return '<a class="tekstilinkki aksentti" href="' + esc(href) + '">' + esc(teksti) + nuoli() + "</a>";
  }

  function work() {
    const osio = data.work;
    const rivit = (osio.kohdat || []).map(function (kohta, indeksi) {
      const tagit = (kohta.tagit || []).map(function (tagi) {
        return "<li>" + esc(tagi) + "</li>";
      }).join("");
      let esikatselu = '<p class="silma">' + esc(kohta.esikatselu) + "</p>";
      if (kohta.esikatseluIso) esikatselu += '<p class="esikatselu-iso">' + esc(kohta.esikatseluIso) + "</p>";
      if (kohta.kupla) esikatselu += '<p class="esikatselu-kupla">' + esc(kohta.kupla) + "</p>";
      if (kohta.polku) esikatselu += '<p class="esikatselu-polku">' + esc(kohta.polku) + "</p>";
      if (kohta.polkuAla) esikatselu += '<p class="esikatselu-polku aksentti">' + esc(kohta.polkuAla) + "</p>";
      const tiedot = [
        [osio.tila, kohta.ongelma],
        [osio.rooliOtsikko, kohta.rooli],
        [osio.tekoOtsikko, kohta.teko],
        [kohta.hyotyOtsikko, kohta.hyoty],
      ].map(function (pari) {
        return "<div><dt>" + esc(pari[0]) + "</dt><dd>" + esc(pari[1]) + "</dd></div>";
      }).join("");
      let linkit = "";
      if (kohta.avaa) {
        linkit += '<button type="button" class="tekstilinkki aksentti avaa-chat">' + esc(kohta.linkinTeksti) + nuoli() + "</button>";
      }
      if (kohta.sivu) linkit += tyolinkki(kohta.sivu, kohta.sivuTeksti, false);
      if (kohta.linkki) linkit += tyolinkki(kohta.linkki, kohta.linkinTeksti, false);
      if (kohta.dialogiOtsikko) {
        linkit += '<button type="button" class="tekstilinkki aksentti" data-tyo="' + indeksi + '">' +
          esc(kohta.dialogiNappi) + nuoli() + "</button>";
      }
      if (kohta.lahde) linkit += tyolinkki(kohta.lahde, kohta.lahdeTeksti, true);
      const viive = Math.min(indeksi, 3) * 60;
      return (
        '<article class="tyo liike" style="--viive:' + viive + 'ms">' +
        '<div class="esikatselu">' + esikatselu + "</div>" +
        "<div><h3>" + esc(kohta.nimi) + "</h3>" +
        '<dl class="tyo-tiedot">' + tiedot + "</dl>" +
        (kohta.hyotyTarkenne ? '<p class="tyo-tarkenne">' + esc(kohta.hyotyTarkenne) + "</p>" : "") +
        '<p class="silma tyo-tyokalut">' + esc(osio.tyokalut) + "</p>" +
        '<ul class="tagit">' + tagit + "</ul>" +
        '<p class="tyo-linkit">' + linkit + "</p></div></article>"
      );
    }).join("");
    return rivit;
  }

  function demoKuori() {
    const d = data.demo;
    const askeleet = (d.vaiheet || []).map(function (vaihe) {
      return '<li data-vaihe="' + esc(vaihe.id) + '"><span class="demo-merkki"></span><span class="demo-nimi">' +
        esc(vaihe.nimi) + "</span></li>";
    }).join("");
    return (
      '<div class="demo-kehys liike" id="demo">' +
      '<ol class="demo-askeleet" aria-label="' + esc(d.alue) + '">' + askeleet + "</ol>" +
      '<div class="demo-kortti">' +
      '<p class="demo-huom">' + esc(d.huom) + "</p>" +
      '<p class="demo-asiakirja" id="demo-asiakirja"></p>' +
      '<dl class="demo-tiedot">' +
      "<div><dt>" + esc(d.tilaOtsikko) + '</dt><dd id="demo-tila-arvo"></dd></div>' +
      "<div><dt>" + esc(d.asiakasOtsikko) + "</dt><dd>" + esc(d.asiakas) +
      ' <span class="demo-badge">' + esc(d.asiakasMerkki) + "</span></dd></div>" +
      "<div><dt>" + esc(d.tyoOtsikko) + "</dt><dd>" + esc(d.tyo) + "</dd></div>" +
      "<div><dt>" + esc(d.hintaOtsikko) + "</dt><dd>" + esc(d.hinta) +
      ' <span class="demo-lisa">' + esc(d.hintaSelite) + "</span></dd></div>" +
      "</dl>" +
      '<h3 class="demo-yhteenveto" id="demo-yhteenveto" hidden></h3>' +
      '<p class="demo-teksti" id="demo-teksti"></p>' +
      '<p class="sr-only" id="demo-live" aria-live="polite" aria-atomic="true"></p>' +
      '<div class="demo-toiminnot">' +
      '<button type="button" class="nappi" id="demo-hyvaksy"></button>' +
      '<button type="button" class="nappi" id="demo-valmis" hidden></button>' +
      '<button type="button" class="nappi nappi-toinen" id="demo-alusta"></button>' +
      "</div></div></div>"
    );
  }

  function teknologia() {
    const osio = data.teknologia;
    const demoOsio = data.demo;
    return osioAlku("teknologia", osio.silma, osio.otsikko) + proosa(osio.kappaleet) +
      ankkuri("prosessi") + ankkuri("business") +
      '<div class="demo-otsikko"><h3>' + esc(demoOsio.otsikko) + "</h3><p>" + esc(demoOsio.johdanto) + "</p></div>" +
      demoKuori() + "</section>";
  }

  function paivitaDemo(ilmoitus) {
    const d = data.demo;
    const juuriDemo = document.getElementById("demo");
    if (!juuriDemo || !d) return;
    let nykyinen = "tarjous";
    let valmiit = [];
    let tila = d.tarjousTila;
    let teksti = d.tarjousTeksti;
    let asiakirja = d.tarjousNro;
    if (demoTila === "tyo") {
      nykyinen = "tyomaarays";
      valmiit = ["tarjous"];
      tila = d.tyoTila;
      teksti = d.tyoTeksti;
      asiakirja = d.tyoNro;
    } else if (demoTila === "lasku") {
      nykyinen = "laskutus";
      valmiit = ["tarjous", "tyomaarays", "toteutus"];
      tila = d.laskuTila;
      teksti = d.laskuTeksti;
      asiakirja = d.tyoNro;
    }
    juuriDemo.querySelectorAll("[data-vaihe]").forEach(function (li) {
      const id = li.getAttribute("data-vaihe");
      const merkki = li.querySelector(".demo-merkki");
      li.classList.remove("on-nyt", "on-valmis", "on-seuraava");
      if (valmiit.indexOf(id) !== -1) {
        li.classList.add("on-valmis");
        merkki.textContent = d.merkkiValmis;
        li.removeAttribute("aria-current");
      } else if (id === nykyinen) {
        li.classList.add("on-nyt");
        merkki.textContent = d.merkkiNyt;
        li.setAttribute("aria-current", "step");
      } else {
        li.classList.add("on-seuraava");
        merkki.textContent = d.merkkiSeuraava;
        li.removeAttribute("aria-current");
      }
    });
    const asiakirjaSolmu = document.getElementById("demo-asiakirja");
    const tilaSolmu = document.getElementById("demo-tila-arvo");
    const tekstiSolmu = document.getElementById("demo-teksti");
    const yhteenveto = document.getElementById("demo-yhteenveto");
    if (asiakirjaSolmu) asiakirjaSolmu.textContent = asiakirja;
    if (tilaSolmu) tilaSolmu.textContent = tila;
    if (tekstiSolmu) tekstiSolmu.textContent = teksti;
    if (yhteenveto) {
      yhteenveto.hidden = demoTila !== "lasku";
      yhteenveto.textContent = demoTila === "lasku" ? d.laskuOtsikko : "";
    }
    const hyvaksy = document.getElementById("demo-hyvaksy");
    const valmis = document.getElementById("demo-valmis");
    const alusta = document.getElementById("demo-alusta");
    if (hyvaksy) {
      hyvaksy.textContent = d.hyvaksy;
      hyvaksy.hidden = demoTila !== "tarjous";
      hyvaksy.disabled = demoTila !== "tarjous";
    }
    if (valmis) {
      valmis.textContent = d.valmisNappi;
      valmis.hidden = demoTila !== "tyo";
      valmis.disabled = demoTila !== "tyo";
    }
    if (alusta) {
      alusta.textContent = d.alusta;
      alusta.disabled = demoTila === "tarjous";
    }
    if (ilmoitus) {
      const live = document.getElementById("demo-live");
      if (live) {
        live.textContent = "";
        window.setTimeout(function () { live.textContent = ilmoitus; }, 30);
      }
    }
  }

  function alustaDemo() {
    demoTila = "tarjous";
    demoLukko = 0;
    const juuriDemo = document.getElementById("demo");
    if (!juuriDemo) return;
    juuriDemo.addEventListener("click", function (tapahtuma) {
      const nappiDemo = tapahtuma.target.closest("button");
      if (!nappiDemo || nappiDemo.disabled || Date.now() < demoLukko) return;
      if (nappiDemo.id === "demo-hyvaksy") {
        if (demoTila !== "tarjous") return;
        demoTila = "tyo";
        demoLukko = Date.now() + 400;
        paivitaDemo(data.demo.hyvaksytty);
        const seuraava = document.getElementById("demo-valmis");
        if (seuraava) seuraava.focus();
      } else if (nappiDemo.id === "demo-valmis") {
        if (demoTila !== "tyo") return;
        demoTila = "lasku";
        demoLukko = Date.now() + 400;
        paivitaDemo(data.demo.laskuIlmoitus);
        const alusta = document.getElementById("demo-alusta");
        if (alusta) alusta.focus();
      } else if (nappiDemo.id === "demo-alusta") {
        if (demoTila === "tarjous") return;
        demoTila = "tarjous";
        demoLukko = Date.now() + 400;
        paivitaDemo(data.demo.alustus);
        const hyvaksy = document.getElementById("demo-hyvaksy");
        if (hyvaksy) hyvaksy.focus();
      }
    });
    paivitaDemo();
  }

  function kokemus() {
    const osio = data.kokemus;
    const esimerkit = data.work;
    const rivit = (osio.rivit || []).map(function (rivi, indeksi) {
      const viive = Math.min(indeksi, 3) * 60;
      return '<li class="liike" style="--viive:' + viive + 'ms"><span class="vuosi">' + esc(rivi.vuosi) + "</span>" +
        "<div><p class=\"tyonantaja\">" + esc(rivi.tyonantaja) + "</p>" +
        '<p class="rooli">' + esc(rivi.rooli) + "</p></div>" +
        "<p>" + esc(rivi.teksti) + "</p></li>";
    }).join("");
    return osioAlku("kokemus", osio.silma, osio.otsikko) +
      '<ul class="kokemus">' + rivit + "</ul>" +
      '<div class="esimerkit">' + ankkuri("tyot") + ankkuri("work") +
      "<h3>" + esc(osio.esimerkit || esimerkit.otsikko) + "</h3>" +
      '<p>' + esc(esimerkit.johdanto) + "</p></div>" +
      work() + "</section>";
  }

  function tausta() {
    const osio = data.beyond;
    const kortit = (osio.kohdat || []).map(function (kohta, indeksi) {
      const viive = Math.min(indeksi, 3) * 60;
      return '<li class="liike" style="--viive:' + viive + 'ms"><p class="silma">' + esc(kohta.silma) + "</p><h3>" + esc(kohta.otsikko) +
        "</h3><p>" + esc(kohta.teksti) + "</p></li>";
    }).join("");
    const huom = osio.huom ? '<p class="huom">' + esc(osio.huom) + "</p>" : "";
    return osioAlku("tausta", osio.silma, osio.otsikko) + ankkuri("story") +
      (osio.johdanto ? '<p class="proosa-johdanto">' + esc(osio.johdanto) + "</p>" : "") +
      '<ul class="nelikko">' + kortit + "</ul>" + huom + "</section>";
  }

  function yhteys() {
    const osio = data.contact;
    const osoite = data.yhteys.sahkoposti;
    return (
      '<section class="yhteys liike" id="yhteys" tabindex="-1">' +
      ankkuri("contact") +
      "<div><p class=\"silma\">" + esc(osio.silma) + "</p>" +
      "<h2>" + esc(osio.otsikko1) + "<br>" + esc(osio.otsikko2) + "</h2>" +
      "<p>" + esc(osio.johdanto) + "</p></div>" +
      '<div class="yhteys-oikea">' +
      '<a class="yhteys-posti" href="mailto:' + esc(osoite) + '">' + esc(osoite) + "</a>" +
      '<div class="kopio-rivi">' +
      '<button type="button" class="nappi nappi-toinen" id="kopioi-sahkoposti">' + esc(osio.kopioi) + "</button>" +
      '<p class="kopio-tila" id="kopioi-tila" aria-live="polite"></p>' +
      "</div>" +
      ulkoinen(data.yhteys.linkedin.osoite, osio.nappi, "yhteys-nappi") +
      "</div></section>"
    );
  }

  function rakennaNav() {
    if (!nav) return;
    nav.setAttribute("aria-label", data.ui.navAria);
    nav.innerHTML = (data.navigointi || []).map(function (kohta) {
      return '<a href="#' + esc(kohta.id) + '">' + esc(kohta.teksti) + "</a>";
    }).join("");
    if (puhutaan) {
      puhutaan.textContent = data.puhutaan;
      puhutaan.setAttribute("href", "#yhteys");
    }
  }

  function rakennaFooter() {
    if (!footer) return;
    footer.innerHTML =
      "<p>Joakim Rydenfelt</p><p>" + esc(data.footer.rivi) + "</p>" +
      ulkoinen(data.yhteys.github.osoite, data.footer.github, "alatunniste-linkki");
  }

  function paivitaKieli() {
    document.documentElement.lang = kieli === "en" ? "en" : "fi";
    if (data.meta) {
      document.title = data.meta.otsikko;
      asetaMeta('meta[name="description"]', data.meta.kuvaus);
      asetaMeta('meta[property="og:title"]', data.meta.otsikko);
      asetaMeta('meta[property="og:description"]', data.meta.kuvaus);
      asetaMeta('meta[name="twitter:title"]', data.meta.otsikko);
      asetaMeta('meta[name="twitter:description"]', data.meta.kuvaus);
      asetaMeta('meta[property="og:locale"]', kieli === "en" ? "en_US" : "fi_FI");
    }
    ["fi", "en"].forEach(function (koodi) {
      const nappiKieli = document.getElementById("kieli-" + koodi);
      if (nappiKieli) nappiKieli.setAttribute("aria-pressed", kieli === koodi ? "true" : "false");
    });
    const ryhma = document.getElementById("kieli");
    if (ryhma) ryhma.setAttribute("aria-label", data.ui.kieli);
    const valikkoTeksti = nappi && nappi.querySelector(".valikko-teksti");
    if (valikkoTeksti) valikkoTeksti.textContent = valikkoAuki ? data.ui.suljeValikko : data.ui.avaaValikko;
    if (nappi) nappi.setAttribute("aria-label", valikkoAuki ? data.ui.suljeValikko : data.ui.avaaValikko);
    const ohitus = document.querySelector(".ohitus");
    if (ohitus) ohitus.textContent = data.ui.ohitus;
  }

  function sidoAvaukset() {
    main.querySelectorAll(".avaa-chat").forEach(function (nappiChat) {
      nappiChat.addEventListener("click", function () {
        if (window.avaaKeskustelu) window.avaaKeskustelu();
      });
    });
    main.querySelectorAll("[data-tyo]").forEach(function (nappiTyo) {
      nappiTyo.addEventListener("click", function () {
        const indeksi = Number(nappiTyo.getAttribute("data-tyo"));
        const kohta = (data.work.kohdat || [])[indeksi];
        if (kohta) avaaDialogi(kohta, nappiTyo);
      });
    });
  }

  function varmistaDialogi() {
    let dialogi = document.getElementById("tyon-dialogi");
    if (dialogi) return dialogi;
    dialogi = document.createElement("div");
    dialogi.id = "tyon-dialogi";
    dialogi.className = "dialogi";
    dialogi.setAttribute("role", "dialog");
    dialogi.setAttribute("aria-modal", "true");
    dialogi.setAttribute("aria-labelledby", "tyon-dialogi-otsikko");
    dialogi.hidden = true;
    dialogi.innerHTML =
      '<div class="dialogi-tausta" data-sulje="1"></div>' +
      '<div class="dialogi-paneeli">' +
      '<button type="button" class="dialogi-sulje">' + esc(data.ui.sulje) + "</button>" +
      '<h2 id="tyon-dialogi-otsikko"></h2>' +
      '<div class="dialogi-sisus"></div>' +
      "</div>";
    document.body.appendChild(dialogi);
    dialogi.addEventListener("click", function (tapahtuma) {
      if (tapahtuma.target && tapahtuma.target.getAttribute("data-sulje") === "1") suljeDialogi(true);
      if (tapahtuma.target && tapahtuma.target.closest(".dialogi-sulje")) suljeDialogi(true);
      const linkki = tapahtuma.target && tapahtuma.target.closest("a");
      if (!linkki || !dialogi.contains(linkki)) return;
      const href = linkki.getAttribute("href") || "";
      if (href.charAt(0) !== "#") return;
      tapahtuma.preventDefault();
      const kohde = document.getElementById(href.slice(1));
      suljeDialogi(false);
      if (kohde) {
        if (!kohde.hasAttribute("tabindex")) kohde.setAttribute("tabindex", "-1");
        kohde.focus();
      }
    });
    return dialogi;
  }

  function avaaDialogi(kohta, palautus) {
    const dialogi = varmistaDialogi();
    dialogi.querySelector(".dialogi-sulje").textContent = data.ui.sulje;
    dialogi.querySelector("#tyon-dialogi-otsikko").textContent = kohta.dialogiOtsikko;
    const sisus = dialogi.querySelector(".dialogi-sisus");
    let html = (kohta.dialogiKappaleet || []).map(function (kappale) {
      return "<p>" + esc(kappale) + "</p>";
    }).join("");
    if (kohta.dialogiLinkki && kohta.dialogiLinkki.href) {
      html += '<p><a class="tekstilinkki aksentti" href="' + esc(kohta.dialogiLinkki.href) + '">' +
        esc(kohta.dialogiLinkki.teksti) + nuoli() + "</a></p>";
    }
    sisus.innerHTML = html;
    dialogi.hidden = false;
    document.body.classList.add("dialogi-auki");
    dialogiPalautus = palautus || document.activeElement;
    dialogi.querySelector(".dialogi-sulje").focus();
  }

  function suljeDialogi(palauta) {
    const dialogi = document.getElementById("tyon-dialogi");
    if (!dialogi || dialogi.hidden) return;
    dialogi.hidden = true;
    document.body.classList.remove("dialogi-auki");
    if (palauta && dialogiPalautus && dialogiPalautus.focus) dialogiPalautus.focus();
    dialogiPalautus = null;
  }

  function alustaJarjestelma() {
    const kuva = document.getElementById("jarjestelma");
    if (!kuva) return;
    function piirraViivat() {
      const ol = kuva.querySelector("ol");
      const svg = kuva.querySelector(".jarjestelma-viivat");
      if (!ol || !svg) return;
      const kortit = ol.querySelectorAll(".jarjestelma-kortti");
      if (kortit.length < 4) return;
      const leveys = ol.clientWidth;
      const korkeus = ol.clientHeight;
      svg.setAttribute("viewBox", "0 0 " + leveys + " " + korkeus);
      svg.setAttribute("width", String(leveys));
      svg.setAttribute("height", String(korkeus));
      const pisteet = Array.prototype.map.call(kortit, function (el) {
        return { x: el.offsetLeft + el.offsetWidth / 2, y: el.offsetTop + el.offsetHeight / 2 };
      });
      const parit = [[0, 1], [1, 3], [3, 2], [2, 0]];
      const viivat = svg.querySelectorAll("line");
      const koottu = kuva.classList.contains("on-koottu") || vahennaLiiketta();
      parit.forEach(function (pari, indeksi) {
        const viiva = viivat[indeksi];
        const alku = pisteet[pari[0]];
        const loppu = pisteet[pari[1]];
        if (!viiva || !alku || !loppu) return;
        viiva.setAttribute("x1", String(alku.x));
        viiva.setAttribute("y1", String(alku.y));
        viiva.setAttribute("x2", String(loppu.x));
        viiva.setAttribute("y2", String(loppu.y));
        const pituus = Math.hypot(loppu.x - alku.x, loppu.y - alku.y);
        viiva.style.strokeDasharray = String(pituus);
        viiva.style.strokeDashoffset = koottu ? "0" : String(pituus);
      });
    }
    if (viivaKuuntelija) window.removeEventListener("resize", viivaKuuntelija);
    viivaKuuntelija = piirraViivat;
    window.addEventListener("resize", viivaKuuntelija);
    piirraViivat();
    if (vahennaLiiketta()) {
      kuva.classList.add("on-koottu");
      piirraViivat();
      return;
    }
    window.setTimeout(function () {
      kuva.classList.add("on-koottu");
      kuva.querySelectorAll(".jarjestelma-viivat line").forEach(function (viiva) {
        viiva.style.strokeDashoffset = "0";
      });
    }, 80);
  }

  function alustaPaljastukset() {
    if (liikeTarkkailija) {
      liikeTarkkailija.disconnect();
      liikeTarkkailija = null;
    }
    const kohteet = main.querySelectorAll(".liike");
    if (vahennaLiiketta() || !("IntersectionObserver" in window)) {
      document.documentElement.classList.remove("liike-kaytossa");
      kohteet.forEach(function (el) { el.classList.add("on-nakyvissa"); });
      return;
    }
    document.documentElement.classList.add("liike-kaytossa");
    liikeTarkkailija = new IntersectionObserver(function (merkinnat) {
      merkinnat.forEach(function (merkinta) {
        if (!merkinta.isIntersecting) return;
        merkinta.target.classList.add("on-nakyvissa");
        liikeTarkkailija.unobserve(merkinta.target);
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -5% 0px" });
    kohteet.forEach(function (el) { liikeTarkkailija.observe(el); });
  }

  function alustaNavigointi() {
    if (navTarkkailija) {
      navTarkkailija.disconnect();
      navTarkkailija = null;
    }
    if (!nav) return;
    const linkit = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));
    const osiot = linkit.map(function (linkki) {
      return document.getElementById(linkki.getAttribute("href").slice(1));
    }).filter(Boolean);
    function merkitse(id) {
      linkit.forEach(function (linkki) {
        if (linkki.getAttribute("href") === "#" + id) linkki.setAttribute("aria-current", "true");
        else linkki.removeAttribute("aria-current");
      });
    }
    if (!osiot.length) return;
    if (!("IntersectionObserver" in window)) {
      merkitse(osiot[0].id);
      return;
    }
    const nakyvat = new Map();
    navTarkkailija = new IntersectionObserver(function (merkinnat) {
      merkinnat.forEach(function (merkinta) {
        if (merkinta.isIntersecting) nakyvat.set(merkinta.target.id, merkinta.intersectionRatio);
        else nakyvat.delete(merkinta.target.id);
      });
      let valittu = null;
      let paras = -1;
      osiot.forEach(function (osio) {
        const suhde = nakyvat.get(osio.id);
        if (suhde == null) return;
        if (suhde >= paras) {
          paras = suhde;
          valittu = osio.id;
        }
      });
      if (!valittu) {
        const kohta = window.scrollY + 140;
        osiot.forEach(function (osio) {
          if (osio.offsetTop <= kohta) valittu = osio.id;
        });
      }
      if (valittu) merkitse(valittu);
    }, { rootMargin: "-18% 0px -45% 0px", threshold: [0.1, 0.25, 0.5, 0.75] });
    osiot.forEach(function (osio) { navTarkkailija.observe(osio); });
    merkitse(osiot[0].id);
  }

  function alustaKopiointi() {
    const nappiKopio = document.getElementById("kopioi-sahkoposti");
    const tila = document.getElementById("kopioi-tila");
    if (!nappiKopio || !tila) return;
    const osoite = data.yhteys.sahkoposti;
    nappiKopio.addEventListener("click", function () {
      function nayta(viesti) {
        tila.textContent = "";
        window.setTimeout(function () { tila.textContent = viesti; }, 30);
      }
      function varalla() {
        const kentta = document.createElement("textarea");
        kentta.value = osoite;
        kentta.setAttribute("readonly", "");
        kentta.style.position = "fixed";
        kentta.style.top = "0";
        kentta.style.left = "0";
        kentta.style.opacity = "0";
        document.body.appendChild(kentta);
        kentta.focus();
        kentta.select();
        let ok = false;
        try { ok = document.execCommand("copy"); } catch (virhe) { ok = false; }
        document.body.removeChild(kentta);
        nappiKopio.focus();
        return ok;
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(osoite).then(function () {
          nayta(data.contact.kopioitu);
        }).catch(function () {
          nayta(varalla() ? data.contact.kopioitu : data.contact.kopioEi);
        });
      } else {
        nayta(varalla() ? data.contact.kopioitu : data.contact.kopioEi);
      }
    });
  }

  function rakennaSivu() {
    suljeDialogi(false);
    data = juuri.kielet[kieli];
    paivitaKieli();
    main.innerHTML = hero() + johtaminen() + myynti() + teknologia() + kokemus() + tausta() + yhteys();
    rakennaNav();
    rakennaFooter();
    sidoAvaukset();
    alustaDemo();
    alustaJarjestelma();
    alustaPaljastukset();
    alustaNavigointi();
    alustaKopiointi();
    if (window.alustaKeskustelu) window.alustaKeskustelu(data.keskustelu || {});
  }

  function vaihdaKieli(uusi) {
    if ((uusi !== "fi" && uusi !== "en") || uusi === kieli) return;
    const y = window.scrollY;
    try { window.localStorage.setItem("kieli", uusi); } catch (virhe) {}
    kieli = uusi;
    rakennaSivu();
    window.scrollTo(0, y);
  }

  document.addEventListener("keydown", function (tapahtuma) {
    const dialogi = document.getElementById("tyon-dialogi");
    if (!dialogi || dialogi.hidden) return;
    if (tapahtuma.key === "Escape") {
      tapahtuma.preventDefault();
      tapahtuma.stopImmediatePropagation();
      suljeDialogi(true);
      return;
    }
    if (tapahtuma.key !== "Tab") return;
    const kohteet = Array.prototype.slice.call(
      dialogi.querySelectorAll("button, a[href]")
    ).filter(function (el) { return !el.disabled && !el.hidden; });
    if (!kohteet.length) return;
    const eka = kohteet[0];
    const vika = kohteet[kohteet.length - 1];
    if (tapahtuma.shiftKey && document.activeElement === eka) {
      tapahtuma.preventDefault();
      tapahtuma.stopImmediatePropagation();
      vika.focus();
    } else if (!tapahtuma.shiftKey && document.activeElement === vika) {
      tapahtuma.preventDefault();
      tapahtuma.stopImmediatePropagation();
      eka.focus();
    }
  });

  const ryhma = document.getElementById("kieli");
  if (ryhma) {
    ryhma.addEventListener("click", function (tapahtuma) {
      const nappiKieli = tapahtuma.target.closest("button[data-kieli]");
      if (nappiKieli) vaihdaKieli(nappiKieli.getAttribute("data-kieli"));
    });
  }
  if (nappi && nav) {
    nappi.addEventListener("click", function () {
      valikkoAuki = !valikkoAuki;
      document.body.classList.toggle("valikko-auki", valikkoAuki);
      nav.classList.toggle("on-auki", valikkoAuki);
      nappi.setAttribute("aria-expanded", valikkoAuki ? "true" : "false");
      paivitaKieli();
    });
    nav.addEventListener("click", function (tapahtuma) {
      if (tapahtuma.target.closest("a") && valikkoMq.matches) {
        valikkoAuki = false;
        document.body.classList.remove("valikko-auki");
        nav.classList.remove("on-auki");
        nappi.setAttribute("aria-expanded", "false");
        const valikkoTeksti = nappi.querySelector(".valikko-teksti");
        if (valikkoTeksti) valikkoTeksti.textContent = data.ui.avaaValikko;
        nappi.setAttribute("aria-label", data.ui.avaaValikko);
      }
    });
  }

  varmistaDialogi();
  rakennaSivu();
})();
