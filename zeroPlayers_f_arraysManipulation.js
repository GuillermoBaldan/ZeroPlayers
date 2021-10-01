function cloneArray2D(original){
    let clone = [];
    let row = [];
    console.log("original:");
    console.log(original)
    original.forEach(item =>{
        item.forEach(subitem => {
            row.push(subitem);
        })
        clone.push(row)
        row = [];
    })
    return clone;
}

export {cloneArray2D}