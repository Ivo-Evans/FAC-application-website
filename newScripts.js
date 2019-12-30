let imageSet = document.querySelectorAll(".image");
let imageStrip = document.querySelector(".carousel_images");
let jumpWidth = imageStrip.offsetWidth; // this won't be variable
let pixelPosition = 0;

function move(n) {
  jumpWidth = document.querySelector(".carousel_images").offsetWidth;
  pixelPosition += (n * jumpWidth);
  imageStrip.style.left = pixelPosition + "px";
}

// currently, resize really messes things up. I see two problems (there may be more). Firstly, the image on the screen goes to the wrong place. Secondly,
