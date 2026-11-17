// --- Logging ---
function getOS() {
    const ua = navigator.userAgent;
    if (/iPhone|iPad|iPod/.test(ua)) return 'iOS';
    if (/CrOS/.test(ua)) return 'ChromeOS';
    if (/Android/.test(ua)) return 'Android';
    if (/Mac OS X/.test(ua)) return 'macOS';
    if (/Windows/.test(ua)) return 'Windows';
    if (/Linux/.test(ua)) return 'Linux';
    return 'Unknown';
}

function logEvent(eventType) {
    const data = {
        event: eventType,
        timestamp: new Date().toISOString(),
        userAgent: getOS(),
        path: window.location.pathname
    };

    fetch('/log_event.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).catch(() => {
        const logs = JSON.parse(localStorage.getItem('pyted_logs') || '[]');
        logs.push(data);
        localStorage.setItem('pyted_logs', JSON.stringify(logs));
    });
}

// --- CodeMirror ---
const editor = CodeMirror.fromTextArea(document.getElementById('code'), {
    mode: 'python',
    theme: 'eclipse',
    lineNumbers: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    styleActiveLine: true,
    indentUnit: 4,
    tabSize: 4,
    indentWithTabs: false,
    foldGutter: true,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
    foldOptions: { rangeFinder: CodeMirror.fold.indent },
    extraKeys: {
        'Ctrl-Enter': () => runPython(),
        'Ctrl-S': (cm) => { saveCode(); },
        'Ctrl-O': (cm) => { openFile(); },
        'Tab': (cm) => {
            if (cm.somethingSelected()) cm.indentSelection('add');
            else cm.replaceSelection('    ');
        },
        'Ctrl-Q': (cm) => cm.foldCode(cm.getCursor())
    }
});

// --- Tema ---
let isDark = false;
function applyTheme(theme) {
    isDark = theme === 'dracula';
    document.body.className = isDark ? 'dark' : 'light';
    editor.setOption('theme', theme);
    document.getElementById('logo_light').style.display  = isDark ? 'none'  : 'block';
    document.getElementById('logo_dark').style.display   = isDark ? 'block' : 'none';
    document.getElementById('banner-light').style.display = isDark ? 'none'  : 'block';
    document.getElementById('banner-dark').style.display  = isDark ? 'block' : 'none';
    document.getElementById('output-welcome-logo-light').style.display = isDark ? 'none'  : 'block';
    document.getElementById('output-welcome-logo-dark').style.display  = isDark ? 'block' : 'none';
    localStorage.setItem('pyted_theme', theme);
}
function toggleTheme() {
    applyTheme(isDark ? 'eclipse' : 'dracula');
    editor.focus();
}

applyTheme(localStorage.getItem('pyted_theme') || 'eclipse');

// --- Kodehjelp ---
let autocompleteEnabled = localStorage.getItem('pyted_autocomplete') === 'true';

function updateAutocompleteButton() {
    const btn = document.getElementById('autocomplete-toggle');
    btn.style.opacity = autocompleteEnabled ? '1' : '0.4';
    btn.title = autocompleteEnabled ? 'Kodehjelp på (klikk for å slå av)' : 'Kodehjelp av (klikk for å slå på)';
}

document.getElementById('autocomplete-toggle').addEventListener('click', () => {
    autocompleteEnabled = !autocompleteEnabled;
    localStorage.setItem('pyted_autocomplete', autocompleteEnabled);
    updateAutocompleteButton();
    editor.focus();
});

editor.on('inputRead', (cm, change) => {
    if (!autocompleteEnabled) return;
    if (!/[\w.]/.test(change.text[0])) return;
    CodeMirror.commands.autocomplete(cm, CodeMirror.hint.python, { completeSingle: false });
});

updateAutocompleteButton();

// --- Klikkbare lenker i kommentarer ---
// Understreker URL-er som står etter et # (kommentar) i koden, og åpner dem i ny fane ved Ctrl/Cmd+klikk.
const LINK_REGEX = /https?:\/\/[^\s)>\]]+/g;

function updateCommentLinks(cm) {
    cm.getAllMarks().forEach((mark) => {
        if (mark.className === 'cm-clickable-link') mark.clear();
    });
    for (let i = 0; i < cm.lineCount(); i++) {
        const line = cm.getLine(i);
        const hashIndex = line.indexOf('#');
        if (hashIndex === -1) continue;
        const rest = line.slice(hashIndex);
        LINK_REGEX.lastIndex = 0;
        let match;
        while ((match = LINK_REGEX.exec(rest))) {
            const url = match[0].replace(/[.,;:)]+$/, '');
            const from = { line: i, ch: hashIndex + match.index };
            const to = { line: i, ch: from.ch + url.length };
            cm.markText(from, to, { className: 'cm-clickable-link', title: 'Ctrl/Cmd+klikk for å åpne ' + url });
        }
    }
}

let linkifyTimeout;
editor.on('change', (cm) => {
    clearTimeout(linkifyTimeout);
    linkifyTimeout = setTimeout(() => updateCommentLinks(cm), 200);
});
updateCommentLinks(editor);

editor.getWrapperElement().addEventListener('mousedown', (event) => {
    if (!(event.ctrlKey || event.metaKey)) return;
    const pos = editor.coordsChar({ left: event.clientX, top: event.clientY });
    const marks = editor.findMarksAt(pos).filter((mark) => mark.className === 'cm-clickable-link');
    if (!marks.length) return;
    event.preventDefault();
    const range = marks[0].find();
    const link = document.createElement('a');
    link.href = editor.getRange(range.from, range.to);
    link.target = '_blank';
    link.rel = 'noopener';
    link.click();
});

// --- Skriftstørrelse ---
function setFontSize(size) {
    document.querySelector('.CodeMirror').style.fontSize = size + 'px';
    document.getElementById('output').style.fontSize = size + 'px';
    editor.refresh();
    editor.focus();
}

// --- Easter eggs ---
const EASTER_EGGS = [
    { trigger: /verdens beste fotballag/i, response: "Heia Moss!" }
];

function checkEasterEggs(text) {
    const outputEl = document.getElementById('output');
    for (const egg of EASTER_EGGS) {
        if (egg.trigger.test(text)) {
            outputEl.textContent += egg.response + "\n";
        }
    }
}

// --- Skulpt: Python-kjøring ---
function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
        throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}

function runPython(isAutoRun = false) {
    if (!isAutoRun) {
        logEvent('turtle_run');
        // Skjul velkomstboksen i output ved første manuelle kjøring (ikke ved autokjøring på sideinnlasting)
        const welcomeBox = document.getElementById('output-welcome');
        if (welcomeBox) welcomeBox.style.display = 'none';
    }

    const code = editor.getValue();

    document.getElementById('output').textContent = '>>>\n';
    document.getElementById('status-message').textContent = '';

    const canvasDiv = document.getElementById('turtle-canvas');
    canvasDiv.innerHTML = '';

    Sk.sysmodules = new Sk.builtin.dict([]);

    Sk.configure({
        output(text) {
            document.getElementById('output').textContent += text;
        },
        read: builtinRead,
        execLimit: 60000,
        inputfun(prompt) {
            return new Promise((resolve) => {
                const outputEl = document.getElementById('output');
                if (prompt) outputEl.textContent += String(prompt);
                const inputEl = document.createElement('input');
                inputEl.type = 'text';
                inputEl.className = 'python-input-inline';
                inputEl.autocomplete = 'off';
                outputEl.appendChild(inputEl);
                inputEl.focus();
                inputEl.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') {
                        const val = inputEl.value;
                        inputEl.replaceWith(document.createTextNode(val + '\n'));
                        resolve(val);
                    }
                });
            });
        },
    });

    Sk.TurtleGraphics = { target: 'turtle-canvas', width: 600, height: 600 };

    Sk.misceval.asyncToPromise(() =>
        Sk.importMainWithBody('<stdin>', false, code, true)
    ).then(() => {
        checkEasterEggs(document.getElementById('output').textContent);
        document.getElementById('output').textContent += '>>>\n';
    }, (err) => {
        const msg = err.toString().replace(/on line (\d+)/, (_, n) => `on line ${parseInt(n) - 2}`);
        document.getElementById('output').textContent += '\nFEIL:\n' + msg + '\n>>>\n';
    }).finally(() => {
        editor.focus();
    });
}

// --- Filhåndtering ---
function saveCode() {
    const blob = new Blob([editor.getValue()], { type: 'text/x-python' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'turtle_kode.py';
    a.click();
    editor.focus();
}

function openFile() {
    document.getElementById('fileInput').click();
}

document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
        editor.setValue(ev.target.result);
        editor.focus();
    };
    reader.readAsText(file);
    e.target.value = '';
});

function clearEditor() {
    if (confirm('Vil du tømme editoren?')) editor.setValue('');
    editor.focus();
}

function shareCode() {
    const code = editor.getValue();
    if (!code.trim()) {
        alert('Skriv noen kode først!');
        editor.focus();
        return;
    }
    const encoded = btoa(encodeURIComponent(code).replace(/%([0-9A-F]{2})/g, (_, p) => String.fromCharCode(parseInt(p, 16))));
    const url = `${location.origin}${location.pathname}?code=${encodeURIComponent(encoded)}`;
    editor.focus();
    navigator.clipboard.writeText(url)
        .then(() => alert('Lenke kopiert til utklippstavlen! Del den med andre.'))
        .catch(() => {
            const tmp = document.createElement('input');
            tmp.value = url;
            document.body.appendChild(tmp);
            tmp.select();
            document.execCommand('copy');
            document.body.removeChild(tmp);
            alert('Lenke kopiert til utklippstavlen! Del den med andre.');
        });
}

(function loadCodeFromURL() {
    const code = new URLSearchParams(location.search).get('code');
    if (!code) return;
    try {
        editor.setValue(decodeURIComponent(atob(code).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')));
    } catch (e) {
        console.error('Feil ved dekoding av kode:', e);
        alert('Klarte ikke å lese koden fra delelenken. Lenken kan ha blitt endret eller kuttet av.');
    }
})();

// Kjør koden (standardkode eller delt via URL) automatisk ved sideinnlasting
runPython(true);

// --- Eksempler ---
const examples = {
    firkant:
`import turtle

t = turtle.Turtle()
t.speed(5)

for i in range(4):
    t.forward(100)
    t.right(90)`,

    trekant:
`import turtle

t = turtle.Turtle()
t.speed(5)
t.color("blue")

for i in range(3):
    t.forward(150)
    t.left(120)`,

    stjerne:
`import turtle

t = turtle.Turtle()
t.speed(10)
t.color("gold")

for i in range(5):
    t.forward(150)
    t.right(144)`,

    sirkel:
`import turtle

t = turtle.Turtle()
t.speed(10)
t.color("blue")

t.circle(100)`,

    polygon:
`import turtle

t = turtle.Turtle()
t.speed(5)

antall_sider = 6
vinkel = 360 / antall_sider

for i in range(antall_sider):
    t.forward(100)
    t.right(vinkel)`,

    spiral:
`import turtle

t = turtle.Turtle()
t.speed(0)
t.color("purple")

for i in range(60):
    t.forward(i * 3)
    t.right(91)`,

    regnbue:
`import turtle

t = turtle.Turtle()
t.speed(0)
t.width(4)

farger = ["red", "orange", "yellow", "green", "blue", "purple"]

for i, farge in enumerate(farger):
    t.color(farge)
    t.circle(20 + i * 18)`,

    blomst:
`import turtle

t = turtle.Turtle()
t.speed(0)
t.color("red", "pink")
t.begin_fill()

for i in range(36):
    t.circle(60, 60)
    t.left(60)
    t.circle(60, 60)
    t.left(10)

t.end_fill()`,

    kvadrater:
`import turtle

t = turtle.Turtle()
t.speed(0)

farger = ["red", "blue", "green", "orange"]

for i in range(20):
    t.color(farger[i % 4])
    t.forward(i * 8)
    t.right(90)`,

    // TODO: plassholder – fyll inn kode for labyrint 1
    labyrint1:
`import turtle

STEG = 50   # størrelsen på én rute (eleven går forward(STEG))

# HINT!!! TRYKK PÅ PILA VED LINJENUMER 7 
# DU SKRIVER KODE PÅ LINJE 112
def tegn_brett():
    """Tegner labyrinten og returnerer skilpadden, plassert ved inngangen."""

    # ---------------------------------------------
    #  LABYRINT
    #  #  = vegg
    #  S  = start (inngang)
    #  G  = gevinst
    #  mellomrom = gang
    # ---------------------------------------------
    kart = [
        "#########",
        "S   #   #",
        "### # # #",
        "#   # # #",
        "# ### # #",
        "#     # #",
        "##### # #",
        "#       G",
        "#########",
    ]

    bredde = len(kart[0]) * STEG
    hoyde = len(kart) * STEG
    venstre = -bredde / 2
    topp = hoyde / 2

    def rute_til_xy(rad, kolonne):
        """Gir midten av en rute i turtle-koordinater."""
        x = venstre + kolonne * STEG + STEG / 2
        y = topp - rad * STEG - STEG / 2
        return x, y

    def tegn_rektangel(t, x, y, lengde):
        """Tegner et fylt rektangel (én rute høyt) med øvre venstre hjørne i (x, y)."""
        t.goto(x, y)
        t.begin_fill()
        t.goto(x + lengde, y)
        t.goto(x + lengde, y - STEG)
        t.goto(x, y - STEG)
        t.goto(x, y)
        t.end_fill()

    skjerm = turtle.Screen()
    try:
        skjerm.tracer(0)      # slå av animasjon mens labyrinten tegnes
    except Exception:
        pass

    # --- Tegn labyrinten med en egen "tegne-skilpadde" ---
    tegner = turtle.Turtle()
    tegner.hideturtle()
    tegner.speed(0)
    tegner.penup()
    tegner.color("#1a3560")

    start = None
    for rad, linje in enumerate(kart):
        y = topp - rad * STEG
        kolonne = 0
        while kolonne < len(linje):
            tegn = linje[kolonne]
            if tegn == "#":
                # finn hvor langt veggen fortsetter bortover, og tegn alt på én gang
                slutt = kolonne
                while slutt < len(linje) and linje[slutt] == "#":
                    slutt += 1
                tegn_rektangel(tegner, venstre + kolonne * STEG, y, (slutt - kolonne) * STEG)
                kolonne = slutt
                continue
            elif tegn == "G":
                gx, gy = rute_til_xy(rad, kolonne)
                tegner.goto(gx, gy)
                tegner.dot(STEG * 0.7, "#f5a200")
            elif tegn == "S":
                start = (rad, kolonne)
            kolonne += 1

    try:
        skjerm.update()       # vis hele labyrinten på én gang
        skjerm.tracer(1)      # slå animasjonen på igjen for elevens skilpadde
    except Exception:
        pass

    # --- Plasser elevens skilpadde ved inngangen ---
    abel = turtle.Turtle()
    abel.shape("turtle")
    abel.color("green")
    abel.penup()
    sx, sy = rute_til_xy(*start)
    abel.goto(sx, sy)
    abel.setheading(0)   # peker mot høyre, inn i labyrinten
    abel.pendown()
    abel.speed(1)
    return abel


abel = tegn_brett()

# ---------------------------------------------
#  ELEVENS OPPGAVE: få skilpadden Abel fram til gevinsten!
#  Bruk for eksempel:
#     abel.forward(STEG * 2)
#     abel.left(90)
#     abel.right(90)





# ---------------------------------------------
`,

    // TODO: plassholder – fyll inn kode for labyrint 2
    labyrint2:
`import turtle

STEG = 50   # størrelsen på én rute (eleven går forward(STEG))

# HINT!!! TRYKK PÅ PILA VED LINJENUMER 7 
# DU SKRIVER KODE PÅ LINJE 112
def tegn_brett():
    """Tegner labyrinten og returnerer skilpadden, plassert ved inngangen."""

    # ---------------------------------------------
    #  LABYRINT
    #  #  = vegg
    #  S  = start (inngang)
    #  G  = gevinst
    #  mellomrom = gang
    # ---------------------------------------------
    kart = [
        "#########",
        "S   #   #",
        "### # # #",
        "#   # # #",
        "# ### # #",
        "#     # #",
        "####### #",
        "#       G",
        "#########",
    ]

    bredde = len(kart[0]) * STEG
    hoyde = len(kart) * STEG
    venstre = -bredde / 2
    topp = hoyde / 2

    def rute_til_xy(rad, kolonne):
        """Gir midten av en rute i turtle-koordinater."""
        x = venstre + kolonne * STEG + STEG / 2
        y = topp - rad * STEG - STEG / 2
        return x, y

    def tegn_rektangel(t, x, y, lengde):
        """Tegner et fylt rektangel (én rute høyt) med øvre venstre hjørne i (x, y)."""
        t.goto(x, y)
        t.begin_fill()
        t.goto(x + lengde, y)
        t.goto(x + lengde, y - STEG)
        t.goto(x, y - STEG)
        t.goto(x, y)
        t.end_fill()

    skjerm = turtle.Screen()
    try:
        skjerm.tracer(0)      # slå av animasjon mens labyrinten tegnes
    except Exception:
        pass

    # --- Tegn labyrinten med en egen "tegne-skilpadde" ---
    tegner = turtle.Turtle()
    tegner.hideturtle()
    tegner.speed(0)
    tegner.penup()
    tegner.color("#1a3560")

    start = None
    for rad, linje in enumerate(kart):
        y = topp - rad * STEG
        kolonne = 0
        while kolonne < len(linje):
            tegn = linje[kolonne]
            if tegn == "#":
                # finn hvor langt veggen fortsetter bortover, og tegn alt på én gang
                slutt = kolonne
                while slutt < len(linje) and linje[slutt] == "#":
                    slutt += 1
                tegn_rektangel(tegner, venstre + kolonne * STEG, y, (slutt - kolonne) * STEG)
                kolonne = slutt
                continue
            elif tegn == "G":
                gx, gy = rute_til_xy(rad, kolonne)
                tegner.goto(gx, gy)
                tegner.dot(STEG * 0.7, "#f5a200")
            elif tegn == "S":
                start = (rad, kolonne)
            kolonne += 1

    try:
        skjerm.update()       # vis hele labyrinten på én gang
        skjerm.tracer(1)      # slå animasjonen på igjen for elevens skilpadde
    except Exception:
        pass

    # --- Plasser elevens skilpadde ved inngangen ---
    abel = turtle.Turtle()
    abel.shape("turtle")
    abel.color("green")
    abel.penup()
    sx, sy = rute_til_xy(*start)
    abel.goto(sx, sy)
    abel.setheading(0)   # peker mot høyre, inn i labyrinten
    abel.pendown()
    abel.speed(1)
    return abel


abel = tegn_brett()

# ---------------------------------------------
#  ELEVENS OPPGAVE: få skilpadden Abel fram til gevinsten!
#  Bruk for eksempel:
#     abel.forward(STEG * 2)
#     abel.left(90)
#     abel.right(90)





# ---------------------------------------------
`,

    // TODO: plassholder – fyll inn kode for labyrint 3
    labyrint3:
`import turtle

STEG = 40   # størrelsen på én rute (eleven går forward(STEG))

# HINT!!! TRYKK PÅ PILA VED LINJENUMER 7 
# DU SKRIVER KODE PÅ LINJE 114
def tegn_brett():
    """Tegner labyrinten og returnerer skilpadden, plassert ved inngangen."""

    # ---------------------------------------------
    #  LABYRINT
    #  #  = vegg
    #  S  = start (inngang)
    #  G  = gevinst
    #  mellomrom = gang
    # ---------------------------------------------
    kart = [
        "#############",
        "S   #       #",
        "### ### ### #",
        "# #     # # #",
        "# ####### # #",
        "#     #     #",
        "# # # # #####",
        "# # # # #   #",
        "# # ### ### #",
        "# #         G",
        "#############",
    ]

    bredde = len(kart[0]) * STEG
    hoyde = len(kart) * STEG
    venstre = -bredde / 2
    topp = hoyde / 2

    def rute_til_xy(rad, kolonne):
        """Gir midten av en rute i turtle-koordinater."""
        x = venstre + kolonne * STEG + STEG / 2
        y = topp - rad * STEG - STEG / 2
        return x, y

    def tegn_rektangel(t, x, y, lengde):
        """Tegner et fylt rektangel (én rute høyt) med øvre venstre hjørne i (x, y)."""
        t.goto(x, y)
        t.begin_fill()
        t.goto(x + lengde, y)
        t.goto(x + lengde, y - STEG)
        t.goto(x, y - STEG)
        t.goto(x, y)
        t.end_fill()

    skjerm = turtle.Screen()
    try:
        skjerm.tracer(0)      # slå av animasjon mens labyrinten tegnes
    except Exception:
        pass

    # --- Tegn labyrinten med en egen "tegne-skilpadde" ---
    tegner = turtle.Turtle()
    tegner.hideturtle()
    tegner.speed(0)
    tegner.penup()
    tegner.color("#1a3560")

    start = None
    for rad, linje in enumerate(kart):
        y = topp - rad * STEG
        kolonne = 0
        while kolonne < len(linje):
            tegn = linje[kolonne]
            if tegn == "#":
                # finn hvor langt veggen fortsetter bortover, og tegn alt på én gang
                slutt = kolonne
                while slutt < len(linje) and linje[slutt] == "#":
                    slutt += 1
                tegn_rektangel(tegner, venstre + kolonne * STEG, y, (slutt - kolonne) * STEG)
                kolonne = slutt
                continue
            elif tegn == "G":
                gx, gy = rute_til_xy(rad, kolonne)
                tegner.goto(gx, gy)
                tegner.dot(STEG * 0.7, "#f5a200")
            elif tegn == "S":
                start = (rad, kolonne)
            kolonne += 1

    try:
        skjerm.update()       # vis hele labyrinten på én gang
        skjerm.tracer(1)      # slå animasjonen på igjen for elevens skilpadde
    except Exception:
        pass

    # --- Plasser elevens skilpadde ved inngangen ---
    abel = turtle.Turtle()
    abel.shape("turtle")
    abel.color("green")
    abel.penup()
    sx, sy = rute_til_xy(*start)
    abel.goto(sx, sy)
    abel.setheading(0)   # peker mot høyre, inn i labyrinten
    abel.pendown()
    abel.speed(1)
    return abel


abel = tegn_brett()

# ---------------------------------------------
#  ELEVENS OPPGAVE: få skilpadden Abel fram til gevinsten!
#  Bruk for eksempel:
#     abel.forward(STEG * 2)
#     abel.left(90)
#     abel.right(90)





# ---------------------------------------------`,

    // TODO: plassholder – fyll inn kode for labyrint 4
    labyrint4:
`import turtle

STEG = 32   # størrelsen på én rute (eleven går forward(STEG))

# HINT!!! TRYKK PÅ PILA VED LINJENUMER 7 
# DU SKRIVER KODE PÅ LINJE 118
def tegn_brett():
    """Tegner labyrinten og returnerer skilpadden, plassert ved inngangen."""

    # ---------------------------------------------
    #  LABYRINT
    #  #  = vegg
    #  S  = start (inngang)
    #  G  = gevinst
    #  mellomrom = gang
    # ---------------------------------------------
    kart = [
        "#################",
        "S     #         #",
        "##### # # ##### #",
        "# #   # #   # # #",
        "# # ####### # # #",
        "#   #   #   #   #",
        "# ### # # ### ###",
        "# #   #   #   # #",
        "# ### ##### ### #",
        "#   #   # # #   #",
        "### # # # # ### #",
        "# # # # #   #   #",
        "# # ### # ### # #",
        "#       #     # G",
        "#################",
    ]

    bredde = len(kart[0]) * STEG
    hoyde = len(kart) * STEG
    venstre = -bredde / 2
    topp = hoyde / 2

    def rute_til_xy(rad, kolonne):
        """Gir midten av en rute i turtle-koordinater."""
        x = venstre + kolonne * STEG + STEG / 2
        y = topp - rad * STEG - STEG / 2
        return x, y

    def tegn_rektangel(t, x, y, lengde):
        """Tegner et fylt rektangel (én rute høyt) med øvre venstre hjørne i (x, y)."""
        t.goto(x, y)
        t.begin_fill()
        t.goto(x + lengde, y)
        t.goto(x + lengde, y - STEG)
        t.goto(x, y - STEG)
        t.goto(x, y)
        t.end_fill()

    skjerm = turtle.Screen()
    try:
        skjerm.tracer(0)      # slå av animasjon mens labyrinten tegnes
    except Exception:
        pass

    # --- Tegn labyrinten med en egen "tegne-skilpadde" ---
    tegner = turtle.Turtle()
    tegner.hideturtle()
    tegner.speed(0)
    tegner.penup()
    tegner.color("#1a3560")

    start = None
    for rad, linje in enumerate(kart):
        y = topp - rad * STEG
        kolonne = 0
        while kolonne < len(linje):
            tegn = linje[kolonne]
            if tegn == "#":
                # finn hvor langt veggen fortsetter bortover, og tegn alt på én gang
                slutt = kolonne
                while slutt < len(linje) and linje[slutt] == "#":
                    slutt += 1
                tegn_rektangel(tegner, venstre + kolonne * STEG, y, (slutt - kolonne) * STEG)
                kolonne = slutt
                continue
            elif tegn == "G":
                gx, gy = rute_til_xy(rad, kolonne)
                tegner.goto(gx, gy)
                tegner.dot(STEG * 0.7, "#f5a200")
            elif tegn == "S":
                start = (rad, kolonne)
            kolonne += 1

    try:
        skjerm.update()       # vis hele labyrinten på én gang
        skjerm.tracer(1)      # slå animasjonen på igjen for elevens skilpadde
    except Exception:
        pass

    # --- Plasser elevens skilpadde ved inngangen ---
    abel = turtle.Turtle()
    abel.shape("turtle")
    abel.color("green")
    abel.penup()
    sx, sy = rute_til_xy(*start)
    abel.goto(sx, sy)
    abel.setheading(0)   # peker mot høyre, inn i labyrinten
    abel.pendown()
    abel.speed(1)
    return abel


abel = tegn_brett()

# ---------------------------------------------
#  ELEVENS OPPGAVE: få skilpadden Abel fram til gevinsten!
#  Bruk for eksempel:
#     abel.forward(STEG * 2)
#     abel.left(90)
#     abel.right(90)





# ---------------------------------------------
`,
};

function loadExample(name) {
    if (examples[name]) {
        editor.setValue(examples[name]);
        closeModal('examples-modal');
        runPython();
    }
}

// --- Modaler ---
function openModal(id) {
    document.getElementById(id).style.display = 'flex';
}
function closeModal(id) {
    document.getElementById(id).style.display = 'none';
    editor.focus();
}

window.addEventListener('click', e => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
        editor.focus();
    }
});
