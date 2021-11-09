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

function lastElement(array){
    return array[array.length - 1];
}

/*     function includesAnyOf(container,reference){ //Container is a 2D array; reference is a 1D array
        let a;
        let b;
        for(a=0;a<;a++){
            for(b=0;b<;b++){
                if (reference.includes(container[]))
            }
        }
    }
 */

    //HOLA!!
export {cloneArray2D,cloneArray,lastElement}