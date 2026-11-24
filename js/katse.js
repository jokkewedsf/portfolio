(function () {
  var hahmo = null;
  var teravat = [];
  var tavoite = { x: 0, y: 0 };
  var nyky = { x: 0, y: 0 };
  var kehys = 0;
  var nakyvissa = true;
  var sormi = false;
  var paluu = 0;
  var ravy = 0;
  var tarkkailija = null;
  var vahenna = window.matchMedia("(prefers-reduced-motion: reduce)");
  var karkea = window.matchMedia("(hover: none), (pointer: coarse)");
  var kuuntelee = false;

  function rajaa(arvo) {
    return Math.max(-1, Math.min(1, arvo));
  }

  function piirra() {
    if (kehys) return;
    kehys = window.requestAnimationFrame(askel);
  }

  function askel() {
    kehys = 0;
    if (!hahmo) return;
    if (vahenna.matches || document.hidden || !nakyvissa) {
      tavoite.x = 0;
      tavoite.y = 0;
    }
    nyky.x += (tavoite.x - nyky.x) * 0.18;
    nyky.y += (tavoite.y - nyky.y) * 0.18;
    if (Math.abs(nyky.x) < 0.01 && Math.abs(tavoite.x) < 0.01) nyky.x = 0;
    if (Math.abs(nyky.y) < 0.01 && Math.abs(tavoite.y) < 0.01) nyky.y = 0;
    var siirto = "translate(" + (nyky.x * 6.4).toFixed(2) + " " + (nyky.y * 6.4).toFixed(2) + ")";
    for (var i = 0; i < teravat.length; i++) teravat[i].setAttribute("transform", siirto);
    if (Math.abs(tavoite.x - nyky.x) > 0.012 || Math.abs(tavoite.y - nyky.y) > 0.012) piirra();
  }

  function katso(x, y) {
    if (!hahmo || vahenna.matches || document.hidden || !nakyvissa) return;
    var alue = hahmo.getBoundingClientRect();
    var dx = x - (alue.left + alue.width / 2);
    var dy = y - (alue.top + alue.height * 0.55);
    var etaisyys = Math.hypot(dx, dy) || 1;
    var voima = Math.min(1, etaisyys / 220);
    tavoite.x = rajaa((dx / etaisyys) * voima);
    tavoite.y = rajaa((dy / etaisyys) * voima);
    piirra();
  }

  function ajastaRavytys() {
    window.clearTimeout(ravy);
    if (!hahmo || vahenna.matches || document.hidden || !nakyvissa) return;
    ravy = window.setTimeout(function () {
      if (!hahmo || vahenna.matches || document.hidden || !nakyvissa) return;
      hahmo.classList.add("on-ravytaa");
      window.setTimeout(function () {
        if (hahmo) hahmo.classList.remove("on-ravytaa");
        ajastaRavytys();
      }, 130);
    }, 4200 + Math.random() * 2800);
  }

  function alustaKuuntelu() {
    if (kuuntelee) return;
    kuuntelee = true;
    window.addEventListener("pointermove", function (tapahtuma) {
      if (tapahtuma.pointerType === "touch") return;
      katso(tapahtuma.clientX, tapahtuma.clientY);
    }, { passive: true });
    window.addEventListener("touchstart", function (tapahtuma) {
      sormi = true;
      if (!tapahtuma.touches[0]) return;
      katso(tapahtuma.touches[0].clientX, tapahtuma.touches[0].clientY);
    }, { passive: true });
    window.addEventListener("touchmove", function (tapahtuma) {
      sormi = true;
      if (!tapahtuma.touches[0]) return;
      katso(tapahtuma.touches[0].clientX, tapahtuma.touches[0].clientY);
    }, { passive: true });
    window.addEventListener("touchend", function () { sormi = false; }, { passive: true });
    window.addEventListener("touchcancel", function () { sormi = false; }, { passive: true });
    var edellinen = window.scrollY;
    window.addEventListener("scroll", function () {
      var y = window.scrollY;
      var ero = y - edellinen;
      edellinen = y;
      if (!karkea.matches || sormi || vahenna.matches || document.hidden || !nakyvissa) return;
      tavoite.x = 0;
      tavoite.y = rajaa(ero / 20);
      piirra();
      window.clearTimeout(paluu);
      paluu = window.setTimeout(function () {
        tavoite.x = 0;
        tavoite.y = 0;
        piirra();
      }, 160);
    }, { passive: true });
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        tavoite.x = 0;
        tavoite.y = 0;
        if (hahmo) hahmo.classList.remove("on-ravytaa");
        piirra();
      } else ajastaRavytys();
    });
    vahenna.addEventListener("change", function () {
      tavoite.x = 0;
      tavoite.y = 0;
      if (hahmo) hahmo.classList.remove("on-ravytaa");
      piirra();
      ajastaRavytys();
    });
  }

  function alustaKatse() {
    if (tarkkailija) tarkkailija.disconnect();
    hahmo = document.querySelector(".hero .katse");
    teravat = hahmo ? hahmo.querySelectorAll(".katse-terava") : [];
    nakyvissa = true;
    if (hahmo && "IntersectionObserver" in window) {
      tarkkailija = new IntersectionObserver(function (kirjaukset) {
        nakyvissa = kirjaukset.some(function (kirjaus) { return kirjaus.isIntersecting; });
        if (!nakyvissa) {
          tavoite.x = 0;
          tavoite.y = 0;
          piirra();
        }
        ajastaRavytys();
      }, { threshold: 0.2 });
      tarkkailija.observe(hahmo);
    }
    ajastaRavytys();
  }

  alustaKuuntelu();
  window.alustaKatse = alustaKatse;
})();
