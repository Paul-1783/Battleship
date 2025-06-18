import Player from "../player/player";
import gameboard from "../gameboard/gameboard";
import gameFront from "../gameboardFrontend/gameboardFrontend";

let oneRound = (function () {
  function playTheGame(player1, player2) {
    populate1Board(player1.getPlayerGameBoard(), gameFront.getBoardPlayer1(), [
      [],
    ]);
    populate1Board(player2.getPlayerGameBoard(), gameFront.getBoardPlayer2());
  }

  return { playTheGame };
})();

function populate1Board(boardLogic, boardFront, fleetArray) {
  let listOfNodes = boardFront.childNodes;
  for (let i = 0; i < listOfNodes.length; ++i) {
    // console.log("class: ", listOfNodes[i].getAttribute("class").split(" ")[1]);
  }
}

export default oneRound;
