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
    let vuelta = 8;
    let subvuelta = vuelta -1;
    let numberUnits = 24;
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
   //2 Generamos el cuadrado central
    staticStageAux[origin[1]][origin[0]] = "red";
   do {
        //Cuadrante 1
        for(a=vuelta;a>0;a--){
          for(b=a;b>0;b--){
            console.log("se mete en el for b")
            if(staticStageAux[origin[1] - a + vuelta + 1][origin[0] +b -1  ] == "blue"){
              staticStageAux[origin[1] - a + vuelta + 1 ][origin[0] + b -1 ] = "brown";
              counter++;
        }
          
      }
    }
      
        //Cuadrante 2
        for(a=0;a<vuelta+1;a++){
          for(b=a;b>0;b--){
            console.log("se mete en el for b")
            if(staticStageAux[origin[1] - a + vuelta ][origin[0] -b ] == "blue"){
              staticStageAux[origin[1] - a + vuelta ][origin[0] - b] = "brown";
              counter++;
        }
      }
      }
    
        //Cuadrante 3
        for(a=0;a<vuelta;a++){
          for(b=0;b<a+1;b++){
            console.log("se mete en el for b")
            if(staticStageAux[origin[1] + a - vuelta ][origin[0]-b] == "blue"){
              staticStageAux[origin[1] + a - vuelta  ][origin[0]-b] = "brown";
              counter++;
        }
          
      }
    }    
      
        //Cuadrante 4
        for(a=vuelta;a>0;a--){
          for(b=0;b<a;b++){
            console.log("se mete en el for b")
            if(staticStageAux[origin[1] + a - vuelta ][origin[0]+b + 1] == "blue"){
              staticStageAux[origin[1] + a - vuelta  ][origin[0]+b + 1] = "brown";
              counter++;
        }
          
      }
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