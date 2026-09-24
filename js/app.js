import { COLORING_PAGES } from "./pages.js";
import { ui } from "./ui.js";

export function boot() {
  const STORAGE_KEY = "colorland-v1";
  const WHITE = ["#fff", "#ffffff", "white"];
  const MAGIC = ["#ff6b6b", "#ff922b", "#ffd166", "#8ce99a", "#63e6be", "#4dabf7", "#845ef7", "#f783ac"];

  const COLORS = [
    { hex: "#ff6b6b", name: "Cherry" },
    { hex: "#ff922b", name: "Orange" },
    { hex: "#ffd166", name: "Sun" },
    { hex: "#e6ff6b", name: "Lemon" },
    { hex: "#8ce99a", name: "Leaf" },
    { hex: "#20c997", name: "Mint" },
    { hex: "#4dabf7", name: "Sky" },
    { hex: "#228be6", name: "Blue" },
    { hex: "#845ef7", name: "Grape" },
    { hex: "#f783ac", name: "Pink" },
    { hex: "#f3d9b1", name: "Peach" },
    { hex: "#e0b089", name: "Tan" },
    { hex: "#c08552", name: "Cocoa" },
    { hex: "#8d6e63", name: "Brown" },
    { hex: "#ced4da", name: "Silver" },
    { hex: "#2b2430", name: "Ink" },
    { hex: "#ffffff", name: "Eraser" },
    { hex: "magic", name: "Magic" }
  ];

  const home = document.getElementById("home");
  const galleryEl = document.getElementById("gallery");
  const galleryWrap = document.getElementById("gallery-wrap");
  const practiceWrap = document.getElementById("practice-wrap");
  const tabColor = document.getElementById("tab-color");
  const tabLetters = document.getElementById("tab-letters");
  const tabSounds = document.getElementById("tab-sounds");
  const phonicsWrap = document.getElementById("phonics-wrap");
  const studio = document.getElementById("studio");
  const paper = document.getElementById("paper");
  const paletteEl = document.getElementById("palette");
  const titleEl = document.getElementById("studio-title");
  const hintEl = document.getElementById("hint");
  const swatchNow = document.getElementById("swatch-now");
  const resetModal = document.getElementById("reset-modal");

  let currentId = null;
  let selected = COLORS[2].hex;
  let undoStack = [];
  let celebrated = false;

  function loadStore() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch {
      return {};
    }
  }

  function saveStore(store) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }

  function isWhite(fill) {
    return !fill || WHITE.includes(String(fill).toLowerCase());
  }

  function pageById(id) {
    return COLORING_PAGES.find((p) => p.id === id);
  }

  function svgFromMarkup(markup) {
    const wrap = document.createElement("div");
    wrap.innerHTML = markup.trim();
    return wrap.firstElementChild;
  }

  function applyFills(svg, fills) {
    if (!fills) return;
    svg.querySelectorAll(".region").forEach((el, i) => {
      if (fills[i]) el.setAttribute("fill", fills[i]);
    });
  }

  function readFills(svg) {
    return [...svg.querySelectorAll(".region")].map((el) => el.getAttribute("fill") || "#ffffff");
  }

  function coloredCount(fills) {
    return fills.filter((f) => !isWhite(f)).length;
  }

  function persistCurrent() {
    if (!currentId) return;
    const svg = paper.querySelector("svg");
    if (!svg) return;
    const store = loadStore();
    store[currentId] = readFills(svg);
    saveStore(store);
  }

  function renderGallery() {
    const store = loadStore();
    galleryEl.innerHTML = "";
    COLORING_PAGES.forEach((page) => {
      const fills = store[page.id];
      const svg = svgFromMarkup(page.svg);
      applyFills(svg, fills);
      const total = svg.querySelectorAll(".region").length;
      const done = fills ? coloredCount(fills) : 0;
      const btn = document.createElement("button");
      btn.className = "card";
      btn.type = "button";
      btn.innerHTML = `
        <div class="card-preview"></div>
        <div class="card-meta">
          <h3>${page.title}</h3>
          <span class="badge ${done === total && total ? "done" : ""}">${done ? "Keep going" : "Color me"}</span>
        </div>`;
      btn.querySelector(".card-preview").appendChild(svg);
      if (done === total && total) btn.querySelector(".badge").textContent = "Finished!";
      else if (done) btn.querySelector(".badge").textContent = "Keep going";
      btn.addEventListener("click", () => openStudio(page.id));
      galleryEl.appendChild(btn);
    });
  }

  function renderPalette() {
    paletteEl.innerHTML = "";
    COLORS.forEach((color) => {
      const btn = document.createElement("button");
      btn.className = "crayon" + (color.hex === "magic" ? " magic" : "");
      btn.type = "button";
      btn.style.setProperty("--c", color.hex === "magic" ? "#ff6b6b" : color.hex);
      btn.setAttribute("role", "option");
      btn.setAttribute("aria-label", color.name);
      btn.innerHTML = `<span class="crayon-tip"></span><span class="crayon-body"></span><span class="crayon-band"></span>`;
      btn.addEventListener("click", () => selectColor(color.hex, btn));
      paletteEl.appendChild(btn);
    });
    const first = paletteEl.children[2];
    if (first) first.classList.add("is-selected");
    updateSwatch();
  }

  function selectColor(hex, btn) {
    selected = hex;
    paletteEl.querySelectorAll(".crayon").forEach((c) => c.classList.remove("is-selected"));
    btn.classList.add("is-selected");
    updateSwatch();
    hintEl.textContent =
      hex === "magic"
        ? "Magic crayon! Tap a spot for a surprise color."
        : hex === "#ffffff"
          ? "Eraser on. Tap a spot to make it white again."
          : "Now tap any part of the picture.";
    ui.blip(520);
  }

  function updateSwatch() {
    if (selected === "magic") {
      swatchNow.style.background = "linear-gradient(135deg,#ff6b6b,#ffd166,#4dabf7,#845ef7)";
    } else {
      swatchNow.style.background = selected;
    }
  }

  function openStudio(id) {
    currentId = id;
    celebrated = false;
    undoStack = [];
    const page = pageById(id);
    titleEl.textContent = page.title;
    const svg = svgFromMarkup(page.svg);
    applyFills(svg, loadStore()[id]);
    paper.innerHTML = "";
    paper.appendChild(svg);
    home.classList.add("is-hidden");
    studio.classList.add("is-open");
    hintEl.textContent = "Pick a crayon, then tap a spot to fill it.";
    svg.addEventListener("pointerdown", onFill);
  }

  function closeStudio() {
    persistCurrent();
    currentId = null;
    studio.classList.remove("is-open");
    home.classList.remove("is-hidden");
    renderGallery();
  }

  function paintColor() {
    if (selected === "magic") return MAGIC[Math.floor(Math.random() * MAGIC.length)];
    return selected;
  }

  function onFill(event) {
    const el = event.target;
    if (!(el instanceof Element) || !el.classList.contains("region")) return;
    event.preventDefault();
    const next = paintColor();
    const prev = el.getAttribute("fill") || "#ffffff";
    if (prev.toLowerCase() === next.toLowerCase()) return;
    el.setAttribute("fill", next);
    el.classList.add("is-flash");
    setTimeout(() => el.classList.remove("is-flash"), 160);
    undoStack.push({ el, prev });
    persistCurrent();
    ui.blip(340 + Math.random() * 180);
    maybeCelebrate();
  }

  function undo() {
    const last = undoStack.pop();
    if (!last) {
      ui.showToast("Nothing to undo yet.");
      return;
    }
    last.el.setAttribute("fill", last.prev);
    persistCurrent();
    ui.blip(240);
  }

  function resetPage() {
    const svg = paper.querySelector("svg");
    if (!svg) return;
    svg.querySelectorAll(".region").forEach((el) => el.setAttribute("fill", "#ffffff"));
    undoStack = [];
    celebrated = false;
    persistCurrent();
    hintEl.textContent = "Fresh page! Pick a crayon and tap.";
    ui.showToast("All clean. Color away!");
  }

  function maybeCelebrate() {
    const svg = paper.querySelector("svg");
    if (!svg || celebrated) return;
    const fills = readFills(svg);
    if (fills.length && coloredCount(fills) === fills.length) {
      celebrated = true;
      ui.confetti();
      ui.showToast("You colored the whole picture!");
      hintEl.textContent = "You finished it! Save it or pick another picture.";
      ui.fanfare();
    }
  }

  function downloadPng() {
    const svg = paper.querySelector("svg");
    if (!svg) return;
    const clone = svg.cloneNode(true);
    clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    clone.setAttribute("width", "800");
    clone.setAttribute("height", "1000");
    const xml = new XMLSerializer().serializeToString(clone);
    const blob = new Blob([xml], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 800;
      canvas.height = 1000;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#fffdf8";
      ctx.fillRect(0, 0, 800, 1000);
      ctx.drawImage(img, 0, 0, 800, 1000);
      URL.revokeObjectURL(url);
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = `colorland-${currentId}.png`;
      a.click();
      ui.showToast("Saved a picture!");
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      ui.showToast("Could not save. Try another browser.");
    };
    img.src = url;
  }

  document.getElementById("back-btn").addEventListener("click", closeStudio);
  document.getElementById("undo-btn").addEventListener("click", undo);
  document.getElementById("save-btn").addEventListener("click", downloadPng);
  document.getElementById("reset-btn").addEventListener("click", () => {
    resetModal.classList.add("is-open");
  });
  document.getElementById("reset-no").addEventListener("click", () => {
    resetModal.classList.remove("is-open");
  });
  document.getElementById("reset-yes").addEventListener("click", () => {
    resetModal.classList.remove("is-open");
    resetPage();
  });
  function showTab(which) {
    const tabs = [
      [tabColor, galleryWrap, "color"],
      [tabLetters, practiceWrap, "letters"],
      [tabSounds, phonicsWrap, "sounds"]
    ];
    tabs.forEach(([tab, wrap, name]) => {
      const on = name === which;
      tab.classList.toggle("is-on", on);
      tab.setAttribute("aria-selected", on ? "true" : "false");
      wrap.classList.toggle("is-hidden", !on);
    });
  }

  tabColor.addEventListener("click", () => showTab("color"));
  tabLetters.addEventListener("click", () => showTab("letters"));
  tabSounds.addEventListener("click", () => showTab("sounds"));
  if (new URLSearchParams(location.search).has("sounds") || location.hash === "#sounds") {
    showTab("sounds");
  }

  renderPalette();
  renderGallery();
}
