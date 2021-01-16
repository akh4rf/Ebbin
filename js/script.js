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
  centerDivVert();
  flipColumnOrder();
  shrinkInlineImgs();
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

// Vertically centers div in relation to another (larger) div //
// Requires mutual parent to have class .vc-anchor and target //
// div to have class .vc-target                               //
function centerDivVert() {
  var textBoxList = document.getElementsByClassName("center-text-vert");
  for (let textBox of textBoxList) {
    var image = ($(textBox).closest('.vc-anchor').find('.vc-target'))[0],
        tHeight = (window.getComputedStyle(textBox)).getPropertyValue('height'),
        iHeight = (window.getComputedStyle(image)).getPropertyValue('height'),
        newMargin = (parseFloat(iHeight) - parseFloat(tHeight))/2;
    textBox.style.margin = (newMargin+"px 5% 0px");
  }
}

// Flips order of image/text columns when screen is narrow    //
// enough, such that images remain above text in narrow view  //
// no matter the actual div order.                            //
function flipColumnOrder() {
  var winWidth = $("body").prop("clientWidth"),
      flipList = document.getElementsByClassName("flippable");
  if ((winWidth < 734) && !imgIsBefore) {
    for (let item of flipList) {
      var txt = ($(item).find('.flip-txt'))[0];
      $(txt).detach().appendTo(item);
    }
    imgIsBefore = true;
  }
  else if ((winWidth >= 734) && imgIsBefore) {
    for (let item of flipList) {
      var img = ($(item).find('.flip-img'))[0];
      $(img).detach().appendTo(item);
    }
    imgIsBefore = false;
  }
}

// Centers & shrinks inline images that grow wider than their //
// containing divs, while maintaining the same aspect ratio.  //
// Requires img to have class "inline-img" and requires       //
// container to have class "inline-img-parent".               //
function shrinkInlineImgs() {
  var imgList = document.getElementsByClassName("inline-img");
  for (let img of imgList) {
    var isSmall = $(img).hasClass("inline-img-small"),
        parent = ($(img).closest('.inline-img-parent'))[0],
        iWidth = parseFloat(img.style.width),
        pStyle = window.getComputedStyle(parent),
        pWidth = (parseFloat(pStyle.getPropertyValue('width'))
               - (parseFloat(pStyle.getPropertyValue('padding-left'))
               + parseFloat(pStyle.getPropertyValue('padding-right'))));
    if (iWidth >= pWidth && !isSmall) {
      img.classList.toggle("inline-img-small");
    }
    else if (iWidth < pWidth && isSmall) {
      img.classList.toggle("inline-img-small");
    }
  }
}
