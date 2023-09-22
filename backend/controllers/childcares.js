///////////////////////////////
// DEPENDENCIES
////////////////////////////////

const express = require('express')
const { sequelize, ChildCare } = require("../models");

//     await sequelize.sync({force: true})

///////////////////////////////
// CONTROLLERS
////////////////////////////////

// CHILDCARES INDEX ACTION
async function index(req,res,next) {
	try {
    // get all childcares
    res.json(await ChildCare.findAll());
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
};

// CHILDCARES CREATE ACTION
async function create(req,res,next) {
  try {
    // create new childcare
    res.json(await ChildCare.create(req.body));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
};

// EXPORT Controller Action
module.exports = {
	index,
	create,
}