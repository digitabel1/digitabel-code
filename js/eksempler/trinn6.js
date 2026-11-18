// EKSEMPLER: 6. trinn – maks 5 emner, maks 5 eksempler per emne
// Nytt eksempel legges inn i eksempler-lista til riktig emne, f.eks.:
//     { navn: "Gangetabellen", kode:
// `for i in range(1, 11):
//     print(i, "* 7 =", i * 7)` },
EKSEMPLER["6. trinn"] = [
    { emne: "Brøk og prosent", eksempler: [
        { navn: "Likeverdige brøker", kode:
`# likeverdige brøker

faktor = 2

teller = 1
nevner = 2
forhold = teller/nevner

ny_teller = teller * faktor
ny_nevner = nevner * faktor
ny_forhold = ny_teller / ny_nevner

print(teller, "/", nevner)
print(forhold)
print()
print(ny_teller, "/", ny_nevner)
print(ny_forhold)` },
        { navn: "Brøk og desimaltall", kode:
`# brøk og desimltall
nevner = 10
for teller in range(1,nevner + 1):
    forhold = teller/nevner
    print(teller, "/", nevner,"->",forhold )` },
        { navn: "Tilfeldig faktor", kode:
`# Programmet utvider brøken med en tilfeldig faktor mellom 1 og 10. Du skal gjette hvilken faktor som er brukt.
from random import randint
teller = 2
nevner = 5
print(teller, "/", nevner, "=")

faktor = randint(1, 10)
teller = teller * faktor
nevner = nevner * faktor

print(teller, "/", nevner, "=")
print(teller / nevner)

svar = int(input("Gjett hva faktoren er: "))

if svar == faktor:
    print("Riktig, brøken ble utvidet med", faktor)
else:
    print("Feil, brøken ble utvidet med", faktor)` },
    ]},
    { emne: "Plangeometri", eksempler: [
        { navn: "Rektangel", kode:
`# Vi ser på areal og omkrets av et rektangel

lengde = 6
bredde = 7

areal = lengde * bredde
omkrets = 2 * (lengde + bredde)

print("Areal: ", areal)
print("Omkrets:", omkrets)` },
        { navn: "Trekant", kode:
`# Vi ser på areal og omkrets av en trekant

grunnlinje = 6
høyde = 7

areal = (grunnlinje * høyde) / 2

print("Areal: ", areal)
` },
        { navn: "Plassholder 3", kode:
`# Her kommer det kode etterhvert` },
    ]},
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
        { navn: "Differanse", kode:
`# Programmet lager to tilfeldige tall og ber deg regne ut differansen. Det sjekker om svaret ditt er riktig.

from random import randint
ant = 10
riktige = 0
for i in range(ant):
    ledd_1 = randint(40, 60)
    ledd_2 = randint(1, 40)

    differanse = ledd_1 - ledd_2

    print(ledd_1, "-", ledd_2)

    svar = int(input("Skriv svar: "))

    if svar == differanse:
        print("Riktig svar!!")
        riktige = riktige + 1
    else:
        print("Feil, riktig svar er:", differanse)
print("Antall riktige:", riktige)` },
        { navn: "Plassholder 3", kode:
`# Her kommer det kode etterhvert` },
    ]},
    { emne: "Romgeometri", eksempler: [
        { navn: "Rett prisme", kode:
`# Vi ser på volum av et rett prisme
lengde = 7
bredde = 3
høyde = 2

volum = lengde * bredde * høyde

print("Volum:", volum)` },
        { navn: "Plassholder 2", kode:
`# Her kommer det kode etterhvert` },
        { navn: "Plassholder 3", kode:
`# Her kommer det kode etterhvert` },
    ]},
    { emne: "Variabler og formler", eksempler: [
        { navn: "Plassholder 1", kode:
`# Her kommer det kode etterhvert` },
        { navn: "Plassholder 2", kode:
`# Her kommer det kode etterhvert` },
        { navn: "Plassholder 3", kode:
`# Her kommer det kode etterhvert` },
    ]},
];
