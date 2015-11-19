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
    // if(req.authenticateduser.tradesPending){
    //   Trade.getTradeInfo(req.)
    // }

    console.log('top')
    res.render('home', {user: req.authenticateduser});
    // res.render('index', {title: 'Poke-Trade' });
  } else {
    // go to guest home
    User.findOne({username: req.params.id}, function(err, guestUser){
      //error check
      console.log('bottom', guestUser)
      // res.render('home', {user: guestUser})
    res.render('visit', {user: req.authenticateduser, homeowner: guestUser})
    });
  }
});
//
// router.get('/:id/home', function(req, res){
//
// })

module.exports = router;
