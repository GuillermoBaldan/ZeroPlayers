import {
  cloneArray2D,
  cloneArray,
  arrayOf2DVectorsIncludeVector,
} from "./ZeroPlayers_f_arraysManipulation.js";
import { movement } from "./ZeroPlayers_f_movement.js";
import {
  checkForbiddenPosition,
  preyDetection,
  preySelectionAndRemove,
  reproductionFunction,
  cellHeatDeath,
} from "./ZeroPlayers_f_livingbeings.js";
import {
  energy2Universe,
  energy2dynamicElements,
} from "./ZeroPlayers_f_universe.js";
import { ordering4drawing } from "./ZeroPlayers_f_canvas.js";
import {
  checkSimpleCellsExistence,
  checkNumbersTypeCell,
  freePositionsArrayGenerator,
} from "./ZeroPlayers_f_checkValues.js";
import {
  checkExistenceInMatrix,
  coordinatesAssigment,
} from "./ZeroPlayers_f_dataCoherence.js";
import {
  staticMovement,
  trajectoryMovement,
  autonomousMovement,
} from "./ZeroPlayers_f_movement.js";

import {
  debug_PrintDynamicsElementsCoordinates,
  debug_DetectCoordinatesRepeated,
  debug_totalEnergy,
  debug_numberOfCells,
} from "./ZeroPlayers_f_debugging.js";

function generateStaticStage(stageParameters, simulationParameters) {
  let a;
  let b;
  let row = [];
  let numberMaterials = materialGeneration(
    stageParameters.legendTerrain
  ).length;
  let staticStageAux = [];
  for (
    b = 0;
    b <
    Math.floor(
      simulationParameters.heightDimension / simulationParameters.squareSide
    );
    b++
  ) {
    row = [];
    for (
      a = 0;
      a <
      Math.floor(
        simulationParameters.wideDimension / simulationParameters.squareSide
      );
      a++
    ) {
      row.push(
        materialGeneration(stageParameters.legendTerrain)[
          Math.floor(Math.random() * numberMaterials)
        ]
      );
    }
    staticStageAux.push(row);
    stageParameters.staticStage = staticStageAux;
  }

  return staticStageAux;
}

function materialGeneration(legendTerrain) {
  let materialArray = [];
  for (const prop in legendTerrain) {
    materialArray.push(legendTerrain[prop]);
  }
  return materialArray;
}

function matrixGeneratorInit(stageParameters, simulationParameters) {
  let a;
  let b;
  // let matrixAux = [];
  //matrixAux = cloneArray2D(stageParameters.staticStage);
  //stageParameters.matrix = cloneArray2D(matrixAux);
  //Initial case
  stageParameters.matrix = cloneArray2D(stageParameters.staticStage);
  stageParameters.dynamicElementsArray.forEach((item) => {
    //Live or dynamic elements color are added to the matrix
    stageParameters.matrix[
      -item.y +
        Math.floor(
          simulationParameters.heightDimension / simulationParameters.squareSide
        ) -
        1
    ][item.x] = item.color;
  });
  //stageParameters.matrix = cloneArray2D(matrixAux);

  return stageParameters.matrix;
}

function matrixGenerator(stageParameters, simulationParameters) {
  let matrixAux = [];

  let auxIndex = 0;
  let preyCoordinates;
  let prey;
  let energySustraction;
  let son;
  let sonsArray = [];

  matrixAux = cloneArray2D(stageParameters.staticStage);
  //1. We give movement to dynamic elements
  stageParameters.dynamicElementsArray.forEach((item) => {
    switch (item.walkmode) {
      case "static":
        staticMovement(item, stageParameters, simulationParameters);
        break;
      case "trajectory":
        trajectoryMovement(item, stageParameters, simulationParameters);
        break;
      case "autonomous":
        autonomousMovement(item, stageParameters, simulationParameters);
        // cellHeatDeath(item, stageParameters.dynamicElementsArray);
        // reproductionFunction(item, stageParameters, simulationParameters);
        break;
    }
    if (stageParameters.dynamicElementsArray.indexOf(item) !== -1) {
      // setColor(item, item.color, stageParameters.matrix, simulationParameters);
    }
  });

  debug_totalEnergy();
  debug_numberOfCells();
  return stageParameters.matrix;
}

function setColor(item, color, matrix, simulationParameters) {
  matrix[
    -item.y +
      Math.floor(
        simulationParameters.heightDimension / simulationParameters.squareSide
      ) -
      1
  ][item.x] = color;
}

export { generateStaticStage, matrixGeneratorInit, matrixGenerator, setColor };
