import gameboard from "../gameboard/gameboard";
import "./gameboardFrontend.css";
import retrieveStoredData from "../allThingsStorageRelated/retrieveStoredData";

let gameFront = (function () {
  function buildGameBoard(baseBody, start) {
    const boardComplete = document.createElement("section");
    boardComplete.classList.add("gameboardWrapper");

    boardComplete.insertAdjacentElement(
      "afterbegin",
      createFleetDesk("fleetDeskOne")
    );
    boardComplete.insertAdjacentElement(
      "afterbegin",
      createSingleBoard("boardPlayerOne")
    );
    boardComplete.insertAdjacentElement(
      "afterbegin",
      createSingleBoard("boardPlayerTwo")
    );
    boardComplete.insertAdjacentElement(
      "afterbegin",
      createFleetDesk("fleetDeskTwo")
    );

    baseBody.replaceChild(boardComplete, start);
  }

  function buildInfoTable(docking) {
    const infoTable = document.createElement("h1");
    infoTable.classList.add("gameInfo");
    const storedData = retrieveStoredData().playerOneName;
    infoTable.innerText = `${storedData}, please position your first ship.`;
    docking.insertAdjacentElement("afterbegin", infoTable);
  }

  function createSingleBoard(boardName) {
    const singleBoard = document.createElement("div");
    singleBoard.classList.add("board");
    singleBoard.classList.add(boardName);
    for (let i = 0; i < 100; ++i) {
      const field = document.createElement("div");
      field.classList.add("gameField");
      singleBoard.insertAdjacentElement("beforeend", field);
    }

    return singleBoard;
  }

  function createFleetDesk(deskName) {
    const desk = document.createElement("div");
    desk.classList.add("desk");
    desk.classList.add(deskName);
    return desk;
  }

  return { buildInfoTable, buildGameBoard };
})();

export default gameFront;
