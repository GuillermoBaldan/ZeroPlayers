import {
  cloneArray2D,
  cloneArray,
  arrayOf2DVectorsIncludeVector,
  copyVariable,
  lastElement,
} from "./ZeroPlayers_f_arraysManipulation.js";
import { movement } from "./ZeroPlayers_f_movement.js";
import {
  checkForbiddenPosition,
  preyDetection,
  preySelectionAndRemove,
  reproductionFunction,
  cellHeatDeath,
  dynamicElementsGenerator,
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
  forbiddenPosition,
  setInFreePosition
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
import { simulation } from "./ZeroPlayers_f_level1.js";

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
 //Initial case
 stageParameters.matrix = cloneArray2D(stageParameters.staticStage);
 //Add dinamic Elements
 dynamicElementsGenerator(stageParameters)
  return stageParameters.matrix;
}



function matrixGenerator(stageParameters, simulationParameters) {
  // Inicializamos las variables
  //matrixAux = cloneArray2D(stageParameters.staticStage);
 stageParameters.matrix = giveMovementToDynamicElements(stageParameters.matrix, stageParameters, simulationParameters);
  return stageParameters.matrix;
}

function setColor(x, y, color, matrix, simulationParameters) {
  matrix[y][x] = color;
  return matrix;
}

function giveMovementToDynamicElements(matrix, stageParameters, simulationParameters) {
  let xy_before = [];
  let newPosition = [];
  stageParameters.dynamicElementsArray.forEach((item) => {
    xy_before[0] = item.x
    xy_before[1] = item.y
    //1 Calculamos nueva posicióndo
    do {
      console.log("Se mete en el do")
      newPosition[0] = xy_before[0] + Math.round(Math.random() * (1 + 1) - 1);
      newPosition[1] = xy_before[1] + Math.round(Math.random() * (1 + 1) - 1);
    } while (
      !(
        newPosition[0] >= 0 &&
        newPosition[0] <
          simulationParameters.wideDimension / simulationParameters.squareSide &&
        newPosition[1] >= 0 &&
        newPosition[1] <
          simulationParameters.heightDimension / simulationParameters.squareSide
      )
    );
     //1.2 Comprobamos que no hay agua u otra célula en la nueva posición
    if (
      !forbiddenPosition(
        newPosition[0],
        newPosition[1],
        stageParameters,
        matrix
      )
    ) {//Actualizamos nueva posición
      console.log("new position")
      item.x = newPosition[0];
      item.y = newPosition[1];
      matrix[item.y][item.x] = item.color;
      matrix[xy_before[1]][xy_before[0]] = stageParameters.staticStage[xy_before[1]][xy_before[0]];
     
    } else {//Volvemos a colorear la posición anterior
      console.log('%c "old position" ', 'background: #222; color: #bada55');
     // matrix[item.y][item.x] = item.color;
    }
  });

  return matrix;
}

export { generateStaticStage, matrixGeneratorInit, matrixGenerator, setColor };
