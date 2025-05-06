# PHP User Authentication System (SQLite)
Written by Caleb Kryza
This is a simple user authentication system built with PHP and SQLite. It allows users to register, log in, access a protected dashboard, and log out. No MySQL or external database setup is required—SQLite is used for easy setup and portability.

## Features
- User registration with password hashing
- Login with session-based authentication
- Protected dashboard page (accessible only when logged in)
- Logout functionality
- SQLite database (no MySQL needed)
- Lightweight and GitHub-friendly (no external dependencies)

## Requirements
- PHP 7.0 or higher (including PDO and SQLite extensions)
- A modern web browser
- Local server (e.g., PHP's built-in server)

## Installation
1. Clone or download this repository.
2. Make sure PHP is installed on your system. You can verify this with:

   ```bash
   php -v

## How to Use
### Step 1. **Initialize the Database**

Before using the authentication system, you need to create the SQLite database. This is done by running the `init_db.php` script.
- Open your browser and visit:

http://localhost:8000/init_db.php

- This will create the `auth.db` SQLite database file in your project directory. After the database is created, you can delete or keep the `init_db.php` file as needed.

### Step 2. **Register a New User**
To create a new user account:
- Visit the registration page:

http://localhost:8000/register.php

- Fill in the **Username** and **Password** fields, then click "Register."
- The system will check for any errors (like a short password) and then store the user in the SQLite database.

### Step 3. **Log In**
After registering, you can log in using the credentials you just created.
- Visit the login page:

http://localhost:8000/login.php


- Enter your **Username** and **Password** (the ones you registered with) and click "Login."
- If the credentials are correct, you’ll be redirected to the dashboard page.

### Step 4. **Access the Dashboard**
Once logged in, you will be able to access the protected dashboard.
- Visit the dashboard page:

http://localhost:8000/dashboard.php

- The dashboard page is only accessible if you are logged in. If you aren’t logged in and try to access this page, you’ll be redirected back to the login page.

### Step 5. **Log Out**
When you're finished using the app, you can log out.
- To log out, click the **"Logout"** link on the dashboard page, or visit:

http://localhost:8000/logout.php

- Logging out will end the session, and you will be redirected back to the login page.

### Troubleshooting
- If you encounter any issues with database connection or login, make sure the `pdo_sqlite` and `sqlite3` extensions are enabled in your PHP configuration (`php.ini`).
- If you’re not sure if SQLite is enabled, you can run `php -m` to check for `pdo_sqlite` and `sqlite3` in the list of PHP modules.