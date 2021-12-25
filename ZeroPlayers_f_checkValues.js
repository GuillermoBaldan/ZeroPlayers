import { stageParameters } from "./index.js";
function checkSimpleCellsExistence(cadena, stageParameters) {
  let a;
  let b = 0;
  for (a = 0; a < stageParameters.dynamicElementsArray.length; a++) {
    if (
      stageParameters.dynamicElementsArray[a].constructor.name == "simpleCell"
    ) {
      b++;
    }
  }
}

function checkNumbersTypeCell(className, stageParameters) {
  let a;
  let counter = 0;
  for (a = 0; a < stageParameters.dynamicElementsArray.length; a++) {
    if (stageParameters.dynamicElementsArray[a].constructor.name == className) {
      counter += 1;
    }
  }
  return counter;
}

function freePositionsArrayGenerator(simulationParameters, stageParameters) {
  let freePositionsArray = [];
  let x_index;
  let y_index;
  let counter = 0;
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
        freePositionsArray.push([x_index, y_index]);
      }
    }
  }
  return freePositionsArray;
}

function occupyPosition(coordinates, stageParameters, simulationParameters) {
  let flag = false;
  console.log(
    `coordinates_x: ${coordinates[0]} coordinates_y: ${coordinates[1]}`
  );
  stageParameters.legendForbiddenColors.forEach((item) => {
    /* if (
      stageParameters.matrix[
        -coordinates[1] +
          Math.floor(
            simulationParameters.heightDimension /
              simulationParameters.squareSide
          ) -
          1
      ][coordinates[0]] == item
    ) {
      flag = true;
    } */
    if (stageParameters.matrix[coordinates[1]][coordinates[0]] == item) {
      flag = true;
    }
  });
  if (flag) {
    console.log("La posición está ocupada");
  }
  return flag;
}

function occupyPositionv2(x, y, stageParamenters, matrix) {
  let flag = false;
  if (stageParameters.matrix[y][x] == "yellow") {
    flag = true;
  }
  return flag;
}

function forbiddenPosition(x, y, stageParameters, matrix) {
  let flag = false;
  stageParameters.legendForbiddenColors.forEach((item) => {
     if (matrix[y][x] == item) {
      flag = true;
    }
  });
  return flag;
}

function setInFreePosition(item,stageParameters){//This function is used to initialize the stage
  while(forbiddenPosition(item.x,item.y,stageParameters,stageParameters.matrix)){
    item.x = Math.floor(Math.random() * stageParameters.matrix[0].length);
    item.y = Math.floor(Math.random() * stageParameters.matrix.length);
  }
  stageParameters.matrix[item.y][item.x] = item.color;
}

export {
  checkSimpleCellsExistence,
  checkNumbersTypeCell,
  freePositionsArrayGenerator,
  occupyPosition,
  occupyPositionv2,
  forbiddenPosition,
  setInFreePosition
};
