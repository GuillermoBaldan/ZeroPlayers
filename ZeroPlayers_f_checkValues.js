function checkSimpleCellsExistence(cadena,stageParameters){
    let a;
    let b = 0;
    for(a=0;a<stageParameters.dynamicElementsArray.length;a++){
        if (stageParameters.dynamicElementsArray[a].constructor.name == "simpleCell"){
            b++
        }
    }
}

export {checkSimpleCellsExistence}