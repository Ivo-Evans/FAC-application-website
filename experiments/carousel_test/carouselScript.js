// TODO: add wrap images. Sort out indexes within this
// TODO: add dots-nav system. Dots are indexed, and there are the same number of dots as distinct images. Event listener for dots container finds index of dot clicked, compares it to currentImage to find jumpDistanceLeft and jumpDistanceRight. If jumpDistanceLeft > jumpDistanceRight, call moveRight jumpDistanceRight times and then return; else, call moveLeft jumpDistanceLeft times and then return. If this strategy causes display issues from too many transitions, you could write a teleport function that calculates the position of the picture at each index, assigns these positions to an indexed list, and then takes the index of the dot, feeds it into the on-the-fly generated index list of positions, and gives this value to a transform property.
// TODO: add new time if the user clicks left or right: if playing, clearInterval(play) and then play = setInterval(() => moveRight(imageStrip), 3000).
// TODO: sort out planning for medium-sized screens.

const imageStrip = document.body.querySelector(".images");
const images = document.body.querySelectorAll(".images img")

const rightButton = document.getElementById("rButton");
const leftButton = document.getElementById("lButton");
const playPauseButton = document.getElementById("playPause");

let currentImage = 0;
let currentPosition = 0;

adaptiveImagePadding(); // not adaptive here, this sets initial padding. later called by listener
let play = setInterval(() => moveRight(imageStrip), 3000);
let playing = true

playPauseButton.addEventListener('click', playPause);
rightButton.addEventListener('click', () => {moveRight(imageStrip)});
leftButton.addEventListener('click', () => {moveLeft(imageStrip)})
window.addEventListener('resize', adaptiveImagePadding); // n.b lack of parentheses - we include the function but we don't call it.


function playPause() {
  if (playing) {
    clearInterval(play);
  } else {
    play = setInterval(() => moveRight(imageStrip), 3000);
  }
  playing = !playing;
}

function adaptiveImagePadding() {
  let divWidth =  document.body.querySelector(".slider_box").offsetWidth;

  if (window.innerWidth <= 800) {
    for(let i = 0; i < images.length; i++) {
      images[i].style.paddingLeft = "0px";
    }
  } else if (window.innerWidth > 800 ) {
    for(let i = 0; i < images.length; i++) {
      let thisWidth = images[i].offsetWidth;
      images[i].style.paddingLeft = ((divWidth - thisWidth) / 2) + "px";
      images[i].style.paddingRight = ((divWidth - thisWidth) / 2) + "px";
    }
  }
}

function moveLeft(element) {
  element.style.transition = "transform 0.5s ease-in-out";
  currentPosition += images[currentImage].offsetWidth;
  element.style.transform = "translateX(" + currentPosition + "px)";
  currentImage -= 1; // decrementing syntax caused hoisting problems

  if (currentImage < 0) {
    let finalImagePosition = Array.from(images).reduce((a, b) => a + b.offsetWidth, 0) - images[images.length - 1].offsetWidth;
    element.style.transition = "none";
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


// function padAllImages() {
  //   let divWidth =  document.body.querySelector(".slider_box").offsetWidth;
  //   for(let i = 0; i < images.length; i++) {
  //     let thisWidth = images[i].offsetWidth;
  //     images[i].style.paddingLeft = ((divWidth - thisWidth) / 2) + "px";
  //     images[i].style.paddingRight = ((divWidth - thisWidth) / 2) + "px";
  //   }
  // }
