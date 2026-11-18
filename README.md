# Joakim Rydenfelt

Kaksikielinen staattinen sivusto. Julkinen osoite on <https://jokkewedsf.github.io/portfolio/>.

## Rakenne

- `index.html` on etusivu
- `ratkaisut/chatbot/` on oman chatin sivu
- `js/sisalto.js` sisältää tekstit kohdissa `kielet.fi` ja `kielet.en`
- `js/main.js` kokoaa etusivun, `js/ratkaisu.js` tuotesivun
- `js/keskustelu.js` on tekoäly-Joakimin keskustelu. Osoite on `window.JOAKIM_AI_ENDPOINT` tiedostossa `js/sisalto.js`: `https://joakim-ai.jokkewedsf.workers.dev`.
- `worker/` on Cloudflare Worker. Ohje on tiedostossa `worker/README.md`.
- `css/styles.css` on ulkoasu
- `404.html` näytetään, jos osoite ei vastaa sivua

## Paikallinen katselu

```bash
python3 -m http.server 8080
```

Avaa <http://localhost:8080> ja <http://localhost:8080/ratkaisut/chatbot/>.

`node scripts/tarkista.js` tarkistaa syntaksin ja muutaman sisältösäännön.

## Uusi ratkaisusivu

1. Lisää `{ id, polku }` listaan `katalogi` tiedostossa `js/sisalto.js`.
2. Kirjoita tekstit molempiin kieliin.
3. Kopioi `ratkaisut/chatbot/index.html` uuteen kansioon. Pidä polut suhteellisina, esimerkiksi `../../css/styles.css`.

Oman chatin kokeilu avaa saman widgetin kuin etusivu. Avain ja tietopohja eivät ole sivun koodissa.

## Julkaisu

GitHub Pages julkaisee haaran `cursor/portfolio-sivu-e9b4` juuren. Tekstejä muokataan tiedostossa `js/sisalto.js`.

Sivut viittaavat paikallisiin tyyleihin ja skripteihin kyselyllä `?v=`, koska Pages pitää tiedostoja välimuistissa kymmenen minuuttia. Kun muutat `css/`- tai `js/`-tiedostoa, nosta sama `?v=`-arvo jokaiseen paikalliseen `link rel="stylesheet"`- ja `script src`-viitteeseen tiedostoissa `index.html` ja `ratkaisut/chatbot/index.html`. Muuten Safari voi jatkaa vanhalla skriptillä.
