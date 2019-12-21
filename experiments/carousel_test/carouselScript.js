let imageStrip = document.body.querySelector(".images");
let inchoateButton = document.getElementById("rButton");

function move(element, distance, leftOrRight) {
  console.log("move called")
  element.style.transform = "translateX(" + leftOrRight + distance + "px)";
}

inchoateButton.addEventListener('click', () => {move(imageStrip, 500, "+")});

move(imageStrip, 500, "-");
