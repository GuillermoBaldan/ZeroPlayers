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
import { grossCell, simpleCell } from "./ZeroPlayers_classes_livingBeings.js";
import { energy2dynamicElements } from "./ZeroPlayers_f_universe.js";
import { debug_energyOfUniverse } from "./ZeroPlayers_f_debugging.js";
import {
  cloneArray2D,
  lastElement,
} from "./ZeroPlayers_f_arraysManipulation.js";

function init(stageParameters, simulationParameters) {
  let staticStageAux = [];
  let matrixAux = [];
  let canvas;
  let flag = false;
  let a;
  let freeCoordinate;
  document.getElementById("progressBar").style.display = "none";
  //0. Check Data Coherence
  flag = checkDataCoherence(stageParameters, simulationParameters);
  if (flag) {
    //1.Initialize Canvas
    canvas = initCanvas(simulationParameters);
    //2.staticStage
    stageParameters.staticStage = generateStaticStage(
      stageParameters,
      simulationParameters
    );

    //stageParameters.matrix = cloneArray2D(stageParameters.staticStage);
    //3.Add dynamic Elements
    stageParameters.livingBeingsCollection.forEach((item) => {
      for (a = 0; a < item.number; a++) {
        //Se busca una posición libre en la matriz
        freeCoordinate = coordinatesAssigment(
          simulationParameters,
          stageParameters
        );

        //Si existe una posición libre se crea un elemento dinámico
        if (freeCoordinate != undefined) {
          stageParameters.dynamicElementsArray.push(new item.type());
          lastElement(stageParameters.dynamicElementsArray).x =
            freeCoordinate[0];
          lastElement(stageParameters.dynamicElementsArray).y =
            freeCoordinate[1];
          stageParameters.matrix = matrixGeneratorInit(
            stageParameters,
            simulationParameters
          );
        }
      }
    });
    matrixGeneratorInit(stageParameters, simulationParameters);
    //4. Draw canvas
    drawingMatrix(stageParameters, simulationParameters);
    debug_energyOfUniverse();
    return [staticStageAux, matrixAux, canvas[0], canvas[1]]; //lienzo = canvas[0];ctx = canvas[1]
  } else {
    console.log("The data is not consistent");
  }
}

//simulation(init_output[0],dynamicElementsArray,simulationStepsNumber,timePerStep, wideDimension, squareSide,init_output[3])
function simulation(stageParameters, simulationParameters) {
  //1. Hacemos la simulación paso a paso.
  //simulationParameters.singularSimulationStep =  oneSimulationStep(stageParameters,simulationParameters)
  continuosSimulationStep(stageParameters, simulationParameters);
}

export { init, simulation, drawingMatrix };
