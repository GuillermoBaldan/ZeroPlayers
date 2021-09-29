import {generateStaticStage} from './zeroPlayers_f_matrixGeneration.js';

function init(legend,wideDimension,squareSide,dynamicElementsArray,lienzo,ctx){
    let staticStageAux = [];
    //1.Initialize Canvas
    lienzo = document.getElementById("lienzo");
    lienzo.setAttribute("width", wideDimension);
    lienzo.setAttribute("height", wideDimension); 
    ctx = lienzo.getContext('2d');
    //2.staticStage
    staticStageAux = generateStaticStage(legend,wideDimension);
    console.log(staticStageAux);
    //3.dynamicStage
    //return [staticStageAux, dynamicStage,lienzo, ctx];
}

function simulation(){
    console.log("simulation");
}

export { init, simulation }