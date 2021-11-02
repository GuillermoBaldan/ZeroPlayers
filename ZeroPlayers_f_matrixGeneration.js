import { cloneArray2D, cloneArray } from './ZeroPlayers_f_arraysManipulation.js'
import {movement} from './ZeroPlayers_f_movement.js'
import {checkForbiddenPosition, preyDetection, preySelectionAndRemove} from './ZeroPlayers_f_livingbeings.js'
import { energy2Universe, energy2dynamicElements } from './ZeroPlayers_f_universe.js';
import {ordering4drawing} from './ZeroPlayers_f_canvas.js';
import { checkSimpleCellsExistence} from './ZeroPlayers_f_checkValues.js'
import {checkExistenceInMatrix} from './ZeroPlayers_f_dataCoherence.js'

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
    //Initial case
     stageParameters.dynamicElementsArray.forEach( item =>{ //Live or dynamic elements are drawn
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
    let auxIndex = 0;
    let preyCoordinates;
    let prey;
    let energySustraction;
    let son;
    let limit;
    matrixAux = cloneArray2D(stageParameters.staticStage);
    //1. We give movement to dynamic elements
    stageParameters.dynamicElementsArray.forEach( item =>{
        if (item.walkmode == "static") {
           matrixAux[-item.y+Math.floor(simulationParameters.heightDimension/simulationParameters.squareSide)- 1][item.x] = item.color;
        } else {
            //Mode 'trajectory'
            if (item.walkmode == 'trajectory'){
                item.y = item.y+item.trajectory_y[simulationIndex];
                item.x = item.x+item.trajectory_x[simulationIndex];
                matrixAux[-item.y+Math.floor(simulationParameters.heightDimension/simulationParameters.squareSide)-1][item.x] = item.color;
                }else{
                //Mode 'autonomous'
                    xy_before = [item.x, item.y];
                    limit = 0;
                    do {
                    
                    xy = movement(xy_before[0],xy_before[1], item.walk, stageParameters, simulationParameters)
                        //item.behaviourRules.forbiddenPositions.forEach( positionType => {
                        if(checkForbiddenPosition(stageParameters,simulationParameters, matrixAux, xy, item)){
                            flagForbiddenPosition = true;
                        } else{
                            flagForbiddenPosition = false;
                        }
                        //})
                       limit += 1;
                    } while (flagForbiddenPosition || (limit>8))
                    if (limit<8){
                        item.x = xy[0];
                        item.y = xy[1];
                    } else{
                        item.x = xy_before[0];
                        item.y = xy_before[1];
                    }

                    
                    matrixAux[-xy[1]+Math.floor(simulationParameters.heightDimension/simulationParameters.squareSide)-1][xy[0]] = item.color;
                }

        }
    })
    //2 . Feed Function
    //2.1 The array is traversed
    stageParameters.dynamicElementsArray.forEach(item => {
    //2.1.1 the coordinate of the prey is detected
       if (!(item.preyClasses.length == 0)){
            preyCoordinates = preyDetection(item, stageParameters)
            if (preyCoordinates !== undefined){
                preySelectionAndRemove(item, preyCoordinates, stageParameters)
            }
            
        }    
    })
    checkSimpleCellsExistence("line102 - _f_matrixGeneration",stageParameters)
    //Reproduction block
    stageParameters.dynamicElementsArray.forEach(item => {
        if (item.reproductionRadio != undefined){
            son = new item.constructor;
           // do{
                do{
                son.x = item.x + Math.round(Math.random()*(son.reproductionRadio + son.reproductionRadio) - son.reproductionRadio)
                }while(!(son.x >= 0 && son.x <= Math.floor(simulationParameters.wideDimension/simulationParameters.squareSide) - 1))
                do{son.y = item.y + Math.round(Math.random()*(son.reproductionRadio + son.reproductionRadio) - son.reproductionRadio)
                }while(!(son.y >= 0 && son.y <= Math.floor(simulationParameters.heightDimension/simulationParameters.squareSide) -1))
                if (!(checkExistenceInMatrix(son.x,son.y,stageParameters))){ //Si no hay ningún objeto de dynamicElements con esas coordenadas,
                                                                     //Entonces se crea el objeto
                    stageParameters.dynamicElementsArray.push(son);
                }
               
            //}while(!(matrixAux[-son.y+Math.floor(simulationParameters.heightDimension/simulationParameters.squareSide)-1][son.x] == "green"))
        }
     /*    if( stageParameters.dynamicElementsArray.length > 10000){ //Sentencia de control para no sobrecargar el navegador por la generación descontralada de elementos dinámicos
            stageParameters.dynamicElementsArray = [];
        } */
    })
    checkSimpleCellsExistence("line120 - _f_matrixGeneration",stageParameters)
    //Reordering for drawing code block
   /*  stageParameters.dynamicElementsArray = cloneArray(ordering4drawing(stageParameters))
    console.log("dynamicElementsArray")
    console.log(stageParameters.dynamicElementsArray)
    console.log(`dynamicElementsArray: ${stageParameters.dynamicElementsArray.length}`)
    -------------------------------------------- */
   /*  console.log("previous to ordering4drawing")
    console.log(ordering4drawing(stageParameters))
    console.log("dynamicElementsArray")
    console.log(stageParameters.dynamicElementsArray)
    stageParameters.dynamicElementsArray = ordering4drawing(stageParameters)
    
    console.log("ordering4drawing")
    console.log(ordering4drawing(stageParameters));
    console.log(`dynamicElementsArray: ${stageParameters.dynamicElementsArray.length}`) */
    
    for(auxIndex = 0;auxIndex<stageParameters.dynamicElementsArray.length;auxIndex++){
        energySustraction = Math.round(Math.random()*stageParameters.dynamicElementsArray[auxIndex].energyConsumption)
        stageParameters.dynamicElementsArray[auxIndex].energy -= energySustraction;
        energy2Universe(energySustraction,stageParameters); //Physical principle of energy conservation, the energy it is returned to the 
        if (stageParameters.dynamicElementsArray[auxIndex].energy <= 0){ //The instance that has died of dynamicElementsArray is deleted
            stageParameters.dynamicElementsArray.splice(auxIndex,1)
            auxIndex -= 1;
        }
    }
    //2.1 The dinamicElementsArray array is traversed and we are subtracting a number of life points
    // that depends on each kind of organism  
    for(auxIndex = 0;auxIndex<stageParameters.dynamicElementsArray.length;auxIndex++){
        stageParameters.dynamicElementsArray[auxIndex].life -= Math.round(Math.random()*stageParameters.dynamicElementsArray[auxIndex].lifeConsumption);
        if (stageParameters.dynamicElementsArray[auxIndex].life <= 0){ //The instance that has died of dynamicElementsArray is deleted
            stageParameters.dynamicElementsArray.splice(auxIndex,1)
            auxIndex -= 1;
        }
    }
    
    return matrixAux;
}

export {generateStaticStage,matrixGeneratorInit,matrixGenerator}