import {
  matrixGenerator,
  matrixGeneratorv2,
} from "./ZeroPlayers_f_matrixGeneration.js";
import { drawingMatrix, ordering4drawing } from "./ZeroPlayers_f_canvas.js";
import {
  singularSimulationStep,
  stopFlag,
  loadsingularSimulationStep,
} from "./index.js";
import { simulation } from "./ZeroPlayers_f_level1.js";
import {
  cloneArray,
  cloneArray2D,
  readVariable,
} from "./ZeroPlayers_f_arraysManipulation.js";
import { checkSimpleCellsExistence } from "./ZeroPlayers_f_checkValues.js";
import { debug_ } from "./ZeroPlayers_f_debugging.js";

function continuosSimulationStep(stageParameters, simulationParameters) {
  // oneSimulationStep(simulationStepsNumber,timePerStep, staticStage,dynamicElementsArray,ctx, squareSide,wideDimension)
  console.log("----------------------------------");
  console.log(
    "simulationStep: " + (simulationParameters.singularSimulationStep + 1)
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
  simulationParameters.singularSimulationStep += 1;
  //loadsingularSimulationStep(simulationIndex);
  if (
    simulationParameters.simulationStepsNumber -
      simulationParameters.singularSimulationStep >
      0 &&
    stopFlag == false
  ) {
    setTimeout(function () {
      continuosSimulationStep(stageParameters, simulationParameters);
    }, simulationParameters.timePerStep);
  } else if (stopFlag == true) {
    console.log("Simulación parada");
  } else {
    console.log("Fin de la simulation");
    document.getElementById("playButton").innerHTML = "New Simulation";
    document.getElementById("playButton").disabled = false;
    //return simulationIndex;
  }
}

function killSimulation(simulationParameters) {
  let aux = readVariable(simulationParameters.simulationStepsNumber);
  simulationParameters.singularSimulationStep = aux;
}

function oneSimulationStep(stageParameters, simulationParameters) {
  // oneSimulationStep(simulationStepsNumber,timePerStep, staticStage,dynamicElementsArray,ctx, squareSide,wideDimension)
  console.log("----------------------------------");
  console.log(
    "simulation Step: " + (simulationParameters.singularSimulationStep + 1)
  );
  //Reordering dynamicElementsArray block--
  stageParameters.dynamicElementsArray = cloneArray(
    ordering4drawing(stageParameters)
  );

  stageParameters.matrix = matrixGeneratorv2(
    stageParameters,
    simulationParameters
  );

  //matrixGenerator(staticStage,dynamicElementsArray,squareSide,wideDimension)
  drawingMatrix(stageParameters, simulationParameters);
  simulationParameters.singularSimulationStep += 1;
  debug_([
    {
      string: "Energy of Universe",
      variable: stageParameters.universeEnergy,
    },
  ]);
  //loadsingularSimulationStep(simulationIndex);
}

export { continuosSimulationStep, oneSimulationStep, killSimulation };
