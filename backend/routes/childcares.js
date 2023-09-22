///////////////////////////////
// DEPENDENCIES
////////////////////////////////

const express = require('express')
const router = express.Router()

const childCaresCtrl = require('../controllers/childcares')

///////////////////////////////
// ROUTES
////////////////////////////////

// CHILDCARES INDEX ROUTE
router.get("/", childCaresCtrl.index);

// CHILDCARES CREATE ROUTE
router.post("/", childCaresCtrl.create);

module.exports = router

