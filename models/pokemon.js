'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('../models/user');

var Pokemon;

var pokemonSchema = Schema({
  name: { type: String, required: true},
  image: { type: String},
	pendingTrade: { type: Boolean, default: false},
  owner: { type: String, ref: 'User'}
});

// pokemonSchema.methods.addToUser = function(username){
//   User.findOne({username: username}).populate('pokemon').exec(function(err, user){
//     console.log('user', user);
//     user.pokemon.push(this);
//     user.save();
//   });
// }
//
// pokemonSchema.statics.create = function(newPokemon, cb){
//   var pokemon = new Pokemon;
//   pokemon.name = newPokemon.name;
//   pokemon.image = newPokemon.image;
//
//   pokemon.save(function(err, savedPokemon){
//     cb(err, savedPokemon);
//   })
// }

pokemonSchema.statics.addToUser = function(pokemon, username, cb){
  User.findOne({username: username}, function(err, user){
    console.log('before crete', pokemon)
    pokemon.owner = username;
    var newPokemon = new Pokemon(pokemon);
    console.log('after New', newPokemon)
    user.pokemon.push(newPokemon);
    user.save(function(err, savedUser){
      console.log(savedUser)
      cb(err, savedUser);
    });

  })
}

Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;
