var express = require('express');
var router = express.Router();
var authorize = require('../config/auth');

var User = require('../models/user')

/* GET home page. */
router.get('/:id', authorize, function(req, res) {
  User
    .findById(req.params.id)
    .populate({
      path: 'pokemons',
      match: {owner: req.params.id}
    })
    .exec(function(err, user){
      console.log('populated user?', user);
      res.render('home', {user: user});
    })
});

module.exports = router;
