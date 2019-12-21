let imageStrip = document.body.querySelector(".images");
let images = document.body.querySelectorAll(".images img")
let finalImagePosition = Array.from(images).reduce((a, b) => a + b.offsetWidth, 0) - images[images.length - 1].offsetWidth;
let rightButton = document.getElementById("rButton");
let leftButton = document.getElementById("lButton");

let currentImage = 0;
let currentPosition = 0;

padNarrowImages()
rightButton.addEventListener('click', () => {moveRight(imageStrip)});
leftButton.addEventListener('click', () => {moveLeft(imageStrip)});


function padNarrowImages() {
  document.body.style.backgroundColor = "yellow";
  let widest_image = Array.from(images).map(e => e.offsetWidth).sort((a, b) =>  b - a)[0]; // verified
  for(let i = 0; i < images.length; i++) {
    thisWidth = images[i].offsetWidth
    if (thisWidth < widest_image) { // actually does get triggered for 4/6 images
      let extra = (widest_image - thisWidth) / 2;
      console.log("in conditional")
      console.log(images[i].style.paddingLeft)
      images[i].style.paddingLeft = extra + "px"; // the problem must be here
      console.log(images[i].style.paddingLeft)
      images[i].style.paddingRight = extra + "px";
      document.body.style.backgroundColor = "pink";
    }
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
