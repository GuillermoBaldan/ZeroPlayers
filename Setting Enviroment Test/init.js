function initCanvas(simulationParameters){
    simulationParameters.lienzo = document.getElementById("lienzo");
    simulationParameters.lienzo.setAttribute("width", simulationParameters.wideDimension);
    simulationParameters.lienzo.setAttribute("height", simulationParameters.wideDimension); 
    simulationParameters.ctx = simulationParameters.lienzo.getContext('2d');
    return [simulationParameters.lienzo, simulationParameters.ctx]
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

function multiple(simulationParameters){
    let flag = true //wideDimension es múltiplo de squareSide
    if (simulationParameters.wideDimension % simulationParameters.squareSide !== 0){
        console.log("Se mete en el if")
        flag = false;
        }
    return flag; 
}


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

function init(stageParameters,simulationParameters){
    let staticStageAux = [];
    let matrixAux = [];
    let canvas;
    let flag = false;
    //0. Check Data Coherence
    flag = checkDataCoherence(stageParameters,simulationParameters);
    if (flag){
        //1.Initialize Canvas
        canvas = initCanvas(simulationParameters)
        //2.staticStage
        stageParameters.staticStage = generateStaticStage(stageParameters,simulationParameters);
        //3.Add dynamic Elements
        matrixAux = matrixGeneratorInit(stageParameters,simulationParameters);
        //4. Draw canvas
        drawingMatrix(matrixAux, simulationParameters);
        return [staticStageAux, matrixAux ,canvas[0], canvas[1]];//lienzo = canvas[0];ctx = canvas[1]
    } else {
        console.log("The data is not consistent")
    }

}

module.exports = init;