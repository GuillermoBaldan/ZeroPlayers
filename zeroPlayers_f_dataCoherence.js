import { multiple} from './zeroPlayers_f_math.js';

function  checkDataCoherence(dynamicElementsArray,wideDimension,squareSide){
    let flagMultiple = true; //checkDataCoherence is true if there isn´t data coherence errors
    let flagCheckInside = true;
    let flag = true;
    //1. Comprobar que wideDimension es multiplo de squarSide
    flagMultiple = multiple(wideDimension,squareSide);
    //2. Comprobar que ningún elemento dinámico queda fuera del canvas
    flagCheckInside = checkInsideCanvas(dynamicElementsArray,wideDimension,squareSide);
    if (flagMultiple&&flagCheckInside){
        flag = true
    }else {
        flag = false;
    }
    return flag;
}

function checkInsideCanvas(dynamicElementsArray,wideDimension,squareSide){
    let flag = true;
    dynamicElementsArray.forEach(item => {
        if ((item.x > wideDimension/squareSide) && (item.y > wideDimension/squareSide)){
        flag = false;
        }
        if ((item.x < 0) && item.y <0 ){
        flag = false;
        }
    });
    return flag;
}

export {checkDataCoherence}
