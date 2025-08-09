import gameBoard from "../gameboard/gameboard";

let Player = (pt, pName, playerNumber) => {
  let getPlayerType = (pType) => {
    if (!pType) return "real";
    return "computer";
  };

  let getPlayerNumber = (pn) => {
    if (pn === 1) return "one";
    return "two";
  };

  let playerName = pName;

  let adjacentBoard = gameBoard();

  let typeOfPlayer = getPlayerType(pt);

  let playerIndex = getPlayerNumber(playerNumber);

  function getPlayerGameBoard() {
    return adjacentBoard;
  }

  function getTypeOfPlayer() {
    return typeOfPlayer;
  }

  function getPlayerName() {
    return playerName;
  }

  function getPlayerIndex() {
    return playerIndex;
  }

  return { getPlayerGameBoard, getTypeOfPlayer, getPlayerName, getPlayerIndex };
};

export default Player;
