import {matrixGenerator} from './ZeroPlayers_f_matrixGeneration.js';
import {drawingMatrix} from './ZeroPlayers_f_canvas.js'
import {globalSimulationIndex, stopFlag, loadGlobalSimulationIndex} from './index.js'
import { simulation } from './zeroPlayers_f_level1.js';

function oneSimulationStep(stageParameters,simulationParameters){
    // oneSimulationStep(simulationSteps,timePerStep, staticStage,dynamicElementsArray,ctx, squareSide,wideDimension)
    console.log("----------------------------------")
    console.log("simulationStep: "+simulationParameters.globalSimulationIndex)
    let matrixAux = matrixGenerator(stageParameters,simulationParameters);
    //matrixGenerator(staticStage,dynamicElementsArray,squareSide,wideDimension)
    console.log("f: oneSimulationStep: simulationParameters")
    console.log(simulationParameters)
    drawingMatrix(matrixAux,simulationParameters);
    simulationParameters.globalSimulationIndex +=1;
    //loadGlobalSimulationIndex(simulationIndex);
    if (simulationParameters.simulationSteps-simulationParameters.globalSimulationIndex>0 && stopFlag == false){
        setTimeout(function(){
        oneSimulationStep(stageParameters,simulationParameters)
        },simulationParameters.timePerStep)
        
       
    } else {
        if (stopFlag == true){
            console.log("Simulación parada")
        }else{
            console.log("Fin de la simulation");
        document.getElementById("playButton").innerHTML = "New Simulation";
        document.getElementById("playButton").disabled = false;
        //return simulationIndex;
        }
        

    }
}

export {oneSimulationStep}