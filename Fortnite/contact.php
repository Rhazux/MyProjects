<?php
header('Content-Type: application/json; charset=utf-8');

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

$name = trim($data['name'] ?? '');
$email = trim($data['email'] ?? '');
$message = trim($data['message'] ?? '');

if ($name === '' || $email === '' || $message === '') {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Vyplň prosím všechna pole formuláře.'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// jednoduché uložení do log souboru
$logLine = sprintf(
    "[%s] %s <%s>: %s%s",
    date('Y-m-d H:i:s'),
    $name,
    $email,
    str_replace(["\r", "\n"], ' ', $message),
    PHP_EOL
);

$logPath = __DIR__ . '/../data/contact-messages.log';
file_put_contents($logPath, $logLine, FILE_APPEND);

echo json_encode([
    'success' => true,
    'message' => 'Díky za zprávu! Tvoje feedback byl uložen.'
], JSON_UNESCAPED_UNICODE);