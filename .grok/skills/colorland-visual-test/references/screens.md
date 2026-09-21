# Colorland screen map

Single page. Tabs and studios toggle visibility; they are not URL routes.

## Viewports (required)

| Name | Size | Why |
|---|---|---|
| Desktop | 1440×900 | Crayon dock used to cover the paper (~39px) and the hint |
| Short desktop | 1280×800 or 1200×683 | Same overlap; page used to scroll and hide the toolbar |
| Tablet | 768×1024 | 3-column gallery; crayons may need horizontal scroll |
| Phone portrait | 390×844 | Best studio stack; ~6–7 crayons visible, rest swipe |
| Phone landscape | 844×390 | Used to collapse the drawing to ~128px; header must hide; crayons go to a right-hand strip |

Optional: 640px (CSS breakpoint), notched safe-area if you can emulate it.

## Chrome

| Control | Selector | Notes |
|---|---|---|
| Mute | `#mute-btn` | 🔊 / 🔇, `aria-label` Mute/Unmute sounds |
| Color tab | `#tab-color` | `aria-selected`, class `is-on`, sun fill |
| Letters tab | `#tab-letters` | Same |
| Toast | `#toast` | Dark pill, `bottom: 150px`; must not sit under the dock unreadably |

## Color mode

Hero: "Pick a picture to color". Gallery `#gallery` buttons `.card`.

Nine pages from `js/pages.js`: Happy Friend, Dino Pal, Cozy House, Space Rocket, Butterfly, Snuggly Cat, Ice Cream, Unicorn, Fish Friend.

Studio `#studio`:

| Control | Selector |
|---|---|
| Back | `#back-btn` (← Pictures) |
| Title | `#studio-title` |
| Undo / Start over / Save | `#undo-btn` `#reset-btn` `#save-btn` |
| Paper | `#paper` SVG `.region` |
| Hint | `#hint` |
| Crayons | `#palette` `[role=option]` |
| Reset dialog | `#reset-modal` `#reset-no` `#reset-yes` |

Crayons, in order: Cherry, Orange, Sun `#ffd166`, Lemon `#e6ff6b`, Leaf, Mint, Sky, Blue, Grape, Pink, Peach, Tan, Cocoa, Brown, Silver, Ink, Eraser, Magic.

### Studio layout check (evaluate)

```js
() => {
  const paper = document.querySelector("#studio.is-open .paper")?.getBoundingClientRect();
  const pal = document.querySelector("#studio.is-open .palette-dock")?.getBoundingClientRect();
  const hint = document.querySelector("#hint")?.getBoundingClientRect();
  const header = getComputedStyle(document.querySelector(".app-header")).display;
  return {
    overlap: paper && pal ? Math.round(Math.max(0, paper.bottom - pal.top)) : null,
    hintCovered: !!(hint && pal && hint.top < pal.bottom && hint.bottom > pal.top),
    paperH: paper && Math.round(paper.height),
    headerDisplay: header,
    studioDisplay: getComputedStyle(document.querySelector("#studio")).display,
  };
}
```

Pass: `overlap === 0`, `hintCovered === false`, paper height ≳ 240px on landscape. On `max-height: 520px` landscape, header `display: none` and `#studio` is a grid with palette on the right.

## Letters mode

Hero: "Letter practice". Gallery `#practice-gallery`.

Studio `#practice-studio`: `#practice-back`, `#practice-title`, `#practice-step`, `#practice-reset`, `#practice-paper`, `#practice-hint`.

`.step-pill:empty` must not take width on Match / Dots / Circle the F.

| Card title | Kind | Must look like |
|---|---|---|
| Trace Letters | dashed letter + red start dot | Y first, `1 / 7` |
| Match Pictures | letter tiles + `pic()` | Hat, Frog, Zebra, Tree, Leaf, Xylophone recognizable |
| Circle the F | cartoon fish | Body + tail + eye; letters inside; not a bare oval |
| Join the Dots | A–K | Scoop A–H, cone K/I, tip J; no circle overlap (centers ≳ 50px) |
| Begins with B / I | pic grid | Captions help; icons still readable |
| Starting Letter | quiz | Yo-yo first; wrong = pink + toast; right = mint then next |
| Letter Hunt | garden SVG | Scene fills the card; letters tucked in trees/bushes, still tappable |
| Write T, H, F | trace | Same as Trace, `1 / 3` |

Join the Dots success hint is "Ice cream! You joined every dot."

## Other URLs

- Production unknown path: branded Colorland 404 (not the generic Netlify card). Local Vite serves ` /404.html` from `public/404.html`; unknown paths may fall through to the app.
- `www.colorland.space` should 301 to `https://colorland.space/`.

## Known regressions (fail if they return)

1. Sticky `.palette-dock` covering `.paper` or `#hint` on 1440×900 / 1280×800.
2. Landscape 844×390 drawing ~128px tall with crayons on top of it.
3. Dots E/I/K stacked (old coords I `225,285` K `175,285`).
4. Circle the F = pale blue oval, hint still says "inside the fish".
5. Tree icon = ping-pong paddle; xylophone = bucket; giraffe = lollipop.
6. Phone palette shows ~6 crayons with no fade/peek that more exist.
7. Sun `#ffd166` and Lemon `#ffe066` indistinguishable.
8. Letter Hunt: large white letter chips, empty cream band at the bottom of the card.
9. Generic Netlify 404 on colorland.space.
10. Quiz wrong answer: pink flash only, no toast.
11. Empty `#practice-step` still occupies `min-width: 3ch`.
12. No `:focus-visible` ring (Tab through mute → tabs → cards).

## Console / a11y extras

- Deprecated `apple-mobile-web-app-capable` is OK if `mobile-web-app-capable` is also present.
- Contrast: muted `#6d6475` on peach is ~5.2:1 (AA). Ink on paper is fine.
- `user-select: none` is intentional.
- Ignore Amplitude / session-replay network calls unless they block the UI.
- Horizontal `documentElement.scrollWidth > innerWidth + 2` on home or studio is a bug (crayon row overflow-x inside `.palette` is OK).
