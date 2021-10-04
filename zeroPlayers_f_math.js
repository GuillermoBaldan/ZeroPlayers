function multiple(wideDimension,squareSide){
    let flag = true //wideDimension es múltiplo de squareSide
    if (wideDimension % squareSide !== 0){
        console.log("Se mete en el if")
        flag = false;
        }
    return flag; 
}

export { multiple }