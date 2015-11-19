'use strict';

var express = require('express');
var router = express.Router();
var Trade = require('../models/trade')

/* GET home page. */
router.post('/', function(req, res) {
	console.log(req.body);
  Trade.create(req.body, function(err, newTrade){
		if (err) return res.status(400).send(err)
		console.log(newTrade);
		newTrade.removePokemon()
		res.send(newTrade);
	})
});

router.post('/accept/:id', function (req, res) {
	console.log(req.params.id);
	Trade.accept(req.params.id, function(err, trade) {
		var guestPokemon = trade.guestPokemon;
			console.log(req.params.id);
		Trade.findByIdAndRemove(JSON.parse(req.params.id), function(err, removed){
			console.log("REMOVED:", removed);
			res.send(guestPokemon);
		})
	})
})


module.exports = router;
