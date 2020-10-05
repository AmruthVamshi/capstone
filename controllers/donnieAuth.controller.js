const { Donnie,Sequelize } = require('../models');
const Op = Sequelize.Op;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

exports.signup = (req, res) => {

  //validation
  let err = [];
  if(req.body.username<7 && req.body.password<7) err.push('usename and password should be greater than 7');
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(!re.test(String(req.body.email).toLowerCase())) err.push('enter a valid email');
  if(err.length) res.status(500).send({err:err});

  // Save User to Database
  Donnie.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
  .then(donnie => {
    res.send(`User registered successfully as ${donnie.username}!`);
  })
  .catch(err => {
    res.status(500).send("Error -> " + err);
  });

}
 
exports.signin = (req, res) => {
  
  Donnie.findOne({
    where: {
      email: req.body.email
    }
  }).then(donnie => {
    if (!donnie) {
      return res.status(404).send('User Not Found.');
    }
 
    var passwordIsValid = bcrypt.compareSync(req.body.password, donnie.password);
    if (!passwordIsValid) {
      return res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!" });
    }
    
    var token = jwt.sign({ id: donnie.id,username:donnie.username }, process.env.jwtSecret, {
      expiresIn: 86400 // expires in 24 hours
    });
    
    res.status(200).send({ auth: true, accessToken: token });
    
  }).catch(err => {
    res.status(500).send('Error -> ' + err);
  });
}

/*
exports.userContent = (req, res) => {

  User.findOne({
    where: {id: req.userId},
    attributes: ['name', 'username', 'email'],
    include: [{
      model: Role,
      attributes: ['id', 'name'],
      through: {
        attributes: ['userId', 'roleId'],
      }
    }]
  }).then(user => {
    res.status(200).json({
      "description": "User Content Page",
      "user": user
    });
  }).catch(err => {
    res.status(500).json({
      "description": "Can not access User Page",
      "error": err
    });
  })

}
*/