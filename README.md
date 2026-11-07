# Joakim Rydenfelt — henkilökohtainen sivu

Staattinen, suomenkielinen sivu. Ei taustajärjestelmää eikä rakennusvaihetta. Sivusto sopii myöhempään GitHub Pages -julkaisuun, mutta julkaisua ei ole kytketty päälle.

Etusivun hahmo on oma tyylitelmä Oulun kauppatorin Toripolliisi-patsaasta. Se ei ole kaupungin virallinen tunnus eikä valokuva patsaasta.

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

## Tiedostot

- `index.html` — sivun runko
- `css/styles.css` — ulkoasu
- `js/sisalto.js` — muokattava sisältö
- `js/main.js` — sivun kokoaminen, valikko ja kortit
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

## GitHub Pages myöhemmin

Tätä julkaisua ei ole tehty. Repositorion näkyvyyttä ei ole muutettu eikä Pages-asetusta ole kytketty.

Kun haluat julkaista sivun itse:

1. Yhdistä haluamasi haara, yleensä `main`.
2. Avaa GitHubissa **Settings → Pages**.
3. Valitse **Deploy from a branch**.
4. Valitse haara ja kansio **`/ (root)`**.
5. Tallenna.

Projektisivun osoite on muotoa `https://jokkewedsf.github.io/portfolio/`. Erillistä build-komentoa ei tarvita, koska polut ovat suhteellisia.

## Saavutettavuus

Sivua voi käyttää näppäimistöllä. Ohituslinkki vie sisältöön, valikko sulkeutuu Escape-näppäimellä ja fokus näkyy. Jos käyttöjärjestelmässä on päällä liikkeen vähentäminen (`prefers-reduced-motion`), tausta ja siirtymät pysyvät paikallaan. Sivusto ei vaihda osoitinta eikä peitä sivua latausnäkymällä.
