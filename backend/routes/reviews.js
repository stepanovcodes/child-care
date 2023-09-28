///////////////////////////////
// DEPENDENCIES
////////////////////////////////

const express = require('express')
const router = express.Router()

const reviewsCtrl = require('../controllers/reviews')

///////////////////////////////
// ROUTES
////////////////////////////////

// REVIEWS INDEX ROUTE
router.get("/", reviewsCtrl.index);

// REVIEWS CREATE ROUTE
router.post("/", reviewsCtrl.create);

// REVIEWS SHOW ROUTE
router.get("/:uuid", reviewsCtrl.show);

// REVIEWS DELETE ROUTE
router.delete("/:uuid", reviewsCtrl.delete);

// REVIEWS UPDATE ROUTE
router.put("/:uuid", reviewsCtrl.update);

module.exports = router

