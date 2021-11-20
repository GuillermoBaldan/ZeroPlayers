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
    //console.log(`constructor.name ${stageParameters.dynamicElementsArray[a].constructor.name}`)
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

export {
  checkSimpleCellsExistence,
  checkNumbersTypeCell,
  freePositionsArrayGenerator,
};
