import gameFront from "../gameboardFrontend/gameboardFrontend";

const randomizeIt = (function () {
  async function startListening(player, randomButton) {
    randomButton.addEventListener("click", () => {
      populateBoardRandomly(player);
    });
  }

  function populateBoardRandomly(player) {
    let boardLogicPart = player.getPlayerGameBoard();
    boardLogicPart.emptyGameBoard();

    let boardFrontPart;
    if (player.getPlayerIndex() == "one") {
      boardFrontPart = gameFront.getBoardPlayer1();
      gameFront.setBoardFrontendToEmpty(boardFrontPart);
    } else {
      boardFrontPart = gameFront.getBoardPlayer2();
      gameFront.setBoardFrontendToEmpty(boardFrontPart);
    }

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

    gameFront.populateBoardFrontend(boardLogicPart, boardFrontPart);
    gameFront.emptyFleetDesk(player.getPlayerIndex());
  }

  return { startListening };
})();

export default randomizeIt;
