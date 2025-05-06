<?php
$dsn = 'sqlite:' . __DIR__ . '/auth.db';

try {
    
    $pdo = new PDO($dsn);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    
    die("Database connection failed: " . $e->getMessage());
}