//importing required packages
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./models');

//constants
const PORT = process.env.PORT || 5000;

//creating a app instance
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api',require('./routes'));

//connecting to database
(async ()=>{
	try {
		await db.sequelize.sync({alter:true});
		console.log('connected to database....');
	} catch(e) {
		console.log(e);
	}
})();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//server
app.listen(PORT,()=>console.log(`Server started at http://localhost:${PORT}`));