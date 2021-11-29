function energy2Universe(energy, stageParamenters) {
  stageParamenters.universeEnergy = energy;
}

function energy2dynamicElements(energy, stageParamenters) {
  if (stageParamenters.universeEnergy <= 0) {
    //End Simulation and show a message
    //TODO: End simulation sentence here
    console.log("The heat death of the universe was reached");
  } else {
    stageParamenters.universeEnergy -= energy;
    return energy;
  }
}

export { energy2Universe, energy2dynamicElements };
