import {
  generateStaticStage,
  matrixGenerator,
  matrixGeneratorv2,
  matrixGeneratorInit,
} from "./ZeroPlayers_f_matrixGeneration.js";
import { initCanvas, drawingMatrix } from "./ZeroPlayers_f_canvas.js";
import {
  checkDataCoherence,
  coordinatesAssigment,
} from "./ZeroPlayers_f_dataCoherence.js";
import { oneSimulationStep } from "./ZeroPlayers_f_simulation.js";
import { stopFlag } from "./index.js";
import { grossCell, simpleCell } from "./ZeroPlayers_classes_livingBeings.js";
import { energy2dynamicElements } from "./ZeroPlayers_f_universe.js";
import {
  cloneArray2D,
  lastElement,
} from "./ZeroPlayers_f_arraysManipulation.js";

function init(stageParameters, simulationParameters) {
  let staticStageAux = [];
  let matrixAux = [];
  let canvas;
  let flag = false;
  let a;
  let freeCoordinate;
  //0. Check Data Coherence
  flag = checkDataCoherence(stageParameters, simulationParameters);
  if (flag) {
    //1.Initialize Canvas
    canvas = initCanvas(simulationParameters);
    //2.staticStage
    stageParameters.staticStage = generateStaticStage(
      stageParameters,
      simulationParameters
    );
    //stageParameters.matrix = cloneArray2D(stageParameters.staticStage);
    //3.Add dynamic Elements
    stageParameters.livingBeingsCollection.forEach((item) => {
      for (a = 0; a < item.number; a++) {
        console.log(`a: ${a}`);
        console.log(`item.type.name: ${item.type.name}`);
        console.log(`item.number: ${item.number}`);
        //Se busca una posición libre en la matriz
        console.log(
          "stageParameters.matrix - Before reach coordinatesAssigment function"
        );
        console.log(stageParameters.matrix);
        freeCoordinate = coordinatesAssigment(
          simulationParameters,
          stageParameters
        );
        console.log(
          "stageParameters.matrix - After coordiantesAssigment function - ZeroPlayers_f_level1.js"
        );
        console.log(stageParameters.matrix);
        //Si existe una posición libre se crea un elemento dinámico
        if (freeCoordinate != undefined) {
          stageParameters.dynamicElementsArray.push(new item.type());
          lastElement(stageParameters.dynamicElementsArray).x =
            freeCoordinate[0];
          lastElement(stageParameters.dynamicElementsArray).y =
            freeCoordinate[1];
          console.log(`stageParameters.matrix Before matrixGeneratorInit`);
          console.log(stageParameters.matrix);
          stageParameters.matrix = matrixGeneratorInit(
            stageParameters,
            simulationParameters
          );
          console.log(`stageParameters.matrix After matrixGeneratorInit`);
          console.log(stageParameters.matrix);
        }

        /*  //Generamos el elemento dinámico
        stageParameters.dynamicElementsArray.push(new item.type());
        //Asignamos coordenadas, si no hay coordenadas libres, se borra el último elemento dinámico generado
        coordinatesAssigment(
          simulationParameters,
          stageParameters,
          lastElement(stageParameters.dynamicElementsArray) */

        //Hay que generar la matrix aqui

        /*   stageParameters.matrix = cloneArray2D(
          matrixGenerator(stageParameters, simulationParameters)
        ); */

        //Le trasnferimos energía al elemento generado
        energy2dynamicElements(
          stageParameters.dynamicElementsArray[
            stageParameters.dynamicElementsArray.length - 1
          ],
          stageParameters
        );
      }
    });
    matrixGeneratorInit(stageParameters, simulationParameters);
    ///stageParameters.matrix = cloneArray2D(matrixAux);
    //console.log(stageParameters.matrix);
    //console.log(matrixAux) - No aparece nada en matrixAux, no se están añadiendo los elementos dinámicos
    //4. Draw canvas
    drawingMatrix(stageParameters, simulationParameters);
    return [staticStageAux, matrixAux, canvas[0], canvas[1]]; //lienzo = canvas[0];ctx = canvas[1]
  } else {
    console.log("The data is not consistent");
  }
}

//simulation(init_output[0],dynamicElementsArray,simulationSteps,timePerStep, wideDimension, squareSide,init_output[3])
function simulation(stageParameters, simulationParameters) {
  //1. Hacemos la simulación paso a paso.
  //simulationParameters.globalSimulationIndex =  oneSimulationStep(stageParameters,simulationParameters)
  oneSimulationStep(stageParameters, simulationParameters);
}

export { init, simulation };
