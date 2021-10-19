import {generateStaticStage, matrixGeneratorInit} from './ZeroPlayers_f_matrixGeneration.js';
import {initCanvas, drawingMatrix} from './ZeroPlayers_f_canvas.js'
import {checkDataCoherence} from './ZeroPlayers_f_dataCoherence.js'
import {oneSimulationStep} from './ZeroPlayers_f_simulation.js'
import {stopFlag} from './index.js'
import {globalSimulationIndex, simpleCell} from './index.js'



function init(stageParameters,simulationParameters){
    let staticStageAux = [];
    let matrixAux = [];
    let canvas;
    let flag = false;
    let a;
    //0. Check Data Coherence
    flag = checkDataCoherence(stageParameters,simulationParameters);
    if (flag){
        //1.Initialize Canvas
        canvas = initCanvas(simulationParameters)
        //2.staticStage
        stageParameters.staticStage = generateStaticStage(stageParameters,simulationParameters);
        //3.Add dynamic Elements
        for(a=0;a<2;a++){
            stageParameters.dynamicElementsArray.push(new simpleCell);
        }
       matrixAux = matrixGeneratorInit(stageParameters,simulationParameters);
        //4. Draw canvas
        drawingMatrix(matrixAux, simulationParameters);
        return [staticStageAux, matrixAux ,canvas[0], canvas[1]];//lienzo = canvas[0];ctx = canvas[1]
    } else {
        console.log("Los datos no son coherentes")
    }

}
//simulation(init_output[0],dynamicElementsArray,simulationSteps,timePerStep, wideDimension, squareSide,init_output[3])
function simulation(stageParameters,simulationParameters){
    //1. Hacemos la simulación paso a paso.
   //simulationParameters.globalSimulationIndex =  oneSimulationStep(stageParameters,simulationParameters)
   oneSimulationStep(stageParameters,simulationParameters)
   //return simulationIndexAux;
   }

export { init, simulation }