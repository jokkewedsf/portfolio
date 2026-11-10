/**
 * SIVUN SISÄLTÖ
 * -------------
 * Tekstit ovat kahdella kielellä: kielet.fi ja kielet.en.
 * Muokkaa molempia, kun vaihdat sanomaa. Älä lisää lukuja, asiakkaita,
 * tutkintoja tai järjestelmäkäyttöönottoja, joita lähde ei kerro.
 *
 * Sähköpostia ei ole vahvistettu. Jätä sahkoposti tyhjäksi.
 */
window.SIVUN_SISALTO = {
  etunimi: "Joakim",
  sukunimi: "Rydenfelt",
  katalogi: [{ id: "chatbot", polku: "ratkaisut/chatbot/" }],

  kielet: {
    fi: {
      paikka: "",
      nykyinenRooli: "Sales Team Lead",
      tyonantaja: "Webman Oy",
      kuvaus:
        "Joakim Rydenfelt. B2B-myynti, asiakkuudet ja tiimit. HTML-sivut ja demot on tehty itse.",

      ui: {
        ohitus: "Siirry sisältöön",
        avaaValikko: "Avaa valikko",
        suljeValikko: "Sulje valikko",
        uusiValilehti: "avautuu uuteen välilehteen",
        kieli: "Kieli",
        navAria: "Sivun osiot",
      },

      hero: {
        ylateksti: "Webman Oy · Sales Team Lead",
        otsikko: "Johdan myyntiä ja asiakkuuksia. Sivut rakennan itse.",
        ingressi:
          "B2B-myynti, käyttöönotto ja tiimin tapa toimia. Tämän sivuston, Aulan sivun ja chatbot-demon olen koonnut HTML:llä, CSS:llä ja JavaScriptillä. Ne ovat omia esimerkkejä, eivät asiakastoimituksia.",
        focusLabel: "Mitä tästä näkee",
        focus: ["B2B-myynti ja asiakkuus", "Tiimin käynnistys", "HTML-sivut ja demot"],
        huomautus: "",
        linkedinNappi: "LinkedIn",
        selaaNappi: "Katso ratkaisut",
      },

      navigointi: [
        { id: "tietoa", numero: "01", teksti: "Tietoa" },
        { id: "osaaminen", numero: "02", teksti: "Osaaminen" },
        { id: "tyot", numero: "03", teksti: "Työ" },
        { id: "ratkaisut", numero: "04", teksti: "Ratkaisut" },
        { id: "erp", numero: "05", teksti: "Polku" },
        { id: "taustat", numero: "06", teksti: "Tausta" },
        { id: "yhteys", numero: "07", teksti: "Yhteys" },
      ],

      tietoa: {
        otsikko: "Tietoa",
        numero: "01",
        merkinta: "",
        avaus: "Palkkaa kaupalliseen työhön. Sivun voit myös katsoa tästä.",
        kappaleet: [
          "Webman Oy:ssä johdan B2B-myyntiä, SaaS-kasvua ja toimipisteen käynnistystä. Aiemmin asiakasmenestys ja markkinointi JCADilla sekä myynti ja sivut Fissionilla. Centrian tietojenkäsittelyn opinnot ovat kesken, eivät valmis tutkinto.",
          "HTML-esimerkit ovat tämä sivu, Aulan oma sivu ja paikallinen chatbot-demo. En rakenna ERP:tä enkä taustajärjestelmiä. Valmennus on kulkenut mukana vuodesta 2013.",
        ],
        muokkaus: "",
      },

      osaaminen: {
        otsikko: "Osaaminen",
        numero: "02",
        merkinta: "",
        johdanto: "Kolme ensimmäistä ovat kaupallista työtä. Neljäs on se, minkä olen itse koonnut selaimeen.",
        kohdat: [
          {
            nimi: "Kaupallinen kasvu",
            kuvaus:
              "Strategiasta asiakasmenestykseen: myyntiputki, konsultoiva myynti, käyttöönotto ja asiakkuuden jatkuminen. Käytännön kokemus SaaS-kasvusta, Jobin asiakassyklistä ja urakoinnin tarjous- ja asiakastyöstä.",
          },
          {
            nimi: "Tiimit ja toimintamalli",
            kuvaus:
              "Toimipisteen käynnistäminen, rekrytointi sekä myynnin ja asiakasmenestyksen johtaminen. Kokemus siitä, miten paikallinen tiimi ja yhteinen tapa tehdä työtä syntyvät.",
          },
          {
            nimi: "CRM, ERP ja työnkulku",
            kuvaus:
              "CRM ja ERP ovat työkaluja myynnissä, projekteissa, tunneissa ja laskutuksessa. Alla oleva tunneli on kuvitus tästä ketjusta. En ole rakentanut järjestelmää.",
          },
          {
            nimi: "HTML-kokonaisuudet",
            kuvaus:
              "Tämä sivu, Aulan sivu ja chatbot-demo on HTML, CSS ja JavaScript. Ne ovat omia esimerkkejä. Asiakastoimitusta tai tuotantopalvelua niistä ei väitetä.",
          },
        ],
      },

      erp: {
        otsikko: "Toiminnanohjaus",
        numero: "05",
        johdanto:
          "Kuvitus kaupallisesta ketjusta, ei järjestelmä jonka olisin rakentanut tai ottanut käyttöön. Vieritys vain näyttää vaiheet.",
        vaiheet: [
          { id: "asiakkaat", nimi: "Asiakkaat" },
          { id: "dokumentit", nimi: "Dokumentit" },
          { id: "tarjouspyynnot", nimi: "Tarjouspyynnöt" },
          { id: "myynti", nimi: "Myynti" },
          { id: "crm", nimi: "CRM" },
          { id: "projektit", nimi: "Projektit" },
          { id: "tilaukset", nimi: "Tilaukset" },
          { id: "varasto", nimi: "Varasto" },
          { id: "hallinta", nimi: "Hallinta" },
          { id: "integraatiot", nimi: "Integraatiot" },
          { id: "laskutus", nimi: "Laskutus" },
          { id: "raportointi", nimi: "Raportointi" },
        ],
      },

      ratkaisut: {
        otsikko: "Ratkaisut",
        numero: "04",
        johdanto: "Myytävä ratkaisu omalla sivullaan. Demoa voi kokeilla tässä. Mukana on toistaiseksi yksi tuote.",
        tutustu: "Tutustu ratkaisuun",
        kokeile: "Kokeile demoa",
        demoOtsikko: "Kokeile demoa",
      },

      chatbot: {
        ylateksti: "Asiakaspalvelu",
        ingressi: "Vastaanotto, joka vastaa yrityksen omiin kysymyksiin ja sanoo suoraan, kun tietopohja ei riitä.",
        arvo: "Kävijä saa vastauksen yleisiin asioihin heti. Ihminen tarvitaan vasta, kun sovittu aineisto ei ratkaise kysymystä.",
        ongelmaOtsikko: "Mihin tämä vastaa",
        ongelmat: [
          { nimi: "Samat kysymykset toistuvat", teksti: "Aukiolo, sijainti ja palvelut kysytään uudelleen. Vastaus voi olla sivulla ilman, että jokainen viesti jää jonoon." },
          { nimi: "Raja pidetään näkyvänä", teksti: "Kun vastausta ei ole, se sanotaan. Ihmisen koppi on osa ratkaisua, ei piilotettu lupaus." }
        ],
        kykyOtsikko: "Mitä siihen kuuluu",
        kyvyt: [
          { nimi: "Tietopohja", teksti: "Vastaukset tulevat sovituista kysymyksistä ja vastauksista. Tässä demossa pohja on kuvitteellinen.", tila: "Näkyy demossa" },
          { nimi: "Kokeiltava upotus", teksti: "Kävijä voi kysyä sivulla ja nähdä osuman, tuntemattoman kysymyksen ja simuloidun ohjauksen.", tila: "Näkyy demossa" },
          { nimi: "Oma aineisto ja live-malli", teksti: "Yrityksen tietojen tuonti ja elävä kielimalli kuuluvat sovittuun toteutukseen. Ne eivät ole tässä demossa.", tila: "Sovitaan toteutuksessa" },
          { nimi: "Ihmisen kanava ja CRM", teksti: "Ohjaus oikealle ihmiselle tai CRM-järjestelmään tehdään vain, jos se sovitaan. Demo ei lähetä viestiä.", tila: "Sovitaan toteutuksessa" }
        ],
        toimintaOtsikko: "Miten se toimii",
        toiminta: [
          "Kävijä kirjoittaa kysymyksen sivulla.",
          "Jos kysymys osuu tietopohjaan, vastaus näytetään siitä.",
          "Jos ei osu tai kävijä pyytää ihmistä, näytetään simuloidut yhteystiedot. Viestiä ei lähetetä."
        ],
        rajaOtsikko: "Mitä demo ei ole",
        rajat: [
          "Ei live-tekoälyä eikä jatkuvaa palvelua.",
          "Ei tallennusta, maksua eikä varausta.",
          "Pohjolan Hammas ei ole asiakas eikä referenssi.",
          "Hintaa tai tuloksia ei ilmoiteta, koska niitä ei ole."
        ],
        ctaOtsikko: "Keskustellaan toteutuksesta",
        cta: "Jos tällainen vastaanotto sopii, jatketaan LinkedInissä. Sivulla ei ole lomaketta eikä tilausta.",
        takaisin: "Takaisin portfolioon"
      },

      aula: {
        otsikko: "Simuloitu vastaanotto",
        numero: "04",
        johdanto:
          "Aula on työnimi simuloidulle vastaanotolle. Pohjolan Hammas on kuvitteellinen esimerkki, ei asiakas.",
        tuote: "Aula",
        huom: "työnimi",
        yritys: "Pohjolan Hammas",
        ala: "Hammaslääkäri",
        kaupunki: "Helsinki",
        tervehdys:
          "Hei, olen Pohjolan Hampaan esimerkkivastaanotto. Voin vastata vain tämän tietopohjan kysymyksiin.",
        profiili: {
          summary: "Pohjolan Hammas on kuvitteellinen hammaslääkäriasema Helsingissä. Tämä ei ole sivuston omistajan palvelu eikä asiakasreferenssi.",
          services: "Hammastarkastus, paikkaus ja särkyvastaanotto. Hammasimplantteja ei tehdä.",
          address: "Esimerkkikatu 12, 00100 Helsinki"
        },
        ukk: [
          { q: "Miten varaan ajan?", a: "Tässä esimerkissä ajanvaraus kuvataan puhelimitse. Demo ei tee varausta eikä yhdistä oikeaan vastaanottoon." },
          { q: "Mitä tarkastus maksaa?", a: "Kuvitteellisessa hinnastossa hammastarkastus on 75 €. Summa on esimerkkiaineistoa, eikä sitä laskuteta." },
          { q: "Missä vastaanotto sijaitsee?", a: "Esimerkkivastaanotto sijaitsee osoitteessa Esimerkkikatu 12, 00100 Helsinki." }
        ],
        yhteys: {
          email: "vastaanotto@example.com",
          phone: "puhelin vain tekstinä",
          hours: "ma–to 8–18, pe 8–15",
          fallback: "Tämä on simuloitu ohjaus. Demoon kirjoitettua viestiä ei lähetetä eikä tallenneta."
        },
        ui: {
          title: "Esimerkki asiakaspalvelusta",
          demoLabel: "Interaktiivinen demo – simuloidut vastaukset",
          reset: "Tyhjennä",
          sampleNote: "",
          simulatedNote: "Simuloitu vastaus. Ei tekoälyä, verkkolähetystä eikä tallennusta. Älä kirjoita henkilötietoja.",
          privacy: "",
          messageLabel: "Kysymys esimerkkiyritykselle",
          placeholder: "Kysy esimerkkiyritykseltä…",
          send: "Lähetä",
          visitor: "Vierailija",
          greetingBadge: "Asetettu tervehdys",
          answerBadge: "Simuloitu vastaus",
          sourcePrefix: "Lähde: ",
          notAi: "Ei tekoälyn tuottama",
          empty: "Kirjoita viesti.",
          humanLead: "Tämä on simuloitu ohjaus ihmiselle. Oikeaa yhteydenottoa ei tapahdu.",
          fallbackLead: "En löydä tähän vastausta tämän esimerkin tietopohjasta.",
          phone: "Puhelin: ",
          email: "Sähköposti: ",
          hours: "Aukiolo: ",
          humanNote: "Viestiä ei lähetetä eikä tallenneta.",
          greetingSource: "Asetettu tervehdys, ei tekoälyn tuottama",
          humanSource: "Esimerkin yhteystiedot",
          aria: "simuloitu asiakaspalveludemo"
        }
      },

      tyot: {
        otsikko: "Työ",
        numero: "03",
        merkinta: "",
        johdanto: "Konkreettisia vastuita myynnin, asiakkuuksien ja markkinoinnin parissa. Kortit kuvaavat rooleja, eivät erillisiä asiakastoimeksiantoja.",
        nayta: "Näytä kuvaus",
        piilota: "Piilota kuvaus",
        esimerkkiMerkinta: "Esimerkki · ei oikea projekti",
        eiLinkkia: "Linkkiä ei ole lisätty.",
        tunnisteOtsikko: "Painotukset",
        projektit: [
          {
            onEsimerkki: false,
            nimi: "Toimipiste ja SaaS-kasvu",
            organisaatio: "Webman Oy",
            rooli: "Sales Team Lead",
            aika: "2026",
            paikka: "",
            tiivis: "Toimipisteen käynnistäminen, rekrytointi ja SaaS-liiketoiminnan kasvu.",
            kuvaus:
              "Rooli kokoaa strategisen myynnin, asiakasmenestyksen ja myynnin johtamisen. Työ on paikallisen toiminnan ja kasvun rakentamista.",
            tunnisteet: ["Myynti", "Tiimi", "SaaS"],
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
            aika: "2026",
            paikka: "Etä",
            tiivis: "Konsultoiva myynti ja käyttöönotto kenttäpalveluyrityksille.",
            kuvaus:
              "Jobi on Webmanin sovellus, joka kokoaa projektit, tunnit ja laskutuksen. Vastuullani oli asiakkaan matka myynnistä käyttöönottoon rakentamisen, LVI:n, kiinteistönhuollon ja teknisten palveluiden yrityksissä.",
            tunnisteet: ["Asiakkuus", "Käyttöönotto", "Prosessit"],
            linkki: "",
            linkinTeksti: "",
            motiivi: "viiva",
            savy: ["#10243a", "#9fd4ff"],
          },
          {
            onEsimerkki: false,
            nimi: "Asiakasmenestys ja markkinointi",
            organisaatio: "JCAD",
            rooli: "Customer Success ja markkinointi",
            aika: "2022–2026",
            paikka: "Suomi ja Ruotsi",
            tiivis: "Tarjoustyön arvo asiakkaalle sekä kampanjat Suomessa ja Ruotsissa.",
            kuvaus:
              "Asiakasmenestyksessä autoin urakoivia rakennusliikkeitä määrälaskennassa ja tarjouskilpailuissa. Markkinoinnissa suunnittelin ja toteutin kampanjoita, raportointia, sivuja ja tapahtumia.",
            tunnisteet: ["Asiakasmenestys", "Markkinointi", "Kampanjat"],
            linkki: "",
            linkinTeksti: "",
            motiivi: "kaari",
            savy: ["#143028", "#7ddec0"],
          },
          {
            onEsimerkki: false,
            nimi: "Markkinointi ja myynti yrittäjänä",
            organisaatio: "Fission Oy",
            rooli: "Perustajaosakas",
            aika: "2024–2026",
            paikka: "Yrittäjyys",
            tiivis: "Konsultointi, visuaalinen ilme, sivut ja myyntiputket.",
            kuvaus:
              "Rakensin yrityksille markkinoinnin ja myynnin kokonaisuuksia: ilme, sivut ja putki, jota voi kasvattaa.",
            tunnisteet: ["Yrittäjyys", "Brändi", "Myyntiputki"],
            linkki: "",
            linkinTeksti: "",
            motiivi: "piste",
            savy: ["#2a2116", "#e2b56a"],
          },
        ],
      },

      tausta: {
        otsikko: "Tausta",
        numero: "06",
        johdanto: "Valmennus, yrittäjyys ja opinnot kaupallisen työn rinnalla.",
        kohdat: [
          {
            nimi: "Kamppailu-urheilu",
            meta: "Urheilija ja valmentaja vuodesta 2013",
            teksti: "Kamppailu-urheilun valmennus on pitkäjänteistä ihmisten johtamista.",
          },
          {
            nimi: "BULI",
            meta: "Perustajaosakas",
            teksti: "Vaatebrändi. Yrittäjyys, jossa ilme ja tuote kulkevat yhdessä.",
          },
          {
            nimi: "Opinnot",
            meta: "Centria · opinnot käynnissä 2026–2029",
            teksti:
              "Tietojenkäsittelyn tradenomiopinnot ovat käynnissä. Aiemmin Oamkissa Construction Management -opintoja. Elements of AI, Helsingin yliopisto ja MinnaLearn.",
          },
          {
            nimi: "Puolustusvoimat",
            meta: "Kurssit ja projekti",
            teksti: "NATO- ja YK-kiertokurssit 2018 ja 2023. Head of Welfare -projekti 2023–2024.",
          },
        ],
      },

      yhteys: {
        otsikko: "Yhteys",
        numero: "07",
        merkinta: "",
        johdanto: "Seuraava askel on LinkedIn. GitHubissa on tämän sivuston lähdekoodi.",
        linkedin: {
          osoite: "https://www.linkedin.com/in/joakim-rydenfelt",
          teksti: "linkedin.com/in/joakim-rydenfelt",
          navTeksti: "LinkedIn",
          selite: "Profiili",
        },
        github: {
          osoite: "https://github.com/jokkewedsf",
          teksti: "github.com/jokkewedsf",
          navTeksti: "GitHub",
          selite: "Profiili",
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
        kuvaus: "Webman Oy · Sales Team Lead",
        muokkaus: "",
        ylos: "Takaisin ylös",
      },
    },

    en: {
      paikka: "",
      nykyinenRooli: "Sales Team Lead",
      tyonantaja: "Webman Oy",
      kuvaus:
        "Joakim Rydenfelt. B2B sales, customer work and teams. The HTML pages and demos are built by hand.",

      ui: {
        ohitus: "Skip to content",
        avaaValikko: "Open menu",
        suljeValikko: "Close menu",
        uusiValilehti: "opens in a new tab",
        kieli: "Language",
        navAria: "Page sections",
      },

      hero: {
        ylateksti: "Webman Oy · Sales Team Lead",
        otsikko: "I lead sales and customer work. I build the pages myself.",
        ingressi:
          "B2B sales, onboarding and how a team works. This site, the Aula page and the chatbot demo are HTML, CSS and JavaScript I assembled. They are my examples, not customer deployments.",
        focusLabel: "What you can see",
        focus: ["B2B sales and customers", "Starting a team", "HTML pages and demos"],
        huomautus: "",
        linkedinNappi: "LinkedIn",
        selaaNappi: "See the solutions",
      },

      navigointi: [
        { id: "tietoa", numero: "01", teksti: "About" },
        { id: "osaaminen", numero: "02", teksti: "Capability" },
        { id: "tyot", numero: "03", teksti: "Work" },
        { id: "ratkaisut", numero: "04", teksti: "Solutions" },
        { id: "erp", numero: "05", teksti: "Path" },
        { id: "taustat", numero: "06", teksti: "Background" },
        { id: "yhteys", numero: "07", teksti: "Contact" },
      ],

      tietoa: {
        otsikko: "About",
        numero: "01",
        merkinta: "",
        avaus: "Hire for commercial work. The pages are here to look at.",
        kappaleet: [
          "At Webman Oy I lead B2B sales, SaaS growth and the opening of an office. Before that, customer success and marketing at JCAD, and sales and sites at Fission. Computer science studies at Centria are in progress, not a completed degree.",
          "The HTML examples are this site, the Aula page and the local chatbot demo. I do not build an ERP or a backend. Coaching has been part of this since 2013.",
        ],
        muokkaus: "",
      },

      osaaminen: {
        otsikko: "Capability",
        numero: "02",
        merkinta: "",
        johdanto: "The first three are commercial work. The fourth is what I have actually assembled in the browser.",
        kohdat: [
          {
            nimi: "Commercial growth",
            kuvaus:
              "From strategy to customer success: pipeline, consultative sales, onboarding and the relationship that follows. Hands-on work in SaaS growth, the Jobi customer cycle, and bid and customer work in contracting.",
          },
          {
            nimi: "Teams and the operating model",
            kuvaus:
              "Opening an office, hiring, and leading sales and customer success. Experience in how a local team and a shared way of working take shape.",
          },
          {
            nimi: "CRM, ERP and the workflow",
            kuvaus:
              "CRM and ERP are tools in sales, projects, hours and invoicing. The tunnel below illustrates that chain. I did not build the system.",
          },
          {
            nimi: "HTML builds",
            kuvaus:
              "This page, the Aula page and the chatbot demo are HTML, CSS and JavaScript. They are my examples. They are not a customer deployment or a production service.",
          },
        ],
      },

      erp: {
        otsikko: "Operations",
        numero: "05",
        johdanto:
          "An illustration of a commercial chain, not a system I built or deployed. Scrolling only reveals the stages.",
        vaiheet: [
          { id: "asiakkaat", nimi: "Customers" },
          { id: "dokumentit", nimi: "Documents" },
          { id: "tarjouspyynnot", nimi: "Quote requests" },
          { id: "myynti", nimi: "Sales" },
          { id: "crm", nimi: "CRM" },
          { id: "projektit", nimi: "Projects" },
          { id: "tilaukset", nimi: "Orders" },
          { id: "varasto", nimi: "Inventory" },
          { id: "hallinta", nimi: "Management" },
          { id: "integraatiot", nimi: "Integrations" },
          { id: "laskutus", nimi: "Invoicing" },
          { id: "raportointi", nimi: "Reporting" },
        ],
      },

      ratkaisut: {
        otsikko: "Solutions",
        numero: "04",
        johdanto: "A solution you can buy, on its own page. The demo can be tried here. There is one product so far.",
        tutustu: "Explore solution",
        kokeile: "Try demo",
        demoOtsikko: "Try the demo",
      },

      chatbot: {
        ylateksti: "Customer service",
        ingressi: "A front desk that answers a company’s own questions and says plainly when the knowledge base is not enough.",
        arvo: "A visitor gets an answer to common questions immediately. A person is needed only when the agreed material does not resolve the question.",
        ongelmaOtsikko: "What this is for",
        ongelmat: [
          { nimi: "The same questions repeat", teksti: "Hours, location and services get asked again. The answer can sit on the page instead of every message waiting in a queue." },
          { nimi: "The limit stays visible", teksti: "When there is no answer, the page says so. A handoff to a person is part of the solution, not a hidden promise." }
        ],
        kykyOtsikko: "What it includes",
        kyvyt: [
          { nimi: "Knowledge base", teksti: "Answers come from agreed questions and replies. In this demo the base is fictional.", tila: "In this demo" },
          { nimi: "Tryable embed", teksti: "A visitor can ask on the page and see a match, an unknown question and a simulated handoff.", tila: "In this demo" },
          { nimi: "Own material and a live model", teksti: "Bringing in a company’s material and a live language model belong to an agreed implementation. They are not in this demo.", tila: "Agreed in implementation" },
          { nimi: "A human channel and CRM", teksti: "Routing to a person or a CRM is built only if it is agreed. The demo does not send the message.", tila: "Agreed in implementation" }
        ],
        toimintaOtsikko: "How it works",
        toiminta: [
          "The visitor types a question on the page.",
          "If it matches the knowledge base, the answer is shown from there.",
          "If it does not match, or the visitor asks for a person, sample contact details are shown. The message is not sent."
        ],
        rajaOtsikko: "What the demo is not",
        rajat: [
          "Not live AI and not an always-on service.",
          "No storage, payment or booking.",
          "Pohjolan Hammas is not a client or a reference.",
          "No price or results are stated, because there are none."
        ],
        ctaOtsikko: "Talk about an implementation",
        cta: "If this kind of front desk fits, the conversation continues on LinkedIn. There is no form and no order on this page.",
        takaisin: "Back to the portfolio"
      },

      aula: {
        otsikko: "Simulated front desk",
        numero: "04",
        johdanto:
          "Aula is a working title for a simulated front desk. Pohjolan Hammas is a fictional example, not a client.",
        tuote: "Aula",
        huom: "working title",
        yritys: "Pohjolan Hammas",
        ala: "Dental clinic",
        kaupunki: "Helsinki",
        tervehdys:
          "Hello, I am the sample front desk for Pohjolan Hammas. I can answer only from this knowledge base.",
        profiili: {
          summary: "Pohjolan Hammas is a fictional dental clinic in Helsinki. This is sample material, not a service or client of the site owner.",
          services: "Check-up, filling and emergency visit. Implants are not offered.",
          address: "Example Street 12, 00100 Helsinki"
        },
        ukk: [
          { q: "How do I book a time?", a: "In this example, booking is described as a phone conversation. The demo does not make a booking or reach a real clinic." },
          { q: "What does a check-up cost?", a: "In the fictional price list a check-up is 75 €. The amount is sample data and is not charged." },
          { q: "Where is the clinic?", a: "The sample clinic is at Example Street 12, 00100 Helsinki." }
        ],
        yhteys: {
          email: "reception@example.com",
          phone: "phone shown as text only",
          hours: "Mon–Thu 8–18, Fri 8–15",
          fallback: "This is a simulated handoff. A message typed here is not sent or stored."
        },
        ui: {
          title: "Sample customer service",
          demoLabel: "Interactive demo – simulated responses",
          reset: "Reset",
          sampleNote: "",
          simulatedNote: "Simulated reply. No AI, no network send and no storage. Do not enter personal data.",
          privacy: "",
          messageLabel: "Question for the sample business",
          placeholder: "Ask the sample business…",
          send: "Send",
          visitor: "Visitor",
          greetingBadge: "Set greeting",
          answerBadge: "Simulated reply",
          sourcePrefix: "Source: ",
          notAi: "Not produced by AI",
          empty: "Write a message.",
          humanLead: "This is a simulated handoff to a person. No real contact is made.",
          fallbackLead: "I cannot find an answer in this sample knowledge base.",
          phone: "Phone: ",
          email: "Email: ",
          hours: "Hours: ",
          humanNote: "The message is not sent or stored.",
          greetingSource: "Set greeting, not produced by AI",
          humanSource: "Sample contact details",
          aria: "simulated customer-service demo"
        }
      },

      tyot: {
        otsikko: "Work",
        numero: "03",
        merkinta: "",
        johdanto: "Concrete responsibilities across sales, customer success and marketing. These cards describe roles, not standalone client engagements.",
        nayta: "Show description",
        piilota: "Hide description",
        esimerkkiMerkinta: "Example · not a real project",
        eiLinkkia: "No link has been added.",
        tunnisteOtsikko: "Focus",
        projektit: [
          {
            onEsimerkki: false,
            nimi: "Office and SaaS growth",
            organisaatio: "Webman Oy",
            rooli: "Sales Team Lead",
            aika: "2026",
            paikka: "",
            tiivis: "Opening the office, hiring and growing the SaaS business.",
            kuvaus:
              "The role brings strategic sales, customer success and sales leadership together. The work is building a local operation and its growth.",
            tunnisteet: ["Sales", "Team", "SaaS"],
            linkki: "",
            linkinTeksti: "",
            motiivi: "kaari",
            savy: ["#12352f", "#9af0d0"],
          },
          {
            onEsimerkki: false,
            nimi: "The Jobi customer cycle",
            organisaatio: "Webman Oy",
            rooli: "Client Solutions Specialist",
            aika: "2026",
            paikka: "Remote",
            tiivis: "Consultative sales and onboarding for field-service companies.",
            kuvaus:
              "Jobi is Webman’s application for projects, hours and invoicing. I owned the customer journey from sale to onboarding for companies in construction, HVAC, property maintenance and technical services.",
            tunnisteet: ["Customers", "Onboarding", "Process"],
            linkki: "",
            linkinTeksti: "",
            motiivi: "viiva",
            savy: ["#10243a", "#9fd4ff"],
          },
          {
            onEsimerkki: false,
            nimi: "Customer success and marketing",
            organisaatio: "JCAD",
            rooli: "Customer success and marketing",
            aika: "2022–2026",
            paikka: "Finland and Sweden",
            tiivis: "The value of bidding work for the customer, and campaigns in Finland and Sweden.",
            kuvaus:
              "In customer success I helped contracting firms with quantity takeoff and competitive bids. In marketing I planned and ran campaigns, reporting, the website and events.",
            tunnisteet: ["Customer success", "Marketing", "Campaigns"],
            linkki: "",
            linkinTeksti: "",
            motiivi: "kaari",
            savy: ["#143028", "#7ddec0"],
          },
          {
            onEsimerkki: false,
            nimi: "Marketing and sales as a founder",
            organisaatio: "Fission Oy",
            rooli: "Co-founder",
            aika: "2024–2026",
            paikka: "Entrepreneurship",
            tiivis: "Consulting, visual identity, websites and sales pipelines.",
            kuvaus:
              "I built marketing and sales wholes for companies: identity, sites and a pipeline that can scale.",
            tunnisteet: ["Founder", "Brand", "Pipeline"],
            linkki: "",
            linkinTeksti: "",
            motiivi: "piste",
            savy: ["#2a2116", "#e2b56a"],
          },
        ],
      },

      tausta: {
        otsikko: "Background",
        numero: "06",
        johdanto: "Coaching, entrepreneurship and studies alongside the commercial work.",
        kohdat: [
          {
            nimi: "Combat sports",
            meta: "Athlete and coach since 2013",
            teksti: "Coaching in combat sports is long-term leadership of people.",
          },
          {
            nimi: "BULI",
            meta: "Co-founder",
            teksti: "A clothing brand. Entrepreneurship where identity and product move together.",
          },
          {
            nimi: "Studies",
            meta: "Centria · studies in progress, 2026–2029",
            teksti:
              "Bachelor of Business Administration studies in computer science are in progress. Earlier Construction Management studies at Oamk. Elements of AI, University of Helsinki and MinnaLearn.",
          },
          {
            nimi: "Finnish Defence Forces",
            meta: "Courses and a project",
            teksti: "NATO and UN rotation courses in 2018 and 2023. Head of Welfare project, 2023–2024.",
          },
        ],
      },

      yhteys: {
        otsikko: "Contact",
        numero: "07",
        merkinta: "",
        johdanto: "The next step is LinkedIn. The source of this site is on GitHub.",
        linkedin: {
          osoite: "https://www.linkedin.com/in/joakim-rydenfelt",
          teksti: "linkedin.com/in/joakim-rydenfelt",
          navTeksti: "LinkedIn",
          selite: "Profile",
        },
        github: {
          osoite: "https://github.com/jokkewedsf",
          teksti: "github.com/jokkewedsf",
          navTeksti: "GitHub",
          selite: "Profile",
        },
        sahkopostiOtsikko: "Email",
        sahkoposti: "",
        sahkopostiTyhja: "",
        sahkopostiSelite: "",
        muutOtsikko: "Other channels",
        muutTyhja: "",
        muut: [],
      },

      alatunniste: {
        kuvaus: "Webman Oy · Sales Team Lead",
        muokkaus: "",
        ylos: "Back to top",
      },
    },
  },
};
