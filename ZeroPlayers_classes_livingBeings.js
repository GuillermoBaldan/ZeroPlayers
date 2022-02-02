import { simulationParameters } from "./index.js";
import { hunterGroupMovement, totalFreedom } from "./ZeroPlayers_f_livingbeings.js";

class grossPredator {
  constructor() {
    this.type = "predator",
    this.color = "yellow";
    this.x = Math.floor(
      Math.random() *
        (simulationParameters.wideDimension / simulationParameters.squareSide)
    ); //Math.random() * (max - min) + min;
    this.y = Math.floor(
      Math.random() *
        (simulationParameters.heightDimension / simulationParameters.squareSide)
    );
    this.life = 100;
    this.walkmode = "autonomous";
    this.trajectory_x = [1, 1, 1, 1, 1, 1, 1];
    this.trajectory_y = [0, 0, 0, 0, 0, 0, 0];
    this.walk = hunterGroupMovement;
    this.life = 500;
    this.maxEnergy = 250;
    this.energyBorn = this.maxEnergy / 2;
    this.energy = this.energyBorn;
    this.lifeConsumption = 1;
    this.energyConsumption = 5;
    this.behaviourRules = {
      forbiddenPositions: ["water", "simpleCell"],
      forbiddenColors: ["blue", "yellow"],
    };
    this.preyClasses = [grossCell];
    this.reproductionRadio = 1;
    this.reproductionPeriod = 14;
    this.cyclesToReproduction = Math.round(Math.random()*this.reproductionPeriod)
    this.vitalFunctions = {
      death: true,
      reproduction: true,
      prey: true,
  }
  this.cognitiveFunctions = {
    see: true,
    pathfinder: true,
  }
    
  }
}

class yellowPredator {
  constructor() {
    this.type = "predator"
    this.color = "purple";
    this.x = Math.floor(
      Math.random() *
        (simulationParameters.wideDimension / simulationParameters.squareSide)
    ); //Math.random() * (max - min) + min;
    this.y = Math.floor(
      Math.random() *
        (simulationParameters.heightDimension / simulationParameters.squareSide)
    );
    this.life = 100;
    this.walkmode = "autonomous";
    this.trajectory_x = [1, 1, 1, 1, 1, 1, 1];
    this.trajectory_y = [0, 0, 0, 0, 0, 0, 0];
    this.walk = totalFreedom;
    this.life = 300;
    this.maxEnergy = 250;
    this.energyBorn = this.maxEnergy / 2;
    this.energy = this.energyBorn;
    this.lifeConsumption = 1;
    this.energyConsumption = 1;
    this.behaviourRules = {
      forbiddenPositions: ["water", "simpleCell"],
      forbiddenColors: ["blue", "yellow", "purple"],
    };
    this.preyClasses = [grossPredator];
    this.reproductionRadio = 1;
    this.reproductionPeriod = 4;
    this.cyclesToReproduction = Math.round(Math.random()*this.reproductionPeriod)
    this.vitalFunctions = {
      death: true,
      reproduction: true,
      prey: true,
      }
    this.cognitiveFunctions = {
      see: true,
      pathfinder: true,
    }
    
  }
}

class grossCell {
  constructor() {
    this.type = "vegetable"
    this.color = "green";
    this.walkmode = "static";
    this.x = Math.floor(
      Math.random() *
        (simulationParameters.wideDimension / simulationParameters.squareSide)
    ); //Math.random() * (max - min) + min;
    this.y = Math.floor(
      Math.random() *
        (simulationParameters.heightDimension / simulationParameters.squareSide)
    );
    this.life =  400;
    this.maxEnergy = 300;
    this.energyBorn = this.maxEnergy / 2;
    this.energy = this.energyBorn;
    this.lifeConsumption = 1;
    this.energyConsumption = 1;
    this.behaviourRules = { forbiddenPositions: ["water","gross","yellow"] };
    this.preyClasses = [];
    this.reproductionRadio = 1;
    this.reproductionPeriod = 1;
    this.reproductionRules = {
      blocks: 
        [
          {
            type: "water",
            color: "blue",
            number: 1,
          }
        ]     
    }
    this.cyclesToReproduction = Math.round(Math.random()*this.reproductionPeriod)
    this.vitalFunctions = {
      death: true,
      reproduction: true,
      prey: false,
      sense: true,
  };
  this.memorySense = {
    memory: [],
    senseRadious: 4,
  }
}
}

class vegetable {
  constructor() {
    this.type = "vegetable"
    this.color = "green";
    this.walkmode = "static";
    this.x = Math.floor(
      Math.random() *
        (simulationParameters.wideDimension / simulationParameters.squareSide)
    ); //Math.random() * (max - min) + min;
    this.y = Math.floor(
      Math.random() *
        (simulationParameters.heightDimension / simulationParameters.squareSide)
    );
    this.life =  400;
    this.maxEnergy = 300;
    this.energyBorn = this.maxEnergy / 2;
    this.energy = this.energyBorn;
    this.lifeConsumption = 1;
    this.energyConsumption = 1;
    this.behaviourRules = { forbiddenPositions: ["water","gross","yellow"] };
    this.preyClasses = [];
    this.reproductionRadio = 1;
    this.reproductionPeriod = 1;
    this.reproductionRules = {
      blocks: 
        [
          {
            type: "water",
            color: "blue",
            number: 1,
          }
        ]     
    }
    this.cyclesToReproduction = Math.round(Math.random()*this.reproductionPeriod)
    this.vitalFunctions = {
      death: true,
      reproduction: true,
      prey: false,
      sense: true,
  };
  this.memorySense = {
    memory: [],
    senseRadious: 4,
  }
}
}

class predator {
  constructor() {
    this.type = "predator"
    this.color = "purple";
    this.x = Math.floor(
      Math.random() *
        (simulationParameters.wideDimension / simulationParameters.squareSide)
    ); //Math.random() * (max - min) + min;
    this.y = Math.floor(
      Math.random() *
        (simulationParameters.heightDimension / simulationParameters.squareSide)
    );
    this.life = 100;
    this.walkmode = "autonomous";
    this.trajectory_x = [1, 1, 1, 1, 1, 1, 1];
    this.trajectory_y = [0, 0, 0, 0, 0, 0, 0];
    this.walk = totalFreedom;
    this.life = 300;
    this.maxEnergy = 250;
    this.energyBorn = this.maxEnergy / 2;
    this.energy = this.energyBorn;
    this.lifeConsumption = 1;
    this.energyConsumption = 1;
    this.behaviourRules = {
      forbiddenPositions: ["water", "simpleCell"],
      forbiddenColors: ["blue", "yellow", "purple"],
    };
    this.preyClasses = [grossPredator];
    this.reproductionRadio = 1;
    this.reproductionPeriod = 4;
    this.cyclesToReproduction = Math.round(Math.random()*this.reproductionPeriod)
    this.vitalFunctions = {
      death: true,
      reproduction: true,
      prey: true,
      }
    this.cognitiveFunctions = {
      see: true,
      pathfinder: true,
    }
    
  }
}

export { grossPredator, grossCell, yellowPredator, vegetable, predator };
