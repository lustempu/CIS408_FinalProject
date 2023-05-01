function openPopup(parentElement) {
    var popup = document.getElementById("popup");
    var popupText = document.querySelector(".popupText");
    var popupTitle = document.querySelector(".popupTitle");
    var popupPrice = document.querySelector(".popupPrice");
    var img = parentElement.querySelector(".card-img-top");
    var title = parentElement.querySelectorAll(".card-title");
    var text = parentElement.querySelectorAll(".card-text");
    var price = "Price: $5.99";
    popupTitle.innerHTML = title[0].innerHTML;
    popupText.innerHTML = text[0].innerHTML;
    popupPrice.innerHTML = price;
    popup.classList.add("open-popup");
}
function closePopup() {
    var popup = document.getElementById("popup");
    popup.classList.remove("open-popup");
}