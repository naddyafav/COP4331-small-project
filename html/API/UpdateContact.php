<?php
	$inData = getRequestInfo();
	
	$firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
	$phone = $inData["phone"];
	$email = $inData["email"];
	$userId = $inData["userId"];
    $contactId = $inData["contactId"];

	$conn = new mysqli("localhost", "AllAccess", "SmallProject1", "contact_manager");

	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare(
            "UPDATE contacts SET FirstName=?, LastName=?, Email=?, Phone=? WHERE ContactID=? AND UserID=?");
		$stmt->bind_param("ssssii", $firstName, $lastName, $email, $phone, $contactId, $userId);
		$stmt->execute();

		if ($stmt->affected_rows > 0) {
    		returnWithError("");
		} else {
    		returnWithError("Failed to update contact.");
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