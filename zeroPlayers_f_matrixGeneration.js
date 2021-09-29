function  generateStaticStage(legend,wideDimension){
    let a;
    let b;
    let row = [];
    let numberMaterials = materialGeneration(legend).length;
    let staticStageAux =[];
    let heightDimension = wideDimension;
    for(b=0;b<heightDimension;b++){
        row = [];
        for(a = 0;a<wideDimension;a++){
            row.push(materialGeneration(legend)[Math.floor(Math.random()*numberMaterials)]);
            }
            staticStageAux.push(row)
    }

    return staticStageAux;
}

function materialGeneration(legend){
    let materialArray = [];
    for (const prop in legend){
        materialArray.push(legend[prop]);
    }
    return materialArray;
}


export {generateStaticStage}