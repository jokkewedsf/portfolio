# Joakim Rydenfelt — henkilökohtainen sivu

Staattinen, suomenkielinen sivu. Ei taustajärjestelmää eikä rakennusvaihetta. Sivusto sopii myöhempään GitHub Pages -julkaisuun, mutta julkaisua ei ole kytketty päälle.

Vahvistettuja tietoja sivulla ovat nimi **Joakim Rydenfelt** ja GitHub-profiili [github.com/jokkewedsf](https://github.com/jokkewedsf). Esittely, osaaminen, projektit ja muut yhteystiedot ovat paikkamerkkejä tai selvästi merkittyjä esimerkkejä, kunnes ne korvataan omalla sisällöllä.

## Sisällön muokkaus

Kaikki näkyvä teksti, esimerkkiprojektit ja yhteystiedot ovat tiedostossa [`js/sisalto.js`](js/sisalto.js).

- Tyhjä merkkijono `""` näkyy paikkamerkkinä. Siitä ei tehdä linkkiä.
- Projekti, jonka `onEsimerkki` ei ole täsmälleen `false`, näytetään esimerkkinä. Merkintä “Esimerkki · ei oikea projekti” pysyy näkyvissä.
- Aseta `onEsimerkki` arvoksi `false` vasta, kun nimi, kuvaus ja mahdollinen linkki ovat omiasi.
- Sähköposti lisätään kenttään `yhteys.sahkoposti`. Tyhjänä kenttä ei ole linkki eikä sivulla ole lomaketta.
- Muut kanavat lisätään listaan `yhteys.muut`. Jokaisella kohteella on `nimi`, `osoite`, `teksti` ja halutessa `selite`. Tyhjä osoite jää paikkamerkiksi.
- Linkkien on alettava `https://` tai `http://`. Muut osoitteet jätetään näyttämättä.
- Älä lisää tietoja, joita et halua julkaista. Tiedostossa ei ole keksittyä ammattinimikettä, asiakkaita, tilastoja tai some-tilejä.

Ilman JavaScriptiä näkyvä lyhyt varateksti ja GitHub-osoite ovat [`index.html`](index.html)-tiedoston `noscript`-lohkossa. Päivitä osoite sinnekin, jos profiilin osoite muuttuu.

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

Komento ei lataa ulkoisia palveluita. Se tarkistaa, että JavaScript on ehjää, pakolliset tiedostot löytyvät, linkit eivät ole tyhjiä `#`-ankkureita ja värien kontrasti riittää. Se varmistaa myös nykyisen vahvistetun nimen ja GitHub-osoitteen. Jos ne myöhemmin vaihtuvat oikeasti, päivitä vastaavat odotukset tarkistimessa.

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
