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
  guestName: { type: String, required: true},
  guestPokemon: { type: String, required: true}
});

// tradeSchema.methods.removeGuestPokemon = function(){
//   console.log("New Trade Guest ID:", this);
// }
tradeSchema.methods.removePokemon = function(){
  // User.update({ _id: JSON.parse(this.guestId)}, { startPokemon: undefined}, function(err, updatedUser){
  //   console.log(updatedUser);
  // })
  User.update({ _id: JSON.parse(this.homeownerId)}, { tradesPending: true}, function(err, updatedUser){
    console.log(updatedUser);
  })
}
// tradeSchema.methods.notifyHomeowner = function(){
//   User.update({})
//   // User.findById(newTrade.homeownerId, function(err, homeowner){
//   //   homeowner.tradesPending = true;
//   //   homeowner.save (function(err, savedHomeowner){
//   //     cb(err, savedHomeowner);
//   //   });
//   // })
// }

tradeSchema.statics.create = function(trade, cb){
  var newTrade = new Trade();

  newTrade.homeownerId = trade.homeownerId;
  newTrade.homePokemon = trade.homePokemon;
  newTrade.guestId = trade.guestId;
  newTrade.guestName = trade.guestName;
  newTrade.guestPokemon = trade.guestPokemon;
  console.log("Trade Schema: ", newTrade.guestId)

  newTrade.save(function(err, savedTrade){
    cb(err, savedTrade);
  })
}


Trade = mongoose.model('Trade', tradeSchema);

module.exports = Trade;
