var express = require('express');
var router = express.Router();
var authorize = require('../config/auth');

var User = require('../models/user')

router.get('/world', authorize, function(req, res){
  User.find({}, function(err, users){
    if (err) res.send(err);
    console.log(req.user._id);
    res.render('world', {users: users, me: req.user});
  });
});

router.get('/:id', authorize, function(req, res) {
  User
    .findById(req.params.id)
    .populate({
      path: 'pokemons',
      match: {owner: req.params.id}
    })
    .exec(function(err, user){
      console.log('populated user?', user);
      res.render('home', {user: user, me: req.user});
    })
});


module.exports = router;
