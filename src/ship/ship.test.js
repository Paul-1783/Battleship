import Ship from "./ship.js";

describe("Ship component, test ship with 5 hit points (carrier)", () => {
  let testShip;

  beforeEach(() => {
    testShip = Ship("carrier");
  });

  test("Should return 1", () => {
    expect(testShip.hit()).toBe(1);
  });

  test("Should return <true>", () => {
    for (let i = 0; i < 5; ++i) testShip.hit();
    expect(testShip.isSunk()).toBe(true);
  });

  test("Should return <false>", () => {
    testShip.hit();
    expect(testShip.isSunk()).toBe(false);
  });

  test("Should return the length of 5", () => {
    testShip.getLength();
  });

  test("Should return the ship class 'carrier'", () => {
    testShip.getShipClass();
  });
});
