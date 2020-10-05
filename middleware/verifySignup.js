const {Donnie} = require('../models');

checkDuplicateEmail = (req, res, next) => {
    // -> Check Username is already in use
    Donnie.findOne({
      where: {
        email: req.body.email
      } 
    })
    .then(donnie => {
        if(donnie){
          res.status(400).send("Fail -> Email is already taken!");
          return;
        }   
        next();
    })
    .catch(e=>{
      res.status(401).send({
        message:'error while signup!'
      })
    })
}
const signUpVerify = {};
signUpVerify.checkDuplicateEmail = checkDuplicateEmail;
 
module.exports = signUpVerify;