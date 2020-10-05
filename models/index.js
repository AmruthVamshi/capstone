//importing config and sequelize
const dbConfig = require('../config/db.config.js');
const Sequelize = require('sequelize');

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

//importing all models
const Donor = require('./donor.model')(sequelize,Sequelize);
const Donnie = require('./donnie.model')(sequelize,Sequelize);

//exporting all models
module.exports = {
	Sequelize,
	sequelize,
	Donor,
	Donnie
}