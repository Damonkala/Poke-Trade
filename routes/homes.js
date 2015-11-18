'use strict';

var express = require('express');
var router = express.Router();
var auth = require('../config/auth');

var User = require('../models/user');

router.get('/:id', auth, function(req, res){
  // requesting user is authenticated
  // find authenticated users id && /:id
  if (req.authenticateduser.username === req.params.id){
    // go to user's home
    res.render('home', {user: req.authenticateduser});
  } else {
    // go to guest home
    User.findById(req.params.id, function(err, guestUser){
      //error check
      res.render('home', {user: guestUser})
    });
  }
});

module.exports = router;
