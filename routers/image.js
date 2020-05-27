const express = require("express");
const { Router } = express;

const Image = require("../models").image;

const images = new Router();

images.get("/", async (req, res, next) => {
  try {
    const allImages = await Image.findAll();
    res.json(allImages);
  } catch (error) {
    next(error);
  }
});

module.exports = images;
