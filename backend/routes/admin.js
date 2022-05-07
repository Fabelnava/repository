const express = require("express");
const router = express.Router();
const { Admin } = require("../models/admin");

router.post("/", async (req, res) => {
  let admin = await Admin.findOne({ email: req.body.email });
  if (admin) return res.status(400).send("Ese usuario ya existe");
  admin = new Admin({
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  });
  const result = await admin.save();
  const jwtToken = admin.generateJWT();
  res.status(200).send({ jwtToken });
});

module.exports = router;
