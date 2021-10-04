import {cloneArray2D} from './zeroPlayers_f_arraysManipulation.js'

function initCanvas(lienzo,ctx,wideDimension){
    lienzo = document.getElementById("lienzo");
    lienzo.setAttribute("width", wideDimension);
    lienzo.setAttribute("height", wideDimension); 
    ctx = lienzo.getContext('2d');
    return [lienzo, ctx]
    }

    function drawingMatrix(matrix,squareSide,ctx){
        //1. Recorremos el array stage
        let matrixAux = [];
        let x = 0;
        let y = 0;
        let Ax = squareSide;
        let Ay = squareSide;
        //matrixAux = matrix;
        matrixAux = cloneArray2D(matrix,matrixAux);
        /* console.log(matrixAux)
        console.log(matrixAux[0][0]); */
        //Borramos todo el canva;
        //canvasInit()
         matrixAux.forEach(row => {
            row.forEach( column => {
                drawSquare(ctx,x,y,squareSide,squareSide,column);
                x = x + Ax;        
            })
            x = 0;
            y = y + Ay;
        })
        matrixAux = []; 
        
    }

    function drawSquare(ctx,x,y, width, height,color){
        ctx.beginPath();
        ctx.fillStyle = `${color}`;
        ctx.fillRect(x, y, width, height);
        ctx.stroke();
    }

    export {initCanvas,drawingMatrix}