const API_URL = 'https://cassaint.com/api';

document.addEventListener('DOMContentLoaded', () => {
    // Toggle forms
    document.getElementById('show-signup').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('register-form').style.display = 'block';
    });

    document.getElementById('show-login').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('register-form').style.display = 'none';
        document.getElementById('login-form').style.display = 'block';
    });

    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

async function handleRegister(e) {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    // Validation checks
    if (username.length < 3 || username.length > 15) {
        alert('Username must be between 3 and 15 characters.');
        return;
    }
    if (password.length < 6 || password.length > 20) {
        alert('Password must be between 6 and 20 characters.');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/users.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const newUser = await response.json();
            alert('User registered!');
            setUser(newUser); // Store the user
            window.location.href = 'feed.html';  // Redirect to the feed page
        } else {
            alert('User registration failed!');
        }
    } catch (error) {
        console.error('Error registering user:', error);
        alert('User registration failed!');
    }
}

async function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch(`${API_URL}/users.php`, {
            method: 'GET'
        });

        if (response.ok) {
            const users = await response.json();
            const user = users.find(u => u.username === username && u.password === password);

            if (user) {
                alert('Login successful!');
                setUser(user); // Store the user
                window.location.href = 'feed.html';  // Redirect to the feed page
            } else {
                alert('Invalid username or password!');
            }
        } else {
            alert('Login failed!');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        alert('Login failed!');
    }
}

const logoutButton = document.getElementById('logout-button');
if (logoutButton) {
    logoutButton.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('user');
        window.location.href = 'login.html';  // Redirect to the login page
    });
}

function setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

function getUser() {
    return JSON.parse(localStorage.getItem('user'));
}
