import startScreen from "./startScreen/start";
import storeEverything from "./allThingsStorageRelated/store";
import gameFront from "./gameboardFrontend/gameboardFrontend.js";
import oneRound from "./courseOfGame/courseOfGame.js";
import Player from "./player/player.js";
import playTheGame from "./courseOfGame/playTheGame.js";

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

  gameFront.buildGameBoard(baseBody, start);

  let player1 = Player(player1Type, player1Name);
  let player2 = Player(player2Type, player2Name);
  oneRound.initializeGame(player1, player2);
  playTheGame(player1, player2);
});
