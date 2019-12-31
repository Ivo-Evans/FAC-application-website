let imageSet = document.querySelectorAll(".image");
let imageStrip = document.querySelector(".carousel_images");
let jumpWidth = imageStrip.offsetWidth; // this won't be variable
let pixelPosition = -jumpWidth;
imageStrip.style.transform = "translateX(" + -jumpWidth + "px)"
let currentPicture = 1; // 0 is a looping picture
let numberOfPictures = imageSet.count
// move(-1); // this is ad-hoc, clearly. Perhaps declare variables, then assign them on load. At the same time as assignment, call imageStrip.style.transform yada yada yada. There should also be an onresize handler which calls move(0) and reassigns some variables.

document.getElementById('leftButton').addEventListener('click', () => move(1));
document.getElementById('rightButton').addEventListener('click', () => move(-1));



function move(n) {
  imageStrip.style.transition = "transform 0.15s ease-in-out";
  jumpWidth = document.querySelector(".carousel_images").offsetWidth;
  pixelPosition += (n * jumpWidth);
  currentPicture -= n // pixel position decreases for every picture increase
  imageStrip.style.transform = "translateX(" + pixelPosition + "px)"
}

function revertPosition() {
  imageStrip.style.transition = "none";
  if (currentPicture == 9) {
    console.log(currentPicture);
    console.log(jumpWidth);
    currentPicture = 1;
    pixelPosition = - (jumpWidth);
  } else if (currentPicture == 0) {
    currentPicture = 8;
    pixelPosition -= jumpWidth * 8;
  }
  imageStrip.style.transform = "translateX(" + pixelPosition + "px)";
}

imageStrip.addEventListener('transitionend', revertPosition);


// function comboTest() {
//   move(-8);
//   revertPosition();
//   move(-3);
// } Success!!! No jaggedy movement!!! Clever CSS!!!

// currently, resize really messes things up. I see two problems (there may be more). Firstly, the image on the screen goes to the wrong place instantly on resize. Secondly, I think, image distance needs to be recalibrated. One thing you could do is assign all your variables on load, and assign them all on resize.
