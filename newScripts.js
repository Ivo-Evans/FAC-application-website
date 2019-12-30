let imageSet = document.querySelectorAll(".image");
let imageStrip = document.querySelector(".carousel_images");
let jumpWidth = imageStrip.offsetWidth; // this won't be variable
let pixelPosition = 0;
let currentPicture = 0;
let numberOfPictures = imageSet.count
move(-1); // this is ad-hoc, clearly

function move(n) {
  imageStrip.style.transition = "transform 0.15s ease-in-out";
  jumpWidth = document.querySelector(".carousel_images").offsetWidth;
  pixelPosition += (n * jumpWidth);
  currentPicture -= n // pixel position decreases for every picture increase
  imageStrip.style.transform = "translateX(" + pixelPosition + "px)"
}

function revertPosition() {
  console.log(currentPicture);
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

// currently, resize really messes things up. I see two problems (there may be more). Firstly, the image on the screen goes to the wrong place instantly on resize. Secondly, I think, image distance needs to be recalibrated. One thing you could do is assign all your variables on load, and assign them all on resize.
