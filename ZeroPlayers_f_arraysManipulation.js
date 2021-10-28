function cloneArray2D(original){
    let clone = [];
    let row = [];
    original.forEach(item =>{
        item.forEach(subitem => {
            row.push(subitem);
        })
        clone.push(row)
        row = [];
    })
    return clone;
}   

function cloneArray(original){
    let clone = [];
    original.forEach(item => {
        clone.push(item)
    })
    return clone;
}

export {cloneArray2D,cloneArray}