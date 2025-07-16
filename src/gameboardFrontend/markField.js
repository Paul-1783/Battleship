export default function markField(chosenBackground, index, boardFrontPart) {
  let listOfNodes = boardFrontPart.childNodes;
  listOfNodes.forEach((field) => {
    if (field.getAttribute("class").split(" ")[1] === index.toString())
      field.classList.add(chosenBackground);
  });
}
