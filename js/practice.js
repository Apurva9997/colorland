import { ui } from "./ui.js";

const STORE = "colorland-practice-v1";

const LETTER_PATHS = {
  Y: "M 70 70 L 200 240 L 330 70 M 200 240 L 200 400",
  F: "M 90 70 L 90 400 M 90 70 L 320 70 M 90 220 L 270 220",
  L: "M 90 70 L 90 400 L 320 400",
  Z: "M 80 80 L 320 80 L 80 390 L 320 390",
  T: "M 70 80 L 330 80 M 200 80 L 200 400",
  H: "M 90 70 L 90 400 M 310 70 L 310 400 M 90 235 L 310 235",
  B: "M 90 70 L 90 400 M 90 70 L 230 70 Q 320 70 320 145 Q 320 220 230 220 L 90 220 M 230 220 Q 330 220 330 310 Q 330 400 230 400 L 90 400"
};

function pic(name) {
  const ink = "#2b2430";
  const common = `fill="#fff" stroke="${ink}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`;
  const map = {
    hat: `<ellipse cx="50" cy="62" rx="28" ry="10" ${common}/><path d="M22 58 Q50 20 78 58" ${common}/><circle cx="50" cy="44" r="6" ${common}/>`,
    frog: `<ellipse cx="50" cy="58" rx="30" ry="22" ${common}/><circle cx="36" cy="36" r="12" ${common}/><circle cx="64" cy="36" r="12" ${common}/><circle cx="36" cy="36" r="4" fill="${ink}"/><circle cx="64" cy="36" r="4" fill="${ink}"/>`,
    zebra: `<ellipse cx="52" cy="58" rx="28" ry="16" ${common}/><circle cx="28" cy="50" r="12" ${common}/><rect x="60" y="58" width="8" height="22" rx="3" ${common}/><rect x="40" y="58" width="8" height="22" rx="3" ${common}/>`,
    tree: `<rect x="44" y="58" width="12" height="28" rx="3" ${common}/><circle cx="50" cy="42" r="24" ${common}/>`,
    leaf: `<path d="M50 18 Q84 50 50 84 Q16 50 50 18Z" ${common}/><path d="M50 22 L50 78" fill="none" stroke="${ink}" stroke-width="3"/>`,
    xylophone: `<rect x="18" y="40" width="64" height="12" rx="3" ${common}/><rect x="22" y="54" width="56" height="10" rx="3" ${common}/><rect x="26" y="66" width="48" height="10" rx="3" ${common}/><line x1="16" y1="28" x2="30" y2="50" stroke="${ink}" stroke-width="3"/>`,
    ball: `<circle cx="50" cy="50" r="28" ${common}/><path d="M22 50 H78 M50 22 V78" fill="none" stroke="${ink}" stroke-width="3"/>`,
    butterfly: `<ellipse cx="32" cy="40" rx="16" ry="20" ${common}/><ellipse cx="68" cy="40" rx="16" ry="20" ${common}/><ellipse cx="50" cy="50" rx="7" ry="22" ${common}/>`,
    bee: `<ellipse cx="50" cy="52" rx="22" ry="16" ${common}/><path d="M38 52 H62" stroke="${ink}" stroke-width="3"/><circle cx="28" cy="48" r="8" ${common}/>`,
    bird: `<ellipse cx="52" cy="52" rx="22" ry="16" ${common}/><circle cx="70" cy="44" r="10" ${common}/><path d="M78 44 L92 48 L78 52Z" ${common}/>`,
    boat: `<path d="M22 58 L78 58 L68 78 L32 78Z" ${common}/><path d="M50 22 L50 58 L72 58Z" ${common}/>`,
    turtle: `<ellipse cx="50" cy="54" rx="26" ry="18" ${common}/><circle cx="78" cy="50" r="10" ${common}/>`,
    camel: `<ellipse cx="48" cy="58" rx="28" ry="14" ${common}/><path d="M40 44 Q50 22 60 44" ${common}/><circle cx="22" cy="50" r="10" ${common}/>`,
    cloud: `<ellipse cx="50" cy="54" rx="30" ry="16" ${common}/><circle cx="36" cy="44" r="12" ${common}/><circle cx="58" cy="40" r="14" ${common}/>`,
    icecream: `<path d="M38 52 L50 88 L62 52Z" ${common}/><circle cx="50" cy="40" r="18" ${common}/>`,
    igloo: `<path d="M22 78 Q22 28 50 28 Q78 28 78 78Z" ${common}/><rect x="40" y="58" width="20" height="20" ${common}/>`,
    ink: `<rect x="34" y="38" width="32" height="36" rx="4" ${common}/><path d="M40 38 Q50 18 60 38" ${common}/>`,
    insects: `<circle cx="38" cy="48" r="10" ${common}/><circle cx="62" cy="58" r="12" ${common}/><circle cx="50" cy="36" r="8" ${common}/>`,
    owl: `<ellipse cx="50" cy="56" rx="22" ry="26" ${common}/><circle cx="40" cy="48" r="8" ${common}/><circle cx="60" cy="48" r="8" ${common}/>`,
    goat: `<ellipse cx="54" cy="58" rx="24" ry="16" ${common}/><circle cx="30" cy="48" r="12" ${common}/><path d="M24 36 L18 22" stroke="${ink}" stroke-width="3"/>`,
    giraffe: `<rect x="46" y="28" width="10" height="40" rx="4" ${common}/><circle cx="58" cy="24" r="12" ${common}/><ellipse cx="50" cy="74" rx="16" ry="10" ${common}/>`,
    yoyo: `<circle cx="50" cy="48" r="22" ${common}/><circle cx="50" cy="48" r="8" ${common}/><path d="M72 40 Q90 20 80 70" fill="none" stroke="${ink}" stroke-width="3"/>`,
    apple: `<path d="M50 30 Q78 30 78 58 Q78 84 50 84 Q22 84 22 58 Q22 30 50 30Z" ${common}/><path d="M50 30 Q56 16 64 18" fill="none" stroke="${ink}" stroke-width="3"/>`,
    violin: `<ellipse cx="42" cy="62" rx="16" ry="22" ${common}/><rect x="48" y="18" width="10" height="46" rx="3" ${common}/>`,
    fish: `<ellipse cx="48" cy="50" rx="26" ry="16" ${common}/><path d="M74 50 L92 34 L92 66Z" ${common}/>`,
    arrow: `<path d="M20 50 H70" stroke="${ink}" stroke-width="5" stroke-linecap="round"/><path d="M58 32 L82 50 L58 68Z" ${common}/>`,
    ice: `<rect x="22" y="38" width="24" height="24" rx="4" ${common}/><rect x="44" y="50" width="28" height="24" rx="4" ${common}/>`,
    veggies: `<ellipse cx="38" cy="58" rx="14" ry="22" ${common}/><circle cx="62" cy="62" r="16" ${common}/><ellipse cx="52" cy="36" rx="10" ry="14" ${common}/>`,
    eagle: `<path d="M20 58 Q50 20 80 58 Q50 48 20 58Z" ${common}/><circle cx="50" cy="40" r="10" ${common}/>`,
    hand: `<path d="M38 78 V40 M50 78 V28 M62 78 V40 M28 70 V50" stroke="${ink}" stroke-width="8" stroke-linecap="round"/><ellipse cx="50" cy="78" rx="22" ry="12" ${common}/>`,
    nest: `<ellipse cx="50" cy="62" rx="28" ry="14" ${common}/><ellipse cx="50" cy="54" rx="18" ry="10" ${common}/>`,
    needle: `<path d="M22 78 L78 22" stroke="${ink}" stroke-width="4"/><circle cx="78" cy="22" r="6" ${common}/>`,
    net: `<circle cx="42" cy="42" r="22" ${common}/><path d="M58 58 L78 82" stroke="${ink}" stroke-width="4"/>`,
    astronaut: `<circle cx="50" cy="32" r="16" ${common}/><rect x="32" y="48" width="36" height="32" rx="8" ${common}/>`,
    apron: `<path d="M30 28 H70 L78 82 H22Z" ${common}/><circle cx="50" cy="48" r="6" ${common}/>`,
    flag: `<rect x="28" y="20" width="8" height="64" ${common}/><rect x="36" y="22" width="40" height="28" ${common}/>`,
    fox: `<ellipse cx="50" cy="60" rx="24" ry="16" ${common}/><path d="M28 40 L40 58 L32 58Z" ${common}/><path d="M72 40 L60 58 L68 58Z" ${common}/>`,
    finger: `<rect x="42" y="22" width="16" height="56" rx="8" ${common}/><circle cx="50" cy="22" r="10" ${common}/>`,
    kite: `<path d="M50 18 L78 50 L50 82 L22 50Z" ${common}/>`,
    truck: `<rect x="18" y="40" width="52" height="28" rx="4" ${common}/><rect x="54" y="28" width="28" height="40" rx="4" ${common}/><circle cx="34" cy="72" r="8" ${common}/><circle cx="70" cy="72" r="8" ${common}/>`
  };
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${map[name] || ""}</svg>`;
}

export const ACTIVITIES = [
  {
    id: "trace",
    title: "Trace Letters",
    blurb: "Finger-trace Y, F, L, Z…",
    kind: "trace",
    letters: ["Y", "F", "L", "Z", "T", "H", "B"]
  },
  {
    id: "match",
    title: "Match Pictures",
    blurb: "Match each letter to its picture",
    kind: "match",
    pairs: [
      { letter: "H", name: "hat", word: "Hat" },
      { letter: "F", name: "frog", word: "Frog" },
      { letter: "Z", name: "zebra", word: "Zebra" },
      { letter: "T", name: "tree", word: "Tree" },
      { letter: "L", name: "leaf", word: "Leaf" },
      { letter: "X", name: "xylophone", word: "Xylophone" }
    ]
  },
  {
    id: "circle-f",
    title: "Circle the F",
    blurb: "Find every letter F",
    kind: "circle-letters",
    target: "F",
    letters: ["A", "F", "P", "F", "O", "B", "F", "V", "F", "P", "F", "F"]
  },
  {
    id: "dots",
    title: "Join the Dots",
    blurb: "Connect A to K",
    kind: "dots",
    dots: [
      { id: "A", x: 200, y: 70 },
      { id: "B", x: 130, y: 110 },
      { id: "C", x: 100, y: 180 },
      { id: "D", x: 140, y: 250 },
      { id: "E", x: 200, y: 270 },
      { id: "F", x: 260, y: 250 },
      { id: "G", x: 300, y: 180 },
      { id: "H", x: 270, y: 110 },
      { id: "I", x: 225, y: 285 },
      { id: "J", x: 200, y: 410 },
      { id: "K", x: 175, y: 285 }
    ]
  },
  {
    id: "starts-b",
    title: "Begins with B",
    blurb: "Tap pictures that start with B",
    kind: "circle-pics",
    letter: "B",
    items: [
      { name: "ball", word: "Ball", ok: true },
      { name: "turtle", word: "Turtle", ok: false },
      { name: "butterfly", word: "Butterfly", ok: true },
      { name: "camel", word: "Camel", ok: false },
      { name: "bee", word: "Bee", ok: true },
      { name: "cloud", word: "Cloud", ok: false },
      { name: "bird", word: "Bird", ok: true },
      { name: "boat", word: "Boat", ok: true }
    ]
  },
  {
    id: "starts-i",
    title: "Begins with I",
    blurb: "Tap pictures that start with I",
    kind: "circle-pics",
    letter: "I",
    items: [
      { name: "icecream", word: "Ice cream", ok: true },
      { name: "owl", word: "Owl", ok: false },
      { name: "igloo", word: "Igloo", ok: true },
      { name: "goat", word: "Goat", ok: false },
      { name: "ink", word: "Ink", ok: true },
      { name: "giraffe", word: "Giraffe", ok: false },
      { name: "insects", word: "Insects", ok: true },
      { name: "truck", word: "Truck", ok: false }
    ]
  },
  {
    id: "start-letter",
    title: "Starting Letter",
    blurb: "What letter does it start with?",
    kind: "quiz",
    items: [
      { name: "yoyo", word: "Yo-yo", answer: "Y", choices: ["Y", "H", "P"] },
      { name: "leaf", word: "Leaf", answer: "L", choices: ["L", "K", "E"] },
      { name: "violin", word: "Violin", answer: "V", choices: ["T", "V", "O"] },
      { name: "apple", word: "Apple", answer: "A", choices: ["C", "S", "A"] },
      { name: "zebra", word: "Zebra", answer: "Z", choices: ["Q", "R", "Z"] },
      { name: "fish", word: "Fish", answer: "F", choices: ["M", "F", "D"] },
      { name: "arrow", word: "Arrow", answer: "A", choices: ["A", "I", "T"] },
      { name: "ice", word: "Ice", answer: "I", choices: ["J", "I", "L"] },
      { name: "tree", word: "Tree", answer: "T", choices: ["T", "C", "X"] },
      { name: "hand", word: "Hand", answer: "H", choices: ["H", "N", "M"] },
      { name: "eagle", word: "Eagle", answer: "E", choices: ["F", "E", "A"] },
      { name: "veggies", word: "Vegetables", answer: "V", choices: ["V", "W", "U"] }
    ]
  },
  {
    id: "hunt",
    title: "Letter Hunt",
    blurb: "Find the hidden letters",
    kind: "hunt",
    letters: [
      { ch: "A", x: 40, y: 70 },
      { ch: "H", x: 40, y: 200 },
      { ch: "G", x: 70, y: 300 },
      { ch: "D", x: 60, y: 400 },
      { ch: "M", x: 180, y: 280 },
      { ch: "B", x: 250, y: 220 },
      { ch: "E", x: 310, y: 340 },
      { ch: "C", x: 300, y: 70 },
      { ch: "K", x: 240, y: 90 },
      { ch: "F", x: 340, y: 140 }
    ]
  },
  {
    id: "copy",
    title: "Write T, H, F",
    blurb: "Copy the letters in the boxes",
    kind: "trace",
    letters: ["T", "H", "F"]
  }
];

function loadDone() {
  try {
    return JSON.parse(localStorage.getItem(STORE) || "{}");
  } catch {
    return {};
  }
}

function markDone(id) {
  const store = loadDone();
  store[id] = true;
  localStorage.setItem(STORE, JSON.stringify(store));
}

function svgPoint(svg, event) {
  const pt = svg.createSVGPoint();
  pt.x = event.clientX;
  pt.y = event.clientY;
  return pt.matrixTransform(svg.getScreenCTM().inverse());
}

function samplePath(path, count) {
  const len = path.getTotalLength();
  const pts = [];
  for (let i = 0; i < count; i += 1) {
    pts.push(path.getPointAtLength((i / (count - 1)) * len));
  }
  return { pts, len };
}

export function bootPractice() {
  const home = document.getElementById("home");
  const gallery = document.getElementById("practice-gallery");
  const studio = document.getElementById("practice-studio");
  const paper = document.getElementById("practice-paper");
  const titleEl = document.getElementById("practice-title");
  const hintEl = document.getElementById("practice-hint");
  const stepEl = document.getElementById("practice-step");

  let current = null;
  let cleanup = null;

  function renderGallery() {
    const done = loadDone();
    gallery.innerHTML = "";
    ACTIVITIES.forEach((act) => {
      const btn = document.createElement("button");
      btn.className = "card";
      btn.type = "button";
      btn.innerHTML = `
        <div class="card-preview practice-preview">${preview(act)}</div>
        <div class="card-meta">
          <h3>${act.title}</h3>
          <span class="badge ${done[act.id] ? "done" : ""}">${done[act.id] ? "Finished!" : "Play"}</span>
        </div>`;
      btn.addEventListener("click", () => openActivity(act.id));
      gallery.appendChild(btn);
    });
  }

  function preview(act) {
    if (act.kind === "trace") return `<div class="preview-letter">${act.letters[0]}</div>`;
    if (act.kind === "match") return pic(act.pairs[0].name);
    if (act.kind === "circle-letters") return `<div class="preview-letter">F</div>`;
    if (act.kind === "dots") return `<div class="preview-letter">A•</div>`;
    if (act.kind === "circle-pics") return pic(act.items.find((i) => i.ok).name);
    if (act.kind === "quiz") return pic(act.items[0].name);
    if (act.kind === "hunt") return `<div class="preview-letter">?</div>`;
    return "";
  }

  function openActivity(id) {
    current = ACTIVITIES.find((a) => a.id === id);
    titleEl.textContent = current.title;
    home.classList.add("is-hidden");
    studio.classList.add("is-open");
    startActivity();
  }

  function closeActivity() {
    if (cleanup) cleanup();
    cleanup = null;
    current = null;
    studio.classList.remove("is-open");
    home.classList.remove("is-hidden");
    renderGallery();
  }

  function startActivity() {
    if (cleanup) cleanup();
    paper.innerHTML = "";
    stepEl.textContent = "";
    const kind = current.kind;
    if (kind === "trace") cleanup = runTrace();
    else if (kind === "match") cleanup = runMatch();
    else if (kind === "circle-letters") cleanup = runCircleLetters();
    else if (kind === "dots") cleanup = runDots();
    else if (kind === "circle-pics") cleanup = runCirclePics();
    else if (kind === "quiz") cleanup = runQuiz();
    else if (kind === "hunt") cleanup = runHunt();
  }

  function finish() {
    markDone(current.id);
    ui.confetti();
    ui.fanfare();
    ui.showToast("You did it!");
    hintEl.textContent = "Star job! Go back for another game, or start over.";
  }

  function runTrace() {
    const letters = current.letters.slice();
    let index = 0;
    let drawing = false;
    let next = 0;
    let samples = [];
    let painted = null;
    let guide = null;

    function renderLetter() {
      next = 0;
      const ch = letters[index];
      stepEl.textContent = `${index + 1} / ${letters.length}`;
      hintEl.textContent = `Trace the letter ${ch} with your finger.`;
      paper.innerHTML = `
        <svg viewBox="0 0 400 460" class="trace-svg" xmlns="http://www.w3.org/2000/svg">
          <text x="200" y="36" text-anchor="middle" class="trace-label">Trace ${ch}</text>
          <path class="trace-ghost" d="${LETTER_PATHS[ch]}" />
          <path class="trace-paint" d="${LETTER_PATHS[ch]}" />
          <path class="trace-guide" d="${LETTER_PATHS[ch]}" />
          <circle class="trace-start" r="10" fill="#ff6b6b" stroke="#2b2430" stroke-width="3"/>
        </svg>`;
      const svg = paper.querySelector("svg");
      guide = svg.querySelector(".trace-guide");
      painted = svg.querySelector(".trace-paint");
      samples = samplePath(guide, 48);
      painted.style.strokeDasharray = `0 ${samples.len}`;
      painted.style.opacity = "0";
      const start = svg.querySelector(".trace-start");
      start.setAttribute("cx", samples.pts[0].x);
      start.setAttribute("cy", samples.pts[0].y);
      svg.addEventListener("pointerdown", onDown);
      svg.addEventListener("pointermove", onMove);
      svg.addEventListener("pointerup", onUp);
      svg.addEventListener("pointerleave", onUp);
    }

    function onDown(e) {
      drawing = true;
      e.currentTarget.setPointerCapture?.(e.pointerId);
      onMove(e);
    }
    function onUp() {
      drawing = false;
    }
    function onMove(e) {
      if (!drawing) return;
      const p = svgPoint(e.currentTarget, e);
      const target = samples.pts[next];
      if (!target) return;
      const dx = p.x - target.x;
      const dy = p.y - target.y;
      if (dx * dx + dy * dy < 38 * 38) {
        next += 1;
        const covered = (next / samples.pts.length) * samples.len;
        painted.style.strokeDasharray = `${covered} ${samples.len}`;
        painted.style.opacity = next > 2 ? "1" : "0";
        const startDot = e.currentTarget.querySelector(".trace-start");
        if (startDot && next > 3) startDot.setAttribute("opacity", "0");
        ui.blip(280 + next * 6);
        if (next >= samples.pts.length - 1) completeLetter();
      }
    }

    function completeLetter() {
      drawing = false;
      ui.blip(620);
      index += 1;
      if (index >= letters.length) {
        finish();
        hintEl.textContent = "You traced every letter!";
        return;
      }
      ui.showToast(`Nice ${letters[index - 1]}!`);
      renderLetter();
    }

    renderLetter();
    return () => {
      drawing = false;
    };
  }

  function runMatch() {
    const pairs = current.pairs;
    const letters = pairs.map((p) => p.letter).sort(() => Math.random() - 0.5);
    const pics = pairs.slice().sort(() => Math.random() - 0.5);
    const matched = new Set();
    let picked = null;

    hintEl.textContent = "Tap a letter, then tap its picture.";
    paper.innerHTML = `<div class="match-board"></div>`;
    const board = paper.querySelector(".match-board");
    board.innerHTML = `
      <div class="match-letters"></div>
      <div class="match-pics"></div>`;
    const letterBox = board.querySelector(".match-letters");
    const picBox = board.querySelector(".match-pics");

    letters.forEach((letter) => {
      const b = document.createElement("button");
      b.className = "letter-tile";
      b.type = "button";
      b.dataset.letter = letter;
      b.textContent = letter;
      b.addEventListener("click", () => pickLetter(b));
      letterBox.appendChild(b);
    });
    pics.forEach((item) => {
      const b = document.createElement("button");
      b.className = "pic-tile";
      b.type = "button";
      b.dataset.letter = item.letter;
      b.innerHTML = `${pic(item.name)}<span>${item.word}</span>`;
      b.addEventListener("click", () => pickPic(b));
      picBox.appendChild(b);
    });

    function pickLetter(btn) {
      if (matched.has(btn.dataset.letter)) return;
      letterBox.querySelectorAll(".letter-tile").forEach((t) => t.classList.remove("is-picked"));
      btn.classList.add("is-picked");
      picked = btn.dataset.letter;
      ui.blip(420);
    }

    function pickPic(btn) {
      if (matched.has(btn.dataset.letter)) return;
      if (!picked) {
        ui.showToast("Pick a letter first!");
        return;
      }
      if (picked === btn.dataset.letter) {
        matched.add(picked);
        btn.classList.add("is-matched");
        letterBox.querySelector(`[data-letter="${picked}"]`).classList.add("is-matched");
        letterBox.querySelectorAll(".letter-tile").forEach((t) => t.classList.remove("is-picked"));
        ui.blip(640);
        picked = null;
        if (matched.size === pairs.length) finish();
      } else {
        btn.classList.add("is-wrong");
        setTimeout(() => btn.classList.remove("is-wrong"), 420);
        ui.blip(180);
        ui.showToast("Try another picture!");
      }
    }

    return () => {};
  }

  function runCircleLetters() {
    const target = current.target;
    const needed = current.letters.filter((l) => l === target).length;
    let found = 0;
    hintEl.textContent = `Tap every ${target} inside the fish.`;
    paper.innerHTML = `<div class="fish-board"><div class="fish-body"></div></div>`;
    const body = paper.querySelector(".fish-body");
    current.letters.forEach((ch) => {
      const b = document.createElement("button");
      b.className = "alpha-dot";
      b.type = "button";
      b.textContent = ch;
      b.addEventListener("click", () => {
        if (b.classList.contains("is-found")) return;
        if (ch === target) {
          b.classList.add("is-found");
          found += 1;
          ui.blip(500 + found * 20);
          if (found === needed) finish();
        } else {
          b.classList.add("is-wrong");
          setTimeout(() => b.classList.remove("is-wrong"), 400);
          ui.blip(160);
        }
      });
      body.appendChild(b);
    });
    return () => {};
  }

  function runDots() {
    const dots = current.dots;
    let next = 0;
    hintEl.textContent = "Tap the dots in order, starting at A.";
    const lines = [];
    paper.innerHTML = `
      <svg viewBox="0 0 400 460" class="dots-svg" xmlns="http://www.w3.org/2000/svg">
        <g class="dot-lines" fill="none" stroke="#ff6b6b" stroke-width="6" stroke-linecap="round"></g>
        <g class="dot-nodes"></g>
      </svg>`;
    const svg = paper.querySelector("svg");
    const lineG = svg.querySelector(".dot-lines");
    const nodeG = svg.querySelector(".dot-nodes");
    dots.forEach((d, i) => {
      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.classList.add("dot-hit");
      g.dataset.i = String(i);
      g.innerHTML = `
        <circle cx="${d.x}" cy="${d.y}" r="18" fill="#fff" stroke="#2b2430" stroke-width="4"/>
        <text x="${d.x}" y="${d.y + 6}" text-anchor="middle" font-size="16" font-weight="800" font-family="Nunito,sans-serif">${d.id}</text>`;
      g.addEventListener("click", () => tap(i));
      nodeG.appendChild(g);
    });

    function tap(i) {
      if (i !== next) {
        ui.blip(160);
        ui.showToast(`Next is ${dots[next].id}`);
        return;
      }
      const node = nodeG.children[i];
      node.querySelector("circle").setAttribute("fill", "#ffd166");
      if (next > 0) {
        const a = dots[next - 1];
        const b = dots[next];
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", a.x);
        line.setAttribute("y1", a.y);
        line.setAttribute("x2", b.x);
        line.setAttribute("y2", b.y);
        lineG.appendChild(line);
        lines.push(line);
      }
      ui.blip(400 + next * 12);
      next += 1;
      if (next === dots.length) {
        hintEl.textContent = "Ice cream! You joined every dot.";
        finish();
      } else {
        hintEl.textContent = `Now tap ${dots[next].id}.`;
      }
    }
    return () => {};
  }

  function runCirclePics() {
    const letter = current.letter;
    const needed = current.items.filter((i) => i.ok).length;
    const picked = new Set();
    hintEl.textContent = `Tap every picture that starts with ${letter}.`;
    paper.innerHTML = `<div class="pic-grid"></div>`;
    const grid = paper.querySelector(".pic-grid");
    current.items.forEach((item, i) => {
      const b = document.createElement("button");
      b.className = "pic-tile";
      b.type = "button";
      b.innerHTML = `${pic(item.name)}<span>${item.word}</span>`;
      b.addEventListener("click", () => {
        if (item.ok) {
          if (picked.has(i)) return;
          picked.add(i);
          b.classList.add("is-matched");
          ui.blip(540);
          if (picked.size === needed) finish();
        } else {
          b.classList.add("is-wrong");
          setTimeout(() => b.classList.remove("is-wrong"), 400);
          ui.blip(160);
          ui.showToast(`Not ${letter}…`);
        }
      });
      grid.appendChild(b);
    });
    return () => {};
  }

  function runQuiz() {
    const items = current.items;
    let index = 0;

    function render() {
      const item = items[index];
      stepEl.textContent = `${index + 1} / ${items.length}`;
      hintEl.textContent = `What letter does ${item.word} start with?`;
      paper.innerHTML = `
        <div class="quiz-card">
          <div class="quiz-pic">${pic(item.name)}</div>
          <p class="quiz-word">${item.word}</p>
          <div class="quiz-choices"></div>
        </div>`;
      const box = paper.querySelector(".quiz-choices");
      item.choices.forEach((ch) => {
        const b = document.createElement("button");
        b.className = "letter-tile";
        b.type = "button";
        b.textContent = ch;
        b.addEventListener("click", () => {
          if (ch === item.answer) {
            b.classList.add("is-matched");
            ui.blip(620);
            index += 1;
            if (index >= items.length) {
              finish();
              hintEl.textContent = "You got every starting letter!";
            } else {
              setTimeout(render, 350);
            }
          } else {
            b.classList.add("is-wrong");
            setTimeout(() => b.classList.remove("is-wrong"), 400);
            ui.blip(160);
          }
        });
        box.appendChild(b);
      });
    }
    render();
    return () => {};
  }

  function runHunt() {
    const letters = current.letters;
    const found = new Set();
    hintEl.textContent = "Tap every letter hiding in the garden.";
    stepEl.textContent = `0 / ${letters.length}`;
    paper.innerHTML = `
      <svg viewBox="0 0 400 460" class="hunt-svg" xmlns="http://www.w3.org/2000/svg">
        <rect class="region-bg" x="0" y="0" width="400" height="460" fill="#e8f7ff" stroke="none"/>
        <ellipse cx="200" cy="430" rx="220" ry="50" fill="#b7e4a8" stroke="#2b2430" stroke-width="4"/>
        <circle cx="70" cy="90" r="28" fill="#ffd166" stroke="#2b2430" stroke-width="4"/>
        <rect x="40" y="240" width="18" height="160" rx="6" fill="#c08552" stroke="#2b2430" stroke-width="4"/>
        <circle cx="49" cy="220" r="40" fill="#7ed9a6" stroke="#2b2430" stroke-width="4"/>
        <ellipse cx="300" cy="300" rx="70" ry="50" fill="#8ce99a" stroke="#2b2430" stroke-width="4"/>
        <circle cx="310" cy="250" r="36" fill="#7ed9a6" stroke="#2b2430" stroke-width="4"/>
        <ellipse cx="200" cy="360" rx="40" ry="24" fill="#fff" stroke="#2b2430" stroke-width="4"/>
        <circle cx="188" cy="354" r="4" fill="#2b2430"/>
        <circle cx="212" cy="354" r="4" fill="#2b2430"/>
        <g class="hunt-letters"></g>
      </svg>`;
    const g = paper.querySelector(".hunt-letters");
    letters.forEach((item, i) => {
      const grp = document.createElementNS("http://www.w3.org/2000/svg", "g");
      grp.classList.add("hunt-letter");
      grp.style.cursor = "pointer";
      grp.innerHTML = `
        <circle cx="${item.x}" cy="${item.y - 8}" r="22" fill="#fffdf8" stroke="#2b2430" stroke-width="3"/>
        <text x="${item.x}" y="${item.y}" text-anchor="middle" font-size="26" font-weight="800" font-family="Baloo 2, Nunito, sans-serif" fill="#2b2430">${item.ch}</text>`;
      grp.addEventListener("click", () => {
        if (found.has(i)) return;
        found.add(i);
        grp.classList.add("is-found");
        grp.querySelector("circle").setAttribute("fill", "#7ed9a6");
        ui.blip(480 + found.size * 15);
        stepEl.textContent = `${found.size} / ${letters.length}`;
        if (found.size === letters.length) finish();
      });
      g.appendChild(grp);
    });
    return () => {};
  }

  document.getElementById("practice-back").addEventListener("click", closeActivity);
  document.getElementById("practice-reset").addEventListener("click", () => {
    if (!current) return;
    startActivity();
    ui.showToast("Let's try again!");
  });

  renderGallery();
}
