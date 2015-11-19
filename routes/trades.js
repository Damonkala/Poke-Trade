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
		// newTrade.removeHomePokemon(newTrade)
		// newTrade.notifyHomeowner(newTrade)
	})
});

router.post('/accept/:id', function (req, res) {
	console.log(req.params.id);
	Trade.accept(req.params.id, function(err, success) {
		res.send(success);
	})
})


module.exports = router;
