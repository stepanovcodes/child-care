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

// CHILDCARES SHOW ROUTE
router.get("/:uuid", childCaresCtrl.show);

// CHILDCARES DELETE ROUTE
router.delete("/:uuid", childCaresCtrl.delete);

// CHILDCARES UPDATE ROUTE
router.put("/:uuid", childCaresCtrl.update);

module.exports = router

