let imageStrip = document.body.querySelector(".images");
let images = document.body.querySelectorAll(".images img")
let finalImagePosition = Array.from(images).reduce((a, b) => a + b.offsetWidth, 0) - images[images.length - 1].offsetWidth;

let rightButton = document.getElementById("rButton");
let leftButton = document.getElementById("lButton");

let currentImage = 0;
let position = 0;

rightButton.addEventListener('click', () => {moveRight(imageStrip)});
leftButton.addEventListener('click', () => {moveLeft(imageStrip)});


/*
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
*/

function moveLeft(element) {
  position += images[currentImage].offsetWidth;
  element.style.transform = "translateX(" + position + "px)";
  currentImage -= 1; // decrementing syntax caused hoisting problems

  if (currentImage < 0) {
    currentImage = images.length - 1;
    console.log("prechange position: " + position);
    position = -(finalImagePosition);
    // moveRight(element);
    element.style.transform = "translateX(" + position + "px)";
  }
}

function moveRight(element) {
  position -= images[currentImage].offsetWidth;
  element.style.transform = "translateX(" + position + "px)";
  currentImage += 1; // decrementing syntax caused hoisting problems


  if (currentImage > images.length - 1) {
    console.log(currentImage + position)
    currentImage = 0;
    position = 0;
    element.style.transform = "translateX(" + position + ")";
  }
}

/*
IMAGES from left to right have indexes 0..6
moveLeft should:
  - bring on the image to the left
  - it should decrease the index by 1
  - move imageStrip Right
  - it should increase the position, which is distance from the left margin
*/
