import "./start.css";

export default function startScreen() {
  const startScreen = document.createElement("div");
  startScreen.classList.add("startScreen");
  startScreen.insertAdjacentHTML(
    "beforeend",
    `  <header class="navalHistoryTop"></header>
        <section class="welcomeAdmiralDialog">
          <dialog class="newGameDialog">
            <form action="" method="dialog" id="newGameDialogForm">
                <fieldset>
                <legend>Player 1</legend>
                  <p>
                    <label for="player1Name">Player one, please enter your name:</label>
                    <input type="text" id="player1Name" autofocus value="Player1" required>
                  </p>
                  <p>
                    <label for="questionOne">Would you prefer an AI to play in your place?</label>
                    <input type="checkbox" id="questionOne" name="decideAIOne" value="yes" checked />
                  </p>
                </fieldset>
                <fieldset>
                    <legend>Player 2</legend>
                    <p>
                      <label for="player2Name">Player two, please enter your name:</label>
                      <input type="text" id="player2Name" autofocus value="Player2" required>
                    </p>
                    <p>
                      <label for="questionTwo">Would you prefer an AI to play in your place?</label>
                      <input type="checkbox" id="questionTwo" name="decideAITwo" value="yes" checked />
                    </p>
              </fieldset>
                <menu>
                     <button class="submitDialog">Start Game</button>
                </menu>
            </form>
          </dialog>
        </section>
         `
  );
  return startScreen;
}
