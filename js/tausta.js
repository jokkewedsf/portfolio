/**
 * Hidas kajo taustalla: pehmeät valorenkaat, verhomaiset nauhat ja harva pöly.
 * Canvas ei ota vastaan osoitintapahtumia. Liike pysähtyy, jos käyttäjä
 * on pyytänyt vähentämään liikettä tai välilehti ei ole näkyvissä.
 */
(function () {
  const canvas = document.getElementById("tausta");
  if (!canvas) return;
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) return;

  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const pointer = { x: 0.78, y: 0.22, tx: 0.78, ty: 0.22 };
  let leveys = 0;
  let korkeus = 0;
  let suhde = 1;
  let hiukkaset = [];
  let kaynnissa = false;
  let ruutu = 0;

  function lukitse(luku, min, max) {
    return Math.min(max, Math.max(min, luku));
  }

  function luoHiukkaset() {
    const maara = Math.round(lukitse(leveys / 26, 22, 64));
    hiukkaset = [];
    for (let i = 0; i < maara; i += 1) {
      hiukkaset.push({
        x: Math.random(),
        y: Math.random(),
        r: 0.5 + Math.random() * 1.5,
        v: 0.004 + Math.random() * 0.012,
        syvyys: 0.25 + Math.random() * 0.75,
        vaihe: Math.random() * Math.PI * 2,
        minttu: Math.random() > 0.72,
      });
    }
  }

  function koko() {
    const seuraavaLeveys = window.innerWidth;
    const seuraavaKorkeus = window.innerHeight;
    suhde = Math.min(window.devicePixelRatio || 1, seuraavaLeveys < 800 ? 1.35 : 1.6);
    const rajattu = Math.min(seuraavaLeveys, 1680);
    const skaala = rajattu / seuraavaLeveys;
    leveys = rajattu;
    korkeus = seuraavaKorkeus * skaala;
    canvas.width = Math.max(1, Math.round(leveys * suhde));
    canvas.height = Math.max(1, Math.round(korkeus * suhde));
    luoHiukkaset();
    if (motion.matches) piirra(18);
  }

  function kukka(x, y, sade, vari) {
    const liuku = ctx.createRadialGradient(x, y, 0, x, y, sade);
    liuku.addColorStop(0, vari);
    liuku.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = liuku;
    ctx.beginPath();
    ctx.arc(x, y, sade, 0, Math.PI * 2);
    ctx.fill();
  }

  function nauha(yPerusta, amplitudi, taajuus, vaihe, leveysNauha, varit) {
    const pisteet = [];
    for (let x = -30; x <= leveys + 30; x += 14) {
      const aalto =
        Math.sin(x * taajuus + vaihe) * amplitudi +
        Math.sin(x * taajuus * 0.43 + vaihe * 1.8) * amplitudi * 0.42 +
        Math.sin(x * taajuus * 1.7 + vaihe * 0.35) * amplitudi * 0.16;
      pisteet.push([x, yPerusta + aalto]);
    }
    ctx.beginPath();
    pisteet.forEach(function (piste, indeksi) {
      if (indeksi === 0) ctx.moveTo(piste[0], piste[1]);
      else ctx.lineTo(piste[0], piste[1]);
    });
    for (let i = pisteet.length - 1; i >= 0; i -= 1) {
      ctx.lineTo(pisteet[i][0], pisteet[i][1] + leveysNauha);
    }
    ctx.closePath();
    const liuku = ctx.createLinearGradient(0, yPerusta - amplitudi, leveys, yPerusta + amplitudi);
    varit.forEach(function (vari, indeksi) {
      liuku.addColorStop(indeksi / (varit.length - 1), vari);
    });
    ctx.fillStyle = liuku;
    ctx.fill();
  }

  function piirra(aika) {
    const t = aika * 0.001;
    const siirtoX = (pointer.x - 0.5) * (motion.matches ? 0 : 36);
    const siirtoY = (pointer.y - 0.5) * (motion.matches ? 0 : 24);

    ctx.setTransform(suhde, 0, 0, suhde, 0, 0);
    ctx.clearRect(0, 0, leveys, korkeus);

    const tausta = ctx.createLinearGradient(0, 0, leveys * 0.2, korkeus);
    tausta.addColorStop(0, "#080a12");
    tausta.addColorStop(0.42, "#0b1220");
    tausta.addColorStop(1, "#07080c");
    ctx.fillStyle = tausta;
    ctx.fillRect(0, 0, leveys, korkeus);

    ctx.globalCompositeOperation = "lighter";
    kukka(leveys * 0.82 + siirtoX, korkeus * 0.18 + siirtoY, leveys * 0.46, "rgba(120, 196, 255, 0.28)");
    kukka(leveys * 0.68 - siirtoX * 0.4, korkeus * 0.78, leveys * 0.52, "rgba(110, 230, 190, 0.22)");
    kukka(leveys * 0.18, korkeus * 0.92, leveys * 0.34, "rgba(214, 166, 92, 0.14)");

    nauha(
      korkeus * 0.22 + siirtoY,
      korkeus * 0.07,
      0.0042,
      t * 0.18,
      90,
      ["rgba(159,212,255,0)", "rgba(159,212,255,0.28)", "rgba(154,240,208,0.1)", "rgba(159,212,255,0)"]
    );
    nauha(
      korkeus * 0.48 + siirtoY * 0.5,
      korkeus * 0.09,
      0.0031,
      t * 0.12 + 1.4,
      130,
      ["rgba(154,240,208,0)", "rgba(154,240,208,0.24)", "rgba(226,181,106,0.12)", "rgba(154,240,208,0)"]
    );
    nauha(
      korkeus * 0.7,
      korkeus * 0.05,
      0.005,
      t * 0.22 + 2.2,
      80,
      ["rgba(226,181,106,0)", "rgba(226,181,106,0.16)", "rgba(159,212,255,0.08)", "rgba(226,181,106,0)"]
    );
    ctx.globalCompositeOperation = "source-over";

    hiukkaset.forEach(function (h) {
      const x = (h.x + siirtoX / leveys * h.syvyys * 0.35) * leveys;
      const vaellus = motion.matches ? 0 : (t * h.v) % 1;
      const y = ((h.y - vaellus + 1) % 1) * korkeus;
      const syke = motion.matches ? 0.45 : 0.28 + Math.sin(t * 0.7 + h.vaihe) * 0.18;
      ctx.beginPath();
      ctx.fillStyle = h.minttu ? "rgba(154,240,208," + syke + ")" : "rgba(243,239,228," + syke * 0.7 + ")";
      ctx.arc(x, y, h.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function pysayta() {
    kaynnissa = false;
    cancelAnimationFrame(ruutu);
  }

  function kaynnista() {
    if (motion.matches || document.hidden) {
      pysayta();
      piirra(18);
      return;
    }
    if (kaynnissa) return;
    kaynnissa = true;
    const askel = function (nyt) {
      if (!kaynnissa) return;
      pointer.x += (pointer.tx - pointer.x) * 0.045;
      pointer.y += (pointer.ty - pointer.y) * 0.045;
      piirra(nyt || 18);
      ruutu = requestAnimationFrame(askel);
    };
    ruutu = requestAnimationFrame(askel);
  }

  window.addEventListener(
    "pointermove",
    function (tapahtuma) {
      if (motion.matches) return;
      pointer.tx = tapahtuma.clientX / Math.max(1, window.innerWidth);
      pointer.ty = tapahtuma.clientY / Math.max(1, window.innerHeight);
    },
    { passive: true }
  );

  document.addEventListener("visibilitychange", kaynnista);
  motion.addEventListener("change", kaynnista);
  window.addEventListener("resize", function () {
    koko();
    kaynnista();
  });

  koko();
  kaynnista();
})();
