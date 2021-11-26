import { simulationParameters } from "./index.js";
import {
  cloneArray2D,
  lastElement,
} from "./zeroPlayers_f_arraysManipulation.js";
import { multiple } from "./ZeroPlayers_f_math.js";

function checkDataCoherence(stageParameters, simulationParameters) {
  let flagMultiple = true; //checkDataCoherence is true if there isn´t data coherence errors
  let flagCheckInside = true;
  let flag = true;
  let numberOfSquareCells =
    (simulationParameters.wideDimension / simulationParameters.squareSide) *
    (simulationParameters.heightDimension / simulationParameters.squareSide);
  let counter = 0;
  //1. Comprobar que wideDimension es multiplo de squarSide
  flagMultiple = multiple(simulationParameters);
  //2. Comprobar que el número de los elementos dinámicos están caven dentro del escenario
  //2.1 Contamos el número de elementos dinámicos.
  stageParameters.livingBeingsCollection.forEach((item) => {
    counter += item.number;
  });
  //2.2 Comprobamos que el número de elementos dinámicos es igual o menor al número de celdas del escenario
  if (counter > numberOfSquareCells) {
    flag = false;
    return flag;
  }
  //3. Comprobar que ningún elemento dinámico queda fuera del canvas
  flagCheckInside = checkInsideCanvas(stageParameters, simulationParameters);
  if (flagMultiple && flagCheckInside) {
    flag = true;
  } else {
    flag = false;
  }
  return flag;
}

function checkInsideCanvas(stageParameters, simulationParameters) {
  let flag = true;
  stageParameters.dynamicElementsArray.forEach((item) => {
    if (
      item.x >
        simulationParameters.wideDimension / simulationParameters.squareSide &&
      item.y >
        simulationParameters.wideDimension / simulationParameters.squareSide
    ) {
      flag = false;
    }
    if (item.x < 0 && item.y < 0) {
      flag = false;
    }
  });
  return flag;
}

function checkExistenceInMatrix(x, y, stageParameters) {
  let a;
  let flag = false;
  for (a = 0; a < stageParameters.dynamicElementsArray.length; a++) {
    if (stageParameters.dynamicElementsArray[a].x == x) {
      if (
        -stageParameters.dynamicElementsArray[a].y +
          Math.floor(
            simulationParameters.heightDimension /
              simulationParameters.squareSide
          ) -
          1 ==
        y
      ) {
        flag = true;
      }
    }
  }
  return flag;
}

function coordinatesAssigment(simulationParameters, stageParameters) {
  let freePlacesArray = [];
  let freeCoordinate;
  let x_index;
  let y_index;
  let counter;
  //console.log("Se mete en coordinatesAssigmentv2")
  //1º Construimos un array de posiciones libresco

  counter = 0;
  for (
    x_index = 0;
    x_index <
    Math.floor(
      simulationParameters.wideDimension / simulationParameters.squareSide
    );
    x_index++
  ) {
    for (
      y_index = 0;
      y_index <
      Math.floor(
        simulationParameters.heightDimension / simulationParameters.squareSide
      );
      y_index++
    ) {
      //Se comprueba que la coordenada esta libre
      counter++;
      if (stageParameters.matrix.length > 0) {
        if (
          !stageParameters.legendForbiddenColors.includes(
            stageParameters.matrix[
              -y_index +
                Math.floor(
                  simulationParameters.heightDimension /
                    simulationParameters.squareSide
                ) -
                1
            ][x_index]
          )
        ) {
          //Si la coordenada esta libre se mete en freePlacesArray
          freePlacesArray.push([x_index, y_index]);
        }
      } else {
        if (
          !stageParameters.legendForbiddenColors.includes(
            stageParameters.staticStage[
              -y_index +
                Math.floor(
                  simulationParameters.heightDimension /
                    simulationParameters.squareSide
                ) -
                1
            ][x_index]
          )
        ) {
          //Si la coordenada esta libre se mete en freePlacesArray
          freePlacesArray.push([x_index, y_index]);
        }
      }
      //2º Elegimos una posición libre del array y la devolvemos
      freeCoordinate =
        freePlacesArray[Math.floor(Math.random() * freePlacesArray.length)];
    }
  }

  return freeCoordinate;
}

export { checkDataCoherence, checkExistenceInMatrix, coordinatesAssigment };
