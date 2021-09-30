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
    x      : 1,
    y      : 9,
    walkmode : "trajectory",
    trajectory_x : [1,1,1,1,1,1,1],
    trajectory_y : [0,0,0,0,0,0,0],
    walk   : [randomWalk]
}

let wideDimension = 30;
let heightDimension = wideDimension;
let squareSide = 2;
let dynamicElementsArray = [cell];
let staticStage;
let rulesArray =[];
let lienzo;
let ctx;
let init_output;

init(legend,wideDimension,squareSide,dynamicElementsArray,lienzo,ctx);
//init_output = init(legend,wideDimension,squareSide,dynamicElementsArray,lienzo,ctx);
simulation();
