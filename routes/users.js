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

module.exports = router;
