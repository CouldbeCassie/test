const API_URL = 'https://cassaint.com/api/posts.php';

document.addEventListener('DOMContentLoaded', () => {
    const user = getUser();
    if (user) {
        document.getElementById('username-display').textContent = user.username;
    } else {
        window.location.href = 'login.html'; // Redirect to login page if not logged in
    }
    loadPosts();

    const createPostForm = document.getElementById('create-post-form');
    if (createPostForm) {
        createPostForm.addEventListener('submit', handlePostCreation);
    }
});

function getUser() {
    return JSON.parse(localStorage.getItem('user'));
}

async function loadPosts() {
    console.log("Loading posts...");
    try {
        const response = await fetch(`${API_URL}/posts.php`);
        if (!response.ok) throw new Error('Failed to fetch posts');
        const posts = await response.json();
        console.log("Posts loaded:", posts);

        const postsContainer = document.getElementById('posts-container');
        postsContainer.innerHTML = '';

        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <p><strong>${post.username}</strong>: ${post.content}</p>
                <p><small>${post.timestamp}</small></p>
                <button class="like-button" data-id="${post.id}" data-action="like"><i class="fas fa-thumbs-up"></i></button>
                <span class="like-count">${post.likes}</span>
                <button class="dislike-button" data-id="${post.id}" data-action="dislike"><i class="fas fa-thumbs-down"></i></button>
                <span class="dislike-count">${post.dislikes}</span>
            `;
            postsContainer.appendChild(postElement);
        });

        // Add event listener for like and dislike buttons
        document.getElementById('posts-container').addEventListener('click', async (e) => {
            const button = e.target.closest('button');
            if (!button) return;
            const postId = button.getAttribute('data-id');
            const action = button.getAttribute('data-action');
            if (action === 'like' || action === 'dislike') {
                console.log(`${action === 'like' ? 'Liking' : 'Disliking'} post with ID: ${postId}`);
                await handlePostAction(postId, action);
            }
        });
    } catch (error) {
        console.error(error);
        alert('Failed to load posts!');
    }
}

async function handlePostAction(postId, action) {
    try {
        const response = await fetch(`${API_URL}/posts.php`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: postId, action })
        });
        if (response.ok) {
            await loadPosts();
        } else {
            throw new Error(`Failed to ${action} post`);
        }
    } catch (error) {
        console.warn(`Failed to ${action} post on backend:`, error);
        alert(`Failed to ${action} post!`);
    }
}

async function handlePostCreation(e) {
    e.preventDefault();
    const content = document.getElementById('post-content').value;
    console.log("Creating post with content:", content);

    const user = getUser();
    if (!user) {
        alert('You need to be logged in to create a post!');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/posts.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content, username: user.username })
        });
        if (response.ok) {
            console.log("Post created successfully");
            document.getElementById('post-content').value = '';
            loadPosts();
        } else {
            throw new Error('Failed to create post');
        }
    } catch (error) {
        console.warn('Failed to create post on backend:', error);
        alert('Failed to create post!');
    }
}

// Dropdown menu functionality
const dropdownToggle = document.getElementById('dropdown-toggle');
const dropdownContent = document.getElementById('dropdown-content');
dropdownToggle.addEventListener('click', function() {
    dropdownContent.classList.toggle('show');
});
window.onclick = function(event) {
    if (!event.target.matches('#dropdown-toggle')) {
        if (dropdownContent.classList.contains('show')) {
            dropdownContent.classList.remove('show');
        }
    }
};
