'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');

var Pokemon;

var pokemonSchema = Schema({
  name: { type: String, required: true},
	pendingTrade: { type: Boolean, default: false}
});

Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;
