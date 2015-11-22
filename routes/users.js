'use strict';

var express = require('express');
var router = express.Router();
var authorize = require('../config/auth');

var User = require('../models/user');
var Pokemon = require('../models/pokemon');

router.post('/update', authorize, function(req, res){
  if (req.body.name){
    User.update({_id: req.user._id}, {$set: {name: req.body.name}}, function(err, raw){
      if (err) return res.status(400).send(err);
    });
  }
  if (req.body.pokemon){
    Pokemon.findUserAndAddPokemon(req.user, req.body.pokemon, function(err, savedPokemon){
      res.send(req.user);
    })
  }
})

router.get('/start/:id', authorize, function(req, res){
  res.render('start');
});

router.post('/register', function(req, res){
  User.register(req.body, function(err, savedUser){
    if (err) return res.status(400).send(err);
    savedUser.login(function(err, authUser){
      if (err) return res.status(400).send(err);
      var token = authUser.generateToken();
      res.cookie('token', token);
      res.send(authUser);
    });
  });
});

router.post('/login', function(req, res){
  User.authenticate(req.body, function(err, authUser){
    if (err) return res.status(400).send(err);
    var token = authUser.generateToken();
    res.cookie('token', token);
    res.send(authUser);
  });
});

router.post('/logout', authorize, function(req, res){
  res.clearCookie('token');
  res.send('Logging out');
})


module.exports = router;
