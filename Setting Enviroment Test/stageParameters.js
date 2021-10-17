function totalFreedom(dynamicItem_x,dynamicItem_y){
    console.log("Entramos en totalFreedom")
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

let legend = { 
    ground : "brown",
    water  :  "blue",
    grass  :  "green"

}

let universeRules = {
    movementType : "diagonal",
    frontier : "adjacent ends"  //There are two options: 'close' and 'adjacent ends'
}

let cell = {
    id     : "cell_1",
    color  : "yellow",
    x      : 0,
    y      : 0,
    walkmode : "autonomous",
    trajectory_x : [1,1,1,1,1,1,1],
    trajectory_y : [0,0,0,0,0,0,0],
    walk   : totalFreedom,
    behaviourRules : []
}

let stageParameters = {
    universeRules : universeRules,
    legend : legend,
    livingBeingsCollectionTypes : [cell],
    dynamicElementsArray : [cell],
    staticStage : []

}

module.exports = stageParameters