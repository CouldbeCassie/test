const API_URL = 'https://www.tygym.se/EE24a_tygym/api/backend';

document.addEventListener('DOMContentLoaded', () => {
    setupFormToggle();
    setupFormHandlers();
});

function setupFormToggle() {
    document.getElementById('show-signup').addEventListener('click', (e) => {
        e.preventDefault();
        toggleForms('register');
    });

    document.getElementById('show-login').addEventListener('click', (e) => {
        e.preventDefault();
        toggleForms('login');
    });
}

function toggleForms(formType) {
    if (formType === 'register') {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('register-form').style.display = 'block';
    } else {
        document.getElementById('register-form').style.display = 'none';
        document.getElementById('login-form').style.display = 'block';
    }
}

function setupFormHandlers() {
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
}

async function handleRegister(e) {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    if (!validateInputs(username, password)) return;

    console.log('Sending registration request:', { username, password });

    try {
        const response = await fetch(`${API_URL}/users/register`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'X-Custom-Header': 'custom-value' // Add a custom header to trigger preflight
            },
            body: JSON.stringify({ username, password })
        });

        console.log('Registration response status:', response.status);
        console.log('Registration response headers:', response.headers);

        handleResponse(response, 'User registered!', 'User registration failed!');
    } catch (error) {
        handleError(error, 'Error registering user');
    }
}

async function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    console.log('Sending login request:', { username, password });

    try {
        const response = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'X-Custom-Header': 'custom-value' // Add a custom header to trigger preflight
            },
            body: JSON.stringify({ username, password })
        });

        console.log('Login response status:', response.status);
        console.log('Login response headers:', response.headers);

        handleResponse(response, 'Login successful!', 'Login failed!', true);
    } catch (error) {
        handleError(error, 'Error logging in');
    }
}

function validateInputs(username, password) {
    if (username.length < 3 || username.length > 15) {
        alert('Username must be between 3 and 15 characters.');
        return false;
    }
    if (password.length < 6 || password.length > 20) {
        alert('Password must be between 6 and 20 characters.');
        return false;
    }
    return true;
}

function handleResponse(response, successMessage, errorMessage, isLogin = false) {
    response.json().then(data => {
        if (response.ok) {
            alert(successMessage);
            setUser(data);
            if (isLogin) window.location.href = 'feed.html';
        } else {
            alert(errorMessage);
        }
    });
}

function handleError(error, errorMessage) {
    console.error(errorMessage, error);
    alert(errorMessage);
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
