<?php
header('Content-Type: application/json');

// Path to your posts file
$postsFile = 'posts.json';

// Load posts from file
function loadPosts() {
    global $postsFile;
    if (file_exists($postsFile)) {
        return json_decode(file_get_contents($postsFile), true);
    } else {
        return [];
    }
}

// Save posts to file
function savePosts($posts) {
    global $postsFile;
    file_put_contents($postsFile, json_encode($posts, JSON_PRETTY_PRINT));
}

// Get current timestamp
function getCurrentTimestamp() {
    return date('Y-m-d H:i:s');
}

// Handle GET request
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $posts = loadPosts();
    echo json_encode($posts);

// Handle POST request
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $posts = loadPosts();
    $newPost = [
        'id' => count($posts) ? end($posts)['id'] + 1 : 1,
        'username' => $data['username'],
        'content' => $data['content'],
        'likes' => 0,
        'dislikes' => 0,
        'timestamp' => getCurrentTimestamp()
    ];
    $posts[] = $newPost;
    savePosts($posts);
    echo json_encode($newPost);

// Handle PATCH request to like or dislike a post
} elseif ($_SERVER['REQUEST_METHOD'] === 'PATCH') {
    $data = json_decode(file_get_contents('php://input'), true);
    $postId = intval($data['id']);
    $action = $data['action'];
    $posts = loadPosts();
    $postFound = false;

    foreach ($posts as &$post) {
        if ($post['id'] === $postId) {
            if ($action === 'like') {
                $post['likes'] += 1;
            } elseif ($action === 'dislike') {
                $post['dislikes'] += 1;
            }
            $postFound = true;
            break;
        }
    }

    if ($postFound) {
        savePosts($posts);
        echo json_encode(['status' => 'success']);
    } else {
        http_response_code(404);
        echo json_encode(['status' => 'error', 'message' => 'Post not found']);
    }
}
?>
