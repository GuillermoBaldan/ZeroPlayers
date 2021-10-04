
let simulationSteps = 100;

let legend = { 
    ground : "brown",
    water  :  "blue",
    grass  :  "green"

}

let wideDimiension = 10;
let hightDimension = 10;
let stage = [];


function materialGeneration(legend){
    let materialArray = [];
    for (const prop in legend){
        materialArray.push(legend[prop]);
    }
    return materialArray;
}

function  generateStage(stage,legend,wideDimiension,hightDimension){
    let a;
    let b;
    let row = [];
    let numberMaterials = materialGeneration(legend).length;
    console.log(numberMaterials);
    for(b=0;b<hightDimension;b++){
        row = [];
        for(a = 0;a<wideDimiension;a++){
            row.push(materialGeneration(legend)[Math.floor(Math.random()*numberMaterials)]);
            }
            stage.push(row)
    }

    return stage;
}

console.log("Conexión done");
console.log(generateStage(stage,legend,wideDimiension,hightDimension))

//1. Inicialization - load stage
    //1.1 Matrix Generation
    //1.2 Drawing Stage Matrix into html file
//2. Run simulation

