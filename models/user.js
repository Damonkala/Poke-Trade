'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');

var User;

var userSchema = Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  startPokemon: {type: String, required: true },
  // pokemon: [{ type: schema.Types.ObjectId, ref: "Pokemon"}]
  // outgoingTrade:
  // incomingTrade:

  // click trade
  // user = Rich, char     tradingpartner = Bob, bulb
  // 1) pull charmander from Rich pokemon
  // 2) put charmander in outgoingTrade
  //    - charmander
  //    - bobId
  //    - bulbasaur
  // 3) find bob in DB
  //    - User.find(bob)
  //    - pull bulbasaur from Bob pokemon
  //    - populate incomingTrade
  //      - charmander
  //      - richId
  //      - bulbasaur
  // 4) Case 1 = bob accepts charmander
  //    - bob:
  //      - charmder to bob pokemon
  //      - clear incomingTrade for bob
  //    - rich:
  //      -bulbasaur to rich pokemon
  //      -clear outgoingTrade
  // 5) Case 2 = bob declines charmander
  //    - bob:
  //      - bulbasaur to bob pokemon
  //      - clear incomingTrade for bob
  //    - rich:
  //      -charmander to rich pokemon
  //      -clear outgoingTrade
  //
});

userSchema.methods.token = function(){
  var payload = {
    username: this.username,
    _id: this._id
  }
  var secret = process.env.JWT_SECRET;
  var token = jwt.encode(payload, secret);
  return token;
}

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

userSchema.statics.authenticate = function(inputUser, cb){
  User.findOne({username: inputUser.username}, function(err, dbUser){
    if (err || !dbUser) return cb(err || 'Incorrect username or password');
    bcrypt.compare(inputUser.password, dbUser.password, function(err, success){
      if (err || !success) return cb(err || 'Incorrect username or password');
      dbUser.password = null;
      cb(null, dbUser);
    });
  });
};

User = mongoose.model('User', userSchema);

module.exports = User;
