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

//exporting all models
module.exports = {
	Sequelize,
	sequelize
}