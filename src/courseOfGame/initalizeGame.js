import gameFront from "../gameboardFrontend/gameboardFrontend";
import randomizeIt from "../gameLogic/randomPopulateLogic";

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
      let desk = gameFront.getFleetDesk(player.getPlayerIndex());
      let allSubDesks = desk.querySelectorAll(".desk>div");
      let allShips = desk.querySelectorAll(".shipOnFleetDesk");
      if (buttonToActivate.innerText == "x-axis") {
        allSubDesks.forEach((subDesk) => subDesk.classList.add("xAxisForDesk"));
        allShips.forEach((ship) => ship.classList.add("xAxis"));
        buttonToActivate.innerText = "y-axis";
      } else {
        allSubDesks.forEach((subDesk) =>
          subDesk.classList.remove("xAxisForDesk")
        );
        allShips.forEach((ship) => ship.classList.remove("xAxis"));
        buttonToActivate.innerText = "x-axis";
      }
    });
  }

  return { initializeGame };
})();

export default gameStart;
