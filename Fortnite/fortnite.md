# Fortnite Tactics Hub

Jednostránkový (one-page) webový projekt, který slouží jako fanouškovský **taktický hub pro hráče Fortnite**.  
Stránka moderním způsobem prezentuje:

- základní tipy pro zlepšení gameplaye,
- doporučené zbraně a loadouty,
- taktiky pro různé herní módy,
- kontaktní formulář pro feedback.

Projekt je vytvořen jako **školní úloha** – demonstruje použití HTML5, Tailwind CSS, vlastního CSS, JavaScriptu, AJAXu, PHP a práce s JSON daty.

---

## Funkce ve zkratce

- One-page layout (Úvod, Tipy, Zbraně, Taktiky, Kontakt).
- Sticky navigace s hladkým skrolováním a zvýrazněním aktivní sekce.
- Responzivní design (desktop / tablet / mobil, hamburger menu).
- Sekce **Zbraně & loadouty** načítaná dynamicky přes AJAX z JSON souboru.
- Filtrace zbraní podle typu a rarity.
- Modální okno s detailem zbraně a tipem.
- **Kontaktní formulář** odesílaný přes AJAX na PHP backend.
- Logování zpráv z formuláře do souboru na serveru.

---

## Použité technologie

- **HTML5** – struktura one-page webu.
- **Tailwind CSS (CDN)** – utility class stylování, responzivní layout.
- **Vlastní CSS (`style.css`)** – skleněné panely, glow, animace pozadí, hamburger animace.
- **Vanilla JavaScript (`app.js`)**  
  - práce s DOM,
  - smooth scroll,
  - mobilní menu,
  - zvýraznění aktivní sekce,
  - načítání dat přes `fetch` (AJAX),
  - vykreslování karet zbraní,
  - modální okno,
  - odeslání kontaktního formuláře přes AJAX.
- **PHP (`weapons.php`, `contact.php`)** – jednoduchý backend:
  - `weapons.php` vrací JSON se zbraněmi,
  - `contact.php` přijímá data z formuláře a ukládá je do log souboru.
- **JSON (`weapons.json`)** – datový zdroj pro seznam zbraní.

