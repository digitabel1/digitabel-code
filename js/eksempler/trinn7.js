// EKSEMPLER: 7. trinn – maks 5 emner, maks 5 eksempler per emne
// Nytt eksempel legges inn i eksempler-lista til riktig emne, f.eks.:
//     { navn: "Gangetabellen", kode:
// `for i in range(1, 11):
//     print(i, "* 7 =", i * 7)` },
EKSEMPLER["7. trinn"] = [
    { emne: "Tall", eksempler: [
        { navn: "Gangetabellen", kode:
`# Vi tester hvor gode vi er i gangetabellen
# Programmet sjekker hvor mange riktige svar du klarer på 60 sek
# Jeg klarte 31, men jeg er en gammel gubbe ;-)

from random import randint
from time import time

antall_riktig = 0
tid = 60

print("Du skal svare på så mange regnestykker du klarer på 60 sekunder.")
print("Tilslutt får du beskjed om hvor mange riktige svar du hadde.")
print("Trykk 'ENTER' når du er klar!")

input()
start = time()

while time() - start < tid:
    tall_1 = randint(1, 10)
    tall_2 = randint(1, 10)
    fasit = str(tall_1 * tall_2)
    oppgave = (str(tall_1) + " * " + str(tall_2) + " = ")
    svar = input(oppgave)
    if svar == fasit:
        print("Riktig!")
        antall_riktig += 1
    else:
        print("Feil")
print("Du klarte", antall_riktig, "riktige på", tid, "sekunder!")` },
        { navn: "Desimaltall", kode:
`# Programmet øker tallet med intervallet du velger under step.
# Hvis du bruker hundredeler (0.01), må du endre round til 2 desimaler.
step = 0.01
tall = 0.0

print("Trykk enter for å øke tallet med", step, "eller s for å stoppe programmet")
print(tall)

while tall < 5:
    if input() == "s":
        break
    tall += step
    print(round(tall, 2))` },
        { navn: "Plassholder 3", kode:
`# Her kommer det kode etterhvert` },
    ]},
    { emne: "Regneuttrykk", eksempler: [
        { navn: "Plassholder 1", kode:
`# Her kommer det kode etterhvert` },
        { navn: "Plassholder 2", kode:
`# Her kommer det kode etterhvert` },
        { navn: "Plassholder 3", kode:
`# Her kommer det kode etterhvert` },
    ]},
    { emne: "Algebra", eksempler: [
        { navn: "Plassholder 1", kode:
`# Her kommer det kode etterhvert` },
        { navn: "Plassholder 2", kode:
`# Her kommer det kode etterhvert` },
        { navn: "Plassholder 3", kode:
`# Her kommer det kode etterhvert` },
    ]},
    { emne: "Statistikk", eksempler: [
        { navn: "Gjennomsnitt", kode:
`# Vi regner ut et gjennomsnitt

skonummer = [38, 46, 44, 41, 39, 44]

sum_skonummer = sum(skonummer)
ant_skonummer = len(skonummer)

gjennomsnitt = sum_skonummer / ant_skonummer

print("Gjennomsnitt:", gjennomsnitt)` },
        { navn: "Linjediagram", kode:
`# Lage linjediagram med python
from matplotlib import pyplot

dager = ["Man", "Tir", "Ons", "Tor", "Fre", "Lør", "Søn"]
timer = [2, 3, 2.5, 2.5, 4, 6, 5]

pyplot.plot(dager, timer)
pyplot.title("Min skjermtid gjennom uka")
pyplot.xlabel("Dag")
pyplot.ylabel("Timer")
pyplot.grid()` },
        { navn: "Stolpediagram", kode:
`from matplotlib import pyplot

aktiviteter = ["YouTube", "Spill", "Snapchat", "TikTok", "Lekser"]
timer = [6, 8, 4, 5, 2]

pyplot.bar(aktiviteter, timer)
pyplot.title("Hva bruker jeg skjermtiden på? (hele uka)")
pyplot.xlabel("Aktivitet")
pyplot.ylabel("Timer")` },
    ]},
    { emne: "Økonomi", eksempler: [
        { navn: "Priser", kode:
`# Gå inn på en nettside der du kan handle dagligvarer.
# Finn en vare, noter prisen per enhet og velg hvor mange du vil kjøpe.

print("----------------Velkommen til butikken----------------")
print("Hva vil du handle?")

vare = input("Tast inn varetype: ")
antall = float(input("Tast inn antall: "))
enhetspris = float(input("Tast inn enhetspris: "))

totalpris = round(antall * enhetspris, 2)

print("Du har handlet:", antall, vare)
print("Totalpris", totalpris)` },
        { navn: "Plassholder 2", kode:
`# Her kommer det kode etterhvert` },
        { navn: "Plassholder 3", kode:
`# Her kommer det kode etterhvert` },
    ]},
];
