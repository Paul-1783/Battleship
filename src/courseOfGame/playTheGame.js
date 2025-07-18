import gameFront from "../gameboardFrontend/gameboardFrontend";

export default async function playTheGame(player1, player2) {
  if (typeof globalThis.clickedIt === "undefined") {
    Object.defineProperty(globalThis, "clickedIt", {
      value: null,
      enumerable: false,
      configurable: true,
      writable: true,
    });
  }

  let i = 0;
  let clickedIndex = null;

  const listOfButtonNodesPlayer1 = gameFront.getBoardPlayer1().childNodes;
  const listOfButtonNodesPlayer2 = gameFront.getBoardPlayer2().childNodes;

  for (let button of listOfButtonNodesPlayer1) addButtonsToEventBus(button);

  for (let button of listOfButtonNodesPlayer2) addButtonsToEventBus(button);

  while (
    !player1.getPlayerGameBoard().isFleetSunk() ||
    !player2.getPlayerGameBoard().isFleetSunk()
  ) {
    let buttonAlreadyPressed = await playOneRound(player1, player2, i);
    if (buttonAlreadyPressed) ++i;
  }

  if (player1.getPlayerGameBoard().isFleetSunk())
    gameFront.setInfoTable(
      `${player2.getPlayerName()}, your're the winnner, congratulations.`
    );
  else if (player2.getPlayerGameBoard().isFleetSunk())
    gameFront.setInfoTable(
      `${player1.getPlayerName()}, your're the winnner, congratulations.`
    );
}

async function playOneRound(player1, player2, i) {
  if (i % 2 === 0) {
    gameFront.setInfoTable(`${player1.getPlayerName()}, take your shot.`);
    gameFront.disableBoard("player1");
    gameFront.enableBoard("player2");
  } else {
    gameFront.setInfoTable(`${player2.getPlayerName()}, take your shot.`);
    gameFront.disableBoard("player2");
    gameFront.enableBoard("player1");
  }
  let returnedIndex = await waitForButtonPressFunction();
  const coordinates = getCoordinates(returnedIndex);
  if (i % 2 === 0) {
    let status = player1.getPlayerGameBoard().getFieldStatus(coordinates);
    if (status === "hit" || status === "miss") return false;

    player1.getPlayerGameBoard().receiveAttack(coordinates);
    gameFront.updatePlayerTable(
      "player1",
      returnedIndex,
      player1.getPlayerGameBoard().getFieldStatus(coordinates)
    );
  } else {
    let status = player2.getPlayerGameBoard().getFieldStatus(coordinates);
    if (status === "hit" || status === "miss") return false;

    player2.getPlayerGameBoard().receiveAttack(coordinates);
    gameFront.updatePlayerTable(
      "player2",
      returnedIndex,
      player2.getPlayerGameBoard().getFieldStatus(coordinates)
    );
  }
  return true;
}

function getCoordinates(indexNumber) {
  return [(indexNumber - (indexNumber % 10)) / 10, indexNumber % 10];
}

function addButtonsToEventBus(field) {
  field.addEventListener("click", () => {
    const index = field.getAttribute("class").split(" ")[1];
    if (typeof globalThis.clickedIt === "function") globalThis.clickedIt(index);
  });
}

function waitForButtonPressFunction() {
  return new Promise((resolve) => {
    globalThis.clickedIt = resolve;
  });
}
