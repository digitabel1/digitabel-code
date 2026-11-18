# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

"DigitAbel Code" (formerly "PytEd") is a static, no-build Python editor for Norwegian primary/secondary
school students ("elever i grunnskolen"), served as a PWA. There is no package.json, bundler, or test
suite — all HTML/CSS/JS is hand-written and served directly. UI text, comments, and commit-style notes
(see `changelog.md`) are in Norwegian.

The repo contains **two independent editor apps** that share a look-and-feel but have separate, mostly
unconnected JS:

- `index.html` + `js/` + `css/pyted.css` — the main Python editor, runs full Python via **Pyodide** (numpy/matplotlib available).
- `turtle/index.html` + `turtle/script.js` + `turtle/style.css` — a self-contained Turtle-graphics editor, runs Python via **Skulpt** (its `turtle` module renders to an HTML canvas).

When making a change, check whether it needs to be mirrored in both apps — they duplicate logic
(theme toggle, file open/save, share-link encoding, examples modal, input handling, logging) rather
than sharing a common module.

## Running locally

There's no dev server config in the repo. Since `log_event.php` is PHP, serve the project root with
PHP's built-in server so that endpoint works:

```bash
php -S localhost:8000
```

Then open `http://localhost:8000/` (main editor) or `http://localhost:8000/turtle/` (turtle editor).
No build, lint, or test commands exist for this project.

## Deployment

This directory (synced via Nextcloud) is not the live site. The user deploys by FTP-ing changed
files to the production server manually — there is no CI/CD, git remote, or automated deploy. After
making changes, remind the user they'll need to FTP the updated files over themselves.

### Logging (`log/` folder)

Since September 2026, `log_event.php` writes to one file per month — `log/<year>/<month>.txt`, e.g.
`log/2026/09.txt` — creating the year/month directories as needed (see `appendLogEntry()` in
`log_event.php`). Each event is placed in the file matching its own date (not the server's "now"),
so events queued offline in `localStorage` land in the correct month even if flushed later. This
needs **no manual archiving step**: each month's file is naturally small and self-contained, so
nothing is ever trimmed or deleted.

`log/stats.html` renders the stats — it discovers which monthly files exist via `log/list.php`
(a small endpoint that `glob()`s the year directories and returns `["2026-09", ...]` as JSON), fetches
all of them for the monthly summary table, but only renders the "Detaljerte logs" row-by-row table for
**today's** events (from the current month's file) — rendering every historical row as a DOM `<tr>`
doesn't scale once daily volume gets into the thousands.

The "Arkivert" table in `log/stats.html` is now frozen history for May–August 2026, from before this
system existed — those rows were counted manually and their raw log lines no longer exist. Its totals
are read straight from the table's DOM cells (no separate JS object to keep in sync anymore, unlike the
old system). Do not add further rows to it; months from September 2026 onward are counted automatically
from `log/<year>/<month>.txt`.

## Architecture details

### Main editor (`index.html`, `js/pyted.js`)

- CodeMirror (vendored under `codemirror/`, including `addon/fold/` for code folding) is the code editor, configured with the python mode, matchbrackets/closebrackets, active-line, hint, and fold addons. Autocomplete word list (keywords/builtins/extra module & method names) lives in `codemirror/addon/hint/python-hint.min.js` (`KW`/`BI`/`EXTRA` variables) — this single file is shared by both apps, so add missing words there rather than duplicating a list per app.
- Code folding: `addon/fold/foldcode.js` + `foldgutter.js` + `indent-fold.js` are vendored (CodeMirror 5 has no brace-fold for Python, since it's indentation-based) and wired into the editor via `foldGutter: true`, a `CodeMirror-foldgutter` entry in `gutters`, and `foldOptions: { rangeFinder: CodeMirror.fold.indent }`. Click the gutter arrow or press `Ctrl-Q` to fold/unfold at the cursor. The dracula (dark) theme doesn't style `.CodeMirror-foldgutter`, so `body.dark .CodeMirror-foldgutter-open:after` / `-folded:after` get an explicit color in both `css/pyted.css` and `turtle/style.css` — otherwise the fold arrows are invisible (near-black on near-black). Implemented identically in the turtle editor — see below.
- Pyodide v0.25.0 is self-hosted in `/pyodide/` (no CDN dependency, since some school networks block jsdelivr): core files, `python_stdlib.zip`, and the wheels for matplotlib + its dependency closure (numpy, pillow, fonttools, …). `pyodide-lock.json` there is rewritten so every package *not* stored locally has an absolute `https://cdn.jsdelivr.net/pyodide/v0.25.0/full/...` `file_name` (Pyodide resolves it with `new URL(file_name, indexURL)`), so e.g. pandas/sympy still load where the CDN is reachable. To host another package locally, download its wheel into `/pyodide/` and change its `file_name` back to the bare filename. Startup (`loadPyodide({ indexURL: "/pyodide/" })` in `js/pyted.js`) loads **no** packages; `runPython()` calls `pyodide.loadPackagesFromImports(code)` before each run, and the `MPLBACKEND=Agg` env var set at startup makes matplotlib use Agg when it's first imported. Because matplotlib may not be loaded, the run preamble and the plot check go through `sys.modules["matplotlib.pyplot"]` rather than importing it. Startup failures show `#loading-problem` (message + "Prøv igjen" button) via `showLoadingProblem()` and log `pyodide_load_error`; after `LOAD_SLOW_MS` (30s) it shows a "slow" message and logs `pyodide_load_slow`. The old `/pyodide_min/` folder is no longer used.
- `sw.js` is registered (scope `/`) from both `index.html` and `turtle/index.html`, precaches local app files for **both** apps — including `turtle/index.html`, `turtle/script.js`, `turtle/style.css` — for offline/PWA use, and caches everything under `/pyodide/` (plus CDN-only Pyodide packages) cache-first in a separate `PYODIDE_CACHE` that survives `CACHE_NAME` bumps. **Bump** `CACHE_NAME` **whenever cached app files change**, otherwise users get stale assets; rename `PYODIDE_CACHE` only when upgrading Pyodide.
- `input()`/`sleep()` handling: Pyodide can't do blocking `input()` in the browser, and a real blocking `time.sleep()` freezes the whole tab (nothing repaints until the WASM call stack unwinds). So `runPython()` in `js/pyted.js` rewrites student code with regexes (`input(` → `await __js_input__(`, `time.sleep(`/`sleep(` → `await __js_sleep__(`) whenever either is present, wraps it in `async def __pyted_main__(): ...; await __pyted_main__()`, and runs it with `runPythonAsync`. `__js_input__` and `__js_sleep__` are JS functions registered on `pyodide.globals`: `__js_input__` appends an inline `<input class="python-input-inline">` to the `#output` element and resolves a Promise on Enter; `__js_sleep__` is a `setTimeout`-backed Promise, so the browser gets a chance to repaint (and the tab doesn't freeze) during the wait. Because of this wrapping, error line numbers are off by a fixed `errorOffset` (11 normally, 12 when the `async def` wrapper is used) — this offset is subtracted when displaying error messages; if the preamble string in `runPython()` grows/shrinks, update both offsets to match its line count.
- `os.system('clear'|'cls')` handling: since there's no real terminal, `runPython()`'s preamble monkey-patches `os.system` before running student code so that a `clear`/`cls` argument calls `__js_clear_output__` (registered on `pyodide.globals`, empties `#output`) and returns `0`; any other command still falls through to the real (no-op) `os.system`.
- Infinite-loop watchdog: uses Pyodide's interrupt mechanism instead of `sys.settrace` (which made loops ~4x slower). CPython's Emscripten build reads `Module.Py_EmscriptenSignalBuffer[0]` every ~50 eval-breaker checks (loop back-jumps/calls) and raises `KeyboardInterrupt` when it is `2`. Normally that buffer is a SharedArrayBuffer written from a worker, but `pyodide.setInterruptBuffer(watchdogBuffer)` in `js/pyted.js` passes a plain object whose `0` getter checks the clock: once `TIME_LIMIT_MS` has passed since `lastYield` (reset at run start and whenever `input()`/`sleep()` resolves, so waiting doesn't count) it asks via `confirm()` and returns `2` to stop (it also needs a no-op setter, since CPython writes `[0] = 0` after each read). The buffer is set just before the main `runPythonAsync` and cleared (`setInterruptBuffer(undefined)`) after it or in `catch`; when `stoppedByWatchdog` is set, the `catch` rewrites the `KeyboardInterrupt` line to `ProgrammetStoppet: ...` so the existing error translation applies. This relies on Pyodide/CPython internals (verified in v0.25.0) — re-check if Pyodide is upgraded. It can't interrupt long-running C-level calls (e.g. `sum(range(10**10))`). stdout/stderr use `output.append()` and stop writing after `OUTPUT_LIMIT` chars per run (reset by `os.system('clear')`).
- `js/errorTranslations.js` maps raw Python exception strings to Norwegian, student-friendly explanations shown in `#error-message`.
- Examples modal: tabs "5. trinn" … "10. trinn" plus "Mer" (order in `EKSEMPEL_FANER` in `js/loadSelectedExample.js`). The example code itself is data in `js/eksempler/trinn5.js` … `trinn10.js` and `mer.js` (the 32 pre-0.63 examples), each doing `EKSEMPLER["<fane>"] = [{ emne, eksempler: [{ navn, kode }] }]` — max 5 topics × 5 examples per grade. `js/loadSelectedExample.js` only holds the logic: `visEksempelModal()` (wired to `#examples-button` in `js/functions.js`) builds the tabs in `#examples-tabs` once and opens on the last tab the student viewed (persisted in `localStorage` as `pyted_examples_tab`, set in `visEksempelFane()`), defaulting to "Mer" the first time; `visEksempelFane()` renders topics as columns in `#examples-grid` (empty topics show "Kommer snart"); `loadSelectedExample(fane, emneNr, eksNr)` inserts the code, closes the modal and refocuses the editor (mirrors the turtle editor's `loadExample()`, minus its auto-run). A new data file must be added both as a `<script>` in `index.html` (after `loadSelectedExample.js`) and to `urlsToCache` in `sw.js`.
- `js/functions.js` wires up the rest of the toolbar: theme toggle (light/`eclipse` ↔ dark/`dracula`, persisted in `localStorage`), save/open `.py` files, the share-link feature, and modals.
- Header branding: a DigitAbel logo (`img/logo_100_trans.png` / `_white.png`, ids `#logo_code_light` / `#logo_code_dark` despite the name) sits together with the "Code" heading (`#banner-light` / `#banner-dark`) in a `.brand` wrapper at the left of `.topframe`, before `#toolbar`; it links to `https://digitabel.org` (`target="_blank"`), matching the turtle editor's header logo. Both light/dark images are swapped together in `toggleTheme()` and the `DOMContentLoaded` handler in `js/functions.js`. A second, top-right "Code" logo block (`img/logo_code_trans.png`, ids `#logo_light` / `#logo_dark`) exists in the markup but is currently commented out — `img/logo_code_trans.png` / `_white.png` sit unused in `img/` if it's ever reinstated.
- `#output-welcome` (in the `.output-wrapper`, next to `#output`) is a welcome box shown over the output panel on every page load, with a theme-swapped DigitAbel logo (`img/logo_200_trans.png` / `_white.png`, same light/dark swap pattern as the header logos above) and instructional text. It's hidden (not removed) by the first line of `runPython()` in `js/pyted.js`, so it disappears as soon as the student runs code, every time the page is reloaded. Currently only on the main editor.
- The CodeMirror editor calls `editor.focus()` at the end of the `DOMContentLoaded` handler in `js/functions.js` so `Ctrl+Enter` works immediately without clicking into the editor first — the shortcut is bound via `editor.on("keydown", ...)` in `js/pyted.js`, which only fires while the CodeMirror instance itself has focus.
- Comment-links: `updateCommentLinks()` in `js/pyted.js` scans `#`-comments on each editor change (debounced 200ms) and `markText`s any URL found with class `cm-clickable-link`; `Ctrl`/`Cmd`+click on a marked range opens it. It opens via a synthetic `<a target="_blank" rel="noopener">` click rather than `window.open(url, "_blank", "noopener")` — passing a non-empty features string to `window.open` makes browsers treat it as a popup and can open the tab in the background, whereas a real link click always opens in the foreground. Duplicated identically in `turtle/script.js`.
- Share links encode the editor contents as UTF-8-safe base64 in `?code=...` and are decoded on load via `loadCodeFromURL()`.
- Usage logging: `logEvent()` POSTs `{event, timestamp, userAgent(OS), path}` to `/log_event.php`, which appends to a monthly file under `log/<year>/<month>.txt` (see "Logging" under Deployment above). If the POST fails (offline), events queue in `localStorage` and are flushed on the `online` event. `log/stats.html` renders these logs.

### Turtle editor (`turtle/index.html`, `turtle/script.js`)

- Self-contained: its own CodeMirror setup (including the fold addons/config described above, duplicated the same way), theme toggle, autocomplete toggle, file open/save, share-link encoding, examples dictionary, and modal handling — all duplicated (with minor naming differences) rather than imported from `js/`.
- Header/toolbar mirrors the main editor's: a `.topframe` with `.brand` (logo `#logo_light`/`#logo_dark` + "turtle.Code" banner), `.toolbar-divider`s, `#info-button` pushed right with `margin-left: auto`, and the green `#run-button` at the far right of `.topframe` (not in the editor corner). The CSS is duplicated in `turtle/style.css` — keep the two toolbars in sync when either changes.
- Runs code via **Skulpt** (`Sk.configure` + `Sk.misceval.asyncToPromise(Sk.importMainWithBody(...))`), with `Sk.TurtleGraphics.target = 'turtle-canvas'` for rendering turtle output to the canvas div.
- `input()` works via Skulpt's native `inputfun` config (returns a Promise, resolves on Enter), which appends the same `.python-input-inline` element style used in the main editor — keep the `.python-input-inline` CSS rules in `turtle/style.css` and `css/pyted.css` in sync if either changes.
- Error line numbers from Skulpt are offset by a fixed `-2` (`on line (\d+)` adjustment in `runPython()`), since student code is wrapped with 2 leading lines.
- The CodeMirror editor height is fixed at `600px` to match the `#turtle-canvas` size (also `600px`).

### Shared conventions

- Both apps use `localStorage` keys prefixed `pyted_` (theme, autocomplete toggle, code autosave on the main editor only).
- Both apps set the editor font to `"JetBrains Mono"`, which has built-in programming ligatures (OpenType `calt`) that would otherwise render `==`, `<=`, `!=`, etc. as single glyphs — misleading for students learning literal Python syntax. The `.CodeMirror` rule in both `css/pyted.css` and `turtle/style.css` disables this with `font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0;`.
- Both apps' "Tøm editor" (clear) buttons use `confirm()` before wiping the editor.
- CDN dependencies (Skulpt, Google Fonts, Font Awesome) are not vendored for the turtle app; only Pyodide and CodeMirror are self-hosted. The service worker precaches turtle's own HTML/JS/CSS (see above), but these CDN dependencies are still fetched live, so the turtle editor is not fully usable offline.
- `manifest.json` (linked only from `index.html`) covers both apps: its `shortcuts` entry points to `/turtle/` so the turtle editor is reachable from the installed app icon even though it has no manifest link of its own.