import startScreen from "./startScreen/start";
import storeEverything from "./allThingsStorageRelated/store";
import retrieveStoredData from "./allThingsStorageRelated/retrieveStoredData";
import gameboard from "./gameboard/gameboard.js";
import gameFront from "./gameboardFrontend/gameboardFrontend.js";
import oneRound from "./courseOfGame/courseOfGame.js";
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

  console.log(player1Type);

  gameFront.buildGameBoard(baseBody, start);
  gameFront.buildInfoTable(baseBody);

  oneRound.playTheGame(
    Player(player1Type, player1Name),
    Player(player2Type, player2Name)
  );
});
