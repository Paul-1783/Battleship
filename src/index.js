import startScreen from "./startScreen/start";
import storeEverything from "./allThingsStorageRelated/store";
import gameFront from "./gameboardFrontend/gameboardFrontend.js";
import gameStart from "./courseOfGame/initalizeGame.js";
import Player from "./player/player.js";

const baseBody = document.querySelector(".baseBody");
let start = startScreen();
baseBody.appendChild(start);
baseBody.querySelector(".newGameDialog").showModal();

const startButton = baseBody.querySelector(".submitDialog");
startButton.addEventListener("click", () => {
  storeEverything(baseBody);

  let player1Name = start.querySelector("#player1Name").value;
  let player1Type = start.querySelector("#toggle1").checked;
  let player2Name = start.querySelector("#player2Name").value;
  let player2Type = start.querySelector("#toggle2").checked;

  let player1 = Player(player1Type, player1Name, 1);
  let player2 = Player(player2Type, player2Name, 2);

  // gameFront.showIntermediaryDialog(player1, baseBody, start);
  // Case both AI Players
  if (!player1.isHuman() && !player2.isHuman()) {
    gameFront.buildGameBoardInitFor2AIs(baseBody, start, true);
    gameStart.initializeGameFor2AIs(player1, player2);
    gameStart.activateStartButton(
      gameFront.getStartButton(),
      player1,
      player2,
      "twoAIs"
    );
  }
  // Case 1 Human, 1 AI Player
  else if (
    (!player1.isHuman() && player2.isHuman()) ||
    (player1.isHuman() && !player2.isHuman())
  ) {
    if (player1.isHuman()) {
      gameFront.buildGameBoardInitFor1Human(baseBody, player1);
      gameStart.initializeGameFor1Human(player1, player2);
    } else {
      gameFront.buildGameBoardInitFor1Human(baseBody, player2);
      gameStart.initializeGameFor1Human(player2, player1);
    }
    gameStart.activateStartButton(
      gameFront.getStartButton(),
      player1,
      player2,
      "OneAI"
    );
  }
  // Case both Human Players
  else {
    gameFront.buildGameBoardInitFor1Human(baseBody, player1);
    gameFront.changeStartButton();

    gameStart.initializeGameFor1Human(player1);
    gameStart.activateStartButton(
      gameFront.getStartButton(),
      player1,
      player2,
      "TwoHumans"
    );
  }
});
