///////////////////////////////
// DEPENDENCIES
////////////////////////////////

const express = require('express')
const router = express.Router()

///////////////////////////////
// ROUTES
////////////////////////////////

// CHILDCARES INDEX ROUTE
router.get("/", async (req, res) => {
	res.status(200).json({message: "childcares index route"})
});

// CHILDCARES CREATE ROUTE
router.post("/", async (req, res) =>  {
	res.status(201).json({message: "childcares create route"})
});

module.exports = router

