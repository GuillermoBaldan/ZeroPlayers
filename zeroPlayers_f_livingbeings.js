function randomWalk(){

}

function totalFreedom(){
    let aux = (Math.round(Math.random() * (1 + 1)) -1)
    console.log("aux: "+aux)
    return aux;
}



export {randomWalk, totalFreedom}