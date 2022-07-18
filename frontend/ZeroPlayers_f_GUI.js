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
//import { response } from "express";
import { formurlencoded } from './external-libraries/form-urlencoded.js';

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
      if (stopFlag === true) {
        modifyStopFlag(false);
      }
      killSimulation(simulationParameters);
      document.getElementById("infiniteButton").disabled = false;
      document.getElementById("playButton").disabled = false;
    },
    false
  );

  document.getElementById("infiniteButton").addEventListener(
    "click",
    function () {
      simulationParameters.type = "infinite";
      document.getElementById("progressBar").style.display = "block";
      simulationParameters.auxStep = 0;
      simulationParameters.singularSimulationStep = 0;
      simulation(stageParameters, simulationParameters);
      document.getElementById("playButton").disabled = true;
      document.getElementById("infiniteButton").disabled = true;
    },
    false
  );

  document
    .getElementById("saveSimulation")
    .addEventListener("click", function () {
      /* const data = new FormData();
      data.append("variable", "Este es un ejemplo de valor almacenado"); */
      console.log(stageParameters.universeRules.frontier)
      let data = { 
        stageParameters : {
          universeRules : {
            movementType : stageParameters.universeRules.movementType,
            frontier : stageParameters.universeRules.frontier
          },
          livingBeingsRules : {
            reproduction : stageParameters.livingBeingsRules.reproduction,
            probability : stageParameters.livingBeingsRules.probability,
            distantTowater: stageParameters.livingBeingsRules.distantTowater,
            proximityTosameCells: stageParameters.livingBeingsRules.proximityTosameCells
          },
          legendTerrain: {
            ground : stageParameters.legendTerrain.ground,
            water : stageParameters.legendTerrain.water,
          },
          legend : {
            water: stageParameters.legend.water,
            simpleCell : stageParameters.legend.simpleCell
          },
          legendForbiddenColors : stageParameters.legendForbiddenColors,
          livingBeingsCollection : stageParameters.livingBeingsCollection,
          staticStage : stageParameters.staticStage,
          matrix : stageParameters.matrix,
          universeEnergy : stageParameters.universeEnergy,
          generationStageAlgorithm : stageParameters.generationStageAlgorithm,
        },
        simulationParameters : {
          simulationStepsNumber : simulationParameters.simulationStepsNumber,
          type : simulationParameters.type,
          timePerStep : simulationParameters.timePerStep,
          wideDimension : simulationParameters.wideDimension,
          heightDimension : simulationParameters.heightDimension,
          squareSide : simulationParameters.squareSide
        }
      };
      /* let formBody = [];
      for (let property in data) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(data[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&"); */
      //let formBody = encodedXwwwFormUrlencoded(data);
      let formBody = formurlencoded(data)
      const result = fetch("/simulations/save-simulation", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: formBody,
      });
      console.log(JSON.stringify(data))
      console.log(formBody)
      result.then(function () {
        console.log(result);
      });
    });

    document
    .getElementById("loadDataTest")
    .addEventListener("click", function () {
   
      fetch("/simulations/load-data-test", {
        method: "GET"
      }).then(function(response) {
        // The response is a Response instance.
        // You parse the data into a useable format using `.json()`
        return response.json();
      }).then(function(data) {
        // `data` is the parsed version of the JSON returned from the above endpoint.
        console.log(data);  // { "userId": 1, "id": 1, "title": "...", "body": "..." }
      });
    });
}

if (modalDialog.length == 2) {
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

function encodedXwwwFormUrlencoded(object){
  let str = [];
    for (let key in object) {
         if (object.hasOwnProperty(key)) {
               str.push(encodeURIComponent(key) + "=" + encodeURIComponent(object[key]))                  
               //console.log(key + " -> " + object[key]);
         }
    }
    return str.join("&");
}

export { refreshGUI, simulationStopAndEnd, clickButtonsDetection };
