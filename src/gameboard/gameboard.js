import { esm } from "webpack";
import Ship from "../ship/ship.js";

export default Gameboard = (arrSize) => {
  let getGameboard = () => {
    let positionHelper = [];
    let i = 0;
    while (i < arrSize) {
      positionHelper[i] = [];
      for (let d = 0; d < arrSize; ++d) {
        positionHelper[i][d] = {
          fieldStatus: "empty",
          indexedInFleet: -1,
        };
      }
      ++i;
    }
    return positionHelper;
  };

  let gameboardPositions = getGameboard();

  let fleet = [
    // { shipType: "carrier", inBattle: false, shipCoordinates: [] },
    // { shipType: "battleship", inBattle: true, shipCoordinates: [] },
    // { shipType: "cruiser", inBattle: false, shipCoordinates: [] },
    // { shipType: "submarine", inBattle: false, shipCoordinates: [] },
    // { shipType: "destroyer", inBattle: false, shipCoordinates: [] },
  ];

  function receiveAttack(targetedCoordinates) {
    if (
      gameboardPositions[targetedCoordinates[0]][targetedCoordinates[1]]
        .fieldStatus === "occupied"
    ) {
      gameboardPositions[targetedCoordinates[0]][
        targetedCoordinates[1]
      ].fieldStatus = "hit";
      let fleetIndex =
        gameboardPositions[targetedCoordinates[0]][targetedCoordinates[1]]
          .indexedInFleet;
      if (!fleet[fleetIndex].vessel.isSunk()) {
        fleet[fleetIndex].vessel.hit();
      }
    } else if (
      gameboardPositions[targetedCoordinates[0]][targetedCoordinates[1]]
        .fieldStatus === "empty"
    ) {
      gameboardPositions[targetedCoordinates[0]][
        targetedCoordinates[1]
      ].fieldStatus = "miss";
    }
  }

  function placeShip(coordinates, typeOfShip) {
    if (!Array.isArray(coordinates) || !(coordinates.length === 2))
      return "format of coordinates can't be accepted";

    let lowerBound;
    let upperBound;
    let shipCoordinates = [];
    if (coordinates[0][0] === coordinates[1][0]) {
      if (coordinates[0][1] < coordinates[1][1]) {
        lowerBound = coordinates[0][1];
        upperBound = coordinates[1][1];
      } else if (coordinates[0][1] > coordinates[1][1]) {
        lowerBound = coordinates[1][1];
        upperBound = coordinates[0][1];
      }
      for (let i = lowerBound; i <= upperBound; ++i)
        shipCoordinates.push([coordinates[0][0], i]);
    } else if (coordinates[0][1] === coordinates[1][1]) {
      if (coordinates[0][0] < coordinates[1][0]) {
        lowerBound = coordinates[0][0];
        upperBound = coordinates[1][0];
      } else if (coordinates[0][0] > coordinates[1][0]) {
        lowerBound = coordinates[1][0];
        upperBound = coordinates[0][0];
      }
      for (let i = lowerBound; i <= upperBound; ++i)
        shipCoordinates.push([i, coordinates[0][1]]);
    }

    fleet.push({
      vessel: Ship(typeOfShip),
      spotOnBoard: shipCoordinates,
    });

    shipCoordinates.forEach((square) => {
      if (gameboardPositions[square[0]][square[1]].fieldStatus === "empty") {
        gameboardPositions[square[0]][square[1]].fieldStatus = "occupied";
        gameboardPositions[square[0]][square[1]].indexedInFleet =
          fleet.length - 1;
      }
    });

    let infoPrompt = `${typeOfShip} has been placed in coordinates: `;
    shipCoordinates.forEach((coordinates) => {
      infoPrompt += `(${coordinates[0]},${coordinates[1]}), `;
    });
    return infoPrompt;
  }

  function isFleetSunk() {
    let fleetStatus = true;
    fleet.every((shipEntry) => {
      if (!shipEntry.vessel.isSunk()) fleetStatus = false;
    });
    return fleetStatus;
  }

  function returnFleet() {
    return fleet;
  }

  function returnGameBoard() {
    return gameboardPositions;
  }

  return {
    placeShip,
    returnFleet,
    returnGameBoard,
    receiveAttack,
    isFleetSunk,
  };
};
