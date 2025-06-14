import Gameboard from "../gameboard/gameboard";
import Player from "./player";

describe("checks machine/human player functionality with 10 x 10 square gameboard", () => {
  test("should return the size of the player board: 10", () => {
    let testPlayer = Player("real");
    let testBoard = testPlayer.getPlayerGameBoard();
    expect(testBoard.returnGameBoard().length).toBe(10);
  });

  test("should return the player type 'real'", () => {
    let testPlayer = Player("real");
    expect(testPlayer.getTypeOfPlayer()).toBe("real");
  });

  test("should return the player type 'computer'", () => {
    let testPlayer = Player("computer");
    expect(testPlayer.getTypeOfPlayer()).toBe("computer");
  });

  test("should refuse to return the player type 'ai'", () => {
    expect(() => {
      Player("ai").getTypeOfPlayer();
    }).toThrow("player type not allowed");
  });
});
