const express = require("express");
const { Router } = express;
const bcrypt = require("bcrypt");

const User = require("../models").user;

const users = new Router();

users.get("/", async (req, res, next) => {
  try {
    const allUsers = await User.findAll();
    res.json(allUsers);
  } catch (error) {
    next(error);
  }
});

users.post("/", async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      res.status(400).send("Missing information");
    } else {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = await User.create({
        fullName,
        email,
        password: hashedPassword,
      });
      res.json(newUser);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = users;
