<?php
header('Content-Type: application/json');

// Path to your users file
$usersFile = 'users.json';

// Load users from file
function loadUsers() {
    global $usersFile;
    if (file_exists($usersFile)) {
        return json_decode(file_get_contents($usersFile), true);
    } else {
        return [];
    }
}

// Save users to file
function saveUsers($users) {
    global $usersFile;
    file_put_contents($usersFile, json_encode($users, JSON_PRETTY_PRINT));
}

// Handle GET request
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $users = loadUsers();
    echo json_encode($users);

// Handle POST request for creating a new user
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $users = loadUsers();

    // Generate a new ID
    $newId = count($users) ? end($users)['id'] + 1 : 1;
    $newUser = [
        'id' => $newId,
        'username' => $data['username']
    ];

    $users[] = $newUser;
    saveUsers($users);
    echo json_encode($newUser);
}
?>