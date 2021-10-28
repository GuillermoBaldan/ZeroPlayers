import {matrixGenerator} from './ZeroPlayers_f_matrixGeneration.js';
import {drawingMatrix, ordering4drawing} from './ZeroPlayers_f_canvas.js'
import {globalSimulationIndex, stopFlag, loadGlobalSimulationIndex} from './index.js'
import { simulation } from './ZeroPlayers_f_level1.js';
import {cloneArray} from './ZeroPlayers_f_arraysManipulation.js'
import {checkSimpleCellsExistence} from './ZeroPlayers_f_checkValues.js'

function oneSimulationStep(stageParameters,simulationParameters){
    // oneSimulationStep(simulationSteps,timePerStep, staticStage,dynamicElementsArray,ctx, squareSide,wideDimension)
    console.log("----------------------------------")
    console.log("simulationStep: "+(simulationParameters.globalSimulationIndex+1))
    //Reordering dynamicElementsArray block--
    stageParameters.dynamicElementsArray = cloneArray(ordering4drawing(stageParameters))
    console.log("dynamicElementsArray")
    console.log(stageParameters.dynamicElementsArray)
    console.log(`dynamicElementsArray: ${stageParameters.dynamicElementsArray.length}`)
    checkSimpleCellsExistence(stageParameters)
    //------
    let matrixAux = matrixGenerator(stageParameters,simulationParameters);
    //matrixGenerator(staticStage,dynamicElementsArray,squareSide,wideDimension)
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