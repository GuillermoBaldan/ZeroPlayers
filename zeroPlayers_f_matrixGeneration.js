import { cloneArray2D } from './zeroPlayers_f_arraysManipulation.js'
import {movement} from './zeroPlayers_f_movement.js'

function  generateStaticStage(legend,wideDimension,squareSide){
    let a;
    let b;
    let row = [];
    let numberMaterials = materialGeneration(legend).length;
    let staticStageAux =[];
    let heightDimension = wideDimension;
    for(b=0;b<Math.floor(heightDimension/squareSide);b++){
        row = [];
        for(a = 0;a<Math.floor(wideDimension/squareSide);a++){
            row.push(materialGeneration(legend)[Math.floor(Math.random()*numberMaterials)]);
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

function matrixGeneratorInit(staticStage,dynamicElementsArray,squareSide,wideDimension){
    let a;
    let b;
    let heightDimension = wideDimension;
    let matrixAux = [];
    matrixAux = cloneArray2D(staticStage);
    //Caso Inicial
    dynamicElementsArray.forEach( item =>{
        matrixAux[-item.y+Math.floor(heightDimension/squareSide)-1][item.x] = item.color;
    })
   
    return matrixAux;
}

function matrixGenerator(staticStage,dynamicElementsArray,simulationIndex,wideDimension,squareSide){
    let heightDimension = wideDimension;
    let matrixAux = [];
    let rulesObject = {
        movementType : "zigzag"
    }

    matrixAux = cloneArray2D(staticStage);
    dynamicElementsArray.forEach( item =>{
        //Modo 'trajectory'
        if (item.walkmode == 'trajectory'){
        item.y = item.y+item.trajectory_y[simulationIndex];
        item.x = item.x+item.trajectory_x[simulationIndex];
        matrixAux[-item.y+Math.floor(heightDimension/squareSide)-1][item.x] = item.color;
        }else{
        //Modo 'autonomous'
        item.x = movement(item.x,item.y, item.walk, rulesObject)[0];
        item.y = movement(item.x,item.y, item.walk, rulesObject)[1];
        matrixAux[-item.y+Math.floor(heightDimension/squareSide)-1][item.x] = item.color;
        /* item.y = item.y+item.walk();
        item.x = item.x+item.walk();
        matrixAux[-item.y+Math.floor(heightDimension/squareSide)-1][item.x] = item.color; */
        }
    })
    

    
    return matrixAux;
}

export {generateStaticStage,matrixGeneratorInit,matrixGenerator}