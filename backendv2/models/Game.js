const mongoose = require("mongoose");
const { Schema } = mongoose;

const GameSchema = new Schema({
  stageParameters : {
      universeRules : {
            movementType : {
               type: String,
                enum: ["zigzag", "diagonal"],
                default: "zigzag",
                required: true
            },
            frontier : {
                type: String,
                enum: ["close", "adjacent ends"],
                default: "close",
                required: true
            }
  },
  livingBeingsRules : {
        reproduction : {
            type: {
            type: String,
            enum: ["sexual", "asexual"],
            default: "sexual",
            required: true
            },
            probability : {
                type: Number,
                default: 0.5,
                required: true
            },
            distantTowater : {
                type: Number,
                default: 1,
                required: true

        },
        proximityTosameCells : {
            type: Number,
            default: 3,
            required: true
        }
    },
    legendTerrain: {
        ground: {
            type: String,
            default: "brown",
            required: true
        },
        water: {
            type: String,
            default: "blue",
            required: true
        }
    },
    legend: {
        water: {
            type: String,
            default: "blue",
            required: true
        },
        simpleCell: {
            type: String,
            default: "yellow",
            required: true
        }
    },
    legendForbiddenColors: [{
        type: String,
        default: "blue",
        required: true
    },
    {
        type: String,
        default: "yellow",
        required: true
    },{
        type: String,
        default: "green",
        required: true
    },{
        type: String,
        default: "purple",
        required: true
    }],
    livingBeingsCollection: [{
        name: {
            type: String,
            default: "gross predator",
            required: true
        },
        type: {
            type: String,
            enum: ["predator", "vegetable"],
            default: "predator",
            required: true
        },
        color: {
            type: String,
            default: "yellow",
            required: true
        },
        preys: [{
            type: String,
            default: "gross",
            required: true
        }],
        movement: {
            type: String,
            enum: ["path finder", "None", "Random"],
            default: "path finder",
            required: true
        },
        number: {
            type: Number,
            default: 1,
            required: true
        }


    }],



}});
module.exports = mongoose.model("Game", GameSchema);
