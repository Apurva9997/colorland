import { ui } from "./ui.js";

// One voice, not a menu. Nicky Premium is the soft modern voice, once downloaded.
// Compact Rishi and compact Nicky stay last because they sound flat.
const PREMIUM = ["Nicky", "Samantha", "Karen", "Moira"];
const WARM = ["Karen", "Moira", "Samantha", "Tessa"];
const NOVELTY = /Bad News|Bahh|Bells|Boing|Bubbles|Cellos|Good News|Jester|Organ|Superstar|Trinoids|Whisper|Wobble|Zarvox|Albert|Fred|Ralph|Junior|Grandpa|Grandma|Rocko|Eddy/;

function named(voices, name) {
  return voices.find((voice) => voice.name === name || voice.name.startsWith(name));
}

export function pickVoice() {
  const voices = (window.speechSynthesis?.getVoices?.() || []).filter(
    (voice) => /^en/i.test(voice.lang) && !NOVELTY.test(voice.name)
  );
  const premium = voices.filter((voice) => /premium|enhanced|natural|neural/i.test(`${voice.name} ${voice.voiceURI}`));
  for (const name of PREMIUM) {
    const hit = named(premium, name);
    if (hit) return hit;
  }
  if (premium[0]) return premium[0];
  for (const name of WARM) {
    const hit = named(voices, name);
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
