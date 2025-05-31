import Gameboard from "./gameboard";
import Ship from "../ship/ship";

describe("checks gameboard functionality with 9x9 gameboard", () => {
  let testBoard;

  beforeEach(() => {
    testBoard = Gameboard(9);
  });

  test("should abort for coordinates array not having arity 2", () => {
    expect(testBoard.placeShip([[1, 2]], "battleship")).toBe(
      "format of coordinates can't be accepted"
    );
  });

  test("should place a 4 slot ship in location (2,3) to (2,6)", () => {
    let testShip = Ship(3);
    expect(
      testBoard.placeShip(
        [
          [2, 3],
          [2, 6],
        ],
        "battleship"
      )
    ).toBe(
      "battleship has been placed in coordinates: (2,3), (2,4), (2,5), (2,6), "
    );
  });

  test("should indicate a hit on the requested square of the gameboard.", () => {
    testBoard.placeShip(
      [
        [2, 3],
        [2, 6],
      ],
      "battleship"
    );
    testBoard.receiveAttack([2, 4]);
    let testGameBoardPositions = testBoard.returnGameBoard();

    expect(testGameBoardPositions[2][4].fieldStatus).toBe("hit");
  });

  test("should indicate a miss on the requested square of the gameboard.", () => {
    testBoard.placeShip(
      [
        [2, 3],
        [2, 6],
      ],
      "battleship"
    );
    testBoard.receiveAttack([6, 4]);
    let testGameBoardPositions = testBoard.returnGameBoard();

    expect(testGameBoardPositions[6][4].fieldStatus).toBe("miss");
  });

  test("should indicate a hit on the requested ship in the fleet array.", () => {
    testBoard.placeShip(
      [
        [2, 3],
        [2, 6],
      ],
      "battleship"
    );
    testBoard.receiveAttack([2, 3]);
    testBoard.receiveAttack([2, 4]);
    testBoard.receiveAttack([2, 5]);
    testBoard.receiveAttack([2, 6]);

    let testFleet = testBoard.returnFleet();

    expect(testFleet[0].vessel.isSunk()).toBe(true);
  });

  test("should indicate the requested ship in the fleet array has not yet been sunk.", () => {
    testBoard.placeShip(
      [
        [2, 3],
        [2, 6],
      ],
      "battleship"
    );
    testBoard.receiveAttack([2, 4]);
    testBoard.receiveAttack([2, 5]);
    testBoard.receiveAttack([2, 6]);

    let testFleet = testBoard.returnFleet();

    expect(testFleet[0].vessel.isSunk()).toBe(false);
  });

  test("should return true for the entire fleet being sunk", () => {
    testBoard.placeShip(
      [
        [2, 3],
        [2, 4],
      ],
      "destroyer"
    );
    testBoard.receiveAttack([2, 3]);
    testBoard.receiveAttack([2, 4]);
    expect(testBoard.isFleetSunk()).toBe(true);
  });

  test("should return false for the entire fleet being sunk", () => {
    testBoard.placeShip(
      [
        [2, 3],
        [2, 4],
      ],
      "destroyer"
    );
    testBoard.receiveAttack([2, 3]);
    testBoard.receiveAttack([3, 5]);

    expect(testBoard.isFleetSunk()).toBe(false);
  });
});
