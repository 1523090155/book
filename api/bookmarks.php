<?php
session_start();
require __DIR__.'/../includes/db.php';

header('Content-Type: application/json');

if (empty($_SESSION['user_id'])) {
    http_response_code(401);
    die(json_encode(['error' => '未授权访问']));
}

try {
    $stmt = $pdo->prepare("
        SELECT id, title, url 
        FROM bookmarks 
        WHERE user_id = ?
        ORDER BY created_at DESC
    ");
    $stmt->execute([$_SESSION['user_id']]);
    $bookmarks = $stmt->fetchAll();
    
    echo json_encode($bookmarks);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => '无法获取书签']);
}
