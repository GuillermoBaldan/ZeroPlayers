let lienzo;
let ctx;
let init_output;

let simulationParameters = {
    simulationSteps : 25,
    timePerStep : 100,
    wideDimension : 600,
    heightDimension : 600,
    squareSide : 15,
    lienzo : lienzo,
    ctx : ctx,
    init_output : init_output,
    stopFlag : false,
    globalSimulationIndex : 0
}

module.exports = simulationParameters;