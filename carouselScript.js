'use strict';

const images = document.querySelectorAll(".image");
let currentImage = 0;

const rightButton = document.getElementById("rightButton");
const leftButton = document.getElementById("leftButton");

rightButton.addEventListener('click', moveRight);
leftButton.addEventListener('click', moveLeft);

function moveRight() { // I believe that this is the event *handler*, and the event listener has no binding.
  // console.log("moveRight thinks currentImage is " + currentImage)
  currentImage >= images.length - 1 ? changeImage(0) : changeImage(+currentImage + 1); //  notice type conversion. It is important, because moveRight was sometimes calling changeImage(41) or (61).
}

function moveLeft() {
  currentImage <= 0 ? changeImage(images.length - 1) : changeImage(+currentImage - 1);
}

function changeImage(to) {
  // console.log("changeImage is trying to change the image to " + to);
  Array.from(images).forEach(im => im.classList.remove("visible_image"));
  Array.from(images).forEach(im => im.classList.add("hidden_image"));
  images[to].classList.remove("hidden_image");
  images[to].classList.add("visible_image"); // perhaps this process could be optimised, bearing in mind CSS class precedence (a given thing can have two incompatible classes and the later declaration takes precedence)
  currentImage = to;
  // console.log("after changeImage's work, currentImage is " + currentImage);
}

let play = setInterval(() => moveRight(), 5000);
let playing = true

const playPauseButton = document.getElementById("playPause");
playPauseButton.addEventListener('click', playPause);

function playPause() {
  playing ? clearInterval(play) : play = setInterval(() => moveRight(), 5000) ;
  playing = !playing;
}

let touchArea = document.querySelector(".carousel_images");
touchArea.addEventListener('touchstart', logStart);
touchArea.addEventListener('touchend', mobileSliderNav);
let startX = 0;

function logStart(touches) { // maybe this could be a function Expression, inside the addEventListener, instead of a separate, declared function.
  startX = parseInt(touches.changedTouches[0].clientX);
  touches.preventDefault(); // necessary? I don't know but better to remove later than earlier
}

function mobileSliderNav(touchends) {
  let endX = touchends.changedTouches[0].clientX;

  if (Math.abs(startX - endX) > 10) {
    startX < endX ? moveLeft() : moveRight();
  } else {
    let quartile = touchArea.offsetWidth / 4;
    let guestimatedTap = (startX + endX) / 2;
    if (guestimatedTap < quartile) {
      moveLeft();
    } else if (guestimatedTap > touchArea.offsetWidth - quartile) {
      moveRight();
    } else {
      playPause();
    }
  }
  touchends.preventDefault()
}


const dots = document.body.querySelector(".carousel_dots_set");
dots.addEventListener('click', dotNav);

function dotNav(event) {
  let target = event.target;
  // try {changeImage(target.innerText - 1)}
  try {
    // console.log("dotNav is trying to call changeImage with " + target.id);
    changeImage(target.id)
  }
  catch(err) {
    // console.log("dotNav was called couldn't call changeImage with a button ID, is calling chaneImage with " + currentImage);
    changeImage(currentImage)}
}




/*
TODO: see whether this works with differently-sized images. It might.
TODO: add caption support?
TODO: investigate using JS to animate the transtition??? Therefore going above and beyond the objectives of this expedition? For instance, you could send the old image 50000 pixels (maybe thats too much lol) to the left/right - but then how would you get the new one from the other side??
TODO: style buttons
*/
