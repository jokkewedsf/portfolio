/**
 * SIVUN SISÄLTÖ
 * -------------
 * Muokkaa tätä tiedostoa, kun vaihdat tekstejä, esimerkkiprojekteja
 * tai yhteystietoja. Sivun osiot luetaan täältä. Älä keksi tietoja:
 * jätä kenttä tyhjäksi, jos tietoa ei ole.
 *
 * Tyhjä merkkijono ("") näkyy paikkamerkkinä eikä siitä tehdä linkkiä.
 * Projekti näytetään esimerkkinä, kun onEsimerkki ei ole täsmälleen false.
 * Merkitse työ omaksi vasta, kun nimi, kuvaus ja linkki ovat oikeita.
 *
 * Sähköpostiesimerkki kommentissa: nimi@example.com
 * Linkkiesimerkki kommentissa: https://osoite.example
 */
window.SIVUN_SISALTO = {
  etunimi: "Joakim",
  sukunimi: "Rydenfelt",
  kuvaus:
    "Joakim Rydenfeltin henkilökohtainen sivu. Esittely, osaaminen ja projektit täydentyvät, kun sisältö on vahvistettu.",

  ui: {
    ohitus: "Siirry sisältöön",
    avaaValikko: "Avaa valikko",
    suljeValikko: "Sulje valikko",
    uusiValilehti: "avautuu uuteen välilehteen",
  },

  hero: {
    ylateksti: "Henkilökohtainen sivu",
    ingressi:
      "Tämä on Joakim Rydenfeltin henkilökohtainen sivu. Ulkoasu on valmis, mutta esittely, osaaminen ja projektit odottavat vielä omaa, vahvistettua sisältöä.",
    huomautus:
      "Vahvistettuna tietona on nimi ja GitHub-profiili. Muut osiot on merkitty paikkamerkeiksi tai esimerkeiksi.",
    githubNappi: "GitHub-profiili",
    selaaNappi: "Selaa töihin",
  },

  navigointi: [
    { id: "tietoa", numero: "01", teksti: "Tietoa" },
    { id: "osaaminen", numero: "02", teksti: "Osaaminen" },
    { id: "tyot", numero: "03", teksti: "Työt" },
    { id: "yhteys", numero: "04", teksti: "Yhteys" },
  ],

  tietoa: {
    otsikko: "Tietoa",
    numero: "01",
    merkinta: "Paikkamerkki",
    avaus: "Oma esittely lisätään tähän.",
    kappaleet: [
      "Tässä ei vielä ole kuvausta tekijästä. Teksti on neutraali paikkamerkki, kunnes se korvataan itse kirjoitetulla esittelyllä.",
    ],
    muokkaus: "Muokkaa osiota tiedostossa js/sisalto.js.",
  },

  osaaminen: {
    otsikko: "Osaaminen",
    numero: "02",
    merkinta: "Paikkamerkki",
    johdanto:
      "Osaamisalueita ei ole vahvistettu. Alla olevat kohdat ovat paikkamerkkejä, eivät luetteloa taidoista.",
    kohdat: [
      {
        nimi: "Paikkamerkki A",
        kuvaus: "Korvaa tämä omalla kuvauksella tai poista kohta tiedostosta js/sisalto.js.",
      },
      {
        nimi: "Paikkamerkki B",
        kuvaus: "Korvaa tämä omalla kuvauksella tai poista kohta tiedostosta js/sisalto.js.",
      },
      {
        nimi: "Paikkamerkki C",
        kuvaus: "Korvaa tämä omalla kuvauksella tai poista kohta tiedostosta js/sisalto.js.",
      },
    ],
  },

  tyot: {
    otsikko: "Työt",
    numero: "03",
    merkinta: "Esimerkkejä",
    johdanto:
      "Kortit näyttävät, miten yksittäinen työ asettuu sivulle. Ne eivät ole luettelo tehdyistä projekteista.",
    nayta: "Näytä kuvaus",
    piilota: "Piilota kuvaus",
    esimerkkiMerkinta: "Esimerkki · ei oikea projekti",
    eiLinkkia: "Linkkiä ei ole lisätty.",
    tunnisteOtsikko: "Tunnisteet",
    projektit: [
      {
        onEsimerkki: true,
        nimi: "Esimerkkiprojekti 1",
        tiivis: "Mallikortti leveänä nostona. Ei oikea projekti.",
        kuvaus:
          "Kortti näyttää esimerkkiasettelun: otsikon, lyhyen kuvauksen, tunnisteet ja valinnaisen linkin. Korvaa sisältö omalla työllä ja aseta onEsimerkki arvoksi false vasta, kun tiedot ovat oikein.",
        tunnisteet: ["esimerkki"],
        linkki: "",
        linkinTeksti: "",
        motiivi: "kaari",
        savy: ["#12352f", "#9af0d0"],
      },
      {
        onEsimerkki: true,
        nimi: "Esimerkkiprojekti 2",
        tiivis: "Toinen mallikortti. Ei oikea projekti.",
        kuvaus:
          "Tähän tulee pidempi kuvaus, kun kortin paikalle vaihtaa oikean työn. Tyhjä linkki-kenttä ei piirrä painiketta eikä osoitetta.",
        tunnisteet: ["esimerkki"],
        linkki: "",
        linkinTeksti: "",
        motiivi: "viiva",
        savy: ["#10243a", "#9fd4ff"],
      },
      {
        onEsimerkki: true,
        nimi: "Esimerkkiprojekti 3",
        tiivis: "Kolmas mallikortti. Ei oikea projekti.",
        kuvaus:
          "Kolmas esimerkki käyttää eri sävyä ja kuviota, jotta kortit erottuvat toisistaan ennen oman sisällön lisäämistä.",
        tunnisteet: ["esimerkki"],
        linkki: "",
        linkinTeksti: "",
        motiivi: "piste",
        savy: ["#2a2116", "#e2b56a"],
      },
    ],
  },

  yhteys: {
    otsikko: "Yhteys",
    numero: "04",
    merkinta: "Kanavat",
    johdanto:
      "Sivulla ei ole yhteydenottolomaketta. Näytöllä on vain ne kanavat, jotka on oikeasti annettu. Muita osoitteita ei ole keksitty.",
    github: {
      osoite: "https://github.com/jokkewedsf",
      teksti: "github.com/jokkewedsf",
      navTeksti: "GitHub",
      selite: "Vahvistettu profiili. Avautuu uuteen välilehteen.",
    },
    sahkopostiOtsikko: "Sähköposti",
    sahkoposti: "",
    sahkopostiTyhja: "Ei vielä lisätty",
    sahkopostiSelite:
      "Paikkamerkki. Kenttä ei ole linkki, ennen kuin osoite lisätään tiedostoon js/sisalto.js.",
    muutOtsikko: "Muut kanavat",
    muutTyhja: "Muita yhteyskanavia ei ole lisätty.",
    muut: [],
  },

  alatunniste: {
    kuvaus: "Henkilökohtainen sivu",
    muokkaus: "Sisältö muokataan tiedostossa js/sisalto.js.",
    ylos: "Takaisin ylös",
  },
};
