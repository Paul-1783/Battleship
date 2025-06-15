export default function retrieveStoredData() {
  return {
    playerOneName: localStorage.getItem("namePlayerOne"),
    playerTwoName: localStorage.getItem("namePlayerTwo"),
    playerOneAI: localStorage.getItem("playerOneAI"),
    playerTwoAI: localStorage.getItem("playerTwoAI"),
  };
}
