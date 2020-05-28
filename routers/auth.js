const bcrypt = require("bcrypt");
const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
const User = require("../models").user;

const router = new Router();

router.post("/login", async (req, res, next) => {
  // Here goes the login logic.
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send("Please supply a valid email and password");
  } else {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      res.status(404).send({
        message: "User with that email does not exist",
      });
    } else if (bcrypt.compareSync(password, user.password)) {
      const jwt = toJWT({ userId: user.id }); //Get back userId
      res.send({ jwt });
    } else {
      res.status(400).send({
        message: "Password was incorrect",
      });
    }
  }
});

module.exports = router;
