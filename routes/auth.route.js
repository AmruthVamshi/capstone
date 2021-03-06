const Router = require('express').Router();
const passport = require('passport');
const verifySignUp = require('../middleware/verifySignup');
const authJwt = require('../middleware/verifyJwtToken');
const donnieAuthController = require('../controllers/donnieAuth.controller.js');
const donorLoginVerify = require('../middleware/donorLoginVerify');
require('dotenv').config();

Router.get('/google',passport.authenticate('google', { scope: ['profile', 'email'] }));

Router.get('/google/callback', passport.authenticate('google',{successRedirect: process.env.CLIENT_HOME_PAGE_URL,failureRedirect: '/failed' }));

Router.get('/facebook',passport.authenticate('facebook'));

Router.get('/facebook/callback', passport.authenticate('facebook', {successRedirect: process.env.CLIENT_HOME_PAGE_URL,failureRedirect: '/login' }));

Router.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.status(200).json({
    	message:'sucesfully logged out!'
    });
})

Router.get('/protected',donorLoginVerify,(req,res)=>{
  res.send(req.user)
})

Router.post('/donnie/signup', [verifySignUp.checkDuplicateEmail], donnieAuthController.signup);
  
Router.post('/donnie/signin', donnieAuthController.signin);
  
//Router.get('/user', [authJwt.verifyToken], controller.userContent);


module.exports = Router;