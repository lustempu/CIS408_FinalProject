async function displayData() {
  try {
    const response = await fetch("php/get_data.php");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const shirts = await response.json();
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
