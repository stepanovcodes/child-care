///////////////////////////////
// DEPENDENCIES
////////////////////////////////

const express = require("express");
const { ChildCare } = require("../models");

///////////////////////////////
// CONTROLLERS
////////////////////////////////

// CHILDCARES INDEX ACTION
async function index(req, res, next) {
  try {
    // get all childcares
    res.json(await ChildCare.findAll());
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
}

// CHILDCARES CREATE ACTION
async function create(req, res, next) {
  try {
    // create new childcare
    res.json(await ChildCare.create(req.body));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
}

// CHILDCARES SHOW ACTION
async function show(req, res, next) {
  try {
    // send one childcare
    res.status(200).json(await ChildCare.findOne({
        where: { uuid: req.params.uuid },
      }));
  } catch (error) {
    //send error
    res.status(400).json({ error: error.message });
  }
}

// CHILDCARES DESTROY ACTION
async function destroy(req, res) {
  try {
    res.status(204).json(
      await ChildCare.destroy({
        where: { uuid: req.params.uuid },
      })
    );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// CHILDCARES UPDATE ACTION
async function update(req, res) {
  try {
    res.status(204).json(
      await ChildCare.update(req.body, {
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
