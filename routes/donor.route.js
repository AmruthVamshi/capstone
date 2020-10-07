const donor = require("../controllers/donor.controller.js");
const donorVerify = require('../middleware/donorLoginVerify');
var Router = require("express").Router();

//create a donor
//Router.post("/", donor.create);
  
// Retrieve all donor
Router.get("/", donor.findAll);

// Retrieve a single donor with id
Router.get("/myprofile",donorVerify,donor.findOne);
  
// Update a Tutorial with id
Router.patch("/",donorVerify, donor.update);
  
// Delete a Tutorial with id
Router.delete("/",donorVerify, donor.delete);
  
//delete all donors
//Router.delete("/", donor.deleteAll);
  
module.exports = Router;