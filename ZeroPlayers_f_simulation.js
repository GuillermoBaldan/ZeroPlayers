import { matrixGenerator } from "./ZeroPlayers_f_matrixGeneration.js";
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
    "simulation cicle: " + (simulationParameters.singularSimulationStep + 1)
  );
  simulationParameters.historicalSimulationSteps += 1;
  console.log(`globalCounter: ${simulationParameters.globalCounter}`);
  console.log(
    `singularSimulationStep: ${simulationParameters.singularSimulationStep}`
  );
  document.getElementById("simulationCicles").innerHTML =
    simulationParameters.historicalSimulationSteps;
  document.getElementById("progressBar").value =
    simulationParameters.singularSimulationStep;
  document.getElementById("progressBar").max =
    simulationParameters.simulationStepsNumber;
  //Reordering dynamicElementsArray block--
  stageParameters.dynamicElementsArray = cloneArray(
    ordering4drawing(stageParameters)
  );

  //------
  stageParameters.matrix = matrixGenerator(
    stageParameters,
    simulationParameters
  );
  //matrixGenerator(staticStage,dynamicElementsArray,squareSide,wideDimension)
  drawingMatrix(stageParameters, simulationParameters);
  simulationParameters.singularSimulationStep += 1;
  //loadsingularSimulationStep(simulationIndex);
  if (
    simulationParameters.simulationStepsNumber -
      simulationParameters.singularSimulationStep -
      simulationParameters.auxStep >
      0 &&
    stopFlag == false
  ) {
    setTimeout(function () {
      continuosSimulationStep(stageParameters, simulationParameters);
    }, simulationParameters.timePerStep);
  } else if (stopFlag == true) {
    console.log("Simulation Stopped");
  } else {
    console.log("End of the simulation");
    document.getElementById("playButton").innerHTML = "New Simulation";
    document.getElementById("playButton").disabled = false;
    //return simulationIndex;
  }
}

function killSimulation(simulationParameters) {
  simulationParameters.auxStep = simulationParameters.simulationStepsNumber;
  document.getElementById("progressBar").style.display = "none";
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

  stageParameters.matrix = matrixGenerator(
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
