const http = require('http');
const fs = require('fs');
const path = require('path');

/**
 * KONFIGURACE SERVERU
 * Nastavíme port (3000) a cesty k základním složkám.
 */
const PORT = 3000;
const DATA_DIR = path.join(__dirname, 'data');
const ROOT_DIR = __dirname;

/**
 * MIME TYPY
 * Aby prohlížeč věděl, jaký typ souboru mu posíláme.
 */
const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
};

/**
 * HLAVNÍ SERVEROVÁ FUNKCE
 * Zpracovává každý příchozí požadavek (request).
 */
const server = http.createServer((req, res) => {
    console.log(`[REQUEST] ${req.method} ${req.url}`);

    // --- API ENDPOINTS (Simulace backendu) ---

    // 1. GET /api/weapons.php
    // Načte JSON soubor se zbraněmi a pošle ho klientovi.
    if (req.url === '/api/weapons.php' && req.method === 'GET') {
        const weaponsPath = path.join(DATA_DIR, 'weapons.json');

        fs.readFile(weaponsPath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading weapons.json:', err);
                // V případě chyby vracíme status 500 (Internal Server Error)
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Failed to load weapons data' }));
                return;
            }
            // Úspěch - vracíme data s hlavičkou JSON
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(data);
        });
        return;
    }

    // 2. POST /api/contact.php
    // Přijme data z formuláře a uloží je do log souboru.
    if (req.url === '/api/contact.php' && req.method === 'POST') {
        let body = '';

        // Data chodí po částech (chunks), musíme je poskládat
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                const { name, email, message } = data;

                // Jednoduchá validace na serveru
                if (!name || !email || !message) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: false, message: 'Vyplň prosím všechna pole.' }));
                    return;
                }

                // Vytvoříme řádek do logu
                const logLine = `[${new Date().toISOString()}] ${name} <${email}>: ${message.replace(/\n/g, ' ')}\n`;
                const logPath = path.join(DATA_DIR, 'contact-messages.log');

                // Uložení (append) do souboru
                fs.appendFile(logPath, logLine, err => {
                    if (err) {
                        console.error('Error writing to log:', err);
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ success: false, message: 'Chyba serveru při ukládání.' }));
                        return;
                    }
                    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                    res.end(JSON.stringify({ success: true, message: 'Zpráva úspěšně odeslána!' }));
                });

            } catch (e) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, message: 'Neplatná JSON data.' }));
            }
        });
        return;
    }

    // --- STATIC FILES SERVER (Obsluha běžných souborů) ---

    // Normalizace URL (odstranění query stringu)
    let safeUrl = req.url.split('?')[0];
    if (safeUrl === '/') safeUrl = '/index.html';

    // Bezpečnost: Path traversal protection
    const filePath = path.join(ROOT_DIR, safeUrl);

    // Kontrola, zda soubor existuje a je uvnitř povolené složky
    if (!filePath.startsWith(ROOT_DIR)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Čtení souboru z disku
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // 404 Not Found
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>');
            } else {
                // Jiná chyba serveru
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // Úspěšné odeslání souboru
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });

});

server.listen(PORT, () => {
    console.log(`\n🚀 Server běží na http://localhost:${PORT}`);
    console.log(`   - Web: http://localhost:${PORT}/`);
    console.log(`   - API Zbraně: http://localhost:${PORT}/api/weapons.php`);
    console.log(`   - API Kontakt: http://localhost:${PORT}/api/contact.php (POST)`);
    console.log(`\n(Pro ukončení stiskni Ctrl + C)`);
});
