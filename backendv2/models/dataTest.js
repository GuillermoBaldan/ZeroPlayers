const mongoose = require("mongoose");
const User = mongoose.model('User');
const { Schema } = mongoose;

const dataTestSchema = new Schema({
  user: { type: Schema.ObjectId, ref: "User" },
  variable: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("dataTest", dataTestSchema);
