<?php

$conn = new mysqli("localhost", "AllAccess", "SmallProject1", "contact_manager");

$data = json_decode(file_get_contents("php://input"), true);

$firstName = $data["firstName"];
$lastName  = $data["lastName"];
$login     = $data["login"];
$password  = $data["password"];

if ($conn->connect_error) {
    returnWithError( $conn->connect_error );
}
else
{
    // check if there's a duplicate login
    $stmt = $conn->prepare(
        "SELECT UserID FROM users WHERE Login = ?"
    );
    $stmt->bind_param("s", $login);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        returnWithError("User already exists.");
        $stmt->close();
        $conn->close();
    }
    else
    {
        $stmt->close();    

        // insert new user
        $stmt = $conn->prepare(
            "INSERT INTO users (FirstName, LastName, Login, PasswordHash)
            VALUES (?, ?, ?, ?)"
        );

        $stmt->bind_param(
            "ssss",
            $firstName,
            $lastName,
            $login,
            $password
        );

        if ($stmt->execute()) {
            returnWithError("");
        } else {
            returnWithError("Registration Failed.");
        }

        $stmt->close();
        $conn->close();
    }
}

function sendResultInfoAsJson( $obj )
{
	header('Content-type: application/json');
	echo $obj;
}

function returnWithError( $err )
{
	sendResultInfoAsJson(json_encode([
       "error" => $err
    ]));
}

?>
