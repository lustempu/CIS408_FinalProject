/* a simple AJAX function that will load the HTML files when the item buttons are clicked */
function loadContent(file) {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("dynamic-content").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", file, true);
  xhttp.send();
}
