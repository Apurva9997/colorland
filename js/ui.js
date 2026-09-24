const MAGIC = ["#ff6b6b", "#ff922b", "#ffd166", "#8ce99a", "#63e6be", "#4dabf7", "#845ef7", "#f783ac"];

let audioCtx = null;

function toastEl() {
  return document.getElementById("toast");
}

function yayEl() {
  return document.getElementById("yay");
}

export const ui = {
  muted: false,

  showToast(message) {
    const el = toastEl();
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(ui.showToast.t);
    ui.showToast.t = setTimeout(() => el.classList.remove("show"), 1800);
  },

  confetti() {
    const host = yayEl();
    host.innerHTML = "";
    for (let i = 0; i < 42; i += 1) {
      const bit = document.createElement("span");
      bit.className = "confetti";
      bit.style.left = Math.random() * 100 + "%";
      bit.style.background = MAGIC[i % MAGIC.length];
      bit.style.animationDelay = Math.random() * 0.4 + "s";
      bit.style.transform = `rotate(${Math.random() * 90}deg)`;
      host.appendChild(bit);
    }
    setTimeout(() => {
      host.innerHTML = "";
    }, 2200);
  },

  ensureAudio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") audioCtx.resume();
    return audioCtx;
  },

  blip(freq) {
    if (ui.muted) return;
    try {
      const ctx = ui.ensureAudio();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = freq;
      gain.gain.value = 0.05;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.stop(ctx.currentTime + 0.13);
    } catch {
      /* ignore */
    }
  },

  fanfare() {
    if (ui.muted) return;
    [523, 659, 784].forEach((f, i) => setTimeout(() => ui.blip(f), i * 120));
  },

  bindMute() {
    const muteBtn = document.getElementById("mute-btn");
    muteBtn.addEventListener("click", () => {
      ui.muted = !ui.muted;
      muteBtn.textContent = ui.muted ? "🔇" : "🔊";
      muteBtn.setAttribute("aria-label", ui.muted ? "Unmute sounds" : "Mute sounds");
      if (ui.muted) window.speechSynthesis?.cancel();
    });
  }
};
