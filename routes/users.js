var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Pokemon = require('../models/pokemon');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function(req, res){
  console.log(req.body);
  User.register(req.body, function(err, newUser){
    // redirect to user home
    console.log(newUser);
    res.send(newUser);
  });
});

router.post('/login', function(req, res){
  User.authenticate(req.body, function(err, user){
    if (err) return res.status(400).send(err);
    var token = user.token();
    res.cookie('token', token)
    res.send(user)

  });
});

router.post('/logout', function(req,res){
  res.clearCookie('token')
  res.send();
});

router.post('/pokemon/:username', function(req, res){
  Pokemon.create(req.body, function(err, pokemon){
    pokemon.addToUser(req.params.username);
    res.send(pokemon);
  })
})

module.exports = router;
