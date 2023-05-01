<?php
// Include your database connection code
include 'db_connection.php';

// Create an SQL query to fetch all items from the clothing_store_items table
$sql = "SELECT * FROM clothing_store_items";

// Execute the SQL query and store the result in a variable
$result = $conn->query($sql);

// Check if the query returned any results
if ($result->num_rows > 0) {
    // Create an empty array to store the fetched products
    $products = array();

    // Fetch each row as an associative array and add it to the products array
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }

    // Set the Content-Type header to application/json
    //header('Content-Type: application/json');

    // Encode the products array as a JSON object and print it
    echo json_encode($products);
} else {
    // If no products were found, print an empty JSON array
    echo json_encode(array());
}

// Close the database connection
$conn->close();
?>
