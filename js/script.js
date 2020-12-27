function menuBtnFunc(x) {
  x.classList.toggle("change");

  var y = document.getElementsByClassName("navbar-buttons");
  for (let item of y) {
    item.classList.toggle("show-nav");
  }
}
