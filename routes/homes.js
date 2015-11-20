'use strict';

var express = require('express');
var router = express.Router();
var auth = require('../config/auth');

var User = require('../models/user');
var Trade = require('../models/trade');

router.get('/:id', auth, function(req, res){
  if (req.authenticateduser.username === req.params.id){
    // go to user's home
    User.findOne({username: req.authenticateduser.username})
      .populate('pokemon').exec(function(err, user){
        console.log('here', user);
        Trade.find({homeownerId: JSON.stringify(req.authenticateduser._id)}, function(err, tradeInfo){
          if(err) return res.status(400).send(err);
          if(!tradeInfo) return res.render('home', {user: user});
          console.log('there', user);
          res.render('home', {user: user, trade: tradeInfo});
        });

      })


  } else {
    // go to guest home
    // User.findOne({username: req.params.id}, function(err, guestUser){
    //   res.render('visit', {user: req.authenticateduser, homeowner: guestUser})
    // });
  User.findOne({username: req.authenticateduser.username})
    .populate('pokemon').exec(function(err, enterUser){
      User.findOne({username: req.params.id})
        .populate('pokemon').exec(function(err, guestUser){
          res.render('visit', {user: enterUser, homeowner: guestUser})
});
})
}
})
module.exports = router;
