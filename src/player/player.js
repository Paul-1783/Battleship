import Gameboard from "../gameboard/gameboard";

let Player = (pt, pName) => {
  let playerType = (pType) => {
    if (!pType) return "real";
    return "computer";
  };

  let playerName = pName;

  let adjacentBoard = Gameboard();

  let typeOfPlayer = playerType(pt);

  function getPlayerGameBoard() {
    return adjacentBoard;
  }

  function getTypeOfPlayer() {
    return typeOfPlayer;
  }

  function getPlayerName() {
    return playerName;
  }

  return { getPlayerGameBoard, getTypeOfPlayer, getPlayerName };
};

export default Player;
