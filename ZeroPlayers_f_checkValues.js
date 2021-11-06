function checkSimpleCellsExistence(cadena,stageParameters){
    let a;
    let b = 0;
    for(a=0;a<stageParameters.dynamicElementsArray.length;a++){
        if (stageParameters.dynamicElementsArray[a].constructor.name == "simpleCell"){
            b++
        }
    }
}

function checkNumbersTypeCell(className, stageParameters){
    let a;
    let counter = 0;
    for(a=0;a<stageParameters.dynamicElementsArray.length;a++){
        if(stageParameters.dynamicElementsArray[a].constructor == className){
            counter += 1
        }
    }
    return counter;
}

export {checkSimpleCellsExistence, checkNumbersTypeCell}