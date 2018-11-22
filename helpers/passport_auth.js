var User = require('../models/users'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcryptjs');


module.exports = function(passport) {
    //local strategy
    passport.use( "local", new LocalStrategy(function(username,password,done){
      //match username
      let query = {username:username};
      User.findOne(query,function(err,user){
        if(err) throw err;
        if(!user){
          return done(null,false,{message:"No user found"});
        }

        //match password
        bcrypt.compare(password,user.password, (err,isMatch)=> {
          if(err) throw err;
          if(isMatch){
            return done(null,user);
          }else{
            return done(err,false,{message:"Invalid Password"});
          }
        });
      });
    }));
    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
        done(err, user);
      });
    });
}