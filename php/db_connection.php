<?php
$servername = "99.130.55.31"; // Use public IP address "99.130.55.31" instead of "localhost"
$username = "root";
$password = "";
$dbname = "clothing_store_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
