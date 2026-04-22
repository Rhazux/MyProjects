# Univerzální konzole pro řízení virtuálních světů

## Popis projektu
Projekt představuje obecnou konzolovou aplikaci pro řízení a monitorování objektů ve virtuálním světě. Aplikace umožňuje uživateli získávat informace o objektech, měnit jejich stav, pohybovat jimi, upravovat energii a vytvářet nebo mazat objekty.

Grafické rozhraní je pouze doplňkové. Hlavní část řešení tvoří textová konzole a logika světa.

---

## Cíl projektu
Cílem projektu je navrhnout systém, který je:

- univerzální
- rozšiřitelný
- oddělený od konkrétní implementace světa

Projekt ukazuje princip oddělení rozhraní od logiky aplikace.

---

## Architektura řešení

### WorldObject
Třída `WorldObject` reprezentuje jeden objekt ve virtuálním světě.

Obsahuje:
- název objektu
- klíč objektu
- typ objektu
- stav zapnuto/vypnuto
- energii
- souřadnice X a Y
- barvu objektu

Hlavní metody:
- `getStatus()`
- `setActive(value)`
- `setEnergy(value)`
- `setPosition(x, y)`
- `move(dx, dy)`
- `tick()`

---

### IWorld
Třída `IWorld` slouží jako obecné rozhraní světa.

Definuje základní operace:
- `listObjects()`
- `getStatus()`
- `getSummary()`
- `executeAction()`
- `reset()`

Díky tomu je možné v budoucnu vyměnit konkrétní implementaci světa bez zásadních změn v konzoli.

---

### VirtualWorld
Třída `VirtualWorld` dědí z `IWorld` a obsahuje konkrétní implementaci virtuálního světa.

Spravuje:
- kolekci objektů
- simulaci kroků
- vykonávání akcí nad objekty

Hlavní metody:
- `reset()`
- `listObjects()`
- `getObject(keyOrName)`
- `getStatus(keyOrName)`
- `getSummary()`
- `executeAction(action, payload)`

Podporované akce:
- `create`
- `delete`
- `setState`
- `move`
- `setPosition`
- `setEnergy`
- `tick`

---

### CommandProcessor
Třída `CommandProcessor` zpracovává textové příkazy z konzole.

Úloha:
- přijmout textový vstup
- rozpoznat příkaz
- zavolat odpovídající akci nad světem
- vrátit textovou odpověď systému

Třída nepracuje přímo s konkrétní implementací světa natvrdo, ale používá obecné API.

---

### GUI
Grafické rozhraní je pouze nadstavba nad stejnou logikou světa.

GUI umožňuje:
- výběr objektů
- přetahování objektů po mapě
- úpravu energie
- změnu pozice
- zapínání a vypínání objektů
- vytváření a mazání objektů

Všechny tyto akce používají stejné metody světa jako textová konzole.

---

## Popis jednotlivých částí stránky

### Horní panel
Obsahuje:
- název aplikace
- stručný popis
- statistiky světa:
  - počet objektů
  - počet aktivních objektů
  - průměrnou energii
  - počet kroků simulace

---

### Levý panel
Obsahuje:
- filtry zobrazení objektů
- seznam objektů
- rychlé akce:
  - přidání objektu
  - tick simulace
  - reset světa

---

### Střední část
Obsahuje:
- interaktivní mapu světa
- textovou konzoli
- přehled podporovaných příkazů

---

### Pravý panel
Obsahuje detail vybraného objektu:
- název
- typ
- stav
- energie
- pozice
- klíč

Dále umožňuje:
- přepnutí stavu
- změnu energie
- změnu souřadnic
- vypsání statusu
- doplnění energie
- smazání objektu

---

## Funkční požadavky splněné projektem

Projekt obsahuje:
- textovou konzoli
- příkazy zadávané uživatelem
- textovou odezvu systému
- více řízených objektů
- možnost získat stav objektu
- možnost měnit stav objektu

---

## Nefunkční vlastnosti
Projekt splňuje:
- přehlednou strukturu kódu
- oddělení logiky světa a rozhraní
- čitelnost kódu
- komentáře nad třídami a důležitými metodami
- základní dokumentaci řešení

---

## Podporované příkazy

### help
Vypíše seznam dostupných příkazů.

### list
Vypíše všechny objekty ve světě.

### status `<objekt>`
Vrátí detailní stav objektu.

### set `<objekt>` on/off
Zapne nebo vypne objekt.

### move `<objekt>` dx dy
Posune objekt o zadané souřadnice.

### energy `<objekt>` `<0-100>`
Nastaví energii objektu.

### create `<název>` `<typ>` `<energie>` `<x>` `<y>`
Vytvoří nový objekt.

### delete `<objekt>`
Smaže objekt ze světa.

### tick
Posune simulaci o jeden krok.

### reset
Vrátí svět do výchozího stavu.

---

## Ukázkový scénář použití

```text
list
status robot
set lamp on
move drone 2 -1
energy rover 100
create sensor scanner 80 1 2
delete lamp