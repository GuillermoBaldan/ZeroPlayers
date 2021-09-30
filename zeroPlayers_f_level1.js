import {generateStaticStage, matrixGenerator} from './zeroPlayers_f_matrixGeneration.js';

function init(legend,wideDimension,squareSide,dynamicElementsArray,lienzo,ctx){
    let staticStageAux = [];
    let matrixAux = [];
    //1.Initialize Canvas
    lienzo = document.getElementById("lienzo");
    lienzo.setAttribute("width", wideDimension);
    lienzo.setAttribute("height", wideDimension); 
    ctx = lienzo.getContext('2d');
    //2.staticStage
    staticStageAux = generateStaticStage(legend,wideDimension);
    //3.Add dynamicStage
    matrixAux = matrixGenerator(staticStageAux,dynamicElementsArray,squareSide,wideDimension);
    //return [staticStageAux, dynamicStage,lienzo, ctx];
    //4. Draw canvas
}

function simulation(){
    console.log("simulation");
}

export { init, simulation }