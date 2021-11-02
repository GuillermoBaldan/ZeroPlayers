import {simulationParameters} from './index.js';
import {totalFreedom} from './ZeroPlayers_f_livingbeings.js'


class simpleCell {
    constructor() {
      this.color = "yellow"
      this.x = Math.floor(Math.random()*(simulationParameters.wideDimension/simulationParameters.squareSide)) //Math.random() * (max - min) + min;
      this.y = Math.floor(Math.random()*(simulationParameters.heightDimension/simulationParameters.squareSide))
      this.life = 100
      this.walkmode = "autonomous"
      this.trajectory_x = [1,1,1,1,1,1,1]
      this.trajectory_y = [0,0,0,0,0,0,0]
      this.walk = totalFreedom
      this.life = 500
      this.maxEnergy = 100
      this.energy = 100
      this.lifeConsumption = 5
      this.energyConsumption = 0
      this.behaviourRules = {forbiddenPositions : ["water","simpleCell"]};
      this.preyClasses = [grossCell]
      this.reproductionRadio = 1;
    }
  }

  class grossCell {
    constructor() {
      this.color = "green"
      this.walkmode = "static"
      this.x = Math.floor(Math.random()*(simulationParameters.wideDimension/simulationParameters.squareSide)) //Math.random() * (max - min) + min;
      this.y = Math.floor(Math.random()*(simulationParameters.heightDimension/simulationParameters.squareSide))
      this.life = 100
      this.maxEnergy = 100
      this.energy = 100
      this.lifeConsumption = 5
      this.energyConsumption = 10
      this.behaviourRules = {forbiddenPositions : ["water","simpleCell"]};
      this.preyClasses = []
      this.reproductionRadio = 5;
   }
  }

  export {simpleCell,grossCell}