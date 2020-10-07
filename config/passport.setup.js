//importing require packages
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const {Donor} = require('../models');

passport.serializeUser(function(donor, done) {
    /*
    From the user take just the id (to minimize the cookie size) and just pass the id of the user
    to the done callback
    PS: You dont have to do it like this its just usually done like this
    */
    done(null, donor.donorID);
  });
  
passport.deserializeUser(async function(id, done) {
    /*
    Instead of user this function usually recives the id 
    then you use the id to select the user from the db and pass the user obj to the done callback
    PS: You can later access this data in any routes in: req.user
    */
    try {
      const doner = await Donor.findOne({where:{donorID:id}});
      done(null,doner);
    } catch(e) {
      console.log(e);
      done(e, null);
    }
});

//google startegy
passport.use(new GoogleStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
    /*
     use the profile info (mainly profile id) to check if the user is registerd in ur db
     If yes select the user and pass him to the done callback
     If not create the user and then select him and pass to callback
    */
   try {
     const [donor,created] = await Donor.findOrCreate({
      where:{donorID:profile.id},
      defaults:{
        username:profile.displayName,
        email:profile.email,
        profile_pic:profile.picture
      }
    })
    return done(null, donor);
   } catch(e) {
     console.log(e);
     return done(e, null);     
   }
  }
));

//facebook statergy
passport.use(new FacebookStrategy({
    clientID: process.env.appID,
    clientSecret: process.env.appSecret,
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  async function(accessToken, refreshToken, profile, done) {
    /*
     use the profile info (mainly profile id) to check if the user is registerd in ur db
     If yes select the user and pass him to the done callback
     If not create the user and then select him and pass to callback
    */
   try {
     const [donor,created] = await Donor.findOrCreate({
      where:{donorID:profile.id},
      defaults:{
        username:profile.displayName,
        email:profile.email,
        profile_pic:profile.picture
      }
    })
    return done(null, donor);
   } catch(e) {
     console.log(e);
     return done(e, null);     
   }
  }
));