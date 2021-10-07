function movement(dynamicItem_x, dynamicItem_y, f_movement, rulesObject){
    if (rulesObject.movementType == "zigzag"){ //zigzag case
        return zigzag(dynamicItem_x,dynamicItem_y,f_movement)
    }else{ //diagonal case
        return diagonal(dynamicItem_x,dynamicItem_y,f_movement)
    }
}

function zigzag(dynamicItem_x,dynamicItem_y,f_movement){
    return f_movement(dynamicItem_x,dynamicItem_y)
}

function diagonal(dynamicItem_x,dynamicItem_y,f_movement){
    dynamicItem_x += f_movement();
    dynamicItem_y += f_movement();
    return [dynamicItem_x,dynamicItem_y]
}
    


export {movement}