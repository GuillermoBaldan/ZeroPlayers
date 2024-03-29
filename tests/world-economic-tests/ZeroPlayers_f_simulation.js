import { matrixGenerator } from "./ZeroPlayers_f_matrixGeneration.js";
import {
  drawingMatrix,
  ordering4drawing,
  drawSquare,
} from "./ZeroPlayers_f_canvas.js";
import {
  singularSimulationStep,
  stopFlag,
  loadsingularSimulationStep,
} from "./index.js";
import { simulation } from "./ZeroPlayers_f_level1.js";
import {
  cloneArray,
  cloneArray2D,
  copyVariable,
} from "./ZeroPlayers_f_arraysManipulation.js";
import { checkSimpleCellsExistence } from "./ZeroPlayers_f_checkValues.js";
import {
  debug_,
  debug_numberOfCells,
  debug_simulationCicle,
  debug_matrix,
  debug_totalEnergy,
  debug_energyOfUniverse,
  debug_EnergyBalance,
  debug_circle,
  debug_grid,
  debug_drawCoordinates,
} from "./ZeroPlayers_f_debugging.js";
import { refreshGUI, simulationStopAndEnd } from "./ZeroPlayers_f_GUI.js";
//import { debugSetting } from "../tests/snail-selection-test.js";

function continuosSimulationStep(stageParameters, simulationParameters) {
  // oneSimulationStep(simulationStepsNumber,timePerStep, staticStage,dynamicElementsArray,ctx, squareSide,wideDimension)
  simulationParameters.historicalSimulationSteps += 1;

  //------
  stageParameters.matrix = matrixGenerator(
    stageParameters,
    simulationParameters
  );

  refreshGUI();

  drawingMatrix(stageParameters, simulationParameters);
  debug_drawCoordinates(simulationParameters.auxTempArray, "pink");
  if (debugSetting.grid) {
    debug_grid();
  }

  //drawSquare(0, 0, "pink", simulationParameters);

  simulationParameters.ctx.lineWidth = "1";
  simulationParameters.ctx.strokeStyle = "black";

  if (simulationParameters.type == "finite") {
    simulationParameters.singularSimulationStep += 1;
  }
  //debug_simulationCicle
  debug_simulationCicle();
  if (!simulationStopAndEnd()) {
    setTimeout(function () {
      continuosSimulationStep(stageParameters, simulationParameters);
    }, simulationParameters.timePerStep);
  }
}

function killSimulation(simulationParameters) {
  simulationParameters.auxStep = simulationParameters.simulationStepsNumber;
  document.getElementById("progressBar").style.display = "none";
}

function oneSimulationStep(stageParameters, simulationParameters) {
  // oneSimulationStep(simulationStepsNumber,timePerStep, staticStage,dynamicElementsArray,ctx, squareSide,wideDimension)
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
