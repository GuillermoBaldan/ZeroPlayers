import {generateStaticStage, matrixGenerator} from './zeroPlayers_f_matrixGeneration.js';
import {initCanvas, drawingMatrix} from './zeroPlayers_f_canvas.js'

function init(legend,wideDimension,squareSide,dynamicElementsArray,lienzo,ctx){
    let staticStageAux = [];
    let matrixAux = [];
    let canvas;
    //1.Initialize Canvas
    canvas = initCanvas(lienzo,ctx,wideDimension)
    //2.staticStage
    staticStageAux = generateStaticStage(legend,wideDimension,squareSide);
    //3.Add dynamic Elements
    matrixAux = matrixGenerator(staticStageAux,dynamicElementsArray,squareSide,wideDimension);
    //4. Draw canvas
    drawingMatrix(matrixAux,squareSide,canvas[1]);
    //return [staticStageAux, dynamicStage,canvas[0], canvas[1]];lienzo = canvas[0];ctx = canvas[1]
}

function simulation(){
    console.log("simulation");
}

export { init, simulation }