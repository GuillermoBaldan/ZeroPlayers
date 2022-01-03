import {materialGeneration} from './ZeroPlayers_f_matrixGeneration.js';

function random(stageParameters, simulationParameters){
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

  function islandGeneration(stageParameters,simulationParameters){
    let origin = [9,10];
    let a;
    let b;
    let row = [];
    let staticStageAux = [];
    let counter = 0;
    let vuelta = 1;
    let numberUnits = 4;
    let safe = 0;
    //Primero pintamos todo de azul
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
        "blue"
        );
      }
      staticStageAux.push(row);
      
    }
   //2 Generamos la isla
    staticStageAux[origin[1]][origin[0]] = "red";
   do {
           if(staticStageAux[origin[1] + vuelta][origin[0]] == "blue"){
        staticStageAux[origin[1] + vuelta][origin[0]] = "brown";
        counter++;
        console.log("Se mete en el primer if")
      } else if (staticStageAux[origin[1]][origin[0] - vuelta] == "blue"){
        staticStageAux[origin[1]][origin[0] - vuelta] = "brown";
        counter++;
        console.log("Se mete en el segundo if")
        console.log(staticStageAux[origin[1] - vuelta][origin[0]])
      } else if (staticStageAux[origin[1] - vuelta][origin[0]] == "blue"){
        staticStageAux[origin[1] - vuelta][origin[0]] = "brown";
        counter++;
        console.log("Se mete en el tercer if")

      } else if(staticStageAux[origin[1]][origin[0] + vuelta] == "blue"){
        staticStageAux[origin[1]][origin[0] + vuelta] = "brown";
        counter++;
        console.log("Se mete en el cuarto if")
      } 
      safe++;
    } while(counter<numberUnits && safe<100)
    

    
    stageParameters.staticStage = staticStageAux;
    return stageParameters.staticStage;
  }
  
function staticStageGeneration(algorithm, stageParameters, simulationParameters){
    return algorithm(stageParameters, simulationParameters);
}

export {random, islandGeneration, staticStageGeneration};