///////////////////////////////
// DEPENDENCIES
////////////////////////////////

// initialize .env variables
require("dotenv").config();

// pull PORT from .env, give default value of 4000 and establish DB Connection
const { PORT } = process.env;

// import express
const express = require("express");

// create application object
const app = express();

const childCaresRouter = require('./routes/childcares')
const photosRouter = require('./routes/photos')

const { sequelize} = require("./models");

const cors = require("cors")
const morgan = require("morgan")

///////////////////////////////
// MIDDLEWARE
////////////////////////////////
app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.use(cors()); // to minimize cors errors, open access to all origins
app.use(morgan("dev")); // logging for development

// all requests for endpoints that begin with '/childcares'
app.use('/childcares', childCaresRouter)
app.use('/photos', photosRouter)

///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
    res.send("This is Child Care backend");
});

///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, async () => {
    console.log(`listening on PORT ${PORT}`)
    await sequelize.authenticate()
    console.log(`Database is connected!`)
});  

