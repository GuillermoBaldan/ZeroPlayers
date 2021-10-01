import {matrixGenerator} from './zeroPlayers_f_matrixGeneration.js';
import {drawingMatrix} from './zeroPlayers_f_canvas.js'

function oneSimulationStep(simulationSteps,timePerStep, staticStage,dynamicElementsArray,ctx,squareSide,wideDimension){
    let simulationIndex = 0;
    let matrixAux = matrixGenerator(staticStage,dynamicElementsArray,simulationIndex,wideDimension);
    //matrixGenerator(staticStage,dynamicElementsArray,squareSide,wideDimension)
    drawingMatrix(matrixAux,squareSide,ctx);
    simulationIndex +=1;
    console.log("simulationStep: "+(7-simulationSteps))
    if (simulationSteps-simulationIndex>0){
        setTimeout(function(){
            console.log("f:oneSimulationStep: squareSide: "+squareSide)
            oneSimulationStep(simulationSteps,timePerStep,staticStage,dynamicElementsArray,ctx,squareSide,wideDimension)
        },timePerStep)
       
    } else {
        console.log("Fin de la simulation");
    }
}

export {oneSimulationStep}