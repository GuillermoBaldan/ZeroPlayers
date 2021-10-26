function energy2Universe(energy,stageParamenters){
    stageParamenters.universeEnergy = energy;
}

function energy2dynamicElements(energy, stageParamenters){
    stageParamenters.universeEnergy -= energy;
}


export {energy2Universe, energy2dynamicElements}