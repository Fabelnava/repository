const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  lastname: {
      type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

adminSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      lastname: this.lastname,
      email: this.email,
    },
    "secretKey"
  );
};

const Admin = mongoose.model("admin", adminSchema);

module.exports.Admin = Admin;
module.exports.adminSchema = adminSchema;