document.addEventListener('DOMContentLoaded', () => {
    loadPosts();
    setupThemeToggle();
});

function setupThemeToggle() {
    const themeButton = document.getElementById('theme-button-feed');
    themeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.getElementById('theme-icon-feed').classList.replace('fa-sun', 'fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            document.getElementById('theme-icon-feed').classList.replace('fa-moon', 'fa-sun');
        }

        // Apply dark mode classes to relevant elements
        applyDarkModeClasses();
    });
}

// Add dark mode classes to relevant elements
function applyDarkModeClasses() {
    const elements = document.querySelectorAll('.header, .hero h2, .hero p, #form-container, input, textarea, button, #create-post-form textarea, #create-post-form button, .post, p, a');
    elements.forEach(element => {
        if (document.body.classList.contains('dark-mode')) {
            element.classList.add('dark-mode');
        } else {
            element.classList.remove('dark-mode');
        }
    });
}

// Load posts from the server
async function loadPosts() {
    console.log("Loading posts...");
    const response = await fetch('/posts');
    const posts = await response.json();
    console.log("Posts loaded:", posts);

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

    // Apply dark mode classes to posts if in dark mode
    applyDarkModeClasses();
}

// Handle post creation
document.getElementById('create-post-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const content = document.getElementById('post-content').value;
    console.log("Creating post with content:", content);

    const response = await fetch('/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
    });

    if (response.ok) {
        console.log("Post created successfully");
        document.getElementById('post-content').value = '';
        loadPosts();
    } else {
        alert('Failed to create post!');
    }
}); 

const dropdownToggle = document.getElementById("dropdown-toggle"); const dropdownContent = document.getElementById("dropdown-content"); dropdownToggle.addEventListener("click", function() { dropdownContent.classList.toggle("show"); }); // Close the dropdown if the user clicks outside of it window.onclick = function(event) { if (!event.target.matches('#dropdown-toggle')) { if (dropdownContent.classList.contains('show')) { dropdownContent.classList.remove('show'); } } }