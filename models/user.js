'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');

var User;

var userSchema = Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: String,
  // pokemons: [{type: Schema.Types.ObjectId, ref: 'Pokemon'}]
});

userSchema.methods.generateToken = function(){
  var payload = { _id: this._id }
  var secret = process.env.JWT_SECRET;
  var token = jwt.encode(payload, secret);
  return token;
}

userSchema.methods.login = function(cb){
  User.authenticate(this, function(err, authUser){
    if (err) return res.status(400).send(err);
    cb(null, authUser)
  });
};

userSchema.statics.authenticate = function(user, cb){
  var incorrectMessage = "Incorrect email or password";
  User.findOne({email: user.email}, function(err, existingUser){
    if (err || !existingUser) res.status(400).send(err || incorrectMessage);
    bcrypt.compare(user.password, existingUser.password, function(err, res){
      if (err || !res) return cb(err || incorrectMessage);
      console.log('passwords match!');
      existingUser.password = null;
      cb(null, existingUser);
    })
  })
}

userSchema.statics.register = function(newUser, cb){
  var temp = newUser.password;
  User.findOne({email: newUser.email}, function(err, existingUser){
    if (err || existingUser) return cb(err || 'Sorry, that email address has already been registered.');
    bcrypt.genSalt(10, function(err1, salt){
      bcrypt.hash(newUser.password, salt, function(err2, hash){
        if(err1 || err2) return cb(err1 || err2);
        newUser.password = hash;
        var user = new User(newUser);
        user.save(function(err, savedUser){
          savedUser.password = temp;
          cb(err, savedUser);
        });
      });
    });
  });
}



User = mongoose.model('User', userSchema);

module.exports = User;
