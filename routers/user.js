const express = require("express");
const { Router } = express;

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

module.exports = users;
