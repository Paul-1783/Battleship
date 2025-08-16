import gameBoard from "../gameboard/gameboard";

let Player = (pt, pName, playerNumber) => {
  let getPlayerType = (pType) => {
    if (!pType) return true; //Human
    return false; //False
  };

  let getPlayerNumber = (pn) => {
    if (pn === 1) return "one";
    return "two";
  };

  let playerName = pName;

  let adjacentBoard = gameBoard();

  let oppositionGameBoard = gameBoard();

  let typeOfPlayer = getPlayerType(pt);

  let playerIndex = getPlayerNumber(playerNumber);

  function getPlayerGameBoard() {
    return adjacentBoard;
  }

  function getOppositionGameBoard() {
    return oppositionGameBoard;
  }

  function isHuman() {
    return typeOfPlayer;
  }

  function getPlayerName() {
    return playerName;
  }

  function getPlayerIndex() {
    return playerIndex;
  }

  return {
    getPlayerGameBoard,
    isHuman,
    getPlayerName,
    getPlayerIndex,
    getOppositionGameBoard,
  };
};

export default Player;
