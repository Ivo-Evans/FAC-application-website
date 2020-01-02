Thanks for checking out my website. I wanted to make a retro looking website with lots of sharp corners, block colours and fast transitions, which was nevertheless modern on the inside - a website for programmers. I hope you like it. You can find it here:

https://github.com/ievans147/FAC-application-website

## Optimisation ##

### Responsivity ###

For responsivity I opted for two different stylesheets, with different rules. I think this was quite a good decision: it makes my code less DRY, but it also makes it cleaner, because I do not have to deal with conflicts between CSS rules. I found I could leave certain rules undefined in one stylesheet or the other, thus giving me more control.

The mobile stylesheet is styled less, but to similar effect. The mobile view features a single, collapsible header, in contrast to the desktop's double, non-collapsible headers. These headers are all separate HTML elements, so there are three headers in the html file. Had I known about CSS grid when writing the website, I probably would have tried to use it.


### Accessibility ###

Luckily, the aesthetic of my website created a lot of colour-contrast. To aid accessibility, I also supplied alt text to images and specified the language. Headers within the main element follow on in size from headers in the header element and from each other, but headers in the navbars do not. In general, the navbar system is an area of weakness for accessibility: having three navbars is hard on a screen reader. Again, CSS grid might have the answers for future projects.


### Semantic HTML ###

I tried to use semantic html tags wherever possible, and divs only when there was no good semantic equivalent.


### Speed ###

I improved load speed using an analysis from https://gtmetrix.com/ . To improve load speed I made sure to serve images which were as small as possible while still being consistently high-resolution. I opted to serve them at 2x the size at which they were displayed on a desktop, and this helped a lot.

I also inlined some JavaScript. I have two distinct scripts in my program, one for the image slider and one for the collapsible navbar, which is visible only on mobiles. The collapsible navbar uses simple JavaScript, so I inlined it.

I also randomly select my selfie with JavaScript - that's just a bit of fun, but it's in the same script tags as the navbar.

## The image slider ##

### The story of my image slider, told in commits ###
...is a trilogy.

First, I tried to make an ambitious, CSS heavy image slider in the main repo. The idea was to get a strip of differently sized images, pad each one so that it was the width of the page if and only if necessary, and then pull them from left to right along the page by the same distance. However, at the time, I didn't know enough CSS, and I soon found myself wading through code I no longer really understood, poking things and hoping the system would magically become fixed.

So I went back to the drawing board, and developed a simpler carousel that switched images from display: none to display: block. I made it in a separate repo, because I didn't want to pollute my commit history with another attempt, and I didn't know how to branch at that point. When I was happy with it, I copied it into the main repo, and continued to refine it.

I learnt a lot making the static navbar. But after I finished it I had no coding to do. I started dreaming of my old slider again - reimagined in the light of my new knowledge. So I set to work. This time, I branched the main repo, and worked there. I used images of specific sizes, so that I didn't have to do any varying padding. I paid attention to the position property and its various values. The result was, I think, quite successful.


### How it works ###

I find it can be difficult to start to get to grips with someone else's code, so I thought I could just describe it.


#### Stage 1: declare measurement variables ####

The first thing the program does on launch is declare a number of variables. These include

- imageSet - a NodeList of images
- imagesHandle - the div that the first image sits in, and the rest are 'supposed' to sit in
- jumpWidth - declared but not assigned
- pixelPosition - position of imagesHandle - declared but not assigned
- currentPicture - initialised to 1; images 0 and 9 are duplicates of opposite images
- indexedDots - a NodeList of the dots in the ul that allow navigation
- playing - a boolean initialised to true, which represents whether the carousel is automatically moving


#### Stage 2: stick measurement variables to the state of the window ####

Something that really bugged me, at the beginning, was that resizing the page threw everything out.

So I wrote a recalibrate() function, that:
- defines jumpWidth based on the current width of the page
- uses currentPicture and jumpWidth to assign a value to pixelPosition
- moves imageSet[currentPicture] into the middle of the viewport

I call recalibrate once when the script is loaded, and then provide it as a callback to a resize event listener.


#### Stage 3: add event listeners and setInterval() ####

Three kinds of events predictably cause a left-transition:
1. press the left arrow icon
2. press the left keyboard key
3. Swipe left on a smartphone

Four things cause a right-transition:
1. The right arrow icon
2. The right arrow key
3. Swiping right on a smartphone
4. setInterval(), and the associated playPause() function

One thing causes a varying transition:
1. clicking on a dot uses the id of the dot to go a specific distance.

All these functions work by calling move(n). A minus value for n represents a rightward movement, because the imagesHandle is dragged back by Math.abs(n) jump widths. A positive value represents a rightward movement, for the same reason.

Events also sometimes call back with playPause, which toggles the play setting. Three kinds of events call playPause:
1. clicking the pause button
2. pressing space
3. tapping the image carousel

Finally, there is an event listener registered on transition, which calls revertPosition(). The purpose of this is to create a loop effect by secretly traversing imageSet if the user reaches buffer images 0 or 9. If they reach 9, the image switches to 1, and if they reach 0, it switches to 8.


#### Stage 4: the fundamental movement functions ####

move(n) does a number of things
- It restyles the dots by changing their class
- It updates pixelPosition and currentImage
- It establishes a smooth transition for image movement
- It moves the imagesHandle by n * jumpWidth
- It calls playPause('reset'), which resets the timer

There are two kinds of exception handling in this method.

The first is a guard clause. With keydown navigation, it was easy to scroll faster than events could finish, thus interfering with revertPosition(). Now, if the currentPosition is out, move(n) returns prematurely.

The second is a try{} catch{} structure. It says that, if the user is trying to scroll too fast, dot styling should be applied to the first dot if they are trying to move rightward, and the last dot if they are trying to move leftward. I'm not entirely happy with this solution - it does prevent errors, but it means that, during fast scrolling, the dot is always in one place.

The other essential movement function is revertPosition(). If the user is in a buffer image, this adjusts currentPicture and pixelPosition to the image's non-buffer equivalent, then moves them to that position with no transition.


#### Stage 5: dot and swipe-based navigation ####

dotNav is registered on the div carousel_dots as a click event handler. The click on a specific button bubbles up to the div. If the target of the click is a button, dotNav converts the id, which will be a string "0".."9", into a number representing the jump distance, and calls move() with that number.

Swipe control uses two event listeners, but first, I declare a variable, startX. The function logStart is the callback of the touchstart event, and records the x-position of the first finger to touch the touchable area to startX. mobileSliderNav() is the callback to touchend. It records endX, and compares startX with endX. If the total distance is less than 10px, the user's touch is registered as a tap, and playPause() is called along with temporaryPlayPauseButton(). If the total distance is longer than 10px, move(1) is called if it is negative, and move(-1) is called if it is positive.


#### Stage 6: timing methods ####

playPause() is a two-in-one method. I tried to make it two separate methods, but this caused problems.

playPause() takes a flag argument. The most basic use of playPause is when no flag is provided. In this case, it:
- toggles the play/pause buttons in the desktop stylesheet
- either assigns a setInterval function to variable play, or deassigns the setInterval function, depending on the value of playing
- toggles the value of playing

When a flag is provided to playPause, it serves a different purpose. The only accepted flag is 'reset'. playPause('reset') triggers a conditional: if playing, reset the countdown to its original value, 7 seconds; if !playing, return.

As well as playPause, we have temporaryPlayPauseButton. This is designed to help with tap/swipe navigation. The idea is that, when the user taps the screen, a play or pause icon will flash in the center for 2 seconds. In the function, I first calculate the size of image, then style the playPauseButton, which is set to display: none by default, to display: inline. I use the size calculations to put it in the middle of the visible image, and then set a Timeout to set the icon to display: none after 2 seconds.

Why do I position the icon in JavaScript, not CSS? The issue here is that the icon is positioned relative to its containing div, .carousel, while .carousel is larger than its images because it also contains space for captions and dot navigation. So the center of .carousel is far off the center of the images. Worse, the actual image in the viewport changes, so you can't position the icon relative to the images themselves. And finally, the size of the images changes depending on the screen size, so you can't hardcode the position. JavaScript comes to the rescue. temporaryPlayPauseButton() takes the measurements of an image, and then uses those to position the icon against the top and left of the .carousel div.
