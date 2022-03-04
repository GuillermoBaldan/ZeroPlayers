import {
  generateStaticStage,
  matrixGenerator,
  matrixGeneratorInit,
} from "./ZeroPlayers_f_matrixGeneration.js";
import { initCanvas, drawingMatrix } from "./ZeroPlayers_f_canvas.js";
import {
  checkDataCoherence,
  coordinatesAssigment,
} from "./ZeroPlayers_f_dataCoherence.js";
import { continuosSimulationStep } from "./ZeroPlayers_f_simulation.js";
import { stopFlag } from "./index.js";
import { grossCell, grossPredator } from "./ZeroPlayers_classes_livingBeings.js";
import { energy2dynamicElements } from "./ZeroPlayers_f_universe.js";
import { debug_energyOfUniverse } from "./ZeroPlayers_f_debugging.js";
import {
  cloneArray2D,
  lastElement,
} from "./ZeroPlayers_f_arraysManipulation.js";
import {staticStageGeneration} from "./ZeroPlayers_f_staticStageGeneration.js";

function init(stageParameters, simulationParameters) {
  let staticStageAux = [];
  let matrixAux = [];
  let canvas;
  let flag = false;
  let a;
 
  document.getElementById("progressBar").style.display = "none";
  //staticStage Generation
  console.log("Before statiStageGeneration: dynamicELementsArray initial");
    console.log(stageParameters.dynamicElementsArray);
  stageParameters.staticStage = staticStageGeneration(stageParameters.generationStageAlgorithm,stageParameters, simulationParameters);
  //0. Check Data Coherence
  console.log("After statiStageGeneration: dynamicELementsArray initial");
  console.log(stageParameters.dynamicElementsArray);
  flag = checkDataCoherence(stageParameters, simulationParameters);
  if (flag) {
    //1.Initialize Canvas
    canvas = initCanvas(simulationParameters);
    //2.staticStage
    console.log("After initCanvas: dynamicELementsArray initial");
    console.log(stageParameters.dynamicElementsArray);

    
    
    matrixGeneratorInit(stageParameters, simulationParameters);
    //4. Draw canvas
    drawingMatrix(stageParameters, simulationParameters);
    //
    return [staticStageAux, matrixAux, canvas[0], canvas[1]]; //lienzo = canvas[0];ctx = canvas[1]
  } else {
    console.log("The data is not consistent");
  }
}


function simulation(stageParameters, simulationParameters) {
  //1. Hacemos la simulación paso a paso.
  continuosSimulationStep(stageParameters, simulationParameters);
}

export { init, simulation, drawingMatrix };
