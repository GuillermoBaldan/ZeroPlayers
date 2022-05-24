const mongoose = require("mongoose");
const { Schema } = mongoose;

const AnimalClassSchema = new Schema({
name:{
    type: String,
    required: true
},
color:{
    type: String,
    required: true
},
preys:  [{
    type: String,
}],
type:{
    enum: ["predator", "vegetable"],
    required: true
},
initialNumber:{
    type: Number,
    required: true
},
walkmode: {
    enum: ["static", "random"],
    required: true
},
walk:{
    type: String,
    required: true
},
reproductionRules: {
    blocks: [{
        name: {
            type: String,
            
        },
        color: {
            type: String,
        },
        number:{
            type: Number,
        }
}]
},
life: {
    type: Number,
    required: true
},
age:{
    type: Number,
    required: true,
    default: 0 
}

});
module.exports = mongoose.model("Animal_class", GameSchema);
