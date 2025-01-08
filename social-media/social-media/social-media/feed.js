// Load profile name from localStorage
document.addEventListener('DOMContentLoaded', async () => {
    const storedProfileName = localStorage.getItem('profileName');
    if (storedProfileName) {
        document.getElementById('profile-name-display').textContent = storedProfileName;
        document.getElementById('profile-name').value = storedProfileName;
    }

    await loadPosts();
});

// Handle profile name customization
document.getElementById('profile-name').addEventListener('input', (e) => {
    const profileName = e.target.value;
    document.getElementById('profile-name-display').textContent = profileName;
    localStorage.setItem('profileName', profileName);
});

// Toggle dark mode/light mode
document.getElementById('theme-button').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById('theme-icon').classList.replace('fa-sun', 'fa-moon');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        document.getElementById('theme-icon').classList.replace('fa-moon', 'fa-sun');
    }
});

// Handle post creation
document.getElementById('create-post-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const content = document.getElementById('post-content').value;

    const response = await fetch('/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
    });

    if (response.ok) {
        document.getElementById('post-content').value = '';
        await loadPosts();
    } else {
        alert('Failed to create post!');
    }
});

// Load posts from the server
async function loadPosts() {
    const response = await fetch('/posts');
    const posts = await response.json();

    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = '';

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <p>${post.content}</p>
            <button class="like-button" data-id="${post.id}">Like</button>
            <span class="like-count">${post.likes}</span>
        `;
        postsContainer.appendChild(postElement);
    });
}

// Handle like button functionality
document.getElementById('posts-container').addEventListener('click', async (e) => {
    if (e.target.classList.contains('like-button')) {
        const postId = e.target.getAttribute('data-id');

        const response = await fetch(`/posts/${postId}/like`, {
            method: 'POST'
        });

        if (response.ok) {
            await loadPosts();
        } else {
            alert('Failed to like post!');
        }
    }
});
