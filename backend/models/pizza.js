const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema({
  userId: String,
  type: String,
  ingredients: String,
  status: String,
  imageUrl: String,
  date: { type: Date, default: Date.now },
});

const Pizza = mongoose.model("pizza", pizzaSchema);

module.exports = Pizza;
