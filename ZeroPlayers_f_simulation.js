import { matrixGenerator } from "./ZeroPlayers_f_matrixGeneration.js";
import { drawingMatrix, ordering4drawing } from "./ZeroPlayers_f_canvas.js";
import {
  globalSimulationIndex,
  stopFlag,
  loadGlobalSimulationIndex,
} from "./index.js";
import { simulation } from "./ZeroPlayers_f_level1.js";
import { cloneArray } from "./ZeroPlayers_f_arraysManipulation.js";
import { checkSimpleCellsExistence } from "./ZeroPlayers_f_checkValues.js";

function oneSimulationStep(stageParameters, simulationParameters) {
  // oneSimulationStep(simulationSteps,timePerStep, staticStage,dynamicElementsArray,ctx, squareSide,wideDimension)
  console.log("----------------------------------");
  console.log(
    "simulationStep: " + (simulationParameters.globalSimulationIndex + 1)
  );
  //Reordering dynamicElementsArray block--
  checkSimpleCellsExistence("line 13 - _f_simulation", stageParameters);
  stageParameters.dynamicElementsArray = cloneArray(
    ordering4drawing(stageParameters)
  );

  checkSimpleCellsExistence("line18 - _f_simulation", stageParameters);
  //------
  let matrixAux = matrixGenerator(stageParameters, simulationParameters);
  checkSimpleCellsExistence("line21 - _f_simulation", stageParameters);
  //matrixGenerator(staticStage,dynamicElementsArray,squareSide,wideDimension)
  drawingMatrix(matrixAux, simulationParameters);
  simulationParameters.globalSimulationIndex += 1;
  //loadGlobalSimulationIndex(simulationIndex);
  if (
    simulationParameters.simulationSteps -
      simulationParameters.globalSimulationIndex >
      0 &&
    stopFlag == false
  ) {
    setTimeout(function () {
      oneSimulationStep(stageParameters, simulationParameters);
    }, simulationParameters.timePerStep);
  } else {
    if (stopFlag == true) {
      console.log("Simulación parada");
    } else {
      console.log("Fin de la simulation");
      document.getElementById("playButton").innerHTML = "New Simulation";
      document.getElementById("playButton").disabled = false;
      //return simulationIndex;
    }
  }
}

export { oneSimulationStep };
