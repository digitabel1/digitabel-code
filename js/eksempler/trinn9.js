// EKSEMPLER: 9. trinn – maks 5 emner, maks 5 eksempler per emne
// Nytt eksempel legges inn i eksempler-lista til riktig emne, f.eks.:
//     { navn: "Gangetabellen", kode:
// `for i in range(1, 11):
//     print(i, "* 7 =", i * 7)` },
EKSEMPLER["9. trinn"] = [
    { emne: "Statistikk", eksempler: [
        { navn: "Stolpediagram", kode:
`from matplotlib import pyplot

# Antall passasjerer på Oslo lufthavn Gardermoen (millioner)
x_verdier = ["2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"]
y_verdier = [18.1, 19.1, 21.1, 22.1, 23.0, 24.3, 24.7, 25.8, 27.5, 28.5, 28.6, 9.0, 9.4, 22.5, 25.1, 26.4, 27.1]

pyplot.bar(x_verdier, y_verdier, color="green")
pyplot.title("Antall flypassasjerer på Oslo lufthavn Gardermoen")
pyplot.xlabel("År")
pyplot.ylabel("Millioner passasjerer")
pyplot.xticks(x_verdier, rotation=60)
pyplot.grid()` },
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
print("Variasjonsbredde:", max(datasett) - min(datasett))` },
    ]},

    { emne: "Plangeometri", eksempler: [
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
        { navn: "Vinkelsum", kode:
`# Flere aktiviteter innen plangeometri; se https://digitabel.org/matematikk/9-trinn/plangeometri/
# Beregne vinkelsum i n-kanter

n = 5 # Antall sider i n-kanten

vinkelsum = (n - 2) * 180
vinkel = vinkelsum / n

print("Vinkelsum:", vinkelsum)
print("Dersom n-kanten er regulær, så er alle vinklene", vinkel, "grader.")` },
        { navn: "Sirkel", kode:
`from math import pi
d = float(input("Skriv inn diameteren (cm): "))
r = d / 2

omkrets = 2 * pi * r
areal = pi * r ** 2

omkrets = round(omkrets, 2)
areal = round(areal, 2)

print("Radius:", r, "cm")
print("Omkrets:", omkrets, "cm")
print("Areal:", areal, "cm²")` },
        { navn: "Sirkelsektor", kode:
`# Vi beregner areal og omkrets av en sirkelsektor
from math import pi

radius = 10 # i cm
grader = 60

omkrets = 2 * pi * radius * grader / 360 + 2 * radius
areal = pi * radius ** 2 * grader / 360

omkrets = round(omkrets, 2)
areal = round(areal, 2)

print("Radius:", radius, "cm")
print("Antall grader i vinkel:", grader)
print("Omkrets av sirkelsektor:", omkrets, "cm")
print("Areal av sirkelsektor:", areal, "cm²")` },
    ]},

    { emne: "Romgeometri", eksempler: [
        { navn: "Volum", kode:
`# Flere aktiviteter inne romgeometri: https://digitabel.org/matematikk/9-trinn/romgeometri/
# Volum av sylider

from math import pi

radius = 5
høyde = 11

volum = pi * radius ** 2 * høyde
volum = round(volum, 2)

print("Volum av sylinder:", volum)` },
        { navn: "Overflateareal", kode:
`# Overflateareal av et rektangulært prisme
# Alle mål i cm
lengde = 5
bredde = 3
hoyde = 2

bunn_og_topp = 2 * lengde * bredde
forside_og_bakside = 2 * lengde * hoyde
sidene = 2 * bredde * hoyde

overflate = bunn_og_topp + forside_og_bakside + sidene

print("Bunn og topp:", bunn_og_topp, "cm²")
print("Forside og bakside:", forside_og_bakside, "cm²")
print("Sidene:", sidene, "cm²")
print("Overflateareal:", overflate, "cm²")` },
        { navn: "Volum av pyramide", kode:
`valg = input("Grunnflate? (k = kvadrat, r = rektangel, t = trekant): ")

if valg == "k":
    s = float(input("Sidekant (cm): "))
    grunnflate = s * s
elif valg == "r":
    l = float(input("Lengde (cm): "))
    b = float(input("Bredde (cm): "))
    grunnflate = l * b
elif valg == "t":
    g = float(input("Grunnlinje i trekanten (cm): "))
    th = float(input("Høyden i trekanten (cm): "))
    grunnflate = g * th / 2

hoyde = float(input("Pyramidens høyde (cm): "))
volum = grunnflate * hoyde / 3

print(f"Volumet er {volum:.1f} cm³")` },
        { navn: "Arkimedes", kode:
`# Arkimedes oppdagelse
from math import pi

r = 10
h = 2 * r

kule = 4 / 3 * pi * r ** 3
sylinder = pi * r ** 2 * h
kjegle = pi * r ** 2 * h / 3

print("Kjegle:   ", round(kjegle, 1))
print("Kule:     ", round(kule, 1))
print("Sylinder: ", round(sylinder, 1))
print("Kule / sylinder: ", round(kule / sylinder, 2))
print("Kjegle : kule : sylinder = 1 :", kule / kjegle, ":", sylinder / kjegle)
` },
        { navn: "Massetetthet", kode:
`materialer = {
    "kork": 0.24,
    "furu": 0.5,
    "is": 0.92,
    "vann": 1.0,
    "glass": 2.5,
    "aluminium": 2.7,
    "jern": 7.87,
    "kobber": 8.96,
    "sølv": 10.5,
    "bly": 11.3,
    "gull": 19.3,
}

masse = float(input("Masse (g): "))
volum = float(input("Volum (cm³): "))
tetthet = masse / volum
print(f"Massetetthet: {tetthet:.2f} g/cm³")

beste = ""
minste_avvik = 1000
for navn, rho in materialer.items():
    avvik = abs(rho - tetthet)
    if avvik < minste_avvik:
        minste_avvik = avvik
        beste = navn

print("Stoffet kan være:", beste)` },
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
        { navn: "Lotto", kode:
`from random import sample

min_rekke = [3, 8, 12, 19, 23, 28, 31]

tall = sample(range(1, 35), 10)
vinnertall = sorted(tall[:7])

riktige = 0
for t in min_rekke:
    if t in vinnertall:
        riktige = riktige + 1


print("Min rekke:   ", min_rekke)
print("Vinnertall:  ", vinnertall)
print("Du fikk", riktige, "rette.")` },
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
