let productData = []; // Declare a global variable to store the product data
// now we can use the productData variable in the displayData function

async function displayData() {
  //this displays the backend data for the cards, but not the popups
  // Fetch the product data from the database
  try {
    const response = await fetch("php/get_data.php");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const productDescriptionElement = await response.json();
    productData = productDescriptionElement; // the data is returned as an array of objects, so store it in the global variable
    productDescriptionElement.forEach((item, index) => {
      // Loop through the array of objects
      const name = item.NAME; // Get the name from the current object
      const description = item.DESCRIPTION; // Get the description from the current object
      let productNameElement = document.getElementById(
        // Get the product name element
        `product-name-${index + 1}` // the index starts at 0, but the product names start at 1, so add 1 to the index
      );
      let productDescriptionElement = document.getElementById(
        `product-description-${index + 1}`
      );
      if (productNameElement && productDescriptionElement) {
        productNameElement.textContent = name;
        productDescriptionElement.textContent = description;
      }
    });
  } catch (error) {
    console.error("Error fetching item data:", error);
  }
}

function cartAction(para) {
  if (para === "add") {
    alert("Item added to cart!");
  } else if (para === "remove") {
    alert("Item removed from cart!");
  }
}

function emptyCart() {
  alert("Cart emptied!");
}
