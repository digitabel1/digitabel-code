// -------- TEMA TOGGLE --------
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.classList.contains("dark") ? "dark" : "light";
    const newTheme = currentTheme === "dark" ? "eclipse" : "dracula";

    // Toggle body-klassen
    body.classList.toggle("dark");
    body.classList.toggle("light");

    // Oppdater CodeMirror-tema
    editor.setOption("theme", newTheme);

    // Lagre temaet i localStorage
    localStorage.setItem("pyted_theme", newTheme);

    // Oppdater bannerets synlighet
    document.getElementById("banner-light").style.display = newTheme === "eclipse" ? "block" : "none";
    document.getElementById("banner-dark").style.display = newTheme === "dracula" ? "block" : "none";

    // Oppdater logoen
    document.getElementById("logo_code_light").style.display = newTheme === "eclipse" ? "block" : "none";
    document.getElementById("logo_code_dark").style.display = newTheme === "dracula" ? "block" : "none";
    document.getElementById("output-welcome-logo-light").style.display = newTheme === "eclipse" ? "block" : "none";
    document.getElementById("output-welcome-logo-dark").style.display = newTheme === "dracula" ? "block" : "none";

    editor.focus();
}
// Last temaet fra localStorage ved oppstart
document.addEventListener("DOMContentLoaded", () => {
    // Last temaet fra localStorage (standard: "eclipse")
    const savedTheme = localStorage.getItem("pyted_theme") || "eclipse";

    // Sett body-klassen basert på lagret tema
    const body = document.body;
    body.classList.remove("light", "dark");
    body.classList.add(savedTheme === "dracula" ? "dark" : "light");

    // Sett CodeMirror-tema
    editor.setOption("theme", savedTheme);

    // Oppdater UI-elementer (banner, logo)
    document.getElementById("banner-light").style.display = savedTheme === "eclipse" ? "block" : "none";
    document.getElementById("banner-dark").style.display = savedTheme === "dracula" ? "block" : "none";
    document.getElementById("logo_code_light").style.display = savedTheme === "eclipse" ? "block" : "none";
    document.getElementById("logo_code_dark").style.display = savedTheme === "dracula" ? "block" : "none";
    document.getElementById("output-welcome-logo-light").style.display = savedTheme === "eclipse" ? "block" : "none";
    document.getElementById("output-welcome-logo-dark").style.display = savedTheme === "dracula" ? "block" : "none";

    // Last koden fra URL
    loadCodeFromURL();

    // Sett fokus i editoren slik at Ctrl+Enter fungerer med en gang
    editor.focus();
});

// TEMA: event-listener for knappen
document.getElementById("theme-toggle").addEventListener("click", toggleTheme);

// FONT-funksjon
function fontSize(size) {
    editor.getWrapperElement().style.fontSize = size + "px";
    document.getElementById("output").style.fontSize = size + "px";
    editor.refresh();
    editor.focus();
}

// -------- LAGRE --------
function saveCode() {
    const code = editor.getValue();
    const blob = new Blob([code], { type: "text/x-python" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "kode.py";
    a.click();

    URL.revokeObjectURL(url);

    editor.focus();
}

// -------- ÅPNE --------
function openFile() {
    document.getElementById("fileInput").click();
}

// -------- ÅPNE FIL ------
document.getElementById("fileInput").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.endsWith(".py")) {
        alert("Velg en Python-fil (.py)");
        editor.focus();
        return;
    }

    if (editor.getValue().trim() !== "") {
        if (!confirm("Er du sikker på at du vil erstatte koden?")) {
            editor.focus();
            return;
        }
    }

    const reader = new FileReader();

    reader.onload = function(e) {
        editor.setValue(e.target.result);
        editor.focus();
    };

    reader.readAsText(file);
    event.target.value = "";
});



// INFO-modal: Kode for å vise popup
document.getElementById('info-button').addEventListener('click', function() {
    document.getElementById('shortcut-modal').style.display = 'flex';
});
document.getElementById('close-modal').addEventListener('click', function() {
    document.getElementById('shortcut-modal').style.display = 'none';
    editor.focus();
});
document.getElementById('shortcut-modal').addEventListener('click', function(e) { // Lukk popup når brukeren klikker utenfor
    if (e.target === this) {
        this.style.display = 'none';
        editor.focus();
    }
});

// Dele-knapp
// -------- DELE KODE --------
function generateShareableLink() {
    const currentCode = editor.getValue();
    if (!currentCode.trim()) {
        alert("Skriv noen kode først!");
        editor.focus();
        return;
    }
    // Konverter koden til UTF-8 og deretter til Base64
    const encodedCode = btoa(
        encodeURIComponent(currentCode).replace(/%([0-9A-F]{2})/g, (match, p1) => {
            return String.fromCharCode(parseInt(p1, 16));
        })
    );
    const shareUrl = `${window.location.origin}${window.location.pathname}?code=${encodeURIComponent(encodedCode)}`;
    editor.focus();
    navigator.clipboard.writeText(shareUrl)
        .then(() => {
            alert("Lenke kopiert til utklippstavlen! Del den med andre.");
        })
        .catch((err) => {
            const tempInput = document.createElement("input");
            tempInput.value = shareUrl;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand("copy");
            document.body.removeChild(tempInput);
            alert("Lenke kopiert til utklippstavlen! Del den med andre.");
        });
}

// Hente kode fra URL
function loadCodeFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const codeParam = urlParams.get("code");
    if (codeParam) {
        try {
            // Dekoder Base64 og konverter tilbake til UTF-8
            const decodedCode = decodeURIComponent(
                atob(codeParam).split('').map((c) => {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join('')
            );
            editor.setValue(decodedCode);
        } catch (e) {
            console.error("Feil ved dekoding av kode:", e);
            const errorElement = document.getElementById("error-message");
            errorElement.textContent = "Klarte ikke å lese koden fra delelenken. Lenken kan ha blitt endret eller kuttet av.";
            errorElement.style.display = "block";
        }
    }
}

document.getElementById("share-button").addEventListener("click", generateShareableLink);

// SLETT-funksjon: Editor
function clearEditor() {
    editor.setValue("");
    editor.focus();
}

// ANGRE-funksjon: Editor
function undoEditor() {
    editor.undo();
    editor.focus();
}

// EKSEMPEL-modal: Åpne modal
document.getElementById('examples-button').addEventListener('click', visEksempelModal);

// Lukk modal
document.getElementById('close-examples-modal').addEventListener('click', function() {
    document.getElementById('examples-modal').style.display = 'none';
    editor.focus();
});

// Lukk modal når brukeren klikker utenfor
window.addEventListener('click', function(event) {
    const modal = document.getElementById('examples-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
        editor.focus();
    }
});

// -------- TURTLE-EDITOR --------
// Åpner Turtle-editoren i ny fane, så koden i denne editoren ikke mistes
function åpneTurtle() {
    window.open("/turtle/index.html", "_blank");
}

// -------- PWA --------
// Registrer service worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js", {
            scope: "/"
        })
        .then((registration) => {
            console.log("ServiceWorker registrert med suksess!");
        })
        .catch((error) => {
            console.error("Feil ved registrering av ServiceWorker:", error);
        });
    });
}

// Logg PWA-installasjonsmulighet
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById('installAppBtn').style.display = 'inline-block';
});

document.getElementById('installAppBtn').addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    logEvent('pwa_install_' + outcome);
    deferredPrompt = null;
    document.getElementById('installAppBtn').style.display = 'none';
});

// Logg når PWA er installert
window.addEventListener('appinstalled', () => {
    logEvent('pwa_installed');
    deferredPrompt = null;
    document.getElementById('installAppBtn').style.display = 'none';
});