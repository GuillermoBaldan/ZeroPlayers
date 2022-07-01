const mongoose = require("mongoose");
const { Schema } = mongoose;

const GameSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    x: {
        type: Number,
        required: true,
    },
    y: {
        type: Number,
        required: true,
    },
    class: {
        type: String,
        required: true,
        },
    age: {
        type: Number,
        required: true,
    },
    energy:
    {
        type: Number,
        required: true,
    },
    cyclesToReproduction: {
        type: Number,
        required: true,
    },
    memorySense: {
        memory: [[{ type: String }]],
        senseRadius: {
            type: Number,
            required: true,
            defaut: 2,
        },
        hunterMemory: {
            preypath: [{type: Number},{type: Number}],
            counterpath: {
                type: Number,
                required: true,
                default: 0,
            },
            mode: {
                type: String,
                enum: ["search", "hunter"],

        }

        }
    }
});
module.exports = mongoose.model("Game", GameSchema);
