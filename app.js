//to enable .env file
require('dotenv').config();
//importing required packages
const express = require('express');
const cors = require('cors');
const db = require('./models');
const passport = require('passport');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');

//constants
const PORT = process.env.PORT || 5000;

//creating a app instance
const app = express();

//connecting to database
(async ()=>{
	try {
		await db.sequelize.sync({alter:true});
		console.log('connected to database....');
	} catch(e) {
		console.log(e);
	}
})();

require('./config/passport.setup');

//middleware
app.use(
	cors({
    origin: "http://localhost:3001", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
 }));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
//app.use('/api',require('./routes'));
app.use(
	 cookieSession({
    name: "session",
    keys: [process.env.COOKIE_KEY],
    sameSite:false,
    maxAge: 24 * 60 * 60 * 100
  })
);
//parse cookies
app.use(cookieParser());

// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

app.use('/',require('./routes'));

//server
app.listen(PORT,()=>console.log(`Server started at http://localhost:${PORT}`));