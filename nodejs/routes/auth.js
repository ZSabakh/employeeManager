const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  registerValidation,
  loginValidation,
} = require("../utility/validation");

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  //Check database for existing user
  const userExists = await User.findOne({ user: req.body.user });
  if (userExists) return res.status(400).send({ error: "User exists" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(403).send({ error: error.details[0].message });

  const user = await User.findOne({ user: req.body.user });
  if (!user) return res.status(403).send({ error: "Wrong info" });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(403).send({ error: "Wrong info" });

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res.header("authorization", token).send({ token });
});

module.exports = router;
