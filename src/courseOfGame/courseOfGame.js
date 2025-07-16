import gameFront from "../gameboardFrontend/gameboardFrontend";

let oneRound = (function () {
  function initializeGame(player1, player2) {
    populate1Board(
      player1,
      player1.getPlayerGameBoard(),
      gameFront.getBoardPlayer1()
    );

    populate1Board(
      player2,
      player2.getPlayerGameBoard(),
      gameFront.getBoardPlayer2()
    );
  }

  return { initializeGame };
})();

function populate1Board(player, boardLogicPart, boardFrontPart) {
  //Player board logic
  boardLogicPart.placeShip(
    [
      [0, 0],
      [0, 4],
    ],
    "carrier"
  );
  boardLogicPart.placeShip(
    [
      [4, 4],
      [8, 4],
    ],
    "battleship"
  );
  boardLogicPart.placeShip(
    [
      [2, 2],
      [2, 4],
    ],
    "cruiser"
  );
  boardLogicPart.placeShip(
    [
      [9, 2],
      [9, 4],
    ],
    "submarine"
  );
  boardLogicPart.placeShip(
    [
      [6, 9],
      [7, 9],
    ],
    "destroyer"
  );

  //setup for board frontend
  for (let d = 0; d < 10; ++d) {
    for (let f = 0; f < 10; ++f) {
      const index = d * 10 + f;
      if (boardLogicPart.returnGameBoard()[d][f].fieldStatus === "occupied") {
        gameFront.markField("occupied", index, boardFrontPart);
      } else if (boardLogicPart.returnGameBoard()[d][f].fieldStatus === "hit") {
        gameFront.markField("hit", index, boardFrontPart);
      } else if (
        boardLogicPart.returnGameBoard()[d][f].fieldStatus === "miss"
      ) {
        gameFront.markField("miss", index, boardFrontPart);
      } else {
        gameFront.markField("empty", index, boardFrontPart);
      }
    }
  }
}

export default oneRound;
