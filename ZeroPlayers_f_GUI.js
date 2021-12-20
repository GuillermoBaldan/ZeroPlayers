import {
  simulationParameters,
  singularSimulationStep,
  stopFlag,
  loadsingularSimulationStep,
  stageParameters,
  modifyStopFlag,
} from "./index.js";

import {
  killSimulation,
  oneSimulationStep,
} from "./ZeroPlayers_f_simulation.js";
import { simulation } from "./ZeroPlayers_f_level1.js";

function refreshGUI() {
  document.getElementById("simulationCicles").innerHTML =
    simulationParameters.historicalSimulationSteps;
  document.getElementById("progressBar").value =
    simulationParameters.singularSimulationStep;
  document.getElementById("progressBar").max =
    simulationParameters.simulationStepsNumber;
}

function clickButtonsDetection() {
  document.getElementById("oneSimulationStep").addEventListener(
    "click",
    function () {
      simulationParameters.auxStep = 0;
      oneSimulationStep(stageParameters, simulationParameters);
    },
    false
  );

  document.getElementById("playButton").addEventListener(
    "click",
    function () {
      document.getElementById("progressBar").style.display = "block";
      simulationParameters.auxStep = 0;
      simulationParameters.singularSimulationStep = 0;
      simulation(stageParameters, simulationParameters);
      document.getElementById("playButton").disabled = true;
    },
    false
  );

  document.getElementById("stopButton").addEventListener(
    "click",
    function () {
      if (stopFlag === false) {
        modifyStopFlag(true);
        document.getElementById("stopButton").innerHTML = "Continue Simulation";
      } else {
        modifyStopFlag(false);
        document.getElementById("stopButton").innerHTML = "Stop Simulation";
        simulation(stageParameters, simulationParameters);
      }
    },
    false
  );

  document.getElementById("killButton").addEventListener(
    "click",
    function () {
      killSimulation(simulationParameters);
    },
    false
  );
}

function simulationStopAndEnd() {
  let flag = false;

  console.log(
    "singularSimulationStep: " + simulationParameters.singularSimulationStep
  );
  if (
    simulationParameters.simulationStepsNumber -
      simulationParameters.singularSimulationStep -
      simulationParameters.auxStep >
    0
  ) {
    flag = false;
  }

  if (stopFlag == true) {
    flag = true;
  }
  if (
    simulationParameters.simulationStepsNumber -
      simulationParameters.singularSimulationStep -
      simulationParameters.auxStep <=
    0
  ) {
    flag = true;
    document.getElementById("playButton").innerHTML = "New Simulation";
    document.getElementById("playButton").disabled = false;
  }

  return flag;
}

export { refreshGUI, simulationStopAndEnd, clickButtonsDetection };
