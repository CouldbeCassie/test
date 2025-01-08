// Toggle forms
document.getElementById('show-signup').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('register-form').style.display = 'block';
});

document.getElementById('show-login').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('register-form').style.display = 'none';
  document.getElementById('login-form').style.display = 'block';
});

// Handle register
document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('register-username').value;
  const password = document.getElementById('register-password').value;

  const response = await fetch('/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (response.ok) {
    alert('User registered!');
    window.location.href = 'feed.html';  // Redirect to the feed page
  } else {
    alert('Registration failed!');
  }
});

// Handle login
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  const response = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem('token', data.token);
    alert('Login successful!');
    window.location.href = 'feed.html';  // Redirect to the feed page
  } else {
    alert('Login failed!');
  }
});

// Toggle dark mode/light mode
document.addEventListener("DOMContentLoaded", () => {
  const themeButton = document.getElementById('theme-button');
  const themeIcon = document.getElementById('theme-icon');

  themeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    // Toggle data-theme attribute on body
    if (document.body.classList.contains('dark-mode')) {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeIcon.classList.replace('fa-sun', 'fa-moon');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
  });
});
