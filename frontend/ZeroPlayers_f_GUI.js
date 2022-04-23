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
import { simulation, init } from "./ZeroPlayers_f_level1.js";
import {
  allTerrain,
  circularIsland,
} from "./ZeroPlayers_f_staticStageGeneration.js";

let livingBeingsCollectionAux = [];
let modalDialog = document.getElementsByClassName("modalDialog");

function refreshGUI() {
  document.getElementById("simulationCicles").innerHTML =
    simulationParameters.historicalSimulationSteps;
  document.getElementById("progressBar").value =
    simulationParameters.singularSimulationStep;
  document.getElementById("progressBar").max =
    simulationParameters.simulationStepsNumber - 1;
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

  document.getElementById("infiniteSimulation").addEventListener(
    "click",
    function () {
      infiniteSimulation(stageParameters, simulationParameters);
    },
    false
  );
}

if (modalDialog.length == 2) {
  console.log("modalDialog == 2");
  //Acciones asociadas al modal setting Stage
  document.getElementById("playButton_Modal").addEventListener(
    "click",
    function () {
      //Capture the value of the input duration

      let stepsNumber = document.getElementById("numberSteps").value;
      simulationParameters.simulationStepsNumber = stepsNumber;
      //Capture the value of the time per Step input
      let timePerStep = document.getElementById("timePerStep").value;
      simulationParameters.timePerStep = timePerStep;
      //Capture the value of the wide dimension input
      let wideDimension = document.getElementById("universeSize").value;
      simulationParameters.wideDimension = wideDimension;
      simulationParameters.heightDimension = wideDimension;

      stageParameters.generationStageAlgorithm = circularIsland;
      let borders = document.querySelector(
        'input[name="borders"]:checked'
      ).value;
      stageParameters.universeRules.frontier = borders;
      simulationParameters.simulationStepsNumber = stepsNumber;
      simulationParameters.timePerStep = timePerStep;
      simulationParameters.wideDimension = wideDimension;
      simulationParameters.heightDimension = wideDimension;
      stageParameters.livingBeingsCollection = livingBeingsCollectionAux;

      stageParameters.dynamicElementsArray = [];
      simulationParameters.init_output = init(
        stageParameters,
        simulationParameters
      );

      //Close modal
      let closeModal = document.getElementsByClassName("close")[0];
      closeModal.click();
      document.getElementById("playButton").click();
    },
    false
  );
  //Add this species button
  let addThisSpeciesButton = document
    .getElementById("addThisSpecies")
    .addEventListener(
      "click",
      function () {
        let preys = [];
        let name = document.getElementById("speciesName").value;
        let type = document.querySelector(
          'input[name="speciesType"]:checked'
        ).value;
        let color = document.getElementById("color").value;
        preys.push(document.getElementById("preys").value);
        let movement = document.querySelector(
          'input[name="movement"]:checked'
        ).value;
        let initialNumber = document.getElementById("initialNumber").value;
        initialNumber = parseInt(initialNumber);
        livingBeingsCollectionAux.push({
          name: name,
          type: type,
          color: color,
          preys: preys,
          movement: movement,
          number: initialNumber,
        });

        stageParameters.livingBeingsCollection = livingBeingsCollectionAux;
      },
      false
    );

  let AddSpeciesButton = document
    .getElementById("speciesModalButton")
    .addEventListener("click", function () {
      //let modalSpeciesEditor = document.getElementById("speciesModal");
      let preySelector = document.getElementById("preys");
      preySelector.innerHTML = "";
      preySelector.innerHTML = `<option value="None">None</option>`;
      stageParameters.livingBeingsCollection.forEach((item) => {
        preySelector.innerHTML += `<option value="${item.name}">${item.name}</option>`;
      });
    });
}

function simulationStopAndEnd() {
  let flag = false;
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
