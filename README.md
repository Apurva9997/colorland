# Colorland

A coloring book and early-learning practice app for kids. Tap to fill a drawing, trace a letter, play a sound game, or practice numbers. Built as a small example of product work: one screen, no account, works on a phone.

**Live:** [colorland.space](https://colorland.space)

Part of the work on [my GitHub profile](https://github.com/Apurva9997).

## What it does

- **Color.** Nine original drawings. Pick a crayon, tap a region, undo, start over, or save a PNG.
- **Letters.** Trace, match a picture, circle a letter, join the dots, and hunt for letters.
- **Sounds.** A to M. Hear the sound, name the picture, or find the letter. The answer stays hidden until the right tap.
- **Numbers.** Hear a number, count dots, find a shape, or compare size and mood.

Drawings are inline SVG. Sound and number prompts use the browser speech API, with one warm voice picked automatically. Progress for the sound games stays in `localStorage` on the device.

## Stack

Vite, plain HTML, CSS, and JavaScript. No framework. Hosted on Netlify at [colorland.space](https://colorland.space). Amplitude records page views and session replay. The ingestion key in `js/main.js` is a public write key, already shipped in the live bundle.

## Run it

```bash
npm install
npm run dev
```

Open the URL Vite prints, usually `http://127.0.0.1:5173/`.

```bash
npm run build
npm run preview
```

`npm run build` writes the static site to `dist/`.
