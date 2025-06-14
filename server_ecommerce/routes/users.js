const { User } = require("../models/user");
const { auth, isUser, isAdmin } = require("../middleware/auth");
const moment = require("moment");
const bcrypt = require('bcrypt');

const router = require("express").Router();

router.get("/stats", isAdmin, async (req, res) => {
  const previousMonth = moment()
    .month(moment().month() - 1)
    .set("date", 1)
    .format("YYYY-MM-DD HH:mm:ss");

  try {
    const users = await User.aggregate([
      {
        $match: { createdAt: { $gte: new Date(previousMonth) } },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    res.status(200).send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get('/', isAdmin, async (req, res) => {
  try{
    const users = await User.find().sort({ _id: -1});
    res.status(200).send(users);
  }catch(err){
    console.log(err);
    res.status(500).send(err);
  }
});

router.get('/find/:id', async (req, res) => {
  try{
    const user = await User.findById(req.params.id);
    res.status(200).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }catch(err){
    console.log(err);
    res.status(500).send(err);
  }
});

router.delete('/:id', isAdmin, async (req, res) => {
  try{
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).send(deletedUser);
  }catch(err){
    console.log(err);
    res.status(500).send(err);
  }
});

router.put('/:id', isUser, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    // Verifica si el nuevo correo electrónico ya está en uso
    if (user.email !== req.body.email) {
      const emailInUse = await User.findOne({ email: req.body.email });
      if (emailInUse) {
        return res.status(400).send('That email is already taken...');
      }
    }

    // Hashea la nueva contraseña si se proporciona
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashedPassword; // Actualiza la contraseña en el cuerpo de la solicitud
    } else {
      delete req.body.password; // Elimina la contraseña del cuerpo de la solicitud si no se proporciona
    }

    // Actualiza el usuario
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        isAdmin: req.body.isAdmin,
        ...(req.body.password && { password: req.body.password }), // Solo incluye la contraseña si se ha proporcionado
      },
      { new: true }
    );

    res.status(200).send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});


module.exports = router;

/*router.put('/:id', isUser, async (req, res) => {
  try{
    const user = await User.findById(req.params.id);

    if(!(user.email === req.body.email)) {
      const emailInUse = await User.findOne({ email: req.body.email});
      if(emailInUse)
      return res.status(400).send('That email is already taken...');
    }

    if(req.body.password && user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      user.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,{
        name: req.body.name,
        email: req.body.email,
        isAdmin: req.body.isAdmin,
        password: req.body.password,
      },
      { new: true }
    )
    res.status(200).send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  }catch(err){
    console.log(err);
    res.status(500).send(err);
  }
});*/


