'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('../models/user');

var Pokemon;

var pokemonSchema = Schema({
  name: String,
  owner: {type: Schema.Types.ObjectId, ref:"User"}
});

pokemonSchema.statics.findUserAndAddPokemon = function(user, pokemon, cb){
  user.save(function(err){
    if (err) return cb(err);
    var newPokemon = new Pokemon({
      name: pokemon,
      owner: user._id
    });
    newPokemon.save(function(err){
  console.log('inside find', newPokemon);
      if (err) return cb(err);
      cb(null, newPokemon);
    })
  });
}

Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;
