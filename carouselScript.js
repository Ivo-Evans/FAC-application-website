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

const dotSet = document.body.querySelector(".carousel_dots_set");
dotSet.addEventListener('click', dotNav);

function dotNav(event) {
  let target = event.target;
  if (target.tagName == "BUTTON") {
    try {
      // console.log("dotNav is trying to call changeImage with " + target.id);
      changeImage(target.id)
    }
    catch(err) {
      // console.log("dotNav was called couldn't call changeImage with a button ID, is calling chaneImage with " + currentImage);
      changeImage(currentImage)}
  }
}

const indexedDots = dotSet.firstElementChild.children
const captionBox = document.querySelector(".captions")

function changeImage(to) {
  images[currentImage].classList.remove("visible_image");
  images[currentImage].classList.add("hidden_image");
  indexedDots[currentImage].firstElementChild.classList.remove("current_dot")

  currentImage = to;

  images[currentImage].classList.remove("hidden_image");
  images[currentImage].classList.add("visible_image");
  indexedDots[currentImage].firstElementChild.classList.add('current_dot');
  captionBox.innerText = images[currentImage].alt;
}

let touchArea = document.querySelector(".carousel_images");
touchArea.addEventListener('touchstart', logStart);
touchArea.addEventListener('touchend', mobileSliderNav);
let startX = 0;

function logStart(touches) { // maybe this could be a function Expression, inside the addEventListener, instead of a separate, declared function.
  startX = parseInt(touches.changedTouches[0].clientX);
  touches.preventDefault(); // TODO: you might want to disable these prevent default's, because it makes it difficult to slide the page down on mobile. In landscape view, I even stranded myself in the middle of the picture, unable to move... lol.
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

let play = setInterval(() => moveRight(), 5000);
let playing = true

const playPauseButton = document.getElementById("playPause");
playPauseButton.addEventListener('click', playPause);

function playPause() {
  playing ? clearInterval(play) : play = setInterval(() => moveRight(), 5000) ;
  playing = !playing;
  playPauseButton.classList.toggle("fa-pause");
  playPauseButton.classList.toggle("fa-play");
}

/*
TODO: see whether this works with differently-sized images. It might.
*/
