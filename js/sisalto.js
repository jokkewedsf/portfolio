// Tyhjä, kunnes Cloudflare Worker on julkaistu. Älä laita avainta tähän.
window.JOAKIM_AI_ENDPOINT = "https://joakim-ai.jokkewedsf.workers.dev";

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
        "Joakim Rydenfelt. Ohjelmisto-osaamista johtamisen, myynnin ja ohjelmoinnin yhdistelmästä.",

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
        otsikko: "Ohjelmisto-osaamista johtamisen, myynnin ja ohjelmoinnin yhdistelmästä.",
        ingressi:
          "Johdan myyntiä ja tiimejä Webman Oy:ssä. Ohjelmointi näkyy sivuissa, jotka olen koonnut itse.",
        summa: 300000,
        luku: "Yli 300\u00A0000\u00A0€",
        lukuSelite: "SaaS-myyntiä vuonna 2026 (tilanne 11/2026)",
        opinnotNimi: "Centria-ammattikorkeakoulu",
        opinnotRivi: "Tradenomi (AMK), tietojenkäsittely · opinnot käynnissä 2026–2029",
        muotokuva: "Muotokuva Joakim Rydenfeltistä.",
        focusLabel: "Kolme pilaria",
        focus: ["Johtaminen", "Myynti", "Ohjelmointi"],
        huomautus: "",
        linkedinNappi: "Ota yhteyttä LinkedInissä",
        selaaNappi: "Katso työt",
      },

      keskustelu: {
        silma: "Tekoäly",
        otsikko: "Keskustelu",
        nimi: "Joakim",
        tila: "Tekoäly · vastaa omista tiedoista",
        avaa: "Avaa keskustelu",
        sulje: "Sulje keskustelu",
        tervehdys: "Kysy minulta mitä vain",
        tervehdysSulje: "Sulje tervehdys",
        merkinta:
          "Keskustele tekoäly-Joakimin kanssa — vastaukset tuottaa tekoäly Joakimin omien vastausten pohjalta",
        ehdotukset: [
          "Mitä osaat?",
          "Millaisia ratkaisuja teet?",
          "Miten saan sinuun yhteyden?",
          "Mitä olet tehnyt?",
        ],
        syote: "Kirjoita viesti",
        laheta: "Lähetä",
        kirjoittaa: "Kirjoittaa",
        avautuu: "Chat avautuu pian",
        linkedin: "Ota yhteyttä LinkedInissä",
        virhe: "Vastausta ei saatu juuri nyt. Voit ottaa yhteyttä LinkedInissä.",
        tietosuoja:
          "Viestit käsitellään tekoälypalvelussa vastauksen tuottamiseksi, niitä ei tallenneta sivustolle.",
        sina: "Sinä",
        joakim: "Tekoäly-Joakim",
        loki: "Keskustelu",
      },

      navigointi: [
        { id: "tietoa", numero: "01", teksti: "Tietoa" },
        { id: "valitut", numero: "02", teksti: "Työt" },
        { id: "tyot", numero: "03", teksti: "Kokemus" },
        { id: "ratkaisut", numero: "04", teksti: "Chat" },
        { id: "erp", numero: "05", teksti: "Polku" },
        { id: "taustat", numero: "06", teksti: "Tausta" },
        { id: "yhteys", numero: "07", teksti: "Yhteys" },
      ],

      tietoa: {
        otsikko: "Tietoa",
        numero: "01",
        merkinta: "",
        avaus: "Ohjelmisto-osaaminen rakentuu johtamisesta, myynnistä ja ohjelmoinnista.",
        kappaleet: [
          "Centria-ammattikorkeakoulu, tradenomi (AMK), tietojenkäsittely. Opinnot käynnissä 2026–2029, ei valmista tutkintoa.",
          "Johdan B2B-myyntiä ja SaaS-kasvua Webman Oy:ssä sekä toimipisteen käynnistystä. Aiemmin asiakasmenestystä ja markkinointia JCAD:llä sekä myynnin ja markkinoinnin konsultointia Fissionilla.",
          "Valmennus on kulkenut mukana vuodesta 2013: SM-tason vapaaottelu, brasilialaisen jujutsun purppuravyö ja valmennus. Ennen näitä rooleja tein asiakaspalvelua ja myyntiä opintojen ohessa.",
        ],
        muokkaus: "",
      },

      osaaminen: {
        otsikko: "Kolme pilaria",
        numero: "",
        merkinta: "",
        johdanto: "Johtaminen, myynti ja ohjelmointi. Neljäs rivi kertoo, mitä en ole rakentanut.",
        kohdat: [
          {
            nimi: "Johtaminen",
            kuvaus: "Toimipisteen käynnistys, rekrytointi ja yhteinen tapa tehdä työtä.",
          },
          {
            nimi: "Myynti",
            kuvaus: "Myyntiputki, konsultoiva myynti, käyttöönotto ja asiakkuuden jatkuminen.",
          },
          {
            nimi: "Ohjelmointi",
            kuvaus: "HTML, CSS ja JavaScript omissa esimerkeissä. Adobe Creative Suite ilmeen työssä. Opinnot ovat käynnissä, ei valmista tutkintoa.",
          },
          {
            nimi: "CRM, ERP ja työnkulku",
            kuvaus: "Työkaluja myynnissä, projekteissa, tunneissa ja laskutuksessa. Kuvitus on alempana. En ole rakentanut järjestelmää.",
          },
        ],
      },

      valitut: {
        otsikko: "Valitut työt",
        numero: "02",
        johdanto: "Omia toteutuksia — kokeiltavissa.",
        tarve: "Tarve",
        rooli: "Rooli",
        tekniikka: "Miten se on tehty",
        nayttaa: "Mitä voi katsoa",
        lahdeTeksti: "Lähdekoodi",
        kohdat: [
          {
            nimi: "Tämä sivu",
            tarve: "Kaupallinen rooli ja itse tehdyt sivut pitää näyttää samassa paikassa.",
            rooli: "Kokosin sivun itse.",
            tekniikka: "HTML, CSS ja JavaScript. Suomi ja englanti samassa sisällössä, kielivalinta säilyy selaimessa. Ei taustajärjestelmää.",
            nayttaa: "Tämän sivun: nimen, luvun, työt ja demot.",
            linkki: "#alku",
            linkinTeksti: "Sivun alkuun",
            lahde: "https://github.com/jokkewedsf/portfolio",
          },
          {
            nimi: "Oma chat",
            tarve: "Kysymykset minusta pitää voida esittää sivulla.",
            rooli: "Tein chat-widgetin ja Cloudflare Workerin.",
            tekniikka: "HTML, CSS ja JavaScript. Worker välittää viestin xAI:n Grok-mallille. Avain ja tietopohja pysyvät palvelimella.",
            nayttaa: "Kulmasta aukeavan chatin ja reitin: selain, Worker, Grok, virtaava vastaus.",
            linkki: "#ratkaisut",
            linkinTeksti: "Katso osio",
            demo: "ratkaisut/chatbot/",
            demoTeksti: "Avaa sivu",
            lahde: "https://github.com/jokkewedsf/portfolio",
          },
          {
            nimi: "Toiminnanohjauksen kuvitus",
            tarve: "Myynti, projektit, laskutus ja raportointi on helpompi nähdä yhtenä ketjuna.",
            rooli: "Tein vieritettävän kuvituksen.",
            tekniikka: "Kaksitoista vaihetta. Vierityskohta liikuttaa näkymää, ja vaiheet on piirretty SVG-kuvakkeina. En ole rakentanut ERP:tä enkä ottanut sitä käyttöön.",
            nayttaa: "Ketjun vaihe vaiheelta.",
            linkki: "#erp",
            linkinTeksti: "Katso kuvitus",
            lahde: "https://github.com/jokkewedsf/portfolio",
          },
        ],
      },

      erp: {
        otsikko: "Toiminnanohjaus",
        numero: "05",
        johdanto:
          "Kuvitus kaupallisesta ketjusta, ei järjestelmä, jonka olisin rakentanut tai ottanut käyttöön. Vieritys vain näyttää vaiheet.",
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

      omaChat: {
        otsikko: "Oma chat",
        numero: "04",
        johdanto:
          "Kulmasta aukeava chat vastaa minusta. Se puhuu minä-muodossa, mutta vain siitä tietopohjasta, jonka kokoan itse.",
        ketjuOtsikko: "Miten vastaus kulkee",
        vaiheet: [
          { nimi: "Selain", teksti: "Viesti lähtee tältä sivulta. Selain näkee vain viestit, ei avainta eikä tietopohjaa." },
          { nimi: "Cloudflare Worker", teksti: "Palveliton Worker reunalla tarkistaa alkuperän, viestin pituuden ja kävijäkohtaisen rajan. Raja on Cloudflare KV:ssa." },
          { nimi: "Grok", teksti: "Worker kysyy xAI:n Grok-mallilta chat completions -rajapinnan kautta." },
          { nimi: "Vastaus", teksti: "Teksti virtaa takaisin sitä mukaa kuin malli kirjoittaa." }
        ],
        faktat: [
          "Jos kysyt, olenko tekoäly, vastaan sen. En keksi asiakkaita, hintoja tai lukuja, joita tietopohjassa ei ole.",
          "Avain ja tietopohja ovat palvelimen salaisuuksia. Niitä ei ole sivun koodissa.",
          "CORS sallii vain osoitteen jokkewedsf.github.io.",
          "Chat on tehty ilman kehyksiä: HTML, CSS ja JavaScript. Worker on yksi tiedosto."
        ],
        cta: "Kokeile chattia"
      },

      ratkaisut: {
        otsikko: "Ratkaisut",
        numero: "04",
        johdanto: "Chat sivun kulmassa. Vastaukset tulevat omasta tietopohjasta.",
        tutustu: "Tutustu ratkaisuun",
        kokeile: "Kokeile demoa",
        demoOtsikko: "Kokeile demoa",
      },

      chatbot: {
        ylateksti: "Tekoäly",
        kuvaus: "Chat vastaa Joakimista hänen kokoamastaan tietopohjasta. Avain ja tietopohja pysyvät palvelimella.",
        takaisin: "Takaisin portfolioon"
      },

      tyot: {
        otsikko: "Kokemus",
        numero: "03",
        merkinta: "",
        johdanto: "Nämä ovat rooleja, eivät erillisiä asiakastoimeksiantoja. Luku on mukana vain silloin, kun se on oma.",
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
            tiivis: "Markkinoinnin koordinointi ja asiakasmenestys määrälaskennan SaaS-ohjelmistossa.",
            kuvaus:
              "Autoin urakoivia rakennusliikkeitä määrälaskennassa ja tarjouskilpailuissa sekä vedin kampanjoita Suomessa ja Ruotsissa.",
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
            tiivis: "Myynnin ja markkinoinnin johdon konsultointi.",
            kuvaus:
              "Strategista neuvontaa ja operatiivista tukea myynnin ja markkinoinnin kehittämiseen. Työhön kuului myös ilme ja sivut.",
            tunnisteet: ["Yrittäjyys", "Brändi", "Myyntiputki"],
            linkki: "",
            linkinTeksti: "",
            motiivi: "piste",
            savy: ["#2a2116", "#e2b56a"],
          },
          {
            onEsimerkki: false,
            nimi: "B2B-myynti",
            organisaatio: "Moontalk Oy",
            rooli: "SaaS-myyjä",
            aika: "2019–2020",
            paikka: "",
            tiivis: "Viestintäpalveluiden myyntiä yrityksille.",
            kuvaus: "Tarvekartoitus ja ratkaisumyynti.",
            tunnisteet: ["B2B", "SaaS"],
            linkki: "",
            linkinTeksti: "",
            motiivi: "viiva",
            savy: ["#1a2430", "#c9c0b2"],
          },
        ],
      },

      tausta: {
        otsikko: "Tausta",
        numero: "06",
        johdanto: "Valmennus, yrittäjyys, opinnot ja kansainvälinen kokemus kaupallisen työn rinnalla.",
        kohdat: [
          {
            nimi: "Kamppailu-urheilu",
            meta: "Urheilija ja valmentaja vuodesta 2013",
            teksti: "SM-tason vapaaottelija, brasilialaisen jujutsun purppuravyö ja valmentaja.",
          },
          {
            nimi: "BULI ja Buli Gear",
            meta: "Brändi ja verkkokauppa",
            teksti: "Vapaa-ajan vaatteiden brändi sekä kamppailuvarusteiden maahantuonti ja verkkokauppa 2022–2024. B2C ja brändinhallinta.",
          },
          {
            nimi: "Opinnot",
            meta: "Centria-ammattikorkeakoulu · opinnot käynnissä 2026–2029",
            teksti:
              "Tradenomi (AMK), tietojenkäsittely. Opinnot käynnissä 2026–2029. Rakennusmestariopinnot (AMK) 2022–2023, ei valmista tutkintoa. Yhteiskuntatieteiden opinnot Lapin yliopistossa 2020–2021. Elements of AI, Helsingin yliopisto ja MinnaLearn.",
          },
          {
            nimi: "Kriisinhallinta",
            meta: "Kansainvälinen palvelus",
            teksti: "Aliupseeri NATO-operaatiossa ja rauhanturvaaja (UNIFIL) Libanonissa ja Irakissa. Head of Welfare -projekti 2023–2024.",
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
        "Joakim Rydenfelt. Software expertise from the combination of leadership, sales and programming.",

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
        otsikko: "Software expertise from the combination of leadership, sales and programming.",
        ingressi:
          "I lead sales and teams at Webman Oy. The programming shows up in the pages I assembled myself.",
        summa: 300000,
        luku: "Over €300,000",
        lukuSelite: "in SaaS sales in 2026 (as of November 2026)",
        opinnotNimi: "Centria University of Applied Sciences",
        opinnotRivi: "BBA in Business Information Technology · studies in progress, 2026–2029",
        muotokuva: "Portrait of Joakim Rydenfelt.",
        focusLabel: "Three pillars",
        focus: ["Leadership", "Sales", "Programming"],
        huomautus: "",
        linkedinNappi: "Contact on LinkedIn",
        selaaNappi: "See the work",
      },

      keskustelu: {
        silma: "AI",
        otsikko: "Conversation",
        nimi: "Joakim",
        tila: "AI · answers from Joakim's replies",
        avaa: "Open chat",
        sulje: "Close chat",
        tervehdys: "Ask me anything",
        tervehdysSulje: "Dismiss greeting",
        merkinta:
          "Talk with AI Joakim — an AI produces the answers from Joakim's own replies",
        ehdotukset: [
          "What can you do?",
          "What kinds of solutions do you make?",
          "How do I reach you?",
          "What have you done?",
        ],
        syote: "Write a message",
        laheta: "Send",
        kirjoittaa: "Typing",
        avautuu: "Chat opens soon",
        linkedin: "Contact on LinkedIn",
        virhe: "No reply just now. You can get in touch on LinkedIn.",
        tietosuoja:
          "Messages are processed by an AI service to produce a reply and are not stored on this site.",
        sina: "You",
        joakim: "AI Joakim",
        loki: "Conversation",
      },

      navigointi: [
        { id: "tietoa", numero: "01", teksti: "About" },
        { id: "valitut", numero: "02", teksti: "Work" },
        { id: "tyot", numero: "03", teksti: "Experience" },
        { id: "ratkaisut", numero: "04", teksti: "Chat" },
        { id: "erp", numero: "05", teksti: "Path" },
        { id: "taustat", numero: "06", teksti: "Background" },
        { id: "yhteys", numero: "07", teksti: "Contact" },
      ],

      tietoa: {
        otsikko: "About",
        numero: "01",
        merkinta: "",
        avaus: "Software expertise comes from leadership, sales and programming.",
        kappaleet: [
          "Centria University of Applied Sciences, BBA in Business Information Technology. Studies in progress, 2026–2029, not a completed degree.",
          "At Webman Oy I lead B2B sales, SaaS growth and the opening of an office. Before that, customer success and marketing coordination at JCAD, and sales and marketing consulting at Fission.",
          "Coaching has been part of this since 2013: national-level MMA, a Brazilian jiu-jitsu purple belt, and coaching. Before these roles I did customer service and sales while studying.",
        ],
        muokkaus: "",
      },

      osaaminen: {
        otsikko: "Three pillars",
        numero: "",
        merkinta: "",
        johdanto: "Leadership, sales and programming. The fourth line says what I have not built.",
        kohdat: [
          {
            nimi: "Leadership",
            kuvaus: "Opening an office, hiring, and a shared way of working.",
          },
          {
            nimi: "Sales",
            kuvaus: "Pipeline, consultative sales, onboarding and the relationship that follows.",
          },
          {
            nimi: "Programming",
            kuvaus: "HTML, CSS and JavaScript in my own examples. Adobe Creative Suite for visual work. The studies are in progress, not a completed degree.",
          },
          {
            nimi: "CRM, ERP and the workflow",
            kuvaus: "Tools for sales, projects, hours and invoicing. The illustration is further down. I did not build the system.",
          },
        ],
      },

      valitut: {
        otsikko: "Selected work",
        numero: "02",
        johdanto: "My own builds — you can try them.",
        tarve: "Need",
        rooli: "My role",
        tekniikka: "How it works",
        nayttaa: "What you can see",
        lahdeTeksti: "Source",
        kohdat: [
          {
            nimi: "This site",
            tarve: "The commercial role and the pages built by hand need to sit in one place.",
            rooli: "I assembled the page myself.",
            tekniikka: "HTML, CSS and JavaScript. Finnish and English live in the same content file, and the language choice stays in the browser. No backend.",
            nayttaa: "This page: the name, the figure, the work and the demos.",
            linkki: "#alku",
            linkinTeksti: "Back to the top",
            lahde: "https://github.com/jokkewedsf/portfolio",
          },
          {
            nimi: "My chat",
            tarve: "Questions about me need a place on the page.",
            rooli: "I built the chat widget and the Cloudflare Worker.",
            tekniikka: "HTML, CSS and JavaScript. The Worker passes the message to xAI's Grok model. The key and the knowledge base stay on the server.",
            nayttaa: "The corner chat and the path: browser, Worker, Grok, a streamed reply.",
            linkki: "#ratkaisut",
            linkinTeksti: "See the section",
            demo: "ratkaisut/chatbot/",
            demoTeksti: "Open the page",
            lahde: "https://github.com/jokkewedsf/portfolio",
          },
          {
            nimi: "The operations illustration",
            tarve: "Sales, projects, invoicing and reporting are easier to see as one chain.",
            rooli: "I made a scroll illustration.",
            tekniikka: "Twelve stages. Scroll position moves the view, and the stages are drawn as SVG icons. I have not built an ERP or deployed one.",
            nayttaa: "The chain, stage by stage.",
            linkki: "#erp",
            linkinTeksti: "See the illustration",
            lahde: "https://github.com/jokkewedsf/portfolio",
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

      omaChat: {
        otsikko: "My chat",
        numero: "04",
        johdanto:
          "The chat in the corner answers about me. It speaks in the first person, and only from the knowledge base I maintain.",
        ketjuOtsikko: "How a reply travels",
        vaiheet: [
          { nimi: "Browser", teksti: "The message leaves this page. The browser sees only the messages, not the key or the knowledge base." },
          { nimi: "Cloudflare Worker", teksti: "A serverless Worker at the edge checks the origin, the message length and the per-visitor limit. The limit lives in Cloudflare KV." },
          { nimi: "Grok", teksti: "The Worker asks xAI's Grok model through the chat completions API." },
          { nimi: "Reply", teksti: "The text streams back as the model writes it." }
        ],
        faktat: [
          "If you ask whether I am an AI, I say so. I do not invent clients, prices or figures that are not in the knowledge base.",
          "The key and the knowledge base are server secrets. They are not in the page code.",
          "CORS allows only jokkewedsf.github.io.",
          "The chat is built without frameworks: HTML, CSS and JavaScript. The Worker is one file."
        ],
        cta: "Try the chat"
      },

      ratkaisut: {
        otsikko: "Solutions",
        numero: "04",
        johdanto: "The chat in the corner. Replies come from my own knowledge base.",
        tutustu: "Explore the solution",
        kokeile: "Try the demo",
        demoOtsikko: "Try the demo",
      },

      chatbot: {
        ylateksti: "AI",
        kuvaus: "The chat answers about Joakim from the knowledge base he maintains. The key and the knowledge base stay on the server.",
        takaisin: "Back to the portfolio"
      },

      tyot: {
        otsikko: "Experience",
        numero: "03",
        merkinta: "",
        johdanto: "Roles, not separate client engagements.",
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
              "Jobi is Webman's application for projects, hours and invoicing. I owned the customer journey from sale to onboarding for companies in construction, HVAC, property maintenance and technical services.",
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
            tiivis: "Marketing coordination and customer success for SaaS estimating software.",
            kuvaus:
              "I helped contracting firms with quantity takeoff and bids, and ran campaigns in Finland and Sweden.",
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
            tiivis: "Sales and marketing leadership consulting.",
            kuvaus:
              "Strategic advice and operational support for developing sales and marketing. The work also included identity and sites.",
            tunnisteet: ["Founder", "Brand", "Pipeline"],
            linkki: "",
            linkinTeksti: "",
            motiivi: "piste",
            savy: ["#2a2116", "#e2b56a"],
          },
          {
            onEsimerkki: false,
            nimi: "B2B sales",
            organisaatio: "Moontalk Oy",
            rooli: "SaaS sales",
            aika: "2019–2020",
            paikka: "",
            tiivis: "Communication services for companies.",
            kuvaus: "Needs analysis and solution selling.",
            tunnisteet: ["B2B", "SaaS"],
            linkki: "",
            linkinTeksti: "",
            motiivi: "viiva",
            savy: ["#1a2430", "#c9c0b2"],
          },
        ],
      },

      tausta: {
        otsikko: "Background",
        numero: "06",
        johdanto: "Coaching, entrepreneurship, studies and international experience alongside the commercial work.",
        kohdat: [
          {
            nimi: "Combat sports",
            meta: "Athlete and coach since 2013",
            teksti: "National-level MMA competitor, Brazilian jiu-jitsu purple belt, and coach.",
          },
          {
            nimi: "BULI and Buli Gear",
            meta: "Brand and e-commerce",
            teksti: "A leisurewear brand, plus import and e-commerce of combat-sports equipment, 2022–2024. B2C and brand management.",
          },
          {
            nimi: "Studies",
            meta: "Centria University of Applied Sciences · studies in progress, 2026–2029",
            teksti:
              "BBA in Business Information Technology, studies in progress, 2026–2029. Construction management studies (UAS), 2022–2023, not a completed degree. Social science studies at the University of Lapland, 2020–2021. Elements of AI, University of Helsinki and MinnaLearn.",
          },
          {
            nimi: "Crisis management",
            meta: "International service",
            teksti: "Non-commissioned officer in a NATO operation and UNIFIL peacekeeper in Lebanon and Iraq. Head of Welfare project, 2023–2024.",
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
