<?php

$inData = getRequestInfo();

$searchName = "%" . $inData["searchName"] . "%";
$searchResults = [];

$conn = new mysqli("localhost", "AllAccess", "SmallProject1", "contact_manager");
if ($conn->connect_error)
{
    returnWithError($conn->connect_error);
}
else
{
    $stmt = $conn->prepare(
        "SELECT ContactID, FirstName, LastName, Phone, Email
         FROM contacts
         WHERE (FirstName LIKE ? OR LastName LIKE ?)
         AND UserID=?"
    );

    $stmt->bind_param("ssi", $searchName, $searchName, $inData["userId"]);
    $stmt->execute();

    $result = $stmt->get_result();

    while ($row = $result->fetch_assoc())
    {
        $searchResults[] = [
            "contactId" => $row["ContactID"],
            "firstName" => $row["FirstName"],
            "lastName"  => $row["LastName"],
            "phone"     => $row["Phone"],
            "email"     => $row["Email"]
        ];
    }

    if (count($searchResults) == 0)
    {
        returnWithError("No Records Found");
    }
    else
    {
        returnWithInfo($searchResults);
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
        "results" => [],
        "error" => $err
    ]));
}

function returnWithInfo($searchResults)
{
    sendResultInfoAsJson(json_encode([
        "results" => $searchResults,
        "error" => ""
    ]));
}

?>