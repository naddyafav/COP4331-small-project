<?php
	$inData = getRequestInfo();
	
	$firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
	$phone = $inData["phone"];
	$email = $inData["email"];
	$userId = $inData["userId"];
    $contactId = $inData["contactId"];

	$conn = new mysqli("localhost", "AllAccess", "SmallProject1", "contacts");

	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare(
            "UPDATE contacts SET FirstName=?, LastName=?, Email=?, Phone=? WHERE ContactID=?, UserID=?");
		$stmt->bind_param("ssssii", $firstName, $lastName, $email, $phone, $contactId, $userId);
		$stmt->execute();

		if ($stmt->affected_rows > 0) {
    		echo "Contact updated successfully.";
		} else {
    		echo "No contact found or not authorized.";
		}

		$stmt->close();
		$conn->close();
		returnWithError("");
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