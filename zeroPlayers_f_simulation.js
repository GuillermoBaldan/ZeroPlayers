import {matrixGenerator} from './zeroPlayers_f_matrixGeneration.js';
import {drawingMatrix} from './zeroPlayers_f_canvas.js'
import {globalSimulationIndex, stopFlag, loadGlobalSimulationIndex} from './index.js'

function oneSimulationStep(stageParameters,simulationParameters){
    // oneSimulationStep(simulationSteps,timePerStep, staticStage,dynamicElementsArray,ctx, squareSide,wideDimension)
    console.log("----------------------------------")
    console.log("simulationStep: "+simulationParameters.simulationIndex)
    let matrixAux = matrixGenerator(stageParameters, simulationParameters);
    //matrixGenerator(staticStage,dynamicElementsArray,squareSide,wideDimension)
    drawingMatrix(matrixAux,simulationParameters.squareSide,simulationParameters.ctx);
    simulationParameters.simulationIndex +=1;
    loadGlobalSimulationIndex(simulationParameters.simulationIndex);
    if (simulationParameters.simulationSteps-simulationParameters.simulationIndex>0 && stopFlag == false){
        setTimeout(function(){
        oneSimulationStep(stageParameters, simulationParameters)
        },simulationParameters.timePerStep)
        
       
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