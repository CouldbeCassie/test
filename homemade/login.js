function switchForm(form) {
    document.getElementById('login-form').classList.toggle('hidden', form !== 'login');
    document.getElementById('register-form').classList.toggle('hidden', form !== 'register');
}

// Cookie Popup
window.addEventListener('load', () => {
    const cookiePopup = document.getElementById('cookie-popup');
    const acceptCookies = document.getElementById('accept-cookies');
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');

    if (!cookiesAccepted) {
        cookiePopup.style.display = 'block';
    }

    acceptCookies.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', true);
        cookiePopup.style.display = 'none';
    });

    // Check if user is already logged in
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (loggedInUser) {
        alert('You are already logged in!');
        window.location.href = 'dashboard.html'; // Redirect to the dashboard or desired page
    }
});

// Fake user database for demo purposes
const users = JSON.parse(localStorage.getItem('users') || '[]');

// Handle Sign Up
document.getElementById('register-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const usernameErrorElement = document.getElementById('register-username-error');
    const passwordErrorElement = document.getElementById('register-password-error');

    usernameErrorElement.textContent = ''; // Clear previous error messages
    passwordErrorElement.textContent = ''; // Clear previous error messages

    if (username.length < 4) {
        usernameErrorElement.textContent = 'Username must be at least 4 characters long.';
    } else if (password.length < 8) {
        passwordErrorElement.textContent = 'Password must be at least 8 characters long.';
    } else {
        // Save user credentials
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        
        // Automatically sign in after account creation
        sessionStorage.setItem('loggedInUser', username);
        alert('Account created successfully! Logging in...');
        window.location.href = 'dashboard.html'; // Redirect to dashboard or desired page after sign-up
    }
});

// Handle Sign In
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const usernameErrorElement = document.getElementById('login-username-error');
    const passwordErrorElement = document.getElementById('login-password-error');

    usernameErrorElement.textContent = ''; // Clear previous error messages
    passwordErrorElement.textContent = ''; // Clear previous error messages

    // Check user credentials
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        // Set session and redirect after successful login
        sessionStorage.setItem('loggedInUser', username);
        alert('Login successful!');
        window.location.href = 'dashboard.html'; // Redirect to the dashboard or desired page
    } else {
        usernameErrorElement.textContent = 'Invalid username or password!';
        passwordErrorElement.textContent = 'Invalid username or password!';
    }
});
