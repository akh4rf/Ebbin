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
  var winWidth = $("body").prop("clientWidth");
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

// Resize Function //
function resizeFunction() {
  closeMenuIfBig();
  resizeFirstBodyDiv();
  flipOrderMainCol1();
}

// Closes the navigation dropdown if viewport gets too wide //
function closeMenuIfBig() {
  var winWidth = $("body").prop("clientWidth");
  // Close menu if menu is open and vw > 894 //
  if (winWidth > 894) {
    var x = document.getElementsByClassName("change");
    if (x.length == 1) {
      menuBtnFunc(x[0]);
    }
  }
}

// Resizes first body div's textbox margin-top //
function resizeFirstBodyDiv() {
  var txtdiv1 = document.getElementById("main-txt-1"),
      style1 = window.getComputedStyle(txtdiv1),
      height1 = style1.getPropertyValue('height');
  var imgdiv1 = document.getElementById("img-cont-1"),
      style2 = window.getComputedStyle(imgdiv1),
      height2 = style2.getPropertyValue('height');
  var newMargin = (parseFloat(height2) - parseFloat(height1))/2;
  txtdiv1.style.margin = (newMargin+"px 5% 0px");
}

var winWidth = $("body").prop("clientWidth");
if (winWidth > 659) {var imgIsBefore = true;}
else {var imgIsBefore = false;}


function flipOrderMainCol1() {
  var winWidth = $("body").prop("clientWidth");
  if ((winWidth <= 659) && !imgIsBefore) {
    jQuery(jQuery("#txt-cont-1").detach()).appendTo(".columns");
    imgIsBefore = true;
  }
  else if ((winWidth > 659) && imgIsBefore) {
    jQuery(jQuery("#img-cont-1").detach()).appendTo(".columns");
    imgIsBefore = false;
  }
}
