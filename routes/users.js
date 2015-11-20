'use strict';

var express = require('express');
var router = express.Router();
var authorize = require('../config/auth');

var User = require('../models/user');
var Pokemon = require('../models/pokemon');

router.post('/update', authorize, function(req, res){
  console.log('body', req.body)
  console.log('user', req.user)
  if (req.body.name){
    User.update({_id: req.user._id}, {$set: {name: req.body.name}}, function(err, raw){
      if (err) return res.status(400).send(err);
      console.log('user name updated', raw);
    });
  }
  if (req.body.pokemon){
    console.log('here', req.body.pokemon, req.user);
    Pokemon.findUserAndAddPokemon(req.user, req.body.pokemon, function(err, savedPokemon){
      console.log(savedPokemon);
      res.send(req.user);
    })
  }
})

router.get('/start/:id', authorize, function(req, res){
  console.log('go to start:', req.user);
  res.render('start')
});

router.post('/register', function(req, res){
  User.register(req.body, function(err, savedUser){
    if (err) return res.status(400).send(err);
    savedUser.login(function(err, authUser){
      if (err) return res.status(400).send(err);
      var token = authUser.generateToken();
      res.cookie('token', token);
      res.send(authUser);
    })
  });
});


module.exports = router;
