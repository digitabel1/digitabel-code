let pyodide;

// -------- CODEMIRROR-EDITOR --------
let editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    mode: "python",
    theme: "eclipse",
    lineNumbers: true,
    indentUnit: 4,        // Antall mellomrom per innrykk
    tabSize: 4,           // Antall mellomrom per tab
    indentWithTabs: false, // Bruk mellomrom i stedet for tab-tegn
    matchBrackets: true,
    autoCloseBrackets: true,
    styleActiveLine: true,
    lineWrapping: true,
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    foldOptions: { rangeFinder: CodeMirror.fold.indent },
    extraKeys: {
        "Tab": (cm) => {
            // Hvis tekst er markert: legg til innrykk på alle markerte linjer
            if (cm.somethingSelected()) {
                cm.indentSelection("add");
            } else {
                // Ellers: sett inn mykt tab (myke mellomrom)
                cm.replaceSelection(cm.getOption("indentWithTabs") ? "\t" : "    ", "end", "+input");
            }
        },
        "Shift-Tab": "unindent", // Fjern innrykk fra markerte linjer
        "Ctrl-Q": (cm) => cm.foldCode(cm.getCursor())
    }
});

// -------- ENDRE HØYDE PÅ EDITOREN (DRA-HÅNDTAK) --------
const resizeHandle = document.getElementById("editor-resize-handle");
const MIN_EDITOR_HEIGHT = 150;

function setEditorHeight(height) {
    const clamped = Math.max(MIN_EDITOR_HEIGHT, Math.min(height, window.innerHeight * 0.9));
    editor.setSize(null, clamped + "px");
    return clamped;
}

const savedEditorHeight = parseInt(localStorage.getItem("pyted_editor_height"), 10);
if (!isNaN(savedEditorHeight)) {
    setEditorHeight(savedEditorHeight);
}

function startEditorResize(startY) {
    const startHeight = editor.getWrapperElement().offsetHeight;
    resizeHandle.classList.add("dragging");

    return function (currentY) {
        const newHeight = setEditorHeight(startHeight + (currentY - startY));
        localStorage.setItem("pyted_editor_height", newHeight);
    };
}

resizeHandle.addEventListener("mousedown", (event) => {
    event.preventDefault();
    const onDrag = startEditorResize(event.clientY);

    function onMouseMove(e) {
        onDrag(e.clientY);
    }

    function onMouseUp() {
        resizeHandle.classList.remove("dragging");
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
});

resizeHandle.addEventListener("touchstart", (event) => {
    const onDrag = startEditorResize(event.touches[0].clientY);

    function onTouchMove(e) {
        onDrag(e.touches[0].clientY);
        e.preventDefault();
    }

    function onTouchEnd() {
        resizeHandle.classList.remove("dragging");
        document.removeEventListener("touchmove", onTouchMove);
        document.removeEventListener("touchend", onTouchEnd);
    }

    document.addEventListener("touchmove", onTouchMove, { passive: false });
    document.addEventListener("touchend", onTouchEnd);
}, { passive: true });

// -------- AUTOCOMPLETE --------
let autocompleteEnabled = localStorage.getItem("pyted_autocomplete") === "true";

function updateAutocompleteButton() {
    const btn = document.getElementById("autocomplete-toggle");
    if (autocompleteEnabled) {
        btn.style.opacity = "1";
        btn.title = "Kodehjelp på (klikk for å slå av)";
    } else {
        btn.style.opacity = "0.4";
        btn.title = "Kodehjelp av (klikk for å slå på)";
    }
}

document.getElementById("autocomplete-toggle").addEventListener("click", () => {
    autocompleteEnabled = !autocompleteEnabled;
    localStorage.setItem("pyted_autocomplete", autocompleteEnabled);
    updateAutocompleteButton();
    editor.focus();
});

editor.on("inputRead", (cm, change) => {
    if (!autocompleteEnabled) return;
    if (!/[\w.]/.test(change.text[0])) return;
    CodeMirror.commands.autocomplete(cm, CodeMirror.hint.python, { completeSingle: false });
});

updateAutocompleteButton();

// -------- LAST INN KODE FRA local storage --------
let saved = localStorage.getItem("pyted_code");
if (saved) {
    editor.setValue(saved);
}

// -------- LAGRE KODE TIL local storage FOR HVER TAST --------
editor.on("change", () => {
    localStorage.setItem("pyted_code", editor.getValue());
});

// -------- KLIKKBARE LENKER I KOMMENTARER --------
// Understreker URL-er som står etter et # (kommentar) i koden, og åpner dem i ny fane ved Ctrl/Cmd+klikk.
const LINK_REGEX = /https?:\/\/[^\s)>\]]+/g;

function updateCommentLinks(cm) {
    cm.getAllMarks().forEach((mark) => {
        if (mark.className === "cm-clickable-link") mark.clear();
    });
    for (let i = 0; i < cm.lineCount(); i++) {
        const line = cm.getLine(i);
        const hashIndex = line.indexOf("#");
        if (hashIndex === -1) continue;
        const rest = line.slice(hashIndex);
        LINK_REGEX.lastIndex = 0;
        let match;
        while ((match = LINK_REGEX.exec(rest))) {
            const url = match[0].replace(/[.,;:)]+$/, "");
            const from = { line: i, ch: hashIndex + match.index };
            const to = { line: i, ch: from.ch + url.length };
            cm.markText(from, to, { className: "cm-clickable-link", title: "Ctrl/Cmd+klikk for å åpne " + url });
        }
    }
}

let linkifyTimeout;
editor.on("change", (cm) => {
    clearTimeout(linkifyTimeout);
    linkifyTimeout = setTimeout(() => updateCommentLinks(cm), 200);
});
updateCommentLinks(editor);

editor.getWrapperElement().addEventListener("mousedown", (event) => {
    if (!(event.ctrlKey || event.metaKey)) return;
    const pos = editor.coordsChar({ left: event.clientX, top: event.clientY });
    const marks = editor.findMarksAt(pos).filter((mark) => mark.className === "cm-clickable-link");
    if (!marks.length) return;
    event.preventDefault();
    const range = marks[0].find();
    const link = document.createElement("a");
    link.href = editor.getRange(range.from, range.to);
    link.target = "_blank";
    link.rel = "noopener";
    link.click();
});

// -------- TASTATURSNARVEIER --------
editor.on("keydown", (cm, event) => {
    // Kjør: Ctrl + Enter
    if (event.ctrlKey && event.key === "Enter") {
        event.preventDefault();
        runPython();
    }
    // Lagre: Ctrl + S
    if (event.ctrlKey && event.key.toLowerCase() === "s") {
        event.preventDefault();
        saveCode();
    }
    // Åpne: Ctrl + O
    if (event.ctrlKey && event.key.toLowerCase() === "o") {
        event.preventDefault();
        openFile();
    }
});

// -------- PYODIDE (Laster inn miljø) --------
// Tidsvakt og output-tak (se watchdogBuffer og writeOutput nedenfor)
const TIME_LIMIT_MS = 10000; // antall ms en kode får kjøre
const OUTPUT_LIMIT = 100000; // antall linjer en kode maks kan generere
let lastYield = 0;
let outputChars = 0;

// Tidsvakt mot uendelige løkker. CPython (Emscripten-bygget i Pyodide) leser element [0] i
// "interrupt-bufferen" for hver ~50. sjekk i bytekode-løkka (løkke-hopp og funksjonskall), og
// verdien 2 (SIGINT) gir KeyboardInterrupt. Normalt er bufferen en SharedArrayBuffer som en Web
// Worker skriver til, men her er den et vanlig objekt med getter, så JS kan sjekke klokka uten at
// Python må kalle en trace-funksjon for hver linje (sys.settrace gjorde koden ~4x tregere).
// Tiden måles fra sist nettleseren fikk kontrollen (start, input(), sleep()), så venting teller ikke.
let stoppedByWatchdog = false;
let watchdogTicks = 0;
const watchdogBuffer = {
    get 0() {
        if (++watchdogTicks < 100) return 0;
        watchdogTicks = 0;
        if (performance.now() - lastYield < TIME_LIMIT_MS) return 0;
        const stop = confirm(
            `Programmet ditt har kjørt i over ${TIME_LIMIT_MS / 1000} sekunder uten å bli ferdig. ` +
            "Kanskje du har en uendelig løkke?\n\n" +
            "OK = stopp programmet\nAvbryt = la det kjøre videre"
        );
        lastYield = performance.now();
        stoppedByWatchdog = stop;
        return stop ? 2 : 0;
    },
    set 0(value) {} // CPython nullstiller [0] etter lesing; getteren over avgjør alt
};

// Vises på laste-siden hvis Pyodide bruker lang tid eller ikke lar seg laste
// (f.eks. når et skolenettverk sperrer eller struper trafikken)
const LOAD_SLOW_MS = 30000;
function showLoadingProblem(text) {
    document.getElementById("loading-problem-text").textContent = text;
    document.getElementById("loading-problem").style.display = "block";
}

(async () => {
    const slowTimer = setTimeout(() => {
        logEvent('pyodide_load_slow');
        showLoadingProblem(
            "Dette tar lengre tid enn vanlig. Det kan skyldes et tregt nettverk, eller at " +
            "nettverket på skolen begrenser nedlastingen. Vent litt til, eller prøv igjen."
        );
    }, LOAD_SLOW_MS);
    try {
        pyodide = await loadPyodide({ indexURL: "/pyodide/" });
    } catch (err) {
        console.error(err);
        logEvent('pyodide_load_error');
        showLoadingProblem(
            "Python-miljøet kunne ikke lastes. Sjekk nettforbindelsen og prøv igjen. " +
            "Hvis feilen fortsetter, kan det hende nettverket på skolen sperrer DigitAbel Code."
        );
        return;
    } finally {
        clearTimeout(slowTimer);
    }
    document.getElementById("loading").style.display = "none";
    // matplotlib lastes først når elevens kode importerer den (se loadPackagesFromImports i
    // runPython()). MPLBACKEND gjør at den da bruker Agg (PNG) i stedet for Pyodides nettleser-backend.
    pyodide.runPython(`
import os
os.environ["MPLBACKEND"] = "Agg"
`);

    // "batched" venter på linjeskift før den leverer tekst til JS, så output fra print(..., end="")
    // (uten avsluttende \n) ble liggende i bufferen til neste kjøring. "write" leverer rå bytes
    // umiddelbart ved hvert skriv/flush, i nøyaktig den formen Python skrev den (inkl. evt. \n).
    // append() i stedet for textContent += (som kopierer hele output-teksten ved hvert print()),
    // og et tak på antall tegn per kjøring, slik at store mengder print() ikke kveler siden.
    const stdoutDecoder = new TextDecoder();
    const stderrDecoder = new TextDecoder();
    const writeOutput = (decoder) => (buffer) => {
        if (outputChars < OUTPUT_LIMIT) {
            const text = decoder.decode(buffer, { stream: true });
            outputChars += text.length;
            output.append(text);
            if (outputChars >= OUTPUT_LIMIT) {
                output.append(`\n... (output avkortet etter ${OUTPUT_LIMIT} tegn)\n`);
            }
        }
        return buffer.length;
    };
    pyodide.setStdout({ write: writeOutput(stdoutDecoder) });
    pyodide.setStderr({ write: writeOutput(stderrDecoder) });

    pyodide.globals.set("__js_clear_output__", () => {
        output.textContent = "";
        outputChars = 0;
    });

    pyodide.globals.set("__js_sleep__", (seconds) => new Promise((resolve) => {
        setTimeout(() => {
            lastYield = performance.now();
            resolve();
        }, (seconds || 0) * 1000);
    }));

    pyodide.globals.set("__js_input__", async (msg = "") => {
        if (msg) output.append(String(msg));
        return new Promise((resolve) => {
            const inputEl = document.createElement("input");
            inputEl.type = "text";
            inputEl.className = "python-input-inline";
            inputEl.autocomplete = "off";
            output.appendChild(inputEl);
            inputEl.focus();
            inputEl.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    const val = inputEl.value;
                    inputEl.replaceWith(document.createTextNode(val + "\n"));
                    lastYield = performance.now();
                    resolve(val);
                }
            });
        });
    });
})();

// -------- EASTER EGGS --------
const EASTER_EGGS = [
    { trigger: /verdens beste fotballag!!!/i, response: "Kom igjen, kællær!!!" }
];

function checkEasterEggs(text) {
    for (const egg of EASTER_EGGS) {
        if (egg.trigger.test(text)) {
            output.textContent += egg.response + "\n";
        }
    }
}

// -------- RUN-PYTHON --------
async function runPython() {
    // Ctrl+Enter virker i editoren selv mens laste-siden vises
    if (!pyodide) return;
    logEvent('run_python');

    // Skjul velkomstboksen i output ved første kjøring
    const welcomeBox = document.getElementById("output-welcome");
    if (welcomeBox) welcomeBox.style.display = "none";

    // Tøm alle globale variabler (unntatt systemvariabler og 'input')
    await pyodide.runPython(`
        for var in list(globals().keys()):
            if not var.startswith('__') and var != 'input':
                del globals()[var]
    `);

    // Skjul feilmelding ved ny kjøring
    document.getElementById("error-message").style.display = "none";

    // Vis spinner
    const loadingIndicator = document.getElementById("loading-indicator");
    const loadingText = document.getElementById("loading-text");
    loadingText.textContent = "Kjører kode...";
    loadingIndicator.style.display = "block";

    // Nullstill output og plot
    output.textContent = ">>>\n";
    outputChars = 0;
    const plotDiv = document.getElementById("plot");
    plotDiv.innerHTML = "";
    plotDiv.style.display = "none";

    // Fjern plt.show() fra elevens kode
    let code = editor.getValue().replace(/plt\.show\(\)|pyplot\.show\(\)/g, "");

    // Last inn pakker (numpy, matplotlib osv.) som elevens kode importerer, første gang de trengs.
    // Feiler en nedlasting, gir importen i elevens kode en vanlig ModuleNotFoundError.
    try {
        await pyodide.loadPackagesFromImports(code, {
            // Pyodide melder "Loading a, b, c" før nedlasting (kun når noe faktisk må lastes).
            // Vis bare bibliotekene eleven selv importerer, ikke hele avhengighetslista.
            messageCallback: (msg) => {
                const m = /^Loading (.+)$/.exec(msg);
                if (!m) return;
                const pkgs = m[1].split(", ");
                const imported = new Set(
                    [...code.matchAll(/^\s*(?:import|from)\s+(\w+)/gm)].map(x => x[1])
                );
                const shown = pkgs.filter(p => imported.has(p));
                loadingText.textContent =
                    `Laster bibliotek (${(shown.length ? shown : pkgs.slice(0, 1)).join(", ")})...`;
            },
            errorCallback: (msg) => console.error(msg)
        });
    } catch (err) {
        console.error(err);
    }
    loadingText.textContent = "Kjører kode...";

    // Transformer input()/sleep()-kall til async __js_*__() og pakk inn i async def,
    // slik at nettleseren rekker å tegne opp output mellom hvert kall (ellers fryser fanen)
    const hasInput = /\binput\s*\(/.test(code);
    const hasSleep = /\bsleep\s*\(/.test(code);
    let errorOffset = 11;
    if (hasInput || hasSleep) {
        let transformed = code;
        if (hasInput) transformed = transformed.replace(/\binput\s*\(/g, "await __js_input__(");
        if (hasSleep) {
            transformed = transformed.replace(/\btime\.sleep\s*\(/g, "await __js_sleep__(");
            transformed = transformed.replace(/\bsleep\s*\(/g, "await __js_sleep__(");
        }
        const indented = transformed.split("\n").map(l => "    " + l).join("\n");
        code = `async def __pyted_main__():\n${indented}\nawait __pyted_main__()`;
        errorOffset = 12;
    }

    try {
        // Slå på tidsvakten rett før elevens kode
        lastYield = performance.now();
        stoppedByWatchdog = false;
        pyodide.setInterruptBuffer(watchdogBuffer);
        await pyodide.runPythonAsync(`import sys, warnings, os
warnings.filterwarnings("ignore", category=UserWarning)
if "matplotlib.pyplot" in sys.modules:
    sys.modules["matplotlib.pyplot"].close("all")
__pyted_os_system_orig__ = os.system
def __pyted_os_system__(cmd):
    if isinstance(cmd, str) and cmd.strip().lower() in ("clear", "cls"):
        __js_clear_output__()
        return 0
    return __pyted_os_system_orig__(cmd)
os.system = __pyted_os_system__
` + code);
        pyodide.setInterruptBuffer(undefined);

        // Flush stdout/stderr slik at output uten avsluttende linjeskift (f.eks. print(..., end=""))
        // ikke blir liggende i Pythons buffer og lekker inn i NESTE kjøring (interpreteren er persistent)
        pyodide.runPython("import sys; sys.stdout.flush(); sys.stderr.flush()");

        checkEasterEggs(output.textContent);
        // Sørg for at ">>>"-markøren starter på egen linje, selv om elevens siste print()
        // ikke hadde avsluttende linjeskift (f.eks. print(..., end=""))
        if (output.textContent && !output.textContent.endsWith("\n")) {
            output.textContent += "\n";
        }
        output.textContent += ">>>\n";

        // Sjekk om det finnes plot
        let hasPlot = pyodide.runPython(`
import sys
"matplotlib.pyplot" in sys.modules and len(sys.modules["matplotlib.pyplot"].get_fignums()) > 0
`);

        if (hasPlot) {
    let img = pyodide.runPython(`
    import matplotlib.pyplot as plt
    import base64
    from io import BytesIO
    buf = BytesIO()
    plt.savefig(buf, format="png", dpi=100, bbox_inches='tight')
    base64.b64encode(buf.getvalue()).decode()
    `);
    let image = new Image();
    image.src = "data:image/png;base64," + img;
    image.style.maxWidth = "600px";
    image.style.width = "100%";
    image.style.display = "block";
    image.style.margin = "0 auto";
    plotDiv.style.display = "block";
    plotDiv.appendChild(image);
}

    } catch (err) {
        pyodide.setInterruptBuffer(undefined);
        // Flush eventuell output uten avsluttende linjeskift som ble skrevet før feilen oppstod
        try { pyodide.runPython("import sys; sys.stdout.flush(); sys.stderr.flush()"); } catch (flushErr) {}

        let errorMsg = err.toString();
        // KeyboardInterrupt fra tidsvakten → egen melding (og oversettelse i errorTranslations.js)
        if (stoppedByWatchdog) {
            errorMsg = errorMsg.replace(/^KeyboardInterrupt.*$/m,
                "ProgrammetStoppet: Programmet ble stoppet fordi det brukte for lang tid");
        }

        // Finn kun linjen med <exec> (elevens kode)
        let lines = errorMsg.split("\n");
        let relevant = lines.filter(line =>
            line.includes("<exec>") ||
            line.includes("Error") ||
            line.includes("ProgrammetStoppet")
        );

        // Juster linjenummer
        relevant = relevant.map(line => {
            return line.replace(/line (\d+)/, (match, p1) => {
                return "linje " + (parseInt(p1) - errorOffset); // juster offset
            });
        });

        // Vis den originale feilmeldingen i output
        output.textContent += "\nFEIL:\n" + relevant.join("\n") + "\n>>>\n";

        // Vis elevvennlig feilmelding
        showCustomErrorMessage(errorMsg);
    } finally {
        // Skjul spinner uansett om det var suksess eller feil
        loadingIndicator.style.display = "none";
        editor.focus();
    }
}

// -------- UI --------
function clearOutput() {
    output.textContent = " \n \n ";
    document.getElementById("plot").style.display = "none";
    document.getElementById("error-message").style.display = "none";
    document.getElementById("output-welcome").style.display = "none";
    editor.focus();
}

// -------OPPDATERE ----------
// Funksjon for å sjekke etter oppdateringer
async function checkForUpdates() {
  const cacheNames = await caches.keys();
  await Promise.all(cacheNames.map((name) => caches.delete(name)));
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) await registration.update();
  }
  window.location.reload(true);
}
// Legg til event-listener for knappen
document.getElementById('checkForUpdatesBtn').addEventListener('click', checkForUpdates);
