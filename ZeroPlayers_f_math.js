function multiple(simulationParameters){
    let flag = true //wideDimension es múltiplo de squareSide
    if (simulationParameters.wideDimension % simulationParameters.squareSide !== 0){
        console.log("Se mete en el if")
        flag = false;
        }
    return flag; 
}

export { multiple }