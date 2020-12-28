// Changes appearance of menu button, and displays  //
// or minimizes the navigation dropdown accordingly //
function menuBtnFunc(x) {
  // Toggles appearance of menu button //
  x.classList.toggle("change");
  // Toggles visibility of vertical navbar //
  var y = document.getElementsByClassName("navbar-buttons");
  for (let item of y) {
    item.classList.toggle("show-nav");
  }
  // Hides all dropdown navbar buttons //
  var z = document.getElementsByClassName("show-drop");
  for (let item of z) {
    item.classList.toggle("show-drop");
  }
}

// Governs the nested dropdown navigation for mobible users //
function dropBtnFuncMobile(x) {
  var winWidth = $(window).width();
  // Check if current dropdown is already displayed //
  var t = x.classList.contains("show-drop");
  // Make sure other dropdowns are minimized //
  var z = document.getElementsByClassName("show-drop");
  for (let item of z) {
    item.classList.toggle("show-drop");
  }
  // Display dropdown navbar buttons if both    //
  // vw <= 894 AND it wasn't already displayed. //
  if (winWidth <= 894 && !t) {
    x.classList.toggle("show-drop");
  }
}

// Closes the navigation dropdown if viewport gets too wide //
function closeMenuIfBig() {
  var winWidth = $(window).width();
  // Close menu if menu is open and vw > 894 //
  if (winWidth > 894) {
    var x = document.getElementsByClassName("change");
    if (x.length == 1) {
      menuBtnFunc(x[0]);
    }
  }
}
