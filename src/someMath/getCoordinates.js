export default function getCoordinates(indexNumber) {
  return [(indexNumber - (indexNumber % 10)) / 10, indexNumber % 10];
}
