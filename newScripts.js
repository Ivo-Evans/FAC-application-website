'use strict';

let imageSet = document.querySelectorAll(".image");
let imageStrip = document.querySelector(".carousel_images");
let jumpWidth = imageStrip.offsetWidth; // this won't be variable
let pixelPosition = -jumpWidth;
imageStrip.style.transform = "translateX(" + -jumpWidth + "px)"
let currentPicture = 1; // 0 is a looping picture, as is 9
let numberOfPictures = imageSet.count

document.getElementById('leftButton').addEventListener('click', () => move(1));
document.getElementById('rightButton').addEventListener('click', () => move(-1));
imageStrip.addEventListener('transitionend', revertPosition);
document.body.querySelector(".carousel_dots").addEventListener('click', dotNav);


function move(n) {
  imageStrip.style.transition = "transform 0.15s ease-in-out";
  jumpWidth = document.querySelector(".carousel_images").offsetWidth; // this should only be redefined here temporarily. Later, it should be part of a resize listener's callback.
  pixelPosition += (n * jumpWidth);
  currentPicture -= n // pixel position decreases for every picture increase
  imageStrip.style.transform = "translateX(" + pixelPosition + "px)"
}

function revertPosition() {
  imageStrip.style.transition = "none";
  if (currentPicture >= 9) {
    console.log(currentPicture);
    console.log(jumpWidth);
    currentPicture = 1;
    pixelPosition = - (jumpWidth);
  } else if (currentPicture <= 0) {
    currentPicture = 8;
    pixelPosition -= jumpWidth * 8;
  }
  imageStrip.style.transform = "translateX(" + pixelPosition + "px)";
}

function dotNav(event) {
  let target = event.target;
  console.log(target.tagName);
  if (target.tagName == "BUTTON") {
    console.log(target.id);
    move(currentPicture - (+target.id));
  }
  /* make it go the shortest possible path.
  if the target is greater than current, you find the positive steps by subtracting current from target

  If the target is lesser than current, you find the positive steps by subtracting the current value from the max and then adding the target

  If the target is greater than current, you find the negative steps by negating ((max - target) + current) // I'm sure there's a better way but I'm sleepy lol.

  If the target is lesser than current, you find the negative steps by subtracting current from the target

  so this would be a two-way conditional that encoded a two-value array. We'd then call move(Math.min(...arr)); A nice excuse to practice the rest operator too.
  */
}


// currently, resize really messes things up. I see two problems (there may be more). Firstly, the image on the screen goes to the wrong place instantly on resize. Secondly, I think, image distance needs to be recalibrated. One thing you could do is assign all your variables on load, and assign them all on resize, and call move(0) on resize.



/*
To-Dos
TODO: try to nip resize issues in the bud
TODO: add timer function and play/pause function
TODO: enable swipe controls. Keep them simple this time, allow pause. Maybe cause pause button to flash on screen after pause
TODO: captions. You can do it the same way you did it last time, or maybe have them scroll through, pre-attached to their image?? each image could be a separate div?? could be a bit of a drag, a bit of a div pasta...
TODO: add time updater
TODO: style buttons for desktop. Keep dots visible for both desktop and mobile users.


*/
