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

  try {
    const response = await fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      console.log('User registered successfully');
      alert('User registered!');
      window.location.href = 'feed.html';  // Redirect to the feed page
      localStorage.setItem('username', username); // Store the username
    } else {
      console.log('Registration failed:', await response.text());
      alert('Registration failed!');
    }
  } catch (error) {
    console.log('Error:', error);
    alert('An error occurred during registration.');
  }
});

// Handle login
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      console.log('Login successful');
      alert('Login successful!');
      window.location.href = 'feed.html';  // Redirect to the feed page
      localStorage.setItem('username', username); // Store the username
    } else {
      console.log('Login failed:', await response.text());
      alert('Login failed!');
    }
  } catch (error) {
    console.log('Error:', error);
    alert('An error occurred during login.');
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

  // Sidebar toggle
  const sidebar = document.getElementById("sidebar");
  const sidebarToggle = document.getElementById("sidebar-toggle");
  const closeSidebar = document.getElementById("close-sidebar");
  const body = document.body;

  sidebarToggle.addEventListener("click", function() {
      sidebar.style.width = "250px";
      body.classList.add("sidebar-open");
  });

  closeSidebar.addEventListener("click", function() {
      sidebar.style.width = "0";
      body.classList.remove("sidebar-open");
  });

  // Display welcome message with username
  const username = localStorage.getItem('username') || 'User';
  document.getElementById("welcome-message").innerText = `Welcome to Piro Feed, ${username}!`;
});

