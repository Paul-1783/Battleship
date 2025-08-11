import gameFront from "../gameboardFrontend/gameboardFrontend";
import randomizeIt from "../gameLogic/randomPopulateLogic";
import Ship from "../ship/ship";
import getCoordinates from "../someMath/getCoordinates";

let gameStart = (function () {
  function initializeGame(player1, player2) {
    randomizeIt.startListening(player1, gameFront.getRandomButtonPlayer1());
    randomizeIt.startListening(player2, gameFront.getRandomButtonPlayer2());

    let populate = (name) => {
      gameFront.populateFleetDesk(name);
    };
    populate("fleetDeskOne");
    populate("fleetDeskTwo");

    activateAxisButton(player1, gameFront.getAxisButtonPlayer1());
    activateAxisButton(player2, gameFront.getAxisButtonPlayer2());

    activateResetButton(player1, gameFront.getResetButtonPlayer1());
    activateResetButton(player2, gameFront.getResetButtonPlayer2());

    activateShipDraggable("one", player1);
    activateShipDraggable("two", player2);
  }

  function activateShipDraggable(index, player) {
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
        let lengthCurrentShip = Ship().getShipLength(draggedItem.classList[1]);

        if (draggedItem.classList[2] == "yAxis") {
          startIndex = event.target.classList[1] - compartmentIndex * 10;
          endIndex =
            (lengthCurrentShip - compartmentIndex) * 10 +
            parseInt(event.target.classList[1]) -
            10;

          if (startIndex < 0 || endIndex >= 99) return;

          stepWidth = 10;
        } else if (draggedItem.classList[2] == "xAxis") {
          startIndex =
            parseInt(event.target.classList[1]) - parseInt(compartmentIndex);
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
    });
  }

  function activateAxisButton(player, buttonToActivate) {
    buttonToActivate.addEventListener("click", () => {
      gameFront.changeAxis(player, buttonToActivate);
    });
  }

  return { initializeGame };
})();

export default gameStart;
