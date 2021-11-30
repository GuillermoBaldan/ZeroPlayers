import { stageParameters } from "./index.js";

function energy2Universe(energy, stageParamenters) {
  stageParamenters.universeEnergy = energy;
}

function energy2dynamicElements(energy, stageParamenters) {
  if (stageParameters.universeEnergy <= 0) {
    //End Simulation and show a message
    //TODO: End simulation sentence here
    console.log("The heat death of the universe was reached");
    return 0;
  } else {
    stageParameters.universeEnergy -= energy;
    return energy;
  }
}

export { energy2Universe, energy2dynamicElements };
