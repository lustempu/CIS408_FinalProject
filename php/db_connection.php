<?php
$servername = "localhost"; // Use public IP address xxxxxxxx instead of "localhost"
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
