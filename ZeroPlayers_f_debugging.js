import { stageParameters, simulationParameters } from "./index.js";
import { sum } from "./ZeroPlayers_f_arraysManipulation.js";

function debug_PrintDynamicsElementsCoordinates(Array) {
  Array.forEach((element) => {
    console.log(`(${element.x},${element.y})`);
  });
}

function debug_energyOfCells(){
  stageParameters.dynamicElementsArray.forEach(item => {
    console.log(`${item.color} tiene ${item.energy} de energia`);
  })
}

function debug_numberOfCells() {
  console.log(
    `Number of cells: ${stageParameters.dynamicElementsArray.length}`
  );
}

function debug_(ObjectArray) {
  ObjectArray.forEach((element) => {
    console.log(`${element.string}: ${element.variable}`);
  });
}

function debug_energyOfUniverse() {
  console.log(`Energy of the universe: ${stageParameters.universeEnergy}`);
}

function debug_EnergyBalance(){
  debug_numberOfCells();
  debug_totalEnergy();
  debug_energyOfUniverse();
}

function debug_totalEnergy() {
  let totalEnergy =
    stageParameters.universeEnergy + sum(stageParameters.dynamicElementsArray);
  let stageEnergy = stageParameters.universeEnergy;
  let cellsEnergy = sum(stageParameters.dynamicElementsArray);
  console.log(
    `Universe Energy: ${totalEnergy} = Energy of Stage:${stageEnergy} + Energy of Cells: ${cellsEnergy}`
  );
  if (totalEnergy == stageEnergy + cellsEnergy){
    console.log("There is an energy balance");
  }
}

function debug_DetectCoordinatesRepeated(Array) {
  let repeatedElements = [];
  let a;
  let b;
  for (a = 0; a < Array.length; a++) {
    for (b = 0; b < Array.length; b++) {
      if (Array[a].x === Array[b].x && Array[a].y === Array[b].y && a !== b) {
        //show repeated elements using console.log and put the representation in red color
        console.log(
          `%c (${Array[a].x},${Array[a].y})`,
          "background: #FFFF00; color: #ff0000"
        );

        repeatedElements.push(Array[a]);
      }
    }
  }
}

function debug_simulationCicle() {
  console.log("----------------------------------");
  console.log(
    "simulation cicle: " + (simulationParameters.singularSimulationStep + 1)
  );
}

function debug_matrix() {
  let cadena;
  stageParameters.matrix.forEach((row) => {
    cadena = row.toString();
    console.log(cadena);
  });
}

function debug_circle() {
 //draw a circle using canvas tag
 /*  let canvas = document.getElementById("lienzo");
  let ctx = canvas.getContext("2d"); */
  let centerX = 9*simulationParameters.squareSide;
  let centerY = 9*simulationParameters.squareSide;
  let radius = 8*simulationParameters.squareSide;
  let ctx = simulationParameters.ctx;;

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'lightgreen';
  ctx.stroke();
  
}

  export {
  debug_PrintDynamicsElementsCoordinates,
  debug_DetectCoordinatesRepeated,
  debug_,
  debug_energyOfUniverse,
  debug_totalEnergy,
  debug_numberOfCells,
  debug_simulationCicle,
  debug_matrix,
  debug_energyOfCells,
  debug_EnergyBalance,
  debug_circle
};
