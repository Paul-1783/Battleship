export default function Ship(s) {
  let shipLength = getShipLength(s);
  let timesHit = 0;
  let shipClass = s;

  function getShipLength(s) {
    if (s === "carrier") {
      return 5;
    } else if (s === "battleship") {
      return 4;
    } else if (s === "cruiser") {
      return 3;
    } else if (s === "submarine") {
      return 3;
    } else if (s === "destroyer") {
      return 2;
    }
  }

  function hit() {
    timesHit = timesHit + 1;
    return timesHit;
  }
  function isSunk() {
    // console.log("timesHit: ", timesHit, " shipLength: ", shipLength);
    if (timesHit === shipLength) return true;
    return false;
  }

  function getLength() {
    return shipLength;
  }

  function getShipClass() {
    return shipClass;
  }

  return { hit, isSunk, getLength, getShipClass };
}
