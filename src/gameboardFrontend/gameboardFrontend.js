import "./gameboardFrontend.css";
import retrieveStoredData from "../allThingsStorageRelated/retrieveStoredData";
import markField from "./markField";

let gameFront = (function () {
  const boardComplete = document.createElement("section");
  let baseBodyRef = null;

  function buildGameBoard(baseBody, start) {
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
    buildInfoTable(baseBody);
    baseBodyRef = baseBody;
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
      const field = document.createElement("button");
      buildField(field, i);
      singleBoard.insertAdjacentElement("beforeend", field);
    }
    return singleBoard;
  }

  function buildField(field, i) {
    field.classList.add("fieldButton");
    field.classList.add(i.toString());
    field.innerText = `${i.toString()}`;
  }

  function createFleetDesk(deskName) {
    const desk = document.createElement("div");
    desk.classList.add("desk");
    desk.classList.add(deskName);
    return desk;
  }

  function getBoardPlayer1() {
    return boardComplete.querySelector(".boardPlayerOne");
  }

  function getBoardPlayer2() {
    return boardComplete.querySelector(".boardPlayerTwo");
  }

  function setInfoTable(info) {
    let gameInfoHeader = baseBodyRef.querySelector(".gameInfo");
    gameInfoHeader.innerText = info;
  }

  return {
    buildInfoTable,
    buildGameBoard,
    getBoardPlayer1,
    getBoardPlayer2,
    markField,
    setInfoTable,
  };
})();

export default gameFront;
