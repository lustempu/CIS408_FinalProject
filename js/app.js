// Declare a global variable to store the product data
let productData = [];

async function displayData() {
  try {
    const response = await fetch("php/get_data.php");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const shirts = await response.json();
    productData = shirts; // Save the fetched product data to the global variable
    shirts.forEach((shirt, index) => {
      const name = shirt.NAME;
      const description = shirt.DESCRIPTION;
      let productNameElement = document.getElementById(
        `product-name-${index + 1}`
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
    console.error("Error fetching shirt data:", error);
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
