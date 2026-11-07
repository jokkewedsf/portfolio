/**
 * Scrolliin sidottu havainnollistus. Ei väitä, että tietty ERP olisi
 * käyttäjän rakentama tai että vaiheet olisivat mitattuja tuloksia.
 */
(function () {
  function esc(arvo) {
    return String(arvo == null ? "" : arvo).replace(/[&<>"']/g, function (merkki) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[merkki];
    });
  }

  function ikoni(tunnus) {
    const yhteinen = 'viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"';
    const kuvat = {
      asiakkaat:
        '<circle cx="17" cy="16" r="5"/><circle cx="31" cy="17" r="4"/><path d="M8 34c1.5-6 5-9 9-9s7.5 3 9 9"/><path d="M26 33c.6-4 3-6.5 6.2-6.5 3.4 0 6 2.6 7 6.5"/>',
      dokumentit:
        '<path d="M16 8h12l8 8v24H16z"/><path d="M28 8v8h8"/><path d="M21 24h10M21 30h10M21 36h6"/>',
      tarjouspyynnot:
        '<path d="M14 10h14l8 8v20H14z"/><path d="M28 10v8h8"/><path d="M20 26h8"/><circle cx="33" cy="33" r="7"/><path d="M33 30v4M33 37.5v.5"/>',
      myynti:
        '<path d="M14 18h20l-2 16H16z"/><path d="M18 18l2-6h8l2 6"/><path d="M20 28h8M22 32h4"/>',
      crm:
        '<circle cx="24" cy="24" r="4"/><circle cx="10" cy="14" r="3"/><circle cx="38" cy="14" r="3"/><circle cx="12" cy="36" r="3"/><circle cx="36" cy="36" r="3"/><path d="M13 16l8 6M35 16l-8 6M15 34l6-7M33 34l-6-7"/>',
      projektit:
        '<path d="M8 14h32M8 24h32M8 34h32"/><path d="M12 11h10v6H12zM18 21h14v6H18zM14 31h16v6H14z"/>',
      tilaukset:
        '<path d="M10 16l14-6 14 6-14 6z"/><path d="M10 16v14l14 6 14-6V16"/><path d="M24 22v14"/>',
      varasto:
        '<path d="M8 18h32M8 28h32M8 38h32"/><path d="M12 14h6v4h-6zM22 14h8v4h-8zM14 24h10v4H14zM28 24h6v4h-6zM16 34h8v4h-8z"/>',
      hallinta:
        '<path d="M10 16h28M10 24h28M10 32h28"/><circle cx="18" cy="16" r="3" fill="currentColor"/><circle cx="30" cy="24" r="3" fill="currentColor"/><circle cx="20" cy="32" r="3" fill="currentColor"/>',
      integraatiot:
        '<circle cx="14" cy="14" r="3"/><circle cx="34" cy="14" r="3"/><circle cx="14" cy="34" r="3"/><circle cx="34" cy="34" r="3"/><circle cx="24" cy="24" r="3"/><path d="M16 16l6 6M32 16l-6 6M16 32l6-6M32 32l-6-6"/>',
      laskutus:
        '<path d="M16 8h16l6 6v26H16z"/><path d="M32 8v6h6"/><path d="M21 22h10M21 28h10"/><path d="M21 34h6"/><path d="M28 32h4v6"/>',
      raportointi:
        '<path d="M10 38V10M10 38h28"/><path d="M16 30v8M24 22v16M32 16v22"/><path d="M16 26l8-6 8 2 6-8"/>',
    };
    return '<svg class="erp-svg" ' + yhteinen + ">" + (kuvat[tunnus] || kuvat.dokumentit) + "</svg>";
  }

  window.piirraErp = function (osio) {
    if (!osio || !Array.isArray(osio.vaiheet)) return "";
    const portit = osio.vaiheet
      .map(function (vaihe, indeksi) {
        return (
          '<article class="erp-portti" data-erp="' + indeksi + '" aria-hidden="true">' +
          '<div class="erp-portti-sisus">' +
          ikoni(vaihe.id) +
          "<h3>" + esc(vaihe.nimi) + "</h3>" +
          "</div></article>"
        );
      })
      .join("");
    const lista = osio.vaiheet
      .map(function (vaihe, indeksi) {
        return (
          "<li>" +
          '<button type="button" class="erp-piste" data-erp="' + indeksi + '">' +
          '<span class="erp-piste-nro">' + String(indeksi + 1).padStart(2, "0") + "</span>" +
          "<span>" + esc(vaihe.nimi) + "</span>" +
          "</button></li>"
        );
      })
      .join("");
    const staattinen = osio.vaiheet
      .map(function (vaihe) {
        return "<li>" + ikoni(vaihe.id) + "<span>" + esc(vaihe.nimi) + "</span></li>";
      })
      .join("");
    return (
      '<section class="erp" id="erp" aria-labelledby="erp-otsikko">' +
      '<div class="erp-sticky">' +
      '<div class="erp-otsake">' +
      '<p class="silma">' + osio.numero + "</p>" +
      '<h2 id="erp-otsikko">' + osio.otsikko + "</h2>" +
      '<p class="johdanto">' + osio.johdanto + "</p>" +
      '<p class="erp-askel" aria-live="polite"><span id="erp-nyt">' + esc(osio.vaiheet[0].nimi) + '</span> <span class="erp-askel-nro" id="erp-nro">1 / ' +
      osio.vaiheet.length +
      "</span></p>" +
      '<div class="erp-jana" aria-hidden="true"><span id="erp-jana"></span></div>' +
      "</div>" +
      '<div class="erp-lava" id="erp-lava">' +
      '<div class="erp-seinat" aria-hidden="true"></div>' +
      portit +
      "</div>" +
      '<ol class="erp-indeksi">' + lista + "</ol>" +
      '<ol class="erp-lista">' + staattinen + "</ol>" +
      "</div></section>"
    );
  };

  window.alustaErp = function () {
    if (window.__erpSiivo) window.__erpSiivo();
    const osio = document.getElementById("erp");
    if (!osio) return;
    const liike = window.matchMedia("(prefers-reduced-motion: reduce)");
    const portit = Array.prototype.slice.call(osio.querySelectorAll(".erp-portti"));
    const pisteet = Array.prototype.slice.call(osio.querySelectorAll(".erp-piste"));
    const nyt = document.getElementById("erp-nyt");
    const nro = document.getElementById("erp-nro");
    const jana = document.getElementById("erp-jana");
    const lava = document.getElementById("erp-lava");
    let viimeinen = -1;

    function hiljaa() {
      return liike.matches;
    }

    function paivita() {
      if (hiljaa()) {
        osio.classList.add("erp-hiljaa");
        return;
      }
      osio.classList.remove("erp-hiljaa");
      if (!portit.length) return;
      const alue = osio.getBoundingClientRect();
      if (alue.bottom < 0 || alue.top > window.innerHeight) return;
      const alku = osio.getBoundingClientRect().top + window.scrollY;
      const matka = Math.max(1, osio.offsetHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, (window.scrollY - alku) / matka));
      const focus = p * (portit.length - 1);
      let aktiivinen = Math.round(focus);
      if (aktiivinen < 0) aktiivinen = 0;
      if (aktiivinen > portit.length - 1) aktiivinen = portit.length - 1;
      const vali = window.innerWidth < 700 ? 460 : 620;
      portit.forEach(function (el, i) {
        const d = i - focus;
        const z = (focus - i) * vali;
        let opacity = 0;
        if (i === aktiivinen) opacity = 1;
        else if (d > 0.2 && d < 1.35) opacity = 0.16;
        el.style.transform = "translate3d(-50%,-50%," + z.toFixed(1) + "px)";
        el.style.opacity = opacity.toFixed(3);
        const piiloon = opacity < 0.05;
        el.style.visibility = piiloon ? "hidden" : "visible";
        el.classList.toggle("on-aktiivinen", i === aktiivinen);
      });
      if (aktiivinen !== viimeinen) {
        viimeinen = aktiivinen;
        const nimi = pisteet[aktiivinen] ? pisteet[aktiivinen].querySelector("span:last-child").textContent : "";
        if (nyt) nyt.textContent = nimi;
        if (nro) nro.textContent = aktiivinen + 1 + " / " + portit.length;
        pisteet.forEach(function (piste, i) {
          if (i === aktiivinen) piste.setAttribute("aria-current", "true");
          else piste.removeAttribute("aria-current");
        });
      }
      if (jana) jana.style.transform = "scaleX(" + p.toFixed(4) + ")";
      if (lava) lava.style.setProperty("--erp-p", p.toFixed(4));
    }

    function klik(tapahtuma) {
      const nappi = tapahtuma.target.closest(".erp-piste");
      if (!nappi || hiljaa()) return;
      const indeksi = Number(nappi.getAttribute("data-erp"));
      const matka = Math.max(1, osio.offsetHeight - window.innerHeight);
      const alku = osio.getBoundingClientRect().top + window.scrollY;
      const y = alku + (indeksi / Math.max(1, portit.length - 1)) * matka;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    osio.addEventListener("click", klik);

    window.addEventListener("scroll", paivita, { passive: true });
    window.addEventListener("resize", paivita);
    liike.addEventListener("change", paivita);
    window.__erpSiivo = function () {
      window.removeEventListener("scroll", paivita);
      window.removeEventListener("resize", paivita);
      liike.removeEventListener("change", paivita);
      osio.removeEventListener("click", klik);
    };
    paivita();
  };
})();
