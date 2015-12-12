'use strict';

var express = require('express');
var router = express.Router();

var auth = require('../config/auth');
var User = require('../models/user');

router.get('/', function(req, res, next) {
  User.find({}, function(err, users){
    // res.render('worldmap', {users: users});
    res.send(users)
  });
});




module.exports = router;
