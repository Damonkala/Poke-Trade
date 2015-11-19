'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var User = require('../models/user')

var Trade;

var tradeSchema = Schema({
  homeownerId: { type: String, required: true},
  homePokemon: { type: String, required: true},
  guestId: { type: String, required: true},
  guestPokemon: { type: String, required: true}
});



tradeSchema.statics.create = function(trade, cb){
  var newTrade = new Trade();

  newTrade.homeownerId = trade.homeownerId;
  newTrade.homePokemon = trade.homePokemon;
  newTrade.guestId = trade.guestId;
  newTrade.guestPokemon = trade.guestPokemon;
  console.log("Trade Schema: ", newTrade.guestId)

  newTrade.save(function(err, savedTrade){
    cb(err, savedTrade);
  })
  // User.findById(homeownerId, function(err, homeowner){
  //   if (err) return res.status(400).send(err);
  // })

}

Trade = mongoose.model('Trade', tradeSchema);

module.exports = Trade;
