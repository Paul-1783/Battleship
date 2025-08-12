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
      boardTitle.innerText = `${retrieveStoredData().playerOneName}'s Board`;
    } else {
      boardTitle.innerText = `${retrieveStoredData().playerTwoName}'s Board`;
    }
    boardTitle.classList.add("gameInfo");
    boardTitle.classList.add("playerHeader");
    container.insertAdjacentElement("afterbegin", boardTitle);
  }

  function buildInfoTable(docking) {
    const gameHeader = document.createElement("div");
    gameHeader.classList.add("gameHeader");

    const infoWrapper = document.createElement("div");
    infoWrapper.classList.add("infoWrapper");

    const infoTable = document.createElement("h1");
    infoTable.classList.add("gameInfo");
    const storedData = retrieveStoredData().playerOneName;
    infoTable.innerText = `${storedData}, please position your first ship.`;
    infoWrapper.insertAdjacentElement("afterbegin", infoTable);

    const commentator = document.createElement("h3");
    commentator.classList.add("gameComments");
    commentator.innerText = "It's on, Admiral.";
    infoWrapper.insertAdjacentElement("beforeend", commentator);

    const gameStart = document.createElement("button");
    gameStart.classList.add("gameStart");
    gameStart.innerText = "Start Game";
    infoWrapper.insertAdjacentElement("beforeend", gameStart);

    docking.insertAdjacentElement("afterbegin", infoWrapper);
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
  }

  function createFleetDesk(deskName) {
    const deskWrapper = document.createElement("div");
    deskWrapper.classList.add("deskWrapper");
    deskWrapper.classList.add(`${deskName}`);

    const desk = document.createElement("div");
    desk.classList.add("desk");
    desk.classList.add(deskName);

    const deskUpperHalf = document.createElement("div");
    deskUpperHalf.classList.add("deskUpperHalf");
    desk.appendChild(deskUpperHalf);

    const deskLowerHalf = document.createElement("div");
    deskLowerHalf.classList.add("deskLowerHalf");
    desk.appendChild(deskLowerHalf);

    deskWrapper.appendChild(desk);
    const buttonPanel = document.createElement("menu");

    const randomButton = document.createElement("button");
    randomButton.classList.add("menuButton");
    randomButton.classList.add("randomButton");
    randomButton.classList.add(`${deskName}`);
    randomButton.innerText = "Random Initialize";

    const axisButton = document.createElement("button");
    axisButton.classList.add("menuButton");
    axisButton.classList.add("axisButton");
    axisButton.classList.add(`${deskName}`);
    axisButton.innerText = "x-axis";

    const resetButton = document.createElement("button");
    resetButton.classList.add("menuButton");
    resetButton.classList.add("resetButton");
    resetButton.classList.add(`${deskName}`);
    resetButton.innerText = "Reset";

    buttonPanel.appendChild(randomButton);
    buttonPanel.appendChild(resetButton);
    buttonPanel.appendChild(axisButton);
    deskWrapper.appendChild(buttonPanel);
    return deskWrapper;
  }

  function addShipToFleetDesk(deskName, shipType, shipLength, axis) {
    let fleetDesk = document.querySelector(deskName);

    let newShip = document.createElement("div");
    newShip.classList.add("shipOnFleetDesk");
    newShip.setAttribute("draggable", true);
    newShip.classList.add(shipType);

    if (axis) newShip.classList.add("yAxis");
    else newShip.classList.add("xAxis");

    for (let i = 0; i < shipLength; ++i) {
      let newCompartment = document.createElement("div");
      newCompartment.classList.add("shipCompartment");
      newCompartment.classList.add(`${i.toString()}`);
      newShip.appendChild(newCompartment);
    }

    if (shipLength > 3)
      fleetDesk.querySelector(".deskUpperHalf").appendChild(newShip);
    else fleetDesk.querySelector(".deskLowerHalf").appendChild(newShip);
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

  function getRandomButtonPlayer1() {
    return boardComplete.querySelector(".randomButton.fleetDeskOne");
  }

  function getRandomButtonPlayer2() {
    return boardComplete.querySelector(".randomButton.fleetDeskTwo");
  }

  function getAxisButtonPlayer1() {
    return boardComplete.querySelector(".axisButton.fleetDeskOne");
  }

  function getAxisButtonPlayer2() {
    return boardComplete.querySelector(".axisButton.fleetDeskTwo");
  }

  function getResetButtonPlayer1() {
    return boardComplete.querySelector(".resetButton.fleetDeskOne");
  }

  function getResetButtonPlayer2() {
    return boardComplete.querySelector(".resetButton.fleetDeskTwo");
  }

  function getFleetDesk(index) {
    if (index == "one")
      return boardComplete.querySelector(".desk.fleetDeskOne");
    return boardComplete.querySelector(".desk.fleetDeskTwo");
  }

  function getSubDesks(desk) {
    return desk.querySelectorAll(".desk>div");
  }

  function emptyFleetDesk(index) {
    let allSubDesks = getSubDesks(getFleetDesk(index));
    allSubDesks.forEach((subDesk) => (subDesk.innerHTML = ""));
    allSubDesks[0].classList = "deskUpperHalf";
    allSubDesks[1].classList = "deskLowerHalf";
    if (index == "one") getAxisButtonPlayer1().innerText = "x-axis";
    else getAxisButtonPlayer2().innerText = "x-axis";
  }

  function removeShipFromFleetDesk(index, shipTitle, lengthCurrentShip) {
    let desk = null;
    if (lengthCurrentShip > 3)
      desk = getFleetDesk(index).querySelector(".deskUpperHalf");
    else desk = getFleetDesk(index).querySelector(".deskLowerHalf");
    let shipToRemove = desk.querySelector(`.${shipTitle}`);
    desk.removeChild(shipToRemove);
  }

  function returnAllShipsFromFleetDesk(index) {
    return getFleetDesk(index).querySelectorAll(".shipOnFleetDesk");
  }

  function returnShipCompartments(ship) {
    return ship.querySelectorAll("div");
  }

  function populateFleetDesk(deskName) {
    addShipToFleetDesk(`.${deskName}`, "carrier", 5, true);
    addShipToFleetDesk(`.${deskName}`, "battleship", 4, true);
    addShipToFleetDesk(`.${deskName}`, "cruiser", 3, true);
    addShipToFleetDesk(`.${deskName}`, "submarine", 3, true);
    addShipToFleetDesk(`.${deskName}`, "destroyer", 2, true);
  }

  function setInfoTable(info) {
    let gameInfoHeader = baseBodyRef.querySelector(".gameInfo");
    gameInfoHeader.innerText = info;
  }

  function updatePlayerTable(playerName, index, status) {
    let board = null;
    if (playerName === "player1") {
      board = getBoardPlayer1();
    } else if (playerName === "player2") {
      board = getBoardPlayer2();
    }

    let buttons = board.querySelectorAll("button");
    buttons.forEach((currentButton) => {
      if (currentButton.classList[1] === index) {
        currentButton.classList.remove(currentButton.classList[2]);
        currentButton.classList.add(status);
      }
    });
  }

  function makeASnappyComment(comment) {
    let commentator = baseBodyRef.querySelector(".gameComments");
    commentator.innerText = comment;
  }

  function populateBoardFrontend(boardLogicPart, boardFrontPart) {
    //setup for board frontend
    for (let d = 0; d < 10; ++d) {
      for (let f = 0; f < 10; ++f) {
        const index = d * 10 + f;
        if (boardLogicPart.returnGameBoard()[d][f].fieldStatus === "occupied") {
          markField("occupied", index, boardFrontPart);
        } else {
          markField("empty", index, boardFrontPart);
        }
      }
    }
  }

  function setBoardFrontendToEmpty(boardFrontPart) {
    for (let d = 0; d < 10; ++d) {
      for (let f = 0; f < 10; ++f) {
        const index = d * 10 + f;
        markField("empty", index, boardFrontPart);
      }
    }
  }

  function changeAxis(player, buttonToActivate) {
    let desk = gameFront.getFleetDesk(player.getPlayerIndex());
    let allSubDesks = desk.querySelectorAll(".desk>div");
    let allShips = desk.querySelectorAll(".shipOnFleetDesk");
    if (buttonToActivate.innerText == "x-axis") {
      allSubDesks.forEach((subDesk) => subDesk.classList.add("xAxisForDesk"));
      allShips.forEach((ship) => {
        ship.classList.add("xAxis");
        ship.classList.remove("yAxis");
      });
      buttonToActivate.innerText = "y-axis";
    } else {
      allSubDesks.forEach((subDesk) =>
        subDesk.classList.remove("xAxisForDesk")
      );
      allShips.forEach((ship) => {
        ship.classList.remove("xAxis");
        ship.classList.add("yAxis");
      });
      buttonToActivate.innerText = "x-axis";
    }
  }

  return {
    changeAxis,
    emptyFleetDesk,
    removeShipFromFleetDesk,
    populateBoardFrontend,
    buildInfoTable,
    buildGameBoard,
    getBoardPlayer1,
    getBoardPlayer2,
    markField,
    setInfoTable,
    disableBoard,
    enableBoard,
    makeASnappyComment,
    updatePlayerTable,
    addShipToFleetDesk,
    setBoardFrontendToEmpty,
    getFleetDesk,
    getAxisButtonPlayer1,
    getAxisButtonPlayer2,
    getResetButtonPlayer1,
    getResetButtonPlayer2,
    getRandomButtonPlayer1,
    getRandomButtonPlayer2,
    populateFleetDesk,
    returnAllShipsFromFleetDesk,
    returnShipCompartments,
  };
})();

export default gameFront;
