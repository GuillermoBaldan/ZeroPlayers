import {materialGeneration} from './ZeroPlayers_f_matrixGeneration.js';
import { setInsideStage} from './ZeroPlayers_f_checkValues.js';

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
    let origin = [19,19];
    let a;
    let b;
    let row = [];
    let staticStageAux = [];
    let counter = 0;
    let vuelta = 1;
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
   //2 Generamos el origen
    //Generamos la coordenada x 
    origin[0] = Math.floor(Math.random() * (simulationParameters.wideDimension / simulationParameters.squareSide));
    //Generamos la coordenada y
    origin[1] = Math.floor(Math.random() * (simulationParameters.heightDimension / simulationParameters.squareSide));
    //Asignamos el color
    staticStageAux[origin[1]][origin[0]] = "brown";
   do {
        //Cuadrante 1
        for(a=vuelta;a>0;a--){
          for(b=a;b>0;b--){
            if(setInsideStage(origin[0]+b-1,origin[1]-a+vuelta+1,stageParameters,simulationParameters)){
              if((staticStageAux[origin[1] - a + vuelta + 1][origin[0] +b -1  ] == "blue") && (staticStageAux[origin[1] - a + vuelta + 1][origin[0] +b -1  ] != undefined)){
              staticStageAux[origin[1] - a + vuelta + 1 ][origin[0] + b -1 ] = "brown";
              counter++;
        }
      }
          
      }
    }
      
        //Cuadrante 2
        for(a=0;a<vuelta+1;a++){
          for(b=a;b>0;b--){
            if (setInsideStage(origin[0] - b, origin[1] - a + vuelta, stageParameters, simulationParameters)){
              if((staticStageAux[origin[1] - a + vuelta ][origin[0] -b ] == "blue")  && (staticStageAux[origin[1] - a + vuelta ][origin[0] -b ] != undefined)){
                staticStageAux[origin[1] - a + vuelta ][origin[0] - b] = "brown";
                counter++;
              }
            }    
          }
        }
    
        //Cuadrante 3
        for(a=0;a<vuelta;a++){
          for(b=0;b<a+1;b++){
            if (setInsideStage(origin[0] - b, origin[1] +a -vuelta, stageParameters,simulationParameters)) {
            if (staticStageAux[origin[1] + a - vuelta ][origin[0]-b] == "blue"){
              staticStageAux[origin[1] + a - vuelta  ][origin[0]-b] = "brown";
              counter++;
        }
      }  
      }
    }    
      
        //Cuadrante 4
        for(a=vuelta;a>0;a--){
          for(b=0;b<a;b++){
          if (setInsideStage(origin[0] + b + 1, origin[1] +a -vuelta, stageParameters,simulationParameters)) {
            if((staticStageAux[origin[1] + a - vuelta ][origin[0]+b + 1] == "blue") && (staticStageAux[origin[1] + a - vuelta ][origin[0]+b + 1] != undefined)){
              staticStageAux[origin[1] + a - vuelta  ][origin[0]+b + 1] = "brown";
              counter++;
        }
      }
      }
    }
     
      safe++;
    } while(counter<numberUnits && safe<100);
    

    
    stageParameters.staticStage = staticStageAux;
    return stageParameters.staticStage;
  }
  
function staticStageGeneration(algorithm, stageParameters, simulationParameters){
    return algorithm(stageParameters, simulationParameters);
}

export {random, islandGeneration, staticStageGeneration};