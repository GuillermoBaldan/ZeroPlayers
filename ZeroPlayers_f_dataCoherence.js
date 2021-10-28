import { multiple} from './ZeroPlayers_f_math.js';

function  checkDataCoherence(stageParameters,simulationParameters){
    let flagMultiple = true; //checkDataCoherence is true if there isn´t data coherence errors
    let flagCheckInside = true;
    let flag = true;
    //1. Comprobar que wideDimension es multiplo de squarSide
    flagMultiple = multiple(simulationParameters);
    //2. Comprobar que ningún elemento dinámico queda fuera del canvas
    flagCheckInside = checkInsideCanvas(stageParameters,simulationParameters);
    if (flagMultiple&&flagCheckInside){
        flag = true
    }else {
        flag = false;
    }
    return flag;
}

function checkInsideCanvas(stageParameters,simulationParameters){
    let flag = true;
    stageParameters.dynamicElementsArray.forEach(item => {
        if ((item.x > simulationParameters.wideDimension/simulationParameters.squareSide) && (item.y > simulationParameters.wideDimension/simulationParameters.squareSide)){
        flag = false;
        }
        if ((item.x < 0) && item.y <0 ){
        flag = false;
        }
    });
    return flag;
}

function checkExistenceInMatrix(x,y,stageParameters){
    let a;
    let flag = false;
    for(a=0;a<stageParameters.dynamicElementsArray.length;a++){
        if (stageParameters.dynamicElementsArray[a].x == x){
            if (stageParameters.dynamicElementsArray[a].y == y){
                flag = true
            }
        }
    }
    return flag;
}

export {checkDataCoherence, checkExistenceInMatrix}
