(function () {
  const MAX = 500;
  const MUISTI = 16;
  const AIKARAJA = 30000;
  const TERVEHDYS_AVAIN = "joakim-ai-tervehdys";
  let historia = [];
  let ohjain = null;
  let auki = false;
  let historiaMerkki = false;
  let sulkuLukko = 0;
  let tekstit = {};
  let juuri = null;
  let paneeli = null;
  let loki = null;
  let kentta = null;
  let lahetaNappi = null;
  let maara = null;
  let ehdotukset = null;
  let avain = null;
  let tervehdys = null;
  let sidottu = false;

  function osoite() {
    const arvo = window.JOAKIM_AI_ENDPOINT;
    if (typeof arvo !== "string" || !arvo.trim()) return "";
    try {
      const url = new URL(arvo.trim());
      if (url.protocol !== "https:" && url.protocol !== "http:") return "";
      return url.href;
    } catch (virhe) {
      return "";
    }
  }

  function rajaa() {
    while (historia.length > MUISTI) historia.shift();
  }

  function linkedin() {
    const kielet = window.SIVUN_SISALTO && window.SIVUN_SISALTO.kielet;
    const kieli = document.documentElement.lang === "en" ? "en" : "fi";
    const sivu = kielet && (kielet[kieli] || kielet.fi);
    const yhteys = sivu && sivu.yhteys && sivu.yhteys.linkedin;
    return yhteys && yhteys.osoite ? yhteys.osoite : "https://www.linkedin.com/in/joakim-rydenfelt";
  }

  function sivunJuuri() {
    const polku = window.location.pathname;
    const ratkaisu = polku.indexOf("/ratkaisut/");
    if (ratkaisu !== -1) return polku.slice(0, ratkaisu + 1);
    if (polku.indexOf("/portfolio/") === 0) return "/portfolio/";
    return "/";
  }

  function jrPolku() {
    const kuva = document.querySelector(".jr-merkki");
    if (kuva && kuva.getAttribute("src")) return kuva.getAttribute("src");
    return sivunJuuri() + "assets/jr.svg";
  }

  function tervehdysKiinni() {
    try {
      return window.sessionStorage.getItem(TERVEHDYS_AVAIN) === "1";
    } catch (virhe) {
      return false;
    }
  }

  function piilotaTervehdys() {
    if (!tervehdys) return;
    tervehdys.hidden = true;
    try {
      window.sessionStorage.setItem(TERVEHDYS_AVAIN, "1");
    } catch (virhe) {}
  }

  function el(tag, luokka, teksti) {
    const solmu = document.createElement(tag);
    if (luokka) solmu.className = luokka;
    if (teksti) solmu.textContent = teksti;
    return solmu;
  }

  function kupla(rooli, teksti) {
    const art = el("article", "ai-viesti " + (rooli === "user" ? "ai-oma" : "ai-vastaus"));
    const kuka = el("p", "ai-kuka", rooli === "user" ? tekstit.sina || "" : tekstit.joakim || "");
    const sisalto = el("p", "ai-sisalto", teksti);
    art.append(kuka, sisalto);
    return art;
  }

  function piirra() {
    if (!loki) return;
    loki.replaceChildren();
    historia.forEach(function (viesti) {
      loki.appendChild(kupla(viesti.role, viesti.content));
    });
    if (ehdotukset) ehdotukset.hidden = historia.length > 0;
    loki.scrollTop = loki.scrollHeight;
  }

  function kirjoitus() {
    const rivi = el("div", "ai-kirjoittaa");
    rivi.append(el("span", "sr-only", tekstit.kirjoittaa || ""));
    const pisteet = el("span", "ai-pisteet");
    pisteet.setAttribute("aria-hidden", "true");
    pisteet.append(document.createElement("i"), document.createElement("i"), document.createElement("i"));
    rivi.append(pisteet);
    return rivi;
  }

  function asetaKesken(paalla) {
    if (kentta) kentta.disabled = paalla;
    if (lahetaNappi) lahetaNappi.disabled = paalla;
    if (ehdotukset) {
      ehdotukset.querySelectorAll("button").forEach(function (nappi) {
        nappi.disabled = paalla;
      });
    }
    if (loki) loki.setAttribute("aria-busy", paalla ? "true" : "false");
  }

  function naytaVirhe() {
    const huomio = el("p", "ai-huomio", tekstit.virhe || "");
    loki.appendChild(huomio);
    loki.scrollTop = loki.scrollHeight;
  }

  function paivitaLaskuri() {
    if (maara && kentta) maara.textContent = String(kentta.value.length);
  }

  function mobiili() {
    return window.matchMedia("(max-width: 720px), (max-height: 520px)").matches;
  }

  function nollaaSovitus() {
    if (!paneeli) return;
    paneeli.style.top = "";
    paneeli.style.right = "";
    paneeli.style.bottom = "";
    paneeli.style.left = "";
    paneeli.style.width = "";
    paneeli.style.height = "";
  }

  function sovitaNakyma() {
    if (!paneeli) return;
    const koko = auki && mobiili();
    document.body.classList.toggle("ai-auki", koko);
    if (auki) paneeli.setAttribute("aria-modal", koko ? "true" : "false");
    if (!koko || !window.visualViewport) {
      nollaaSovitus();
      return;
    }
    const nakyma = window.visualViewport;
    paneeli.style.left = Math.max(0, Math.round(nakyma.offsetLeft)) + "px";
    paneeli.style.top = Math.max(0, Math.round(nakyma.offsetTop)) + "px";
    paneeli.style.right = "auto";
    paneeli.style.bottom = "auto";
    paneeli.style.width = Math.max(0, Math.round(nakyma.width)) + "px";
    paneeli.style.height = Math.max(0, Math.round(nakyma.height)) + "px";
  }

  function kohteet() {
    if (!paneeli) return [];
    return Array.from(paneeli.querySelectorAll("a, button, textarea")).filter(function (el) {
      return !el.disabled && !el.closest("[hidden]");
    });
  }

  function asetaAuki(seuraava) {
    auki = seuraava;
    juuri.classList.toggle("on-auki", auki);
    paneeli.inert = !auki;
    paneeli.setAttribute("aria-hidden", auki ? "false" : "true");
    paneeli.setAttribute("aria-modal", auki && mobiili() ? "true" : "false");
    avain.setAttribute("aria-expanded", auki ? "true" : "false");
    avain.setAttribute("aria-label", auki ? tekstit.sulje || "" : tekstit.avaa || "");
    document.body.classList.toggle("ai-auki", auki && mobiili());
    if (auki) piilotaTervehdys();
    sovitaNakyma();
  }

  function avaa() {
    asetaAuki(true);
    if (mobiili() && !historiaMerkki) {
      try {
        history.pushState({ joakimAi: 1 }, "");
        historiaMerkki = true;
      } catch (virhe) {}
    }
    window.setTimeout(function () {
      const kohde = kentta && !kentta.disabled ? kentta : paneeli.querySelector(".ai-sulje");
      if (kohde) kohde.focus();
    }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 220);
  }

  function sulje() {
    const nyt = Date.now();
    if (nyt - sulkuLukko < 400) return;
    sulkuLukko = nyt;
    const takaisin = historiaMerkki;
    historiaMerkki = false;
    asetaAuki(false);
    if (kentta && document.activeElement === kentta) kentta.blur();
    if (avain && document.activeElement && paneeli.contains(document.activeElement)) {
      avain.focus({ preventScroll: true });
    }
    const suoja = document.createElement("div");
    suoja.setAttribute("aria-hidden", "true");
    suoja.style.cssText = "position:fixed;top:0;right:0;width:7.5rem;height:5.5rem;z-index:80;background:transparent;";
    document.body.appendChild(suoja);
    window.setTimeout(function () {
      suoja.remove();
    }, 450);
    if (takaisin) {
      window.setTimeout(function () {
        try {
          history.back();
        } catch (virhe) {}
      }, 0);
    }
  }

  async function lueVirta(vastaus, sisalto) {
    const lukija = vastaus.body.getReader();
    const purku = new TextDecoder();
    let puskuri = "";
    let saatu = "";
    while (true) {
      const era = await lukija.read();
      if (era.done) break;
      puskuri += purku.decode(era.value, { stream: true });
      const rivit = puskuri.split("\n");
      puskuri = rivit.pop();
      rivit.forEach(function (rivi) {
        const siisti = rivi.trim();
        if (siisti.indexOf("data:") !== 0) return;
        const data = siisti.slice(5).trim();
        if (!data || data === "[DONE]") return;
        try {
          const json = JSON.parse(data);
          const choice = json.choices && json.choices[0];
          const pala =
            choice &&
            ((choice.delta && choice.delta.content) || (choice.message && choice.message.content));
          if (typeof pala !== "string" || !pala) return;
          saatu = (saatu + pala).slice(0, 2000);
          sisalto.textContent = saatu;
          loki.scrollTop = loki.scrollHeight;
        } catch (virhe) {}
      });
    }
    return saatu.trim();
  }

  async function laheta(raaka) {
    if (!osoite() || !auki) {
      if (!auki) avaa();
    }
    if (!osoite()) return false;
    const viesti = String(raaka || "").trim();
    if (!viesti || viesti.length > MAX || ohjain) return false;
    if (kentta.value.trim() === viesti) {
      kentta.value = "";
      paivitaLaskuri();
    }
    historia.push({ role: "user", content: viesti });
    rajaa();
    piirra();
    const merkki = kirjoitus();
    loki.appendChild(merkki);
    asetaKesken(true);
    const kontrolleri = new AbortController();
    ohjain = kontrolleri;
    const ajastin = window.setTimeout(function () {
      kontrolleri.abort();
    }, AIKARAJA);
    let saatu = "";
    try {
      const vastaus = await fetch(osoite(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: historia.slice(-MUISTI), stream: true }),
        signal: kontrolleri.signal,
      });
      if (!vastaus.ok) throw { name: "Http" };
      const tyyppi = (vastaus.headers.get("content-type") || "").toLowerCase();
      merkki.remove();
      const art = kupla("assistant", "");
      const sisalto = art.querySelector(".ai-sisalto");
      loki.appendChild(art);
      if (tyyppi.indexOf("text/event-stream") !== -1 && vastaus.body) {
        saatu = await lueVirta(vastaus, sisalto);
      } else {
        const json = await vastaus.json();
        const choice = json && json.choices && json.choices[0];
        const teksti = choice && choice.message && choice.message.content;
        saatu = typeof teksti === "string" ? teksti.trim().slice(0, 2000) : "";
        sisalto.textContent = saatu;
      }
      if (!saatu) {
        art.remove();
        naytaVirhe();
        return false;
      }
      historia.push({ role: "assistant", content: saatu });
      rajaa();
      return true;
    } catch (virhe) {
      if (merkki.isConnected) merkki.remove();
      if (!virhe || virhe.name === "TypeError" || virhe.name === "AbortError") {
        paneeli.setAttribute("data-tila", "odotus");
        return false;
      }
      naytaVirhe();
      return false;
    } finally {
      window.clearTimeout(ajastin);
      if (ohjain === kontrolleri) ohjain = null;
      asetaKesken(false);
    }
  }

  function rakennaEhdotukset() {
    ehdotukset.replaceChildren();
    (tekstit.ehdotukset || []).filter(Boolean).forEach(function (teksti) {
      const nappi = el("button", "ai-ehdotus", teksti);
      nappi.type = "button";
      ehdotukset.appendChild(nappi);
    });
    ehdotukset.hidden = historia.length > 0;
  }

  function paivitaTekstit() {
    avain.setAttribute("aria-label", auki ? tekstit.sulje || "" : tekstit.avaa || "");
    paneeli.querySelector(".ai-nimi").textContent = tekstit.nimi || "Joakim";
    paneeli.querySelector(".ai-tila").textContent = tekstit.tila || "";
    paneeli.querySelector(".ai-merkinta").textContent = tekstit.merkinta || "";
    paneeli.querySelector(".ai-sulje").setAttribute("aria-label", tekstit.sulje || "");
    paneeli.querySelector(".ai-odotus-teksti").textContent = tekstit.avautuu || "";
    const linkki = paneeli.querySelector(".ai-odotus-linkki");
    linkki.textContent = tekstit.linkedin || "";
    linkki.href = linkedin();
    paneeli.querySelector(".ai-syote-label").textContent = tekstit.syote || "";
    kentta.setAttribute("aria-label", tekstit.syote || "");
    lahetaNappi.textContent = tekstit.laheta || "";
    paneeli.querySelector(".ai-tietosuoja").textContent = tekstit.tietosuoja || "";
    loki.setAttribute("aria-label", tekstit.loki || "");
    tervehdys.querySelector(".ai-tervehdys-teksti").textContent = tekstit.tervehdys || "";
    tervehdys.querySelector(".ai-tervehdys-sulje").setAttribute("aria-label", tekstit.tervehdysSulje || "");
    rakennaEhdotukset();
    if (!ohjain) piirra();
    paneeli.setAttribute("data-tila", osoite() ? "kaynti" : "odotus");
  }

  function rakenna() {
    juuri = el("div", "ai-widget");
    tervehdys = el("div", "ai-tervehdys");
    tervehdys.append(el("p", "ai-tervehdys-teksti"));
    const tervehdysSulje = el("button", "ai-tervehdys-sulje", "×");
    tervehdysSulje.type = "button";
    tervehdys.append(tervehdysSulje);
    tervehdys.hidden = tervehdysKiinni();

    avain = el("button", "ai-avain");
    avain.type = "button";
    avain.setAttribute("aria-expanded", "false");
    avain.setAttribute("aria-controls", "ai-paneeli");
    avain.setAttribute("aria-haspopup", "dialog");
    avain.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 6.5h14a1.5 1.5 0 0 1 1.5 1.5v7A1.5 1.5 0 0 1 19 16.5H9.2L5.5 19.2v-2.7H5A1.5 1.5 0 0 1 3.5 15V8A1.5 1.5 0 0 1 5 6.5Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>';

    paneeli = el("div", "ai-paneeli");
    paneeli.id = "ai-paneeli";
    paneeli.setAttribute("role", "dialog");
    paneeli.setAttribute("aria-labelledby", "ai-otsikko");
    paneeli.setAttribute("aria-hidden", "true");
    paneeli.inert = true;

    const paa = el("div", "ai-paa");
    const merkki = document.createElement("img");
    merkki.className = "ai-jr";
    merkki.alt = "";
    merkki.width = 36;
    merkki.height = 22;
    merkki.src = jrPolku();
    const otsake = el("div", "ai-otsake");
    const nimi = el("h2", "ai-nimi");
    nimi.id = "ai-otsikko";
    otsake.append(nimi, el("p", "ai-tila"));
    const suljeNappi = el("button", "ai-sulje");
    suljeNappi.type = "button";
    suljeNappi.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
    paa.append(merkki, otsake, suljeNappi);

    const odotus = el("div", "ai-odotus");
    odotus.append(el("p", "ai-odotus-teksti"));
    const linkki = el("a", "nappi nappi-ensisijainen ai-odotus-linkki");
    linkki.target = "_blank";
    linkki.rel = "noopener noreferrer";
    odotus.append(linkki);

    ehdotukset = el("div", "ai-ehdotukset");
    loki = el("div", "ai-loki");
    loki.setAttribute("role", "log");
    loki.setAttribute("aria-live", "polite");
    loki.setAttribute("aria-relevant", "additions");

    const lomake = el("form", "ai-lomake");
    const label = el("label", "sr-only ai-syote-label");
    label.htmlFor = "ai-syote";
    const rivi = el("div", "ai-rivi");
    kentta = document.createElement("textarea");
    kentta.id = "ai-syote";
    kentta.rows = 2;
    kentta.maxLength = MAX;
    kentta.setAttribute("enterkeyhint", "send");
    kentta.autocomplete = "off";
    lahetaNappi = el("button", "nappi nappi-ensisijainen ai-laheta");
    lahetaNappi.type = "submit";
    rivi.append(kentta, lahetaNappi);
    const laskuri = el("p", "ai-laskuri");
    maara = el("span", "ai-maara", "0");
    laskuri.append(maara, document.createTextNode(" / 500"));
    lomake.append(label, rivi, laskuri);

    const kaynti = el("div", "ai-kaynti");
    kaynti.append(ehdotukset, loki, lomake);
    paneeli.append(paa, el("p", "ai-merkinta"), odotus, kaynti, el("p", "ai-tietosuoja"));
    juuri.append(tervehdys, paneeli, avain);
    document.body.appendChild(juuri);

    avain.addEventListener("click", function () {
      if (auki) sulje();
      else avaa();
    });
    function suljeNapista(tapahtuma) {
      if (tapahtuma.type === "touchstart" || tapahtuma.type === "pointerdown") {
        tapahtuma.preventDefault();
      }
      tapahtuma.stopPropagation();
      sulje();
    }
    ["pointerdown", "pointerup", "touchstart", "touchend", "click"].forEach(function (nimi) {
      suljeNappi.addEventListener(nimi, suljeNapista, { passive: false });
    });
    tervehdysSulje.addEventListener("click", piilotaTervehdys);
    lomake.addEventListener("submit", function (tapahtuma) {
      tapahtuma.preventDefault();
      laheta(kentta.value);
    });
    kentta.addEventListener("keydown", function (tapahtuma) {
      if (tapahtuma.key !== "Enter" || tapahtuma.shiftKey || tapahtuma.isComposing) return;
      tapahtuma.preventDefault();
      if (typeof lomake.requestSubmit === "function") lomake.requestSubmit();
      else lomake.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
    });
    kentta.addEventListener("input", paivitaLaskuri);
    ehdotukset.addEventListener("click", function (tapahtuma) {
      const nappi = tapahtuma.target.closest(".ai-ehdotus");
      if (nappi) laheta(nappi.textContent);
    });
  }

  function sido() {
    if (sidottu) return;
    sidottu = true;
    document.addEventListener("keydown", function (tapahtuma) {
      if (!auki) return;
      if (tapahtuma.key === "Escape" && !document.body.classList.contains("valikko-auki")) {
        tapahtuma.preventDefault();
        sulje();
        return;
      }
      if (tapahtuma.key !== "Tab" || !mobiili()) return;
      const lista = kohteet();
      if (!lista.length) return;
      const eka = lista[0];
      const vika = lista[lista.length - 1];
      if (tapahtuma.shiftKey && document.activeElement === eka) {
        tapahtuma.preventDefault();
        vika.focus();
      } else if (!tapahtuma.shiftKey && document.activeElement === vika) {
        tapahtuma.preventDefault();
        eka.focus();
      }
    });
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", sovitaNakyma);
      window.visualViewport.addEventListener("scroll", sovitaNakyma);
    }
    window.addEventListener("resize", sovitaNakyma);
    window.addEventListener("popstate", function () {
      if (!auki) return;
      historiaMerkki = false;
      sulkuLukko = Date.now();
      asetaAuki(false);
    });
  }

  window.avaaKeskustelu = function () {
    if (!juuri) return;
    avaa();
  };

  window.alustaKeskustelu = function (uudet) {
    tekstit = uudet || {};
    if (!juuri) {
      rakenna();
      sido();
    }
    paivitaTekstit();
  };
})();
