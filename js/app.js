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
    productData = productDescriptionElement; // the data is returned as an JSON of objects, so store it in the global variable
    productDescriptionElement.forEach((item, index) => {
      // Loop through the array of objects
      const name = item.NAME; // Get the name from the current object
      const description = item.DESCRIPTION; // Get the description from the current object

      //adding these variables for the filter options

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
function loadContent(file, containerId, callback, removeHeading = false) {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById(containerId).innerHTML = this.responseText;

      // Remove the h2 element if removeHeading is true
      if (removeHeading) {
        const containerElement = document.getElementById(containerId);
        const headingElement = containerElement.querySelector("h2");
        if (headingElement) {
          containerElement.removeChild(headingElement);
        }
      }

      if (typeof callback === "function") {
        callback();
      }
    }
  };
  xhttp.open("GET", file, true);
  xhttp.send();
}

///////////////////////dynamic-content.js/////////////////////////
///////////////////////Load all products/////////////////////////
function loadAllProducts() {
  loadContent("pages/shirts.html", "shirts", displayData);
  loadContent("pages/sweaters.html", "sweaters", displayData);
  loadContent("pages/jeans.html", "jeans", displayData);
  loadContent("pages/pants.html", "pants", displayData);
  loadContent("pages/shorts.html", "shorts", displayData);
  loadContent("pages/socks.html", "socks", displayData);
  loadContent("pages/hats.html", "hats", displayData);
  loadContent("pages/shoes.html", "shoes", displayData);
  loadContent("pages/accessories.html", "accessories", displayData);
  initializeProductPage();
}
///////////////////////Load all products/////////////////////////

///////////////////////popupjs/////////////////////////
async function openPopup(parentElement, imgElement) {
  var popup = document.getElementById("popup");
  var popupText = document.querySelector(".popupText");
  var popupTitle = document.querySelector(".popupTitle");
  var popupPrice = document.querySelector(".popupPrice");
  var popupSizes = document.querySelector(".popupSizes");
  var popupImage = document.querySelector(".popupImage");

  const productId = parseInt(parentElement.dataset.id);
  const product = productData.find((p) => parseInt(p.ID) === productId);
  currentIndex = productId;
  var price = product.PRICE;
  var size = product.SIZES;
  popupTitle.innerHTML = product.NAME;
  popupText.innerHTML = product.DESCRIPTION;
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
  location.reload(); //refreshes the page and deletes the cart
  alert("Cart emptied!");

  //all they have to do is refresh the page but i guess we can still have this
}

///////////////////////search form jQuery/////////////////////////
function initializeProductPage() {
  document.getElementById("mySearch").addEventListener("keyup", function () {
    const filter = this.value.toUpperCase();
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
      const cardTitle = card
        .querySelector(".card-title")
        .textContent.toUpperCase();
      if (cardTitle.indexOf(filter) > -1) {
        card.classList.remove("d-none");
      } else {
        card.classList.add("d-none");
      }
    });
  });

  document
    .getElementById("filter-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      applyFilters();
    });
}

function applyFilters() {
  const sizeFilter = document.getElementById("size").value;
  const priceFilter = document.getElementById("price").value;
  const colorFilter = document.getElementById("color").value;

  const filteredProducts = productData.filter((product) => {
    const color = product.NAME.split(" ")[0].toLowerCase();
    const size = product.SIZES.trim();

    let display = true;

    if (sizeFilter && size !== sizeFilter) {
      display = false;
    }

    if (colorFilter && color !== colorFilter) {
      display = false;
    }

    return display;
  });

  if (priceFilter) {
    if (priceFilter === "low-high") {
      filteredProducts.sort(
        (a, b) => parseFloat(a.PRICE) - parseFloat(b.PRICE)
      );
    } else if (priceFilter === "high-low") {
      filteredProducts.sort(
        (a, b) => parseFloat(b.PRICE) - parseFloat(a.PRICE)
      );
    }
  }

  updateProductCards(filteredProducts);
}

function updateProductCards(filteredProducts) {
  const productCards = document.querySelectorAll(".card");

  productCards.forEach((card) => {
    const cardId = parseInt(card.dataset.id);
    const filteredProduct = filteredProducts.find(
      (product) => parseInt(product.ID) === cardId
    );

    if (filteredProduct) {
      const { NAME: productName, DESCRIPTION: productDescription } =
        filteredProduct;

      const productNameElement = card.querySelector(".card-title");
      const productDescriptionElement = card.querySelector(".card-text");

      productNameElement.textContent = productName;
      productDescriptionElement.textContent = productDescription;

      card.classList.remove("d-none");
    } else {
      card.classList.add("d-none");
    }
  });
}
