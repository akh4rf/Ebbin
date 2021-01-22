// Changes appearance of menu button, and displays  //
// or minimizes the navigation dropdown accordingly //
function menuBtnFunc(x) {
  // Toggles appearance of menu button //
  x.classList.toggle("change");
  // Toggles visibility of vertical navbar //
  var navMenu = document.getElementsByClassName("navbar-buttons");
  for (let item of navMenu) {
    item.classList.toggle("show-nav");
  }
  // Hides all dropdown navbar buttons //
  var droppedList = document.getElementsByClassName("show-drop");
  for (let item of droppedList) {
    toggleNavDrop(item);
  }
}

// Governs the nested dropdown navigation for mobible users //
function dropBtnFuncMobile(navBtn) {
  var winWidth = $("body").prop("clientWidth");
  // Check if current dropdown is already displayed //
  var isDisplayed = navBtn.classList.contains("show-drop");
  // Make sure other dropdowns are minimized //
  var droppedList = document.getElementsByClassName("show-drop");
  for (let item of droppedList) {
    toggleNavDrop(item);
  }
  // Display dropdown navbar buttons if both    //
  // vw <= 894 AND it wasn't already displayed. //
  if (winWidth <= 894 && !isDisplayed) {
    toggleNavDrop(navBtn);
  }
}

// Toggles the appearance of the nested dropdown navigation //
function toggleNavDrop(navBtn) {
  navBtn.classList.toggle("show-drop");
  (($(navBtn).find(".fa-angle-right"))[0]).classList.toggle("rotated-arrow");
}

// Resize Function //
function resizeFunction() {
  closeMenuIfBig();
  centerDivVert();
  shrinkInlineImgs();
  if ((document.getElementsByClassName("flippable")).length > 0) {
    flipColumnOrder();
  }
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

// Reorders .column divs depending on whether the body                //
// width is above or below a certain value (flipWidth).               //
// Parent .columns div must have class .flippable, a given            //
// value for flipWidth, with its flipBool value set to false.         //
// First child .column div must have class .flip-l2r.is-half-width,   //
// Second child .column div must have class .flip-r2l.is-half-width   //
// Example:                                                           //
//  <div flipWidth="734" flipBool="false" class="columns flippable">  //
//    <div class="column flip-l2r is-half-width">...</div>            //
//    <div class="column flip-r2l is-half-width">...</div>            //
//  </div>                                                            //
function flipColumnOrder() {
  var winWidth = $("body").prop("clientWidth"),
      flipList = document.getElementsByClassName("flippable");
  for (let item of flipList) {
    /*
      var num       : width at which columns flip
      var bool_val  : true if unflipped, false if flipped.
    */
    var num = parseInt(item.getAttribute("flipWidth")),
        bool_val = item.getAttribute("flipBool") == "true";
    /* Unflip when body width falls under designated flipWidth */
    if ((winWidth < num) && !bool_val) {
      var txt = ($(item).find('.flip-r2l'))[0];
      $(txt).detach().appendTo(item);
      $(item).attr("flipBool","true");
    }
    /* Flip when body width rises above designated flipWidth */
    else if ((winWidth >= num) && bool_val) {
      var img = ($(item).find('.flip-l2r'))[0];
      $(img).detach().appendTo(item);
      $(item).attr("flipBool","false")
    }
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
