const express = require("express");
const router = express.Router();
const Pizza = require("../models/pizza");
const { User } = require("../models/user");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload")

router.get("/list", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(400).send("Usuario no esta en Base de datos");
  const pizza = await Pizza.find({ userId: req.user._id });

  res.send(pizza);
});
router.post('/upload', upload.single('image'), auth, async(req, res)=>{
  const url = req.protocol + '://' + req.get('host')

  const user = await User.findById(req.user._id)
  if(!user) return res.status(400).send('No hay ese user')
  let imageUrl = null
  if (req.file.filename) {
   imageUrl = url + '/public/' + req.file.filename
  } else {
    imageUrl = null
  }

  const pizza = new Pizza({
     userId: user._id,
     type: req.body.type,
     status: 'to-do',
     imageUrl: imageUrl,
     ingredients: req.body.ingredients
  })

  const result = await pizza.save()
  res.status(201).send(result)
})

router.post("/", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(400).send("no hay ese usuario");

  const pizza = new Pizza({
    userId: user._id,
    type: req.body.type,
    status: "to-do",
    ingredients: req.body.ingredients,
  });

  const result = await pizza.save();
  res.status(201).send(result);
});

router.put("/", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(400).send("No hay usuario");

  const pizza = await Pizza.findByIdAndUpdate(
    req.body._id,
    {
      userId: user._id,
      type: req.body.type,
      status: req.body.status,
      ingredients: req.body.ingredients,
    },
    {
      new: true,
    }
  );
  if(!pizza){
      return res.status(404).send('No existe la tarea')
  }
  res.status(200).send(pizza)
});

router.delete('/:_id', auth , async(req,res)=>{
    const user = await User.findById(req.user._id)
    if(!user) return res.status(400).send('El usuario no existe')
    const pizza = await Pizza.findByIdAndDelete(req.params._id)
    if(!pizza){
        return res.status(400).send('No hay tarea, no se pudo borrar')
    }
    res.status(200).send({message: 'borrado'})
})




module.exports = router;
