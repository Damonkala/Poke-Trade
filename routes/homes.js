'use strict';

var express = require('express');
var router = express.Router();
var auth = require('../config/auth');

var User = require('../models/user');

router.get('/:id', auth, function(req, res){
  console.log('id', req.params.id);
  res.render('home');
})

module.exports = router;
