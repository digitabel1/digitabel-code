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
        { navn: "Plassholder 2", kode:
`# Her kommer det kode etterhvert` },
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
        { navn: "Plassholder 1", kode:
`# Her kommer det kode etterhvert` },
        { navn: "Plassholder 2", kode:
`# Her kommer det kode etterhvert` },
        { navn: "Plassholder 3", kode:
`# Her kommer det kode etterhvert` },
    ]},
    { emne: "Økonomi", eksempler: [
        { navn: "Plassholder 1", kode:
`# Her kommer det kode etterhvert` },
        { navn: "Plassholder 2", kode:
`# Her kommer det kode etterhvert` },
        { navn: "Plassholder 3", kode:
`# Her kommer det kode etterhvert` },
    ]},
];
