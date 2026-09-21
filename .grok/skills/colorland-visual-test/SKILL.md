---
name: colorland-visual-test
description: Run a thorough visual QA pass of Colorland (kids coloring + letter practice). Use when the user asks for a visual test, visual QA, visual regression, screenshot audit, or UI review of Colorland or colorland.space, or runs /colorland-visual-test.
when-to-use: visual test, visual QA, visual regression, screenshot Colorland, test colorland.space, UI review of the coloring app
argument-hint: "[prod | local] [optional URL]"
user-invocable: true
---

# Colorland visual test

End-to-end visual QA for Colorland. A screenshot of one happy path is not a pass. Interact like a kid would, measure layout, and hunt regressions.

Read `references/screens.md` in this skill directory before clicking. It has the screen map, selectors, viewports, and the regression list.

## Target

- Default production: `https://colorland.space/`
- Default local: `http://127.0.0.1:5173/` (Vite `npm run dev`). If the port is taken, use the URL Vite prints.
- If the user names `prod`, `local`, or a URL, use that. Unreleased CSS/JS changes must be tested locally.

This is a single-page app. There are no client routes except `public/404.html` (production Netlify 404). Color vs Letters and studios are shown/hidden in `index.html`.

## Tools

Use Playwright MCP. Call `search_tool` first for schemas. Typical tools:

- `playwright__browser_navigate`, `playwright__browser_resize`
- `playwright__browser_snapshot`, `playwright__browser_take_screenshot`
- `playwright__browser_click`, `playwright__browser_hover`, `playwright__browser_press_key`
- `playwright__browser_evaluate` for overlap / overflow / contrast
- `playwright__browser_console_messages`, `playwright__browser_network_requests`
- `playwright__browser_run_code_unsafe` for multi-screen screenshot loops

Save screenshots under `visual-test/` in the repo (create it if missing). Do not commit them unless asked.

If `https://colorland.space/` fails TLS (`ERR_CERT_COMMON_NAME_INVALID`) but `curl` works, retry once. Do not treat a one-off cert flake as a product bug unless it reproduces.

## Procedure

1. Map the app from `index.html`, `js/pages.js` (`COLORING_PAGES`), and `js/practice.js` (`ACTIVITIES`, `pic()`). Do not skip a coloring page or letter activity.
2. Start at the Color gallery. Then Letters gallery. Then every studio.
3. For each required viewport in `references/screens.md`, resize, then re-walk the critical studios (coloring + at least Trace, Match, Circle the F, Join the Dots, Letter Hunt).
4. **Measure**, do not guess overlap. Evaluate bounding boxes for `#studio.is-open .paper`, `#hint`, and `.palette-dock`. Overlap of paper or hint with the crayon dock is a High bug.
5. Interact, then screenshot:
   - Fill a region, Undo, Start over modal (Keep coloring + Start over), Save (expect `colorland-<id>.png`)
   - Pick Magic crayon; confirm hint and rainbow swatch
   - Mute 🔊 → 🔇 and `aria-label` flip
   - Match: pick letter (yellow), wrong pic (pink + toast), right pic (mint)
   - Quiz: wrong letter (pink + "Try another letter!"), right letter (mint, advances)
   - Circle the F: wrong letter flashes; F marks found
   - Join the Dots: tap out of order (toast "Next is …"); in-order draws a line
6. Look at the screenshots. Geometry metrics can pass while the drawing still looks wrong (unrecognizable icon, fish that is just an oval, piled dots).
7. Check console (ignore Amplitude noise) and that app JS/CSS/fonts return 200.
8. Report using the template below. Do not claim "looks good" without viewport evidence.

## What "good" looks like

Design tokens (from `css/style.css`):

- Ink `#2b2430`, paper `#fffdf8`, peach page `#fff3e4`
- Coral `#ff6b6b`, sun `#ffd166`, sky `#5ec8e3`, mint `#7ed9a6`
- Fonts: Baloo 2 (titles), Nunito 700/800 (UI)
- Chunky 3–4px ink borders, 16–28px radii, hard offset shadows

Kids' app bar: hit targets ≥ 44px; no tiny unlabeled icons except mute (has `aria-label`). Pictograms in `pic()` must be recognizable at 72×72 without the caption. Adjacent crayons (especially Sun vs Lemon) must not look like the same stick.

## Severity

| Severity | Use when |
|---|---|
| High | Drawing unusable, controls covered, overlapping tappable dots/letters, landscape coloring collapsed |
| Medium | Wrong metaphor (hint says fish, UI is an oval), icons unreadable, missing scroll cue, empty card, unbranded 404 |
| Low | Focus ring weak, safe-area, empty step pill spacer, similar crayon hues, orphan gallery card |

## Report template

Lead with a one-paragraph verdict (pass / fail, and the worst bug). Then:

1. What you tested (URL, commit or "local dirty tree", viewports)
2. Findings table: severity, screen, viewport, what you saw, screenshot path
3. What still looks good
4. What you could not verify (no browser, TLS, save download blocked, etc.)

Do not fix unless the user asked for fixes. This skill is the test pass.
