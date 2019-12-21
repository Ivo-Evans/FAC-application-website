let imageStrip = document.body.querySelector(".images");
let rightButton = document.getElementById("rButton");
let leftButton = document.getElementById("lButton");

function move(element, distance, leftOrRight) {
  console.log("move called")
  element.style.transform = "translateX(" + leftOrRight + distance + "px)";
}

rightButton.addEventListener('click', () => {move(imageStrip, 500, "+")});
leftButton.addEventListener('click', () => {move(imageStrip, 500, "-")});

move(imageStrip, 500, "-");
