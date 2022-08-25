function gridConversion(matrix){
    let walkableGrid = [];
    let row = [];
    for(let i = 0; i < matrix.length; i++){
        for(let j = 0; j < matrix[i].length; j++){
            if(matrix[i][j] === "blue"){
                row.push(1);
            }else{
                row.push(0)
            }
            
        }
        walkableGrid.push(row);
        row = [];
}
return walkableGrid;
}

export {gridConversion};