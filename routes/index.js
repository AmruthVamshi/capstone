const Router = require('express').Router();
const donorVerify = require('../middleware/donorLoginVerify');

Router.use('/auth',require('./auth.route'));

Router.use('/donnie',require('./donnie.route'));

Router.get('/sucess',(req,res)=>{
	res.send('logged in!');
})

Router.get('/failed',(req,res)=>{
	res.send('log in failed!');
})

Router.get('/protected',donorVerify,(req,res)=>res.send('this is protected!'));

module.exports = Router;