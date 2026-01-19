# Fortnite Tactics Hub

Jednostránková webová prezentace (One-Page Web) vytvořená jako školní projekt. Web slouží jako taktický průvodce pro hráče hry Fortnite, poskytuje informace o zbraních, loadoutech a herních taktikách.

## 🚀 Spuštění projektu

Projekt využívá **Node.js** jako backend server.

1.  Ujistěte se, že máte nainstalovaný [Node.js](https://nodejs.org/).
2.  Otevřete terminál v kořenové složce projektu (`Fortnite`).
3.  Spusťte server příkazem:
    ```bash
    node server.js
    ```
4.  Otevřete prohlížeč a jděte na adresu:
    [http://localhost:3000](http://localhost:3000)

## 🛠 Použité technologie (Tech Stack)

*   **Frontend**:
    *   **HTML5** (Sémantická struktura, One-Page layout)
    *   **CSS3** (Responzivní design, Glassmorphism efekty, animace) + **Tailwind CSS** (CDN)
    *   **JavaScript (ES6+)** (Interaktivita, DOM manipulace)
*   **Backend & Data**:
    *   **Node.js** (Vlastní HTTP server bez frameworků, simulace PHP endpointů)
    *   **AJAX (Fetch API)** (Asynchronní načítání dat a odesílání formulářů)
    *   **JSON** (`data/weapons.json` - databáze zbraní)
    *   **File System** (`data/contact-messages.log` - ukládání zpráv z formuláře)

## 📂 Struktura projektu

```text
Fortnite/
├── api/                  # (Virtuální) API endpointy (řešeno v server.js)
├── assets/
│   ├── images/           # Obrázky zbraní, pozadí, ikony
│   └── js/               # Klientské skripty (app.js)
├── data/
│   ├── contact-messages.log # Log odeslaných zpráv (generováno serverem)
│   └── weapons.json      # Datový soubor se seznamem zbraní
├── index.html            # Hlavní stránka projektu
├── server.js             # Backend server (Node.js)
├── style.css             # Vlastní CSS styly a animace
└── README.md             # Dokumentace projektu
```

## ✨ Funkcionality

1.  **Interaktivní filtrace zbraní**: Seznam zbraní se načítá dynamicky přes AJAX z `weapons.json`. Uživatel může filtrovat podle typu a rarity.
2.  **Modální okno**: Detail zbraně se otevírá v overlay okně s dalšími informacemi.
3.  **Kontaktní formulář**: Odeslání zprávy probíhá asynchronně (AJAX) na server, který ji uloží do souboru. Stránka se znovu nenačítá.
4.  **Responzivita**: Web je plně optimalizovaný pro mobily, tablety i desktopy.
5.  **Moderní UI**: Použití "Glassmorphism" designu, animovaného pozadí a hover efektů.

## 📝 Poznámky pro hodnocení

*   **AJAX**: Implementován ve funkci `loadWeapons()` (GET) a odeslání formuláře (POST).
*   **Backend**: `server.js` zpracovává requesty na `/api/weapons.php` a `/api/contact.php`.
*   **One-Page**: Plynulé scrollování mezi sekcemi pomocí navigačních odkazů.
