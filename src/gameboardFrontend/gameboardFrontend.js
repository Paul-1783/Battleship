import "./gameboardFrontend.css";
import retrieveStoredData from "../allThingsStorageRelated/retrieveStoredData";
import markField from "./markField";

let gameFront = (function () {
  function buildGameBoardInitFor2AIs(baseBody, start) {
    const initSection2Ais = document.createElement("section");
    initSection2Ais.classList.add("gameboardWrapper");

    addFleetDeskToBoard(initSection2Ais, "fleetDeskTwo");

    createBoardContainer(initSection2Ais, "boardPlayerTwo", "player2");
    createBoardContainer(initSection2Ais, "boardPlayerOne", "player1");

    addFleetDeskToBoard(initSection2Ais, "fleetDeskOne");

    baseBody.replaceChild(initSection2Ais, start);
    buildInfoTable(baseBody, null);
  }

  function buildGameBoardInitFor1Human(baseBody, player) {
    const initSection = document.createElement("section");
    initSection.classList.add("gameboardWrapper");

    player.getPlayerIndex() == "one"
      ? createBoardContainer(initSection, "boardPlayerOne", "player1")
      : createBoardContainer(initSection, "boardPlayerTwo", "player2");

    addFleetDeskToBoard(
      initSection,
      player.getPlayerIndex() == "one" ? "fleetDeskOne" : "fleetDeskTwo"
    );

    emptyBaseBody(baseBody);

    baseBody.insertAdjacentElement("afterbegin", initSection);
    buildInfoTable(baseBody, player);
  }

  function buildGameBoardInGame(baseBody, player, oppositionGameBoardExists) {
    const initSection = document.createElement("section");
    initSection.classList.add("gameboardWrapper");
    createBoardContainer(initSection, "boardPlayerTwo", "player2");
    createBoardContainer(initSection, "boardPlayerOne", "player1");

    emptyBaseBody(baseBody);

    baseBody.insertAdjacentElement("afterbegin", initSection);
    buildInfoTable(baseBody, player);

    if (player)
      populateBoardFrontend(
        player.getPlayerGameBoard(),
        player.getPlayerIndex() == "one"
          ? gameFront.getBoardPlayer1()
          : gameFront.getBoardPlayer2()
      );

    if (oppositionGameBoardExists) {
      populateBoardFrontend(
        player.getOppositionGameBoard(),
        player.getPlayerIndex() == "one"
          ? gameFront.getBoardPlayer2()
          : gameFront.getBoardPlayer1()
      );
    }
  }

  function emptyBaseBody(baseBody) {
    baseBody.innerHTML = "";
  }

  function createBoardContainer(gameSection, name, title) {
    const container = document.createElement("div");
    container.insertAdjacentElement("afterbegin", createSingleBoard(name));
    insertBoardTitle(title, container);
    gameSection.insertAdjacentElement("afterbegin", container);
  }

  function addFleetDeskToBoard(gameSection, name) {
    gameSection.insertAdjacentElement("afterbegin", createFleetDesk(name));
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

  function buildInfoTable(docking, player) {
    const gameHeader = document.createElement("div");
    gameHeader.classList.add("gameHeader");

    const infoWrapper = document.createElement("div");
    infoWrapper.classList.add("infoWrapper");

    const infoTable = document.createElement("h1");
    infoTable.classList.add("gameInfo");
    infoTable.innerText = `${
      player == null ? "players" : player.getPlayerName()
    }, please position your ships.`;
    infoWrapper.insertAdjacentElement("afterbegin", infoTable);

    const commentator = document.createElement("h3");
    commentator.classList.add("gameComments");
    commentator.innerText = "It's on, Admiral.";
    infoWrapper.insertAdjacentElement("beforeend", commentator);

    const infoNeighborLeft = createNeighbor("infoNeighborLeft");
    const infoNeighborRight = createNeighbor("infoNeighborRight");

    const gameStart = document.createElement("button");
    gameStart.classList.add("gameStart");
    gameStart.innerText = "Start Game";
    infoNeighborRight.insertAdjacentElement("beforeend", gameStart);

    const infoComplete = document.createElement("div");
    infoComplete.classList.add("infoComplete");

    infoComplete.insertAdjacentElement("beforeend", infoNeighborLeft);
    infoComplete.insertAdjacentElement("beforeend", infoWrapper);
    infoComplete.insertAdjacentElement("beforeend", infoNeighborRight);

    docking.insertAdjacentElement("afterbegin", infoComplete);
  }

  function createNeighbor(neighborName) {
    const neighbor = document.createElement("div");
    neighbor.classList.add("infoNeighbor");
    neighbor.classList.add(neighborName);
    return neighbor;
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

    const randomButton = createFleetDeskButton(
      "randomButton",
      `${deskName}`,
      "Auto-Place"
    );

    const axisButton = createFleetDeskButton(
      "axisButton",
      `${deskName}`,
      "x-axis"
    );

    const resetButton = createFleetDeskButton(
      "resetButton",
      `${deskName}`,
      "Reset"
    );

    buttonPanel.appendChild(randomButton);
    buttonPanel.appendChild(resetButton);
    buttonPanel.appendChild(axisButton);
    deskWrapper.appendChild(buttonPanel);
    return deskWrapper;
  }

  function createFleetDeskButton(buttonType, deskName, inText) {
    const newButton = document.createElement("button");
    newButton.classList.add("menuButton");
    newButton.classList.add(buttonType);
    newButton.classList.add(`${deskName}`);
    newButton.innerText = inText;
    return newButton;
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

  function showIntermediaryDialog(player, baseBody) {
    const newBoard = document.createElement("dialog");
    newBoard.classList.add("nextMove");
    newBoard.insertAdjacentHTML(
      "afterbegin",
      `<form action="" method="dialog" id="nextMove">
            <p>
              Your turn, ${player.getPlayerName()} . 
             </p>
            <menu>
                 <button class="submitDialog">Continue to Game Board Screen</button>
            </menu>
        </form>`
    );
    emptyBaseBody(baseBody);
    baseBody.appendChild(newBoard);
    baseBody.querySelector(".nextMove").showModal();
    return document.querySelector(".submitDialog");
  }

  function getBoardPlayer1() {
    return document.querySelector(".boardPlayerOne");
  }

  function getBoardPlayer2() {
    return document.querySelector(".boardPlayerTwo");
  }

  function getRandomButton(index) {
    return index == "one"
      ? document.querySelector(".randomButton.fleetDeskOne")
      : document.querySelector(".randomButton.fleetDeskTwo");
  }

  function getAxisButton(index) {
    return index == "one"
      ? document.querySelector(".axisButton.fleetDeskOne")
      : document.querySelector(".axisButton.fleetDeskTwo");
  }

  function getResetButton(index) {
    return index == "one"
      ? document.querySelector(".resetButton.fleetDeskOne")
      : document.querySelector(".resetButton.fleetDeskTwo");
  }

  function getStartButton() {
    return document.querySelector(".gameStart");
  }

  function getFleetDesk(index) {
    if (index == "one") return document.querySelector(".desk.fleetDeskOne");
    return document.querySelector(".desk.fleetDeskTwo");
  }

  function getSubDesks(desk) {
    return desk.querySelectorAll(".desk>div");
  }

  function getBaseBody() {
    return document.querySelector(".baseBody");
  }

  function emptyFleetDesk(index) {
    let allSubDesks = getSubDesks(getFleetDesk(index));
    allSubDesks.forEach((subDesk) => (subDesk.innerHTML = ""));
    allSubDesks[0].classList = "deskUpperHalf";
    allSubDesks[1].classList = "deskLowerHalf";
    if (index == "one") getAxisButton(index).innerText = "x-axis";
    else getAxisButton(index).innerText = "x-axis";
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
    let gameInfoHeader = document.querySelector(".gameInfo");
    gameInfoHeader.innerText = info;
  }

  function updatePlayerTable(playerName, index, status) {
    let board =
      playerName === "player1" ? getBoardPlayer1() : getBoardPlayer2();

    let buttons = board.querySelectorAll("button");
    buttons.forEach((currentButton) => {
      if (currentButton.classList[1] === index) {
        currentButton.classList.remove(currentButton.classList[2]);
        currentButton.classList.add(status);
      }
    });
  }

  function makeASnappyComment(comment) {
    console.log("comment ", comment);
    let commentator = document.querySelector(".gameComments");

    if (comment == "encourage") {
      let indexOfEncouragement = Math.floor(Math.random() * 3).toString();
      indexOfEncouragement == 0
        ? (comment = `give them as good as you got!`)
        : indexOfEncouragement == 1
        ? (comment = `All guns blazing!`)
        : (comment = `Another round of this dreadful game, drown me.`);
    }

    commentator.innerText = comment;
    console.log("comment after commentator ", commentator);
  }

  function changeStartButton() {
    if (getStartButton().innerText == "Start Game") {
      this.getStartButton().innerText = "Place Ships of Player 2";
    } else {
      this.getStartButton().innerText = "Start Game";
    }
  }

  function populateBoardFrontend(boardLogicPart, boardFrontPart) {
    for (let d = 0; d < 10; ++d) {
      for (let f = 0; f < 10; ++f) {
        const index = d * 10 + f;
        if (boardLogicPart.returnGameBoard()[d][f].fieldStatus === "occupied") {
          markField("occupied", index, boardFrontPart);
        } else if (
          boardLogicPart.returnGameBoard()[d][f].fieldStatus === "miss"
        ) {
          markField("miss", index, boardFrontPart);
        } else if (
          boardLogicPart.returnGameBoard()[d][f].fieldStatus === "hit"
        ) {
          markField("hit", index, boardFrontPart);
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

  function hideStartButton() {
    getStartButton().style.display = "none";
  }

  return {
    buildInfoTable,
    buildGameBoardInitFor2AIs,
    buildGameBoardInGame,
    buildGameBoardInitFor1Human,
    changeAxis,
    changeStartButton,
    disableBoard,
    enableBoard,
    emptyFleetDesk,
    addShipToFleetDesk,
    setBoardFrontendToEmpty,
    getFleetDesk,
    getAxisButton,
    getBaseBody,
    getBoardPlayer1,
    getBoardPlayer2,
    getResetButton,
    getRandomButton,
    getStartButton,
    hideStartButton,
    markField,
    makeASnappyComment,
    populateFleetDesk,
    populateBoardFrontend,
    removeShipFromFleetDesk,
    returnAllShipsFromFleetDesk,
    returnShipCompartments,
    showIntermediaryDialog,
    setInfoTable,
    updatePlayerTable,
  };
})();

export default gameFront;
