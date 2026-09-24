import { ui } from "./ui.js";

const STORE = "colorland-phonics-v1";
const BOOK_STORE = "colorland-book-v1";
const FIND_STORE = "colorland-find-letter-v1";

// Phonic sounds A–M, Indian nursery style.
// The sound is the lesson. The word is the memory hook.
// "A says a, alligator" — not the letter name by itself.
const LETTERS = [
  { ch: "A", sound: "a", word: "alligator", pic: "alligator", color: "#8ce99a", line: "A says a, alligator." },
  { ch: "B", sound: "b", word: "bird", pic: "bird", color: "#74c0fc", line: "B says b, bird." },
  { ch: "C", sound: "c", word: "cat", pic: "cat", color: "#ced4da", line: "C says c, cat." },
  { ch: "D", sound: "d", word: "dolphin", pic: "dolphin", color: "#4dabf7", line: "D says d, dolphin." },
  { ch: "E", sound: "e", word: "elephant", pic: "elephant", color: "#adb5bd", line: "E says e, elephant." },
  { ch: "F", sound: "f", word: "fox", pic: "fox", color: "#ff922b", line: "F says f, fox." },
  { ch: "G", sound: "g", word: "goat", pic: "goat", color: "#f3d9b1", line: "G says g, goat." },
  { ch: "H", sound: "h", word: "horse", pic: "horse", color: "#c08552", line: "H says h, horse." },
  { ch: "I", sound: "i", word: "ice cream", pic: "icecream", color: "#ff8fab", line: "I says i, ice cream." },
  { ch: "J", sound: "j", word: "joker", pic: "joker", color: "#ffd166", line: "J says j, joker." },
  { ch: "K", sound: "k", word: "koala", pic: "koala", color: "#ced4da", line: "K says k, koala." },
  { ch: "L", sound: "l", word: "lion", pic: "lion", color: "#ffd43b", line: "L says l, lion." },
  { ch: "M", sound: "m", word: "monkey", pic: "monkey", color: "#c08552", line: "M says m, monkey." }
];

const VOICE_ORDER = ["Rishi", "Tara", "Aman", "Veena", "Samantha", "Daniel"];

// Book drawings, served from /abc. Names are a fixed map, never a path.
const PIC_FILE = { icecream: "ice-cream" };

function pic(name) {
  const file = PIC_FILE[name] || name;
  return `<img src="/abc/${file}.jpg" alt="" draggable="false">`;
}

function loadMap(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "{}");
  } catch {
    return {};
  }
}

function bump(key, ch) {
  const store = loadMap(key);
  store[ch] = (store[ch] || 0) + 1;
  localStorage.setItem(key, JSON.stringify(store));
}

function pickVoice() {
  const voices = window.speechSynthesis?.getVoices?.() || [];
  for (const name of VOICE_ORDER) {
    const hit = voices.find((v) => v.name === name || v.name.startsWith(name));
    if (hit) return hit;
  }
  return (
    voices.find((v) => /en[-_]IN/i.test(v.lang)) ||
    voices.find((v) => /^en/i.test(v.lang)) ||
    null
  );
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
    const voice = pickVoice();
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

function article(word) {
  return /^[aeiou]/i.test(word) ? "an" : "a";
}

function choicesFor(target) {
  const others = shuffle(LETTERS.filter((l) => l.ch !== target.ch)).slice(0, 2);
  return shuffle([target, ...others]);
}

const GAMES = {
  sounds: {
    title: "Sound Fight",
    store: STORE,
    preview: "A",
    monster: "👾",
    line: (letter) => `${letter.ch} says ${letter.sound}.`,
    say: (letter) => letter.line,
    ask: () => "Tap the picture.",
    cheer: (letter) => `Yes! ${letter.ch} says ${letter.sound}, ${letter.word}.`,
    win: "You know the sounds A to M."
  },
  book: {
    title: "Name the Picture",
    store: BOOK_STORE,
    preview: "🦊",
    monster: "",
    line: () => "What is this?",
    say: () => "What is this?",
    ask: () => "Tap the picture.",
    cheer: (letter) => `Yes! It is ${article(letter.word)} ${letter.word}.`,
    win: "You named the pictures in the book."
  },
  letters: {
    title: "Find the Letter",
    store: FIND_STORE,
    preview: "M",
    monster: "🎈",
    line: () => "Find the letter.",
    say: (letter) => `Find the letter ${letter.ch}.`,
    ask: () => "Tap the letter you heard.",
    cheer: (letter) => `Yes! That is ${letter.ch}.`,
    win: "You found every letter A to M."
  }
};

export function bootPhonics() {
  const home = document.getElementById("home");
  const studio = document.getElementById("phonics-studio");
  const paper = document.getElementById("phonics-paper");
  const titleEl = document.getElementById("phonics-title");
  const hintEl = document.getElementById("phonics-hint");
  const stepEl = document.getElementById("phonics-step");
  const cards = {
    sounds: document.getElementById("phonics-card"),
    book: document.getElementById("book-card"),
    letters: document.getElementById("letters-card")
  };
  if (!studio || !cards.sounds) return;

  let mode = "sounds";
  let index = 0;
  let round = 0;
  let locked = false;
  let heard = false;
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

  function starsFor(ch) {
    const n = Math.min(loadMap(game().store)[ch] || 0, 3);
    return "★".repeat(n) + "☆".repeat(3 - n);
  }

  function badge(key) {
    const done = loadMap(key);
    const learned = LETTERS.filter((l) => done[l.ch]).length;
    return learned ? `${learned}/13` : "Play";
  }

  function renderCard() {
    Object.entries(GAMES).forEach(([id, game]) => {
      const el = cards[id];
      if (!el) return;
      const learned = LETTERS.filter((l) => loadMap(game.store)[l.ch]).length;
      el.innerHTML = `
        <div class="card-preview practice-preview phonics-preview">
          <div class="phonics-preview-face">
            <span class="phonics-preview-letter">${game.preview}</span>
            ${game.monster ? `<span class="phonics-preview-monster" aria-hidden="true">${game.monster}</span>` : ""}
          </div>
        </div>
        <div class="card-meta">
          <h3>${game.title}</h3>
          <span class="badge ${learned >= LETTERS.length ? "done" : ""}">${badge(game.store)}</span>
        </div>`;
    });
  }

  function openGame(nextMode) {
    mode = nextMode;
    index = 0;
    round = 0;
    home.classList.add("is-hidden");
    studio.classList.add("is-open");
    titleEl.textContent = GAMES[mode].title;
    startRound();
  }

  function closeGame() {
    clearTimers();
    studio.classList.remove("is-open");
    home.classList.remove("is-hidden");
    paper.innerHTML = "";
    renderCard();
  }

  function game() {
    return GAMES[mode];
  }

  function startRound() {
    clearTimers();
    locked = true;
    heard = false;
    const letter = LETTERS[index];
    const choices = choicesFor(letter);
    const g = game();
    stepEl.textContent = `${index + 1} / ${LETTERS.length}`;
    titleEl.textContent = g.title;
    hintEl.textContent = "Listen…";
    const face = mode === "book"
      ? `<div class="monster-face book-face">${pic(letter.pic)}</div>`
      : mode === "letters"
        ? `<div class="monster-face letter-hide" aria-hidden="true">?</div>`
        : `<div class="monster-face" style="background:${letter.color}">${letter.ch}</div>`;
    paper.innerHTML = `
      <div class="fight">
        <div class="fight-sky">
          <div class="monster" id="monster">
            ${face}
            <div class="monster-stars" aria-label="stars">${starsFor(letter.ch)}</div>
          </div>
          <p class="fight-line" id="fight-line">${g.line(letter)}</p>
          <button class="hear-btn" id="hear-btn" type="button">Hear it again</button>
        </div>
        <div class="fight-picks" id="fight-picks"></div>
      </div>`;
    const picks = paper.querySelector("#fight-picks");
    choices.forEach((choice) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "fight-pick";
      btn.dataset.ch = choice.ch;
      if (mode === "letters") {
        btn.innerHTML = `<span class="find-letter" style="background:${choice.color}">${choice.ch}</span>`;
        btn.setAttribute("aria-label", `Letter ${choice.ch}`);
      } else {
        btn.innerHTML = pic(choice.pic);
        btn.setAttribute("aria-label", choice.word);
      }
      btn.addEventListener("click", () => onPick(choice, letter));
      picks.appendChild(btn);
    });
    paper.querySelector("#hear-btn").addEventListener("click", () => sayLetter(letter, true));
    sayLetter(letter, false);
  }

  async function sayLetter(letter, fromTap) {
    heard = true;
    const g = game();
    const monster = paper.querySelector("#monster");
    monster?.classList.add("is-talking");
    const line = paper.querySelector("#fight-line");
    if (line) line.textContent = g.line(letter);
    hintEl.textContent = g.ask(letter);
    await speak(g.say ? g.say(letter) : g.line(letter));
    monster?.classList.remove("is-talking");
    if (!fromTap) locked = false;
  }

  function onPick(choice, letter) {
    if (locked) return;
    const btn = paper.querySelector(`.fight-pick[data-ch="${choice.ch}"]`);
    if (!heard) {
      sayLetter(letter, true);
      return;
    }
    if (choice.ch !== letter.ch) {
      btn?.classList.add("is-wrong");
      ui.blip(180);
      ui.showToast("Listen again!");
      later(() => btn?.classList.remove("is-wrong"), 450);
      sayLetter(letter, true);
      return;
    }
    locked = true;
    btn?.classList.add("is-hit");
    const monster = paper.querySelector("#monster");
    monster?.classList.add("is-talking");
    ui.blip(420);
    bump(game().store, letter.ch);
    const starRow = paper.querySelector(".monster-stars");
    if (starRow) starRow.textContent = starsFor(letter.ch);
    const cheer = game().cheer(letter);
    const line = paper.querySelector("#fight-line");
    if (line) line.textContent = cheer;
    hintEl.textContent = "Listen.";
    const started = Date.now();
    const hold = 4000;
    speak(cheer).finally(() => {
      monster?.classList.remove("is-talking");
      later(() => {
        round += 1;
        if (round >= LETTERS.length) {
          win();
          return;
        }
        index = (index + 1) % LETTERS.length;
        startRound();
      }, Math.max(0, hold - (Date.now() - started)));
    });
  }

  function win() {
    clearTimers();
    ui.confetti();
    ui.fanfare();
    titleEl.textContent = "You won!";
    stepEl.textContent = "13 / 13";
    hintEl.textContent = game().win;
    paper.innerHTML = `
      <div class="fight-win">
        <p class="fight-win-title">${game().win}</p>
        <div class="fight-win-row">${LETTERS.map((l) => `<span style="background:${l.color}">${l.ch}</span>`).join("")}</div>
        <button class="hear-btn" id="again-btn" type="button">Play again</button>
      </div>`;
    paper.querySelector("#again-btn").addEventListener("click", () => {
      index = 0;
      round = 0;
      startRound();
    });
    speak("You did it. A to M.");
  }

  Object.entries(cards).forEach(([id, el]) => {
    el?.addEventListener("click", () => openGame(id));
  });
  document.getElementById("phonics-back")?.addEventListener("click", closeGame);
  document.getElementById("phonics-reset")?.addEventListener("click", () => {
    index = 0;
    round = 0;
    startRound();
    ui.showToast("From the start!");
  });

  if (window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = () => {};
    window.speechSynthesis.getVoices();
  }
  renderCard();
}
