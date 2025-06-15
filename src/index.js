import startScreen from "./startScreen/start";
import storeEverything from "./allThingsStorageRelated/store";
import retrieveStoredData from "./allThingsStorageRelated/retrieveStoredData";
import gameboard from "./gameboard/gameboard.js";
import gameFront from "./gameboardFrontend/gameboardFrontend.js";

const baseBody = document.querySelector(".baseBody");
let start = startScreen();
baseBody.appendChild(start);
baseBody.querySelector(".newGameDialog").showModal();

const startButton = baseBody.querySelector(".submitDialog");
startButton.addEventListener("click", () => {
  storeEverything(baseBody);
  gameFront.buildGameBoard(baseBody, start);
  gameFront.buildInfoTable(baseBody);
});
