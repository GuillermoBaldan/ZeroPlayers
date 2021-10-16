import {init, simulation} from './ZeroPlayers_f_level1.js';
import {down, left, right, totalFreedom, up} from './ZeroPlayers_f_livingbeings.js';
import {generateStaticStage} from './ZeroPlayers_f_matrixGeneration.js';
//import simulation from 'functions_zeroPlayers';



let legend = { 
    ground : "brown",
    water  :  "blue",
    grass  :  "green"

}

let cell = {
    id     : "cell_1",
    color  : "yellow",
    x      : 0,
    y      : 0,
    walkmode : "autonomous",
    trajectory_x : [1,1,1,1,1,1,1],
    trajectory_y : [0,0,0,0,0,0,0],
    walk   : totalFreedom,
    behaviourRules : []
}

let staticStage;
let lienzo;
let ctx;
let init_output;
let stopFlag = false;
let globalSimulationIndex = 0;

let universeRules = {
    movementType : "diagonal",
    frontier : "adjacent ends"  //There are two options: 'close' and 'adjacent ends'
}
//We put into one object, stageParamenters, the next objects: legend, cell, universeRules

let stageParameters = {
    universeRules : universeRules,
    legend : legend,
    livingBeingsCollectionTypes : [cell],
    dynamicElementsArray : [cell],
    staticStage : []

}

let simulationParameters = {
    simulationSteps : 25,
    timePerStep : 100,
    wideDimension : 600,
    heightDimension : 600,
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

 export {stopFlag, globalSimulationIndex, loadGlobalSimulationIndex, simulationParameters}
