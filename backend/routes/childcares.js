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
router.get("/:id", childCaresCtrl.show);

// CHILDCARES DELETE ROUTE
router.delete("/:id", childCaresCtrl.delete);

// CHILDCARES UPDATE ROUTE
router.put("/:id", childCaresCtrl.update);

module.exports = router

