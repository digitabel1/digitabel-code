// EKSEMPLER: 5. trinn – maks 5 emner, maks 5 eksempler per emne
// Nytt eksempel legges inn i eksempler-lista til riktig emne, f.eks.:
//     { navn: "Gangetabellen", kode:
// `for i in range(1, 11):
//     print(i, "* 7 =", i * 7)` },
EKSEMPLER["5. trinn"] = [
    { emne: "4 regnearter", eksempler: [
        { navn: "Begreper", kode:
`# Vi finner sum, differanse, kvotient og produkt
tall_1 = 40
tall_2 = 10

summ = tall_1 + tall_2 # skriver variabelnavn med 2 m'er for ikke å blande med funksjonen sum
differanse = tall_1 - tall_2
produkt = tall_1 * tall_2
kvotient = tall_1 / tall_2

print(summ)
print(differanse)
print(produkt)
print(kvotient)` },
        { navn: "Sum av to tall", kode:
`# Summen av 2 tall med en printlinje som kommuniserer

tall_1 = 20
tall_2 = 22

summen = tall_1 + tall_2
print(tall_1, "+", tall_2, "=", summen)` },
        { navn: "Egen funksjon", kode:
`# Vi lager en egen gange-funksjon

def multiplikasjon(faktor_1, faktor_2):
    produkt = faktor_1 * faktor_2
    print(faktor_1, "*", faktor_2, "=", produkt)

multiplikasjon(2, 9)
multiplikasjon(7, 6)` },
    ]},
    { emne: "Brøk", eksempler: [
        { navn: "Brøk -> Prosent", kode:
`# Vi utforsker brøk, desimaltall og prosent

teller = 1
nevner = 4

desimalverdi = teller / nevner
prosent = desimalverdi * 100

print("Brøk:", teller, "/", nevner)
print("Desimaltall:", desimalverdi)
print("Prosent:", prosent, "%")` },
        { navn: "Brøk med input", kode:
`# Vi utforsker brøk, desimaltall og prosent

teller = int(input("Skriv inn en teller -> "))
nevner = int(input("Skriv inn en nevner -> "))

desimalverdi = teller / nevner
prosent = desimalverdi * 100

print("Brøk:", teller, "/", nevner)
print("Desimaltall:", desimalverdi)
print("Prosent:", prosent, "%")` },
        { navn: "Desimal -> brøk", kode:
`# Programmet viser en tilfeldig desimalverdi. Du skal finne en brøk som har samme verdi.

from random import randint

verdi = randint(1, 10) / 10

print("Skriv inn en brøk som har verdi:", verdi)

teller = int(input("teller: "))
nevner = int(input("nevner: "))

verdi_svar = teller / nevner

if verdi_svar == verdi:
    print("Riktig!", teller, "/", nevner, "=", verdi)
else:
    print("Feil!")` },
       
    ]},
    { emne: "Sannsynlighet", eksempler: [
        { navn: "Trekke kuler", kode:
`# Vi trekker fargede kuler fra en pose
from random import choice

pose = ["rød","rød","grønn","blå"]
trekk = choice(pose)

print(trekk)` },
        { navn: "Slå terning", kode:
`# Vi slår en terning 600 ganger og ser hvor mange 6-ere vi får
from random import randint

teller = 0
for i in range(600):
    terning = randint(1, 6)
    if terning == 6:
        teller = teller + 1
        
print("Antall 6-ere:", teller)` },
        { navn: "Plassholder 3", kode:
`# Her kommer det kode etterhvert` },
    ]},
    { emne: "Likninger", eksempler: [
        { navn: "Likning I", kode:
`# Vi utforsker likningen 2x + 3 = 11

x = 1 # Prøv ulike x-verdier

vs = 2 * x + 3
hs = 11

print(vs, hs)` },
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
