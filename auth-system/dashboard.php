<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit;
}

echo "<h2>Welcome, " . htmlspecialchars($_SESSION['username']) . "!</h2>";
echo "<a href='logout.php'>Logout</a>";
