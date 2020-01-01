let numberOfPictures = imageSet.length - 2
function dotNav(event) {
  let target = event.target;
  if (target.tagName == "BUTTON") {
    let distance = calculateJumpDistance(+target.id);
    console.log(distance)
    // after calculating jump distance, you need to calculate whether that distance takes you over a boundary. If it does, you have to do it in two steps, separated by revertPosition(). Alternately to calculating boundaries you could do some moduloing or something to possibly call move(0), which does nothing.
    move(distance);
  }

  function calculateJumpDistance(target) {
    let distances = target > currentPicture ?
      [(target - currentPicture), -((numberOfPictures - target) + currentPicture)]
      : [(numberOfPictures - currentPicture + target), (target - currentPicture)];
    // console.log(distances)
    return -(distances.sort((a, b) => Math.abs(a) - Math.abs(b))[0])
  }
  /* make it go the shortest possible path.
  if the target is greater than current, you find the positive steps by subtracting current from target

  If the target is lesser than current, you find the positive steps by subtracting the current value from the max and then adding the target

  If the target is greater than current, you find the negative steps by negating ((max - target) + current) // I'm sure there's a better way but I'm sleepy lol.

  If the target is lesser than current, you find the negative steps by subtracting current from the target

  so this would be a two-way conditional that encoded a two-value array. We'd then call move(Math.min(...arr)); A nice excuse to practice the rest operator too.
  */
}

function moveLongWay() {
  move(-3);
  revertPosition();
  move(-3);
}
