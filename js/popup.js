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
