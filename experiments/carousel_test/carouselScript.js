let imageStrip = document.body.querySelector(".images");
let images = document.body.querySelectorAll(".images img")
let rightButton = document.getElementById("rButton");
let leftButton = document.getElementById("lButton");
let currentImage = 0;
let position = 0;

function moveLeft(element) {
  position -= images[currentImage].offsetWidth;
  element.style.transform = "translateX(+" + position + "px)";
  currentImage -= 1; // decrementing syntax caused hoisting problems
}

function moveRight(element) {
  position += images[currentImage].offsetWidth;
  element.style.transform = "translateX(-" + position + "px)";
  currentImage += 1; // decrementing syntax caused hoisting problems
}



rightButton.addEventListener('click', () => {moveRight(imageStrip)});
leftButton.addEventListener('click', () => {moveLeft(imageStrip)});
