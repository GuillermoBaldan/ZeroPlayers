
let simulationSteps = 7;
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
    trajectory_y : [0,0,0,0,0,0,0] 
}

let wideDimension = 650;
let heightDimension = 650;
let squareSide = 25;
let staticStage = [];
let dynamicStage = []; //Creo que de momento no lo estoy usando.
let completeStage = [];

dynamicElementsArray = [cell];

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
        staticStage = generateStaticStage(staticStage,legend,wideDimension,heightDimension);
        completeStage = generateDinamicStage(staticStage,dynamicElementsArray,squareSide)
        //1.2 Drawing StageMatrix
        lienzo = document.getElementById("lienzo");
        lienzo.setAttribute("width", wideDimension);
        lienzo.setAttribute("height", heightDimension); 
        ctx = lienzo.getContext('2d');
        drawingStage(completeStage,squareSide);
        //drawingDinamicStage(stage,dynamicElementsArray,squareSide);
        runSimulation(simulationSteps,staticStage,dynamicElementsArray)
        }

function runSimulation(simulationSteps,staticStage,dynamicElementsArray){
    let index = 0;
  /*   for(a=0;a<simulationSteps-1;a++){
        console.log("a: "+a)
        setTimeout(function(){
            let b;
            b = a; 
            completeStage = oneSimulationStepCalculation(b,staticStage,dynamicElementsArray);
            drawingStage(completeStage,squareSide); 
            }, timePerStep);
           

    } */
    oneStepSimulation(index,staticStage,dynamicElementsArray,simulationSteps)


}

function oneStepSimulation(index,staticStage,dynamicElementsArray,simulationSteps){
    setTimeout(function(){
       
        completeStage = oneSimulationStepCalculation(index,staticStage,dynamicElementsArray);
        drawingStage(completeStage,squareSide);
        index = index + 1;
        if(index<simulationSteps){
            oneStepSimulation(index,staticStage,dynamicElementsArray,simulationSteps);
        }
        
        }, timePerStep);
}

function oneSimulationStepCalculation(index,staticStage,dynamicElementsArray){
    let completeStage = [];
    dynamicElementsArray.forEach(item => {
        console.log("index: "+index);
        item.x = item.x + item.trajectory_x[index];
        item.y = item.y + item.trajectory_y[index];
    })
    completeStage = generateDinamicStage(staticStage,dynamicElementsArray,squareSide)
    return completeStage
}


function drawingCell(stage,squareSide,cell){
    drawSquare(cell.x,cell.y,squareSide,squareSide,cell.color);
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

function  generateStaticStage(stage,legend,wideDimiension,heightDimension){
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

function  generateDinamicStage(stage,dynamicElementsArray,squareSide){
    let a;
    let b;
    let row = [];
    /* let numberMaterials = materialGeneration(legend).length;
    for(b=0;b<heightDimension;b++){
        row = [];
        for(a = 0;a<wideDimiension;a++){
            row.push(materialGeneration(legend)[Math.floor(Math.random()*numberMaterials)]);
            }
            stage.push(row)
    } */
   /*  console.log(dynamicElementsArray) */
    dynamicElementsArray.forEach( item =>{
        stage[item.y+(heightDimension/squareSide-1)][item.x] = item.color;
    })
   

    return stage;
}



//1. Inicialization - load stage

    //1.1 Matrix Generation 
        //1.1.1 Static Elements Matrix Generation
        //1.1.2 Dinamic Elements Matrix Generation 
    
    //1.2 Drawing Stage Matrix into html file
       
    
//2. Run simulation

