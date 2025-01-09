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

function getPosts() {
    return JSON.parse(localStorage.getItem('posts')) || [];
}

function savePosts(posts) {
    localStorage.setItem('posts', JSON.stringify(posts));
}

async function loadPosts() {
    console.log("Loading posts...");
    let posts = getPosts(); // Fallback to localStorage posts
    try {
        const response = await fetch('/posts');
        if (response.ok) {
            posts = await response.json();
            savePosts(posts); // Save fetched posts to localStorage
        }
    } catch (error) {
        console.warn('Using fallback posts from localStorage:', error);
    }
    console.log("Posts loaded:", posts);

    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = '';

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <p><strong>${post.username}</strong>: ${post.content}</p>
            <button class="like-button" data-id="${post.id}"><i class="fas fa-thumbs-up"></i></button>
            <span class="like-count">${post.likes}</span>
            <button class="dislike-button" data-id="${post.id}"><i class="fas fa-thumbs-down"></i></button>
            <span class="dislike-count">${post.dislikes || 0}</span>
        `;
        postsContainer.appendChild(postElement);
    });

    document.getElementById('posts-container').addEventListener('click', async (e) => {
        const postId = e.target.closest('button').getAttribute('data-id');
        if (e.target.closest('button').classList.contains('like-button')) {
            console.log(`Liking post with ID: ${postId}`);
            await handlePostLike(postId);
        } else if (e.target.closest('button').classList.contains('dislike-button')) {
            console.log(`Disliking post with ID: ${postId}`);
            await handlePostDislike(postId);
        }
    });
}

async function handlePostLike(postId) {
    let success = false;
    try {
        const response = await fetch(`/posts/${postId}/like`, { method: 'POST' });
        success = response.ok;
    } catch (error) {
        console.warn('Failed to like post on backend:', error);
    }
    if (success) {
        await loadPosts();
    } else {
        likePost(postId); // Fallback to localStorage like
    }
}

async function handlePostDislike(postId) {
    let success = false;
    try {
        const response = await fetch(`/posts/${postId}/dislike`, { method: 'POST' });
        success = response.ok;
    } catch (error) {
        console.warn('Failed to dislike post on backend:', error);
    }
    if (success) {
        await loadPosts();
    } else {
        dislikePost(postId); // Fallback to localStorage dislike
    }
}

function likePost(postId) {
    const posts = getPosts();
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.likes += 1;
        savePosts(posts);
        loadPosts();
    } else {
        alert('Failed to like post!');
    }
}

function dislikePost(postId) {
    const posts = getPosts();
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.dislikes = (post.dislikes || 0) + 1;
        savePosts(posts);
        loadPosts();
    } else {
        alert('Failed to dislike post!');
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

    let success = false;
    try {
        const response = await fetch('/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content, username: user.username })
        });
        success = response.ok;
    } catch (error) {
        console.warn('Failed to create post on backend:', error);
    }

    if (success) {
        console.log("Post created successfully");
        document.getElementById('post-content').value = '';
        loadPosts();
    } else {
        // Fallback to localStorage post creation
        const posts = getPosts();
        const newPost = {
            id: posts.length ? posts[posts.length - 1].id + 1 : 1,
            username: user.username,
            content,
            likes: 0,
            dislikes: 0
        };
        posts.push(newPost);
        savePosts(posts);
        document.getElementById('post-content').value = '';
        loadPosts();
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
