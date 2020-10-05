const jwt = require('jsonwebtoken');
require('dotenv').config();
 
verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'];
  
  if (!token){
    return res.status(403).send({ 
      auth: false, message: 'No token provided.' 
    });
  }
 
  jwt.verify(token, process.env.jwtSecret, (err, decoded) => {
    if (err){
      return res.status(500).send({ 
          auth: false, 
          message: 'Fail to Authentication. Error -> ' + err 
        });
    }
    req.donnie = decoded;
    next();
  });
}
const authJwt = {};
authJwt.verifyToken = verifyToken;

 
module.exports = authJwt;