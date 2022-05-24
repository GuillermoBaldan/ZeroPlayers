const mongoose = require("mongoose");
const { Schema } = mongoose;

const AnimalClassSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  preys: [
    {
      type: String,
    },
  ],
  type: {
    enum: ["predator", "vegetable"],
    required: true,
  },
  initialNumber: {
    type: Number,
    required: true,
  },
  walkmode: {
    enum: ["static", "random"],
    required: true,
  },
  walk: {
    type: String,
    required: true,
  },
  reproductionRules: {
    blocks: [
      {
        name: {
          type: String,
        },
        color: {
          type: String,
        },
        number: {
          type: Number,
        },
      },
    ],
  },
  life: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    default: 0,
  },
  maxEnergy: {
    type: Number,
    required: true,
  },
  energyBorn: {
    type: Number,
    required: true,
    default: maxEnergy / 2,
  },
  energy: {
    type: Number,
    required: true,
    default: energyBorn,
  },
  lifeConsumption: {
    type: Number,
    required: true,
    default: 1,
  },
  energyConsumption: {
    type: Number,
    required: true,
    default: 1,
  },
  behaviourRules: {
    forbiddenPositions: [{ type: String }],
    forbiddenColors: [{ type: String }],
  },
  preys: [{ type: String }],
  reproductionRadio: {
    type: Number,
    required: true,
    default: 1,
  },
  reproductionPeriod: {
    type: Number,
    required: true,
    default: 4,
  },
  cycleToReproduction: {
    type: Number,
    required: true,
    default: 0,
  },
  vitalFunctions: {
    death: {
      type: boolean,
      required: true,
      defaut: true,
    },
    reproduction: {
      type: boolean,
      required: true,
      defaut: true,
    },
    prey: {
      type: boolean,
      required: true,
      defaut: true,
    },
  },
  cognitiveFunctions: {
    see: {
      type: boolean,
      required: true,
      defaut: true,
    },
    pathfinder: {
      type: boolean,
      required: true,
      defaut: true,
    },
  },
  memorySense: {
    senseRadio: {
      type: Number,
      required: true,
      default: 2,
    },
    hunterMemory: {
      mode: {
        enum: ["search", "prey selected"],
        required: true,
      },
    },
  },
});

module.exports = mongoose.model("Animal_class", AnimalClassSchema);
