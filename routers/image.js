const express = require("express");
const { Router } = express;

const Image = require("../models").image;

const images = new Router();

// images.get("/user1", async (req, res, next) => {
//   try {
//     const allImages = await Image.findAll();
//     res.json(allImages);
//   } catch (error) {
//     next(error);
//   }
// });

images.post("/", async (req, res, next) => {
  try {
    const newImage = await Image.create(({ title, url } = req.body));
    res.json(newImage);
  } catch (error) {
    next(error);
  }
});

images.get("/", (req, res, next) => {
  const limit = Math.min(req.query.limit || 25, 500);
  const offset = req.query.offset || 0;

  Image.findAndCountAll({ limit, offset })
    .then((result) => res.send({ images: result.rows, total: result.count }))
    .catch((error) => next(error));
});

module.exports = images;
