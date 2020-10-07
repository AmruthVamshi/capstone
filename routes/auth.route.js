const Router = require('express').Router();
const passport = require('passport');
const verifySignUp = require('../middleware/verifySignup');
const authJwt = require('../middleware/verifyJwtToken');
const donnieAuthController = require('../controllers/donnieAuth.controller.js');
const donorLoginVerify = require('../middleware/donorLoginVerify');

Router.get('/google',passport.authenticate('google', { scope: ['profile', 'email'] }));

Router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log(req.user)
    res.redirect('/sucess');
  }
);

Router.get('/facebook',passport.authenticate('facebook'));

Router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log(req.user)
    res.redirect('/sucess');
  }
);

Router.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.send('You are logged out!');
})

Router.get('/protected',donorLoginVerify,(req,res)=>{
  res.send(req.user)
})

Router.post('/donnie/signup', [verifySignUp.checkDuplicateEmail], donnieAuthController.signup);
  
Router.post('/donnie/signin', donnieAuthController.signin);
  
//Router.get('/user', [authJwt.verifyToken], controller.userContent);


module.exports = Router;