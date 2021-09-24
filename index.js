
let simulationSteps = 100;
let timePerStep = 1000; //In milliseconds

let legend = { 
    ground : "brown",
    water  :  "blue",
    grass  :  "green"

}

let cell = {
    color  : "yellow",
    x      : 0,
    y      : 0,
    trajectory_x : [1,1,1,1,1,1,1],
    trayectory_y : [0,0,0,0,0,0,0] 
}

let wideDimension = 650;
let heightDimension = 650;
let squareSide = 25;
let stage = [];


/* let lienzo = document.getElementById("lienzo");
console.log(lienzo)
   /*  lienzo.setAttribute("width", wideDimension);
    lienzo.setAttribute("height", heightDimension); 
let ctx = lienzo.getContext("2d"); */

let lienzo;
let ctx;

    //FUNCIONES

function drawSquare(x,y, width, height,color){
    ctx.beginPath();
    ctx.fillStyle = `${color}`;
    ctx.fillRect(x, y, width, height);
    ctx.stroke();
}

function Init(){
        //1.1 Matrix Generation
        stage = generateStage(stage,legend,wideDimension,heightDimension);
        //1.2 Drawing StageMatrix
        lienzo = document.getElementById("lienzo");
        lienzo.setAttribute("width", wideDimension);
        lienzo.setAttribute("height", heightDimension); 
        ctx = lienzo.getContext('2d');
        drawingStage(stage,squareSide);
        drawingCell(stage,cell);
        }

function drawingStage(stage,squareSide){
    //1. Recorremos el array stage
    let x = 0;
    let y = 0;
    let Ax = squareSide;
    let Ay = squareSide;
    console.log(stage[0][0])
    //drawSquare(x,y,squareSide,squareSide,stage[0][0]);
    stage.forEach(row => {
        row.forEach( column => {
          
            drawSquare(x,y,squareSide,squareSide,column);
            x = x + Ax;        
        })
        x = 0;
        y = y + Ay;
    }) 
    
}



function materialGeneration(legend){
    let materialArray = [];
    for (const prop in legend){
        materialArray.push(legend[prop]);
    }
    return materialArray;
}

function  generateStage(stage,legend,wideDimiension,heightDimension){
    let a;
    let b;
    let row = [];
    let numberMaterials = materialGeneration(legend).length;
    for(b=0;b<heightDimension;b++){
        row = [];
        for(a = 0;a<wideDimiension;a++){
            row.push(materialGeneration(legend)[Math.floor(Math.random()*numberMaterials)]);
            }
            stage.push(row)
    }

    return stage;
}


//1. Inicialization - load stage

    //1.1 Matrix Generation
    
    //1.2 Drawing Stage Matrix into html file
   
   
    
    
//2. Run simulation

