import {
  simulationParameters,
  singularSimulationStep,
  stopFlag,
  loadsingularSimulationStep,
} from "./index.js";

function refreshGUI() {
  document.getElementById("simulationCicles").innerHTML =
    simulationParameters.historicalSimulationSteps;
  document.getElementById("progressBar").value =
    simulationParameters.singularSimulationStep;
  document.getElementById("progressBar").max =
    simulationParameters.simulationStepsNumber;
}

function simulationStopAndEnd() {
  let flag = true;
  if (
    simulationParameters.simulationStepsNumber -
      simulationParameters.singularSimulationStep -
      simulationParameters.auxStep >
      0 &&
    stopFlag == false
  ) {
    flag = false;
  } else if (stopFlag == true) {
    console.log("Simulation Stopped");
  } else {
    console.log("End of the simulation");
    document.getElementById("playButton").innerHTML = "New Simulation";
    document.getElementById("playButton").disabled = false;
    //return simulationIndex;
  }
}

export { refreshGUI, simulationStopAndEnd };
