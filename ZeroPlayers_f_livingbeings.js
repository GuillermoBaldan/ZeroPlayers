import {
  energy2dynamicElements,
  energy2Universe,
} from "./ZeroPlayers_f_universe.js";
import { checkExistenceInMatrix } from "./ZeroPlayers_f_dataCoherence.js";
import { setColor } from "./ZeroPlayers_f_matrixGeneration.js";
import { debug_, debug_EnergyBalance, debug_energyOfCells, debug_energyOfUniverse, debug_numberOfCells } from "./ZeroPlayers_f_debugging.js";
import { removeItem } from "./ZeroPlayers_f_arraysManipulation.js";
import { drawingMatrix } from "./ZeroPlayers_f_level1.js";
import {setInFreePosition, forbiddenPosition} from "./ZeroPlayers_f_checkValues.js"
import { stageParameters } from "./index.js";
import {gridConversion} from "./ZeroPlayers_f_pathfinder.js"

function totalFreedom(dynamicItem_x, dynamicItem_y) {
  let buffer = randomSteps();
  dynamicItem_x = dynamicItem_x + buffer;
  if (buffer != 0) {
    return [dynamicItem_x, dynamicItem_y];
  } else {
    buffer = randomSteps();
    dynamicItem_y = dynamicItem_y + buffer;
    return [dynamicItem_x, dynamicItem_y];
  }
}

function hunterGroupMovement(dynamicItem_x, dynamicItem_y){
 let new_x;
 let new_y;
 let path =  hunterGroupPathFinder(dynamicItem_x, dynamicItem_y, stageParameters);
 if (path!=undefined){
 new_x = path[1][0];
 new_y = path[1][1];
 }else{
   let randomCoordinate = totalFreedom(dynamicItem_x, dynamicItem_y);
    new_x = randomCoordinate[0];
    new_y = randomCoordinate[1];
 }
  return [new_x, new_y];
}

function left(dynamicItem_x, dynamicItem_y) {
  let aux = -1;
  dynamicItem_x += aux;
  return [dynamicItem_x, dynamicItem_y];
}

function right(dynamicItem_x, dynamicItem_y) {
  let aux = 1;
  dynamicItem_x += aux;
  return [dynamicItem_x, dynamicItem_y];
}

function up(dynamicItem_x, dynamicItem_y) {
  let aux = 1;
  dynamicItem_y += aux;
  return [dynamicItem_x, dynamicItem_y];
}

function down(dynamicItem_x, dynamicItem_y) {
  let aux = -1;
  dynamicItem_y += aux;
  return [dynamicItem_x, dynamicItem_y];
}

function randomSteps() {
  let aux = Math.round(Math.random() * (1 + 1)) - 1;
  return aux;
}

function checkForbiddenPosition(
  stageParameters,
  simulationParameters,
  xy,
  item
) {
  //Position type is a forbiddenPosition like water
  let forbiddenColorsArray = [];
  //1. We encode positionType in a color, because each positionType corresponds to a color
  item.behaviourRules.forbiddenPositions.forEach((positionType) => {
    forbiddenColorsArray.push(stageParameters.legend[positionType]);
  });
  //2. It is checked if the xy position corresponds to the prohibited color and if so, we return true otherwise, false

  if (
    forbiddenColorsArray.includes(
      stageParameters.matrix[
        -xy[1] +
          Math.floor(
            simulationParameters.heightDimension /
              simulationParameters.squareSide
          ) -
          1
      ][xy[0]]
    )
  ) {
    return true;
  } else {
    return false;
  }
}

function preyDetection(item, stageParameters) {
  //We assign the values of the coolindates cells
  let predator_x = item.x;
  let predator_y = item.y;
  let aux_1 = [predator_x, predator_y + 1]; //In principle this does not work for "adjacent ends" mode
  let aux_2 = [predator_x + 1, predator_y + 1];
  let aux_3 = [predator_x + 1, predator_y];
  let aux_4 = [predator_x + 1, predator_y - 1];
  let aux_5 = [predator_x, predator_y - 1];
  let aux_6 = [predator_x - 1, predator_y - 1];
  let aux_7 = [predator_x - 1, predator_y];
  let aux_8 = [predator_x - 1, predator_y + 1];
  let auxArray;
  let preyArray = [];
  let preyCoordinates;
  if (stageParameters.movementType == "diagonal") {
    auxArray = [aux_1, aux_2, aux_3, aux_4, aux_5, aux_6, aux_7, aux_8];
  } else {
    auxArray = [aux_1, aux_3, aux_5, aux_7];
  }
  //We collect all the prey elements in an array
  stageParameters.dynamicElementsArray.forEach((item2) => {
    item.preyClasses.forEach((item3) => {
      if (item2.constructor.name == item3.name) {
        preyArray.push(item2);
      }
    });
  });
  //It is checked if the coordinates of any prey element coincide with the neighboring coordinates
  auxArray.forEach((item4) => {
    preyArray.forEach((item5) => {
      if (item4[0] == item5.x && item4[1] == item5.y) {
        preyCoordinates = [item5.x, item5.y];
      }
    });
  });
  return preyCoordinates;
}

function preySelectionAndRemove(item, preyCoordinates, stageParameters) {
  let a;
  let element;
  for (a = 0; a < stageParameters.dynamicElementsArray.length; a++) {
    //element is the prey
    element = stageParameters.dynamicElementsArray[a];
    if (element.x == preyCoordinates[0]) {
      if (element.y == preyCoordinates[1]) {
        //It proceeds to make the transfer of energy to the prey to the predator
        item.energy += element.energy;
        if (item.energy > item.maxEnergy) {
          //The energy of a living being can´t be greather than its maximum level
          //The energy that rebase is transfer to the universe
          energy2Universe(item.energy - item.maxEnergy, stageParameters);
          item.energy = item.maxEnergy;
        }
        //It proceeds to remove the prey, which has been absorbed, from dynamicElementsArray
        stageParameters.dynamicElementsArray.splice(a, 1);
        stageParameters.matrix[element.y][element.x] = stageParameters.staticStage[element.y][element.x];
      }
    }
  }
}

function reproductionFunction(stageParameters, simulationParameters) {
  let sonsArray = [];
  let son;
  stageParameters.dynamicElementsArray.forEach((item) => {
  if(item.vitalFunctions.reproduction &&(item.cyclesToReproduction == item.reproductionPeriod)) {
    
  if (stageParameters.dynamicElementsArray.indexOf(item) != -1) {
    if (item.reproductionRadio != undefined) {
      son = new item.constructor();
      // do{
      do {
        son.x =
          item.x +
          Math.round(
            Math.random() * (son.reproductionRadio + son.reproductionRadio) -
              son.reproductionRadio
          );
      } while (
        !(
          son.x >= 0 &&
          son.x <=
            Math.floor(
              simulationParameters.wideDimension /
                simulationParameters.squareSide
            ) -
              1
        )
      );
      do {
        son.y =
          item.y +
          Math.round(
            Math.random() * (son.reproductionRadio + son.reproductionRadio) -
              son.reproductionRadio
          );
      } while (
        !(
          son.y >= 0 &&
          son.y <=
            Math.floor(
              simulationParameters.heightDimension /
                simulationParameters.squareSide
            ) -
              1
        )
      );

      if ((!checkExistenceInMatrix(son.x, son.y, stageParameters)) &&(item.energy > item.energyBorn)) {
        //If there isn´t any object of dynamicElementsArray with this coordinates, 
        if (!(forbiddenPosition(son.x,son.y,stageParameters, stageParameters.matrix))) {
          //and if the position is not a forbidden position, then the object is created
        sonsArray.push(son);
        //Transfer of energy from Father to Son
        item.energy -= item.energyBorn;
        simulationParameters.globalCounter++;
      }
    }
    sonsArray.forEach((item2) => {
      // setColor(item, item2.color, stageParameters.matrix, simulationParameters);
      stageParameters.matrix[item2.y][item2.x] = item2.color;
      //drawingMatrix(stageParameters, simulationParameters);
    });
    stageParameters.dynamicElementsArray =
      stageParameters.dynamicElementsArray.concat(sonsArray);
    sonsArray = [];
    simulationParameters.auxCounter++;
       }
    }
  item.cyclesToReproduction = 0;
  }else{
    item.cyclesToReproduction++;
  }
});
}



function cellDeath(stageParameters) {
  for(let i = 0; i < stageParameters.dynamicElementsArray.length; i++){
if (stageParameters.dynamicElementsArray[i].vitalFunctions.death){
  if(stageParameters.dynamicElementsArray[i].energy <= 0){
    stageParameters.matrix[stageParameters.dynamicElementsArray[i].y][stageParameters.dynamicElementsArray[i].x] = stageParameters.staticStage[stageParameters.dynamicElementsArray[i].y][stageParameters.dynamicElementsArray[i].x];
    stageParameters.dynamicElementsArray.splice(i, 1);
  i =0;
  } else if (stageParameters.dynamicElementsArray[i].life<=0){
  stageParameters.matrix[stageParameters.dynamicElementsArray[i].y][stageParameters.dynamicElementsArray[i].x] = stageParameters.staticStage[stageParameters.dynamicElementsArray[i].y][stageParameters.dynamicElementsArray[i].x];
  energy2Universe(stageParameters.dynamicElementsArray[i].energy, stageParameters);
  stageParameters.dynamicElementsArray.splice(i, 1);
    i = 0;
  }
  }
}
  

}

function dynamicElementsGenerator(stageParameters) {
  stageParameters.livingBeingsCollection.forEach((element) => {
    for(let i = 0; i < element.number; i++){
    stageParameters.dynamicElementsArray.push(new element.type)
    }});
   stageParameters.dynamicElementsArray.forEach((item) => {
     //Live or dynamic elements color are added to the matrix
     setInFreePosition(item,stageParameters);
     //Transfer of energy from universe to cells
     energy2dynamicElements(item.energyBorn, stageParameters);
   });
}

function cellsEnergyConsumption(stageParameters){
  stageParameters.dynamicElementsArray.forEach((item) => {
    item.energy -= item.energyConsumption;
    //The energy is transfer from cells to universe
    energy2Universe(item.energyConsumption, stageParameters);
  });
}

function cellsLifeConsumption(stageParameters){
  stageParameters.dynamicElementsArray.forEach((item) => {
    item.life -= item.lifeConsumption;
  }); 
}

function feeding(stageParameters){
  stageParameters.dynamicElementsArray.forEach((item) => {
    if (item.type == "predator"){
    /*   if (item.cognitiveFunctions){
        hunterPathFinder(item, stageParameters);
      } else {
        let preyCoordinates = preyDetection(item, stageParameters);
        if (preyCoordinates != undefined) {
          preySelectionAndRemove(item, preyCoordinates, stageParameters);
        }
      } */
      let preyCoordinates = preyDetection(item, stageParameters);
        if (preyCoordinates != undefined) {
          preySelectionAndRemove(item, preyCoordinates, stageParameters);
        }
    }else if (item.type == "vegetable"){
      let energyPortion = item.energyConsumption * 3;
      if (item.energy + energyPortion > item.maxEnergy){
        energy2Universe(item.energy + energyPortion - item.maxEnergy, stageParameters);
        energyPortion = item.maxEnergy - item.energy;
        energy2dynamicElements(energyPortion, stageParameters);
      } else {
        item.energy += energyPortion;
        energy2dynamicElements(energyPortion, stageParameters);
      }
           
    }

  }); 
  debug_EnergyBalance();
}

function hunterGroupPathFinder(dynamicItem_x, dynamicItem_y, stageParameters){
  let preyArray = [];
  let path2prey = [];
  let finder = new PF.AStarFinder();
  let grid = new PF.Grid(gridConversion(stageParameters.matrix))
//1. Locate the preys
  stageParameters.dynamicElementsArray.forEach((item) => {
     if ((item.constructor.name) == "grossCell"){
      preyArray.push(item)
    }
  });
  
  console.log("preyArray");
  console.log(preyArray);
//2. Calculate the path to the preys
/*   preyArray.forEach((item) => {
    console.log(`dynamicItem_x: ${dynamicItem_x}`);
    console.log(`dynamicItem_y: ${dynamicItem_y}`);
    console.log(`item.x: ${item.x}`);
    console.log(`item.y: ${item.y}`);
    console.log(grid)
    path2prey.push(finder.findPath(dynamicItem_x, dynamicItem_y, item.x, item.y, grid));
  }); */
  if (preyArray.length > 0){
  path2prey = finder.findPath(dynamicItem_x, dynamicItem_y,preyArray[0].x, preyArray[0].y, grid);
  } else {
    path2prey = undefined;
  }

  return path2prey;
}

export {
  totalFreedom,
  left,
  right,
  up,
  down,
  checkForbiddenPosition,
  preyDetection,
  preySelectionAndRemove,
  reproductionFunction,
  cellDeath,
  dynamicElementsGenerator,
  cellsEnergyConsumption,
  cellsLifeConsumption,
  feeding,
  hunterGroupPathFinder,
  hunterGroupMovement  
};
