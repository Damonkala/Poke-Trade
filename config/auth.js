'use strict';

var User = require('../models/user');
var jwt = require('jwt-simple');

module.exports = function(req, res, next){
  console.log('headers', req.get('Authorization'));
  next();
}
