import { simulationParameters } from "./index.js";

function refreshGUI() {
  document.getElementById("simulationCicles").innerHTML =
    simulationParameters.historicalSimulationSteps;
  document.getElementById("progressBar").value =
    simulationParameters.singularSimulationStep;
  document.getElementById("progressBar").max =
    simulationParameters.simulationStepsNumber;
}

export { refreshGUI };
