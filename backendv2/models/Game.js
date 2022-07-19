const mongoose = require("mongoose");
const User = mongoose.model('User');
const { Schema } = mongoose;

const GameSchema = new Schema({
  user: { type: Schema.ObjectId, ref: "User" },
  stageParameters: {
    universeRules: {
      movementType: {
        type: String,
        enum: ["zigzag", "diagonal"],
        
        required: true,
      },
      frontier: {
        type: String,
        enum: ["close", "adjacent ends"],
        default: "close",
        required: true,
      },
    },
    livingBeingsRules: {
      reproduction: {
        type: {
          type: String,
          enum: ["sexual", "asexual"],
          default: "sexual",
          required: true,
        },
        probability: {
          type: Number,
          default: 0.5,
          required: true,
        },
        distantTowater: {
          type: Number,
          default: 1,
          required: true,
        },
        proximityTosameCells: {
          type: Number,
          default: 3,
          required: true,
        },
      },
    },
    legendTerrain: {
      ground: {
        type: String,
        default: "brown",
        required: true,
      },
      water: {
        type: String,
        default: "blue",
        required: true,
      },
    },
    legend: {
      water: {
        type: String,
        default: "blue",
        required: true,
      },
      simpleCell: {
        type: String,
        default: "yellow",
        required: true,
      },
    },
    legendForbiddenColors: [
      {
        type: String,
        default: "blue",
        required: true,
      },
      {
        type: String,
        default: "yellow",
        required: true,
      },
      {
        type: String,
        default: "green",
        required: true,
      },
      {
        type: String,
        default: "purple",
        required: true,
      },
    ],
    livingBeingsCollection: [
      {
        name: {
          type: String,
          default: "gross predator",
          required: true,
        },
        type: {
          type: String,
          enum: ["predator", "vegetable"],
          default: "predator",
          required: true,
        },
        color: {
          type: String,
          default: "yellow",
          required: true,
        },
        preys: [
          {
            type: String,
            default: "gross",
            required: true,
          },
        ],
        movement: {
          type: String,
          enum: ["path finder", "None", "Random"],
          default: "path finder",
          required: true,
        },
        number: {
          type: Number,
          default: 1,
          required: true,
        },
      },
    ],
    //dynamicElementsArray: [],
    staticStage: [[{ type: String }]],
    matrix: [[{ type: String }]],
    //freePlacesArray: [], La verdad es que no me acuerdo que tipo de datos guardaba esto
    universeEnergy: {
      type: Number,
      default: 500000,
      required: true,
    },
    generationStageAlgorithm: {
      type: String,
      default: "allTerrain",
      required: true,
    },
    //speciesCounter: [], Creo que de momento no hace falta
  },
  simulationParameters: {
    simulationStepsNumber: {
      type: Number,
      default: 50,
      required: true,
    },
    type: {
      type: String,
      enum: ["finite", "infinite"],
      default: "finite",
      required: true,
    },
    timePerStep: {
      type: Number,
      default: 600,
      required: true,
    },
    wideDimension: {
      type: Number,
      default: 400,
      required: true,
    },
    heightDimension: {
      type: Number,
      default: 400,
      required: true,
    },
    squareSide: {
      type: Number,
      default: 20,
      required: true,
    },
  },
});

module.exports = mongoose.model("Game", GameSchema);
