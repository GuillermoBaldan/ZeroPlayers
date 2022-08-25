

class simpleGoldWinner {
    constructor(name, type, color, preys, movement, initialNumber) {
      this.name = name;
      //this.id = countingSpecies(this.name, stageParameters);
      this.type = type; //It can be "vegetable", "predator"
      this.color = color;
      this.preys = preys;
      this.movement = movement;
      this.initialNumber = initialNumber;
        if (movement == "None") {
        this.walkmode = "static";
        this.walk = "None";
      } else if (movement == "Random") {
        this.walkmode = "autonomous";
        this.walk = zigzagFreedom;
      } else if (movement == "path finder") {
        this.walkmode = "autonomous";
        this.walk = hunterPathFinderv4;
      }
      if (this.type == "vegetable") {
        this.reproductionRules = {
          blocks: [
            {
              name: "water",
              color: "blue",
              number: 1,
            },
          ],
        };
      } else {
        this.reproductionRules = {
          blocks: [],
        };
      }
      this.trajectory_x;
      this.trajectory_y;
      this.life = 200;
      this.age = 0;
      this.maxEnergy = 250;
      this.energyBorn = this.maxEnergy / 2;
      this.energy = this.energyBorn;
      this.lifeConsumption = 1;
      this.energyConsumption = 1;
      this.behaviourRules = {
        forbiddenPositions: ["water", "simpleCell"],
        forbiddenColors: ["blue", "yellow", "purple"],
      };
      this.preys = preys;
      this.reproductionRadio = 1;
      this.reproductionPeriod = 4;
      this.cyclesToReproduction = Math.round(
        Math.random() * this.reproductionPeriod
      );
      this.vitalFunctions = {
        death: true,
        reproduction: true,
        prey: true,
      };
      this.cognitiveFunctions = {
        see: true,
        pathfinder: true,
      };
      this.memorySense = {
        memory: [],
        senseRadious: 2,
        huntermemory: {
          selectedprey: [],
          preypath: [],
          counterpath: 0,
          mode: "search", //This register can be "search" or "prey selected"
        },
      };
    }
  }