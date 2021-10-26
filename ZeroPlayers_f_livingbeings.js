import {energy2Universe} from './ZeroPlayers_f_universe.js';

function totalFreedom(dynamicItem_x,dynamicItem_y){
    let buffer = randomSteps();
    dynamicItem_x = dynamicItem_x + buffer
    if (buffer != 0){
        return [dynamicItem_x,dynamicItem_y]
    } else{
        buffer = randomSteps()
        dynamicItem_y = dynamicItem_y + buffer
        return [dynamicItem_x,dynamicItem_y]
    }
}

function left(dynamicItem_x,dynamicItem_y){
    let aux = -1;
    dynamicItem_x += aux;
 return  [dynamicItem_x, dynamicItem_y]
}

function right(dynamicItem_x,dynamicItem_y){
    let aux = 1;
    dynamicItem_x += aux;
 return  [dynamicItem_x, dynamicItem_y]
}

function up(dynamicItem_x,dynamicItem_y){
    let aux = 1;
    dynamicItem_y += aux;
 return  [dynamicItem_x, dynamicItem_y]
}

function down(dynamicItem_x,dynamicItem_y){
    let aux = -1;
    dynamicItem_y += aux;
 return  [dynamicItem_x, dynamicItem_y]
}

function randomSteps(){
    let aux = (Math.round(Math.random() * (1 + 1)) -1)
    return aux;
}

function checkForbiddenPosition(stageParameters, simulationParameters, matrixAux, xy, positionType){ //Position type is a forbiddenPosition like water
let forbiddenColor;
//1. Codificamos positionType en un color, porque a cada positionType le corresponde un color
forbiddenColor = stageParameters.legend[positionType];
//2. Comprobamos si la posición xy corresponde con el color prohibido y si es así devolvemos true sino false
if (matrixAux[-xy[1]+Math.floor(simulationParameters.heightDimension/simulationParameters.squareSide)-1][xy[0]] == forbiddenColor){
    return true;
}else{
    return false;
}

}

function preyDetection(item, stageParameters){
    //Asignamos los valores de las celdas coolindates
    let predator_x = item.x;
    let predator_y = item.y;
    let aux_1 = [predator_x, predator_y + 1] //En principio esto no funciona para el modo "adjacent ends"
    let aux_2 = [predator_x + 1, predator_y + 1]
    let aux_3 = [predator_x +1, predator_y]
    let aux_4 = [predator_x + 1, predator_y - 1]
    let aux_5 = [predator_x, predator_y - 1]
    let aux_6 = [predator_x - 1, predator_y -1]
    let aux_7 = [predator_x - 1, predator_y]
    let aux_8 = [predator_x - 1, predator_y + 1]
    let auxArray;
    let preyArray = [];
    let preyCoordinates;
    if (stageParameters.movementType == "diagonal"){
        auxArray =  [aux_1, aux_2, aux_3, aux_4, aux_5, aux_6, aux_7, aux_8]
    } else {
        auxArray = [aux_1,aux_3,aux_5,aux_7]
    }
    //Recogemos en un array todos los elementos presa
    stageParameters.dynamicElementsArray.forEach( item2 => {
            item.preyClasses.forEach( item3 => {
            if (item2.constructor.name == item3.name){
                preyArray.push(item2);
            }
        })
    })
    //comprobamos si las coordenadas de algún elemento presa coinciden con las coordenadas colindantes
    auxArray.forEach( item4 => {
        preyArray.forEach( item5 => {
            if ((item4[0] == item5.x) && (item4[1] == item5.y)){
                preyCoordinates = [item5.x, item5.y];
            }
        })
      
    })
    return preyCoordinates;
}

function preySelectionAndRemove(item, preyCoordinates, stageParameters){
    let a;
    let element;
    for(a=0;a<stageParameters.dynamicElementsArray.length;a++){
        element = stageParameters.dynamicElementsArray[a];
        if (element.x == preyCoordinates[0]){
            if (element.y == preyCoordinates[1]){
                //Procedemos a hacer la transferencia de energía
                item.energy += element.energy
                if (item.energy > item.maxEnergy){
                    energy2Universe(item.maxEnergy-item.energy,stageParameters)
                    item.energy = item.maxEnergy
                }
                console.log(`item.energy: ${item.energy}`)
                //Procedemos a eliminar la presa, que ha sido absorvida, de dynamicElementsArray
                stageParameters.dynamicElementsArray.splice(a,1)
            }
        }
    }
   
}

export {totalFreedom, left, right, up, down, checkForbiddenPosition, preyDetection, preySelectionAndRemove}