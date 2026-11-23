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
  let silmukkaAjastin = null;

  function esc(arvo) {
    return String(arvo == null ? "" : arvo).replace(/[&<>"']/g, function (merkki) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[merkki];
    });
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

  function hero() {
    const h = data.hero;
    const silmukka = (h.silmukka || []).map(function (rivi) {
      return '<li class="silmukka-rivi' + (rivi.aksentti ? " on-aksentti" : "") + '">' +
        '<span class="silmukka-nro">' + esc(rivi.nro) + "</span>" +
        "<div><p class=\"silmukka-nimi\">" + esc(rivi.nimi) + "</p>" +
        '<p class="silmukka-teksti">' + esc(rivi.teksti) + "</p></div></li>";
    }).join("");
    const todisteet = (h.todisteet || []).map(function (kohta) {
      return "<li><p class=\"todiste-iso\">" + esc(kohta.iso) + "</p>" +
        "<p class=\"todiste-rivi\">" + esc(kohta.rivi) + "</p>" +
        "<p class=\"todiste-ala\">" + esc(kohta.ala) + "</p></li>";
    }).join("");
    return (
      '<section class="hero" id="alku">' +
      '<div class="hero-sisus">' +
      "<div>" +
      '<p class="silma">' + esc(h.ylateksti) + "</p>" +
      "<h1>" + esc(h.rivi1) + "<br>" + esc(h.rivi2) + "</h1>" +
      '<p class="tagline">' + esc(h.tagline) + "</p>" +
      '<p class="lead">' + esc(h.ingressi) + "</p>" +
      '<div class="hero-napit">' +
      ulkoinen(data.yhteys.linkedin.osoite, h.linkedinNappi, "nappi") +
      '<a class="tekstilinkki" href="#work">' + esc(h.selaaNappi) + ' <span aria-hidden="true">↓</span></a>' +
      "</div>" +
      '<p class="allekirjoitus">' + esc(h.allekirjoitus) + "</p>" +
      "</div>" +
      '<div class="silmukka" aria-label="' + esc(h.silmukkaOtsikko) + '">' +
      '<div class="silmukka-paa"><p>' + esc(h.silmukkaOtsikko) + "</p><p>" + esc(h.silmukkaAlue) + "</p></div>" +
      "<ol>" + silmukka + "</ol>" +
      '<p class="silmukka-ala">↳ ' + esc(h.silmukkaAla) + " ↗</p>" +
      "</div></div>" +
      '<ul class="todisteet">' + todisteet + "</ul></section>"
    );
  }

  function osioPaa(id, numero, silma, otsikko, johdanto, kaksi) {
    const otsake = kaksi
      ? "<h2>" + esc(otsikko[0]) + "<br>" + esc(otsikko[1]) + "</h2>"
      : "<h2>" + esc(otsikko) + "</h2>";
    return (
      '<section class="osio" id="' + id + '">' +
      '<div class="osio-paa">' +
      '<p class="silma">' + esc(numero) + " / " + esc(silma) + "</p>" +
      otsake +
      (johdanto ? '<p class="osio-johdanto">' + esc(johdanto) + "</p>" : "") +
      "</div>"
    );
  }

  function mindset() {
    const osio = data.mindset;
    const kortit = (osio.kohdat || []).map(function (kohta) {
      return "<li><p class=\"silma\">" + esc(kohta.nro) + " / " + esc(kohta.silma) + "</p>" +
        "<h3>" + esc(kohta.otsikko) + "</h3><p>" + esc(kohta.teksti) + "</p></li>";
    }).join("");
    return osioPaa("mindset", osio.numero, osio.silma, osio.otsikko, osio.johdanto, false) +
      '<ul class="nelikko">' + kortit + "</ul></section>";
  }

  function tyolinkki(href, teksti, ulko) {
    if (ulko) return ulkoinen(href, teksti, "tekstilinkki aksentti");
    return '<a class="tekstilinkki aksentti" href="' + esc(href) + '">' + esc(teksti) + nuoli() + "</a>";
  }

  function work() {
    const osio = data.work;
    const rivit = (osio.kohdat || []).map(function (kohta) {
      const tagit = (kohta.tagit || []).map(function (tagi) {
        return "<li>" + esc(tagi) + "</li>";
      }).join("");
      let esikatselu = '<p class="silma">' + esc(kohta.esikatselu) + "</p>";
      if (kohta.esikatseluIso) {
        esikatselu += '<p class="esikatselu-iso">' + esc(kohta.esikatseluIso).replace(" ", "<br>") + "</p>";
      }
      if (kohta.kupla) esikatselu += '<p class="esikatselu-kupla">' + esc(kohta.kupla) + "</p>";
      if (kohta.polku) esikatselu += '<p class="esikatselu-polku">' + esc(kohta.polku) + "</p>";
      if (kohta.polkuAla) esikatselu += '<p class="esikatselu-polku aksentti">' + esc(kohta.polkuAla) + "</p>";
      let linkit = "";
      if (kohta.avaa) {
        linkit += '<button type="button" class="tekstilinkki aksentti avaa-chat">' + esc(kohta.linkinTeksti) + nuoli() + "</button>";
      } else if (kohta.linkki) {
        linkit += tyolinkki(kohta.linkki, kohta.linkinTeksti, false);
      }
      if (kohta.sivu) linkit += tyolinkki(kohta.sivu, kohta.sivuTeksti, false);
      if (kohta.lahde) linkit += tyolinkki(kohta.lahde, kohta.lahdeTeksti, true);
      return (
        '<article class="tyo">' +
        '<div class="esikatselu">' + esikatselu + "</div>" +
        "<div><h3>" + esc(kohta.nimi) + "</h3><p>" + esc(kohta.teksti) + "</p>" +
        '<ul class="tagit">' + tagit + "</ul>" +
        '<p class="tyo-linkit">' + linkit + "</p></div></article>"
      );
    }).join("");
    return osioPaa("work", osio.numero, osio.silma, osio.otsikko, osio.johdanto, false) + rivit + "</section>";
  }

  function business() {
    const osio = data.business;
    let nro = 0;
    const sarakkeet = (osio.vaiheet || []).map(function (sarake) {
      const rivit = (sarake.kohdat || []).map(function (nimi) {
        nro += 1;
        return '<li class="paljasta" style="--viive:' + (nro * 40) + 'ms"><span>' +
          String(nro).padStart(2, "0") + "</span>" + esc(nimi) + "</li>";
      }).join("");
      return "<div><p class=\"silma\">" + esc(sarake.silma) + "</p><ol>" + rivit + "</ol></div>";
    }).join("");
    return osioPaa("business", osio.numero, osio.silma, [osio.otsikko1, osio.otsikko2], osio.johdanto, true) +
      '<div class="vaiheet">' + sarakkeet + "</div>" +
      '<div class="vaihe-ala"><p>' + esc(osio.huom) + "</p><p class=\"aksentti\">" + esc(osio.ala) + " ↗</p></div></section>";
  }

  function experience() {
    const osio = data.experience;
    const rivit = (osio.rivit || []).map(function (rivi) {
      return '<li class="paljasta"><span class="vuosi">' + esc(rivi.vuosi) + "</span>" +
        "<div><p class=\"tyonantaja\">" + esc(rivi.tyonantaja) + "</p>" +
        '<p class="rooli">' + esc(rivi.rooli) + "</p></div>" +
        "<p>" + esc(rivi.teksti) + "</p></li>";
    }).join("");
    return osioPaa("experience", osio.numero, osio.silma, [osio.otsikko1, osio.otsikko2], "", true) +
      '<ul class="kokemus">' + rivit + "</ul></section>";
  }

  function beyond() {
    const osio = data.beyond;
    const kortit = (osio.kohdat || []).map(function (kohta) {
      return "<li><p class=\"silma\">" + esc(kohta.silma) + "</p><h3>" + esc(kohta.otsikko) +
        "</h3><p>" + esc(kohta.teksti) + "</p></li>";
    }).join("");
    return osioPaa("beyond", osio.numero, osio.silma, osio.otsikko, "", false) +
      '<ul class="nelikko">' + kortit + "</ul>" +
      '<p class="huom">' + esc(osio.huom) + "</p></section>";
  }

  function contact() {
    const osio = data.contact;
    return (
      '<section class="yhteys" id="contact">' +
      "<div><p class=\"silma\">" + esc(osio.numero) + " / " + esc(osio.silma) + "</p>" +
      "<h2>" + esc(osio.otsikko1) + "<br>" + esc(osio.otsikko2) + "</h2>" +
      "<p>" + esc(osio.johdanto) + "</p></div>" +
      "<div class=\"yhteys-oikea\">" +
      ulkoinen(data.yhteys.linkedin.osoite, osio.nappi, "yhteys-nappi") +
      "<p class=\"kahva\">" + esc(osio.kahva) + "</p></div></section>"
    );
  }

  function rakennaNav() {
    if (!nav) return;
    nav.setAttribute("aria-label", data.ui.navAria);
    nav.innerHTML = (data.navigointi || []).map(function (kohta) {
      return '<a href="#' + esc(kohta.id) + '">' + esc(kohta.teksti) + "</a>";
    }).join("") + '<a class="puhutaan-mobiili" href="#contact">' + esc(data.puhutaan) + " ↗</a>";
    if (puhutaan) puhutaan.textContent = data.puhutaan;
  }

  function rakennaFooter() {
    if (!footer) return;
    footer.innerHTML =
      "<p>Joakim Rydenfelt</p><p>" + esc(data.footer.rivi) + "</p>" +
      ulkoinen(data.yhteys.github.osoite, data.footer.github, "alatunniste-linkki");
  }

  function paivitaKieli() {
    document.documentElement.lang = kieli === "en" ? "en" : "fi";
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
  }

  function alustaSilmukka() {
    if (silmukkaAjastin) window.clearInterval(silmukkaAjastin);
    const rivit = main.querySelectorAll(".silmukka-rivi");
    if (!rivit.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0;
    function nayta() {
      rivit.forEach(function (rivi, indeksi) {
        rivi.classList.toggle("on-aktiivinen", indeksi === i);
      });
      i = (i + 1) % rivit.length;
    }
    nayta();
    silmukkaAjastin = window.setInterval(nayta, 2400);
  }

  function alustaPaljastukset() {
    const kohteet = main.querySelectorAll(".paljasta");
    const vahenna = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (vahenna || !("IntersectionObserver" in window)) {
      kohteet.forEach(function (el) { el.classList.add("on-nakyvissa"); });
      return;
    }
    const tarkkailija = new IntersectionObserver(function (merkinnat) {
      merkinnat.forEach(function (merkinta) {
        if (!merkinta.isIntersecting) return;
        merkinta.target.classList.add("on-nakyvissa");
        tarkkailija.unobserve(merkinta.target);
      });
    }, { threshold: 0.4 });
    kohteet.forEach(function (el) { tarkkailija.observe(el); });
  }

  function rakennaSivu() {
    data = juuri.kielet[kieli];
    document.title = "Joakim Rydenfelt";
    paivitaKieli();
    main.innerHTML = hero() + mindset() + work() + business() + experience() + beyond() + contact();
    rakennaNav();
    rakennaFooter();
    sidoAvaukset();
    alustaSilmukka();
    alustaPaljastukset();
    if (window.alustaKeskustelu) window.alustaKeskustelu(data.keskustelu || {});
  }

  function vaihdaKieli(uusi) {
    if (uusi !== "fi" && uusi !== "en" || uusi === kieli) return;
    const y = window.scrollY;
    try { window.localStorage.setItem("kieli", uusi); } catch (virhe) {}
    kieli = uusi;
    rakennaSivu();
    window.scrollTo(0, y);
  }

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
      }
    });
  }

  rakennaSivu();
})();
