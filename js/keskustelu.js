(function () {
  const MAX = 500;
  const MUISTI = 16;
  const AIKARAJA = 30000;
  let sukupolvi = 0;
  let historia = [];
  let ohjain = null;
  let nostaNykyinen = null;

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

  window.alustaKeskustelu = function (tekstit) {
    const oma = ++sukupolvi;
    if (ohjain) {
      ohjain.abort();
      ohjain = null;
    }
    const juuri = document.getElementById("keskustelu");
    if (!juuri || !tekstit) return;
    const kehys = juuri.querySelector(".ai-kehys");
    const loki = juuri.querySelector(".ai-loki");
    const lomake = juuri.querySelector(".ai-lomake");
    const kentta = juuri.querySelector("#ai-syote");
    const maara = juuri.querySelector(".ai-maara");
    const lahetaNappi = juuri.querySelector(".ai-laheta");
    if (!kehys || !loki || !lomake || !kentta) return;

    const valmis = osoite();
    kehys.setAttribute("data-tila", valmis ? "kaynti" : "odotus");
    if (valmis) piirra();

    function piirra() {
      loki.replaceChildren();
      historia.forEach(function (viesti) {
        loki.appendChild(kupla(viesti.role, viesti.content));
      });
      loki.scrollTop = loki.scrollHeight;
    }

    function kupla(rooli, teksti) {
      const art = document.createElement("article");
      art.className = "ai-viesti " + (rooli === "user" ? "ai-oma" : "ai-vastaus");
      const kuka = document.createElement("p");
      kuka.className = "ai-kuka";
      kuka.textContent = rooli === "user" ? tekstit.sina || "" : tekstit.joakim || "";
      const sisalto = document.createElement("p");
      sisalto.className = "ai-sisalto";
      sisalto.textContent = teksti;
      art.append(kuka, sisalto);
      return art;
    }

    function kirjoitus() {
      const rivi = document.createElement("div");
      rivi.className = "ai-kirjoittaa";
      const piilo = document.createElement("span");
      piilo.className = "sr-only";
      piilo.textContent = tekstit.kirjoittaa || "";
      const pisteet = document.createElement("span");
      pisteet.className = "ai-pisteet";
      pisteet.setAttribute("aria-hidden", "true");
      pisteet.append(document.createElement("i"), document.createElement("i"), document.createElement("i"));
      rivi.append(piilo, pisteet);
      return rivi;
    }

    function asetaKesken(paalla) {
      kentta.disabled = paalla;
      if (lahetaNappi) lahetaNappi.disabled = paalla;
      juuri.querySelectorAll(".ai-ehdotus").forEach(function (nappi) {
        nappi.disabled = paalla;
      });
      loki.setAttribute("aria-busy", paalla ? "true" : "false");
    }

    function naytaVirhe() {
      const huomio = document.createElement("p");
      huomio.className = "ai-huomio";
      huomio.textContent = tekstit.virhe || "";
      loki.appendChild(huomio);
      loki.scrollTop = loki.scrollHeight;
    }

    function paivitaLaskuri() {
      if (maara) maara.textContent = String(kentta.value.length);
    }

    function nostaKentta() {
      if (document.activeElement !== kentta) return;
      const nakyma = window.visualViewport;
      const ala = nakyma ? nakyma.offsetTop + nakyma.height : window.innerHeight;
      const reuna = kentta.getBoundingClientRect().bottom;
      if (reuna > ala - 12) window.scrollBy(0, reuna - ala + 20);
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
      if (oma !== sukupolvi || !osoite()) return false;
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
        if (oma !== sukupolvi) return false;
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
        if (oma !== sukupolvi) return false;
        if (!saatu) {
          art.remove();
          naytaVirhe();
          return false;
        }
        historia.push({ role: "assistant", content: saatu });
        rajaa();
        return true;
      } catch (virhe) {
        if (oma !== sukupolvi) return false;
        merkki.remove();
        if (!virhe || virhe.name === "TypeError" || virhe.name === "AbortError") {
          kehys.setAttribute("data-tila", "odotus");
          return false;
        }
        naytaVirhe();
        return false;
      } finally {
        window.clearTimeout(ajastin);
        if (ohjain === kontrolleri) ohjain = null;
        if (oma === sukupolvi) asetaKesken(false);
      }
    }

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
    kentta.addEventListener("focus", function () {
      window.setTimeout(nostaKentta, 280);
    });
    if (window.visualViewport) {
      if (nostaNykyinen) {
        window.visualViewport.removeEventListener("resize", nostaNykyinen);
        window.visualViewport.removeEventListener("scroll", nostaNykyinen);
      }
      nostaNykyinen = nostaKentta;
      window.visualViewport.addEventListener("resize", nostaKentta);
      window.visualViewport.addEventListener("scroll", nostaKentta);
    }

    juuri.querySelectorAll(".ai-ehdotus").forEach(function (nappi) {
      nappi.addEventListener("click", function () {
        laheta(nappi.textContent);
      });
    });
  };
})();
