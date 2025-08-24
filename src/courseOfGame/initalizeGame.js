import gameFront from "../gameboardFrontend/gameboardFrontend";
import randomizeIt from "../gameLogic/randomPopulateLogic";
import Ship from "../ship/ship";
import getCoordinates from "../someMath/getCoordinates";
import { playTheGame, playTheGameWithTwoHumans } from "./playTheGame";

let gameStart = (function () {
  let populate = (name) => {
    gameFront.populateFleetDesk(name);
  };

  function initializeGameFor1Human(player, AiOpponent) {
    randomizeIt.startListening(
      player,
      gameFront.getRandomButton(player.getPlayerIndex())
    );

    player.getPlayerIndex() == "one"
      ? populate("fleetDeskOne")
      : populate("fleetDeskTwo");

    activateAxisButton(
      player,
      gameFront.getAxisButton(player.getPlayerIndex())
    );
    activateResetButton(
      player,
      gameFront.getResetButton(player.getPlayerIndex())
    );
    activateShipDraggable(player);
    if (AiOpponent) randomizeIt.populateBoardRandomly(AiOpponent, false);
  }

  function initializeGameFor2AIs(player1, player2) {
    randomizeIt.startListening(
      player1,
      gameFront.getRandomButton(player1.getPlayerIndex())
    );
    randomizeIt.startListening(
      player2,
      gameFront.getRandomButton(player2.getPlayerIndex())
    );

    populate("fleetDeskOne");
    populate("fleetDeskTwo");

    activateAxisButton(
      player1,
      gameFront.getAxisButton(player1.getPlayerIndex())
    );
    activateAxisButton(
      player2,
      gameFront.getAxisButton(player2.getPlayerIndex())
    );

    activateResetButton(
      player1,
      gameFront.getResetButton(player1.getPlayerIndex())
    );
    activateResetButton(
      player2,
      gameFront.getResetButton(player2.getPlayerIndex())
    );

    activateShipDraggable(player1);
    activateShipDraggable(player2);
  }

  function activateShipDraggable(player) {
    let index = player.getPlayerIndex();
    let listOfShips = gameFront.returnAllShipsFromFleetDesk(index);
    let draggedItem = null;
    let compartmentIndex = null;

    listOfShips.forEach((ship) => {
      let compartments = ship.querySelectorAll(".shipCompartment");
      compartments.forEach((compartment) => {
        compartment.addEventListener("mousedown", (event) => {
          compartmentIndex = event.target.classList[1];
        });
      });

      ship.addEventListener(
        "dragstart",
        (event) => {
          draggedItem = ship;
          ship.classList.add("dragging");
        },
        true
      );

      ship.addEventListener("dragend", () => {
        draggedItem = null;
        compartmentIndex = null;
        ship.classList.remove("dragging");
      });
    });

    let gameBoardDraggedOver =
      player.getPlayerIndex() == "one"
        ? gameFront.getBoardPlayer1()
        : gameFront.getBoardPlayer2();

    let allButtons = gameBoardDraggedOver.querySelectorAll("button");
    allButtons.forEach((buttonDraggedOver) => {
      buttonDraggedOver.addEventListener("dragover", (event) => {
        event.preventDefault();
      });
    });

    let boardFront =
      player.getPlayerIndex() == "one"
        ? gameFront.getBoardPlayer1()
        : gameFront.getBoardPlayer2();

    allButtons.forEach((buttonDroppedOn) => {
      buttonDroppedOn.addEventListener("drop", (event) => {
        event.preventDefault();

        let startIndex = null;
        let endIndex = null;
        let stepWidth = null;
        let lengthCurrentShip = 0;

        try {
          lengthCurrentShip = Ship().getShipLength(draggedItem.classList[1]);
        } catch (e) {
          compartmentIndex = null;
          return;
        }

        if (draggedItem.classList[2] == "yAxis") {
          startIndex = event.target.classList[1] - compartmentIndex * 10;
          endIndex =
            (lengthCurrentShip - compartmentIndex) * 10 +
            parseInt(event.target.classList[1]) -
            10;

          if (startIndex < 0 || endIndex >= 99) return;

          stepWidth = 10;
        } else if (draggedItem.classList[2] == "xAxis") {
          startIndex = parseInt(event.target.classList[1]) - compartmentIndex;
          endIndex =
            parseInt(event.target.classList[1]) +
            lengthCurrentShip -
            compartmentIndex -
            1;

          if (
            startIndex < 0 ||
            endIndex > 99 ||
            startIndex - (startIndex % 10) != endIndex - (endIndex % 10)
          )
            return;

          stepWidth = 1;
        }

        for (let i = startIndex; i <= endIndex; i += stepWidth)
          gameFront.markField("occupied", i, boardFront);

        gameFront.removeShipFromFleetDesk(
          player.getPlayerIndex(),
          draggedItem.classList[1],
          lengthCurrentShip
        );

        player
          .getPlayerGameBoard()
          .placeShip(
            [getCoordinates(startIndex), getCoordinates(endIndex)],
            draggedItem.classList[1]
          );
      });
    });
  }

  function activateResetButton(player, buttonForReset) {
    buttonForReset.addEventListener("click", () => {
      player.getPlayerGameBoard().emptyGameBoard();
      gameFront.emptyFleetDesk(player.getPlayerIndex());

      if (player.getPlayerIndex() == "one") {
        gameFront.setBoardFrontendToEmpty(gameFront.getBoardPlayer1());
        gameFront.populateFleetDesk("fleetDeskOne");
      } else {
        gameFront.setBoardFrontendToEmpty(gameFront.getBoardPlayer2());
        gameFront.populateFleetDesk("fleetDeskTwo");
      }
      activateShipDraggable(player);
    });
  }

  function activateAxisButton(player, buttonToActivate) {
    buttonToActivate.addEventListener("click", () => {
      gameFront.changeAxis(player, buttonToActivate);
    });
  }

  function activateStartButton(startButton, player1, player2, playerTypes) {
    startButton.addEventListener("click", () => {
      if (
        playerTypes == "twoAIs" &&
        gameFront.checkFleetsReady(player1, player2)
      ) {
        gameFront.buildGameBoardInGame(
          gameFront.getBaseBody(),
          undefined,
          false
        );
        gameFront.hideStartButton();
        playTheGame(player1, player2);
      } else if (
        playerTypes == "OneAI" &&
        gameFront.checkFleetsReady(player1.isHuman() ? player1 : player2)
      ) {
        gameFront.buildGameBoardInGame(
          gameFront.getBaseBody(),
          player1.isHuman() ? player1 : player2,
          false
        );
        gameFront.hideStartButton();
        playTheGame(player1, player2);
      } else if (playerTypes == "TwoHumans") {
        if (gameFront.getStartButton().innerText == "Place Ships of Player 2") {
          if (!gameFront.checkFleetsReady(player1)) return;
          gameFront.buildGameBoardInitFor1Human(
            gameFront.getBaseBody(),
            player2
          );
          initializeGameFor1Human(player2);
          activateStartButton(
            gameFront.getStartButton(),
            player1,
            player2,
            "TwoHumans"
          );
        } else if (gameFront.checkFleetsReady(player2)) {
          gameFront.hideStartButton();
          playTheGameWithTwoHumans(player1, player2);
        }
      }
    });
  }

  return {
    initializeGameFor2AIs,
    initializeGameFor1Human,
    activateStartButton,
  };
})();

export default gameStart;
