document.addEventListener('DOMContentLoaded', () => {
  initializeUsers();

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

function initializeUsers() {
  if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify({}));
  }
}

function handleRegister(e) {
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

  const users = JSON.parse(localStorage.getItem('users')) || {};

  if (users[username]) {
      alert('Username already exists!');
  } else {
      users[username] = { password };
      localStorage.setItem('users', JSON.stringify(users));
      alert('User registered!');
      setUser({ username }); // Store the user
      window.location.href = 'feed.html';  // Redirect to the feed page
  }
}

function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  const users = JSON.parse(localStorage.getItem('users')) || {};

  if (users[username] && users[username].password === password) {
      alert('Login successful!');
      setUser({ username }); // Store the user
      window.location.href = 'feed.html';  // Redirect to the feed page
  } else {
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
