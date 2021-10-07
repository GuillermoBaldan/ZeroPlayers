import {generateStaticStage, matrixGeneratorInit} from './zeroPlayers_f_matrixGeneration.js';
import {initCanvas, drawingMatrix} from './zeroPlayers_f_canvas.js'
import {checkDataCoherence} from './zeroPlayers_f_dataCoherence.js'
import {oneSimulationStep} from './zeroPlayers_f_simulation.js'
import {stopFlag} from './index.js'
import {globalSimulationIndex} from './index.js'


function init(stageParamenters,simulationParameters){
    let staticStageAux = [];
    let matrixAux = [];
    let canvas;
    let flag = false;
    //0. Check Data Coherence
    flag = checkDataCoherence(stageParamenters,simulationParameters);
    if (flag){
        //1.Initialize Canvas
        canvas = initCanvas(simulationParameters)
        //2.staticStage
        staticStageAux = generateStaticStage(legend,wideDimension,squareSide);
        //3.Add dynamic Elements
        matrixAux = matrixGeneratorInit(staticStageAux,dynamicElementsArray,squareSide,wideDimension);
        //4. Draw canvas
        drawingMatrix(matrixAux,squareSide,canvas[1]);
        return [staticStageAux, matrixAux ,canvas[0], canvas[1]];//lienzo = canvas[0];ctx = canvas[1]
    } else {
        console.log("Los datos no son coherentes")
    }

}
//simulation(init_output[0],dynamicElementsArray,simulationSteps,timePerStep, wideDimension, squareSide,init_output[3])
function simulation(universeRules,staticStage,simulationIndex,dynamicElementsArray,simulationSteps,timePerStep, wideDimension, squareSide,ctx){
    let simulationIndexAux = 0;
    //1. Hacemos la simulación paso a paso.
   simulationIndexAux =  oneSimulationStep(universeRules, simulationSteps,simulationIndex,timePerStep, staticStage,dynamicElementsArray,ctx, squareSide,wideDimension)
   return simulationIndexAux;
   }

export { init, simulation }