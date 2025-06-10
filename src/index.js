import startScreen from "./startScreen/start";

const elem = document.querySelector(".baseBody");
let start = startScreen();
elem.appendChild(start);
elem.querySelector(".newGameDialog").showModal();
