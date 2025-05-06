<?php
require 'db.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    $stmt = $pdo->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");

    try {
        $stmt->execute([$username, $email, $password]);
        echo "Registration successful. <a href='login.php'>Login</a>";
    } catch (PDOException $e) {
        echo "Error: " . htmlspecialchars($e->getMessage());
    }
}
?>

<h2>Register</h2>
<form method="POST">
    Username: <input name="username" required><br><br>
    Email: <input type="email" name="email" required><br><br>
    Password: <input type="password" name="password" required><br><br>
    <button type="submit">Register</button>
</form>
