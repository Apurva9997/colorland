import * as amplitude from '@amplitude/unified';
import { boot } from "./app.js";
import { bootPractice } from "./practice.js";
import { bootPhonics } from "./phonics.js";
import { bootNumbers } from "./numbers.js";
import { ui } from "./ui.js";
import { warmVoices } from "./voice.js";

// Amplitude ingestion key — public by design; move to an env var when you set up environments.
amplitude.initAll('9ce273c31f519a3638caa4fe4f9f048b', {"analytics":{"autocapture":true},"sessionReplay":{"sampleRate":1}});
amplitude.track('Viewed Home Page', { prompt_version: 'BA400.4' }); // helps improve this setup flow — safe to remove once you've verified the event lands

ui.bindMute();
warmVoices();
boot();
bootPractice();
bootPhonics();
bootNumbers();
