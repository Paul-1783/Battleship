import "./start.css";

export default function startScreen() {
  const startScreen = document.createElement("div");
  startScreen.classList.add("startScreen");
  startScreen.insertAdjacentHTML(
    "beforeend",
    `
            <dialog class="newGameDialog">
              <form action="" method="dialog" id="newGameDialogForm">
                <h1 class="navalHistoryHeader">Battleship - the Game</h1>
                     <fieldset>
                    <legend>Player 1</legend>
                      <p>
                        <label for="player1Name">Player one, please enter your name:</label>
                        <input type="text" id="player1Name" autofocus value="Player 1" required>
                      </p>
                      <p>
                        <span class="toggle-checkbox-wrapper">
                          <label  for="toggle1">Would you prefer to have an AI play in your place?</label>
                          <input class="toggle-checkbox" type="checkbox" id="toggle1">
                            <label class="slider" for="toggle1">
                              <span class="toggle-switch opt1">Yes</span>
                              <span class="toggle-switch opt2">No</span>
                            </label>
                          </span>
                      </p>
                    </fieldset>
                     <fieldset>
                        <legend>Player 2</legend>
                        <p>
                          <label for="player2Name">Player two, please enter your name:</label>
                          <input type="text" id="player2Name" autofocus value="Player 2" required>
                        </p>
                        <p>
                          <span class="toggle-checkbox-wrapper">
                            <label class="secondaryLabel" for="toggle2">Would you prefer to have an AI play in your place?</label>
                            <input class="toggle-checkbox" type="checkbox" id="toggle2">
                              <label class="slider" for="toggle2">
                                <span class="toggle-switch opt1">Yes</span>
                                <span class="toggle-switch opt2">No</span>
                              </label>
                           </span>
                        </p>
                     </fieldset>
                   <menu>
                       <button class="submitDialog">Start Game</button>
                  </menu>
              </form>
            </dialog>
          `
  );
  return startScreen;
}
