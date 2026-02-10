<?php
	$inData = getRequestInfo();
	
	$contactId = $inData["contactId"];
	$userId = $inData["userId"];

	$conn = new mysqli("localhost", "AllAccess", "SmallProject1", "contact_manager");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("DELETE FROM contacts WHERE ContactID=? AND UserID=?");
		$stmt->bind_param("ii", $contactId, $userId);
		$stmt->execute();

		if ($stmt->affected_rows > 0) {
    		returnWithError("");
		} else {
    		returnWithError("No contact found or not authorized.");
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