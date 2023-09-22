///////////////////////////////
// DEPENDENCIES
////////////////////////////////

const express = require('express')
const { sequelize } = require("./models");
// async function main() {
//     await sequelize.sync({force: true})
// }
// main()

///////////////////////////////
// CONTROLLERS
////////////////////////////////

// CHILDCARES INDEX ACTION
async function index(req,res,next) {
	try {
    // get all childcares
    // res.json(await People.find({}));
  } catch (error) {
    //send error
    res.status(400).json(error);
  }
};

// CHILDCARES CREATE ACTION
async function create(req,res,next) {
  try {
    // create new childcare
    // res.json(await People.create(req.body));
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