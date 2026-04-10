<?php

$inData = getRequestInfo();

$contactId = $inData["contactId"];
$userId = $inData["userId"];
$favorite = $inData["favorite"];

$conn = new mysqli("localhost", "AllAccess", "SmallProject1", "contact_manager");

if ($conn->connect_error)
{
    returnWithError($conn->connect_error);
}
else
{
    $stmt = $conn->prepare(
        "UPDATE contacts SET Favorite=? WHERE ContactID=? AND UserID=?"
    );

    $stmt->bind_param("iii", $favorite, $contactId, $userId);
    $stmt->execute();

    if ($stmt->affected_rows >= 0)
    {
        returnWithSuccess();
    }
    else
    {
        returnWithError("Failed to update favorite status.");
    }

    $stmt->close();
    $conn->close();
}

function getRequestInfo()
{
    return json_decode(file_get_contents('php://input'), true);
}

function sendResultInfoAsJson($obj)
{
    header('Content-type: application/json');
    echo $obj;
}

function returnWithError($err)
{
    sendResultInfoAsJson(json_encode([
        "error" => $err
    ]));
}

function returnWithSuccess()
{
    sendResultInfoAsJson(json_encode([
        "error" => ""
    ]));
}

?>
