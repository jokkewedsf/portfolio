/**
 * Alkuperäinen vektoripiirros Oulun Toripolliisista.
 * Havainto tehtiin julkisesta valokuvasta, jota ei upoteta:
 * https://fi.wikipedia.org/wiki/Tiedosto:Toripolliisi.jpg
 * Patsas: Kaarlo Mikkonen. Valokuva: Tve4, CC BY-SA 2.5.
 */
window.piirraToripolliisi = function () {
  const siluetti =
    '<path d="M156 214 C118 228 92 286 96 348 C100 404 124 446 168 462 L252 462 C296 446 324 404 328 348 C332 286 306 228 268 214 C236 202 188 202 156 214 Z"/>' +
    '<path d="M150 236 C112 252 92 300 90 348 C88 378 102 402 124 408 C142 412 154 392 156 360 C158 312 170 268 164 240 Z"/>' +
    '<path d="M274 236 C312 252 332 300 334 348 C336 378 322 402 300 408 C282 412 270 392 268 360 C266 312 254 268 260 240 Z"/>' +
    '<path d="M108 392 C86 398 74 422 82 446 C92 470 122 474 138 456 C150 442 146 414 128 400 Z"/>' +
    '<path d="M316 392 C338 398 350 422 342 446 C332 470 302 474 286 456 C274 442 278 414 296 400 Z"/>' +
    '<path d="M158 448 C150 492 146 528 154 558 L196 560 C206 528 204 492 196 450 Z"/>' +
    '<path d="M266 448 C274 492 278 528 270 558 L228 560 C218 528 220 492 228 450 Z"/>' +
    '<path d="M142 548 C128 560 122 578 132 592 C148 606 188 608 198 592 L196 556 Z"/>' +
    '<path d="M282 548 C296 560 302 578 292 592 C276 606 236 608 226 592 L228 556 Z"/>' +
    '<path d="M178 188 C164 186 154 166 158 146 C162 122 180 106 202 104 C228 102 252 118 256 146 C260 168 246 188 230 192 C214 196 190 192 178 188 Z"/>' +
    '<path d="M160 150 C142 146 134 166 140 184 C148 176 158 168 164 158 Z"/>' +
    '<path d="M254 150 C272 146 280 166 274 184 C266 176 256 168 250 158 Z"/>' +
    '<path d="M162 132 L166 86 C174 70 236 68 248 86 L254 132 C232 122 184 124 162 132 Z"/>' +
    '<path d="M156 118 C188 136 246 138 284 116 C248 126 190 128 156 118 Z"/>';

  return (
    '<figure class="tori-kehys">' +
    '<svg class="tori-kuva" viewBox="0 0 440 680" role="img" aria-labelledby="tori-nimi tori-selite" tabindex="0">' +
    '<title id="tori-nimi">Toripolliisi</title>' +
    '<desc id="tori-selite">Veistoksellinen muistuma Kaarlo Mikkosen pronssipatsaasta Oulun kauppatorilla. Ei Oulun kaupungin virallinen tunnus.</desc>' +
    "<defs>" +
    '<radialGradient id="tori-halo" cx="50%" cy="42%" r="48%">' +
    '<stop offset="0%" stop-color="#c4a574" stop-opacity="0.22"/>' +
    '<stop offset="58%" stop-color="#9af0d0" stop-opacity="0.05"/>' +
    '<stop offset="100%" stop-color="#9af0d0" stop-opacity="0"/>' +
    "</radialGradient>" +
    '<radialGradient id="tori-metalli" cx="36%" cy="30%" r="68%">' +
    '<stop offset="0%" stop-color="#c4a27a"/>' +
    '<stop offset="28%" stop-color="#7a5a3c"/>' +
    '<stop offset="62%" stop-color="#3e2c22"/>' +
    '<stop offset="100%" stop-color="#1a120e"/>' +
    "</radialGradient>" +
    '<linearGradient id="tori-sivu" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0%" stop-color="#f0e2cc" stop-opacity="0.28"/>' +
    '<stop offset="42%" stop-color="#8a6848" stop-opacity="0"/>' +
    '<stop offset="100%" stop-color="#0c0908" stop-opacity="0.55"/>' +
    "</linearGradient>" +
    '<linearGradient id="tori-valo" x1="0" y1="0" x2="1" y2="0">' +
    '<stop offset="0%" stop-color="#fff6e4" stop-opacity="0"/>' +
    '<stop offset="48%" stop-color="#f3efe4" stop-opacity="0.42"/>' +
    '<stop offset="100%" stop-color="#9af0d0" stop-opacity="0"/>' +
    "</linearGradient>" +
    '<mask id="tori-mask"><g fill="#fff">' + siluetti + "</g></mask>" +
    "</defs>" +
    '<ellipse class="tori-halo" cx="220" cy="300" rx="150" ry="210" fill="url(#tori-halo)"/>' +
    '<ellipse cx="220" cy="628" rx="150" ry="16" fill="#000" opacity="0.35"/>' +
    '<path d="M78 588 L362 588 L344 646 L96 646 Z" fill="#1a1614"/>' +
    '<path d="M78 588 L362 588 L352 600 L88 600 Z" fill="#4a3a2e" opacity="0.55"/>' +
    '<path d="M118 548 L322 548 L308 590 L132 590 Z" fill="#2a221c"/>' +
    '<path d="M118 548 L322 548 L312 560 L128 560 Z" fill="#6b5340" opacity="0.45"/>' +
    '<g class="tori-muoto" fill="url(#tori-metalli)">' +
    siluetti +
    '<path fill="url(#tori-sivu)" d="M156 214 C118 228 92 286 96 348 C100 404 124 446 168 462 L252 462 C296 446 324 404 328 348 C332 286 306 228 268 214 C236 202 188 202 156 214 Z"/>' +
    '<path d="M168 248 L196 262 L292 392 L270 404 L172 274 Z" fill="#2a1c14" opacity="0.55"/>' +
    '<path d="M196 360 C230 352 292 354 318 368 L314 388 C280 374 220 372 190 382 Z" fill="#1c1410" opacity="0.72"/>' +
    '<path d="M190 368 C236 360 300 362 316 372 L312 384 C286 376 230 374 196 382 Z" fill="#8d6b4a" opacity="0.35"/>' +
    '<circle cx="214" cy="292" r="4.2" fill="#1a120e"/>' +
    '<circle cx="214" cy="314" r="4.2" fill="#1a120e"/>' +
    '<circle cx="214" cy="336" r="4.2" fill="#1a120e"/>' +
    '<circle cx="213" cy="290" r="1.5" fill="#e6d3b4"/>' +
    '<circle cx="213" cy="312" r="1.5" fill="#e6d3b4"/>' +
    '<circle cx="213" cy="334" r="1.5" fill="#e6d3b4"/>' +
    '<path d="M176 150 C184 146 196 146 202 152 C196 156 184 156 176 150 Z" fill="#1a120e"/>' +
    '<path d="M214 150 C222 146 234 146 240 152 C234 156 222 156 214 150 Z" fill="#1a120e"/>' +
    '<path d="M198 156 C204 164 214 166 220 158" fill="none" stroke="#2a1c14" stroke-width="2" stroke-linecap="round"/>' +
    '<path d="M188 182 C198 190 214 190 226 180" fill="none" stroke="#1a120e" stroke-width="2.4" stroke-linecap="round"/>' +
    '<path d="M206 86 L214 98 L222 112 L214 118 L206 112 L198 98 Z" fill="#c4a574"/>' +
    '<path d="M208 92 L214 100 L214 112 L208 108 Z" fill="#f0e2cc" opacity="0.7"/>' +
    '<path d="M92 430 C86 446 96 458 108 454" fill="none" stroke="#1a120e" stroke-width="2" stroke-linecap="round"/>' +
    '<path d="M100 436 C96 448 104 458 114 454" fill="none" stroke="#1a120e" stroke-width="2" stroke-linecap="round"/>' +
    '<path d="M108 440 C106 450 114 458 122 452" fill="none" stroke="#1a120e" stroke-width="2" stroke-linecap="round"/>' +
    '<path d="M332 430 C338 446 328 458 316 454" fill="none" stroke="#1a120e" stroke-width="2" stroke-linecap="round"/>' +
    '<path d="M324 436 C328 448 320 458 310 454" fill="none" stroke="#1a120e" stroke-width="2" stroke-linecap="round"/>' +
    '<path d="M316 440 C318 450 310 458 302 452" fill="none" stroke="#1a120e" stroke-width="2" stroke-linecap="round"/>' +
    '<path d="M170 148 C180 144 194 144 204 150 C198 156 180 156 170 148 Z" fill="#1a120e"/>' +
    '<path d="M214 148 C224 144 238 144 248 150 C242 156 224 156 214 148 Z" fill="#1a120e"/>' +
    '<path d="M178 146 C186 140 196 142 200 148" fill="none" stroke="#f0e2cc" stroke-width="1.4" opacity="0.7"/>' +
    '<path d="M222 146 C230 140 240 142 244 148" fill="none" stroke="#f0e2cc" stroke-width="1.4" opacity="0.55"/>' +
    '<path d="M196 168 C202 178 216 180 224 170" fill="none" stroke="#2a1c14" stroke-width="2.2" stroke-linecap="round"/>' +
    '<path d="M186 196 C200 206 220 204 232 192" fill="none" stroke="#1a120e" stroke-width="2.6" stroke-linecap="round"/>' +
    '<path d="M158 250 C200 290 250 330 286 372" fill="none" stroke="#f0e2cc" stroke-width="8" stroke-linecap="round" opacity="0.18"/>' +
    "</g>" +
    '<rect class="tori-pyyhka" mask="url(#tori-mask)" x="-60" y="40" width="70" height="560" fill="url(#tori-valo)"/>' +
    "</svg>" +
    "<figcaption>Toripolliisi, Oulun tori</figcaption>" +
    "</figure>"
  );
};
