# Návrh projektu: Fortnite Tactics Hub

**Autor**: Daniel
**Datum**: 16. 1. 2026
**Téma**: One-page webová prezentace "Fortnite Tactics Hub"

---

## 1. Stručný popis tématu
Projekt "Fortnite Tactics Hub" je interaktivní webová stránka zaměřená na hráče hry Fortnite, kteří se chtějí zlepšit ve hře. Web poskytuje přehledné informace o aktuální "meta" hře (nejlepší zbraně, loadouty), taktické tipy pro různé herní módy a možnost filtrovat databázi zbraní. Cílem je nabídnout veškeré důležité informace na jedné stránce bez nutnosti proklikávat se složitým menu.

## 2. Cílová skupina
*   Hráči Fortnite (začátečníci i pokročilí).
*   Lidé hledající rychlé tipy pro zlepšení svého "win rate".
*   Fanoušci hry, kteří chtějí mít přehled o statistikách zbraní.

## 3. Plánované obsahové sekce
1.  **Úvod (Hero sekce)**: Poutavý nadpis, stručný popis účelu webu a statistiky (počet zbraní, tipů).
2.  **Tipy**: Sekce s kartami obsahujícími klíčové rady pro zlepšení (pozicování, rotace).
3.  **Zbraně (AJAX + JSON)**: Interaktivní mřížka se zbraněmi, kterou lze filtrovat podle typu a rarity. Data se budou načítat ze serveru.
4.  **Loadouty**: Doporučené kombinace vybavení pro různé herní styly (Zero Build vs. Build).
5.  **Taktiky**: Specifické rady pro týmovou hru nebo sólo módy.
6.  **Kontakt (Formulář)**: Možnost odeslat zpětnou vazbu nebo tip, data se zpracují na backendu.

## 4. Návrh designu
*   **Styl**: Moderní, "gaming" estetika s tmavým režimem (Dark Mode).
*   **Barvy**: Tmavě modrá/šedá (Slate-950) v kombinaci s neonovými akcenty (Cyan, Fuchsia) pro navození herní atmosféry.
*   **Layout**:
    *   One-page struktura s fixní navigací.
    *   Použití efektu "Glassmorphism" (průhledné panely s rozostřením) pro moderní vzhled.
    *   Responzivní grid pro zobrazení karet (mobil 1 sloupec, desktop 3 sloupce).

## 5. Použité technologie
*   **Frontend**: HTML5, CSS3 (Tailwind CSS pro layout, custom CSS pro efekty), JavaScript (ES6).
*   **Backend**: Node.js (simulace zpracování dat).
*   **Data**: JSON soubor (`weapons.json`) pro seznam zbraní.
*   **Komunikace**: AJAX (Fetch API) pro načítání dat a odesílání formulářů bez refreshování stránky.

## 6. Očekávaný přínos
Vytvoření funkčního, vizuálně atraktivního webu, který prokazuje schopnost propojit frontend (moderní UI, interaktivita) s backendem (práce s daty, API) v rámci jednostránkové aplikace.
