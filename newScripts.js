let imageSet = document.querySelectorAll(".image");
let imageStrip = document.querySelector(".carousel_images");
let jumpWidth = imageStrip.offsetWidth; // this won't be variable
let pixelPosition = 0;

function move(n) {
  imageStrip.style.transition = "transform 0.5s ease-in-out";
  jumpWidth = document.querySelector(".carousel_images").offsetWidth;
  pixelPosition += (n * jumpWidth);
  imageStrip.style.transform = "translateX(" + pixelPosition + "px)"
}

// currently, resize really messes things up. I see two problems (there may be more). Firstly, the image on the screen goes to the wrong place instantly on resize. Secondly, I think, image distance needs to be recalibrated. One thing you could do is assign all your variables on load, and assign them all on resize.
