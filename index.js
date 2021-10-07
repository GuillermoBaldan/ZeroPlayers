import {init, simulation} from './zeroPlayers_f_level1.js';
import {down, left, right, totalFreedom, up} from './zeroPlayers_f_livingbeings.js';
import {generateStaticStage} from './zeroPlayers_f_matrixGeneration.js';
//import simulation from 'functions_zeroPlayers';



let legend = { 
    ground : "brown",
    water  :  "blue",
    grass  :  "green"

}

let cell = {
    id     : "cell_1",
    color  : "yellow",
    x      : 39,
    y      : 0,
    walkmode : "autonomous",
    trajectory_x : [1,1,1,1,1,1,1],
    trajectory_y : [0,0,0,0,0,0,0],
    walk   : totalFreedom
}

let universeRules = {
    movementType : "zigzag",
    frontier : "adjacent ends"  //There are two options: 'close' and 'adjacent ends'
}

let simulationSteps = 50;
let timePerStep = 100; //In milliseconds
let wideDimension = 600;
let heightDimension = wideDimension;
let squareSide = 15;
let dynamicElementsArray = [cell];
let staticStage;
let rulesArray =[];
let lienzo;
let ctx;
let init_output;
let stopFlag = false;
let globalSimulationIndex = 0;

function loadGlobalSimulationIndex(index){
    globalSimulationIndex = index;
}

init_output = init(legend,wideDimension,squareSide,dynamicElementsArray,lienzo,ctx);

document.getElementById("playButton").addEventListener("click", function(){
    globalSimulationIndex = 0;
    simulation(universeRules,init_output[0],globalSimulationIndex,dynamicElementsArray,simulationSteps,timePerStep, wideDimension, squareSide,init_output[3])
    document.getElementById("playButton").disabled = true;
}, false);

document.getElementById("stopButton").addEventListener("click", function(){
    if (stopFlag == false){
        stopFlag = true;
        document.getElementById("stopButton").innerHTML = "Continue Simulation";
        }else{
        stopFlag = false;
        document.getElementById("stopButton").innerHTML = "Stop Simulation";
        simulation(universeRules, init_output[0],globalSimulationIndex,dynamicElementsArray,simulationSteps,timePerStep, wideDimension, squareSide,init_output[3])
        console.log("stopFlag: "+stopFlag)
    }
}, false);
/*If true, the listener receives synthetic events dispatched by web content
 (the default is false for chrome and true for regular web pages). 
 çThis parameter is only available in Gecko and is mainly useful for the code in add-ons and the browser itself. 
 See Interaction between privileged and non-privileged pages for an example.*/

 export {stopFlag, globalSimulationIndex, loadGlobalSimulationIndex}