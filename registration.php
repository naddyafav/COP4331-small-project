<?php
$conn = new mysqli("localhost", "dbuser", "dbpass", "dbname");

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "DB error"]));
}

$data = json_decode(file_get_contents("php://input"), true);

$firstName = $data["firstName"];
$lastName  = $data["lastName"];
$email     = $data["email"];
$password  = $data["password"];


// check if there's a duplicate email
$stmt = $conn->prepare(
    "SELECT UserID FROM Users WHERE Email = ?"
);
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode([
        "success" => false,
        "message" => "User already exists"
    ]);
    exit;
}
$stmt->close();


// hashing the password
$passwordHash = password_hash($password, PASSWORD_DEFAULT);


// insert new user
$stmt = $conn->prepare(
    "INSERT INTO Users (FirstName, LastName, Email, PasswordHash)
     VALUES (?, ?, ?, ?)"
);

$stmt->bind_param(
    "ssss",
    $firstName,
    $lastName,
    $email,
    $passwordHash
);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "userID" => $stmt->insert_id
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Registration failed"
    ]);
}
?>
