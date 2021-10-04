import {init, simulation} from './zeroPlayers_f_level1.js';
import {randomWalk, totalFreedom} from './zeroPlayers_f_livingbeings.js';
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
    x      : 14,
    y      : 14,
    walkmode : "autonomous",
    trajectory_x : [1,1,1,1,1,1,1],
    trajectory_y : [0,0,0,0,0,0,0],
    walk   : totalFreedom
}

let simulationSteps = 7;
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

init_output = init(legend,wideDimension,squareSide,dynamicElementsArray,lienzo,ctx);
//simulation(staticStage,dynamicElementsArray,simulationSteps,timePerStep, wideDimension, squareSide,ctx)

//simulation(staticStage,dynamicElementsArray,simulationSteps,timePerStep, wideDimension, squareSide,ctx)
document.getElementById("stopButton").addEventListener("click", function(){simulation(init_output[0],dynamicElementsArray,simulationSteps,timePerStep, wideDimension, squareSide,init_output[3])}, false);
/*If true, the listener receives synthetic events dispatched by web content
 (the default is false for chrome and true for regular web pages). 
 çThis parameter is only available in Gecko and is mainly useful for the code in add-ons and the browser itself. 
 See Interaction between privileged and non-privileged pages for an example.*/
