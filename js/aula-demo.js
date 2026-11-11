(function (root) {
  var AULA_DEMO_CSS = ":host {\n  display: block;\n  box-sizing: border-box;\n  width: 100%;\n  max-width: 100%;\n  margin: 0;\n  position: static;\n  color: #f4ead8;\n  background: #10151a;\n  border: 1px solid rgba(196, 137, 74, 0.5);\n  border-radius: 18px;\n  padding: 1.25rem;\n  font-family: inherit;\n  font-size: 1rem;\n  line-height: 1.5;\n  box-shadow:\n    0 0 0 1px rgba(94, 200, 192, 0.1),\n    0 8px 18px rgba(0, 0, 0, 0.18);\n}\n\n* {\n  box-sizing: border-box;\n}\n\n.aula-demo-yla {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem 0.75rem;\n  align-items: baseline;\n  justify-content: space-between;\n}\n\n.aula-demo-otsikko {\n  margin: 0;\n  font-family: Palatino, \"Palatino Linotype\", \"Iowan Old Style\", Georgia, serif;\n  font-size: 1.7rem;\n  font-weight: 600;\n  letter-spacing: -0.02em;\n  line-height: 1.15;\n  color: #f7f1e4;\n}\n\n.aula-demo-merkki {\n  margin: 0;\n  color: #e0b07a;\n  font-size: 0.78rem;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  text-transform: uppercase;\n}\n\n.aula-demo-ingressi,\n.aula-demo-huomio {\n  margin: 0.75rem 0 0;\n  color: #d9d0c2;\n  font-size: 0.95rem;\n}\n\n.aula-demo-huomio {\n  color: #e4c27a;\n}\n\n.aula-demo-loki {\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n  max-height: 22rem;\n  margin-top: 1rem;\n  overflow: auto;\n  padding-right: 0.15rem;\n  overscroll-behavior: auto;\n}\n\n.aula-demo-viesti {\n  max-width: 100%;\n  padding: 0.75rem 0.85rem;\n  border-radius: 14px;\n  overflow-wrap: anywhere;\n}\n\n.aula-demo-viesti-avustaja {\n  margin-right: 1.5rem;\n  background: #182127;\n  border: 1px solid rgba(94, 200, 192, 0.28);\n}\n\n.aula-demo-viesti-vieras {\n  margin-left: 1.5rem;\n  background: #2a2118;\n  border: 1px solid rgba(196, 137, 74, 0.35);\n}\n\n.aula-demo-rooli {\n  margin: 0 0 0.35rem;\n  color: #e0b07a;\n  font-size: 0.72rem;\n  font-weight: 700;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n}\n\n.aula-demo-teksti {\n  margin: 0;\n  white-space: pre-wrap;\n}\n\n.aula-demo-lahde {\n  margin: 0.45rem 0 0;\n  color: #b7c4c2;\n  font-size: 0.8rem;\n}\n\n.aula-demo-yhteys {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.35rem 0.8rem;\n  margin-top: 0.55rem;\n  font-size: 0.9rem;\n}\n\n.aula-demo-yhteys a {\n  color: #e4c27a;\n}\n\n.aula-demo-ehdotukset {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  max-width: 100%;\n  margin-top: 0.85rem;\n}\n\n.aula-demo-lomake {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 0.5rem;\n  margin-top: 0.85rem;\n}\n\n.aula-demo-kentta {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border: 0;\n}\n\n.aula-demo-syote {\n  flex: 1 1 12rem;\n  min-width: 0;\n  min-height: 44px;\n  padding: 0.55rem 0.75rem;\n  border: 1px solid rgba(244, 234, 216, 0.28);\n  border-radius: 10px;\n  background: #0c1014;\n  color: #f4ead8;\n  font: inherit;\n  font-size: 16px;\n}\n\n.aula-demo-nappi,\n.aula-demo-ehdotus {\n  min-height: 44px;\n  padding: 0.45rem 0.9rem;\n  border: 0;\n  border-radius: 999px;\n  background: #c4894a;\n  color: #1a120c;\n  font: inherit;\n  font-size: 0.95rem;\n  font-weight: 700;\n  cursor: pointer;\n}\n\n.aula-demo-ehdotus {\n  flex: 0 0 auto;\n  background: transparent;\n  color: #f4ead8;\n  border: 1px solid rgba(94, 200, 192, 0.55);\n}\n\n.aula-demo-nappi:disabled,\n.aula-demo-ehdotus:disabled {\n  opacity: 0.55;\n  cursor: not-allowed;\n}\n\n.aula-demo-virhe {\n  margin: 0.6rem 0 0;\n  color: #ffb4a8;\n  font-size: 0.9rem;\n}\n\n:focus-visible {\n  outline: 2px solid #f7f3ea;\n  outline-offset: 2px;\n}\n\n@media (max-width: 640px) {\n  :host {\n    padding: 1rem;\n    border-radius: 14px;\n  }\n\n  .aula-demo-otsikko {\n    font-size: 1.45rem;\n  }\n\n  .aula-demo-viesti-avustaja,\n  .aula-demo-viesti-vieras {\n    margin-left: 0;\n    margin-right: 0;\n  }\n}\n";

  var STOP = {
    miten: 1, mitä: 1, missä: 1, milloin: 1, onko: 1, teillä: 1, teidän: 1,
    tämä: 1, sekä: 1, että: 1, myös: 1, vain: 1, kiitos: 1
  };

  function oletus() {
    return {
      productName: "Aula",
      nameNote: "työnimi",
      businessName: "Pohjolan Hammas",
      industry: "Hammaslääkäri",
      city: "Helsinki",
      sampleData: true,
      greeting:
        "Hei, olen Aula-esimerkin vastaanottoavustaja Pohjolan Hampaalla. Yritys on kuvitteellinen, ja vastaukset ovat simuloituja vain tämän tietopohjan perusteella. Viestiä ei lähetetä eikä tallenneta.",
      profile: {
        summary:
          "Pohjolan Hammas on kuvitteellinen hammaslääkäriasema Helsingissä. Tämä on esimerkkiaineistoa, ei sivuston omistajan palvelua.",
        services:
          "Hammastarkastus, paikkaus ja särkyvastaanotto. Hammasimplantteja ei tehdä.",
        address: "Kalevankatu 12, 00100 Helsinki"
      },
      faqs: [
        {
          q: "Miten varaan ajan?",
          a: "Ajanvaraus onnistuu puhelimitse numerosta 09\u00A0555\u00A00144. Verkkoajanvarausta ei ole, eikä tämä demo tee varausta."
        },
        {
          q: "Mitä tarkastus maksaa?",
          a: "Kuvitteellisessa hinnastossa hammastarkastus on 75\u00A0€. Summa on esimerkkivastaanoton aineistoa, ei Aulan hintaa, eikä sitä laskuteta."
        },
        {
          q: "Missä vastaanotto sijaitsee?",
          a: "Vastaanotto sijaitsee osoitteessa Kalevankatu 12, 00100 Helsinki."
        }
      ],
      contact: {
        email: "vastaanotto@example.com",
        phone: "puhelin vain tekstinä",
        hours: "ma–to 8–18, pe 8–15",
        fallback:
          "Tämä on simuloitu ohjaus. Demoon kirjoitettua viestiä ei lähetetä eikä tallenneta."
      },
      ui: {
        title: "Esimerkki asiakaspalvelusta",
        demoLabel: "Interaktiivinen demo – simuloidut vastaukset",
        reset: "Tyhjennä",
        sampleNote: "Kuvitteellinen esimerkkiaineisto, ei sivuston omistajan lupaus eikä asiakasreferenssi.",
        simulatedNote: "Simuloitu vastaus. Ei live-tekoälyä, ei maksua, ei verkkopyyntöä eikä tallennusta.",
        privacy: "Älä kirjoita henkilötietoja, korttinumeroita tai salasanoja. Kysymys ei lähde tältä sivulta.",
        messageLabel: "Kysymys esimerkkiyritykselle",
        placeholder: "Kysy esimerkkiyritykseltä…",
        send: "Lähetä",
        visitor: "Vierailija",
        greetingBadge: "Asetettu tervehdys",
        answerBadge: "Simuloitu vastaus",
        sourcePrefix: "Lähde: ",
        notAi: "Ei tekoälyn tuottama",
        empty: "Kirjoita viesti.",
        humanLead: "Tämä on simuloitu ohjaus ihmiselle. Oikeaa yhteydenottoa ei tapahdu.",
        fallbackLead: "En löydä tähän vastausta tämän esimerkin tietopohjasta.",
        phone: "Puhelin: ",
        email: "Sähköposti: ",
        hours: "Aukiolo: ",
        humanNote: "Viestiä ei lähetetä eikä tallenneta.",
        greetingSource: "Asetettu tervehdys, ei tekoälyn tuottama",
        humanSource: "Esimerkin yhteystiedot",
        aria: "simuloitu asiakaspalveludemo"
      }
    };
  }

  function liitos(etu, arvo) {
    return [String(etu || "").trim(), String(arvo || "").trim()].filter(Boolean).join(" ");
  }

  function teksti(arvo, raja) {
    if (typeof arvo !== "string") return "";
    var siisti = arvo.replace(/\u0000/g, "").trim();
    if (siisti.length > raja) return siisti.slice(0, raja);
    return siisti;
  }

  function yhdista(pohja, annettu) {
    var tulos = oletus();
    if (!annettu || typeof annettu !== "object") return tulos;
    if (annettu.productName) tulos.productName = teksti(annettu.productName, 40) || tulos.productName;
    if (annettu.nameNote) tulos.nameNote = teksti(annettu.nameNote, 40) || tulos.nameNote;
    if (annettu.businessName) tulos.businessName = teksti(annettu.businessName, 80) || tulos.businessName;
    if (annettu.industry) tulos.industry = teksti(annettu.industry, 80) || tulos.industry;
    if (annettu.city) tulos.city = teksti(annettu.city, 80) || tulos.city;
    if (annettu.greeting) tulos.greeting = teksti(annettu.greeting, 500) || tulos.greeting;
    tulos.sampleData = true;
    if (annettu.profile && typeof annettu.profile === "object") {
      tulos.profile = {
        summary: teksti(annettu.profile.summary, 1000) || tulos.profile.summary,
        services: teksti(annettu.profile.services, 1000) || tulos.profile.services,
        address: teksti(annettu.profile.address, 200) || tulos.profile.address
      };
    }
    if (Array.isArray(annettu.faqs) && annettu.faqs.length) {
      tulos.faqs = annettu.faqs.slice(0, 40).map(function (kohta) {
        return {
          q: teksti(kohta && kohta.q, 200),
          a: teksti(kohta && kohta.a, 2000)
        };
      }).filter(function (kohta) { return kohta.q && kohta.a; });
      if (!tulos.faqs.length) tulos.faqs = oletus().faqs;
    }
    if (annettu.contact && typeof annettu.contact === "object") {
      tulos.contact = {
        email: teksti(annettu.contact.email, 120) || tulos.contact.email,
        phone: teksti(annettu.contact.phone, 40) || tulos.contact.phone,
        hours: teksti(annettu.contact.hours, 200) || tulos.contact.hours,
        fallback: teksti(annettu.contact.fallback, 500) || tulos.contact.fallback
      };
    }
    if (annettu.ui && typeof annettu.ui === "object") {
      var ui = oletus().ui;
      Object.keys(ui).forEach(function (avain) {
        if (Object.prototype.hasOwnProperty.call(annettu.ui, avain)) ui[avain] = teksti(annettu.ui[avain], 400);
      });
      tulos.ui = ui;
    }
    tulos._pohja = pohja;
    return tulos;
  }

  function sanat(arvo) {
    return String(arvo || "")
      .toLocaleLowerCase("fi")
      .replace(/[?!.,:;()"“”]/g, " ")
      .split(/\s+/)
      .map(function (sana) { return sana.replace(/[^a-z0-9äöå-]/g, ""); })
      .filter(function (sana) { return sana.length >= 4 && !STOP[sana]; });
  }

  function osuu(a, b) {
    if (a === b) return true;
    if (a.length < 5 || b.length < 5) return false;
    var n = Math.min(a.length, b.length, 8);
    return a.slice(0, n) === b.slice(0, n);
  }

  function kattavuus(kysymys, dokumentti) {
    if (!kysymys.length) return 0;
    var kohde = sanat(dokumentti);
    var osumat = 0;
    kysymys.forEach(function (sana) {
      if (kohde.some(function (toinen) { return osuu(sana, toinen); })) osumat += 1;
    });
    return osumat / kysymys.length;
  }

  function turvaviesti(config) {
    var ui = config.ui;
    return [
      config.contact.fallback,
      liitos(ui.phone, config.contact.phone),
      liitos(ui.email, config.contact.email),
      liitos(ui.hours, config.contact.hours),
      ui.humanNote
    ].join("\n");
  }

  function vastaa(config, viesti) {
    var configKaytossa = yhdista(null, config);
    var siisti = teksti(viesti, 1000);
    if (!siisti) {
      return {
        ok: false,
        simulated: true,
        sampleData: true,
        kind: "empty",
        text: configKaytossa.ui.empty,
        sourceLabel: null,
        contact: null
      };
    }
    if (/^(hei|moi|terve|moikka|hello|hi|hey)[!.?\s]*$/i.test(siisti)) {
      return {
        ok: true,
        simulated: true,
        sampleData: true,
        kind: "greeting",
        text: configKaytossa.greeting,
        sourceLabel: configKaytossa.ui.greetingSource,
        contact: null
      };
    }
    if (/(ihminen|ihmiselle|asiakaspalvelij|haluan puhua|human|a person|speak to|talk to someone)/i.test(siisti)) {
      return {
        ok: true,
        simulated: true,
        sampleData: true,
        kind: "human",
        text: configKaytossa.ui.humanLead + "\n" + turvaviesti(configKaytossa),
        sourceLabel: configKaytossa.ui.humanSource,
        contact: configKaytossa.contact
      };
    }
    var kysymys = sanat(siisti);
    var paras = null;
    configKaytossa.faqs.forEach(function (kohta) {
      var piste = kattavuus(kysymys, kohta.q) * 3 + kattavuus(kysymys, kohta.a) * 0.65;
      if (!paras || piste > paras.piste) {
        paras = { piste: piste, text: kohta.a, sourceLabel: "UKK: " + kohta.q, kind: "faq" };
      }
    });
    var profiilit = [
      ["Tietopohja: palvelut", "Palvelut: " + configKaytossa.profile.services],
      ["Tietopohja: osoite", "Osoite ja sijainti: " + configKaytossa.profile.address + ", " + configKaytossa.city],
      ["Tietopohja: yrityskuvaus", configKaytossa.profile.summary]
    ];
    profiilit.forEach(function (pari) {
      var piste = kattavuus(kysymys, pari[1]) * 2;
      if (!paras || piste > paras.piste) {
        paras = { piste: piste, text: pari[1], sourceLabel: pari[0], kind: "profile" };
      }
    });
    if (paras && paras.piste >= 1.4) {
      return {
        ok: true,
        simulated: true,
        sampleData: true,
        kind: paras.kind,
        text: paras.text,
        sourceLabel: paras.sourceLabel,
        contact: null
      };
    }
    return {
      ok: true,
      simulated: true,
      sampleData: true,
      kind: "fallback",
      text: configKaytossa.ui.fallbackLead + "\n" + turvaviesti(configKaytossa),
      sourceLabel: null,
      contact: configKaytossa.contact
    };
  }

  function elementti(tag, luokka, tekstiArvo) {
    var solmu = document.createElement(tag);
    if (luokka) solmu.className = luokka;
    if (tekstiArvo != null) solmu.textContent = tekstiArvo;
    return solmu;
  }

  function kelpoSposti(arvo) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(arvo || "");
  }

  function kelpoPuhelin(arvo) {
    return /^[0-9+\-\s()]{5,40}$/.test(arvo || "");
  }

  function lisaaYhteys(vanhempi, contact) {
    if (!contact) return;
    var rivi = elementti("p", "aula-demo-yhteys");
    if (contact.phone && !kelpoPuhelin(contact.phone)) {
      rivi.appendChild(elementti("span", null, contact.phone));
    }
    if (kelpoSposti(contact.email) && /@example\.com$/i.test(contact.email)) {
      var posti = elementti("span", null, contact.email);
      rivi.appendChild(posti);
    }
    if (rivi.childNodes.length) vanhempi.appendChild(rivi);
  }

  function mount(target, config) {
    if (!target || typeof target.appendChild !== "function") {
      throw new Error("AulaDemo.mount tarvitsee HTML-elementin.");
    }
    var asetukset = yhdista(null, config);
    var shadow = target.shadowRoot || target.attachShadow({ mode: "open" });
    while (shadow.firstChild) shadow.removeChild(shadow.firstChild);
    var tyyli = document.createElement("style");
    tyyli.textContent = AULA_DEMO_CSS;
    shadow.appendChild(tyyli);

    target.setAttribute("data-aula-demo", "inline");
    if (!target.getAttribute("role")) target.setAttribute("role", "region");
    target.setAttribute(
      "aria-label",
      asetukset.productName + ", " + asetukset.ui.aria + ", " + asetukset.businessName
    );

    var juuri = elementti("div", "aula-demo");
    var yla = elementti("div", "aula-demo-yla");
    yla.appendChild(elementti("h2", "aula-demo-otsikko", asetukset.ui.title));
    yla.appendChild(elementti("p", "aula-demo-merkki", asetukset.ui.demoLabel));
    juuri.appendChild(yla);
    var ingressi = [asetukset.businessName, asetukset.industry, asetukset.city].filter(Boolean).join(" · ");
    if (asetukset.ui.sampleNote) ingressi += ". " + asetukset.ui.sampleNote;
    juuri.appendChild(elementti("p", "aula-demo-ingressi", ingressi));
    if (asetukset.ui.simulatedNote) juuri.appendChild(elementti("p", "aula-demo-huomio", asetukset.ui.simulatedNote));
    if (asetukset.ui.privacy) juuri.appendChild(elementti("p", "aula-demo-ingressi", asetukset.ui.privacy));

    var loki = elementti("div", "aula-demo-loki");
    loki.setAttribute("role", "log");
    loki.setAttribute("aria-live", "polite");
    loki.setAttribute("aria-relevant", "additions");
    juuri.appendChild(loki);

    var virhe = elementti("p", "aula-demo-virhe");
    virhe.hidden = true;
    virhe.setAttribute("role", "alert");
    juuri.appendChild(virhe);

    var ehdotukset = elementti("div", "aula-demo-ehdotukset");
    juuri.appendChild(ehdotukset);

    var lomake = elementti("form", "aula-demo-lomake");
    var kentta = elementti("label", "aula-demo-kentta", asetukset.ui.messageLabel);
    var syoteId = "aula-demo-syote-" + Math.random().toString(36).slice(2, 8);
    kentta.setAttribute("for", syoteId);
    var syote = elementti("input", "aula-demo-syote");
    syote.id = syoteId;
    syote.type = "text";
    syote.maxLength = 1000;
    syote.autocomplete = "off";
    syote.placeholder = asetukset.ui.placeholder;
    syote.setAttribute("enterkeyhint", "send");
    var nappi = elementti("button", "aula-demo-nappi", asetukset.ui.send);
    nappi.type = "submit";
    var nollaa = asetukset.ui.reset ? elementti("button", "aula-demo-ehdotus", asetukset.ui.reset) : null;
    if (nollaa) nollaa.type = "button";
    lomake.appendChild(kentta);
    lomake.appendChild(syote);
    lomake.appendChild(nappi);
    if (nollaa) lomake.appendChild(nollaa);
    juuri.appendChild(lomake);
    shadow.appendChild(juuri);

    function piirra(role, badge, text, sourceLabel, contact) {
      var artikkeli = elementti("article", "aula-demo-viesti " + (role === "user" ? "aula-demo-viesti-vieras" : "aula-demo-viesti-avustaja"));
      artikkeli.appendChild(elementti("p", "aula-demo-rooli", badge));
      artikkeli.appendChild(elementti("p", "aula-demo-teksti", text));
      if (sourceLabel) artikkeli.appendChild(elementti("p", "aula-demo-lahde", liitos(asetukset.ui.sourcePrefix, sourceLabel)));
      lisaaYhteys(artikkeli, contact);
      loki.appendChild(artikkeli);
      loki.scrollTop = loki.scrollHeight;
    }

    function tervehdi() {
      while (loki.firstChild) loki.removeChild(loki.firstChild);
      piirra("assistant", asetukset.ui.greetingBadge, asetukset.greeting, asetukset.ui.notAi, null);
    }

    tervehdi();
    if (nollaa) {
      nollaa.addEventListener("click", function () {
        syote.value = "";
        virhe.hidden = true;
        tervehdi();
      });
    }

    function kysy(tekstiArvo) {
      var siisti = teksti(tekstiArvo, 1000);
      virhe.hidden = true;
      virhe.textContent = "";
      if (!siisti) return;
      piirra("user", asetukset.ui.visitor, siisti, null, null);
      var tulos = vastaa(asetukset, siisti);
      piirra(
        "assistant",
        asetukset.ui.answerBadge,
        tulos.text,
        tulos.sourceLabel,
        tulos.contact
      );
      var tapahtuma = new CustomEvent("aula-demo:reply", {
        bubbles: true,
        detail: {
          simulated: true,
          sampleData: true,
          kind: tulos.kind,
          sourceLabel: tulos.sourceLabel
        }
      });
      target.dispatchEvent(tapahtuma);
      if (tulos.kind === "fallback" || tulos.kind === "human") {
        target.dispatchEvent(new CustomEvent("aula-demo:fallback", {
          bubbles: true,
          detail: { simulated: true, sampleData: true, kind: tulos.kind, stored: false, submitted: false }
        }));
      }
    }

    asetukset.faqs.slice(0, 3).forEach(function (kohta) {
      var painike = elementti("button", "aula-demo-ehdotus", kohta.q);
      painike.type = "button";
      painike.addEventListener("click", function () { kysy(kohta.q); });
      ehdotukset.appendChild(painike);
    });

    lomake.addEventListener("submit", function (tapahtuma) {
      tapahtuma.preventDefault();
      kysy(syote.value);
      syote.value = "";
    });

    target.dispatchEvent(new CustomEvent("aula-demo:ready", {
      bubbles: true,
      detail: { simulated: true, sampleData: true, placement: "inline", network: false }
    }));

    return {
      destroy: function () {
        if (target.shadowRoot) {
          while (target.shadowRoot.firstChild) target.shadowRoot.removeChild(target.shadowRoot.firstChild);
        }
      },
      answer: function (viesti) { return vastaa(asetukset, viesti); }
    };
  }

  root.AulaDemo = {
    version: "0.1.0-demo",
    mount: mount,
    answer: vastaa,
    defaults: oletus,
    css: AULA_DEMO_CSS
  };
})(typeof globalThis !== "undefined" ? globalThis : this);
