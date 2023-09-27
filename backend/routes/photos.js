///////////////////////////////
// DEPENDENCIES
////////////////////////////////

const express = require('express')
const router = express.Router()

const photosCtrl = require('../controllers/photos')

///////////////////////////////
// ROUTES
////////////////////////////////

// PHOTOS INDEX ROUTE
router.get("/", photosCtrl.index);

// PHOTOS CREATE ROUTE
router.post("/", photosCtrl.create);

// PHOTOS SHOW ROUTE
router.get("/:uuid", photosCtrl.show);

// PHOTOS DELETE ROUTE
router.delete("/:uuid", photosCtrl.delete);

// PHOTOS UPDATE ROUTE
router.put("/:uuid", photosCtrl.update);

module.exports = router

