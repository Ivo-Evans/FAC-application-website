'use strict';

let imageSet = document.querySelectorAll(".image");
let imagesHandle = document.querySelector(".carousel_images"); // this updates intelligently
let jumpWidth
let pixelPosition
let currentPicture = 1; // 0 is a looping picture, as is 9
let numberOfPictures = imageSet.count - 2// still haven't actually used this....
let indexedDots = document.querySelectorAll(".carousel_dots button")

recalibrate();
window.addEventListener('resize', recalibrate);

function recalibrate() {
  jumpWidth = imagesHandle.offsetWidth;
  pixelPosition = -(currentPicture * jumpWidth);
  imagesHandle.style.transform = "translateX(" + pixelPosition + "px)"
}


document.getElementById('leftButton').addEventListener('click', () => move(1));
document.getElementById('rightButton').addEventListener('click', () => move(-1));
imagesHandle.addEventListener('transitionend', revertPosition);
document.body.querySelector(".carousel_dots").addEventListener('click', dotNav);
window.addEventListener('keydown', (keypress) => {
  if (keypress.key == "ArrowLeft") {move(1)}
  if (keypress.key == "ArrowRight") {move(-1)}
  if (keypress.key == " ") {
    keypress.preventDefault();
    playPause();
  }
})

function move(n) {
  if (currentPicture > 8 || currentPicture < 1) {return};
  // guard clause stops increases so fast that revertPosition()'s listener never hears them
  indexedDots[currentPicture - 1].classList.remove("current_dot");
  imagesHandle.style.transition = "transform 0.15s ease-in-out";
  pixelPosition += (n * jumpWidth);
  currentPicture -= n // pixel position increases - goes rightward for every picture decrease - go to an earlier picture
  imagesHandle.style.transform = "translateX(" + pixelPosition + "px)";

  try {indexedDots[currentPicture - 1].classList.add("current_dot")}
  catch {n > 0 ? indexedDots[indexedDots.length - 1].classList.add("current_dot")
      : indexedDots[0].classList.add("current_dot")};

  playPause('reset');
}

function revertPosition() {
  imagesHandle.style.transition = "none";
  if (currentPicture >= 9) {
    currentPicture = 1;
    pixelPosition = - (jumpWidth);
  } else if (currentPicture <= 0) {
    currentPicture = 8;
    pixelPosition -= jumpWidth * 8;
  }
  imagesHandle.style.transform = "translateX(" + pixelPosition + "px)";
}

function dotNav(event) {
  let target = event.target;
  if (target.tagName == "BUTTON") {
    move(currentPicture - (+target.id));
  }
}

let touchArea = document.querySelector(".carousel");
touchArea.addEventListener('touchstart', logStart);
touchArea.addEventListener('touchend', mobileSliderNav);

let touchableButton = document.getElementById('playPause');
touchableButton.addEventListener('touchstart', logStart);
touchableButton.addEventListener('touchend', mobileSliderNav);

let startX = 0;

function logStart(touches) {startX = parseInt(touches.changedTouches[0].clientX)}

function mobileSliderNav(touchends) {
  let endX = touchends.changedTouches[0].clientX;

  if (Math.abs(startX - endX) > 10) {
    startX < endX ? move(1) : move(-1);
  } else {
    playPause()
    temporaryPlayPauseButton(); // I'm going to give this a **provisional** pass - it looks like it works on my android. There were some bugs I couldn't replicate. If it doesn't work, and you decide to delete, be aware that there is mobile css styling for #playPause that you should also delete.
  }
}

function temporaryPlayPauseButton() {
  let imageHeight = imageSet[0].firstElementChild.offsetHeight;
  let imageWidth = imageSet[0].firstElementChild.offsetWidth;
 // this is clearly quite an involved approach but CSS was giving me grief.
  playPauseButton.style.display = "inline"
  playPauseButton.style.left = (imageWidth - playPauseButton.offsetWidth) / 2 + "px";
  playPauseButton.style.top = (imageHeight - playPauseButton.offsetHeight) / 2 + "px";
  setTimeout(() => playPauseButton.style.display = "none", 2000)
}

let playPauseButton = document.getElementById("playPause")
playPauseButton.addEventListener('click', playPause);
let play = setInterval(() => move(-1), 7000); // duration could be shorter if actual transition was longer
let playing = true;

function playPause(flag) {
  if (flag == 'reset') {
    if (playing) {
      clearInterval(play);
      play = setInterval(() => move(-1), 7000);
    } else {
      return;
    }
  } else {
    playing ? clearInterval(play) : play = setInterval(() => move(-1), 7000) ;
    playing = !playing;
    playPauseButton.classList.toggle("fa-pause");
    playPauseButton.classList.toggle("fa-play");
  }
}

window.addEventListener('load', () => {
  let iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
  console.log(iOS);
  if (iOS) {
    Array.from(indexedDots).forEach(dot => {
      dot.style.height = "21px";
      dot.style.width = "21px";
    })
  }
})
// I can't claim to understand exactly how the code determining the value of iOS works, but I can tell you why I found it on Stack Overflow, and why I put it in here last-minute (plus I do have a basic grasp of the variable). Sizing buttons as circles is a bit finnickity: unless you set a sufficiently high minimum height, they style as ovals. It seems that this minimum height is higher on iPhones than on android, windows Chrome and Mac Safari. Thus, nice small dots on other browsers were stretched on iPhones. To make them circular, I had to enlarge the dots, but I didn't want to do that on all browsers, so I found code to detect the device being used, and enlarged the dots on Iphone only. The ovals actually looked okay, but once I'd found the iOS variable, I thought it was too cool not to put in.



/*
To-Dos
TODO: finish work on experimental dot feature??
*/
