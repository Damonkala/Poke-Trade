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

	})
});




module.exports = router;
