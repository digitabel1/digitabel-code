
// -------- FEILMELDINGER --------
// Mapping for elevvennlige feilmeldinger
const errorTranslations = {

    // Tidsvakten i runPython() (js/pyted.js)
    "ProgrammetStoppet":
    "Code-kommentar:\nProgrammet ble stoppet fordi det brukte veldig lang tid. Har du kanskje en uendelig løkke? Sjekk at while-løkka di har en betingelse som blir usann etter hvert, eller at range() ikke er altfor stor.",

    // SyntaxError
    "SyntaxError: expected ':'": 
    "Code-kommentar:\nDu mangler kanskje et kolon (:) etter `if`, `for`, `while` eller `def`.",

    "SyntaxError: unexpected EOF while parsing": 
    "Code-kommentar:\nDu har glemt å lukke en parentese, krøllparentes eller hermetegn.",

    "SyntaxError: invalid character in identifier": 
    "Code-kommentar:\nDu har brukt et ugyldig tegn i variabelnavnet (f.eks. æ, ø, å, mellomrom).",

    "SyntaxError: '(' was never closed": 
    "Code-kommentar:\nDet kan se ut som om du ikke har lukket alle parentesene.",


    "SyntaxError: unmatched ')'":
    "Code-kommentar:\nDet ser ut som om du har litt for mange ')' i koden din.",

    "SyntaxError: Missing parentheses": 
    "Code-kommentar:\nDet ser ut som om du har glemt å sette inn en parantes. Husk at funksjoner (som print) alltid skal etterfølges av en parantes.",
    
    "SyntaxError: cannot assign to function call here. Maybe you meant '==' instead of '='?": 
    "Code-kommentar:\nDet ser ut som om du har brukt enkel '=' i et vilkår. Husk at i vilkår så må vi bruke dobbel '=='.",

    "SyntaxError: unterminated string literal": 
    "Code-kommentar:\nDet ser ut som om du ikke har avsluttet et anførselstegn...Sjekk den aktuelle linjen!",

    "SyntaxError: invalid syntax. Maybe you meant '==' or ':=' instead of '='?": 
    "Code-kommentar:\nDet ser ut som om du har brukt enkel '=' i et vilkår. Husk at i vilkår så må vi bruke dobbel '=='.",

    // IndentationError
    "IndentationError: expected an indented block": 
    "Code-kommentar:\nHar du husket å rykke inn kodelinjer under 'for', 'while', 'if' eller `def`?",

    "IndentationError: unexpected indent": 
    "Code-kommentar:\nDet kan virke som om python synes det er for mange innrykk. Husk å sjekke linjen før og linjen etter også. (Det kan også være mellomrom i starten av en linje...)",

    "IndentationError: unindent does not match": 
    "Code-kommentar:\nHer er det noe feil med innrykk som ikke passer sammen. Husk at et standard innrykk i python er 4 mellomrom.",

    // NameError
    "NameError: name": (msg) => {
        const varName = msg.match(/name '(\w+)' is not defined/)?.[1] || "ukjent";
        return `Code-kommentar:\nVariabelen (eller funksjonen) '${varName}' er ikke definert. Enten finnes den ikke, eller så har du kanskje en skrivefeil? Husk STORE og små bokstaver.`;
    },

    // TypeError
    "TypeError: unsupported operand type(s)":
    "Code-kommentar:\nDu prøver å bruke +, -, * eller / på noe som ikke er tall. Sjekk at du bare regner med tall.",

    "TypeError: can't multiply sequence":
    "Code-kommentar:\nDet ser ut som om du prøver å gange to eller flere verdier som ikke er tall. Det KAN være at variabelen din er string og ikke int eller float.",

    "TypeError: can only concatenate str":
    "Code-kommentar:\nDet ser ut som om du legger sammen en string med et tall. Du kan bare legge sammen string og string, eller tall og tall.",

    "TypeError: 'int' object is not callable":
    "Code-kommentar:\nDu prøver å bruke noe som tall som om det var en funksjon. Sjekk om du har kalt en variabel det samme som en innebygd funksjon, f.eks. `input`, `print`, `int` eller `len`.",

    "TypeError: 'str' object is not callable":
    "Code-kommentar:\nDu prøver å bruke en tekstverdi som om det var en funksjon. Sjekk om du har kalt en variabel det samme som en innebygd funksjon, f.eks. `input`, `print`, `int` eller `len`.",

    "TypeError: 'float' object is not callable":
    "Code-kommentar:\nDu prøver å bruke et desimaltall som om det var en funksjon. Sjekk om du har kalt en variabel det samme som en innebygd funksjon, f.eks. `input`, `print`, `int` eller `len`.",

    "TypeError: object is not callable":
    "Code-kommentar:\nDu prøver å kalle noe som ikke er en funksjon. Sjekk om du har kalt en variabel det samme som en innebygd funksjon, f.eks. `input`, `print`, `int` eller `len`.",

    // ZeroDivisionError
    "ZeroDivisionError":
    "Code-kommentar:\nDu prøver å dele på null, og det er ikke lov i matematikk heller! Sjekk at nevneren din aldri kan bli 0.",

    // ValueError
    "ValueError: invalid literal for int()":
    "Code-kommentar:\nDu prøver å gjøre om en tekst til heltall med int(), men teksten inneholder ikke bare tall. Sjekk hva brukeren skrev inn.",

    "ValueError: could not convert string to float":
    "Code-kommentar:\nDu prøver å gjøre om en tekst til desimaltall med float(), men teksten inneholder ikke bare tall. Hvis du bruker input; sjekk hva brukeren skrev inn. Hvis du bruker pyplot.pie; du har kanskje byttet om verdier og labels",

    "ValueError":
    "Code-kommentar:\nEn funksjon fikk en verdi den ikke klarer å håndtere. Sjekk hva du sender inn som argument.",

    // IndexError
    "IndexError: list index out of range":
    "Code-kommentar:\nDu prøver å hente et element fra en liste, men indeksen finnes ikke. Husk at lister starter på indeks 0, og at siste indeks er lengde minus 1.",

    "IndexError":
    "Code-kommentar:\nDu prøver å hente noe fra en liste eller streng med en indeks som ikke finnes.",

    // KeyError
    "KeyError":
    "Code-kommentar:\nDu prøver å hente en verdi fra en ordbok (dictionary) med en nøkkel som ikke finnes. Sjekk at du bruker riktig nøkkel.",

    // RecursionError
    "RecursionError":
    "Code-kommentar:\nFunksjonen din kaller seg selv for mange ganger og havner i en uendelig løkke. Sjekk at du har en betingelse som stopper rekursjonen.",

    // AttributeError
    "AttributeError: '...' object has no attribute '...'": (msg) => {
        const parts = msg.match(/'(\w+)' object has no attribute '(\w+)'/);
        if (parts) {
            return `Code-kommentar:\n'${parts[1]}' har ikke en egenskap som heter '${parts[2]}'. Sjekk om du har skrevet navnet riktig.`;
        }
        return msg;
    },

    // Generell fallback
    "default": 
    "Code-kommentar:\nNoe gikk galt, men jeg ser det ikke. Jeg blir nok flinkere etterhvert. Les feilmeldingen fra python nøye."
};

// Funksjon for å vise elevvennlig feilmelding
function showCustomErrorMessage(errorMessage) {
    let customMessage = errorTranslations["default"];

    for (const [key, value] of Object.entries(errorTranslations)) {
        if (errorMessage.includes(key)) {
            customMessage = typeof value === "function" ? value(errorMessage) : value;
            break;
        }
    }

    const errorElement = document.getElementById("error-message");
    errorElement.textContent = customMessage;
    errorElement.style.display = "block";
}
