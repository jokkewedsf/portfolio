/**
 * SIVUN SISÄLTÖ
 * -------------
 * Muokkaa tätä tiedostoa, kun vaihdat tekstejä tai yhteystietoja.
 * Älä lisää lukuja, tutkintoja, asiakkaita tai tuloksia, joita lähde ei kerro.
 *
 * Tyhjä merkkijono ("") ei piirrä linkkiä eikä paikkamerkkiriviä.
 * Projekti, jonka onEsimerkki ei ole täsmälleen false, näytetään esimerkkinä.
 *
 * Sähköpostia ei ole vahvistettu. Jätä sahkoposti tyhjäksi, kunnes osoite on oikea.
 * Esimerkki myöhempää osoitetta varten: nimi@example.com
 */
window.SIVUN_SISALTO = {
  etunimi: "Joakim",
  sukunimi: "Rydenfelt",
  paikka: "Oulu",
  nykyinenRooli: "Sales Team Lead",
  tyonantaja: "Webman Oy",
  kuvaus:
    "Joakim Rydenfelt, Oulu. Liiketoiminnan kasvattaja: B2B-myynti, markkinoinnin ja tiimien johtaminen, digitaaliset ratkaisut ja prosessien kehittäminen.",

  ui: {
    ohitus: "Siirry sisältöön",
    avaaValikko: "Avaa valikko",
    suljeValikko: "Sulje valikko",
    uusiValilehti: "avautuu uuteen välilehteen",
  },

  hero: {
    ylateksti: "Oulu",
    otsikko:
      "Liiketoiminnan kasvattaja | Projektien strateginen johtaminen, joka tuottaa tulosta | Kamppailu-urheiluvalmentaja",
    ingressi:
      "Kasvatan liiketoimintaa B2B-myynnillä, markkinoinnin ja tiimien johtamisella, digitaalisilla ratkaisuilla ja prosessien kehittämisellä.",
    huomautus: "",
    linkedinNappi: "LinkedIn",
    selaaNappi: "Selaa töihin",
  },

  navigointi: [
    { id: "tietoa", numero: "01", teksti: "Tietoa" },
    { id: "osaaminen", numero: "02", teksti: "Osaaminen" },
    { id: "erp", numero: "03", teksti: "Polku" },
    { id: "tyot", numero: "04", teksti: "Työt" },
    { id: "taustat", numero: "05", teksti: "Tausta" },
    { id: "yhteys", numero: "06", teksti: "Yhteys" },
  ],

  tietoa: {
    otsikko: "Tietoa",
    numero: "01",
    merkinta: "",
    avaus: "Rakennan ja kehitän myyntiputkea alusta loppuun.",
    kappaleet: [
      "Olen markkinoinnin ja myynnin johtaja. Työssäni painottuvat strateginen suunnittelu, digitaaliset ratkaisut ja tiimien johtaminen. Tällä hetkellä vastaan Webman Oy:ssä Oulun toimipisteen käynnistämisestä ja SaaS-liiketoiminnan kasvusta Sales Team Leadina.",
      "Kokemusta on kansainvälisestä projektityöstä sekä B2B-myynnin ja markkinoinnin prosesseista. Hahmotan kokonaisuuksia ja johdan työtä tuloksellisesti.",
      "Valmennus on työn rinnalla kulkeva puoli. Olen Kickboxing Team Oulun urheilija ja valmentaja tammikuusta 2013.",
    ],
    muokkaus: "",
  },

  osaaminen: {
    otsikko: "Osaaminen",
    numero: "02",
    merkinta: "",
    johdanto:
      "Profiilissa erikseen nostetut taidot ovat markkinointi, graafinen suunnittelu, johtaminen, digitaalinen markkinointi ja valokuvaus.",
    kohdat: [
      {
        nimi: "Myyntiputki ja B2B",
        kuvaus:
          "Myyntiputken rakentaminen alusta loppuun, sen optimointi sekä prosessien kehitys ja automatisointi.",
      },
      {
        nimi: "Markkinointistrategia",
        kuvaus:
          "Kampanjoista mittareihin: suunnittelu, toteutus, raportointi ja digitaalinen markkinointi.",
      },
      {
        nimi: "Tiimien johtaminen",
        kuvaus:
          "Tiimien rakentaminen ja kehittäminen sekä myynnin ja asiakasmenestyksen johtaminen.",
      },
      {
        nimi: "Digitaaliset ratkaisut",
        kuvaus:
          "Webflow, CRM-järjestelmät, myynnin työkalut ja ERP. Mukana myös graafinen suunnittelu ja verkkosivut.",
      },
    ],
  },

  erp: {
    otsikko: "Toiminnanohjaus",
    numero: "03",
    johdanto:
      "Havainnollistus ketjusta, jossa asiakas, tarjous ja toimitus kulkevat samassa polussa. ERP- ja CRM-työkalut ovat olleet osa myynnin ja prosessien työtä. Kuvio ei ole väite tietystä käyttöönotetusta järjestelmästä, asiakkaista tai tuloksista.",
    vaiheet: [
      { nimi: "Asiakkaat" },
      { nimi: "Dokumentit" },
      { nimi: "Tarjouspyynnöt" },
      { nimi: "Myynti" },
      { nimi: "CRM" },
      { nimi: "Projektit" },
      { nimi: "Tilaukset" },
      { nimi: "Varasto" },
      { nimi: "Hallinta" },
      { nimi: "Integraatiot" },
      { nimi: "Laskutus" },
      { nimi: "Raportointi" },
    ],
  },

  tyot: {
    otsikko: "Työt",
    numero: "04",
    merkinta: "",
    johdanto:
      "Valikoima rooleja Webmanilta, JCADilta ja Fissionilta. Kortit kuvaavat vastuita, eivät erillisiä asiakasprojekteja.",
    nayta: "Näytä kuvaus",
    piilota: "Piilota kuvaus",
    esimerkkiMerkinta: "Esimerkki · ei oikea projekti",
    eiLinkkia: "Linkkiä ei ole lisätty.",
    tunnisteOtsikko: "Painotukset",
    projektit: [
      {
        onEsimerkki: false,
        nimi: "Oulun toimipiste ja SaaS-kasvu",
        organisaatio: "Webman Oy",
        rooli: "Sales Team Lead",
        aika: "Elokuu 2026 – jatkuu",
        paikka: "Oulun seutu · kokoaikainen, hybridi",
        tiivis:
          "Oulun toimipisteen perustaminen ja käynnistäminen, paikallinen rekrytointi sekä SaaS-liiketoiminnan kasvu.",
        kuvaus:
          "Rooli yhdistää strategisen myynnin, asiakasmenestyksen ja myynnin johtamisen sekä niiden kehittämisen.",
        tunnisteet: ["B2B-myynti", "johtaminen", "SaaS"],
        linkki: "",
        linkinTeksti: "",
        motiivi: "kaari",
        savy: ["#12352f", "#9af0d0"],
      },
      {
        onEsimerkki: false,
        nimi: "Jobin asiakassykli",
        organisaatio: "Webman Oy",
        rooli: "Client Solutions Specialist",
        aika: "Helmikuu 2026 – elokuu 2026",
        paikka: "Porvoon seutu · kokoaikainen, etätyö",
        tiivis:
          "Jobi-työnohjaussovelluksen asiakassykli konsultoivasta myynnistä käyttöönottoon.",
        kuvaus:
          "Jobi on Webmanin sovellus. Se yhdistää kenttätyötä tekevien suomalaisten pk-yritysten projektit, tunnit ja laskutuksen ja korvaa manuaalisia prosesseja. Vastuullani olivat konsultoiva myynti ja käyttöönotot rakentamisen, LVI:n, kiinteistönhuollon ja teknisten palveluiden yrityksissä.",
        tunnisteet: ["käyttöönotto", "B2B-myynti", "prosessit"],
        linkki: "",
        linkinTeksti: "",
        motiivi: "viiva",
        savy: ["#10243a", "#9fd4ff"],
      },
      {
        onEsimerkki: false,
        nimi: "Konsultointi, sivut ja myyntiputket",
        organisaatio: "Fission Oy",
        rooli: "Perustajaosakas",
        aika: "Marraskuu 2024 – lokakuu 2026",
        paikka: "Yrittäjä",
        tiivis:
          "Markkinointi- ja myyntikonsultointia useille yrityksille.",
        kuvaus:
          "Palveluihin kuuluivat graafinen suunnittelu, verkkosivujen kehittäminen sekä myyntiputkien rakentaminen ja skaalauttaminen. Yksittäisiä toimeksiantoja ei ole eritelty.",
        tunnisteet: ["konsultointi", "verkkosivut", "myyntiputki"],
        linkki: "",
        linkinTeksti: "",
        motiivi: "piste",
        savy: ["#2a2116", "#e2b56a"],
      },
      {
        onEsimerkki: false,
        nimi: "Määrälaskenta ja tarjouskilpailut",
        organisaatio: "JCAD",
        rooli: "Customer Success Manager",
        aika: "Syyskuu 2024 – tammikuu 2026",
        paikka: "Oulu · kokoaikainen, hybridi",
        tiivis:
          "Asiakasmenestystä urakoiville rakennusliikkeille määrälaskennassa ja tarjouskilpailuissa.",
        kuvaus:
          "Autoin varmistamaan, että määrälaskenta oli tarkkaa ja että tarjouskilpailuissa voitiin keskittyä tarjousten voittamiseen. Työn ydin oli näyttää, miten yhteistyö JCADin kanssa muutti työskentelyä.",
        tunnisteet: ["asiakasmenestys", "rakentaminen"],
        linkki: "",
        linkinTeksti: "",
        motiivi: "kaari",
        savy: ["#143028", "#7ddec0"],
      },
      {
        onEsimerkki: false,
        nimi: "Kampanjat Suomessa ja Ruotsissa",
        organisaatio: "JCAD",
        rooli: "Marketing Specialist",
        aika: "Syyskuu 2022 – syyskuu 2024",
        paikka: "Suomi · kokoaikainen, hybridi",
        tiivis:
          "Markkinointikampanjoiden suunnittelu ja toteutus Suomessa ja Ruotsissa.",
        kuvaus:
          "Koordinoin kampanjoiden aikataulun ja budjetin. Päivitin yrityksen verkkosivuja ja sosiaalisen median tilejä, laadin kampanjaraportteja ja olin mukana tapahtumissa, messuilla ja webinaareissa.",
        tunnisteet: ["markkinointi", "raportointi", "tapahtumat"],
        linkki: "",
        linkinTeksti: "",
        motiivi: "viiva",
        savy: ["#1a2438", "#c9d6ee"],
      },
    ],
  },

  tausta: {
    otsikko: "Tausta",
    numero: "05",
    johdanto: "Opinnot, kurssit ja roolit, jotka kulkevat kaupallisen työn rinnalla.",
    kohdat: [
      {
        nimi: "Centria-ammattikorkeakoulu",
        meta: "2026–2029 · opinnot käynnissä",
        teksti:
          "Bachelor of Business Administration, Computer Science. Tutkinto ei ole valmis.",
      },
      {
        nimi: "Oulun ammattikorkeakoulu (Oamk)",
        meta: "Tammikuu 2022 – elokuu 2023 · School of Engineering",
        teksti:
          "Construction Management -opintoja. Suoritettua tutkintoa ei ole ilmoitettu.",
      },
      {
        nimi: "Elements of AI",
        meta: "Helsingin yliopisto ja MinnaLearn · myönnetty lokakuussa 2026",
        teksti: "Helsingin yliopiston ja MinnaLearnin verkkokurssi. Aiheena tekoäly.",
      },
      {
        nimi: "NATO & UN Rotation Courses",
        meta: "2018 ja 2023 · Puolustusvoimat",
        teksti: "Kurssit vuosina 2018 ja 2023.",
      },
      {
        nimi: "Head of Welfare",
        meta: "Elokuu 2023 – elokuu 2024 · Puolustusvoimat",
        teksti: "Projekti Puolustusvoimien yhteydessä. Tarkempaa kuvausta ei ole julkaistu.",
      },
      {
        nimi: "Kickboxing Team Oulu",
        meta: "Urheilija ja valmentaja · tammikuu 2013 – jatkuu",
        teksti:
          "Kamppailu-urheilun valmennus. Roolin taitoihin on merkitty myös brasilialainen jujutsu.",
      },
      {
        nimi: "BULI",
        meta: "Perustajaosakas · marraskuu 2021 – marraskuu 2025",
        teksti:
          "Vaatebrändin yrittäjyys. Julkinen esittely kuvaa intohimoa muodikkaiden ja laadukkaiden vaatteiden tekemiseen.",
      },
    ],
  },

  yhteys: {
    otsikko: "Yhteys",
    numero: "06",
    merkinta: "",
    johdanto: "Oulu. LinkedIn on suorin kanava. GitHub on mukana. Sähköpostiosoitetta ei ole julkaistu.",
    linkedin: {
      osoite: "https://www.linkedin.com/in/joakim-rydenfelt",
      teksti: "linkedin.com/in/joakim-rydenfelt",
      navTeksti: "LinkedIn",
      selite: "Profiili. Avautuu uuteen välilehteen.",
    },
    github: {
      osoite: "https://github.com/jokkewedsf",
      teksti: "github.com/jokkewedsf",
      navTeksti: "GitHub",
      selite: "Profiili. Avautuu uuteen välilehteen.",
    },
    sahkopostiOtsikko: "Sähköposti",
    sahkoposti: "",
    sahkopostiTyhja: "",
    sahkopostiSelite: "",
    muutOtsikko: "Muut kanavat",
    muutTyhja: "",
    muut: [],
  },

  alatunniste: {
    kuvaus: "Oulu",
    muokkaus: "",
    ylos: "Takaisin ylös",
  },
};
