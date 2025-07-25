import gameFront from "../gameboardFrontend/gameboardFrontend";

let gameStart = (function () {
  function initializeGame(player1, player2) {
    populateBoardRandomly(
      player1.getPlayerGameBoard(),
      gameFront.getBoardPlayer1()
    );
    populateBoardRandomly(
      player2.getPlayerGameBoard(),
      gameFront.getBoardPlayer2()
    );
  }

  return { initializeGame };
})();

function populateBoardRandomly(boardLogicPart, boardFrontPart) {
  let carrierCoordinates = boardLogicPart.findFreeCoordinates(5);
  boardLogicPart.placeShip(carrierCoordinates, "carrier");
  let battleshipCoordinates = boardLogicPart.findFreeCoordinates(4);
  boardLogicPart.placeShip(battleshipCoordinates, "battleship");
  let cruiserCoordinates = boardLogicPart.findFreeCoordinates(3);
  boardLogicPart.placeShip(cruiserCoordinates, "cruiser");
  let submarineCoordinates = boardLogicPart.findFreeCoordinates(3);
  boardLogicPart.placeShip(submarineCoordinates, "submarine");
  let destroyerCoordinates = boardLogicPart.findFreeCoordinates(2);
  boardLogicPart.placeShip(destroyerCoordinates, "destroyer");
  populateBoardFrontend(boardLogicPart, boardFrontPart);
}

function populate1Board(boardLogicPart, boardFrontPart) {
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
      [5, 4],
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
  populateBoardFrontend(boardLogicPart, boardFrontPart);
}

function populateBoardFrontend(boardLogicPart, boardFrontPart) {
  //setup for board frontend
  for (let d = 0; d < 10; ++d) {
    for (let f = 0; f < 10; ++f) {
      const index = d * 10 + f;
      if (boardLogicPart.returnGameBoard()[d][f].fieldStatus === "occupied") {
        gameFront.markField("occupied", index, boardFrontPart);
      }
      // else if (boardLogicPart.returnGameBoard()[d][f].fieldStatus === "hit") {
      //   gameFront.markField("hit", index, boardFrontPart);
      // } else if (
      //   boardLogicPart.returnGameBoard()[d][f].fieldStatus === "miss"
      // ) {
      //   gameFront.markField("miss", index, boardFrontPart);
      // }
      else {
        gameFront.markField("empty", index, boardFrontPart);
      }
    }
  }
}

export default gameStart;
