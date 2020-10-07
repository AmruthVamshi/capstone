const Router = require('express').Router();
const donnieVerify = require('../middleware/verifyJwtToken');
const donorVerify = require('../middleware/donorLoginVerify');
const {Donor} = require('../models');

Router.use('/auth',require('./auth.route'));

Router.use('/donnie',require('./donnie.route'));

Router.use('/donor',require('./donor.route'));

Router.use('/request',require('./donnieRequest.route'));

Router.use('/response',donorVerify,require('./donorResponse.route'));

Router.get('/sucess',async (req,res)=>{
	res.send(req.user);
})

Router.get('/failed',(req,res)=>{
	res.send('log in failed!');
})

module.exports = Router;