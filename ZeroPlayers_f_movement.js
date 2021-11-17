import { simulation } from "./ZeroPlayers_f_level1.js";

function movement(dynamicItem_x, dynamicItem_y, f_movement, stageParameters, simulationParameters){
    let beforeAux = [dynamicItem_x,dynamicItem_y];
    let aux;
    let flag = false;
    if(stageParameters.universeRules.frontier == "close"){ //close borders case
      
            
            if (stageParameters.universeRules.movementType == "zigzag"){ //zigzag case
                aux = zigzag(dynamicItem_x,dynamicItem_y,f_movement)
            } else{ //diagonal case
                aux = diagonal(dynamicItem_x,dynamicItem_y,f_movement)
            }
            if (checkAdjacentEdges(aux,simulationParameters)){ //Comprobamos si hay bordes
                aux = beforeAux;
            }

    }else{//Caso de extremos adyacentes 'adjacent ends'
            if (stageParameters.universeRules.movementType == "zigzag"){ //zigzag case
                aux = zigzag(dynamicItem_x,dynamicItem_y,f_movement)
            } else{ //diagonal case
                
                aux = diagonal(dynamicItem_x,dynamicItem_y,f_movement)
                
            }
           
            aux =changeAdjacentEdges(aux, simulationParameters) //Comprobamos si hay bordes       
    }
    return aux;
}

function staticMovement(item,stageParameters,simulationParameters){
    stageParameters.matrix[
        -item.y +
          Math.floor(
            simulationParameters.heightDimension /
              simulationParameters.squareSide
          ) -
          1
      ][item.x] = item.color;
}

function trajectoryMovement(item, stageParamenters, simulationParameters){
    item.y = item.y + item.trajectory_y[simulationIndex];
    item.x = item.x + item.trajectory_x[simulationIndex];
    stageParamenters.matrix[
      -item.y +
        Math.floor(
          simulationParameters.heightDimension /
            simulationParameters.squareSide
        ) -
        1
    ][item.x] = item.color;
}

function zigzag(dynamicItem_x,dynamicItem_y,f_movement){
    return f_movement(dynamicItem_x,dynamicItem_y)
}

function diagonal(dynamicItem_x,dynamicItem_y,f_movement){
    let aux1;
    let aux2;
    aux1 = f_movement(dynamicItem_x,dynamicItem_y);
    aux2 = f_movement(dynamicItem_x,dynamicItem_y);
    return [aux1[0] - aux2[0],aux1[1] - aux2[1]] //Esto produce el movimiento exponencial
}

function checkAdjacentEdges(aux,simulationParameters){
    let extremeEdge_x = Math.floor(simulationParameters.wideDimension/simulationParameters.squareSide);
    let extremeEdge_y = Math.floor(simulationParameters.heightDimension/simulationParameters.squareSide);
    //Comprobamos extremo derecho
    if (aux[0] + 1 > extremeEdge_x) {
        return true;
    }
    //Comprobamos extremo izquierdo
    if (aux[0] - 1 < -1){
        return true;
    }
    //comprobamos extremo superior
    if (aux[1] + 1 > extremeEdge_y){
        return true;
    }
    //comprobamos extremo inferior
    if (aux[1] - 1 < -1){
        return true;
    }

}

function changeAdjacentEdges(aux,simulationParameters){
    let extremeEdge_x = Math.floor(simulationParameters.wideDimension/simulationParameters.squareSide) - 1;
    let extremeEdge_y = Math.floor(simulationParameters.heightDimension/simulationParameters.squareSide) - 1;
    //Cambiamos extremo derecho por extremo izquierdo
    if (aux[0] + 1 > extremeEdge_x){
        aux[0] = 0;
    }
    //Cambiamos extremo izquierdo por extremo derecho
    if (aux[0] - 1 < -1){
        aux[0] = extremeEdge_x;
    }
    //comprobamos extremo superior
    if (aux[1] + 1 > extremeEdge_y){
        aux[1] = 0;
    }
    //comprobamos extremo inferior
    if (aux[1] - 1 < -1){
        aux[1] = extremeEdge_y;
    }
    return aux;
}

function autonomousMovement(item, stageParameters, simulationParameters){
    let xy_before;
    let limit;
    xy_before = [item.x, item.y];
    limit = 0;
    do {
      xy = movement(xy_before[0],xy_before[1],item.walk, stageParameters, simulationParameters);
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
      let freePositionsArray = freePositionsArrayGenerator(simulationParameters, stageParameters);
      console.log(freePositionsArray);
      if(arrayOf2DVectorsIncludeVector(freePositionsArray,[xy[0],xy[1]])){
        console.log("Se mete en el if")
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
        matrixAux[  -xy_before[1] + Math.floor(simulationParameters.heightDimension / simulationParameters.squareSide) - 1][xy_before[0]] = stageParameters.staticStage[  -xy_before[1] + Math.floor(simulationParameters.heightDimension / simulationParameters.squareSide) - 1][xy_before[0]]; 
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


export {movement, staticMovement, trajectoryMovement, autonomousMovement}