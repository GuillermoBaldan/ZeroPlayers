import { init, simulation } from "./ZeroPlayers_f_level1.js";
import {
  down,
  left,
  right,
  totalFreedom,
  up,
} from "./ZeroPlayers_f_livingbeings.js";
import { generateStaticStage } from "./ZeroPlayers_f_matrixGeneration.js";
import { simpleCell, grossCell } from "./ZeroPlayers_classes_livingBeings.js";
import {
  continuosSimulationStep,
  killSimulation,
  oneSimulationStep,
} from "./ZeroPlayers_f_simulation.js";
import { debug_energyOfUniverse } from "./ZeroPlayers_f_debugging.js";

let staticStage;
let lienzo;
let ctx;
let init_output;
let stopFlag = false;
let singularSimulationStep = 0;

let universeRules = {
  movementType: "zigzag", //There are two options: 'zigzag' and 'diagonal'
  frontier: "close", //There are two options: 'close' and 'adjacent ends'
};
//We put into one object, stageParamenters, the next objects: legend, cell, universeRules

let stageParameters = {
  universeRules: universeRules,
  legendTerrain: {
    ground: "brown",
    // water: "blue",
  },
  legend: {
    water: "blue",
    simpleCell: "yellow",
  },
  legendForbiddenColors: ["blue", "yellow"],
  livingBeingsCollection: [
    {
      type: grossCell,
      number: 0,
    },
    { type: simpleCell, number: 1 },
  ],
  dynamicElementsArray: [],
  staticStage: [],
  matrix: [],
  freePlacesArray: [],
  universeEnergy: 50000,
};

let simulationParameters = {
  simulationStepsNumber: 25,
  timePerStep: 300,
  wideDimension: 100,
  heightDimension: 100,
  squareSide: 25,
  lienzo: lienzo,
  ctx: ctx,
  init_output: init_output,
  stopFlag: false,
  singularSimulationStep: 0,
  historicalSimulationSteps: 0,
  globalCounter: 0,
  auxCounter: 0,
  auxStep: 0,
};

function loadsingularSimulationStep(index) {
  simulationParameters.singularSimulationStep = index;
}
//[staticStageAux, matrixAux ,canvas[0], canvas[1]]
debug_energyOfUniverse();
simulationParameters.init_output = init(stageParameters, simulationParameters);

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
    if (stopFlag == false) {
      stopFlag = true;
      document.getElementById("stopButton").innerHTML = "Continue Simulation";
    } else {
      stopFlag = false;
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
/*If true, the listener receives synthetic events dispatched by web content
 (the default is false for chrome and true for regular web pages). 
 çThis parameter is only available in Gecko and is mainly useful for the code in add-ons and the browser itself. 
 See Interaction between privileged and non-privileged pages for an example.*/

export {
  stopFlag,
  singularSimulationStep,
  loadsingularSimulationStep,
  simulationParameters,
  stageParameters,
};
