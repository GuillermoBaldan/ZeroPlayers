function totalFreedom(dynamicItem_x,dynamicItem_y){
    console.log("Entramos en totalFreedom")
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
console.log("f: checkForbiddenPosition")
console.log(`xy: (${xy[0]},${xy[1]})`)
console.log(`matrixAux[-xy[1]+Math.floor(simulationParameters.heightDimension/simulationParameters.squareSide)-1][xy[0]]: ${matrixAux[-xy[1]+Math.floor(simulationParameters.heightDimension/simulationParameters.squareSide)-1][xy[0]]}`)
if (matrixAux[-xy[1]+Math.floor(simulationParameters.heightDimension/simulationParameters.squareSide)-1][xy[0]] == forbiddenColor){
    return true;
}else{
    return false;
}

}

export {totalFreedom, left, right, up, down, checkForbiddenPosition}