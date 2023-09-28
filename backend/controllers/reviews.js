///////////////////////////////
// DEPENDENCIES
////////////////////////////////

const express = require("express");
const { Review } = require("../models");

///////////////////////////////
// CONTROLLERS
////////////////////////////////

// REVIEWS INDEX ACTION
async function index(req, res, next) {
  try {
    // get all photos
    res.json(await Review.findAll());
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
}

// REVIEWS CREATE ACTION
async function create(req, res, next) {
  try {
    if (Array.isArray(req.body)) {
      // If req.body is an array, it contains multiple objects
      res.json(await Review.bulkCreate(req.body));
    } else if (typeof req.body === 'object') {
      // If req.body is an object, it contains a single object
      res.json(await Review.create(req.body));
    } else {
      // Handle invalid input (neither object nor array)
      res.status(400).json({ error: 'Invalid input' });
    }
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
}

// REVIEWS SHOW ACTION
async function show(req, res, next) {
  try {
    // send one photo
    res.status(200).json(await Review.findOne({
        where: { uuid: req.params.uuid },
      }));
  } catch (error) {
    //send error
    res.status(400).json({ error: error.message });
  }
}

// REVIEWS DESTROY ACTION
async function destroy(req, res) {
  try {
    res.status(204).json(
      await Review.destroy({
        where: { uuid: req.params.uuid },
      })
    );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// REVIEWS UPDATE ACTION
async function update(req, res) {
  try {
    res.status(204).json(
      await Review.update(req.body, {
        where: { uuid: req.params.uuid },
      })
    );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// EXPORT Controller Action
module.exports = {
  index,
  create,
  show,
  delete: destroy,
  update,
};
