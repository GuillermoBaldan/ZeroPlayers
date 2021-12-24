import {
  cloneArray2D,
  cloneArray,
  arrayOf2DVectorsIncludeVector,
  copyVariable,
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
  let xy_before = [];
  let newPosition = [];
  let matrixAux = [];
  // Inicializamos las variables
  xy_before[0] = copyVariable(stageParameters.dynamicElementsArray[0].x);
  xy_before[1] = copyVariable(stageParameters.dynamicElementsArray[0].y);
  matrixAux = cloneArray2D(stageParameters.staticStage);
  //1 Calculamos nueva posicióndo
  do {
    newPosition[0] = xy_before[0] + Math.round(Math.random() * (1 + 1) - 1);
    newPosition[1] = xy_before[1] + Math.round(Math.random() * (1 + 1) - 1);
  } while (
    !(
      newPosition[0] >= 0 &&
      newPosition[0] < 3 &&
      newPosition[1] >= 0 &&
      newPosition[1] < 3
    )
  );
  //1.2 Comprobamos que no hay agua en la nueva posición
  matrixAux[newPosition[1]][newPosition[0]] = "yellow";
  stageParameters.dynamicElementsArray[0].x = newPosition[0];
  stageParameters.dynamicElementsArray[0].y = newPosition[1];
  return matrixAux;
}

function setColor(x, y, color, matrix, simulationParameters) {
  matrix[y][x] = color;
  /* matrix[
    -item.y +
      Math.floor(
        simulationParameters.heightDimension / simulationParameters.squareSide
      ) -
      1
  ][item.x] = color; */
  return matrix;
}

export { generateStaticStage, matrixGeneratorInit, matrixGenerator, setColor };
