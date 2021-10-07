import { multiple} from './zeroPlayers_f_math.js';

function  checkDataCoherence(simulationParameters){
    let flagMultiple = true; //checkDataCoherence is true if there isn´t data coherence errors
    let flagCheckInside = true;
    let flag = true;
    //1. Comprobar que wideDimension es multiplo de squarSide
    flagMultiple = multiple(simulationParameters);
    //2. Comprobar que ningún elemento dinámico queda fuera del canvas
    flagCheckInside = checkInsideCanvas(simulationParameters);
    if (flagMultiple&&flagCheckInside){
        flag = true
    }else {
        flag = false;
    }
    return flag;
}

function checkInsideCanvas(simulationParameters){
    let flag = true;
    simulationParameters.dynamicElementsArray.forEach(item => {
        if ((item.x > simulationParamenters.wideDimension/simulationParameters.squareSide) && (item.y > simulationParameters.wideDimension/simulationParameters.squareSide)){
        flag = false;
        }
        if ((item.x < 0) && item.y <0 ){
        flag = false;
        }
    });
    return flag;
}

export {checkDataCoherence}
