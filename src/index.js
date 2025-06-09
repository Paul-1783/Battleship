import startScreen from "./startScreen/start";

let elem = document.querySelector(".baseBody");
elem.appendChild(startScreen());
elem.querySelector(".newGameDialog").showModal();
