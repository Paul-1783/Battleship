import Gameboard from "../gameboard/gameboard";

export default Player = (pt) => {
  let playerType = (pType) => {
    if (pType !== "real" && pType !== "computer")
      throw new Error("player type not allowed");
    return pType;
  };

  let adjacentBoard = Gameboard(18);

  let typeOfPlayer = playerType(pt);

  function getPlayerGameBoard() {
    return adjacentBoard;
  }

  function getTypeOfPlayer() {
    return typeOfPlayer;
  }

  return { getPlayerGameBoard, getTypeOfPlayer };
};
