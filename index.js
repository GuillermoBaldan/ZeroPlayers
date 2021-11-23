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
  oneSimulationStep,
} from "./ZeroPlayers_f_simulation.js";

let staticStage;
let lienzo;
let ctx;
let init_output;
let stopFlag = false;
let globalSimulationIndex = 0;

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
  simulationSteps: 100,
  timePerStep: 100,
  wideDimension: 90,
  heightDimension: 90,
  squareSide: 30,
  lienzo: lienzo,
  ctx: ctx,
  init_output: init_output,
  stopFlag: false,
  globalSimulationIndex: 0,
  globalCounter: 0,
};

function loadGlobalSimulationIndex(index) {
  simulationParameters.globalSimulationIndex = index;
}
//[staticStageAux, matrixAux ,canvas[0], canvas[1]]
simulationParameters.init_output = init(stageParameters, simulationParameters);

document.getElementById("oneSimulationStep").addEventListener(
  "click",
  function () {
    oneSimulationStep(stageParameters, simulationParameters);
  },
  false
);

document.getElementById("playButton").addEventListener(
  "click",
  function () {
    simulationParameters.globalSimulationIndex = 0;
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
/*If true, the listener receives synthetic events dispatched by web content
 (the default is false for chrome and true for regular web pages). 
 çThis parameter is only available in Gecko and is mainly useful for the code in add-ons and the browser itself. 
 See Interaction between privileged and non-privileged pages for an example.*/

export {
  stopFlag,
  globalSimulationIndex,
  loadGlobalSimulationIndex,
  simulationParameters,
};
