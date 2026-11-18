import { createServer } from "node:http";

const portti = Number(process.env.PORT || 8787);
const palat = ["Hei, ", "olen tekoäly-Joakim. ", "Vastaan omien vastausteni pohjalta."];

const palvelin = createServer(function (pyynto, vastaus) {
  vastaus.setHeader("Access-Control-Allow-Origin", "*");
  vastaus.setHeader("Access-Control-Allow-Headers", "Content-Type");
  vastaus.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  if (pyynto.method === "OPTIONS") {
    vastaus.writeHead(204);
    vastaus.end();
    return;
  }
  const palatRunko = [];
  pyynto.on("data", function (pala) {
    palatRunko.push(pala);
  });
  pyynto.on("end", function () {
    if (pyynto.url === "/virhe") {
      vastaus.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
      vastaus.end('{"error":"unavailable"}');
      return;
    }
    if (pyynto.url === "/json") {
      vastaus.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      vastaus.end(JSON.stringify({ choices: [{ message: { role: "assistant", content: palat.join("") } }] }));
      return;
    }
    vastaus.writeHead(200, { "Content-Type": "text/event-stream; charset=utf-8", "Cache-Control": "no-cache" });
    let i = 0;
    const ajastin = setInterval(function () {
      if (i >= palat.length) {
        vastaus.write("data: [DONE]\n\n");
        vastaus.end();
        clearInterval(ajastin);
        return;
      }
      vastaus.write("data: " + JSON.stringify({ choices: [{ delta: { content: palat[i] } }] }) + "\n\n");
      i += 1;
    }, 20);
  });
});

palvelin.listen(portti, "127.0.0.1");
