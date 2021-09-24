
let simulationSteps = 7;
let timePerStep = 1000; //In milliseconds

let legend = { 
    ground : "brown",
    water  :  "blue",
    grass  :  "green"

}

let cell = {
    id     : "cell_1",
    color  : "yellow",
    x      : 13,
    y      : 13,
    walkmode : "trayectory",
    trajectory_x : [1,1,1,1,1,1,1],
    trajectory_y : [0,0,0,0,0,0,0],
    walk   : [randomWalk]
}

let wideDimension = 650;
let heightDimension = 650;
let squareSide = 25;
//let dynamicStage = []; //Creo que de momento no lo estoy usando.
//let matrixStage = []; He pasado esta variable a local

dynamicElementsArray = [cell];

/* let lienzo = document.getElementById("lienzo");
console.log(lienzo)
   /*  lienzo.setAttribute("width", wideDimension);
    lienzo.setAttribute("height", heightDimension); 
let ctx = lienzo.getContext("2d"); */

let lienzo;
let ctx;

    //FUNCIONES
function Init(){
        let matrixStage = [];
        //1.1 Matrix Generation
        matrixStage = matrixGenerationInit(dynamicElementsArray,legend,squareSide,wideDimension,heightDimension)
        //1.2 Drawing StageMatrix
        canvasInit();
        drawingStage(matrixStage[1],squareSide);
        //drawingDinamicStage(stage,dynamicElementsArray,squareSide);
        runSimulation(simulationSteps,matrixStage[0],dynamicElementsArray)
        //canvasInit();
        
}

function drawSquare(x,y, width, height,color){
    ctx.beginPath();
    ctx.fillStyle = `${color}`;
    ctx.fillRect(x, y, width, height);
    ctx.stroke();
}



function canvasInit(){
    lienzo = document.getElementById("lienzo");
    lienzo.setAttribute("width", wideDimension);
    lienzo.setAttribute("height", heightDimension); 
    ctx = lienzo.getContext('2d');
}

function matrixGenerationInit(dynamicElementsArray,legend,squareSide,wideDimension,heightDimension){
    let completeStageAux;
    let staticStageAux;
    staticStageAux = generateStaticStage(legend,wideDimension,heightDimension);
    completeStageAux = generateCompleteStageInit(staticStageAux,dynamicElementsArray,squareSide);
    return [staticStageAux,completeStageAux];
}

function matrixGeneration(staticStage, dynamicElementsArray,legend,squareSide,wideDimension,heightDimension){
    let completeStageAux;
    let staticStageAux;
    staticStageAux = generateStaticStage(staticStage,legend,wideDimension,heightDimension);
    completeStageAux = generateCompleteStage(staticStageAux,dynamicElementsArray,squareSide);
    return completeStageAux;
}

function runSimulation(simulationSteps,staticStage,dynamicElementsArray){
    let index = 0;
    if (simulationSteps>0){
        oneStepSimulation(index,staticStage,dynamicElementsArray,simulationSteps)
    }
    
}

function oneStepSimulation(index,staticStage,dynamicElementsArray,simulationSteps){
    setTimeout(function(){
        console.log("simulation number: "+index)
        let completeStageAux;
        completeStageAux = oneSimulationStepCalculation(index,staticStage,dynamicElementsArray);
        //drawingStage(completeStageAux,squareSide);
        matrixStage = matrixGenerationInit(dynamicElementsArray,legend,squareSide,wideDimension,heightDimension)
        drawingStage(matrixStage[1],squareSide);
        completeStageAux = [] //Borramos este array2D
        index = index + 1;
        if(index<simulationSteps){
            oneStepSimulation(index,staticStage,dynamicElementsArray,simulationSteps);
        }
            
        }, timePerStep);
}

function oneSimulationStepCalculation(index,staticStage,dynamicElementsArray){
    let completeStageAux = [];
    movementFunction(index,dynamicElementsArray)   
    completeStageAux = generateCompleteStage(staticStage,dynamicElementsArray,squareSide)
    return completeStageAux
}

function generateCompleteStage(staticStage,dynamicElementsArray,squareSide){
    let a;
    let b;
    let completeStageAux = cloneArray2D(staticStage);
    
    dynamicElementsArray.forEach( item =>{
       completeStageAux[item.y+(heightDimension/squareSide-1)][item.x] = item.color;
    })
    return completeStageAux;
}
/* 
function drawingCell(stage,squareSide,cell){
    drawSquare(cell.x,cell.y,squareSide,squareSide,cell.color);
}
 */
function drawingStage(completeStage,squareSide){
    //1. Recorremos el array stage
    let completeStageAux = [];
    let x = 0;
    let y = 0;
    let Ax = squareSide;
    let Ay = squareSide;
    //completeStageAux = completeStage;
    completeStageAux = cloneArray2D(completeStage);
    /* console.log(completeStageAux)
    console.log(completeStageAux[0][0]); */
    //Borramos todo el canva;
    //canvasInit()
     completeStageAux.forEach(row => {
        row.forEach( column => {
            drawSquare(x,y,squareSide,squareSide,column);
            x = x + Ax;        
        })
        x = 0;
        y = y + Ay;
    })
    completeStageAux = []; 
    
}

function cloneArray2D(original){
    let clone = [];
    let row = [];
    original.forEach(item =>{
        item.forEach(subitem => {
            row.push(subitem);
        })
        clone.push(row)
        row = [];
    })
    return clone;
}

function copyArray2D(original,copy){
    let a;
    let b;
    let row = [];
    original.forEach(item =>{
        item.forEach(subitem => {
            row.push(subitem);
        })
        copy.push(row)
    })
    return copy;
}





function materialGeneration(legend){
    let materialArray = [];
    for (const prop in legend){
        materialArray.push(legend[prop]);
    }
    return materialArray;
}

function  generateStaticStage(legend,wideDimiension,heightDimension){
    let a;
    let b;
    let row = [];
    let numberMaterials = materialGeneration(legend).length;
    let stageAux =[];
    for(b=0;b<heightDimension;b++){
        row = [];
        for(a = 0;a<wideDimiension;a++){
            row.push(materialGeneration(legend)[Math.floor(Math.random()*numberMaterials)]);
            }
            stageAux.push(row)
    }

    return stageAux;
}

function generateCompleteStageInit(staticStage,dynamicElementsArray,squareSide){
    let a;
    let b;
    let completeStage = cloneArray2D(staticStage);
    
    dynamicElementsArray.forEach( item =>{
       completeStage[-item.y+(heightDimension/squareSide-1)][item.x] = item.color;
    })
   

    return completeStage;
}

//Funciones del motor de Físicas
function movementFunction(index,dynamicElementsArray){
    dynamicElementsArray.forEach(item => {
        console.log("index: "+index);
        if(item.walkmode == "autonomous"){
          item.walk[0]();
        } else {
          console.log(item)
          item.x = item.x + item.trajectory_x[index];
          item.y = item.y + item.trajectory_y[index];
         
        }
    
    })
}

function positionElement(id,ElementsArray,x,y){
    let pointer = null;
    //1. Encontrarmos al elmento con el id dado
    ElementsArray.forEach(
        item => {
            if(item.id == id){
                pointer = item;
            }
        }
    )
    //2.Posicionamos el elemento;
    pointer.x = x;
    pointer.y = y;
    return pointer;
}

function refreshCanvas(){
    matrixStage = matrixGenerationInit(dynamicElementsArray,legend,squareSide,wideDimension,heightDimension)
    drawingStage(matrixStage[1],squareSide);
} 


//Funciones de seres vivos

function randomWalk(rulesArray){
  /*   let cell = {
        color  : "yellow",
        x      : 0,
        y      : 0,
        trajectory_x : [1,1,1,1,1,1,1],
        trajectory_y : [0,0,0,0,0,0,0],
        walk   : [randomWalk]
    } */

}



//1. Inicialization - load stage - f: Init()

    //1.1 Matrix Generation - f: matrixGenerationInit
        //1.1.1 Static Elements Matrix Generation
        //1.1.2 Dinamic Elements Matrix Generation 
    
    //1.2 Drawing Stage Matrix into html file - f: drawingStage

    //1.3 Run simulation  - f: runSimulation
        //1.3.1 Matrix Generation - f: Matrix Generation
        //1.3.2 Drawing Matrix Stage

