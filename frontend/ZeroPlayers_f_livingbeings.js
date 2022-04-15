import {
  energy2dynamicElements,
  energy2Universe,
} from "./ZeroPlayers_f_universe.js";
import { checkExistenceInMatrix, coordinatesAssigment } from "./ZeroPlayers_f_dataCoherence.js";
import { setColor, vegetablesFirst } from "./ZeroPlayers_f_matrixGeneration.js";
import { debug,debug_, debug_EnergyBalance, debug_energyOfCells, debug_energyOfUniverse, debug_numberOfCells } from "./ZeroPlayers_f_debugging.js";
import { lastElement, removeItem, deleteRepeatedItem } from "./ZeroPlayers_f_arraysManipulation.js";
import { drawingMatrix } from "./ZeroPlayers_f_level1.js";
import {setInFreePosition, forbiddenPosition, coordinates2son, sonInMatrix, checkReproductionRules} from "./ZeroPlayers_f_checkValues.js"
import { simulationParameters, stageParameters } from "./index.js";
import {gridConversion} from "./ZeroPlayers_f_pathfinder.js"
import {genericLivingBeing, countingSpecies} from "./ZeroPlayers_classes_livingbeings.js"

function totalFreedom(item) {
  let buffer = randomSteps();
  item.x = item.x + buffer;
  if (buffer != 0) {
    return [item.x, item.y];
  } else {
    buffer = randomSteps();
    item.y = item.y + buffer;
    return [item.x, item.y];
  }
}

function zigzagFreedom(item,stageParameters,simulationParameters){
  let rightEnd = simulationParameters.wideDimension/simulationParameters.squareSide - 1;
  let upEnd = simulationParameters.heightDimension/simulationParameters.squareSide - 1;
  let buffer = randomSteps();
  if (stageParameters.universeRules.frontier == "close"){
    
    if ((item.x + buffer) < 0){ //left end
      item.x =  item.x - buffer;
    } else if((item.x + buffer) > rightEnd){ //right end
    item.x = item.x - buffer;
    } else{
      item.x = item.x + buffer;
    }
    if (buffer == 0){
      do{
      buffer = randomSteps();
      }while(buffer == 0)

      if ((item.y + buffer) < 0){
        item.y = item.y - buffer;
      } else if ((item.y + buffer) > upEnd){
        item.y = item.y - buffer;
      } else {
        item.y = item.y + buffer;
      }
    }
  } else {
    if ((item.x + buffer) < 0){ //left end
      item.x =  rightEnd;
    } else if((item.x + buffer) > rightEnd){ //right end
    item.x = 0;
    } else{
      item.x = item.x + buffer;
    }
    if (buffer == 0){
      do{
      buffer = randomSteps();
      }while(buffer == 0)
     

      if ((item.y + buffer) < 0){
        item.y = upEnd;
      } else if ((item.y + buffer) > upEnd){
        item.y =  0;
      } else {
        item.y = item.y + buffer;
      }
    }
  }
  return [item.x, item.y]
  }
  


function hunterGroupMovement(hunter, stageParameters, simulationParameters){
 let new_x;
 let new_y;
 let path =  hunterGroupPathFinder(hunter, stageParameters);
 if (path!=undefined){
 new_x = path[1][0];
 new_y = path[1][1];
 }else{
   let randomCoordinate = zigzagFreedom(hunter, stageParameters, simulationParameters);
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
    
    
    item.preys.forEach((item3) => {
      if (item2.name == item3) {
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
  stageParameters.dynamicElementsArray.forEach((father) => {
    if (father.vitalFunctions.reproduction && checkReproductionRules(father, stageParameters)) {
        fatherReproduction(father, stageParameters, simulationParameters);
    }
  });
}

function fatherReproduction(father, stageParameters, simulationParameters){
  let sonsArray = [];
  let son;
  //1. Si se cumplen las condiciones de reproducción, se crea un nuevo elemento
  if((father.cyclesToReproduction == father.reproductionPeriod)) {
        son = new genericLivingBeing( father.name, father.type, father.color, father.preys, father.movement, father.initialNumber)
        son = coordinates2son(father, son, simulationParameters); //Assignamos coordenadas al nuevo elemento generado que se encuentren en la
        //2. Una vez generado el hijo se trata de situarlo en la matrix
        sonsArray = sonInMatrix(father, son, stageParameters, simulationParameters);
        sonsArray.forEach((son_item) => {
      stageParameters.matrix[son_item.y][son_item.x] = son_item.color;
      son_item.id = countingSpecies(son_item.name, stageParameters)
      });
      stageParameters.dynamicElementsArray =
        stageParameters.dynamicElementsArray.concat(sonsArray);
      sonsArray = [];
      simulationParameters.auxCounter++;
    father.cyclesToReproduction = 0;
    }else{
      father.cyclesToReproduction++;
    }
}



function cellDeath(stageParameters) {
  for(let i = 0; i < stageParameters.dynamicElementsArray.length; i++){
if (stageParameters.dynamicElementsArray[i].vitalFunctions.death){
  if(stageParameters.dynamicElementsArray[i].energy <= 0){
    stageParameters.matrix[stageParameters.dynamicElementsArray[i].y][stageParameters.dynamicElementsArray[i].x] = stageParameters.staticStage[stageParameters.dynamicElementsArray[i].y][stageParameters.dynamicElementsArray[i].x];
    stageParameters.dynamicElementsArray.splice(i, 1);
  i =0;
  } else if (stageParameters.dynamicElementsArray[i].life <= stageParameters.dynamicElementsArray[i].age){
  stageParameters.matrix[stageParameters.dynamicElementsArray[i].y][stageParameters.dynamicElementsArray[i].x] = stageParameters.staticStage[stageParameters.dynamicElementsArray[i].y][stageParameters.dynamicElementsArray[i].x];
  energy2Universe(stageParameters.dynamicElementsArray[i].energy, stageParameters);
  console.log(`The cell ${stageParameters.dynamicElementsArray[i].id} of coordinates (${stageParameters.dynamicElementsArray[i].x},${stageParameters.dynamicElementsArray[i].y}) has death`)
  ;
  
  ;
  
  stageParameters.dynamicElementsArray.splice(i, 1);
    i = 0;
  }
  }
}
  

}

function dynamicElementsGenerator(stageParameters) {
  
  let i;
  
  
  stageParameters.livingBeingsCollection.forEach((element) => {
     for(i = 0; i < element.number; i++){
    
    stageParameters.dynamicElementsArray.push(
      new genericLivingBeing( element.name, element.type, element.color, element.preys, element.movement, element.initialNumber)
      );
    stageParameters.dynamicElementsArray[stageParameters.dynamicElementsArray.length - 1].id = countingSpecies(element.name, stageParameters);
      /* console.log(`element.name: ${element.name} has function movement ${stageParameters.dynamicElementsArray[stageParameters.dynamicElementsArray.length - 1].walk}`);
      console.log(`element.name: ${element.name} has walkmode ${stageParameters.dynamicElementsArray[stageParameters.dynamicElementsArray.length - 1].walkmode}`);
 */
    
    
  }});
  
   stageParameters.dynamicElementsArray.forEach((item) => {
    item.x = Math.floor(Math.random() * ((simulationParameters.wideDimension / simulationParameters.squareSide) - 1));
    item.y = Math.floor(Math.random() *((simulationParameters.heightDimension / simulationParameters.squareSide) - 1));
     //Live or dynamic elements color are added to the matrix
     setInFreePosition(item,stageParameters, simulationParameters);
     //Transfer of energy from universe to cells
     energy2dynamicElements(item.energyBorn, stageParameters);
     
   });
   //Reordenación de elementos para evitar el visual flicker bug
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
    item.age += item.lifeConsumption;
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
  
}

function hunterPathFinder(hunter, stageParameters, simulationParameters){
  let preys =[];
  let preyArray = [];
  let path2prey;
  let result;
  let finder = new PF.AStarFinder();
  let grid = new PF.Grid(gridConversion(stageParameters.matrix))
//1. Locate the preys
  stageParameters.dynamicElementsArray.forEach((item) => {
    
     if ((item.name) == "gross"){
      preys.push({item: item});
    }
  
//2. Calcule the path to the preys
;
;
console.log(`prey.x: ${preys[preys.length-1].item.x} prey.y: ${preys[preys.length-1].item.y}`);


console.log("hunter.x: " + hunter.x + " hunter.y: " + hunter.y)
  path2prey = finder.findPath(hunter.x, hunter.y,preys[preys.length-1].x,preys[preys.length-1].y, grid);
 
  preys[preys.length-1].path = path2prey;
  ;
  

  });
//.3 Fillter by the shortest path
  result = preys.sort(function(a, b){
    return a.path.length - b.path.length;
  });


  return result[0].path;
}

function hunterPathFinderv2(hunter, stageParameters, simulationParameters){
  let preys =[];
  let preyArray = [];
  let path2prey;
  let paths = [];
  let filteredPaths = [];
  let result;
  let finder = new PF.AStarFinder();
  let grid = new PF.Grid(gridConversion(stageParameters.matrix))
  stageParameters.dynamicElementsArray.forEach((item) => {
    
    if ((item.name) == "gross"){
     preyArray.push(item)
   }
 });
 

//2. Calculate the path to the preys

 if (preyArray.length > 0){
 path2prey = finder.findPath(hunter.x, hunter.y,preyArray[0].x, preyArray[0].y, grid);
  paths.push(path2prey);
  //3. Filter by the shortest path
filteredPaths = paths.sort(function(a, b){
  return a.length - b.length;
});
   result = filteredPaths[0][1];
 } else {
   result =  zigzagFreedom(hunter, stageParameters, simulationParameters);
 }

return result;

}

function hunterPathFinderv3(hunter, stageParameters, simulationParameters){
 //This function is being design to work with giveMomevementToDynamicElementsv4
  let preys =[];
  let preyArray = [];
  let path2prey;
  let paths = [];
  let filteredPaths = [];
  let result;
  let finder = new PF.AStarFinder();
  let grid = new PF.Grid(gridConversion(stageParameters.matrix))
  stageParameters.dynamicElementsArray.forEach((item) => {
    
    if ((item.name) == "gross"){
     preyArray.push(item)
   }
 });
 

//2. Calculate the path to the preys

 if (preyArray.length > 0){
 path2prey = finder.findPath(hunter.x, hunter.y,preyArray[0].x, preyArray[0].y, grid);
  paths.push(path2prey);
  //3. Filter by the shortest path
filteredPaths = paths.sort(function(a, b){
  return a.length - b.length;
});
   result = filteredPaths[0][1];
 } else {
   result =  zigzagFreedom(hunter, stageParameters, simulationParameters);
 }

return result;

}


 function hunterGroupPathFinder(hunter, stageParameters, simulationParameters){
  let preyArray = [];
  let path2prey = [];
  let finder = new PF.AStarFinder();
  let grid = new PF.Grid(gridConversion(stageParameters.matrix))
//1. Locate the preys
  stageParameters.dynamicElementsArray.forEach((item) => {
    
     if ((item.name) == "gross"){
      preyArray.push(item)
    }
  });
  

//2. Calculate the path to the preys

  if (preyArray.length > 0){
  path2prey = finder.findPath(hunter.x, hunter.y,preyArray[0].x, preyArray[0].y, grid);
  } else {
    path2prey[1] = zigzagFreedom(hunter, stageParameters, simulationParameters);
  }
 ;
 ;
  return path2prey[1];
}

function circularSelection(origin_x,origin_y,radious){ //Selecciona todas las coordenadas, entorno a un orgin dentro de un radio dado
  let array = [];
  let x,y,by;
  for(x=-radious;x<radious;x++){
    if (x>=0){
    y = Math.floor(radious*Math.sin(Math.acos((x+1)/radious)))
   
    } else{
    y = Math.floor(radious*Math.sin(Math.acos((x)/radious)))
    }
    for(by=-y;by<y;by++){
      if (((by + origin_y) >= 0) && ((by + origin_y) < (stageParameters.staticStage.length-1))){
           array.push([x + origin_x,by + origin_y])
           //
          }  
      }
  }
 
  return array;
}

function perception(stageParameters){
  stageParameters.dynamicElementsArray.forEach((item) => {
    if (item.constructor.name == "grossCell"){
     item.memorySense.memory = circularSelection(item.x,item.y,item.memorySense.senseRadious);
     
    }
  });
}

function perceptionv2(stageParameters){
  stageParameters.dynamicElementsArray.forEach((item) => {
    item.memorySense.memory.push(squareSelection(item));
    //Quitamos las coordenados repetidas
    deteleteRepeatedItem(item.memorySense.memory)
});
}

function squareSelection(item){ //Selecciona todas las coordenadas, entorno a un orgin dentro de un radio dado
let superiorEnd = (simulationParameters.wideDimension/simulationParameters.squareDimension)
let j;
let i;
let result = [];
  for(i = - item.memorySense.senseRadious; i<item.memorySense.senseRadious; i--){
    for(j = - item.memorySense.senseRadious; j<item.memorySense.senseRadious; j++){
      if (((i + item.x) >= 0) && ((i + item.x) < (superiorEnd)) && ((j + item.y) >= 0) && ((j + item.y) < (superiorEnd))){
           result.push([i + item.x,j + item.y])
           
          }  
      }
  }
  return result;
}

function squareSelection(item){ //Selecciona todas las coordenadas, entorno a un orgin dentro de un radio dado e identificamos el ser vivo
  let superiorEnd = (simulationParameters.wideDimension/simulationParameters.squareDimension)
  let j;
  let i;
  let result = [];
    for(i = - item.memorySense.senseRadious; i<item.memorySense.senseRadious; i--){
      for(j = - item.memorySense.senseRadious; j<item.memorySense.senseRadious; j++){
        if (((i + item.x) >= 0) && ((i + item.x) < (superiorEnd)) && ((j + item.y) >= 0) && ((j + item.y) < (superiorEnd))){
             result.push([i + item.x,j + item.y])
             
            }  
        }
    }
    return result;
  }

  function squareSelectionv2(item){ //Selecciona todas las coordenadas, entorno a un orgin dentro de un radio dado e identificamos el ser vivo
    let superiorEnd = (simulationParameters.wideDimension/simulationParameters.squareDimension)
    let j;
    let i;
    let result = [];
      for(i = - item.memorySense.senseRadious; i<item.memorySense.senseRadious; i--){
        for(j = - item.memorySense.senseRadious; j<item.memorySense.senseRadious; j++){
          if (((i + item.x) >= 0) && ((i + item.x) < (superiorEnd)) && ((j + item.y) >= 0) && ((j + item.y) < (superiorEnd))){
               result.push({ x: i + item.x, y: j + item.y})
               
              }  
          }
      }
      return result;
    }
    
    //Esta función está incompleta
    function unitFinder(x, y, stageParameters) {
      //This return the unit in the position x,y it can be a piece of terrain or a living being
      let result = [];
      let aux;
      stageParameters.dynamicElementsArray.forEach((item) => {
        if (item.x == x && item.y == y) {
          result.push(item.name);
        } else {
          aux = stageParameters.matrix[y][x];
          result.push(colorToUnit(aux));
        }
      });
      return result;
    }
    
  
    function colorToUnit(color, stageParameters){
      let result = "";
      //First, we check if it is a living being
      stageParameters.dynamicElementsArray.forEach((item) => {
        if (item.color == color){
          result = item.name;
        }
      });
      //Second, we check if it is a pice of terrain
      for (const key in stageParameters.legendTerrain){
        if (stageParameters.legendTerrain[key] == color){
          result = key;
        }
      }
     return result;
    }





export {
  totalFreedom,
  zigzagFreedom,
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
  hunterPathFinderv2,
  hunterGroupMovement,
  hunterPathFinder,
  circularSelection,
  perception 
}
