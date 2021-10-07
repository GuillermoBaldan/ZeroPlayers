function movement(dynamicItem_x, dynamicItem_y, f_movement, rulesObject){
    if (rulesObject.movementType == "zigzag"){ //zigzag case
        let buffer;
        buffer = f_movement()
        console.log(`(${dynamicItem_x},${dynamicItem_y})`)
        dynamicItem_x = dynamicItem_x + buffer
        console.log("buffer: "+buffer)
        if (buffer != 0){
            let n = 0;
            console.log("n: "+n);
            console.log(`(${dynamicItem_x},${dynamicItem_y})`)
            n+=1;
            return [dynamicItem_x,dynamicItem_y]
        } else{
            buffer = f_movement();
            dynamicItem_y = dynamicItem_y + buffer
            console.log("se hace el else ")
            console.log("buffer: "+buffer)
            console.log(`(${dynamicItem_x},${dynamicItem_y})`)
            return [dynamicItem_x,dynamicItem_y]
        }

    }else{ //diagonal case
        dynamicItem_x += f_movement();
        dynamicItem_y += f_movement();
        return [dynamicItem_x,dynamicItem_y]
    }

    
}

export {movement}