export default function storeEverything(body) {
  localStorage.setItem(
    "namePlayerOne",
    body.querySelector("#player1Name").value
  );
  localStorage.setItem(
    "namePlayerTwo",
    body.querySelector("#player2Name").value
  );
  localStorage.setItem("playerOneAI", body.querySelector("#toggle1").checked);
  localStorage.setItem("playerTwoAI", body.querySelector("#toggle2").checked);
}
