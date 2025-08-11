import Ship from "../ship/ship.js";
import someMath from "../someMath/math.js";

let gameBoard = () => {
  let fleet = [];
  let gameBoardPositions;
  let getGameBoardPositions = function () {
    gameBoardPositions = [];
    let i = 0;
    while (i < 10) {
      gameBoardPositions[i] = [];
      for (let d = 0; d < 10; ++d) {
        gameBoardPositions[i][d] = {
          fieldStatus: "empty",
          indexedInFleet: -1,
        };
      }
      ++i;
    }
    return gameBoardPositions;
  };

  (() => {
    getGameBoardPositions();
  })();

  function receiveAttack(targetedCoordinates) {
    if (
      gameBoardPositions[targetedCoordinates[0]][targetedCoordinates[1]]
        .fieldStatus === "occupied"
    ) {
      gameBoardPositions[targetedCoordinates[0]][
        targetedCoordinates[1]
      ].fieldStatus = "hit";
      let fleetIndex =
        gameBoardPositions[targetedCoordinates[0]][targetedCoordinates[1]]
          .indexedInFleet;
      fleet[fleetIndex].vessel.hit();
      if (!fleet[fleetIndex].vessel.isSunk()) {
        return "Devastating hit!";
      } else {
        return "You sunk the sucker!";
      }
    } else if (
      gameBoardPositions[targetedCoordinates[0]][targetedCoordinates[1]]
        .fieldStatus === "empty"
    ) {
      gameBoardPositions[targetedCoordinates[0]][
        targetedCoordinates[1]
      ].fieldStatus = "miss";
      return "You missed.";
    }
  }

  function getFieldStatus(targetedCoordinates) {
    return gameBoardPositions[targetedCoordinates[0]][targetedCoordinates[1]]
      .fieldStatus;
  }

  function checkForCoordinatesOccupied(coordinates) {
    if (getFieldStatus([coordinates[0], coordinates[1]]) === "occupied")
      return true;
    return false;
  }

  function getNewCoordinateAttempt(shipLength) {
    return [
      Math.floor(Math.random() * (11 - shipLength)),
      Math.floor(Math.random() * (11 - shipLength)),
    ];
  }

  function findFreeCoordinates(shipLength) {
    let horizontal = someMath.horizontal();
    let [carrierRandomXCoordinate, carrierRandomYCoordinate] =
      getNewCoordinateAttempt(shipLength);

    let found = false;
    while (!found) {
      for (let i = 0; i <= shipLength; ++i) {
        if (i === shipLength) {
          found = true;
          break;
        }

        if (horizontal) {
          if (
            checkForCoordinatesOccupied([
              carrierRandomXCoordinate,
              carrierRandomYCoordinate + i,
            ])
          ) {
            [carrierRandomXCoordinate, carrierRandomYCoordinate] =
              getNewCoordinateAttempt(shipLength);
            break;
          }
        } else {
          if (
            checkForCoordinatesOccupied([
              carrierRandomXCoordinate + i,
              carrierRandomYCoordinate,
            ])
          ) {
            [carrierRandomXCoordinate, carrierRandomYCoordinate] =
              getNewCoordinateAttempt(shipLength);
            break;
          }
        }
      }
    }

    if (horizontal) {
      return [
        [carrierRandomXCoordinate, carrierRandomYCoordinate],
        [carrierRandomXCoordinate, carrierRandomYCoordinate + shipLength - 1],
      ];
    } else {
      return [
        [carrierRandomXCoordinate, carrierRandomYCoordinate],
        [carrierRandomXCoordinate + shipLength - 1, carrierRandomYCoordinate],
      ];
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
      if (gameBoardPositions[square[0]][square[1]].fieldStatus === "empty") {
        gameBoardPositions[square[0]][square[1]].fieldStatus = "occupied";
        gameBoardPositions[square[0]][square[1]].indexedInFleet =
          fleet.length - 1;
      } else {
        return `Indicated coordinates are already occupied by another ship.`;
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
    fleet.forEach((shipEntry) => {
      if (!shipEntry.vessel.isSunk()) fleetStatus = false;
    });
    return fleetStatus;
  }

  function returnFleet() {
    return fleet;
  }

  function returnGameBoard() {
    return gameBoardPositions;
  }

  function emptyGameBoard() {
    fleet.splice(0, fleet.length);
    fleet = [];
    let i = 0;
    while (i < 10) {
      for (let d = 0; d < 10; ++d) {
        gameBoardPositions[i][d].fieldStatus = "empty";
        gameBoardPositions[i][d].indexedInFleet = -1;
      }
      ++i;
    }
  }

  return {
    placeShip,
    returnFleet,
    returnGameBoard,
    receiveAttack,
    isFleetSunk,
    getFieldStatus,
    findFreeCoordinates,
    getGameBoardPositions,
    emptyGameBoard,
  };
};

export default gameBoard;
