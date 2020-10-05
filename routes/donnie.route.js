const donnie = require("../controllers/donnie.controller.js");
var Router = require("express").Router();

//create a donnie
//Router.post("/", donnie.create);
  
// Retrieve all donnie
Router.get("/", donnie.findAll);

// Retrieve a single donnie with id
Router.get("/:id", donnie.findOne);
  
// Update a Tutorial with id
Router.put("/:id", donnie.update);
  
// Delete a Tutorial with id
Router.delete("/:id", donnie.delete);
  
//delete all donnies
Router.delete("/", donnie.deleteAll);
  
module.exports = Router;