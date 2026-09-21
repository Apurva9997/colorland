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
    hat: `<ellipse cx="50" cy="76" rx="38" ry="10" ${common}/><rect x="32" y="20" width="36" height="52" rx="4" ${common}/><rect x="26" y="58" width="48" height="10" rx="2" ${common}/>`,
    frog: `<ellipse cx="50" cy="64" rx="32" ry="20" ${common}/><circle cx="32" cy="40" r="13" ${common}/><circle cx="68" cy="40" r="13" ${common}/><circle cx="32" cy="40" r="5" fill="${ink}"/><circle cx="68" cy="40" r="5" fill="${ink}"/><path d="M36 70 Q50 80 64 70" fill="none" stroke="${ink}" stroke-width="3" stroke-linecap="round"/><ellipse cx="20" cy="82" rx="11" ry="6" ${common}/><ellipse cx="80" cy="82" rx="11" ry="6" ${common}/>`,
    zebra: `<ellipse cx="58" cy="50" rx="26" ry="16" ${common}/><circle cx="28" cy="46" r="13" ${common}/><ellipse cx="16" cy="48" rx="7" ry="5" ${common}/><path d="M22 34 L16 20 M32 34 L32 18" fill="none" stroke="${ink}" stroke-width="4" stroke-linecap="round"/><rect x="44" y="62" width="8" height="24" rx="3" ${common}/><rect x="66" y="62" width="8" height="24" rx="3" ${common}/><path d="M82 48 Q94 40 88 70" fill="none" stroke="${ink}" stroke-width="3" stroke-linecap="round"/><path d="M46 40 L48 60 M56 38 L56 62 M66 40 L64 60 M30 42 L34 54" fill="none" stroke="${ink}" stroke-width="3" stroke-linecap="round"/><circle cx="24" cy="44" r="3" fill="${ink}"/>`,
    tree: `<rect x="42" y="58" width="16" height="34" rx="3" ${common}/><circle cx="32" cy="46" r="18" ${common}/><circle cx="68" cy="46" r="18" ${common}/><circle cx="50" cy="28" r="20" ${common}/><path d="M42 72 L26 82" fill="none" stroke="${ink}" stroke-width="4" stroke-linecap="round"/>`,
    leaf: `<path d="M50 18 Q84 50 50 84 Q16 50 50 18Z" ${common}/><path d="M50 22 L50 78" fill="none" stroke="${ink}" stroke-width="3"/>`,
    xylophone: `<rect x="14" y="26" width="8" height="56" rx="3" ${common}/><rect x="78" y="26" width="8" height="56" rx="3" ${common}/><rect x="22" y="28" width="56" height="9" rx="2" ${common}/><rect x="24" y="42" width="52" height="9" rx="2" ${common}/><rect x="26" y="56" width="48" height="9" rx="2" ${common}/><rect x="28" y="70" width="44" height="9" rx="2" ${common}/><path d="M64 16 L86 38" fill="none" stroke="${ink}" stroke-width="3" stroke-linecap="round"/><circle cx="62" cy="14" r="6" ${common}/>`,
    ball: `<circle cx="50" cy="50" r="28" ${common}/><path d="M22 50 H78 M50 22 V78" fill="none" stroke="${ink}" stroke-width="3"/>`,
    butterfly: `<ellipse cx="28" cy="38" rx="16" ry="20" ${common}/><ellipse cx="72" cy="38" rx="16" ry="20" ${common}/><ellipse cx="30" cy="66" rx="12" ry="12" ${common}/><ellipse cx="70" cy="66" rx="12" ry="12" ${common}/><ellipse cx="50" cy="52" rx="7" ry="24" ${common}/><path d="M46 28 Q40 14 34 16 M54 28 Q60 14 66 16" fill="none" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>`,
    bee: `<ellipse cx="54" cy="58" rx="24" ry="16" ${common}/><path d="M42 48 V68 M54 44 V72 M66 48 V68" fill="none" stroke="${ink}" stroke-width="3" stroke-linecap="round"/><ellipse cx="42" cy="36" rx="12" ry="10" ${common}/><ellipse cx="66" cy="36" rx="12" ry="10" ${common}/><circle cx="28" cy="54" r="11" ${common}/><circle cx="24" cy="52" r="3" fill="${ink}"/><path d="M22 44 L16 32 M28 42 L30 30" fill="none" stroke="${ink}" stroke-width="3" stroke-linecap="round"/><path d="M78 58 L88 58 L82 64Z" ${common}/>`,
    bird: `<ellipse cx="44" cy="54" rx="22" ry="16" ${common}/><circle cx="68" cy="42" r="13" ${common}/><path d="M80 42 L96 48 L80 54Z" ${common}/><ellipse cx="40" cy="52" rx="12" ry="8" ${common}/><path d="M22 54 L8 44 L10 64Z" ${common}/><circle cx="72" cy="40" r="3" fill="${ink}"/><path d="M38 70 L36 84 M50 70 L52 84" fill="none" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>`,
    boat: `<path d="M22 58 L78 58 L68 78 L32 78Z" ${common}/><path d="M50 22 L50 58 L72 58Z" ${common}/>`,
    turtle: `<ellipse cx="46" cy="50" rx="28" ry="20" ${common}/><path d="M46 32 V68 M24 50 H68 M34 38 L58 62 M58 38 L34 62" fill="none" stroke="${ink}" stroke-width="3" stroke-linecap="round"/><ellipse cx="78" cy="48" rx="11" ry="9" ${common}/><circle cx="82" cy="46" r="2.5" fill="${ink}"/><ellipse cx="24" cy="68" rx="9" ry="6" ${common}/><ellipse cx="48" cy="74" rx="9" ry="6" ${common}/><ellipse cx="68" cy="66" rx="9" ry="6" ${common}/>`,
    camel: `<ellipse cx="54" cy="60" rx="28" ry="12" ${common}/><ellipse cx="42" cy="42" rx="12" ry="16" ${common}/><ellipse cx="64" cy="38" rx="13" ry="18" ${common}/><path d="M26 56 Q16 34 24 22" fill="none" stroke="${ink}" stroke-width="8" stroke-linecap="round"/><ellipse cx="26" cy="20" rx="10" ry="7" ${common}/><rect x="38" y="70" width="8" height="20" rx="3" ${common}/><rect x="64" y="70" width="8" height="20" rx="3" ${common}/><path d="M80 58 Q92 50 86 76" fill="none" stroke="${ink}" stroke-width="3" stroke-linecap="round"/><circle cx="24" cy="18" r="2.5" fill="${ink}"/>`,
    cloud: `<ellipse cx="50" cy="54" rx="30" ry="16" ${common}/><circle cx="36" cy="44" r="12" ${common}/><circle cx="58" cy="40" r="14" ${common}/>`,
    icecream: `<path d="M38 52 L50 88 L62 52Z" ${common}/><circle cx="50" cy="40" r="18" ${common}/>`,
    igloo: `<path d="M22 78 Q22 28 50 28 Q78 28 78 78Z" ${common}/><rect x="40" y="58" width="20" height="20" ${common}/>`,
    ink: `<rect x="28" y="44" width="40" height="40" rx="4" ${common}/><rect x="38" y="32" width="20" height="14" rx="2" ${common}/><rect x="34" y="20" width="28" height="14" rx="3" ${common}/><rect x="36" y="56" width="24" height="16" rx="2" ${common}/><path d="M78 46 Q90 60 78 76 Q66 60 78 46Z" ${common}/>`,
    insects: `<ellipse cx="30" cy="60" rx="16" ry="14" ${common}/><circle cx="16" cy="50" r="9" ${common}/><path d="M30 48 V74" fill="none" stroke="${ink}" stroke-width="3" stroke-linecap="round"/><circle cx="24" cy="56" r="3" fill="${ink}"/><circle cx="36" cy="62" r="3" fill="${ink}"/><path d="M12 42 L6 30 M20 42 L22 28" fill="none" stroke="${ink}" stroke-width="3" stroke-linecap="round"/><circle cx="68" cy="40" r="7" ${common}/><circle cx="74" cy="54" r="8" ${common}/><ellipse cx="80" cy="72" rx="9" ry="12" ${common}/><path d="M64 34 L58 22 M72 34 L78 22 M68 56 L58 64 M78 60 L90 68" fill="none" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>`,
    owl: `<ellipse cx="50" cy="58" rx="26" ry="28" ${common}/><circle cx="38" cy="48" r="12" ${common}/><circle cx="62" cy="48" r="12" ${common}/><circle cx="38" cy="48" r="5" fill="${ink}"/><circle cx="62" cy="48" r="5" fill="${ink}"/><path d="M46 58 L50 68 L54 58Z" ${common}/><path d="M30 28 L22 10 L42 26Z" ${common}/><path d="M70 28 L78 10 L58 26Z" ${common}/>`,
    goat: `<ellipse cx="58" cy="54" rx="24" ry="16" ${common}/><circle cx="30" cy="46" r="13" ${common}/><ellipse cx="18" cy="50" rx="7" ry="5" ${common}/><path d="M24 36 Q16 16 10 22 M34 34 Q40 14 46 20" fill="none" stroke="${ink}" stroke-width="4" stroke-linecap="round"/><path d="M24 58 Q20 74 32 68" fill="none" stroke="${ink}" stroke-width="3" stroke-linecap="round"/><rect x="46" y="66" width="8" height="22" rx="3" ${common}/><rect x="66" y="66" width="8" height="22" rx="3" ${common}/><path d="M80 52 Q92 44 86 70" fill="none" stroke="${ink}" stroke-width="3" stroke-linecap="round"/><circle cx="26" cy="44" r="3" fill="${ink}"/>`,
    giraffe: `<ellipse cx="44" cy="76" rx="22" ry="11" ${common}/><rect x="56" y="20" width="11" height="56" rx="5" ${common}/><ellipse cx="66" cy="18" rx="14" ry="10" ${common}/><circle cx="60" cy="6" r="3.5" ${common}/><circle cx="76" cy="6" r="3.5" ${common}/><path d="M60 8 L58 2 M76 8 L78 2" fill="none" stroke="${ink}" stroke-width="3" stroke-linecap="round"/><rect x="32" y="84" width="8" height="14" rx="3" ${common}/><rect x="50" y="84" width="8" height="14" rx="3" ${common}/><circle cx="38" cy="74" r="3" fill="${ink}"/><circle cx="50" cy="72" r="3" fill="${ink}"/><circle cx="62" cy="40" r="2.5" fill="${ink}"/><circle cx="64" cy="54" r="2.5" fill="${ink}"/><circle cx="70" cy="16" r="2.5" fill="${ink}"/><path d="M22 76 Q12 72 14 88" fill="none" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>`,
    yoyo: `<circle cx="50" cy="62" r="26" ${common}/><circle cx="50" cy="62" r="14" ${common}/><circle cx="50" cy="62" r="5" fill="${ink}"/><path d="M24 62 H76 M50 36 V12" fill="none" stroke="${ink}" stroke-width="3" stroke-linecap="round"/><circle cx="50" cy="10" r="5" ${common}/>`,
    apple: `<path d="M50 30 Q78 30 78 58 Q78 84 50 84 Q22 84 22 58 Q22 30 50 30Z" ${common}/><path d="M50 30 Q56 16 64 18" fill="none" stroke="${ink}" stroke-width="3"/>`,
    violin: `<ellipse cx="38" cy="72" rx="18" ry="16" ${common}/><ellipse cx="46" cy="50" rx="14" ry="14" ${common}/><rect x="52" y="16" width="8" height="40" rx="2" ${common}/><circle cx="56" cy="14" r="7" ${common}/><path d="M32 66 Q38 72 32 78 M48 44 Q54 50 48 56" fill="none" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>`,
    fish: `<ellipse cx="48" cy="50" rx="26" ry="16" ${common}/><path d="M74 50 L92 34 L92 66Z" ${common}/>`,
    arrow: `<path d="M20 50 H70" stroke="${ink}" stroke-width="5" stroke-linecap="round"/><path d="M58 32 L82 50 L58 68Z" ${common}/>`,
    ice: `<rect x="22" y="38" width="24" height="24" rx="4" ${common}/><rect x="44" y="50" width="28" height="24" rx="4" ${common}/>`,
    veggies: `<path d="M30 86 L42 34 L54 86Z" ${common}/><path d="M42 34 Q34 16 26 22 M42 34 Q42 12 50 20 M42 34 Q54 16 60 24" fill="none" stroke="${ink}" stroke-width="3" stroke-linecap="round"/><circle cx="72" cy="70" r="16" ${common}/>`,
    eagle: `<path d="M10 58 Q32 24 50 46 Q68 24 90 58 Q50 42 10 58Z" ${common}/><circle cx="50" cy="40" r="12" ${common}/><path d="M50 36 L64 42 L50 48Z" ${common}/><path d="M44 54 L50 76 L56 54" ${common}/>`,
    hand: `<path d="M38 78 V40 M50 78 V28 M62 78 V40 M28 70 V50" stroke="${ink}" stroke-width="8" stroke-linecap="round"/><ellipse cx="50" cy="78" rx="22" ry="12" ${common}/>`,
    nest: `<ellipse cx="50" cy="68" rx="34" ry="16" ${common}/><ellipse cx="38" cy="54" rx="10" ry="8" ${common}/><ellipse cx="58" cy="52" rx="10" ry="8" ${common}/><path d="M20 64 Q30 78 24 86 M40 70 Q50 86 56 70 M72 64 Q80 80 86 66" fill="none" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>`,
    needle: `<path d="M22 78 L78 22" stroke="${ink}" stroke-width="4"/><circle cx="78" cy="22" r="6" ${common}/>`,
    net: `<circle cx="42" cy="42" r="22" ${common}/><path d="M58 58 L78 82" stroke="${ink}" stroke-width="4"/>`,
    astronaut: `<circle cx="50" cy="32" r="16" ${common}/><rect x="32" y="48" width="36" height="32" rx="8" ${common}/>`,
    apron: `<path d="M34 16 L42 40 H58 L66 16" fill="none" stroke="${ink}" stroke-width="4" stroke-linecap="round"/><path d="M28 40 H72 L80 88 H20Z" ${common}/><circle cx="50" cy="58" r="6" ${common}/><path d="M28 40 H16 M72 40 H84" fill="none" stroke="${ink}" stroke-width="4" stroke-linecap="round"/>`,
    flag: `<rect x="28" y="20" width="8" height="64" ${common}/><rect x="36" y="22" width="40" height="28" ${common}/>`,
    fox: `<ellipse cx="48" cy="62" rx="22" ry="16" ${common}/><circle cx="48" cy="42" r="14" ${common}/><path d="M34 34 L26 14 L44 32Z" ${common}/><path d="M62 34 L74 14 L56 32Z" ${common}/><path d="M48 46 L34 62 L62 62Z" ${common}/><ellipse cx="80" cy="66" rx="14" ry="10" ${common}/><circle cx="42" cy="40" r="3" fill="${ink}"/><circle cx="54" cy="40" r="3" fill="${ink}"/>`,
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
      { id: "I", x: 250, y: 340 },
      { id: "J", x: 200, y: 410 },
      { id: "K", x: 150, y: 340 }
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
      { ch: "A", x: 58, y: 170, fill: "#2f7a52" },
      { ch: "H", x: 77, y: 258, fill: "#7a4a28" },
      { ch: "G", x: 32, y: 350, fill: "#3d8a5c" },
      { ch: "D", x: 96, y: 432, fill: "#2f7a52" },
      { ch: "M", x: 198, y: 226, fill: "#2f7a52" },
      { ch: "B", x: 346, y: 196, fill: "#2f7a52" },
      { ch: "E", x: 370, y: 336, fill: "#3d8a5c" },
      { ch: "C", x: 322, y: 72, fill: "#6a9eae" },
      { ch: "K", x: 236, y: 362, fill: "#2f7a52" },
      { ch: "F", x: 318, y: 430, fill: "#3d8a5c" }
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
    paper.innerHTML = `<div class="fish-board"><div class="fish"><span class="fish-tail" aria-hidden="true"></span><span class="fish-fin" aria-hidden="true"></span><div class="fish-body"><span class="fish-eye" aria-hidden="true"></span></div></div></div>`;
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
            ui.showToast("Try another letter!");
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
      <svg viewBox="0 0 400 460" class="hunt-svg" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <rect class="region-bg" x="0" y="0" width="400" height="460" fill="#d8f4fc" stroke="none"/>
        <circle cx="78" cy="56" r="28" fill="#ffd166" stroke="#2b2430" stroke-width="4"/>
        <ellipse cx="175" cy="44" rx="30" ry="16" fill="#fffdf8" stroke="#2b2430" stroke-width="4"/>
        <ellipse cx="198" cy="46" rx="20" ry="13" fill="#fffdf8" stroke="#2b2430" stroke-width="4"/>
        <ellipse cx="154" cy="48" rx="16" ry="11" fill="#fffdf8" stroke="#2b2430" stroke-width="4"/>
        <ellipse cx="300" cy="68" rx="28" ry="15" fill="#fffdf8" stroke="#2b2430" stroke-width="4"/>
        <ellipse cx="322" cy="70" rx="18" ry="12" fill="#fffdf8" stroke="#2b2430" stroke-width="4"/>
        <ellipse cx="280" cy="72" rx="14" ry="10" fill="#fffdf8" stroke="#2b2430" stroke-width="4"/>
        <ellipse cx="28" cy="118" rx="20" ry="12" fill="#fffdf8" stroke="#2b2430" stroke-width="4"/>
        <ellipse cx="44" cy="120" rx="14" ry="10" fill="#fffdf8" stroke="#2b2430" stroke-width="4"/>
        <path d="M-20 230 C 50 188 120 222 185 198 C 255 174 325 208 420 182 L 420 470 L -20 470 Z" fill="#9ed4b5" stroke="#2b2430" stroke-width="4" stroke-linejoin="round"/>
        <rect x="140" y="208" width="10" height="52" rx="4" fill="#c08552" stroke="#2b2430" stroke-width="4"/>
        <circle cx="145" cy="198" r="20" fill="#6bc992" stroke="#2b2430" stroke-width="4"/>
        <path d="M-20 292 C 70 252 155 312 242 276 C 322 246 372 282 420 262 L 420 470 L -20 470 Z" fill="#b7e4a8" stroke="#2b2430" stroke-width="4" stroke-linejoin="round"/>
        <rect x="68" y="198" width="18" height="140" rx="6" fill="#c08552" stroke="#2b2430" stroke-width="4"/>
        <circle cx="77" cy="175" r="46" fill="#7ed9a6" stroke="#2b2430" stroke-width="4"/>
        <circle cx="50" cy="196" r="26" fill="#8ce99a" stroke="#2b2430" stroke-width="4"/>
        <circle cx="102" cy="192" r="22" fill="#6bc992" stroke="#2b2430" stroke-width="4"/>
        <rect x="189" y="242" width="14" height="90" rx="5" fill="#c08552" stroke="#2b2430" stroke-width="4"/>
        <circle cx="196" cy="228" r="32" fill="#7ed9a6" stroke="#2b2430" stroke-width="4"/>
        <circle cx="178" cy="240" r="18" fill="#8ce99a" stroke="#2b2430" stroke-width="4"/>
        <rect x="310" y="205" width="18" height="135" rx="6" fill="#c08552" stroke="#2b2430" stroke-width="4"/>
        <ellipse cx="318" cy="248" rx="60" ry="44" fill="#8ce99a" stroke="#2b2430" stroke-width="4"/>
        <circle cx="332" cy="202" r="38" fill="#7ed9a6" stroke="#2b2430" stroke-width="4"/>
        <ellipse cx="168" cy="318" rx="30" ry="18" fill="#fffdf8" stroke="#2b2430" stroke-width="4"/>
        <circle cx="158" cy="314" r="3.5" fill="#2b2430"/>
        <circle cx="178" cy="314" r="3.5" fill="#2b2430"/>
        <path d="M-20 392 C 80 366 162 412 252 382 C 332 356 382 386 420 372 L 420 470 L -20 470 Z" fill="#8ce99a" stroke="#2b2430" stroke-width="4" stroke-linejoin="round"/>
        <ellipse cx="28" cy="348" rx="34" ry="20" fill="#6bc992" stroke="#2b2430" stroke-width="4"/>
        <ellipse cx="125" cy="368" rx="38" ry="22" fill="#7ed9a6" stroke="#2b2430" stroke-width="4"/>
        <ellipse cx="235" cy="358" rx="42" ry="24" fill="#6bc992" stroke="#2b2430" stroke-width="4"/>
        <ellipse cx="372" cy="332" rx="34" ry="20" fill="#7ed9a6" stroke="#2b2430" stroke-width="4"/>
        <ellipse cx="90" cy="432" rx="40" ry="18" fill="#5bb882" stroke="#2b2430" stroke-width="4"/>
        <ellipse cx="200" cy="440" rx="48" ry="16" fill="#6bc992" stroke="#2b2430" stroke-width="4"/>
        <ellipse cx="325" cy="432" rx="44" ry="18" fill="#7ed9a6" stroke="#2b2430" stroke-width="4"/>
        <line x1="118" y1="392" x2="118" y2="358" stroke="#2b2430" stroke-width="4" stroke-linecap="round"/>
        <circle cx="118" cy="348" r="7" fill="#ff6b6b" stroke="#2b2430" stroke-width="3"/>
        <circle cx="109" cy="354" r="7" fill="#ff6b6b" stroke="#2b2430" stroke-width="3"/>
        <circle cx="127" cy="354" r="7" fill="#ff6b6b" stroke="#2b2430" stroke-width="3"/>
        <circle cx="118" cy="354" r="5" fill="#ffd166" stroke="#2b2430" stroke-width="3"/>
        <line x1="160" y1="418" x2="160" y2="388" stroke="#2b2430" stroke-width="4" stroke-linecap="round"/>
        <circle cx="160" cy="378" r="7" fill="#c9a8ff" stroke="#2b2430" stroke-width="3"/>
        <circle cx="151" cy="384" r="7" fill="#c9a8ff" stroke="#2b2430" stroke-width="3"/>
        <circle cx="169" cy="384" r="7" fill="#c9a8ff" stroke="#2b2430" stroke-width="3"/>
        <circle cx="160" cy="384" r="5" fill="#ffd166" stroke="#2b2430" stroke-width="3"/>
        <line x1="270" y1="412" x2="270" y2="382" stroke="#2b2430" stroke-width="4" stroke-linecap="round"/>
        <circle cx="270" cy="372" r="7" fill="#ffd166" stroke="#2b2430" stroke-width="3"/>
        <circle cx="261" cy="378" r="7" fill="#ffd166" stroke="#2b2430" stroke-width="3"/>
        <circle cx="279" cy="378" r="7" fill="#ffd166" stroke="#2b2430" stroke-width="3"/>
        <circle cx="270" cy="378" r="5" fill="#ff6b6b" stroke="#2b2430" stroke-width="3"/>
        <line x1="48" y1="418" x2="48" y2="390" stroke="#2b2430" stroke-width="4" stroke-linecap="round"/>
        <circle cx="48" cy="380" r="7" fill="#5ec8e3" stroke="#2b2430" stroke-width="3"/>
        <circle cx="39" cy="386" r="7" fill="#5ec8e3" stroke="#2b2430" stroke-width="3"/>
        <circle cx="57" cy="386" r="7" fill="#5ec8e3" stroke="#2b2430" stroke-width="3"/>
        <circle cx="48" cy="386" r="5" fill="#ffd166" stroke="#2b2430" stroke-width="3"/>
        <line x1="355" y1="402" x2="355" y2="372" stroke="#2b2430" stroke-width="4" stroke-linecap="round"/>
        <circle cx="355" cy="362" r="7" fill="#ff6b6b" stroke="#2b2430" stroke-width="3"/>
        <circle cx="346" cy="368" r="7" fill="#ff6b6b" stroke="#2b2430" stroke-width="3"/>
        <circle cx="364" cy="368" r="7" fill="#ff6b6b" stroke="#2b2430" stroke-width="3"/>
        <circle cx="355" cy="368" r="5" fill="#ffd166" stroke="#2b2430" stroke-width="3"/>
        <path d="M18 448 q8 -16 16 0" fill="none" stroke="#2b2430" stroke-width="3" stroke-linecap="round"/>
        <path d="M150 452 q8 -14 16 0" fill="none" stroke="#2b2430" stroke-width="3" stroke-linecap="round"/>
        <path d="M248 450 q8 -16 16 0" fill="none" stroke="#2b2430" stroke-width="3" stroke-linecap="round"/>
        <path d="M378 446 q8 -14 16 0" fill="none" stroke="#2b2430" stroke-width="3" stroke-linecap="round"/>
        <g class="hunt-letters"></g>
      </svg>`;
    const g = paper.querySelector(".hunt-letters");
    letters.forEach((item, i) => {
      const grp = document.createElementNS("http://www.w3.org/2000/svg", "g");
      grp.classList.add("hunt-letter");
      grp.style.cursor = "pointer";
      const fill = item.fill || "#2f7a52";
      grp.innerHTML = `
        <circle cx="${item.x}" cy="${item.y - 7}" r="18" fill="transparent" stroke="none"/>
        <text x="${item.x}" y="${item.y}" text-anchor="middle" font-size="20" font-weight="800" font-family="Baloo 2, Nunito, sans-serif" fill="${fill}">${item.ch}</text>`;
      grp.addEventListener("click", () => {
        if (found.has(i)) return;
        found.add(i);
        grp.classList.add("is-found");
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
