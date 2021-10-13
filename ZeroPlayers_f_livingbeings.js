function totalFreedom(dynamicItem_x,dynamicItem_y){
    let buffer = randomSteps();
    dynamicItem_x = dynamicItem_x + buffer
    if (buffer != 0){
        return [dynamicItem_x,dynamicItem_y]
    } else{
        buffer = randomSteps()
        dynamicItem_y = dynamicItem_y + buffer
        return [dynamicItem_x,dynamicItem_y]
    }
}

function left(dynamicItem_x,dynamicItem_y){
    let aux = -1;
    dynamicItem_x += aux;
 return  [dynamicItem_x, dynamicItem_y]
}

function right(dynamicItem_x,dynamicItem_y){
    let aux = 1;
    dynamicItem_x += aux;
 return  [dynamicItem_x, dynamicItem_y]
}

function up(dynamicItem_x,dynamicItem_y){
    let aux = 1;
    dynamicItem_y += aux;
 return  [dynamicItem_x, dynamicItem_y]
}

function down(dynamicItem_x,dynamicItem_y){
    let aux = -1;
    dynamicItem_y += aux;
 return  [dynamicItem_x, dynamicItem_y]
}

function randomSteps(){
    let aux = (Math.round(Math.random() * (1 + 1)) -1)
    return aux;
}



export {totalFreedom, left, right, up, down}