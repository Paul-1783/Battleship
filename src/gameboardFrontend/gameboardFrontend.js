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
      createFleetDesk("fleetDeskTwo")
    );

    const containerTwo = document.createElement("div");
    containerTwo.insertAdjacentElement(
      "afterbegin",
      createSingleBoard("boardPlayerTwo")
    );
    insertBoardTitle("player2", containerTwo);
    boardComplete.insertAdjacentElement("afterbegin", containerTwo);

    const containerOne = document.createElement("div");
    containerOne.insertAdjacentElement(
      "afterbegin",
      createSingleBoard("boardPlayerOne")
    );
    insertBoardTitle("player1", containerOne);
    boardComplete.insertAdjacentElement("afterbegin", containerOne);

    boardComplete.insertAdjacentElement(
      "afterbegin",
      createFleetDesk("fleetDeskOne")
    );

    baseBody.replaceChild(boardComplete, start);
    buildInfoTable(baseBody);
    baseBodyRef = baseBody;
  }

  function insertBoardTitle(title, container) {
    const boardTitle = document.createElement("p");
    if (title === "player1") {
      boardTitle.innerText = "Board Player 1";
    } else {
      boardTitle.innerText = "Board Player 2";
    }
    boardTitle.classList.add("gameInfo");
    boardTitle.classList.add("playerHeader");
    container.insertAdjacentElement("afterbegin", boardTitle);
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

  function disableBoard(playerName) {
    if (playerName === "player1") {
      let buttons = getBoardPlayer1().querySelectorAll(".fieldButton");
      buttons.forEach((button) => {
        button.disabled = true;
      });
    } else {
      let buttons = getBoardPlayer2().querySelectorAll(".fieldButton");
      buttons.forEach((button) => {
        button.disabled = true;
      });
    }
  }

  function enableBoard(playerName) {
    if (playerName === "player1") {
      let buttons = getBoardPlayer1().querySelectorAll(".fieldButton");
      buttons.forEach((button) => {
        button.disabled = false;
      });
    } else {
      let buttons = getBoardPlayer2().querySelectorAll(".fieldButton");
      buttons.forEach((button) => {
        button.disabled = false;
      });
    }
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

  function updatePlayerTable(playerName, index, status) {
    console.log("update ", status);
    let board = null;
    if (playerName === "player1") {
      board = getBoardPlayer2();
    } else if (playerName === "player2") {
      board = getBoardPlayer1();
    }

    let buttons = board.querySelectorAll("button");
    buttons.forEach((currentButton) => {
      if (currentButton.classList[1] === index) {
        currentButton.classList.remove(currentButton.classList[2]);
        currentButton.classList.add(status);
      }
    });
  }

  return {
    buildInfoTable,
    buildGameBoard,
    getBoardPlayer1,
    getBoardPlayer2,
    markField,
    setInfoTable,
    disableBoard,
    enableBoard,
    updatePlayerTable,
  };
})();

export default gameFront;
