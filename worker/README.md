# Tekoäly-Joakimin Worker

Cloudflare Worker, joka välittää sivuston keskustelun OpenAI-yhteensopivaan chat completions -rajapintaan. Sivusto ei sisällä avainta eikä tietopohjaa. Julkinen sivu jättää osoitteen `window.JOAKIM_AI_ENDPOINT` tyhjäksi, kunnes tämä Worker on julkaistu.

## Mitä ei commitoitu

- `worker/tietopohja.md` on paikallinen tietopohja. Se on gitignorattu.
- `API_KEY` ja `SYSTEM_PROMPT` asetetaan Wranglerin salaisuuksina tai kehote vaihtoehtoisesti KV-avaimena. Niitä ei kirjoiteta `wrangler.toml`-tiedostoon.
- `worker/.dev.vars` on paikallinen salaisuustiedosto ja sekin on gitignorattu.

## Kustannus

Tarkkoja hintoja ei ole tässä, koska ne vaihtuvat. Katso kulloinen hinnasto:

- xAI: <https://docs.x.ai/developers/models>
- OpenAI, jos vaihdat tarjoajaa: <https://openai.com/api/pricing>
- Cloudflare Workers ja KV: <https://developers.cloudflare.com/workers/platform/pricing/>

Pyyntö on rajattu: enintään 400 vastausmerkkiä (`max_tokens`), enintään 16 viestiä historiassa ja enintään 20 viestiä samasta IP-osoitteesta 10 minuutissa. Lyhyt keskustelu kuluttaa vähän, mutta lopullinen hinta riippuu valitun mallin hinnastosta ja kävijämäärästä. Grok 4.7 voi käyttää päättelytokeneita oletuksena. Jos vastaukset ovat hitaita tai kalliimpia kuin odotit, aseta `REASONING = "low"` tiedostoon `wrangler.toml` ja julkaise uudelleen. Tyhjä arvo jättää kentän lähettämättä.

## Käyttöönotto

1. Tee Cloudflare-tili. KV ja Worker toimivat ilmaisella tasolla. Durable Object vaatisi maksullisen Workers-tilauksen, joten raja on KV:ssa.
2. Asenna Node.js. Wrangleria ei tarvitse asentaa globaalisti.
3. Kirjaudu Worker-kansiosta:

   ```bash
   cd worker
   npx wrangler login
   ```

4. Luo KV-nimiavaruus ja kopioi tulosteen `id` tiedoston `wrangler.toml` kohtaan `[[kv_namespaces]]`:

   ```bash
   npx wrangler kv namespace create RAJA
   ```

   Korvaa rivi `id = "00000000000000000000000000000000"`. Ilman oikeaa id:tä julkaisu ei onnistu, ja ilman KV-sidosta Worker vastaa 503:lla eikä päästä liikennettä läpi.

5. Kopioi `tietopohja.esimerkki.md` nimelle `tietopohja.md`. Kirjoita Joakimin omat vastaukset. Älä commitoi tiedostoa.
6. Tarkista kehote:

   ```bash
   node rakenna-prompti.js
   ```

7. Tallenna kehote salaisuutena. Komento lukee sen stdinistä:

   ```bash
   node rakenna-prompti.js | npx wrangler secret put SYSTEM_PROMPT
   ```

   Vaihtoehto on KV, jos et halua salaisuutta:

   ```bash
   node rakenna-prompti.js > /tmp/joakim-prompti.txt
   npx wrangler kv key put --binding RAJA SYSTEM_PROMPT --path /tmp/joakim-prompti.txt
   rm /tmp/joakim-prompti.txt
   ```

   Salaisuus voittaa KV:n, jos molemmat on asetettu.

8. Tallenna mallin avain. xAI-avaimen luot osoitteessa <https://console.x.ai/>.

   ```bash
   npx wrangler secret put API_KEY
   ```

9. Julkaise:

   ```bash
   npx wrangler deploy
   ```

10. Kopioi Workersin antama `https://…workers.dev`-osoite.
11. Aseta se tiedostoon `js/sisalto.js`:

    ```js
    window.JOAKIM_AI_ENDPOINT = "https://joakim-ai.<tili>.workers.dev";
    ```

    Julkaise sivusto sen jälkeen. Ennen tätä sivu näyttää tilan ”Chat avautuu pian” eikä yritä yhteyttä.

## Vaihto OpenAI:hin tai toiseen malliin

`API_BASE` ja `MODEL` ovat tiedostossa `wrangler.toml`. Oletus on xAI:n nykyinen keskustelumalli `grok-4.7` ja osoite `https://api.x.ai/v1`.

OpenAI-esimerkki:

```toml
API_BASE = "https://api.openai.com/v1"
MODEL = "gpt-4o-mini"
REASONING = ""
```

Käytä sen hetken mallinimeä OpenAI:n hinnastosivulta. Aseta uusi `API_KEY` ja aja `npx wrangler deploy`. Sama Worker kelpaa mille tahansa OpenAI-yhteensopivalle chat completions -rajapinnalle, kunhan osoite on `https`.

## Turvallisuus

- CORS sallii vain alkuperän `https://jokkewedsf.github.io`. Muut hylätään ilman CORS-otsaketta.
- Asiakas ei voi lähettää järjestelmäkehotetta, mallin nimeä eikä token-kattoa.
- Käyttäjän viesti on enintään 500 merkkiä, historia enintään 16 viestiä, ja viimeisen viestin on oltava käyttäjän.
- Raja on 20 viestiä / 10 minuuttia / IP (`CF-Connecting-IP`). Laskuri on KV-avaimessa. KV on lopulta eheä, joten kaksi samaan aikaan tulevaa pyyntöä voi joskus molemmat mahtua rajan ali. Tämä on ilmaisella tasolla toimiva raja, ei täydellinen laskuri.
- Worker ei kirjoita viestin sisältöä eikä kehotetta lokeihin. Ylävirran virhettä ei palauteta selaimelle.
- Viestejä ei tallenneta sivustolle. KV:ssa on vain laskuri ja halutessa kehote.

## Paikallinen tarkistus

```bash
cd worker
node --test tarkista.js
node mock.js
```

`mock.js` vastaa paikallisesti osoitteessa `http://127.0.0.1:8787` eikä tarvitse avainta. Sitä ei julkaista. Sivuston kokeiluun voit väliaikaisesti asettaa `window.JOAKIM_AI_ENDPOINT = "http://127.0.0.1:8787/"` ja palauttaa arvon tyhjäksi ennen julkaisua. Polku `/virhe` palauttaa 500 ja `/json` yhden JSON-vastauksen.
