import { ui } from "./ui.js";

// Warm local voices first. Rishi is the compact Indian voice and sounds flat.
// A downloaded Premium voice wins when the browser exposes it.
const WARM = ["Karen", "Moira", "Samantha", "Tessa", "Kathy", "Flo", "Shelley", "Sandy", "Tara"];
const NOVELTY = /Bad News|Bahh|Bells|Boing|Bubbles|Cellos|Good News|Jester|Organ|Superstar|Trinoids|Whisper|Wobble|Zarvox|Albert|Fred|Ralph|Junior|Grandpa|Grandma|Rocko|Eddy/;

export function pickVoice() {
  const voices = (window.speechSynthesis?.getVoices?.() || []).filter(
    (voice) => /^en/i.test(voice.lang) && !NOVELTY.test(voice.name)
  );
  const premium = voices.find((voice) => /premium|enhanced|natural|neural/i.test(voice.name));
  if (premium) return premium;
  for (const name of WARM) {
    const hit = voices.find((voice) => voice.name === name || voice.name.startsWith(name));
    if (hit) return hit;
  }
  return voices[0] || null;
}

export function speak(text) {
  if (ui.muted || !window.speechSynthesis) return Promise.resolve();
  return new Promise((resolve) => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      resolve();
    };
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.9;
    utter.pitch = 1.08;
    const voice = pickVoice();
    if (voice) {
      utter.voice = voice;
      utter.lang = voice.lang;
    }
    utter.onend = finish;
    utter.onerror = finish;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
    setTimeout(() => {
      if (!window.speechSynthesis.speaking && !window.speechSynthesis.pending) finish();
    }, 700);
    setTimeout(finish, 6000);
  });
}

export function warmVoices() {
  window.speechSynthesis?.getVoices();
}
