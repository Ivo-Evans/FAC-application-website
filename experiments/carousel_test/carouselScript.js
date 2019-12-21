let imageStrip = document.body.querySelector(".images");
let images = document.body.querySelectorAll(".images img")
let rightButton = document.getElementById("rButton");
let leftButton = document.getElementById("lButton");
let currentImage = 0;
let position = 0;
let picturePositions = [0, ]

padNarrowImages(images) // unsuccessful, but changing .images img in the CSS IS successful, so i think the problem is with my interaction with the DOM.

function padNarrowImages(list) {
  let widest_image = Array.from(list).map(e => e.offsetWidth).sort((a, b) =>  b - a)[0];
  for(let i = 0; i < list.length; i++) {
    thisWidth = list[i].offsetWidth
    if (thisWidth < widest_image) {
      let extra = (widest_image - thisWidth) / 2;
      list[i].style.paddingLeft = extra;
      list[i].style.paddingRight = extra;
    }
  }
}

function moveLeft(element) {
  position += images[currentImage].offsetWidth;
  element.style.transform = "translateX(" + position + "px)";
  currentImage -= 1; // decrementing syntax caused hoisting problems
}

function moveRight(element) {
  position -= images[currentImage].offsetWidth;
  element.style.transform = "translateX(" + position + "px)";
  currentImage += 1; // decrementing syntax caused hoisting problems

  if (picturePositions.length < images.length) {picturePositions.push(position)}
  console.log(picturePositions); // not a tenable strategy for leftward movement. In fact, a single leftward move would break it - length would increase but there would be duplicate values. Better just to pad all images, then find the absolute distance you need to go.  

  if (currentImage > images.length - 1) {
    currentImage = 1;
    position = picturePositions[0];
    element.style.transform = "translateX(" + position + ")";
  }
//  console.log("position: " + position + " currentImage: " + currentImage);
}

/*
IMAGES from left to right have indexes 0..6
moveLeft should:
  - bring on the image to the left
  - it should decrease the index by 1
  - move imageStrip Right
  - it should increase the position, which is distance from the left margin
*/

rightButton.addEventListener('click', () => {moveRight(imageStrip)});
leftButton.addEventListener('click', () => {moveLeft(imageStrip)});
