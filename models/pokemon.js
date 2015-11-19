'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('../models/user');

var Pokemon;

var pokemonSchema = Schema({
  name: { type: String, required: true},
  image: { type: String},
	pendingTrade: { type: Boolean, default: false}
});

pokemonSchema.methods.addToUser = function(username){
  console.log('inside method', this)
  // User.update({username: username}, {pokemon: {$push: this}}, function(err, user){
  //   console.log('pokemon added to user', user);
  // })

  User.findOne({username: username}).populate('pokemon').exec(function(err, user){
    console.log('user', user);
    user.pokemon.push(this);
    user.save();
  });
}

pokemonSchema.statics.create = function(newPokemon, cb){
  var pokemon = new Pokemon;
  pokemon.name = newPokemon.name;
  pokemon.image = newPokemon.image;

  pokemon.save(function(err, savedPokemon){
    cb(err, savedPokemon);
  })
}

Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;
