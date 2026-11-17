// EKSEMPLER: 10. trinn – maks 5 emner, maks 5 eksempler per emne
// Nytt eksempel legges inn i eksempler-lista til riktig emne, f.eks.:
//     { navn: "Gangetabellen", kode:
// `for i in range(1, 11):
//     print(i, "* 7 =", i * 7)` },
EKSEMPLER["10. trinn"] = [
    { emne: "Algebra", eksempler: [
        { navn: "Enkel likning", kode:
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
        { navn: "Likningssett II", kode:
`# https://digitabel.org/matematikk/10-trinn/likningssett/likningssett1-10-pyt/
# Vi løser likningssett med Ada Lovelace's metode
# ax + by = c
# dx + ey = f

a, b, c = 5, -3, 37 # 5x - 3y = 37
d, e, f = 2, 4, 20 # 2x + 4y = 20

x = (c*e - b*f)/(a*e - b*d)
y = (c*d - a*f)/(b*d - a*e)
print("x =", x, "\ny =", y)` },
        { navn: "Kvadratsetning I", kode:
`# Første kvadratsetning
a = 5
b = 3

print("(a + b)² =", (a + b) ** 2)
print("a² + 2ab + b² =", a**2 + 2*a*b + b**2)
print("a² + b² =", a**2 + b**2)` },
        { navn: "Kvadratsetning II", kode:
`tall = int(input("Skriv et tall nær et tiertall (f.eks. 41, 59, 99): "))

rundt = round(tall, -1)     # nærmeste tiertall
d = tall - rundt

if d >= 0:
    print(f"{tall}² = ({rundt} + {d})²")
    print(f"     = {rundt}² + 2·{rundt}·{d} + {d}²")
    print(f"     = {rundt**2} + {2*rundt*d} + {d**2}")
else:
    print(f"{tall}² = ({rundt} - {-d})²")
    print(f"     = {rundt}² - 2·{rundt}·{-d} + {-d}²")
    print(f"     = {rundt**2} - {-2*rundt*d} + {d**2}")

print(f"     = {tall**2}")` },
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
        { navn: "2.gradsfunksjon", kode:
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
        { navn: "Eksponentialfunksjon", kode:
`from matplotlib import pyplot

# Du setter 10 000 kr i banken med 4 % rente per år
startbelop = 10000
rente = 4                          # prosent per år
vekstfaktor = 1 + rente / 100      # 1.04

aar = []
belop_rente = []      # eksponentiell vekst: renter på rentene
belop_fast = []       # lineær vekst: samme beløp hvert år

for x in range(0, 31):
    aar.append(x)
    belop_rente.append(startbelop * vekstfaktor ** x)

# Når har beløpet doblet seg?
for x in aar:
    if belop_rente[x] >= 2 * startbelop:
        doblingsaar = x
        break

pyplot.figure(figsize=(10, 6))
pyplot.plot(aar, belop_rente, color="green", linewidth=2,
         label=f"Renters rente: f(x) = {startbelop} · {vekstfaktor}^x")

pyplot.annotate(f"Doblet etter {doblingsaar} år",
             xy=(doblingsaar, belop_rente[doblingsaar]),
             xytext=(doblingsaar - 12, belop_rente[doblingsaar] + 5000),
             arrowprops=dict(arrowstyle="->"))

pyplot.title(f"{startbelop} kr i banken med {rente} % rente")
pyplot.xlabel("Antall år")
pyplot.ylabel("Beløp (kr)")
pyplot.grid(True)

print(f"Etter 10 år: {belop_rente[10]:.0f} kr")
print(f"Etter 30 år: {belop_rente[30]:.0f} kr")` },
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
        { navn: "Finne prosent", kode:
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

print("Term	Restlån		Avdrag	Rente	Terminbeløp")
for term in range(1, terminer + 1):
    rente = restlån * rentesats
    terminbeløp = avdrag + rente
    print(term, "	  ", round(restlån), "	", round(avdrag), "	", round(rente), "	", round(terminbeløp))
    restlån = restlån - avdrag` },
        { navn: "Annuitetslån", kode:
`# En funksjon som regner ut terminbeløp til et annuitetslån
def tba(rente, terminer, laan):
    return round(laan * ((rente * (1 + rente) ** terminer) / ((1 + rente) ** terminer - 1)), 2)

#----------------------------------
# Lånebetingelser
LAAN = 2950000
RENTE = 5.7/100
TERMINER = 360
#----------------------------------

# Annuitetslån
#----------------------------------
terminbelop = tba(RENTE/12, TERMINER, LAAN)
total_innbetaling = round(terminbelop * TERMINER, 2)

print("Annuitetslån - Lånebeløp:", LAAN, "Rente:", RENTE * 100, "%  Antall terminer:", TERMINER)
print("-" * 70)
print("Fast innbetaling hver termin: kr", terminbelop)
print("Innbetaling totalt: kr", total_innbetaling)

# Serielån
#----------------------------------
avdrag = LAAN / TERMINER
restlaan = LAAN
totalt = 0
for i in range(TERMINER):
    rente = restlaan * RENTE / 12
    totalt += rente + avdrag
    restlaan -= avdrag
totalt = round(totalt, 2)
forste_term = round(avdrag + LAAN * RENTE / 12, 2)

print("\n\nSerielån - Lånebeløp:", LAAN, "Rente:", RENTE * 100, "%  Antall terminer:", TERMINER)
print("-" * 70)
print("Terminbeløp første termin: kr", forste_term)
print("Innbetaling totalt: kr", totalt)` },
    ]},
    { emne: "Matematiske modeller", eksempler: [
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
];
