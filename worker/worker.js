const SALLITTU_ORIGIN = "https://jokkewedsf.github.io";
const MAX_VIESTIT = 16;
const MAX_KAYTTAJA = 500;
const MAX_AVUSTAJA = 2000;
const MAX_RUNKO = 20000;
const MAX_PROMPT = 60000;
const MAX_TOKENIT = 400;
const RAJA_LKM = 20;
const RAJA_IKKUNA_MS = 10 * 60 * 1000;

function cors(origin) {
  if (origin !== SALLITTU_ORIGIN) return null;
  return {
    "Access-Control-Allow-Origin": SALLITTU_ORIGIN,
    Vary: "Origin",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Cache-Control": "no-store",
  };
}

function vastaus(status, payload, origin) {
  const headers = Object.assign({ "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }, cors(origin) || {});
  return new Response(JSON.stringify(payload), { status, headers });
}

function ipOsoite(request) {
  const ip = request.headers.get("CF-Connecting-IP") || "";
  if (!/^[0-9a-fA-F:.]{3,64}$/.test(ip)) return "tuntematon";
  return ip;
}

function tarkistaViestit(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return "invalid";
  if (!Array.isArray(body.messages) || body.messages.length < 1 || body.messages.length > MAX_VIESTIT) return "invalid";
  for (let i = 0; i < body.messages.length; i++) {
    const viesti = body.messages[i];
    if (!viesti || typeof viesti !== "object") return "invalid";
    if (viesti.role !== "user" && viesti.role !== "assistant") return "invalid";
    if (typeof viesti.content !== "string") return "invalid";
    const teksti = viesti.content.trim();
    const katto = viesti.role === "user" ? MAX_KAYTTAJA : MAX_AVUSTAJA;
    if (!teksti || teksti.length > katto) return "invalid";
    viesti.content = teksti;
  }
  if (body.messages[body.messages.length - 1].role !== "user") return "invalid";
  return "";
}

async function luePrompti(env) {
  const salaisuus = env && typeof env.SYSTEM_PROMPT === "string" ? env.SYSTEM_PROMPT.trim() : "";
  if (salaisuus) return salaisuus.slice(0, MAX_PROMPT);
  if (env && env.RAJA && typeof env.RAJA.get === "function") {
    const kv = await env.RAJA.get("SYSTEM_PROMPT");
    if (typeof kv === "string" && kv.trim()) return kv.trim().slice(0, MAX_PROMPT);
  }
  return "";
}

async function rajaa(env, ip) {
  if (!env || !env.RAJA || typeof env.RAJA.get !== "function" || typeof env.RAJA.put !== "function") {
    return 503;
  }
  const ikkuna = Math.floor(Date.now() / RAJA_IKKUNA_MS);
  const avain = "r:" + ip + ":" + ikkuna;
  const nyky = Number(await env.RAJA.get(avain)) || 0;
  if (nyky >= RAJA_LKM) return 429;
  await env.RAJA.put(avain, String(nyky + 1), { expirationTtl: 700 });
  return 0;
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin");
    if (request.method === "OPTIONS") {
      const otsakkeet = cors(origin);
      if (!otsakkeet) return new Response(null, { status: 403 });
      return new Response(null, { status: 204, headers: otsakkeet });
    }
    if (request.method !== "POST") return vastaus(405, { error: "method" }, origin);
    if (origin !== SALLITTU_ORIGIN) return new Response(JSON.stringify({ error: "origin" }), { status: 403, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" } });

    const pituus = Number(request.headers.get("Content-Length") || 0);
    if (pituus > MAX_RUNKO) return vastaus(413, { error: "invalid" }, origin);
    const tyyppi = request.headers.get("Content-Type") || "";
    if (tyyppi.toLowerCase().indexOf("application/json") !== 0) return vastaus(415, { error: "invalid" }, origin);

    let raaka = "";
    try {
      raaka = await request.text();
    } catch (virhe) {
      return vastaus(400, { error: "invalid" }, origin);
    }
    if (raaka.length > MAX_RUNKO) return vastaus(413, { error: "invalid" }, origin);

    let body;
    try {
      body = JSON.parse(raaka);
    } catch (virhe) {
      return vastaus(400, { error: "invalid" }, origin);
    }
    if (tarkistaViestit(body)) return vastaus(400, { error: "invalid" }, origin);

    const prompti = await luePrompti(env);
    const avain = env && typeof env.API_KEY === "string" ? env.API_KEY.trim() : "";
    if (!prompti || !avain) return vastaus(503, { error: "unavailable" }, origin);

    const raja = await rajaa(env, ipOsoite(request));
    if (raja) return vastaus(raja, { error: raja === 429 ? "rate" : "unavailable" }, origin);

    const pohja = String((env && env.API_BASE) || "https://api.x.ai/v1").replace(/\/+$/, "");
    if (pohja.indexOf("https://") !== 0) return vastaus(503, { error: "unavailable" }, origin);
    const malli = String((env && env.MODEL) || "grok-4.7");
    const pyynto = {
      model: malli,
      messages: [{ role: "system", content: prompti }].concat(
        body.messages.map(function (viesti) {
          return { role: viesti.role, content: viesti.content };
        })
      ),
      max_tokens: MAX_TOKENIT,
      temperature: 0.3,
      stream: body.stream === true,
    };
    const paattely = env && typeof env.REASONING === "string" ? env.REASONING.trim() : "";
    if (paattely && malli.indexOf("grok") === 0) pyynto.reasoning_effort = paattely;

    let upstream;
    try {
      upstream = await fetch(pohja + "/chat/completions", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + avain,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pyynto),
        signal: AbortSignal.timeout(25000),
      });
    } catch (virhe) {
      return vastaus(502, { error: "unavailable" }, origin);
    }
    if (!upstream.ok || !upstream.body) return vastaus(502, { error: "unavailable" }, origin);

    if (pyynto.stream) {
      const headers = Object.assign(
        { "Content-Type": "text/event-stream; charset=utf-8", "Cache-Control": "no-store" },
        cors(origin) || {}
      );
      return new Response(upstream.body, { status: 200, headers });
    }
    let json;
    try {
      json = await upstream.json();
    } catch (virhe) {
      return vastaus(502, { error: "unavailable" }, origin);
    }
    const choice = json && json.choices && json.choices[0];
    const teksti = choice && choice.message && choice.message.content;
    if (typeof teksti !== "string" || !teksti.trim()) return vastaus(502, { error: "unavailable" }, origin);
    return vastaus(200, { choices: [{ message: { role: "assistant", content: teksti } }] }, origin);
  },
};
