function movement(dynamicItem_x, dynamicItem_y, f_movement, rulesObject){
    let coordinatesArray = [dynamicItem_x,dynamicItem_y]
    
    if (rulesObject.movementType == "zigzag"){
        let index = Math.round(Math.random()*1);
        let aux = f_movement();
        coordinatesArray[index] = coordinatesArray[index] + aux;
        console.log(`f_movement(): ${aux}`)
        console.log("zigzag")
    }else{
        dynamicItem_y = dynamicItem_y + f_movement();
        dynamicItem_x = dynamicItem_x + f_movement();
    }
   
    return [coordinatesArray[0],coordinatesArray[1]]
}

export {movement}