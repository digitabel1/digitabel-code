// EKSEMPLER: "Mer" – de opprinnelige eksemplene fra før trinn-fanene kom (0.63)
EKSEMPLER["Mer"] = [
    { emne: "Statistikk", eksempler: [
        { navn: "Linjediagram", kode:
`# For flere aktiviteter innen statistikk, se https://digitabel.org/matematikk/9-trinn/statistikk/
# Tegne linjediagram

from matplotlib import pyplot
x_verdier = ["2008", "2009", "2010", "2011", "2012"]
y_verdier = [190, 205, 226, 275, 280]
pyplot.plot(x_verdier, y_verdier) # pyplot.bar for stolpediagram

#---- Linjene under er kun for å designe diagrammet ----
pyplot.title("Antall moskus på Dovrefjell")
pyplot.xlabel("År")
pyplot.ylabel("Antall moskus")
pyplot.ylim(0, 300) # Sette grense for verdier på y-akse` },
        { navn: "Sektordiagram", kode:
`# For flere aktiviteter innen statistikk, se https://digitabel.org/matematikk/9-trinn/statistikk/
# Tegne sektordiagram

from matplotlib import pyplot
x_verdier = ["AP", "Høyre", "FrP", "SP", "SV", "Andre"]
y_verdier = [49, 45, 27, 19, 11, 18]
pyplot.pie(y_verdier, labels=x_verdier, autopct='%1.1f%%')
pyplot.title("Partifordeling")` },
        { navn: "Gjennomsnitt", kode:
`# For flere aktiviteter innen statistikk, se https://digitabel.org/matematikk/9-trinn/statistikk/
# Beregne gjennomsnitt

observasjoner = [10, 13, 16, 24, 8, 10]
sum_obs = sum(observasjoner)
ant_obs = len(observasjoner)
gjennomsnitt = sum_obs / ant_obs

print("Gjennomsnitt:", gjennomsnitt)` },
        { navn: "Sentralmål", kode:
`# For flere aktiviteter innen statistikk, se https://digitabel.org/matematikk/9-trinn/statistikk/
# Sentralmål og spredningsmål

from statistics import mean, median, mode

datasett = [12, 16, 19, 23, 12, 101]

print("Observasjoner:", datasett)
print("Gjennomsnitt:", mean(datasett))
print("Median:", median(datasett))
print("Typetall:", mode(datasett))
print("Variasjonsbredde:", max(datasett) - min(datasett))
` },
    ]},
    { emne: "Geometri", eksempler: [
        { navn: "Areal", kode:
`# Flere aktiviteter innen plangeometri; se https://digitabel.org/matematikk/9-trinn/plangeometri/
# Areal av rektangel

lengde = 10
bredde = 15
areal = lengde * bredde

print("Areal av rektangel:")
print(areal)` },
        { navn: "Pytagoras", kode:
`# Flere aktiviteter innen pytagoras; se https://digitabel.org/matematikk/9-trinn/pytagoras/
# Regne ut ukjent hypotenus

from math import sqrt

k1 = 12
k2 = 16
hyp = sqrt(k1**2 + k2**2)

print("Ukjent hypotenus:", hyp)` },
        { navn: "Volum", kode:
`# Flere aktiviteter inne romgeometri: https://digitabel.org/matematikk/9-trinn/romgeometri/
# Volum av sylider

from math import pi

radius = 5
høyde = 11

volum = pi * radius ** 2 * høyde
volum = round(volum, 2)

print("Volum av sylinder:", volum)` },
        { navn: "Vinkelsum", kode:
`# Flere aktiviteter innen plangeometri; se https://digitabel.org/matematikk/9-trinn/plangeometri/
# Beregne vinkelsum i n-kanter

n = 5 # Antall sider i n-kanten

vinkelsum = (n - 2) * 180
vinkel = vinkelsum / n

print("Vinkelsum:", vinkelsum)
print("Dersom n-kanten er regulær, så er alle vinklene", vinkel, "grader.")` },
    ]},
    { emne: "Sannsynlighet", eksempler: [
        { navn: "Fakultet", kode:
`# Flere aktiviteter innen sannsynlighet: https://digitabel.org/matematikk/9-trinn/sannsynlighet/
# Fakultet

def fakultet(tall):
    svar = 1
    for i in range(1, tall + 1):
        svar = svar * i
    return svar

print("8! =", fakultet(8))` },
        { navn: "Terninger", kode:
`# Flere aktiviteter innen sannsynlighet: https://digitabel.org/matematikk/9-trinn/sannsynlighet/
# Sum av to terninger; fordeling av utfall 

from random import randint
from matplotlib import pyplot

antall_kast = 100 # Endre for å se ny fordeling (gjerne 100 000 eller 1 000 000)
x_verdier = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
frekvens = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

for _ in range(antall_kast):
    resultat = randint(1, 6) + randint(1, 6)
    frekvens[resultat - 2] += 1 # øker verdien på frekvensen til resultatet

for x in x_verdier:
    print(x, "-", frekvens[x - 2])

pyplot.bar(x_verdier, frekvens)
pyplot.xlabel("Sum")
pyplot.ylabel("Antall")
pyplot.title("Fordeling av summer av to terninger etter " + str(antall_kast) + " kast.")` },
        { navn: "Myntkast", kode:
`# Flere aktiviteter innen sannsynlighet: https://digitabel.org/matematikk/9-trinn/sannsynlighet/
# Vi kaster mynt

from random import randint

antall_kast = 10

for i in range(antall_kast):
    kast = randint(0, 1)
    if kast == 1:
        print("Mynt")
    else:
        print("Kron")` },
        { navn: "Trekke kuler", kode:
`# Flere aktiviteter innen sannsynlighet: https://digitabel.org/matematikk/9-trinn/sannsynlighet/
# Trekk 2 kuler fra pose med 5 hvite og 7 svarte kuler uten tilbakelegg

from random import choice

pose = ["h", "h", "h", "h", "h", "s", "s", "s", "s", "s", "s", "s"] # 0 er hvit, 1 er svart
trekk_1 = choice(pose)
pose.remove(trekk_1)
trekk_2 = choice(pose)
pose.remove(trekk_2)

if trekk_1 == "s" and trekk_2 == "s":
    print("2 svarte")
elif trekk_1 == "s" and trekk_2 == "h" or trekk_1 == "h" and trekk_2 == "s":
    print("1 hvit og 1 svart")
else:
    print("2 hvite")` },
    ]},
    { emne: "Tall", eksempler: [
        { navn: "Delelighet", kode:
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
        { navn: "Faktor", kode:
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
    ]},
    { emne: "Funksjoner", eksempler: [
        { navn: "Koordinater", kode:
`# Flere aktiviteter om funksjoner: https://digitabel.org/matematikk/8-trinn/funksjoner/
# Vi plotter noen koordinater

from matplotlib import pyplot

pyplot.grid()

# Sette en og en
pyplot.scatter(1,6)
pyplot.scatter(9, 1)

# Sette flere
x_verdier = [2, 3, 4, 5, 6]
y_verdier = [6, 5, 4, 3, 2]
pyplot.scatter(x_verdier, y_verdier)` },
        { navn: "Lineære", kode:
`# Flere aktiviteter om lineære funksjoner: https://digitabel.org/matematikk/10-trinn/lineaere-funksjoner-10/
# Vi lager en lineær funksjon: f(x) = 2x - 4

x_verdier = []
y_verdier = []

for x in range(0, 11):
    x_verdier.append(x)
    y_verdier.append(2*x - 4)

# ---- Verditabell -----
print(x_verdier)
print(y_verdier)

# ---- For å skrive ut en graf
from matplotlib import pyplot
pyplot.grid()
pyplot.plot(x_verdier, y_verdier)` },
        { navn: "f(x)", kode:
`# Flere aktiviteter om funksjoner: https://digitabel.org/matematikk/10-trinn/andre-funksjoner-kommer/
# Vi legger inn en funksjon som en python-funksjon: f(x)=x^2 - 2x + 1

def f(x):
    return x**2 - 2*x + 1

x_verdier = []
y_verdier = []

for x in range(-10, 11):
    x_verdier.append(x)
    y_verdier.append(f(x))

# ---- Verditabell -----
print(x_verdier)
print(y_verdier)

# ---- For å skrive ut en graf
from matplotlib import pyplot
pyplot.grid()
pyplot.plot(x_verdier, y_verdier)` },
        { navn: "Brøkfunksjon", kode:
`# Flere aktiviteter om funksjoner: https://digitabel.org/matematikk/10-trinn/andre-funksjoner-kommer/
# Vi legger inn en brøkfunksjon: f(x)=24000/x + 2500

def f(x):
    return 24000/x + 2500

x_verdier = []
y_verdier = []

for x in range(1, 30):
    x_verdier.append(x)
    y_verdier.append(f(x))

# ---- For å skrive ut en graf
from matplotlib import pyplot
pyplot.grid()
pyplot.plot(x_verdier, y_verdier)` },
    ]},
    { emne: "Økonomi", eksempler: [
        { navn: "Vekstfaktor", kode:
`# Flere aktiviteter om økonomi: https://digitabel.org/matematikk/10-trinn/okonomi/
# Årlig prisstigning med vekstfaktor

prosent = 3.4 # prisstigning i norge siste 30 år i prosent
prosentfaktor = prosent / 100
vekstfaktor = 1 + prosentfaktor # 1 - prosentfaktor ved prosentvis nedgang

# La oss utforske prisen på brød noen år frem i tid (eller tilbake)
pris = 45 
ant_år = 74 # la oss finne prisen i 2100 (bruk negative tall for tilbake i tid)
ny_pris = round(pris * vekstfaktor**ant_år, 2)

print("Pris i dag:", pris, "   Pris om", ant_år, "år:", ny_pris)` },
        { navn: "Sparing", kode:
`# Flere aktiviteter om økonomi: https://digitabel.org/matematikk/10-trinn/okonomi/
# Program som viser resultat av sparing

konto = 9000
mnd_innskudd = 750
rente = 3.5 # årlig rente på innskudd
ant_år = 5

for mnd in range(1, ant_år*12 + 1):
    konto += mnd_innskudd
    konto = round(konto * (1 + rente/(100*12)),2)
    print("Ant mnd:", mnd, "    Konto:", konto)
print("Etter", ant_år, "år kommer det til å være", konto, "kr på kontoen.")` },
        { navn: "Finne prosenten", kode:
`# Flere aktiviteter om økonomi: https://digitabel.org/matematikk/10-trinn/okonomi/
# Vi finner prosenten

pris_1 = 5990 # Høyeste pris
pris_2 = 4990 # Laveste pris

diff = pris_1 - pris_2

prosent_1 = round((diff/pris_2) * 100, 2)
prosent_2 = round((diff/pris_1) * 100, 2)

print("Pris_1 er", prosent_1, "prosent høyere enn pris_2")
print("Pris_2 er", prosent_2, "prosent lavere enn pris_1")` },
        { navn: "Nedbetalingsplan", kode:
`# Flere aktiviteter om økonomi: https://digitabel.org/matematikk/10-trinn/okonomi/
# Nedbetalingsplan serielån; 5 år; 200000kr; 5.5% rente

lånebeløp = 200000
terminer = 5 * 12
rentesats = (5.5 / 100) / 12
restlån = lånebeløp
avdrag = lånebeløp / terminer

print("Term\tRestlån\t\tAvdrag\tRente\tTerminbeløp")
for term in range(1, terminer + 1):
    rente = restlån * rentesats
    terminbeløp = avdrag + rente
    print(term, "\t  ", round(restlån), "\t", round(avdrag), "\t", round(rente), "\t", round(terminbeløp))
    restlån = restlån - avdrag` },
    ]},
    { emne: "Algebra", eksempler: [
        { navn: "Likning", kode:
`# Flere aktiviteter om likninge: https://digitabel.org/matematikk/8-trinn/likninger/
# Vi løser denne likningen: 5x-7 = 3x+11

for x in range(-100, 100):
    vs = 5*x - 7
    hs = 3*x + 11
    if vs == hs:
        print("x =", x, "   Venstre side:", vs, "   Høyre side:", hs)` },
        { navn: "Likningssett I", kode:
`# Flere aktiviteter om likningssett: https://digitabel.org/matematikk/10-trinn/likningssett/
# Vi løser et likningssett
# I: 2x + 3y = 35
# II: y = x - 5

for x in range(0, 100):
    for y in range(0, 100):
        if 2 * x + 3 * y == 35 and y == x - 5:
            print("x =", x)
            print("y =", y)` },
        { navn: "Figurtall", kode:
`# Flere aktiviteter om figurtall: https://digitabel.org/matematikk/8-trinn/tallmonster/
# Vi finner noen kjente figurtall

print("Fnr(n)\tKvadrattall\tRektangeltall\tTrekanttall")
for n in range(1, 11):
    kvadrattall = n * n
    rektangeltall = n * (n + 1)
    trekanttall = (n * (n + 1)) // 2
    print(n, "\t", kvadrattall, "\t\t", rektangeltall, "\t\t", trekanttall)` },
        { navn: "Likningssett II", kode:
`# https://digitabel.org/matematikk/10-trinn/likningssett/likningssett1-10-pyt/
# Vi løser likningssett med Ada Lovelace's metode
# ax + by = c
# dx + ey = f

a, b, c = 5, -3, 37 # 5x - 3y = 37
d, e, f = 2, 4, 20 # 2x + 4y = 20

x = (c*e - b*f)/(a*e - b*d)
y = (c*d - a*f)/(b*d - a*e)
print("x =", x, "\\ny =", y)` },
    ]},
    { emne: "Annet", eksempler: [
        { navn: "Spill 21", kode:
`# Vi spiller 21
from random import randint
 
print("Vi spiller 21, det er om å gjøre å ikke bli den som må si '21'.")
print("Du kan velge å telle 1 eller 2 tall videre. Vi starter på 0!")
print("Du begynner!")
 
tallet = 0
spiller_tur = True
 
while tallet < 21:
    print("---")
    if spiller_tur:
        valg = input("Vil du telle 1 eller 2 videre?")
        if valg == "1":
            print("Du teller:")
            print("->", tallet + 1)
            tallet = tallet + 1
        else:
            print("Du teller:")
            print("->", tallet + 1, tallet + 2)
            tallet = tallet + 2
        spiller_tur = False
    else:
        if tallet in [0, 3, 6, 9, 12, 15, 18]:
            valg = 2
        elif tallet in [1, 4, 7, 10, 13, 16, 19]:
            valg = 1
        else:
            valg = randint(1, 2)
        if valg == 1:
            print("Maskinen teller:")
            print("->", tallet + 1)
            tallet = tallet + 1
        else:
            print("Maskinen teller:")
            print("->", tallet + 1, tallet + 2)
            tallet = tallet + 2
        spiller_tur = True           

if spiller_tur:
    print("Du vant")
else:
    print("Du tapte")` },
        { navn: "Reaksjonstid", kode:
`# Vi lager en liten reaksjonstester med python
from time import sleep, time
from random import randint

print("Velkommen til min reaksjonstester!")
print("Trykk 'enter' for å starte testen...")
input()
print("Når jeg sier fra, så skal du trykke på 'enter' så fort du kan!")
pause = randint(3, 7)
sleep(pause)
start = time()
input("TRYKK 'ENTER' NÅ!!!")
stop = time()
tid = round((stop - start) * 100)
print("Din reaksjonstid:", tid, "hundredels sekund")` },
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
        { navn: "Passord", kode:
`# Vi ser hvordan man kan lage programmer med meny og passord

from os import system

passord = "CoDe"
menyvalg = 0
saldo = 1337

bruker_passord = input("Skriv inn passord:")

if bruker_passord == passord:
    while menyvalg != 4:
        system("clear")
        print("Velkommen til min meny. Hva vil du gjøre?")
        print("1. Endre passord")
        print("2. Vis saldo")
        print("3. Vis passord")
        print("4. Avslutt")
        menyvalg = int(input("Velg ->"))

        if menyvalg == 1:
            bruker_passord = input("Skriv inn nåværende passord!")
            if bruker_passord == passord:
                ny_bruker_passord = input("Nytt passord: ")
                ny_bruker_passord_2 = input("Gjenta nytt passord: ")
                if ny_bruker_passord == ny_bruker_passord_2:
                    passord = ny_bruker_passord
                    print("Nytt passord er satt!")
                else:
                    print("Du har skrevet forskjellige passord.")
                    print("Passord er uendret.")
                input("Trykk 'Enter' for å fortsette")
            else:
                print("Feil passord. Du logges av...")
                menyvalg = 4
        if menyvalg == 2:
            print("Saldo: ", saldo)
            input("Trykk 'Enter' for å fortsette")
        if menyvalg == 3:
            print("Passord:", passord)
            input("Trykk 'Enter' for å fortsette")` },
    ]},
];
