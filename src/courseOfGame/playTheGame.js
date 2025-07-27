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

  const listOfButtonNodesPlayer1 = gameFront.getBoardPlayer1().childNodes;
  const listOfButtonNodesPlayer2 = gameFront.getBoardPlayer2().childNodes;

  for (let button of listOfButtonNodesPlayer1) addButtonsToEventBus(button);
  for (let button of listOfButtonNodesPlayer2) addButtonsToEventBus(button);
  let i = 0;
  while (
    !player1.getPlayerGameBoard().isFleetSunk() &&
    !player2.getPlayerGameBoard().isFleetSunk()
  ) {
    let buttonAlreadyPressed = await playOneRound(player1, player2, i);
    if (buttonAlreadyPressed) ++i;
  }

  if (player1.getPlayerGameBoard().isFleetSunk()) {
    gameFront.setInfoTable(
      `${player2.getPlayerName()}, your're the winnner, congratulations.`
    );
  } else if (player2.getPlayerGameBoard().isFleetSunk())
    gameFront.setInfoTable(
      `${player1.getPlayerName()}, your're the winnner, congratulations.`
    );
}

async function playOneRound(player1, player2, i) {
  let returnedIndex;

  if (i % 2 === 0) {
    gameFront.setInfoTable(`${player1.getPlayerName()}, take your shot.`);
    gameFront.disableBoard("player1");
    gameFront.enableBoard("player2");
    if (player1.getTypeOfPlayer() === "real") {
      returnedIndex = await waitForButtonPressFunction();
    } else {
      returnedIndex = await aiTakesAShot();
    }
  } else {
    gameFront.setInfoTable(`${player2.getPlayerName()}, take your shot.`);
    gameFront.disableBoard("player2");
    gameFront.enableBoard("player1");
    if (player2.getTypeOfPlayer() === "real") {
      returnedIndex = await waitForButtonPressFunction();
    } else {
      returnedIndex = await aiTakesAShot();
    }
  }

  const coordinates = getCoordinates(returnedIndex);

  if (i % 2 === 0) {
    let status = player2.getPlayerGameBoard().getFieldStatus(coordinates);
    if (status === "hit" || status === "miss") {
      gameFront.makeASnappyComment(
        "Waste no ammunition, Admiral, you already shot at that spot."
      );
      return false;
    }

    let comment = player2.getPlayerGameBoard().receiveAttack(coordinates);
    gameFront.makeASnappyComment(comment);
    gameFront.updatePlayerTable(
      "player2",
      returnedIndex,
      player2.getPlayerGameBoard().getFieldStatus(coordinates)
    );
  } else {
    let status = player1.getPlayerGameBoard().getFieldStatus(coordinates);
    if (status === "hit" || status === "miss") {
      gameFront.makeASnappyComment(
        "Waste no ammunition, Admiral, you already shot at that area."
      );
      return false;
    }

    let comment = player1.getPlayerGameBoard().receiveAttack(coordinates);
    gameFront.makeASnappyComment(comment);
    gameFront.updatePlayerTable(
      "player1",
      returnedIndex,
      player1.getPlayerGameBoard().getFieldStatus(coordinates)
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

async function aiTakesAShot() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return Math.floor(Math.random() * 100).toString();
}
