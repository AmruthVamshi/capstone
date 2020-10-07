const donnie = require("../controllers/donnie.controller.js");
const donnieVerify = require('../middleware/verifyJwtToken');
var Router = require("express").Router();

//create a donnie
//Router.post("/", donnie.create);
  
// Retrieve all donnie
Router.get("/", donnie.findAll);

// Retrieve a single donnie with id
Router.get("/myprofile",donnieVerify.verifyToken,donnie.findOne);
  
// Update a Tutorial with id
Router.patch("/",donnieVerify.verifyToken,donnie.update);
  
// Delete a Tutorial with id
Router.delete("/",donnieVerify.verifyToken,donnie.delete);
  
//delete all donnies
//Router.delete("/", donnie.deleteAll);
  
module.exports = Router;