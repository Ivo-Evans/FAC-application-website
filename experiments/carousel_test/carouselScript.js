let imageStrip = document.body.querySelector(".images");
let images = document.body.querySelectorAll(".images img")
let rightButton = document.getElementById("rButton");
let leftButton = document.getElementById("lButton");
let currentImage = 0;
let position = 0;

function moveRight(element) {
  position -= images[currentImage].offsetWidth;
  element.style.transform = "translateX(+" + position + "px)";
  currentImage -= 1; // decrementing syntax caused hoisting problems
}

function moveLeft(element) {
  position += images[currentImage].offsetWidth;
  element.style.transform = "translateX(-" + position + "px)";
  currentImage += 1; // decrementing syntax caused hoisting problems
}



rightButton.addEventListener('click', () => {moveRight(imageStrip)});
leftButton.addEventListener('click', () => {moveLeft(imageStrip)});




// rightButton.addEventListener('click', () => {move(imageStrip, "+")});
// leftButton.addEventListener('click', () => {move(imageStrip, "-")});




// function move(element, leftOrRight) {
//   let newPosition = images[currentImage].offsetWidth + distanceLog;
//   console.log(distanceToMove)
//   element.style.transform = "translateX(" + leftOrRight + distanceToMove + "px)";
//   leftOrRight == "-" ? currentImage++ : currentImage--; // this seems paradoxical but is actually correct
//   leftOrRight == "-" ? distanceLog += distanceToMove : distanceLog -= distanceToMove;
//   console.log(currentImage);
// }
