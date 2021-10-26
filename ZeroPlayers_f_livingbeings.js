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
//1. We encode positionType in a color, because each positionType corresponds to a color
forbiddenColor = stageParameters.legend[positionType];
//2. It is checked if the xy position corresponds to the prohibited color and if so, we return true otherwise, false
if (matrixAux[-xy[1]+Math.floor(simulationParameters.heightDimension/simulationParameters.squareSide)-1][xy[0]] == forbiddenColor){
    return true;
}else{
    return false;
}

}

function preyDetection(item, stageParameters){
    //We assign the values of the coolindates cells
    let predator_x = item.x;
    let predator_y = item.y;
    let aux_1 = [predator_x, predator_y + 1] //In principle this does not work for "adjacent ends" mode
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
    //We collect all the prey elements in an array
    stageParameters.dynamicElementsArray.forEach( item2 => {
            item.preyClasses.forEach( item3 => {
            if (item2.constructor.name == item3.name){
                preyArray.push(item2);
            }
        })
    })
    //It is checked if the coordinates of any prey element coincide with the neighboring coordinates
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
                //It proceeds to make the transfer of energy to the universe
                item.energy += element.energy
                if (item.energy > item.maxEnergy){ //The energy of a living being can´t be greather than its maximum level
                    energy2Universe(item.maxEnergy-item.energy,stageParameters)
                    item.energy = item.maxEnergy
                }
                console.log(`item.energy: ${item.energy}`)
                //It proceeds to remove the prey, which has been absorbed, from dynamicElementsArray
                stageParameters.dynamicElementsArray.splice(a,1)
            }
        }
    }
   
}

export {totalFreedom, left, right, up, down, checkForbiddenPosition, preyDetection, preySelectionAndRemove}