function movement(dynamicItem_x, dynamicItem_y, f_movement, stageParameters){
    let beforeAux = [dynamicItem_x,dynamicItem_y];
    let aux;
    let flag = false;
    if(stageParameters.universeRules.frontier == "close"){ //close borders case
      
            
            if (stageParameters.universeRules.movementType == "zigzag"){ //zigzag case
                aux = zigzag(dynamicItem_x,dynamicItem_y,f_movement)
            } else{ //diagonal case
                aux = diagonal(dynamicItem_x,dynamicItem_y,f_movement)
            }
            if (checkAdjacentEdges(aux)){ //Comprobamos si hay bordes
                aux = beforeAux;
            }

    }else{//Caso de extremos adyacentes 'adjacent ends'
            if (stageParameters.universeRules.movementType == "zigzag"){ //zigzag case
                aux = zigzag(dynamicItem_x,dynamicItem_y,f_movement)
            } else{ //diagonal case
                console.log("hacemos el diagonal case")
                console.log(`dynamicItem_x: ${dynamicItem_x}`)
                aux = diagonal(dynamicItem_x,dynamicItem_y,f_movement)
                console.log("aux:");
                console.log(aux);
            }
            console.log("aux: "+aux)
            aux =changeAdjacentEdges(aux) //Comprobamos si hay bordes       
    }
    return aux;
}
  

function zigzag(dynamicItem_x,dynamicItem_y,f_movement){
    return f_movement(dynamicItem_x,dynamicItem_y)
}

function diagonal(dynamicItem_x,dynamicItem_y,f_movement){
    let aux1;
    let aux2;
    //console.log(`f: diagonal: ${dynamicItem_x},${dynamicItem_y}`)
    aux1 = f_movement(dynamicItem_x,dynamicItem_y);
    aux2 = f_movement(dynamicItem_x,dynamicItem_y);
    return [aux1[0] - aux2[0],aux1[1] - aux2[1]] //Esto produce el movimiento exponencial
}

function checkAdjacentEdges(aux){
    //Comprobamos extremo derecho
    if (aux[0] + 1 > 40){
        return true;
    }
    //Comprobamos extremo izquierdo
    if (aux[0] - 1 < -1){
        return true;
    }
    //comprobamos extremo superior
    if (aux[1] + 1 > 40){
        return true;
    }
    //comprobamos extremo inferior
    if (aux[1] - 1 < -1){
        console.log("aux: "+aux)
        return true;
    }

}

function changeAdjacentEdges(aux){
    //Cambiamos extremo derecho por extremo izquierdo
    if (aux[0] + 1 > 40){
        aux[0] = 0;
    }
    //Cambiamos extremo izquierdo por extremo derecho
    if (aux[0] - 1 < -1){
        aux[0] = 39;
    }
    //comprobamos extremo superior
    if (aux[1] + 1 > 40){
        aux[1] = 0;
    }
    //comprobamos extremo inferior
    if (aux[1] - 1 < -1){
        aux[1] = 39;
    }
    return aux;
}


export {movement}