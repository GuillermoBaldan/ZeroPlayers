import { stageParameters, simulationParameters } from "./index.js";
import { sum } from "./ZeroPlayers_f_arraysManipulation.js";
import { simulation } from "./ZeroPlayers_f_level1.js";
import { drawSquare } from "./ZeroPlayers_f_canvas.js";

function debug(string) {
  console.log(string);
}

function debug_PrintDynamicsElementsCoordinates(Array) {
  Array.forEach((element) => {
    console.log(`(${element.x},${element.y})`);
  });
}

function debug_energyOfCells() {
  stageParameters.dynamicElementsArray.forEach((item) => {
    console.log(`${item.color} tiene ${item.energy} de energia`);
  });
}

function debug_numberOfCells() {
  console.log(
    `Number of cells: ${stageParameters.dynamicElementsArray.length}`
  );
}

function debug_typesOfSpecies() {
  let typesOfSpecies = [];
  let i;
  let flag = false;
  stageParameters.dynamicElementsArray.forEach((item) => {
    for (i = 0; i < typesOfSpecies.length; i++) {
      if (typesOfSpecies[i].name == item.name) {
        typesOfSpecies[i].number++;
        flag = true;
      }
    }
    if (flag == false) {
      typesOfSpecies.push({ name: item.name, number: 1, color: item.color });
    }
  });
  typesOfSpecies.forEach((item) => {
    console.log(`${item.name} has ${item.number} units`);
  });
}

function debug_ageOfcell() {
  stageParameters.dynamicElementsArray.forEach((item) => {
    console.log(`${item.name} named ${item.id} has ${item.age} cycles`);
  });
}

function debug_classesOfCells() {
  stageParameters.dynamicElementsArray.forEach((item) => {
    console.log(`${item.color} es ${item.name}`);
  });
}

function debug_(ObjectArray) {
  ObjectArray.forEach((element) => {
    console.log(`${element.string}: ${element.variable}`);
  });
}

function debug_energyOfUniverse() {
  console.log(`Energy of the universe: ${stageParameters.universeEnergy}`);
}

function debug_EnergyBalance() {
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
  if (totalEnergy == stageEnergy + cellsEnergy) {
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

function debug_numberOfUnitsWithColor(color) {
  let counter = 0;
  for (
    let i = 0;
    i < simulationParameters.wideDimension / simulationParameters.squareSide;
    i++
  ) {
    for (
      let j = 0;
      j <
      simulationParameters.heightDimension / simulationParameters.squareSide;
      j++
    ) {
      if (stageParameters.matrix[i][j] == color) {
        counter++;
      }
    }
  }
  return counter;
}

function debug_circle() {
  //draw a circle using canvas tag
  /*  let canvas = document.getElementById("lienzo");
  let ctx = canvas.getContext("2d"); */
  let centerX = 9 * simulationParameters.squareSide;
  let centerY = 9 * simulationParameters.squareSide;
  let radius = 8 * simulationParameters.squareSide;
  let ctx = simulationParameters.ctx;

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  ctx.lineWidth = 1;
  ctx.strokeStyle = "lightgreen";
  ctx.stroke();
}

function debug_grid() {
  let ctx = simulationParameters.ctx;
  let x = 0;
  let y;
  //1º let´s do the horizontal lines

  for (
    y = 0;
    y < simulationParameters.heightDimension;
    y += simulationParameters.squareSide
  ) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + simulationParameters.heightDimension, y);
    ctx.stroke();
  }

  //2º let´s do the vertical lines
  for (
    x = 0;
    x < simulationParameters.wideDimension;
    x += simulationParameters.squareSide
  ) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, simulationParameters.heightDimension);
    ctx.stroke();
  }
}

function debug_drawCoordinates(array, color) {
  for (let i = 0; i < array.length; i++) {
    simulationParameters.ctx.beginPath();
    simulationParameters.ctx.rect(
      array[i][0] * 20,
      array[i][1] * 20,
      simulationParameters.squareSide,
      simulationParameters.squareSide
    );
    simulationParameters.ctx.fillStyle = "pink";
    simulationParameters.ctx.fill();
  }
}

export {
  debug,
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
  debug_circle,
  debug_grid,
  debug_classesOfCells,
  debug_typesOfSpecies,
  debug_numberOfUnitsWithColor,
  debug_ageOfcell,
  debug_drawCoordinates,
};
