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
  //let heightDimension = wideDimension;
  let flagForbiddenPosition = false; //Por defecto no se ha activado la posición prohibida
  let matrixAux = [];
  let xy;
  let xy_before;
  let auxIndex = 0;
  let preyCoordinates;
  let prey;
  let energySustraction;
  let son;
  let limit;
  matrixAux = cloneArray2D(stageParameters.staticStage);
  //1. We give movement to dynamic elements
  stageParameters.dynamicElementsArray.forEach((item) => {
    if (item.walkmode == "static") {
      matrixAux[
        -item.y +
          Math.floor(
            simulationParameters.heightDimension /
              simulationParameters.squareSide
          ) -
          1
      ][item.x] = item.color;
    } else {
      //Mode 'trajectory'
      if (item.walkmode == "trajectory") {
        item.y = item.y + item.trajectory_y[simulationIndex];
        item.x = item.x + item.trajectory_x[simulationIndex];
        matrixAux[
          -item.y +
            Math.floor(
              simulationParameters.heightDimension /
                simulationParameters.squareSide
            ) -
            1
        ][item.x] = item.color;
      } else {
        //Mode 'autonomous'
        xy_before = [item.x, item.y];
        limit = 0;
        do {
          xy = movement(
            xy_before[0],
            xy_before[1],
            item.walk,
            stageParameters,
            simulationParameters
          );
          //item.behaviourRules.forbiddenPositions.forEach( positionType => {
          if (
            checkForbiddenPosition(
              stageParameters,
              simulationParameters,
              matrixAux,
              xy,
              item
            )
          ) {
            flagForbiddenPosition = true;
          } else {
            flagForbiddenPosition = false;
          }
          //})
          limit += 1;
        } while (flagForbiddenPosition && limit <= 8); //Le doy 8 intentos para encontrar una celda libre                    if (limit<8){
        if (limit < 8) {
          //Se comprueba que la nueva coordenada no haya sido ocupada por otro elemento
          let freePositionsArray = freePositionsArrayGenerator(
            simulationParameters,
            stageParameters
          );
          console.log(freePositionsArray);
          if (
            arrayOf2DVectorsIncludeVector(freePositionsArray, [xy[0], xy[1]])
          ) {
            item.x = xy[0];
            item.y = xy[1];
            //Se actualizan los colores de la matriz
            //Se pinta el color de la célula en la matriz
            matrixAux[
              -xy[1] +
                Math.floor(
                  simulationParameters.heightDimension /
                    simulationParameters.squareSide
                ) -
                1
            ][xy[0]] = item.color;
          }
          //Se pinta el color que queda libre en la matriz
          matrixAux[
            -xy_before[1] +
              Math.floor(
                simulationParameters.heightDimension /
                  simulationParameters.squareSide
              ) -
              1
          ][xy_before[0]] =
            stageParameters.staticStage[
              -xy_before[1] +
                Math.floor(
                  simulationParameters.heightDimension /
                    simulationParameters.squareSide
                ) -
                1
            ][xy_before[0]];
        } else {
          item.x = xy_before[0];
          item.y = xy_before[1];
        }

        matrixAux[
          -xy[1] +
            Math.floor(
              simulationParameters.heightDimension /
                simulationParameters.squareSide
            ) -
            1
        ][xy[0]] = item.color;
      }
    }
  });
  /*   //2 . Feed Function
  //2.1 The array is traversed
  stageParameters.dynamicElementsArray.forEach((item) => {
    //2.1.1 the coordinate of the prey is detected
    if (!(item.preyClasses.length == 0)) {
      preyCoordinates = preyDetection(item, stageParameters);
      if (preyCoordinates !== undefined) {
        preySelectionAndRemove(item, preyCoordinates, stageParameters);
      }
    }
  });
  checkSimpleCellsExistence("line102 - _f_matrixGeneration", stageParameters); */
  //Reproduction block
  /*    stageParameters.dynamicElementsArray.forEach(item => {
        if (item.reproductionRadio != undefined){
            son = new item.constructor;
           // do{
                do{
                son.x = item.x + Math.round(Math.random()*(son.reproductionRadio + son.reproductionRadio) - son.reproductionRadio)
                }while(!(son.x >= 0 && son.x <= Math.floor(simulationParameters.wideDimension/simulationParameters.squareSide) - 1))
                do{
                    son.y = item.y + Math.round(Math.random()*(son.reproductionRadio + son.reproductionRadio) - son.reproductionRadio)
                }while(!(son.y >= 0 && son.y <= Math.floor(simulationParameters.heightDimension/simulationParameters.squareSide) -1))
                if (!(checkExistenceInMatrix(son.x,son.y,stageParameters))){ //If there isn´t any object of dynamicElementsArray with this coordinates, then an object is created
                                                                    
                    stageParameters.dynamicElementsArray.push(son);
                }
               
        }
   
    }) */
  //3. Energy sustraction
  /*  for (
    auxIndex = 0;
    auxIndex < stageParameters.dynamicElementsArray.length;
    auxIndex++
  ) {
    energySustraction = Math.round(
      Math.random() *
        stageParameters.dynamicElementsArray[auxIndex].energyConsumption
    );
    stageParameters.dynamicElementsArray[auxIndex].energy -= energySustraction;
    energy2Universe(energySustraction, stageParameters); //Physical principle of energy conservation, the energy it is returned to the
    if (stageParameters.dynamicElementsArray[auxIndex].energy <= 0) {
      //The instance that has died of dynamicElementsArray is deleted
      stageParameters.dynamicElementsArray.splice(auxIndex, 1);
      auxIndex -= 1;
    }
  } */

  //2.1 The dinamicElementsArray array is traversed and we are subtracting a number of life points
  // that depends on each kind of organism
  /*  */
  return matrixAux;
}

function matrixGeneratorv2(stageParameters, simulationParameters) {
  //let heightDimension = wideDimension;

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
        reproductionFunction(item, stageParameters, simulationParameters);
        break;
    }
  });
  stageParameters.dynamicElementsArray.forEach((item) => {
    setColor(
      item.x,
      item.y,
      item.color,
      stageParameters.matrix,
      simulationParameters
    );
  });

  return stageParameters.matrix;
}

function setColor(element_x, element_y, color, matrix, simulationParameters) {
  matrix[
    -element_y +
      Math.floor(
        simulationParameters.heightDimension / simulationParameters.squareSide
      ) -
      1
  ][element_x] = color;
}

export {
  generateStaticStage,
  matrixGeneratorInit,
  matrixGenerator,
  matrixGeneratorv2,
  setColor,
};
