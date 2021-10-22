import { cloneArray2D } from './ZeroPlayers_f_arraysManipulation.js'
import {movement} from './ZeroPlayers_f_movement.js'
import {checkForbiddenPosition} from './ZeroPlayers_f_livingbeings.js'

function  generateStaticStage(stageParameters,simulationParameters){
    let a;
    let b;
    let row = [];
    let numberMaterials = materialGeneration(stageParameters.legend).length;
    let staticStageAux =[];
    for(b=0;b<Math.floor(simulationParameters.heightDimension/simulationParameters.squareSide);b++){
        row = [];
        for(a = 0;a<Math.floor(simulationParameters.wideDimension/simulationParameters.squareSide);a++){
            row.push(materialGeneration(stageParameters.legend)[Math.floor(Math.random()*numberMaterials)]);
            }
            staticStageAux.push(row)
    }
  
    return staticStageAux;
}

function materialGeneration(legend){
    let materialArray = [];
    for (const prop in legend){
        materialArray.push(legend[prop]);
    }
    return materialArray;
}

function matrixGeneratorInit(stageParameters, simulationParameters){
    let a;
    let b;
    let matrixAux = [];
    matrixAux = cloneArray2D(stageParameters.staticStage);
    //Caso Inicial
     stageParameters.dynamicElementsArray.forEach( item =>{ //Se dibujan los elementos vivos o dinámicos
        matrixAux[-item.y+Math.floor(simulationParameters.heightDimension/simulationParameters.squareSide)-1][item.x] = item.color;
        
    })
   
    return matrixAux;
}

function matrixGenerator(stageParameters, simulationParameters){
    //let heightDimension = wideDimension;
    let flagForbiddenPosition = false; //Por defecto no se ha activado la posición prohibida
    let matrixAux = [];
    let xy;
    let xy_before;
    matrixAux = cloneArray2D(stageParameters.staticStage);
    //1. We give movement to dynamic elements
    stageParameters.dynamicElementsArray.forEach( item =>{
        if (item.walkmode == "static") {
            matrixAux[-item.y+Math.floor(simulationParameters.heightDimension/simulationParameters.squareSide)-1][item.x] = item.color;
        } else {
            //Modo 'trajectory'
            if (item.walkmode == 'trajectory'){
                item.y = item.y+item.trajectory_y[simulationIndex];
                item.x = item.x+item.trajectory_x[simulationIndex];
                matrixAux[-item.y+Math.floor(simulationParameters.heightDimension/simulationParameters.squareSide)-1][item.x] = item.color;
                }else{
                //Modo 'autonomous'
                    xy_before = [item.x, item.y];
                    do {
                    
                    xy = movement(xy_before[0],xy_before[1], item.walk, stageParameters, simulationParameters)
                        item.behaviourRules.forbiddenPositions.forEach( positionType => {
                        if(checkForbiddenPosition(stageParameters,simulationParameters, matrixAux, xy, positionType)){
                            flagForbiddenPosition = true;
                        } else{
                            flagForbiddenPosition = false;
                        }
                        })
                    } while (flagForbiddenPosition)
                    item.x = xy[0];
                    item.y = xy[1];
                    matrixAux[-xy[1]+Math.floor(simulationParameters.heightDimension/simulationParameters.squareSide)-1][xy[0]] = item.color;
                }

        }
        //2.We calculate the life points at the end when all the cell processes have been done
            //Calculamos la energía final de la célula al final del ciclo de simulación.
            //Si la energía llega a 0, la célula muere aunque tenga muchos puntos de vida.
            //2.1 Recorremos el array dinamicElementsArray y vamos restando una cantidad de puntos de vida
            // que depende de cada clase de organismo
            

    })
    

    
    return matrixAux;
}

export {generateStaticStage,matrixGeneratorInit,matrixGenerator}