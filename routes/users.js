var express = require('express');
var router = express.Router();

var User = require('../models/user');

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
    res.send({token: token, user: user})

  });
});

module.exports = router;
