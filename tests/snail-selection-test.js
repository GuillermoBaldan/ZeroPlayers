import { init, simulation } from "../frontend/ZeroPlayers_f_level1.js";
import {
  down,
  left,
  right,
  totalFreedom,
  up,
} from "../frontend/ZeroPlayers_f_livingbeings.js";
import { generateStaticStage } from "../frontend/ZeroPlayers_f_matrixGeneration.js";
import {
  grossCell,
  grossPredator,
  yellowPredator,
  vegetable,
  predator,
} from "../frontend/ZeroPlayers_classes_livingBeings.js";
import {
  continuosSimulationStep,
  killSimulation,
  oneSimulationStep,
} from "../frontend/ZeroPlayers_f_simulation.js";
import { debug_energyOfUniverse } from "../frontend/ZeroPlayers_f_debugging.js";
import { clickButtonsDetection } from "../frontend/ZeroPlayers_f_GUI.js";
import {
  random,
  islandGeneration,
  circularIsland,
  allTerrain,
} from "../frontend/ZeroPlayers_f_staticStageGeneration.js";

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
  livingBeingsRules: {
    reproduction: {
      type: "sexual", //There are two options: 'sexual' and 'asexual'
      probability: 0.5, //It is the probability of reproduction
      distantTowater: 1,
      proximityTosameCells: 3,
    },
  },
  legendTerrain: {
    ground: "brown",
    water: "blue",
  },
  legend: {
    water: "blue",
    simpleCell: "yellow",
  },
  legendForbiddenColors: ["blue", "yellow", "green", "purple"],
  livingBeingsCollection: [
    {
      name: "gross predator",
      type: "predator",
      color: "yellow",
      preys: ["gross"],
      movement: "path finder",
      number: 1,
    },
    {
      name: "gross",
      type: "vegetable",
      color: "green",
      preys: [],
      movement: "None",
      number: 2,
    },
  ],
  dynamicElementsArray: [],
  staticStage: [],
  matrix: [],
  freePlacesArray: [],
  universeEnergy: 500000,
  generationStageAlgorithm: circularIsland, //random, circularIsland, allTerrain
  speciesCounter: [],
};

let simulationParameters = {
  simulationStepsNumber: 50,
  type: "finite", //The other option is 'infinite' for a simulation with a infinite number of steps
  timePerStep: 300,
  wideDimension: 200,
  heightDimension: 200,
  squareSide: 20,
  lienzo: lienzo,
  ctx: ctx,
  init_output: init_output,
  stopFlag: false,
  singularSimulationStep: 0,
  historicalSimulationSteps: 0,
  globalCounter: 0,
  auxCounter: 0,
  auxStep: 0,
  auxTempArray: [],
};

let debugSetting = {
  grid: true, //There are two options: 'on' and 'off'
  }

function modifyStopFlag(value) {
  //To avoid modifing an imported 'variable' causes 'Assignment to constant variable' even it is not a constant
  stopFlag = value;
}

function loadsingularSimulationStep(index) {
  simulationParameters.singularSimulationStep = index;
}

//debug_energyOfUniverse();
simulationParameters.init_output = init(stageParameters, simulationParameters);
clickButtonsDetection();

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
  modifyStopFlag,
  debugSetting
};
