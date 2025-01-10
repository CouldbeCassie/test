<?php
header('Content-Type: application/json');
ini_set('display_errors', 1);
error_reporting(E_ALL);

$usersFile = 'users.json';

function loadUsers() {
    global $usersFile;
    if (file_exists($usersFile)) {
        return json_decode(file_get_contents($usersFile), true);
    } else {
        return [];
    }
}

function saveUsers($users) {
    global $usersFile;
    file_put_contents($usersFile, json_encode($users, JSON_PRETTY_PRINT));
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $users = loadUsers();
    echo json_encode($users);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $users = loadUsers();

    $newId = count($users) ? end($users)['id'] + 1 : 1;
    $newUser = [
        'id' => $newId,
        'username' => $data['username'],
        'password' => $data['password']
    ];

    $users[] = $newUser;
    saveUsers($users);
    echo json_encode($newUser);
} else {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?>
