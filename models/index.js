//importing config and sequelize
const dbConfig = require('../config/db.config.js');
const Sequelize = require('sequelize');
require('dotenv').config();
/*
//connecting to sequelize
const sequelize = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
	host:dbConfig.HOST,
	dialect:dbConfig.dialect,
	pool:{
		min:dbConfig.pool.min,
		max:dbConfig.pool.max,
		acquire:dbConfig.pool.acquire,
		idle:dbConfig.pool.acquire
	}
});
*/

const sequelize = new Sequelize(process.env.HEROKU_URL, {
      dialect:  'postgres',
      protocol: 'postgres',
      port:     5432
    })

//importing all models
const Donor = require('./donor.model')(sequelize,Sequelize);
const Donnie = require('./donnie.model')(sequelize,Sequelize);
const DonnieRequest = require('./donnieRequest.model')(sequelize,Sequelize);
const DonorResponse = require('./donorResponse.model')(sequelize,Sequelize);

//relations between models
Donor.hasMany(DonorResponse , {as:"donor_response"});
DonorResponse.belongsTo(Donor, {
  foreignKey: "donorID",
  as:"donor"
});

Donnie.hasMany(DonnieRequest , {as:"donnie_request"});
DonnieRequest.belongsTo(Donnie, {
  foreignKey: "donnieID",
  as:"donnie"
});

DonorResponse.belongsTo(DonnieRequest ,{
	foreignKey:'donnieRequestID',
	as:"donnieRequest"
})

DonnieRequest.hasOne(DonorResponse ,{
	foreignKey:'donorResponseID',
	as:'donorResponse'
})

//exporting all models
module.exports = {
	Sequelize,
	sequelize,
	Donor,
	Donnie,
	DonnieRequest,
	DonorResponse
}