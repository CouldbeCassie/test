document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
  
    await fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
  
    alert('User registered!');
  });
  
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
      document.getElementById('post-form').style.display = 'block';
      alert('Login successful!');
    } else {
      alert('Login failed!');
    }
  });
  
  document.getElementById('post-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const content = document.getElementById('content').value;
    const token = localStorage.getItem('token');
  
    await fetch('/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ content, author: 'user_id_here' }) // Replace 'user_id_here' with actual user ID
    });
  
    alert('Post created!');
  });
  