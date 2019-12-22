const imageStrip = document.body.querySelector(".images");
const images = document.body.querySelectorAll(".images img")
const rightButton = document.getElementById("rButton");
const leftButton = document.getElementById("lButton");

let currentImage = 0;
let currentPosition = 0;

/* You might seriously consider not padding anything here but adding small padding in CSS and adding a kind of scroll effect. You could add duplicates pictures on the outside that you never navigate to; or a set of three that, when you navigate to them, teleport you to the beginning without you realising it. Your pictures could even be connected. */

// padNarrowImages();
// padAllImages()
rightButton.addEventListener('click', () => {moveRight(imageStrip)});
leftButton.addEventListener('click', () => {moveLeft(imageStrip)});

let boxWidth = document.body.querySelector(".slider_box");

// function padNarrowImages() {
//   let widest_image = Array.from(images).map(e => e.offsetWidth).sort((a, b) =>  b - a)[0];
//   for(let i = 0; i < images.length; i++) {
//     thisWidth = images[i].offsetWidth;
//     if (thisWidth < widest_image) {
//       let extra = (widest_image - thisWidth) / 2;
//       images[i].style.paddingLeft = extra + "px";
//       images[i].style.paddingRight = extra + "px";
//     }
//   }
// }

function padAllImages() {
  let divWidth = document.body.querySelector(".slider_box").offsetWidth;
  for(let i = 0; i < images.length; i++) {
    let thisWidth = images[i].offsetWidth;
    images[i].style.paddingLeft = ((divWidth - thisWidth) / 2) + "px";
    images[i].style.paddingRight = ((divWidth - thisWidth) / 2) + "px";
  }
}

function moveLeft(element) {
  element.style.transition = "transform 0.5s ease-in-out";
  currentPosition += images[currentImage].offsetWidth;
  element.style.transform = "translateX(" + currentPosition + "px)";
  currentImage -= 1; // decrementing syntax caused hoisting problems

  if (currentImage < 0) {
    let finalImagePosition = Array.from(images).reduce((a, b) => a + b.offsetWidth, 0) - images[images.length - 1].offsetWidth; // this is not a very good system. Maybe I should add some kind of lookup system, where it finds the current position of the final image on-the-fly.
    currentImage = images.length - 1;
    currentPosition = -(finalImagePosition);
    element.style.transform = "translateX(" +currentPosition + "px)";
  }
}

function moveRight(element) {
  element.style.transition = "transform 0.5s ease-in-out";
  currentPosition -= images[currentImage].offsetWidth;
  element.style.transform = "translateX(" +currentPosition + "px)";
  currentImage += 1; // decrementing syntax caused hoisting problems


  if (currentImage > images.length - 1) {
    element.style.transition = "none";
    console.log(currentImage +currentPosition)
    currentImage = 0;
    currentPosition = 0;
    element.style.transform = "translateX(" +currentPosition + ")";
  }
}

/*
IMAGES from left to right have indexes 0..6
moveLeft should:
  - bring on the image to the left
  - it should decrease the index by 1
  - move imageStrip Right
  - it should increase thecurrentPosition, which is distance from the left margin
*/
