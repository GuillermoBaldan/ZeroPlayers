import { cloneArray2D } from "./ZeroPlayers_f_arraysManipulation.js";
import { debug_DetectCoordinatesRepeated, debug_circle, debug_grid } from "./ZeroPlayers_f_debugging.js";
import { simulation } from "./ZeroPlayers_f_level1.js";

function initCanvas(simulationParameters) {
  simulationParameters.lienzo = document.getElementById("lienzo");
  simulationParameters.lienzo.setAttribute(
    "width",
    simulationParameters.wideDimension
  );
  simulationParameters.lienzo.setAttribute(
    "height",
    simulationParameters.wideDimension
  );
  simulationParameters.ctx = simulationParameters.lienzo.getContext("2d");
  return [simulationParameters.lienzo, simulationParameters.ctx];
}

function drawingMatrix(stageParameters, simulationParameters) {
  //1. Recorremos el array stage
  ///let matrixAux = [];
  let x = 0;
  let y = 0;
  let Ax = simulationParameters.squareSide;
  let Ay = simulationParameters.squareSide;
  //matrixAux = matrix;
  //matrixAux = cloneArray2D(matrix);

  stageParameters.matrix.forEach((row) => {
    row.forEach((column) => {
      drawSquare(x, y, column, simulationParameters);
      x = x + Ax;
    });
    x = 0;
    y = y + Ay;
  });
  // matrixAux = [];
 /*  debug_circle();
  debug_grid(); */
}

function drawSquare(x, y, color, simulationParameters) {
  simulationParameters.ctx.beginPath();
  simulationParameters.ctx.fillStyle = `${color}`;
  simulationParameters.ctx.fillRect(
    x,
    y,
    simulationParameters.wideDimension,
    simulationParameters.heightDimension
  );
  simulationParameters.ctx.stroke();
}
// ¿Para que sirve esta función
function ordering4drawing(stageParameters) {
  let a;
  let temp;
  let tempArray = [];
  let result;
  for (a = 0; a < stageParameters.dynamicElementsArray.length; a++) {
    if (stageParameters.dynamicElementsArray[a].walkmode == "autonomous") {
      temp = stageParameters.dynamicElementsArray[a];
      stageParameters.dynamicElementsArray.splice(a, 1);
      tempArray.push(temp);
      a -= 1;
    }
  }
  result = stageParameters.dynamicElementsArray.concat(tempArray);
  return result;
}

export { initCanvas, drawingMatrix, ordering4drawing };
