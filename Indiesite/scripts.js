document.addEventListener('DOMContentLoaded', () => {
  // Theme switching
  const themeButton = document.getElementById('theme-button');
  const themeIcon = document.getElementById('theme-icon');
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (currentTheme === 'dark') {
    themeIcon.classList.replace('fa-sun', 'fa-moon');
  } else {
    themeIcon.classList.replace('fa-moon', 'fa-sun');
  }

  themeButton.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    if (newTheme === 'dark') {
      themeIcon.classList.replace('fa-sun', 'fa-moon');
    } else {
      themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
  });

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

  // Handle registration
  document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[username]) {
      alert('Username already exists!');
    } else {
      users[username] = { password };
      localStorage.setItem('users', JSON.stringify(users));
      alert('User registered!');
      localStorage.setItem('username', username); // Store the username
      window.location.href = 'feed.html';  // Redirect to the feed page
    }
  });

  // Handle login
  document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[username] && users[username].password === password) {
      alert('Login successful!');
      localStorage.setItem('username', username); // Store the username
      window.location.href = 'feed.html';  // Redirect to the feed page
    } else {
      alert('Login failed!');
    }
  });

  // Handle logout
  const logoutButton = document.getElementById('logout-button');
  if (logoutButton) {
    logoutButton.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('username');
      window.location.href = 'index.html';  // Redirect to the login page
    });
  }

  // Display username on the feed page
  const usernameDisplayElement = document.getElementById('username-display');
  if (usernameDisplayElement) {
    const username = localStorage.getItem('username') || 'User';
    usernameDisplayElement.textContent = username;
  }
});