import {
  cloneArray2D,
  cloneArray,
  arrayOf2DVectorsIncludeVector,
  copyVariable,
  lastElement,
} from "./ZeroPlayers_f_arraysManipulation.js";
import { movement } from "./ZeroPlayers_f_movement.js";
import {
  
  checkForbiddenPosition,
  preyDetection,
  preySelectionAndRemove,
  reproductionFunction,
  cellDeath,
  dynamicElementsGenerator,
  cellsEnergyConsumption,
  cellsLifeConsumption,
  feeding,
  perception,
  totalFreedom,
  zigzagFreedom,
  hunterGroupPathFinder,
  hunterGroupMovement
} from "./ZeroPlayers_f_livingbeings.js";
import {
  energy2Universe,
  energy2dynamicElements,
} from "./ZeroPlayers_f_universe.js";
import { ordering4drawing } from "./ZeroPlayers_f_canvas.js";
import {
  checkSimpleCellsExistence,
  checkNumbersTypeCell,
  freePositionsArrayGenerator,
  forbiddenPosition,
  setInFreePosition
} from "./ZeroPlayers_f_checkValues.js";
import {
  checkExistenceInMatrix,
  coordinatesAssigment,
} from "./ZeroPlayers_f_dataCoherence.js";
import {
  staticMovement,
  trajectoryMovement,
  autonomousMovement,
} from "./ZeroPlayers_f_movement.js";

import {
  debug_PrintDynamicsElementsCoordinates,
  debug_DetectCoordinatesRepeated,
  debug_totalEnergy,
  debug_numberOfCells,
  debug_energyOfUniverse,
  debug_energyOfCells,
  debug_EnergyBalance,
  debug_simulationCicle,
  debug_classesOfCells,
  debug,
  debug_typesOfSpecies,
  debug_matrix,
  debug_numberOfUnitsWithColor,
  debug_ageOfcell,
} from "./ZeroPlayers_f_debugging.js";
import { simulation } from "./ZeroPlayers_f_level1.js";
import{gridConversion} from "./ZeroPlayers_f_pathfinder.js"

function generateStaticStage(stageParameters, simulationParameters) {
  let a;
  let b;
  let row = [];
  let numberMaterials = materialGeneration(
    stageParameters.legendTerrain
  ).length;
  let staticStageAux = [];
  for (
    b = 0;
    b <
    Math.floor(
      simulationParameters.heightDimension / simulationParameters.squareSide
    );
    b++
  ) {
    row = [];
    for (
      a = 0;
      a <
      Math.floor(
        simulationParameters.wideDimension / simulationParameters.squareSide
      );
      a++
    ) {
      row.push(
        materialGeneration(stageParameters.legendTerrain)[
          Math.floor(Math.random() * numberMaterials)
        ]
      );
    }
    staticStageAux.push(row);
    stageParameters.staticStage = staticStageAux;
  }

  return staticStageAux;
}

function materialGeneration(legendTerrain) {
  let materialArray = [];
  for (const prop in legendTerrain) {
    materialArray.push(legendTerrain[prop]);
  }
  return materialArray;
}



function matrixGeneratorInit(stageParameters, simulationParameters) {
 //Initial case
 
 stageParameters.dynamicElementsArray = [];

 stageParameters.matrix = cloneArray2D(stageParameters.staticStage);
 //Add dinamic Elements



 dynamicElementsGenerator(stageParameters)

  return stageParameters.matrix;
}



function matrixGenerator(stageParameters, simulationParameters) {
  
  console.log("stageParameters.matrix");
  console.log(stageParameters.matrix);
  
  // Inicializamos las variables
 //perceiving the environment
perception(stageParameters);

  //Giving Movement to Dynamic Elements
 stageParameters.matrix = giveMovementToDynamicElementsv3(stageParameters.matrix, stageParameters, simulationParameters);
 //Prey function of predator cells
 feeding(stageParameters)
 //Reproduction of cells
reproductionFunction(stageParameters, simulationParameters);
 //Consumption of energy
cellsEnergyConsumption(stageParameters);
//Consumption of life
cellsLifeConsumption(stageParameters);
 //Death of cells
cellDeath(stageParameters);
  return stageParameters.matrix;
}

function setColor(x, y, color, matrix, simulationParameters) {
  matrix[y][x] = color;
  return matrix;
}

function giveMovementToDynamicElements(matrix, stageParameters, simulationParameters) {
  let xy_before = [];
  let newPosition = [];
  let counter = 0;
  //matrix = cloneArray2D(stageParameters.staticStage)
  stageParameters.dynamicElementsArray.forEach((item) => {
/*     xy_before[0] = item.x
    xy_before[1] = item.y  */
    //1 Calculamos nueva posicióndo
    if (!(item.walkmode == "static")) { //If dynamic Elements are not static they can recive movement
      xy_before[0] = item.x
      xy_before[1] = item.y
     
      newPosition = item.walk(item, stageParameters, simulationParameters);
 
      if ((newPosition[0] != xy_before[0]) || (newPosition[1] != xy_before[1])) {
       
        if (
          !forbiddenPosition(
            newPosition[0],
            newPosition[1],
            stageParameters,
            matrix
          )
        ) {//Actualizamos nueva posición
          
          item.x = newPosition[0];
          item.y = newPosition[1];
          matrix[item.y][item.x] = item.color;
       
          matrix[xy_before[1]][xy_before[0]] = stageParameters.staticStage[xy_before[1]][xy_before[0]];
        
        }
       } else {

       }
    
 
    }
    
     //1.2 Comprobamos que no hay agua u otra célula en la nueva posición
   
  });

  return matrix;
}

function giveMovementToDynamicElementsv2(matrix, stageParameters, simulationParameters) {
  let xy_before = [];
  stageParameters.dynamicElementsArray.forEach((item) => {
    if (!(item.walkmode == "static")) { //If dynamic Elements are not static they can recive movement
    xy_before[0] = item.x
    xy_before[1] = item.y
    //1 Calculamos nueva posición
    let newPosition = item.walk(item, stageParameters, simulationParameters);
    //2. Comprobamos que la nueva posición no es igual a la anterior
    if ((newPosition[0] != xy_before[0]) || (newPosition[1] != xy_before[1])) {  
      //3. Comprobamos que la nueva posición no es prohibida
      if (!forbiddenPosition(newPosition[0], newPosition[1], stageParameters, matrix)) {
        //4. Actualizamos nueva posición
        item.x = newPosition[0];
        item.y = newPosition[1];
        matrix[item.y][item.x] = item.color;
        //5. Actualizamos la posición anterior
        matrix[xy_before[1]][xy_before[0]] = stageParameters.staticStage[xy_before[1]][xy_before[0]];
      } 
    }
  }});
}

  function giveMovementToDynamicElementsv3(matrix, stageParameters, simulationParameters){
    let xy_before = [];
    let newPosition = [];
    stageParameters.dynamicElementsArray.forEach((item) => {
    if (!(item.walkmode == "static")){
    xy_before[0] = item.x;
    xy_before[1] = item.y; 
    
     
    newPosition = item.walk(item, stageParameters, simulationParameters)
    item.x = newPosition[0]
    item.y = newPosition[1]
    
      if (forbiddenPosition(newPosition[0], newPosition[1], stageParameters, matrix)){
        item.x = xy_before[0];
        item.y = xy_before[1];
      } else {
        matrix[item.y][item.x] = item.color;
        matrix[xy_before[1]][xy_before[0]] = stageParameters.staticStage[xy_before[1]][xy_before[0]];
      }
    } 
  })
 return matrix;
}

function giveMovementToDynamicElementsv4(matrix, stageParameters, simulationParameters){
  let xy_before = [];
  let newPosition = [];
  stageParameters.dynamicElementsArray.forEach((item) => {
  if (!(item.walkmode == "static")){
  xy_before[0] = item.x;
  xy_before[1] = item.y; 
  
   
  newPosition = item.walk(item, stageParameters, simulationParameters)
  item.x = newPosition[0]
  item.y = newPosition[1]
  
    if (forbiddenPosition(newPosition[0], newPosition[1], stageParameters, matrix)){
      item.x = xy_before[0];
      item.y = xy_before[1];
    } else {
      matrix[item.y][item.x] = item.color;
      matrix[xy_before[1]][xy_before[0]] = stageParameters.staticStage[xy_before[1]][xy_before[0]];
    }
  } 
})
return matrix;
}

function vegetablesFirst(stageParameters){
  let temp;
 for(let i = 0; i<stageParameters.dynamicElementsArray.length;i++){
  if(stageParameters.dynamicElementsArray[i].type == "vegetable"){
    //
    temp = stageParameters.dynamicElementsArray[i];
    //delete stageParameters.dynamicElementsArray[i];
    stageParameters.dynamicElementsArray.splice(i,1);
    stageParameters.dynamicElementsArray.unshift(temp);
  }
 }
}


export { vegetablesFirst, generateStaticStage, matrixGeneratorInit, matrixGenerator, setColor, materialGeneration, giveMovementToDynamicElementsv2 }
