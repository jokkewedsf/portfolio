# Joakim Rydenfelt — henkilökohtainen sivu

Staattinen kaksikielinen portfolio. Ei taustajärjestelmää eikä rakennusvaihetta. Julkinen sivu on julkaistu GitHub Pagesissa:
<https://jokkewedsf.github.io/portfolio/>.

Tekstit ovat tiedostossa `js/sisalto.js`, kohdissa `kielet.fi` ja `kielet.en`. Kielivalinta muistaa tahallisen valinnan selaimen localStorageen. Oletus on suomi.

Etusivun nimi on typografinen animaatio. Patsasta ei ole sivulla.

Osio Toiminnanohjaus on scrolliin sidottu havainnollistus. Se ei väitä, että jokin tietty ERP-järjestelmä olisi tehty tai käyttöönotettu tällä sivulla.

Sisältö perustuu Joakim Rydenfeltin julkiseen esittelyyn: nimi, otsikko, Oulu, työkokemuksen vastuut, käynnissä olevat opinnot ja kaksi profiililinkkiä. [LinkedIn](https://www.linkedin.com/in/joakim-rydenfelt) ja [GitHub](https://github.com/jokkewedsf) ovat ainoat yhteyslinkit. Sähköpostia ei ole lisätty.

Centria-opinnot 2026–2029 ja Oamkin Construction Management -jaksot on merkitty opinnoiksi, ei valmiiksi tutkinnoiksi. Työkorteissa ei ole keksittyjä mittareita, asiakkaita tai tuloksia.

## Sisällön muokkaus

Kaikki näkyvä teksti ja yhteystiedot ovat tiedostossa [`js/sisalto.js`](js/sisalto.js).

- Tyhjä merkkijono `""` ei piirrä linkkiä eikä tyhjää yhteysriviä.
- Jos `onEsimerkki` ei ole täsmälleen `false`, kortti näytetään esimerkkinä. Nykyiset kortit ovat oikeita rooleja ja kenttä on `false`.
- Sähköposti lisätään kenttään `yhteys.sahkoposti` vasta, kun osoite on oikea. Tyhjänä sitä ei näytetä, eikä sivulla ole lomaketta.
- Muut kanavat lisätään listaan `yhteys.muut`. Linkkien on alettava `https://` tai `http://`.
- Älä täydennä puuttuvia lukuja, valmistumisvuosia tai asiakasnimiä arvauksella.

Ilman JavaScriptiä näkyvä tiivistelmä ja molemmat profiiliosoitteet ovat [`index.html`](index.html)-tiedoston `noscript`-lohkossa. Päivitä osoitteet sinnekin, jos ne muuttuvat.

## Ratkaisut

Myytävät ratkaisut ovat omia sivujaan kansiossa `ratkaisut/`. Toistaiseksi mukana on yksi tuote, asiakaspalvelun chatbot Aula:

- Etusivun osio Ratkaisut ja kortin linkki `ratkaisut/chatbot/`
- Sivu `ratkaisut/chatbot/index.html`
- Lista `katalogi` tiedostossa `js/sisalto.js`

Uusi ratkaisu lisätään näin:

1. Lisää kohde listaan `katalogi`, esimerkiksi `{ id: "nimi", polku: "ratkaisut/nimi/" }`.
2. Kirjoita suomen- ja englanninkielinen esittely kohtiin `kielet.fi` ja `kielet.en`.
3. Tee kansio `ratkaisut/nimi/index.html`. Viittaa tiedostoihin suhteellisesti (`../../css/styles.css`), älä juuripolulla `/css/...`. Sama polku toimii paikallisessa juuressa ja myöhemmin osoitteessa `https://jokkewedsf.github.io/portfolio/`.
4. Jos tuotteella on demo, käytä samaa tietopohjaa molemmilla sivuilla. Älä kopioi vastauksia kahteen paikkaan.

Aulan demo vastaa vain paikallisesta tietopohjasta. Esimerkkiyritys on kuvitteellinen. Viestiä ei lähetetä eikä tallenneta. Demon merkintä on Interaktiivinen demo – simuloidut vastaukset. Live-malli, yrityksen oma aineisto ja CRM-kytkentä eivät ole demossa. Ne kuuluvat erikseen sovittavaan toteutukseen. Hintaa ei ilmoiteta.

Demon kysymykset ja vastaukset ovat kielikohtaisesti kentässä `aula`. Tuotesivun tekstit ovat kentässä `chatbot`.

## Tiedostot

- `index.html` — sivun runko
- `css/styles.css` — ulkoasu
- `js/sisalto.js` — muokattava sisältö
- `js/main.js` — sivun kokoaminen, valikko ja kortit
- `js/aula-demo.js` — simuloitu asiakaspalveludemo
- `js/ratkaisu.js` — yhden ratkaisusivun kokoaminen
- `ratkaisut/chatbot/` — Aulan oma sivu
- `js/tausta.js` — taustan valo
- `fonts/` — Fraunces ja Outfit, SIL Open Font License
- `assets/` — kuvake ja rakeisuus

Fonttien lisenssit: `fonts/OFL-fraunces.txt` ja `fonts/OFL-outfit.txt`.

## Paikallinen katselu

Sivua ei kannata avata suoraan levyltä (`file://`). Käynnistä paikallinen palvelin repositorion juuressa:

```bash
python3 -m http.server 8080
```

Avaa selaimessa [http://localhost:8080](http://localhost:8080).

Sisällön ja tiedostoviittausten tarkistus:

```bash
node scripts/tarkista.js
```

Komento ei lataa ulkoisia palveluita. Se tarkistaa, että JavaScript on ehjää, pakolliset tiedostot löytyvät, linkit eivät ole tyhjiä `#`-ankkureita ja värien kontrasti riittää. Se varmistaa myös nimen, LinkedIn- ja GitHub-osoitteet sekä sen, etteivät opinnot ole merkitty valmiiksi tutkinnoiksi. Jos tiedot myöhemmin vaihtuvat oikeasti, päivitä vastaavat odotukset tarkistimessa.

## Julkaisu

GitHub Pages julkaisee haaran `cursor/portfolio-sivu-e9b4` juuren. Muutokset tulevat näkyviin Pages-rakennuksen valmistuttua. Etusivu on <https://jokkewedsf.github.io/portfolio/> ja Aula <https://jokkewedsf.github.io/portfolio/ratkaisut/chatbot/>. Tekstejä muokataan tiedostossa `js/sisalto.js`.

Puuttuva osoite näyttää `404.html`-sivun. Tuntemattoman polun alta linkit palaavat etusivulle ja Aulaan.

## Saavutettavuus

Sivua voi käyttää näppäimistöllä. Ohituslinkki vie sisältöön, valikko sulkeutuu Escape-näppäimellä ja fokus näkyy. Jos käyttöjärjestelmässä on päällä liikkeen vähentäminen (`prefers-reduced-motion`), tausta ja siirtymät pysyvät paikallaan. Sivusto ei vaihda osoitinta eikä peitä sivua latausnäkymällä.
