# Changelog DigitAbel Code

## 0.63

### Nytt i 0.63

* Eksempel-modalen har fått faner: 5. trinn til 10. trinn, med plass til 5 emner à 5 eksempler per trinn, og fanen "Mer" med de 32 eksemplene fra før
* Emner per trinn er lagt inn (bygger på LK20); trinn/emner uten eksempler viser "Kommer snart"
* Modalen husker sist valgte fane
* Eksemplene ligger nå som data i egne filer per trinn (`js/eksempler/trinn5.js` … `trinn10.js`, `mer.js`), og knappene lages automatisk
* Lagt til en del eksempler
* Lagt til "siste 30 dager" i stats
* Fikset: service workeren kunne fylle ny cache med gamle filer fra nettleserens HTTP-cache (ny index.html, men gamle eksempler). Henter nå alltid ferske filer ved installasjon (`cache: "reload"`)
* Lagt til knapp som viser til Online Kurs


## 0.62

### Nytt i 0.62

* Når et bibliotek (f.eks. matplotlib eller numpy) må lastes ned første gang, viser spinneren "Laster bibliotek (matplotlib)..." i stedet for "Kjører kode..."

## 0.61

### Nytt i 0.61

* Logoen oppe til venstre i hovededitoren skjules når vinduet er smalere enn 900px, så verktøyraden får plass 
* Under 806px skjules også "Code"-overskriften og delelinjen etter den
* Kjør-knappen er flyttet fra nederst i editoren til helt til høyre i topframe, og har fått etiketten "Kjør" til høyre for ikonet – lav knapp, ikke like høy som verktøyraden
* Turtle har fått 4 nye eksempler med labyrinter som elevene kan kode en skilpadde gjennom
* Pyodide (Python-miljøet) ligger nå på egen server i `/pyodide/`, sammen med matplotlib, numpy og avhengighetene deres – siden virker også på skolenett som sperrer jsdelivr
* matplotlib/numpy lastes først når elevens kode importerer dem, ikke ved oppstart – mye raskere oppstart
* Laste-siden viser en melding med "Prøv igjen"-knapp hvis lastingen tar over 30 sekunder eller feiler, og logger `pyodide_load_slow` / `pyodide_load_error`
* Service workeren mellomlagrer alle Pyodide-filer i en egen cache som ikke slettes ved app-oppdateringer

## 0.60

### Nytt i 0.60

* Liten label under ikonene i verktøyraden 
* Samme labeler i turtle-editorens verktøyrad
* Logo og "Code"-overskrift flyttet inn i topframe
* Knapperaden i hovededitoren er nå venstrejustert
* Lavere topframe i hovededitoren: mindre luft rundt knappene, mindre logo 
* Knappene i verktøyraden (hovededitor) har nå samme bakgrunn som topframe
* "Code"-overskriften har nå samme farge som knappenes forgrunn
* Større ikoner (1.25rem) og labeler (0.75rem) i verktøyraden
* Mindre horisontal avstand mellom knappene i verktøyraden
* Output (tekstfelt og plot-boks) har nå samme ramme som editoren: 2px
* Tynne vertikale delere i verktøyraden 
* Knappene i verktøyraden er nå sentrert vertikalt i topframe
* Skillelinjen mellom overskriften og Ny er nå sentrert mellom dem

## 0.57

### Nytt i 0.57

* Dra-håndtaket for å endre høyden på editoren har nå samme bakgrunnsfarge som siden rundt 
* Mykere hover-/drafarge på dra-håndtaket (#152b44 i mørkt tema, #f2ece2 i lyst tema)
* Mørk bakgrunnsfarge i output (tekstfelt og plot-boks) endret til #0a1420
* Linjenummer-gutteren i editoren (mørkt tema) har nå bakgrunnsfarge #152b44

## 0.56 - publisert 16/10-26

### Nytt i 0.56

* Lagt til mer info på startside
* Font på input() i terminal arves fra font-velger
* Font-velgeren i turtle-editoren styrer nå også output-feltet, ikke bare kodeeditoren
* Tidsvakt mot uendelige løkker i hovededitoren: etter 10 sekunder uten pause (input()/sleep() teller som pause) spør siden om programmet skal stoppes (via Pyodides interrupt-buffer i stedet for sys.settrace, som gjorde løkker ~4x tregere – CACHE_NAME bumpet til 0.56.4)
* Tak på output (100 000 tegn per kjøring) og raskere utskrift (append() i stedet for textContent +=), slik at store mengder print() ikke får siden til å henge (CACHE_NAME bumpet til 0.56.3)
* Font-størrelse i turtle gjelder også output
* Design-endring: Avrundede hjørner på editor, endret farge på tøm-knapper og flyttet info-knapp til knapperad.

## 0.55 - publisert 12/10-26

### Nytt i 0.55

* Oppdatert farge på info-knapp
* Fikset at output uten avsluttende linjeskift (f.eks. print(i, end="")) kunne bli liggende i Pyodides stdout-buffer og dukke opp i starten av NESTE kjøring i stedet for i kjøringen den hørte til, siden interpreteren er persistent mellom kjøringer. `pyodide.setStdout`/`setStderr` byttet fra `batched` (venter på linjeskift før den leverer tekst til JS) til `write` (leverer rå bytes umiddelbart ved hvert skriv/flush), kombinert med et eksplisitt `sys.stdout.flush()`/`sys.stderr.flush()`-kall etter kjøring
* Lagt til linjeskift før ">>>"-markøren i output hvis elevens siste print() ikke endte med linjeskift, slik at markøren ikke limes til siste utskrift

## 0.54 - publisert 9/10-26

### Nytt i 0.54

* Fikset refresh() av codemirror slik at endring av fontstørrelse ikke skaper feil i render
* Endret oppstarttekst til Utviklet av DigitAbel...
* Oppdatert alle eksempler (CACHE_NAME bumpet til 0.54.1)
* Ryddet i hovededitorens inline-script i index.html: logging (getOS/logEvent m.m.) flyttet til ny js/log.js, PWA-registrering/installasjons-håndtering og åpneTurtle() flyttet inn i js/functions.js (CACHE_NAME bumpet til 0.54.2)
* Fikset manglende refresh() i hovededitorens fontSize()-funksjon (CodeMirror beholdt gamle mål for tegnbredde/-høyde ved bytte av skriftstørrelse, så markøren "hang etter" til neste tastetrykk og venstremargen ved kolonne 1 kunne bli for liten til å se markøren — turtle-editoren hadde allerede denne fiksen)
* Lagt til skriftstørrelse 28 og 32 i skriftstørrelse-velgeren i både hovededitor og turtle-editor (CACHE_NAME bumpet til 0.54.3)
* Endret farger i temaene til å passe bedre mot digitabel-palett

## 0.53 - publisert 16/9-26

### Nytt i 0.53

* Lagt til samme velkomstboks i output-feltet på turtle-editoren som på hovededitoren. Boksen skjules først ved at eleven selv trykker "Kjør" (eller Ctrl+Enter) — den automatiske kjøringen av standardkoden ved sideinnlasting skjuler den ikke, så eleven rekker å se den (CACHE_NAME bumpet til 0.53.1)
* Oppdateringer av eksempler med linker til flere ressurser

## 0.52 - publisert 9/9-26

### Nytt i 0.52

* Klikk på eksempler lukker eksempel-modal
* Oppdaterte eksempler på kode
* Linker kan legges inn i editor, og gjenkjennes som linker automatisk
* Fjernet spesialtegn for == og <=

## 0.51 - publisert 2/9-26

### Nytt i 0.51

* Fikset dele-lenke-bug: base64-koden i delelenken ble ikke URL-encodet, så "+"-tegn i koden ble tolket som mellomrom ved lesing og ødela dekodingen (feilen ble bare logget stille, så mottakeren så gammel/autolagret kode i stedet). Gjelder både hovededitor og turtle-editor. Feilen vises nå til brukeren hvis dekoding likevel skulle feile. (CACHE_NAME bumpet til 0.51.1)
* Oppdatert logging, slik at logfiler genereres for hver måned, og lagres i årsmappe
* stats.html viser nå kun detaljer fra dagens dato
* Kommentarer i codemirror vil gjøre URL'er til lenker

## 0.50

### Nytt i 0.50

* Lagt til code folding i CodeMirror (fold/utfold innrykkede kodeblokker via gutter-piler eller Ctrl-Q), i både hovededitor og turtle-editor (CACHE_NAME bumpet til 0.50.1)
* Lagt til append og andre liste-metoder til kodehjelp
* Oppdatert sleep()-funksjonen slik at den fungerer mer likt som en terminal
* Lagt til et par ekstra feilmeldinger
* Oppdaterer stats.html med arkivert august, og tar med arkiverte verdier

## 0.46 - Publisert 18/8-26

### Nytt i 0.46

* Klargjort for utrullering i skolen for skoleåret 26-27. Feilsøkt og gjennomgått.
* Lagt til Kongsberg-logo ved oppstart av programmet

## 0.45

### Nytt i 0.45 Publisert 23/6-26

* Lagt til skjermbilde (img/code.png) i PWA-manifestet for rikere installasjonsdialog
* Nytt app-ikon (erstatter gammel PytEd-logo), nå i img/icon-192x192.png og img/icon-512x512.png
* Lagt til velkomstboks i output-feltet (hovededitor) som vises til man trykker "Kjør" første gang (CACHE_NAME bumpet til 0.45.1)
* Velkomstboksen viser nå DigitAbel-logoen (egen hvit variant i mørkt tema, img/logo_200_trans_white.png), sentrert med riktig bakgrunn i lyst tema
* Editoren får nå fokus automatisk ved sideinnlasting, slik at Ctrl+Enter fungerer uten å klikke i feltet først
* Fjernet duplikat-mappen /icons/ og fikset turtle sin feilaktige favicon-sti (CACHE_NAME til 0.45)

## 0.44

### Nytt i 0.44

* Fjernet 'Beta'
* Endret bredde på hele siden
* Lagt til håndtak for å endre høyden på kode-vindu
* Lagt til genvei til turtle-editoren, kategori og språk i PWA-manifestet
* Turtle-editoren registrerer nå service worker selv (funker ved direkte besøk på /turtle/)
* Turtle sine filer er nå faktisk med i precache-listen (CACHE_NAME bumpet til 0.44.3)

## 0.43 - Publisert 11/6-26

### Nytt i 0.43

* Fikset input i turtle
* Endret størrelse på turtle-kode-vindu
* Ryddet i info-modal
* Lagt til et easter-egg
* Forbedret hint med egendefinert liste

## 0.42

### Nytt i 0.42

* Separert html, css og js i hver sine filer på turtle, for litt mer oversikt.
* Lagt til turtle i caching ved installasjon av app (tror jeg)
* Endret farger til mer standard dracula
* Lagt til knapper i turtle

## 0.41

### Nytt i 0.41

* Mange nye endringer:
  * Byttet navn fra PytEd til DigitAbel Code
  * Bytter adresse til code.digitabel.org
  * Lagt inn egen turtle-editor (separat)
* Fjernet kodehjelp etter ':'
* Lagt til flere feilmeldinger, samt rettet opp skrivefeil
* Litt mindre grafikk fra pyplot

## 0.40

### Nytt i 0.40

* Endret oppdatering til tvungen oppdatering
* Lagt til knapp for "Installere app"
* Oppdatert css på kodehjelp

## 0.36

### Nytt i 0.36

* Lagt til kodehjelp
* Koblet opp Claude
* Ryddet opp kode!

### Venter / Ideer til 0.37

* print til output kommer etter ferdig kode, feil med input()

## 0.35

### Nytt i 0.35

* Ferdigstilt eksempler
* Oppdatering av logging slik jeg vil at den skal være
* laget stats.html for å vise loggen

### Venter / Ideer til 0.36

* print til output kommer etter ferdig kode, feil med input()

## 0.34

### Nytt i 0.34 - Publisert 16/5-26

* Åpen logging av bruken av nettsiden (samt logging av hvor mange som installerer pwa)
* Mange nye eksempler

### Venter / Ideer til 0.35

* print til output kommer etter ferdig kode, feil med input()

## 0.33

### Nytt i 0.33

* Fikset caching av pyodide-filer fra cdn istedet for fra server
* PWA ser ut til å virke

### Venter / Ideer til 0.34

* print til output kommer etter ferdig kode, feil med input()

## 0.32

### Nytt i 0.32

* Store ting: PytEd er nå en PWA, og skal fungere offline dersom brukere installerer appen

### Venter / Ideer til 0.33

* print til output kommer etter ferdig kode, feil med input()

## 0.31

### Nytt i 0.31

* Rydding i kode
* Utviklet mange nye eksempler
* Lagt til link på logo
* Lagt ut feilmeldinger og kodeeksempler som egne js-filer
* Lagt js-filer og css-filer i egne mapper

### Venter / Ideer til 0.32

* print til output kommer etter ferdig kode, feil med input()

## 0.30 - Publisert 13/5-26

### Nytt i 0.30

* Rollback fra 0.21
* Lagt til knapp for 'Angre' samt ctrl+z som snarvei
* Fiksa 'æøå'...IGJEN
* Fiksa at den husker variabelnavn, samt at den ikke fikk input() til å virke
* Lagt eksempel-kode til en modal, og ikke comboboks. Knappen har også fått et ikon.

### Venter / Ideer til 0.31

* print til output kommer etter ferdig kode, feil med input()

## 0.21 - Publisert 10/5-26

### Nytt i 0.21

* Lagt til logo på laster-siden
* Endret knapper slik at de nå kun har en awsome logo der det passer
* Byttet plass på alle knapper
* Lagt til knapp for nytt vindu
* Byttet rekkefølge på knapper for å etterlikne klassiske apper
* Flyttet på info-knapp slik at den aldri kommer i konflikt med andre knapper
* Grønn kjør-knapp

### Venter / Ideer til 0.22

* Stopp-knapp for å stoppe kjøring - testet...mye rart
* Avbrutt meldingsboks (input()) fører til feil i koden på siden!
* print til output kommer etter ferdig kode, feil med input()

## 0.20 - Publisert 9/5-26

### Nytt i 0.20

* Flyttet overskrift
* Fjernet underoverskrift
* Låst logo øverst i venstre hjørne
* Endret oppstartskjerm, med stort navn, grå skjerm
* Laget nye knapper for kjør og tøm som nå er inne i boksene

### Venter / Ideer til 0.21

* Utvide kode-felt, la logo være på oppstart-vindu, men plasseres under koden på siden!
* Stopp-knapp for å stoppe kjøring - testet...mye rart
* Avbrutt meldingsboks (input()) fører til feil i koden på siden!
* print til output kommer etter ferdig kode, feil med input()
* Knapp for "Tøm editor"...
* Putte knapper for kjør og tøm inn i tekstboksene...

## 0.14

### Nytt i 0.14

* Merket med "Beta"
* pyplot.show() fjernes fra koden...
* Knapp for Tøm Editor
* Deaktivert side så lenge pyodide lastes
* Tykkere knapper for kjør og tøm
* Underoverskrift fungerer som ny side
* pyplot.show() er fjernet fra eksempler

### Venter / Ideer til 0.15

* Stopp-knapp for å stoppe kjøring - testet...mye rart
* Avbrutt meldingsboks (input()) fører til feil i koden på siden!
* print til output kommer etter ferdig kode, feil med input()
* Knapp for "Tøm editor"...

## 0.13 - Publisert 4/5-24

### Nytt i 0.13

* Underoverskrift har fått verdana font
* Tøm-knapp tømmer også Tilpasset tilbakemelding
* Tema-knapp endrer nå på body-class, ikke bare på codemirror
* Tilpaset feilmelding er orange i dark-mode

### Venter / Ideer til 0.14

* Stopp-knapp for å stoppe kjøring
* Avbrutt meldingsboks (input()) fører til feil i koden på siden!
* print til output kommer etter ferdig kode, feil med input()
* exec:14: UserWarning: Matplotlib is currently using agg, which is a non-GUI backend, so cannot show the figure.
* Offline-mode?

## 0.12 - Publisert 3/5-26

### Nytt i 0.12

* Dele-knapp som kopierer lenke til kode til utklippstavle
* Elevtilpasset feilmelding som kan forklare kodefeil bedre til elevene

### Venter / Ideer til 0.13

* print til output kommer etter ferdig kode, feil med input()
* exec:14: UserWarning: Matplotlib is currently using agg, which is a non-GUI backend, so cannot show the figure.
* Offline-mode?
* (Lazy-loading av pyodide skal ikke implementeres)

## 0.11 - publisert 2/5-26

### Nytt i 0.11

* Ryddet i pyodide-mappa 1GB -> 9,7 MB :-)
* Dele-knapp for å dele kode med elever
* Verktøy-tips på knapper
* Lagt til "Gangetabell-test" under eksempel
* Visuell feedback ved kjøring

### Venter / Ideer til 0.12

* print til output kommer etter ferdig kode, feil med input()
* Elevtilpassede feilmeldinger ?!
* Delbar lenke til kode (Del-knapp)
* Offline-mode?
* Lazy-loading av pyodide

## 0.10

### Nytt i 0.10

* CodeMirror er lagt lokalt på server
* Lokal fallback til pyodide er lagt inn
* Tekst på popinfo er oppdatert
* Banner er fragmentert til logo og tekst
* Font Conthrax er lagt inn på siden
* Oppdatert CSS

### Venter til 0.11

* print til output kommer etter ferdig kode, feil med input()
* rydde opp i pyodide-mappe slik at det kun er for nødvendige filer

## 0.9

### Nytt i 0.9

* Pyntet på info-knapp
* Tydelig ramme rundt output-term
* Rydding i html og css
* TAB fungerer som ventet
* Verdana satt som font på knapper og popinfo

### Venter til 0.10

* Lokal fallback kopi av pyodide og codemirror (og evt fonter)

## 0.8

### Nytt i 0.8

* Tab fungerer ved at den setter inn 4 white-spaces
* JS og CSS filer er lagt utenfor html-fila
* Font i kodevindu er byttet fra Fira Code til Jetbrains mono
* Fjernet oppstartsinfo og erstattet med info-knapp

### Venter til 0.9

* Lokal fallback kopi av pyodide og codemirror (og evt fonter)
* Tab på flere linjer sletter linjene...(?)
