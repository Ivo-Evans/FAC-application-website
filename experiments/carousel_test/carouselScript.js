let imageStrip = document.body.querySelector(".images");
let inchoateButton = document.getElementById("rBody");

function move(element, distance, leftOrRight) {
  element.style.transform = "translateX(" + leftOrRight + distance + "px)";
}

move(imageStrip, 500, "-");
