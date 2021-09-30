import {init, simulation} from './zeroPlayers_f_level1.js';
import {randomWalk} from './zeroPlayers_f_livingbeings.js';
import {generateStaticStage} from './zeroPlayers_f_matrixGeneration.js';
//import simulation from 'functions_zeroPlayers';

let simulationSteps = 7;
let timePerStep = 100; //In milliseconds

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
    walkmode : "trajectory",
    trajectory_x : [1,1,1,1,1,1,1],
    trajectory_y : [0,0,0,0,0,0,0],
    walk   : [randomWalk]
}

let wideDimension = 600;
let heightDimension = wideDimension;
let squareSide = 15;
let dynamicElementsArray = [cell];
let staticStage;
let rulesArray =[];
let lienzo;
let ctx;
let init_output;

init(legend,wideDimension,squareSide,dynamicElementsArray,lienzo,ctx);
//init_output = init(legend,wideDimension,squareSide,dynamicElementsArray,lienzo,ctx);
simulation();
