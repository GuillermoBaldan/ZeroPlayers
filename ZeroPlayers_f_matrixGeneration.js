import { cloneArray2D } from './ZeroPlayers_f_arraysManipulation.js'
import {movement} from './ZeroPlayers_f_movement.js'

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
    let matrixAux = [];
    let xy;
    matrixAux = cloneArray2D(stageParameters.staticStage);
    stageParameters.dynamicElementsArray.forEach( item =>{
        //Modo 'trajectory'
        if (item.walkmode == 'trajectory'){
        item.y = item.y+item.trajectory_y[simulationIndex];
        item.x = item.x+item.trajectory_x[simulationIndex];
        matrixAux[-item.y+Math.floor(simulationParameters.heightDimension/simulationParameters.squareSide)-1][item.x] = item.color;
        }else{
        //Modo 'autonomous'
        xy = movement(item.x,item.y, item.walk, stageParameters)
        item.x = xy[0]
        item.y = xy[1]
        console.log(`item.x: ${item.x}, item.y: ${item.y}`)
        //console.log(`(${xy[0]},${xy[1]})`);
        matrixAux[-xy[1]+Math.floor(simulationParameters.heightDimension/simulationParameters.squareSide)-1][xy[0]] = item.color;
        }
    })
    

    
    return matrixAux;
}

export {generateStaticStage,matrixGeneratorInit,matrixGenerator}