import { simulationParameters, stageParameters } from "./index.js";
import { checkExistenceInMatrix } from "./ZeroPlayers_f_dataCoherence.js";
import { circularSelection } from "./ZeroPlayers_f_livingbeings.js";
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

function setInFreePosition(item, stageParameters, simulationParameters) {
  //This function is used to initialize the stage
  while (
    forbiddenPosition(item.x, item.y, stageParameters, stageParameters.matrix)
  ) {
    item.x = Math.floor(
      Math.random() *
        (simulationParameters.wideDimension / simulationParameters.squareSide)
    );
    item.y = Math.floor(
      Math.random() *
        (simulationParameters.heightDimension / simulationParameters.squareSide)
    );
  }
  stageParameters.matrix[item.y][item.x] = item.color;
}

function setInsideStage(x, y, stageParameters, simulationParameters) {
  let flag = true;
  if (
    x < 0 ||
    x >
      Math.floor(
        simulationParameters.wideDimension / simulationParameters.squareSide
      ) -
        1
  ) {
    flag = false;
  }
  if (
    y < 0 ||
    y >
      Math.floor(
        simulationParameters.heightDimension / simulationParameters.squareSide
      ) -
        1
  ) {
    flag = false;
  }
  return flag;
}

function coordinates2son(father_item, son_item, simulationParameters) {
  //This function is used inside reproduction functions in order to assing the coordinates of the new item son.
  do {
    son_item.x =
      father_item.x +
      Math.round(
        Math.random() *
          (father_item.reproductionRadio + father_item.reproductionRadio) -
          father_item.reproductionRadio
      );
  } while (
    !(
      son_item.x >= 0 &&
      son_item.x <=
        Math.floor(
          simulationParameters.wideDimension / simulationParameters.squareSide
        ) -
          1
    )
  );
  do {
    son_item.y =
      father_item.y +
      Math.round(
        Math.random() *
          (father_item.reproductionRadio + father_item.reproductionRadio) -
          father_item.reproductionRadio
      );
  } while (
    !(
      son_item.y >= 0 &&
      son_item.y <=
        Math.floor(
          simulationParameters.heightDimension / simulationParameters.squareSide
        ) -
          1
    )
  );
  return son_item;
}

function sonInMatrix(father, son, stageParameters, simulationParameters) {
  let sonsArray = [];
  if (
    !checkExistenceInMatrix(son.x, son.y, stageParameters) &&
    father.energy > father.energyBorn
  ) {
    //If there isn´t any object of dynamicElementsArray with this coordinates,
    if (
      !forbiddenPosition(son.x, son.y, stageParameters, stageParameters.matrix)
    ) {
      //and if the position is not a forbidden position, then the object is created
      sonsArray.push(son);
      //Transfer of energy from Father to Son
      father.energy -= father.energyBorn;
      simulationParameters.globalCounter++;
    }
  }
  return sonsArray;
}

function checkReproductionRules(father, stageParameters) {
  let counter = 0;
  let flag = false;
  if (
    father.memorySense != undefined &&
    father.reproductionRules.blocks.length > 0
  ) {
    father.memorySense.memory.forEach((item) => {
      console.log("father");
      console.log(father);
      father.reproductionRules.blocks.forEach((item2) => {
        console.log("item2");
        console.log(item2);
        if (stageParameters.matrix[father.y][father.x] == item2.color) {
          //
          counter++;
          if (counter == item2.number) {
            flag = true;
          }
        }
      });
    });
  } else {
    flag = true;
  }
  return flag;
}

function checkReproductionRulesv2(father, stageParameters) {
  let counter = 0;
  let flag = false;
  father.memorySense.memory.forEach((item) => {
    console.log("father");
    console.log(father.reproductionRules.blocks);
    father.reproductionRules.blocks.forEach((item2) => {
      if (item.name == item2.name) {
        counter++;
        if (counter >= item2.number) {
          flag = true;
        }
      }
    });
  });
  return flag;
}

export {
  checkSimpleCellsExistence,
  checkNumbersTypeCell,
  freePositionsArrayGenerator,
  occupyPosition,
  occupyPositionv2,
  forbiddenPosition,
  setInFreePosition,
  setInsideStage,
  coordinates2son,
  sonInMatrix,
  checkReproductionRules,
  checkReproductionRulesv2,
};
