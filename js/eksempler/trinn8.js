// EKSEMPLER: 8. trinn – maks 5 emner, maks 5 eksempler per emne
// Nytt eksempel legges inn i eksempler-lista til riktig emne, f.eks.:
//     { navn: "Gangetabellen", kode:
// `for i in range(1, 11):
//     print(i, "* 7 =", i * 7)` },
EKSEMPLER["8. trinn"] = [
    { emne: "Tall", eksempler: [
        { navn: "Regnerekkefølge", kode:
`# Vi lager tilfeldige oppgaver
from random import randint

for i in range(5):
    a = randint(1, 10)
    b = randint(1, 10)
    c = randint(1, 10)
    svar = int(input(f"{a} + {b} * {c} = "))
    if svar == a + b * c:
        print("Riktig!")
    else:
        print("Feil, svaret er", a + b * c)` },

            { navn: "Desimaltall", kode:
`# Vi runder av desimaltall
# Hva blir output av denne koden? Prøv å bytte ut desimaltall...
tall = 7.493589

for ant in range(0, 7):
    print(round(tall, ant))` },
        { navn: "Plassholder 3", kode:
`# Her kommer det kode etterhvert` },
        { navn: "Plassholder 4", kode:
`# Her kommer det kode etterhvert` },
        { navn: "Plassholder 5", kode:
`# Her kommer det kode etterhvert` },
    ]},
    { emne: "Brøk / Delelighet", eksempler: [
        { navn: "Deleliget", kode:
`# Flere aktiviteter om tall og faktorer: https://digitabel.org/matematikk/8-trinn/primtall-faktorisering/
# % tester delelighet på et tall

rest = 25 % 4 # er 25 delelig med 4?
print(rest) # nei, 25 / 4 gir 1 i rest

rest = 42 % 6 # er 42 delelig med 6
print(rest) # ja, 42 / 6 gir 0 i rest
print("--------")
# Hva blir resultatet av denne koden?
print(37 % 6)
print(40 % 6)
print(21 % 7)
print(7 % 2)` },
        { navn: "Faktorer", kode:
`# Flere aktiviteter om tall og faktorer: https://digitabel.org/matematikk/8-trinn/primtall-faktorisering/
# Finne alle faktorene til et tall

tall = 42 # prøv med forskjellige tall

print(tall, "har følgende faktorer:")

for i in range(1, tall + 1):
    if tall % i == 0:
        print(i)` },
        { navn: "Primtall", kode:
`# Flere aktiviteter om tall og faktorer: https://digitabel.org/matematikk/8-trinn/primtall-faktorisering/
# Et primtall har bare 2 faktorer (seg selv og 1)
# Vi legger alle faktorene til tallet i en liste og sjekker om det bare er 2

tall = 43 # prøv med forskjellige tall
liste = []

for i in range(1, tall + 1):
    if tall % i == 0:
        liste.append(i)

if len(liste) == 2:
    print(tall, "er et primtall (har bare 2 faktorer)")
else:
    print(tall, "er ikke et primtall.")` },
        { navn: "Brøk-Prosent", kode:
`# Flere aktiviteter om brøk: https://digitabel.org/matematikk/6-trinn/brok-og-desimaltall/brok6-1-pyt/
# La oss sjekke verdien på noen brøker
# prøv ut dine egne brøker

teller = 7
nevner = 9

desimaltall = teller / nevner
prosent = desimaltall * 100

print(teller, "/", nevner, "=")
print(round(desimaltall,4), "=")
print(round(prosent, 2), "%")` },
        { navn: "Plassholder 5", kode:
`# Her kommer det kode etterhvert` },
    ]},
    { emne: "Algebra", eksempler: [
        { navn: "Figurtall", kode:
`# Flere aktiviteter om figurtall: https://digitabel.org/matematikk/8-trinn/tallmonster/
# Vi finner noen kjente figurtall

print("Fnr(n)	Kvadrattall	Rektangeltall	Trekanttall")
for n in range(1, 11):
    kvadrattall = n * n
    rektangeltall = n * (n + 1)
    trekanttall = (n * (n + 1)) // 2
    print(n, "	", kvadrattall, "		", rektangeltall, "		", trekanttall)` },
        { navn: "Verdi av uttrykk", kode:
`# Vi tester ut verdien på forskjellige uttrykk
x = 3

print(2 * x + 1) # 2x + 1
print(2 * (x + 1)) # 2(x + 1)
print(x ** 2) # x²
print(2 * x ** 2) # 2x²
print((2 * x) ** 2) # (2x)²` },
        { navn: "Lage uttrykk", kode:
`# Vi tester ut verdien på forskjellige uttrykk
a = 3
b = 5
c = 7
d = 13

# sette sammen verdien 1
print(d - c - b)

# kan du sette sammen til 2

# kan du sette sammen til 4

# kan du sette sammen til 9

# kan du sette sammen til 44
` },
        { navn: "Likning I", kode:
`# Vi utforsker en likning: 4x - 4 = x + 5

x = 1

vs = 4 * x - 4
hs = x + 5
print("x:", x, "  Venstre side:", vs, "  Høyre side:", hs)` },
        { navn: "Likning II", kode:
`# Vi utforsker en likning: 3x/2 = 2x/2 + 4
# Kan du endre koden slik at den kun skriver ut løsningen?
# Kan du teste med andre likninger?

for x in range(0, 11):
    vs = 3 * x / 2
    hs = 2 * x / 2 + 4
    print("x:", x, "  Venstre side:", vs, "  Høyre side:", hs)` },
    ]},
    { emne: "Funksjoner", eksempler: [
        { navn: "Plassholder 1", kode:
`# Her kommer det kode etterhvert` },
        { navn: "Plassholder 2", kode:
`# Her kommer det kode etterhvert` },
        { navn: "Plassholder 3", kode:
`# Her kommer det kode etterhvert` },
        { navn: "Plassholder 4", kode:
`# Her kommer det kode etterhvert` },
        { navn: "Plassholder 5", kode:
`# Her kommer det kode etterhvert` },
    ]},
    { emne: "Annet", eksempler: [
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
        { navn: "Gjett tallet", kode:
`import random

hemmelig = random.randint(1, 100)
forsok = 0
gjett = 0

while gjett != hemmelig:
    gjett = int(input("Gjett et tall mellom 1 og 100: "))
    forsok = forsok + 1
    if gjett < hemmelig:
        print("For lavt!")
    elif gjett > hemmelig:
        print("For høyt!")

print("Riktig! Du brukte", forsok, "forsøk")` },
        { navn: "Gjett regelen", kode:
`import random

a = random.randint(1, 5)
b = random.randint(0, 10)

print("Jeg har en hemmelig regel. Skriv et tall, så får du svaret!")

for i in range(5):
    x = int(input("Ditt tall: "))
    print("Svar:", a * x + b)

gang = int(input("Hvilket tall ganger jeg med? "))
pluss = int(input("Hvilket tall legger jeg til? "))

if gang == a and pluss == b:
    print("Riktig! Du knakk koden!")
else:
    print("Nesten! Regelen var: ganger med", a, "og legger til", b)` },
        { navn: "Plassholder 4", kode:
`# Her kommer det kode etterhvert` },
        { navn: "Plassholder 5", kode:
`# Her kommer det kode etterhvert` },
    ]},
];
