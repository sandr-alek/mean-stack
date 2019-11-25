const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.post('/signup', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({ success: false, msg: 'Failed to SignUp' });
    } else {
      res.json({ success: true, msg: 'SignUp succeeded' });
    }
  });
});

router.post('/signin', (req, res, next) => {
  res.send('Login Page');
});

router.get('/profile', (req, res, next) => {
  res.send('Profile Page');
});

module.exports = router;
