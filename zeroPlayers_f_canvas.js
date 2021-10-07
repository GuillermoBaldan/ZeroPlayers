import {cloneArray2D} from './zeroPlayers_f_arraysManipulation.js'
import { simulation } from './zeroPlayers_f_level1.js';

function initCanvas(simulationParameters){
    simulationParameters.lienzo = document.getElementById("lienzo");
    simulationParameters.lienzo.setAttribute("width", wideDimension);
    simulationParameters.lienzo.setAttribute("height", wideDimension); 
    simulationParameters.ctx = simulationParameters.lienzo.getContext('2d');
    return [simulationParameters.lienzo, simulationParameters.ctx]
    }

    function drawingMatrix(simulationParameters){
        //1. Recorremos el array stage
        let matrixAux = [];
        let x = 0;
        let y = 0;
        let Ax = simulationParameters.squareSide
        let Ay = simulationParameters.squareSide
        //matrixAux = matrix;
        matrixAux = cloneArray2D(simulationParameters.matrix,matrixAux);
        /* console.log(matrixAux)
        console.log(matrixAux[0][0]); */
        //Borramos todo el canva;
        //canvasInit()
         matrixAux.forEach(row => {
            row.forEach( column => {
                drawSquare(x,y,column,simulationParameters);
                x = x + Ax;        
            })
            x = 0;
            y = y + Ay;
        })
        matrixAux = []; 
        
    }

    function drawSquare(x,y, color, simulationParameters){
        ctx.beginPath();
        ctx.fillStyle = `${color}`;
        ctx.fillRect(x, y, simulationParameters.wideDimension, simulationParameters.heightDimension);
        ctx.stroke();
    }

    export {initCanvas,drawingMatrix}