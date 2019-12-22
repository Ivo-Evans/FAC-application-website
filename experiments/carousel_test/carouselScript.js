const imageStrip = document.body.querySelector(".images");
const images = document.body.querySelectorAll(".images img")
const finalImagePosition = Array.from(images).reduce((a, b) => a + b.offsetWidth, 0) - images[images.length - 1].offsetWidth; // this is not a very good system. Maybe I should add some kind of lookup system, where it finds the current position of the final image on-the-fly.
const rightButton = document.getElementById("rButton");
const leftButton = document.getElementById("lButton");

let currentImage = 0;
let currentPosition = 0;

// padNarrowImages();
padAllImages()
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
  currentPosition += images[currentImage].offsetWidth;
  element.style.transform = "translateX(" + currentPosition + "px)";
  currentImage -= 1; // decrementing syntax caused hoisting problems

  if (currentImage < 0) {
    currentImage = images.length - 1;
    currentPosition = -(finalImagePosition);
    element.style.transform = "translateX(" +currentPosition + "px)";
  }
}

function moveRight(element) {
  currentPosition -= images[currentImage].offsetWidth;
  element.style.transform = "translateX(" +currentPosition + "px)";
  currentImage += 1; // decrementing syntax caused hoisting problems


  if (currentImage > images.length - 1) {
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
