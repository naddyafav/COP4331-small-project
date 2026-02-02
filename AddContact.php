<?php
	$inData = getRequestInfo();
	
	$firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
	$phone = $inData["phone"];
	$email = $inData["email"];
	$userId = $inData["userId"];

	$conn = new mysqli("localhost", "AllAccess", "SmallProject1", "contacts");

	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("INSERT into contacts (UserID,FirstName,LastName,Email,Phone) VALUES(?,?,?,?,?)");
		$stmt->bind_param("issss", $userId, $firstName, $lastName, $email, $phone);
		$stmt->execute();

		if ($stmt->affected_rows > 0) {
    		returnWithError("");
		} else {
    		returnWithError("Failed to add contact.");
		}

		$stmt->close();
		$conn->close();
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
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