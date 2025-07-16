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
    await playOneRound(player1, player2, ++i);
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
  console.log("hier ", i);

  if (i % 2 !== 0) {
    gameFront.setInfoTable("Player 1, take your shot.");
  } else {
    gameFront.setInfoTable("Player 2, take your shot.");
  }
  let returnedIndex = await waitForButtonPressFunction();
  console.log("between", returnedIndex);
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
