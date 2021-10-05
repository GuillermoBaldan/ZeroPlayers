import {matrixGenerator} from './zeroPlayers_f_matrixGeneration.js';
import {drawingMatrix} from './zeroPlayers_f_canvas.js'
import {globalSimulationIndex, stopFlag, loadGlobalSimulationIndex} from './index.js'

function oneSimulationStep(simulationSteps,simulationIndex,timePerStep, staticStage,dynamicElementsArray,ctx,squareSide,wideDimension){
    // oneSimulationStep(simulationSteps,timePerStep, staticStage,dynamicElementsArray,ctx, squareSide,wideDimension)
    let matrixAux = matrixGenerator(staticStage,dynamicElementsArray,simulationIndex,wideDimension,squareSide);
    //matrixGenerator(staticStage,dynamicElementsArray,squareSide,wideDimension)
    drawingMatrix(matrixAux,squareSide,ctx);
    simulationIndex +=1;
    console.log("simulationStep: "+simulationIndex)
    loadGlobalSimulationIndex(simulationIndex);
    if (simulationSteps-simulationIndex>0 && stopFlag == false){
        setTimeout(function(){
        oneSimulationStep(simulationSteps,simulationIndex,timePerStep,staticStage,dynamicElementsArray,ctx,squareSide,wideDimension)
        },timePerStep)
       
    } else {
        if (stopFlag == true){
            console.log("Simulación parada")
        }else{
            console.log("Fin de la simulation");
        document.getElementById("playButton").innerHTML = "New Simulation";
        document.getElementById("playButton").disabled = false;
        return simulationIndex;
        }
        

    }
}

export {oneSimulationStep}