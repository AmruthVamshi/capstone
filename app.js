//to enable .env file
require('dotenv').config();
//importing required packages
const express = require('express');
const cors = require('cors');
const db = require('./models');
const passport = require('passport');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const path = require('path');

//constants
const PORT = process.env.PORT || 3001;

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

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../client/build')))

// AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/build/index.html'))
})

require('./config/passport.setup');

//middleware
app.use(
	cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
 }));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
//app.use('/api',require('./routes'));
app.use(
	 cookieSession({
    secret: process.env.COOKIE_KEY,
    resave:true,
    saveUninitialized:true
  })
);
//parse cookies
app.use(cookieParser(process.env.COOKIE_KEY));

//Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

app.use('/',require('./routes'));

//server
app.listen(PORT,()=>console.log(`Server started at http://localhost:${PORT}`));