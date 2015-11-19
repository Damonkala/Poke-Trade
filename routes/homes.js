'use strict';

var express = require('express');
var router = express.Router();
var auth = require('../config/auth');

var User = require('../models/user');
var Trade = require('../models/trade');

router.get('/:id', auth, function(req, res){
  // requesting user is authenticated
  // find authenticated users id && /:id
  if (req.authenticateduser.username === req.params.id){
    // go to user's home
      console.log("User ID:", JSON.stringify(req.authenticateduser._id))
    Trade.find({homeownerId: JSON.stringify(req.authenticateduser._id)}, function(err, tradeInfo){

      if(err) return res.status(400).send(err);
      if(!tradeInfo) return res.render('home', {user: req.authenticateduser});
      console.log("Trade: ", tradeInfo);
      res.render('home', {user: req.authenticateduser, trade: tradeInfo});

    })

    // console.log('top')
    // res.render('home', {user: req.authenticateduser});
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
