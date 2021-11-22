import {
  matrixGenerator,
  matrixGeneratorv2,
} from "./ZeroPlayers_f_matrixGeneration.js";
import { drawingMatrix, ordering4drawing } from "./ZeroPlayers_f_canvas.js";
import {
  globalSimulationIndex,
  stopFlag,
  loadGlobalSimulationIndex,
} from "./index.js";
import { simulation } from "./ZeroPlayers_f_level1.js";
import { cloneArray } from "./ZeroPlayers_f_arraysManipulation.js";
import { checkSimpleCellsExistence } from "./ZeroPlayers_f_checkValues.js";

function continuosSimulationStep(stageParameters, simulationParameters) {
  // oneSimulationStep(simulationSteps,timePerStep, staticStage,dynamicElementsArray,ctx, squareSide,wideDimension)
  console.log("----------------------------------");
  console.log(
    "simulationStep: " + (simulationParameters.globalSimulationIndex + 1)
  );
  //Reordering dynamicElementsArray block--
  stageParameters.dynamicElementsArray = cloneArray(
    ordering4drawing(stageParameters)
  );

  //------
  stageParameters.matrix = matrixGeneratorv2(
    stageParameters,
    simulationParameters
  );
  //matrixGenerator(staticStage,dynamicElementsArray,squareSide,wideDimension)
  drawingMatrix(stageParameters, simulationParameters);
  simulationParameters.globalSimulationIndex += 1;
  //loadGlobalSimulationIndex(simulationIndex);
  if (
    simulationParameters.simulationSteps -
      simulationParameters.globalSimulationIndex >
      0 &&
    stopFlag == false
  ) {
    setTimeout(function () {
      console.log(
        "stageParameters.matrix Just Before console.log of f: OneSimulationStep - ZeroPlayers_f_simulation"
      );
      console.log(stageParameters.matrix);
      continuosSimulationStep(stageParameters, simulationParameters);
    }, simulationParameters.timePerStep);
  } else {
    if (stopFlag == true) {
      console.log("Simulación parada");
    } else {
      console.log(
        "stageParameters.matrix Just Before console.log of Fin de la simulación"
      );
      console.log(stageParameters.matrix);
      console.log(
        "stageParameters.staticStage Just Before console.log of Fin de la simulación"
      );
      console.log(stageParameters.staticStage);
      console.log("Verificamos el número de elementos dinámicos");
      console.log(stageParameters.dynamicElementsArray.length);
      console.log("Fin de la simulation");
      document.getElementById("playButton").innerHTML = "New Simulation";
      document.getElementById("playButton").disabled = false;
      //return simulationIndex;
    }
  }
}

function oneSimulationStep(stageParameters, simulationParameters) {
  // oneSimulationStep(simulationSteps,timePerStep, staticStage,dynamicElementsArray,ctx, squareSide,wideDimension)
  console.log("----------------------------------");
  console.log(
    "simulationStep: " + (simulationParameters.globalSimulationIndex + 1)
  );
  //Reordering dynamicElementsArray block--
  stageParameters.dynamicElementsArray = cloneArray(
    ordering4drawing(stageParameters)
  );

  //------
  stageParameters.matrix = matrixGeneratorv2(
    stageParameters,
    simulationParameters
  );
  //matrixGenerator(staticStage,dynamicElementsArray,squareSide,wideDimension)
  drawingMatrix(stageParameters, simulationParameters);
  simulationParameters.globalSimulationIndex += 1;
  //loadGlobalSimulationIndex(simulationIndex);
}

export { continuosSimulationStep, oneSimulationStep };
