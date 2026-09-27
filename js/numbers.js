import { ui } from "./ui.js";

const WRITE_STORE = "colorland-numbers-write-v1";
const COUNT_STORE = "colorland-numbers-count-v1";
const SHAPE_STORE = "colorland-numbers-shape-v1";
const COMPARE_STORE = "colorland-numbers-compare-v1";

const NUMERALS = ["1", "7", "4", "2", "9", "5", "3"];
const COUNTS = [1, 2, 3, 4, 5];
const SHAPES = [
  { id: "circle", name: "circle" },
  { id: "square", name: "square" },
  { id: "rectangle", name: "rectangle" }
];
const PAIRS = [
  { id: "size", ask: "Tap the big one.", say: "Tap the big one.", cheer: "Yes! That one is big.", kind: "size" },
  { id: "height", ask: "Tap the tall one.", say: "Tap the tall one.", cheer: "Yes! That one is tall.", kind: "height" },
  { id: "mood", ask: "Tap the happy one.", say: "Tap the happy one.", cheer: "Yes! That one is happy.", kind: "mood" }
];

const GAMES = {
  write: {
    title: "Write the Number",
    store: WRITE_STORE,
    preview: "7",
    rounds: NUMERALS
  },
  count: {
    title: "Count and Write",
    store: COUNT_STORE,
    preview: "5",
    rounds: COUNTS
  },
  shapes: {
    title: "Find the Shape",
    store: SHAPE_STORE,
    preview: "○",
    rounds: SHAPES
  },
  compare: {
    title: "Big or Small",
    store: COMPARE_STORE,
    preview: "▲",
    rounds: PAIRS
  }
};

function loadMap(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "{}");
  } catch {
    return {};
  }
}

function bump(key, id) {
  const store = loadMap(key);
  store[id] = Math.min((store[id] || 0) + 1, 3);
  localStorage.setItem(key, JSON.stringify(store));
}

function speak(text) {
  if (ui.muted || !window.speechSynthesis) return Promise.resolve();
  return new Promise((resolve) => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      resolve();
    };
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.82;
    utter.pitch = 1.05;
    const voices = window.speechSynthesis.getVoices?.() || [];
    const voice =
      voices.find((v) => /Rishi|Tara|Aman|Veena/.test(v.name)) ||
      voices.find((v) => /en[-_]IN/i.test(v.lang)) ||
      voices.find((v) => /^en/i.test(v.lang)) ||
      null;
    if (voice) utter.voice = voice;
    utter.onend = finish;
    utter.onerror = finish;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
    setTimeout(() => {
      if (!window.speechSynthesis.speaking && !window.speechSynthesis.pending) finish();
    }, 700);
    setTimeout(finish, 5000);
  });
}

function shuffle(list) {
  const out = list.slice();
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function numberChoices(target) {
  const others = shuffle(NUMERALS.filter((n) => n !== target)).slice(0, 2);
  return shuffle([target, ...others]);
}

function countChoices(target) {
  const others = shuffle(COUNTS.filter((n) => n !== target)).slice(0, 2);
  return shuffle([target, ...others]);
}

function dots(n) {
  return `<span class="dot-row" aria-hidden="true">${"●".repeat(n)}</span>`;
}

function shapeSvg(id) {
  const common = `fill="#fff6df" stroke="#2b2430" stroke-width="8"`;
  if (id === "circle") return `<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="34" ${common}/></svg>`;
  if (id === "square") return `<svg viewBox="0 0 100 100" aria-hidden="true"><rect x="18" y="18" width="64" height="64" rx="6" ${common}/></svg>`;
  return `<svg viewBox="0 0 100 100" aria-hidden="true"><rect x="10" y="28" width="80" height="44" rx="6" ${common}/></svg>`;
}

function faceSvg(kind) {
  const mouth = kind === "happy" ? "M30 62 Q50 78 70 62" : "M30 72 Q50 56 70 72";
  return `<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="36" fill="#ffd166" stroke="#2b2430" stroke-width="6"/><circle cx="36" cy="44" r="5" fill="#2b2430"/><circle cx="64" cy="44" r="5" fill="#2b2430"/><path d="${mouth}" fill="none" stroke="#2b2430" stroke-width="5" stroke-linecap="round"/></svg>`;
}

export function bootNumbers() {
  const home = document.getElementById("home");
  const studio = document.getElementById("phonics-studio");
  const paper = document.getElementById("phonics-paper");
  const titleEl = document.getElementById("phonics-title");
  const hintEl = document.getElementById("phonics-hint");
  const stepEl = document.getElementById("phonics-step");
  const backBtn = document.getElementById("phonics-back");
  const cards = {
    write: document.getElementById("num-write"),
    count: document.getElementById("num-count"),
    shapes: document.getElementById("num-shapes"),
    compare: document.getElementById("num-compare")
  };
  if (!studio || !cards.write) return;

  let mode = "write";
  let index = 0;
  let round = 0;
  let locked = false;
  let heard = false;
  let active = false;
  let timers = [];

  function later(fn, ms) {
    const id = setTimeout(fn, ms);
    timers.push(id);
    return id;
  }

  function clearTimers() {
    timers.forEach((id) => clearTimeout(id));
    timers = [];
    window.speechSynthesis?.cancel();
  }

  function game() {
    return GAMES[mode];
  }

  function rounds() {
    return game().rounds;
  }

  function renderCards() {
    Object.entries(GAMES).forEach(([id, g]) => {
      const el = cards[id];
      if (!el) return;
      const done = loadMap(g.store);
      const learned = g.rounds.filter((item) => done[item.id || item]).length;
      el.innerHTML = `
        <div class="card-preview practice-preview phonics-preview">
          <div class="phonics-preview-face"><span class="phonics-preview-letter">${g.preview}</span></div>
        </div>
        <div class="card-meta">
          <h3>${g.title}</h3>
          <span class="badge ${learned >= g.rounds.length ? "done" : ""}">${learned ? `${learned}/${g.rounds.length}` : "Play"}</span>
        </div>`;
    });
  }

  function promptFor(item) {
    if (mode === "write") return { line: "Write the number.", say: `Write ${item}.`, ask: "Tap the number you heard." };
    if (mode === "count") return { line: "How many?", say: "How many dots?", ask: "Tap the number." };
    if (mode === "shapes") return { line: "What shape is this?", say: "What shape is this?", ask: "Tap the shape." };
    return { line: item.ask, say: item.say, ask: "Tap one." };
  }

  function cheerFor(item) {
    if (mode === "write" || mode === "count") return `Yes! That is ${item}.`;
    if (mode === "shapes") return `Yes! It is a ${item.name}.`;
    return item.cheer;
  }

  function faceFor(item) {
    if (mode === "write") return `<div class="monster-face letter-hide" aria-hidden="true">?</div>`;
    if (mode === "count") return `<div class="monster-face count-face">${dots(item)}</div>`;
    if (mode === "shapes") return `<div class="monster-face book-face shape-face">${shapeSvg(item.id)}</div>`;
    if (item.kind === "mood") return `<div class="monster-face letter-hide" aria-hidden="true">?</div>`;
    return `<div class="monster-face letter-hide" aria-hidden="true">?</div>`;
  }

  function choiceButton(choice, item) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "fight-pick";
    if (mode === "write" || mode === "count") {
      btn.dataset.id = String(choice);
      btn.innerHTML = `<span class="find-letter">${choice}</span>`;
      btn.setAttribute("aria-label", `Number ${choice}`);
    } else if (mode === "shapes") {
      btn.dataset.id = choice.id;
      btn.innerHTML = shapeSvg(choice.id);
      btn.setAttribute("aria-label", choice.name);
    } else if (item.kind === "size") {
      btn.dataset.id = choice;
      btn.innerHTML = `<span class="compare-blob ${choice}" aria-hidden="true"></span>`;
      btn.setAttribute("aria-label", choice === "big" ? "Big" : "Small");
    } else if (item.kind === "height") {
      btn.dataset.id = choice;
      btn.innerHTML = `<span class="compare-bar ${choice}" aria-hidden="true"></span>`;
      btn.setAttribute("aria-label", choice === "tall" ? "Tall" : "Short");
    } else {
      btn.dataset.id = choice;
      btn.innerHTML = faceSvg(choice);
      btn.setAttribute("aria-label", choice === "happy" ? "Happy" : "Sad");
    }
    return btn;
  }

  function choicesFor(item) {
    if (mode === "write") return numberChoices(item);
    if (mode === "count") return countChoices(item);
    if (mode === "shapes") return shuffle(SHAPES);
    if (item.kind === "size") return shuffle(["big", "small"]);
    if (item.kind === "height") return shuffle(["tall", "short"]);
    return shuffle(["happy", "sad"]);
  }

  function itemId(item) {
    return String(item.id || item);
  }

  function isRight(choice, item) {
    if (mode === "write" || mode === "count") return String(choice) === String(item);
    if (mode === "shapes") return choice.id === item.id;
    if (item.kind === "size") return choice === "big";
    if (item.kind === "height") return choice === "tall";
    return choice === "happy";
  }

  function startRound() {
    clearTimers();
    locked = true;
    heard = false;
    const item = rounds()[index];
    const prompt = promptFor(item);
    stepEl.textContent = `${index + 1} / ${rounds().length}`;
    titleEl.textContent = game().title;
    hintEl.textContent = "Listen…";
    paper.innerHTML = `
      <div class="fight">
        <div class="fight-sky">
          <div class="monster" id="monster">
            ${faceFor(item)}
          </div>
          <p class="fight-line" id="fight-line">${prompt.line}</p>
          <button class="hear-btn" id="hear-btn" type="button">Hear it again</button>
        </div>
        <div class="fight-picks ${mode === "compare" ? "compare-picks" : ""}" id="fight-picks"></div>
      </div>`;
    const picks = paper.querySelector("#fight-picks");
    choicesFor(item).forEach((choice) => {
      const btn = choiceButton(choice, item);
      btn.addEventListener("click", () => onPick(choice, item, btn));
      picks.appendChild(btn);
    });
    paper.querySelector("#hear-btn").addEventListener("click", () => sayPrompt(item, true));
    locked = false;
    sayPrompt(item, false);
  }

  async function sayPrompt(item, fromTap) {
    heard = true;
    const prompt = promptFor(item);
    const monster = paper.querySelector("#monster");
    monster?.classList.add("is-talking");
    const line = paper.querySelector("#fight-line");
    if (line) line.textContent = prompt.line;
    hintEl.textContent = prompt.ask;
    await speak(prompt.say);
    monster?.classList.remove("is-talking");
  }

  function onPick(choice, item, btn) {
    if (!active || locked) return;
    if (!isRight(choice, item)) {
      btn.classList.add("is-wrong");
      ui.blip(180);
      ui.showToast("Listen again!");
      later(() => btn.classList.remove("is-wrong"), 450);
      sayPrompt(item, true);
      return;
    }
    locked = true;
    btn.classList.add("is-hit");
    const monster = paper.querySelector("#monster");
    monster?.classList.add("is-talking");
    ui.blip(420);
    bump(game().store, itemId(item));
    const cheer = cheerFor(item);
    const line = paper.querySelector("#fight-line");
    if (line) line.textContent = cheer;
    hintEl.textContent = "Listen.";
    const started = Date.now();
    speak(cheer).finally(() => {
      monster?.classList.remove("is-talking");
      later(() => {
        if (!active) return;
        round += 1;
        if (round >= rounds().length) {
          win();
          return;
        }
        index = (index + 1) % rounds().length;
        startRound();
      }, Math.max(0, 4000 - (Date.now() - started)));
    });
  }

  function win() {
    clearTimers();
    ui.confetti();
    ui.fanfare();
    titleEl.textContent = "You won!";
    stepEl.textContent = `${rounds().length} / ${rounds().length}`;
    hintEl.textContent = "You know these numbers.";
    paper.innerHTML = `
      <div class="fight-win">
        <p class="fight-win-title">You know these numbers.</p>
        <button class="hear-btn" id="again-btn" type="button">Play again</button>
      </div>`;
    paper.querySelector("#again-btn").addEventListener("click", () => {
      index = 0;
      round = 0;
      startRound();
    });
    speak("You did it.");
  }

  function openGame(nextMode) {
    mode = nextMode;
    index = 0;
    round = 0;
    active = true;
    home.classList.add("is-hidden");
    studio.classList.add("is-open");
    backBtn.textContent = "← Numbers";
    titleEl.textContent = game().title;
    startRound();
  }

  function closeGame() {
    if (!active) return;
    active = false;
    clearTimers();
    studio.classList.remove("is-open");
    home.classList.remove("is-hidden");
    paper.innerHTML = "";
    backBtn.textContent = "← Sounds";
    renderCards();
  }

  Object.entries(cards).forEach(([id, el]) => {
    el?.addEventListener("click", () => openGame(id));
  });
  backBtn?.addEventListener("click", closeGame, true);
  document.getElementById("phonics-reset")?.addEventListener("click", (event) => {
    if (!active) return;
    event.stopImmediatePropagation();
    index = 0;
    round = 0;
    startRound();
    ui.showToast("From the start!");
  });

  if (window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = () => {};
    window.speechSynthesis.getVoices();
  }
  renderCards();
}
