function movement(dynamicItem_x, dynamicItem_y, f_movement, rulesObject){
    dynamicItem_y = dynamicItem_y + f_movement();
    dynamicItem_x = dynamicItem_x + f_movement();
    return [dynamicItem_x,dynamicItem_y]
}

export {movement}