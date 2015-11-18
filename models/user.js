'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');

var User;

var userSchema = Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  startPokemon: {type: String, required: true }
});

userSchema.statics.register = function(user, cb){
  var username = user.username;
  var password = user.password;
  var startPokemon = user.startPokemon;

  User.findOne({username: username}, function(err, user){
    if (err || user) return res.status(400).send(err || "That username is already taken");

    bcrypt.genSalt(10, function(err1, salt){
      bcrypt.hash(password, salt, function(err2, hash){
        if(err1 || err2) return cb(err1 || err2);
        var newUser = new User();
        newUser.username = username;
        newUser.password = hash;
        newUser.startPokemon = startPokemon;
        newUser.save(function(err, savedUser){
          savedUser.password = null;
          cb(err, savedUser);
        });
      });
    });
  });
};

User = mongoose.model('User', userSchema);

module.exports = User;
