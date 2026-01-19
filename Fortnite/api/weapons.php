<?php
header('Content-Type: application/json; charset=utf-8');

$dataPath = __DIR__ . '/../data/weapons.json';

if (!file_exists($dataPath)) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Soubor s daty weapons.json nebyl nalezen.',
        'weapons' => []
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$json = file_get_contents($dataPath);
if ($json === false) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Nepodařilo se přečíst soubor s daty.',
        'weapons' => []
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

echo $json;