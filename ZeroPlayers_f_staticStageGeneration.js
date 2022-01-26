import {materialGeneration} from './ZeroPlayers_f_matrixGeneration.js';
import { setInsideStage} from './ZeroPlayers_f_checkValues.js';
import {circularSelection} from './ZeroPlayers_f_livingbeings.js';

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

function continent(stageParameters, simulationParameters){
  let staticStageAux = [];
  let row =[];
  let center_x = Math.floor(
    (simulationParameters.wideDimension / simulationParameters.squareSide ) / 2
  );
  let center_y = Math.floor(
    (simulationParameters.heightDimension / simulationParameters.squareSide  ) / 2
  );
  let origin = [center_x,center_y]
  let radious = 9;
  let radio = radious + 1;
  let a;
  let b;
  let x;
  let y;
  let by;
  let array = [];
  console.log(`origin: ${origin}`);
  //Primero pintamos todo de azul
 stageParameters.staticStage = blueStage(simulationParameters);

return stageParameters.staticStage;
}

  function circularIsland(stageParameters, simulationParameters){
  let staticStageAux = [];
  let row =[];
  let center_x = Math.floor(
    (simulationParameters.wideDimension / simulationParameters.squareSide ) / 2
  );
  let center_y = Math.floor(
    (simulationParameters.heightDimension / simulationParameters.squareSide  ) / 2
  );
  let origin = [center_x,center_y]
  let radious = 18;
  let radio = radious + 1;
  let a;
  let b;
  let x;
  let y;
  let by;
  let array = [];
   //Primero pintamos todo de azul
  stageParameters.staticStage = blueStage(simulationParameters);
//Generamos el círculo
array = circularSelection(origin[0],origin[1],radious)

//Cambiamos el color de las celdas seleccionadas, las que están dentro del círculo
array.forEach(item =>{
    stageParameters.staticStage[item[1]][item[0]] = "brown"
  })

 
 return stageParameters.staticStage;

  }

  function islandGeneration(stageParameters,simulationParameters){
    let origin = [19,19];
    let a;
    let b;
    let row = [];
    let staticStageAux = [];
    let counter = 0;
    let vuelta = 8;
    let radious = vuelta
    let numberUnits = Math.floor(((vuelta*2+1)**2)/2)+1
    //let safe = 0;
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
    origin[0] = radious + 1 + Math.floor(Math.random() * (simulationParameters.wideDimension / simulationParameters.squareSide - 2*radious - 2));
    //Generamos la coordenada y
    origin[1] = radious + 1 + Math.floor(Math.random() * (simulationParameters.heightDimension / simulationParameters.squareSide - 2*radious - 2));
    //Asignamos el color
    staticStageAux[origin[1]][origin[0]] = "brown";
    counter++;
    do {
        //Cuadrante 1
        for(a=vuelta;a>0;a--){
          for(b=a;b>0;b--){
            if(setInsideStage(origin[0]+b-1,origin[1]-a+vuelta+1,stageParameters,simulationParameters)){
              if((staticStageAux[origin[1] - a + vuelta + 1][origin[0] +b -1  ] == "blue") && (counter<numberUnits)){
              staticStageAux[origin[1] - a + vuelta + 1 ][origin[0] + b -1 ] = "brown";
              
        }
        counter++;
      }
          
      }
    }
      
        //Cuadrante 2
        for(a=0;a<vuelta+1;a++){
          for(b=a;b>0;b--){
            if (setInsideStage(origin[0] - b, origin[1] - a + vuelta, stageParameters, simulationParameters)){
              if((staticStageAux[origin[1] - a + vuelta ][origin[0] -b ] == "blue")  && (counter<numberUnits)){
                staticStageAux[origin[1] - a + vuelta ][origin[0] - b] = "brown";
                
              }
              counter++;
            }    
          }
        }
    
        //Cuadrante 3
        for(a=0;a<vuelta;a++){
          for(b=0;b<a+1;b++){
            if (setInsideStage(origin[0] - b, origin[1] +a -vuelta, stageParameters,simulationParameters)) {
            if ((staticStageAux[origin[1] + a - vuelta ][origin[0]-b] == "blue") && (counter<numberUnits)){
              staticStageAux[origin[1] + a - vuelta  ][origin[0]-b] = "brown";
              
        }
        counter++;
      }  
      }
    }    
      
        //Cuadrante 4
        for(a=vuelta;a>0;a--){
          for(b=0;b<a;b++){
          if (setInsideStage(origin[0] + b + 1, origin[1] +a -vuelta, stageParameters,simulationParameters)) {
            if((staticStageAux[origin[1] + a - vuelta ][origin[0]+b + 1] == "blue") && (counter<numberUnits)){
              staticStageAux[origin[1] + a - vuelta  ][origin[0]+b + 1] = "brown";
              
        }
        counter++;
      }
      }
    }
     //safe++
    } while(counter<numberUnits);
    

    
    stageParameters.staticStage = staticStageAux;
    return stageParameters.staticStage;
  }

function blueStage(simulationParameters){
  let b;
  let a;
  let staticStageAux = [];
  let row = [];
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
  return staticStageAux;
}
  
function staticStageGeneration(algorithm, stageParameters, simulationParameters){
    return algorithm(stageParameters, simulationParameters);
}

export {random, islandGeneration, circularIsland, staticStageGeneration};