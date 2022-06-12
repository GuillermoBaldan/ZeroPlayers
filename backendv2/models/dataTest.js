const mongoose = require("mongoose");
const { Schema } = mongoose;

const dataTestSchema = new Schema({
  variable: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("dataTest", dataTestSchema);
