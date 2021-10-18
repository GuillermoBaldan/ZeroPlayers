import {init, simulation} from './ZeroPlayers_f_level1.js';
import {down, left, right, totalFreedom, up} from './ZeroPlayers_f_livingbeings.js';
import {generateStaticStage} from './ZeroPlayers_f_matrixGeneration.js';
//import simulation from 'functions_zeroPlayers';



let legend = { 
    ground : "brown",
    water  :  "blue",
    grass  :  "green"

}

let cellBehaviourRules = {
    forbiddenPositions : ["water"]
}

let cell = {
    id     : "cell_1",
    color  : "yellow",
    x      : 10,
    y      : 10,
    walkmode : "autonomous",
    trajectory_x : [1,1,1,1,1,1,1],
    trajectory_y : [0,0,0,0,0,0,0],
    walk   : totalFreedom,
    behaviourRules : cellBehaviourRules
}

class simpleCell {
    constructor() {
      this.color = "yellow"
      this.x = Math.floor(Math.random()*(simulationParameters.wideDimension/simulationParameters.squareSide)) //Math.random() * (max - min) + min;
      this.y = Math.floor(Math.random()*(simulationParameters.heightDimension/simulationParameters.squareSide))
      this.walkmode = "autonomous"
      this.trajectory_x = [1,1,1,1,1,1,1]
      this.trajectory_y = [0,0,0,0,0,0,0]
      this.walk = totalFreedom
      this.behaviourRules = cellBehaviourRules

    }
  }

let staticStage;
let lienzo;
let ctx;
let init_output;
let stopFlag = false;
let globalSimulationIndex = 0;

let universeRules = {
    movementType : "zigzag",
    frontier : "adjacent ends"  //There are two options: 'close' and 'adjacent ends'
}
//We put into one object, stageParamenters, the next objects: legend, cell, universeRules

let stageParameters = {
    universeRules : universeRules,
    legend : legend,
    livingBeingsCollectionTypes : [cell],
    dynamicElementsArray : [],
    staticStage : []

}

let simulationParameters = {
    simulationSteps : 100,
    timePerStep : 100,
    wideDimension : 300,
    heightDimension : 300,
    squareSide : 15,
    lienzo : lienzo,
    ctx : ctx,
    init_output : init_output,
    stopFlag : false,
    globalSimulationIndex : 0
}

function loadGlobalSimulationIndex(index){
    simulationParameters.globalSimulationIndex = index;
}
//[staticStageAux, matrixAux ,canvas[0], canvas[1]]
simulationParameters.init_output = init(stageParameters,simulationParameters);

document.getElementById("playButton").addEventListener("click", function(){
    simulationParameters.globalSimulationIndex = 0;
    simulation(stageParameters,simulationParameters);
    document.getElementById("playButton").disabled = true;
}, false);

document.getElementById("stopButton").addEventListener("click", function(){
    if (stopFlag == false){
        stopFlag = true;
        document.getElementById("stopButton").innerHTML = "Continue Simulation";
        }else{
        stopFlag = false;
        document.getElementById("stopButton").innerHTML = "Stop Simulation";
        simulation(stageParameters, simulationParameters)
        console.log("stopFlag: "+stopFlag)
    }
}, false);
/*If true, the listener receives synthetic events dispatched by web content
 (the default is false for chrome and true for regular web pages). 
 çThis parameter is only available in Gecko and is mainly useful for the code in add-ons and the browser itself. 
 See Interaction between privileged and non-privileged pages for an example.*/

 export {stopFlag, globalSimulationIndex, loadGlobalSimulationIndex, simpleCell}