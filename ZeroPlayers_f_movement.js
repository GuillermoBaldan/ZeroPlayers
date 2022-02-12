import { simulation, drawingMatrix } from "./ZeroPlayers_f_level1.js";
import { checkForbiddenPosition } from "./ZeroPlayers_f_livingbeings.js";
import {
  freePositionsArrayGenerator,
  occupyPosition,
  occupyPositionv2,
} from "./ZeroPlayers_f_checkValues.js";
import { arrayOf2DVectorsIncludeVector } from "./ZeroPlayers_f_arraysManipulation.js";
import {
  cloneArray2D,
  removeItem,
} from "./ZeroPlayers_f_arraysManipulation.js";
import { setColor } from "./ZeroPlayers_f_matrixGeneration.js";
import { energy2Universe } from "./ZeroPlayers_f_universe.js";

function movement(
  item,
  f_movement,
  stageParameters,
  simulationParameters
) {
  let beforeAux = [item.x, item.y];
  let aux;
  let flag = false;
  if (stageParameters.universeRules.frontier == "close") {
    //close borders case

    if (stageParameters.universeRules.movementType == "zigzag") {
      //zigzag case
      aux = zigzag(item, f_movement);
    } else {
      //diagonal case
      aux = diagonal(item, f_movement);
    }
    if (checkAdjacentEdges(aux, simulationParameters)) {
      //Comprobamos si hay bordes
      aux = beforeAux;
    }
  } else {
    //Caso de extremos adyacentes 'adjacent ends'
    if (stageParameters.universeRules.movementType == "zigzag") {
      //zigzag case
      aux = zigzag(item, f_movement);
    } else {
      //diagonal case

      aux = diagonal(item, f_movement);
    }

    aux = changeAdjacentEdges(aux, simulationParameters); //Comprobamos si hay bordes
  }
  return aux;
}

function staticMovement(item, stageParameters, simulationParameters) {
  stageParameters.matrix[
    -item.y +
      Math.floor(
        simulationParameters.heightDimension / simulationParameters.squareSide
      ) -
      1
  ][item.x] = item.color;
}

function trajectoryMovement(item, stageParamenters, simulationParameters) {
  item.y = item.y + item.trajectory_y[simulationIndex];
  item.x = item.x + item.trajectory_x[simulationIndex];
  stageParamenters.matrix[
    -item.y +
      Math.floor(
        simulationParameters.heightDimension / simulationParameters.squareSide
      ) -
      1
  ][item.x] = item.color;
}

function zigzag(item, f_movement) {
  return f_movement(item);
}

function diagonal(item, f_movement) {
  let aux1;
  let aux2;
  aux1 = f_movement(item.x, item.y);
  aux2 = f_movement(item.x, item.y);
  return [aux1[0] - aux2[0], aux1[1] - aux2[1]]; //Esto produce el movimiento exponencial
}

function checkAdjacentEdges(aux, simulationParameters) {
  let extremeEdge_x = Math.floor(
    simulationParameters.wideDimension / simulationParameters.squareSide
  );
  let extremeEdge_y = Math.floor(
    simulationParameters.heightDimension / simulationParameters.squareSide
  );
  //Comprobamos extremo derecho
  if (aux[0] + 1 > extremeEdge_x) {
    return true;
  }
  //Comprobamos extremo izquierdo
  if (aux[0] - 1 < -1) {
    return true;
  }
  //comprobamos extremo superior
  if (aux[1] + 1 > extremeEdge_y) {
    return true;
  }
  //comprobamos extremo inferior
  if (aux[1] - 1 < -1) {
    return true;
  }
}

function changeAdjacentEdges(aux, simulationParameters) {
  let extremeEdge_x =
    Math.floor(
      simulationParameters.wideDimension / simulationParameters.squareSide
    ) - 1;
  let extremeEdge_y =
    Math.floor(
      simulationParameters.heightDimension / simulationParameters.squareSide
    ) - 1;
  //Cambiamos extremo derecho por extremo izquierdo
  if (aux[0] + 1 > extremeEdge_x) {
    aux[0] = 0;
  }
  //Cambiamos extremo izquierdo por extremo derecho
  if (aux[0] - 1 < -1) {
    aux[0] = extremeEdge_x;
  }
  //comprobamos extremo superior
  if (aux[1] + 1 > extremeEdge_y) {
    aux[1] = 0;
  }
  //comprobamos extremo inferior
  if (aux[1] - 1 < -1) {
    aux[1] = extremeEdge_y;
  }
  return aux;
}

function autonomousMovement(item, stageParameters, simulationParameters) {
  let matrixAux = stageParameters.staticStage;
  let xy_before;
  let limit;
  xy_before = [item.x, item.y];
  limit = 0;
  let xy;
  let flagForbiddenPosition = false; //Por defecto no se ha activado la posición prohibida
  xy = movement(
    xy_before[0],
    xy_before[1],
    item.walk,
    stageParameters,
    simulationParameters
  );
  //aqui se comprueba si la posicion esta ocupada

  /* if (occupyPosition(xy, stageParameters, simulationParameters)) {
    //Si está ocupada se regresa a la posición anterior
    xy[0] = xy_before[0];
    xy[1] = xy_before[1];
  } else {
    //Si no está ocupada se elimina el color prohibido (el de la célula) de la posición anterior
    stageParameters.matrix[xy_before[1]][xy_before[0]] = "brown";
   } */
  /*  if (occupyPositionv2(xy[0], xy[1], stageParameters)) {
    xy[0] = xy_before[0];
    xy[1] = xy_before[1];
  } else {
    stageParameters.matrix[xy_before[1]][xy_before[0]] = "brown";
  } */

  if (occupyPositionv2(xy[0], xy[1], stageParameters)) {
    console.log(
      `%c (Se mete en occupyPosition)`,
      "background: #76B900; color: #000000"
    );
    xy[0] = xy_before[0];
    xy[1] = xy_before[1];
  }

 /*  item.energy = item.energy - item.energyConsumption;
  energy2Universe(item.energyConsumption, stageParameters); */
  return xy;
}

export { movement, staticMovement, trajectoryMovement, autonomousMovement };
