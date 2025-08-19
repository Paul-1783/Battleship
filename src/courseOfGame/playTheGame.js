import gameFront from "../gameboardFrontend/gameboardFrontend";
import getCoordinates from "../someMath/getCoordinates";

async function playTheGame(player1, player2) {
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
      `${player2.getPlayerName()}, your're the winner, congratulations.`
    );
  } else if (player2.getPlayerGameBoard().isFleetSunk())
    gameFront.setInfoTable(
      `${player1.getPlayerName()}, your're the winner, congratulations.`
    );
}

async function playOneRound(player1, player2, i) {
  let returnedIndex;

  // Turn Player 1
  if (i % 2 === 0) {
    gameFront.setInfoTable(`${player1.getPlayerName()}, take your shot.`);
    gameFront.disableBoard("player1");
    gameFront.enableBoard("player2");
    if (player1.isHuman() === true) {
      returnedIndex = await waitForButtonPressFunction();
    } else {
      returnedIndex = await aiTakesAShot();
    }
  }
  // Turn Player 2
  else {
    gameFront.setInfoTable(`${player2.getPlayerName()}, take your shot.`);
    gameFront.disableBoard("player2");
    gameFront.enableBoard("player1");
    if (player2.isHuman() === true) {
      returnedIndex = await waitForButtonPressFunction();
    } else {
      returnedIndex = await aiTakesAShot();
    }
  }

  const coordinates = getCoordinates(returnedIndex);

  // Turn Player 1
  if (i % 2 === 0) {
    let status = player2.getPlayerGameBoard().getFieldStatus(coordinates);
    if (status === "hit" || status === "miss") {
      gameFront.makeASnappyComment(
        "Waste no ammunition, Admiral, you already shot at that spot."
      );
      return false;
    }

    let comment = player2.getPlayerGameBoard().receiveAttack(coordinates);
    setTimeout(gameFront.makeASnappyComment(comment), 2000);
    if (!(player1.isHuman() === true && player2.isHuman() == true)) {
      gameFront.updatePlayerTable(
        "player2",
        returnedIndex,
        player2.getPlayerGameBoard().getFieldStatus(coordinates)
      );
    }
  }
  // Turn Player 2
  else {
    let status = player1.getPlayerGameBoard().getFieldStatus(coordinates);
    if (status === "hit" || status === "miss") {
      gameFront.makeASnappyComment(
        "Waste no ammunition, Admiral, you already shot at that area."
      );
      return false;
    }

    let comment = player1.getPlayerGameBoard().receiveAttack(coordinates);
    gameFront.makeASnappyComment(comment);
    if (!(player1.isHuman() === true && player2.isHuman() == true)) {
      gameFront.updatePlayerTable(
        "player1",
        returnedIndex,
        player1.getPlayerGameBoard().getFieldStatus(coordinates)
      );
    }

    setTimeout(gameFront.makeASnappyComment("encourage"), 2000);
  }
  return true;
}

async function playTheGameWithTwoHumans(player1, player2) {
  if (typeof globalThis.clickedIt === "undefined") {
    Object.defineProperty(globalThis, "clickedIt", {
      value: null,
      enumerable: false,
      configurable: true,
      writable: true,
    });
  }

  if (typeof globalThis.playerIsReady === "undefined") {
    Object.defineProperty(globalThis, "playerIsReady", {
      value: null,
      enumerable: false,
      configurable: true,
      writable: true,
    });
  }

  let i = 0;
  while (
    !player1.getPlayerGameBoard().isFleetSunk() &&
    !player2.getPlayerGameBoard().isFleetSunk()
  ) {
    gameFront.buildGameBoardInGame(
      gameFront.getBaseBody(),
      i % 2 == 0 ? player1 : player2,
      true
    );

    gameFront.hideStartButton();

    const listOfButtonNodesPlayer1 = gameFront.getBoardPlayer1().childNodes;
    const listOfButtonNodesPlayer2 = gameFront.getBoardPlayer2().childNodes;

    for (let button of listOfButtonNodesPlayer1) addButtonsToEventBus(button);
    for (let button of listOfButtonNodesPlayer2) addButtonsToEventBus(button);

    //Start one round, wait for player pressing button
    let buttonAlreadyPressed = await playOneRoundWithTwoHumans(
      player1,
      player2,
      i
    );

    addIntermissionButtonToEventBus(
      gameFront.showIntermediaryDialog(
        i % 2 == 0 ? player2 : player1,
        gameFront.getBaseBody()
      )
    );

    if (buttonAlreadyPressed) await waitForPlayerToBeReadyForNextMove();

    if (buttonAlreadyPressed) ++i;
  }

  if (player1.getPlayerGameBoard().isFleetSunk()) {
    gameFront.setInfoTable(
      `${player2.getPlayerName()}, your're the winner, congratulations.`
    );
  } else if (player2.getPlayerGameBoard().isFleetSunk())
    gameFront.setInfoTable(
      `${player1.getPlayerName()}, your're the winner, congratulations.`
    );
}

async function playOneRoundWithTwoHumans(player1, player2, i) {
  console.log("playOneRoundWithTwoHumans");

  let returnedIndex;
  // Turn Player 1
  if (i % 2 === 0) {
    gameFront.setInfoTable(`${player1.getPlayerName()}, take your shot.`);
    gameFront.disableBoard("player1");
    gameFront.enableBoard("player2");
    if (player1.isHuman() === true) {
      returnedIndex = await waitForButtonPressFunction();
    } else {
      returnedIndex = await aiTakesAShot();
    }
  }
  // Turn Player 2
  else {
    gameFront.setInfoTable(`${player2.getPlayerName()}, take your shot.`);
    gameFront.disableBoard("player2");
    gameFront.enableBoard("player1");
    if (player2.isHuman() === true) {
      returnedIndex = await waitForButtonPressFunction();
    } else {
      returnedIndex = await aiTakesAShot();
    }
  }

  console.log(
    i % 2 === 0
      ? `${player1.getPlayerName()} returnedINdex:`
      : `${player2.getPlayerName()} returnedIndex: `,
    returnedIndex
  );

  const coordinates = getCoordinates(returnedIndex);

  console.log(" coordinates: ", coordinates);

  // Turn Player 1
  if (i % 2 === 0) {
    let status = player2.getPlayerGameBoard().getFieldStatus(coordinates);
    if (status === "hit" || status === "miss") {
      return false;
    } else gameFront.makeASnappyComment("encourage");

    // function for shot fired invoked
    let comment = player2.getPlayerGameBoard().receiveAttack(coordinates);
    gameFront.makeASnappyComment(comment);
    if (!(player1.isHuman() && player2.isHuman())) {
      gameFront.updatePlayerTable(
        "player2",
        returnedIndex,
        player2.getPlayerGameBoard().getFieldStatus(coordinates)
      );
    }

    //   store hits on opposition board
    if (player1.isHuman() === true && player2.isHuman() == true) {
      player1
        .getOppositionGameBoard()
        .updateOppositionBoard(status, coordinates);
    }
  }
  // Turn Player 2
  else {
    let status = player1.getPlayerGameBoard().getFieldStatus(coordinates);
    if (status === "hit" || status === "miss") {
      gameFront.makeASnappyComment(
        "Waste no ammunition, Admiral, you already shot at that area."
      );
      return false;
    } else gameFront.makeASnappyComment("encourage");

    let comment = player1.getPlayerGameBoard().receiveAttack(coordinates);
    console.log("player 2 comment ", comment);
    setTimeout(() => {
      gameFront.makeASnappyComment(comment);
    }, 2000);
    if (!(player1.isHuman() === true && player2.isHuman() == true)) {
      gameFront.updatePlayerTable(
        "player1",
        returnedIndex,
        player1.getPlayerGameBoard().getFieldStatus(coordinates)
      );
    }
    //   store hits on opposition board
    if (player1.isHuman() === true && player2.isHuman() == true) {
      player2
        .getOppositionGameBoard()
        .updateOppositionBoard(status, coordinates);
    }
  }

  return true;
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

function addIntermissionButtonToEventBus(intermissionButton) {
  intermissionButton.addEventListener("click", () => {
    if (typeof globalThis.playerIsReady === "function")
      globalThis.playerIsReady();
  });
}

function waitForPlayerToBeReadyForNextMove() {
  return new Promise((resolve) => {
    globalThis.playerIsReady = resolve;
  });
}

async function aiTakesAShot() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return Math.floor(Math.random() * 100).toString();
}

export { playTheGame, playTheGameWithTwoHumans };
