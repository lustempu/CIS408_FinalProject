//gloabl variables
let productData = []; // Declare a global variable to store the product data
let cartItems = []; //global variable to store cart items
let currentIndex = 0; //global variable to store the current index of the product

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

///////////////////////dynamic-content.js/////////////////////////
function loadContent(file, callback) {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("dynamic-content").innerHTML = this.responseText;
      if (typeof callback === "function") {
        callback();
      }
    }
  };
  xhttp.open("GET", file, true);
  xhttp.send();
}
///////////////////////dynamic-content.js/////////////////////////

///////////////////////popupjs/////////////////////////
async function openPopup(parentElement, index, imgElement) {
  // console.log("imgElement " + imgElement); // debugging purposes --> issues resolved!
  var popup = document.getElementById("popup");
  var popupText = document.querySelector(".popupText");
  var popupTitle = document.querySelector(".popupTitle");
  var popupPrice = document.querySelector(".popupPrice");
  var popupSizes = document.querySelector(".popupSizes");
  var popupImage = document.querySelector(".popupImage");
  var title = parentElement.querySelectorAll(".card-title");
  var text = parentElement.querySelectorAll(".card-text");
  currentIndex = index;
  // Fetch the price and size from the global productData variable
  var price = productData[index].PRICE;
  var size = productData[index].SIZES;
  popupTitle.innerHTML = title[0].innerHTML;
  popupText.innerHTML = text[0].innerHTML;
  popupPrice.innerHTML = `Price: $${price}`;
  popupSizes.innerHTML = `Size: ${size}`;
  popupImage.src = imgElement.src; // Update the img src
  popup.classList.add("open-popup");
}

function closePopup() {
  var popup = document.getElementById("popup");
  popup.classList.remove("open-popup");
}
///////////////////////popupjs/////////////////////////

function addToCart(index) {
  alert("Item added to cart!");
  console.log("addToCart: " + index); // debugging purposes
  const item = productData[index]; // Get the item from the productData array
  const existingItem = cartItems.find((cartItem) => cartItem.ID === item.ID); // Check if the item is already in the cart by comparing the ID of the item to the ID of each item in the cart

  if (existingItem) {
    // If the item is already in the cart, increment the quantity
    existingItem.quantity++;
  } else {
    // If the item is not in the cart, add it to the cart by using the spread operator to copy the item object and adding a quantity property
    cartItems.push({ ...item, quantity: 1 });
  }

  if (
    // Check if the current page is the shopping cart page, ensuring that the updateCartTable function is called only when the cart table elements are accessible in the DOM.
    document.getElementById("dynamic-content").querySelector("#shopping-cart")
  ) {
    updateCartTable();
  }
}

function updateCartTable() {
  const cartTableBody = document.getElementById("cartTableBody");
  cartTableBody.innerHTML = "";

  let totalAmount = 0;
  let itemCount = 0;

  cartItems.forEach((item) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${item.NAME}</td>
      <td class="text-right">$${item.PRICE}</td>
      <td class="text-right">${item.quantity}</td>
      <td class="text-right">$${item.PRICE * item.quantity}</td>
    `;

    cartTableBody.appendChild(row);

    totalAmount += parseFloat((item.PRICE * item.quantity).toFixed(2));
    //use parseFloat to convert to a number, and toFixed to round to 2 decimal places
    console.log("totalAmount: " + totalAmount); // debugging purposes
    itemCount += item.quantity;
  });

  document.getElementById("totalAmount").innerText = `$${totalAmount.toFixed(
    2
  )}`;
  document.getElementById("itemCount").innerText = `${itemCount} items`;
}

//we will need some kind of button to call this function
function emptyCart() {
  alert("Cart emptied!");
  cartItems = [];
  updateCartTable();

  //all they have to do is refresh the page but i guess we can still have this
}
