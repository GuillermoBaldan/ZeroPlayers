import { stageParameters } from "./index.js";
import { sum } from "./ZeroPlayers_f_arraysManipulation.js";

function debug_PrintDynamicsElementsCoordinates(Array) {
  Array.forEach((element) => {
    console.log(`(${element.x},${element.y})`);
  });
}

function debug_(ObjectArray) {
  ObjectArray.forEach((element) => {
    console.log(`${element.string}: ${element.variable}`);
  });
}

function debug_energyOfUniverse() {
  console.log(`Energy of the universe: ${stageParameters.universeEnergy}`);
}

function debug_totalEnergy() {
  let totalEnergy =
    stageParameters.universeEnergy + sum(stageParameters.dynamicElementsArray);
  let stageEnergy = stageParameters.universeEnergy;
  let cellsEnergy = sum(stageParameters.dynamicElementsArray);
  /* console.log(
    `Universe Energy: ${totalEnergy} = Energy of Stage:${stageEnergy} + Energy of Cells: ${cellsEnergy}`
  ); */
  console.log(cellsEnergy);
}

function debug_DetectCoordinatesRepeated(Array) {
  let repeatedElements = [];
  let a;
  let b;
  for (a = 0; a < Array.length; a++) {
    for (b = 0; b < Array.length; b++) {
      if (Array[a].x === Array[b].x && Array[a].y === Array[b].y && a !== b) {
        //show repeated elements using console.log and put the representation in red color
        console.log(
          `%c (${Array[a].x},${Array[a].y})`,
          "background: #FFFF00; color: #ff0000"
        );

        repeatedElements.push(Array[a]);
      }
    }
  }
}

export {
  debug_PrintDynamicsElementsCoordinates,
  debug_DetectCoordinatesRepeated,
  debug_,
  debug_energyOfUniverse,
  debug_totalEnergy,
};
