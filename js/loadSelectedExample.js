// EKSEMPLER: Fanene i eksempel-modalen, i visningsrekkefølge.
// Selve eksemplene ligger i js/eksempler/<fane>.js, som fyller inn EKSEMPLER["<fane>"]
// med en liste av { emne, eksempler: [{ navn, kode }] } (maks 5 emner à 5 eksempler).
const EKSEMPEL_FANER = ["5. trinn", "6. trinn", "7. trinn", "8. trinn", "9. trinn", "10. trinn", "Mer"];
const EKSEMPLER = {};

// Åpne modalen: bygg fanene første gang, og vis sist valgte fane (default "Mer")
function visEksempelModal() {
    const faneRad = document.getElementById('examples-tabs');
    if (!faneRad.hasChildNodes()) {
        EKSEMPEL_FANER.forEach(fane => {
            const knapp = document.createElement('button');
            knapp.className = 'examples-tab';
            knapp.setAttribute('role', 'tab');
            knapp.dataset.fane = fane;
            knapp.textContent = fane;
            knapp.addEventListener('click', () => visEksempelFane(fane));
            faneRad.appendChild(knapp);
        });
    }

    const sisteFane = localStorage.getItem('pyted_examples_tab');
    visEksempelFane(EKSEMPEL_FANER.includes(sisteFane) ? sisteFane : 'Mer');
    document.getElementById('examples-modal').style.display = 'block';
}

// Vis emnene og eksempelknappene for én fane
function visEksempelFane(fane) {
    localStorage.setItem('pyted_examples_tab', fane);
    document.querySelectorAll('#examples-tabs .examples-tab').forEach(knapp => {
        const aktiv = knapp.dataset.fane === fane;
        knapp.classList.toggle('active', aktiv);
        knapp.setAttribute('aria-selected', aktiv);
    });

    const rutenett = document.getElementById('examples-grid');
    rutenett.innerHTML = '';
    const emner = EKSEMPLER[fane] || [];
    if (emner.length === 0) {
        rutenett.innerHTML = '<p class="examples-empty">Kommer snart</p>';
        return;
    }

    emner.forEach((emne, emneNr) => {
        const kolonne = document.createElement('div');
        kolonne.className = 'examples-topic';
        const overskrift = document.createElement('h3');
        overskrift.textContent = emne.emne;
        kolonne.appendChild(overskrift);

        if (emne.eksempler.length === 0) {
            const tom = document.createElement('p');
            tom.className = 'examples-empty';
            tom.textContent = 'Kommer snart';
            kolonne.appendChild(tom);
        }
        emne.eksempler.forEach((eksempel, eksNr) => {
            const knapp = document.createElement('button');
            knapp.textContent = eksempel.navn;
            knapp.addEventListener('click', () => loadSelectedExample(fane, emneNr, eksNr));
            kolonne.appendChild(knapp);
        });
        rutenett.appendChild(kolonne);
    });
}

// EKSEMPLER: Funksjon for å laste inn
function loadSelectedExample(fane, emneNr, eksNr) {
    editor.setValue(EKSEMPLER[fane][emneNr].eksempler[eksNr].kode);
    document.getElementById('examples-modal').style.display = 'none';
    editor.focus();
}
