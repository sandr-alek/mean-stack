const express = require('express');
const router = express.Router();
const dbConfig = require('../config/db');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.post('/register', (req, res, next) => {
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

router.post('/login', (req, res, next) => {
  const username = req.body.name;
  const password = req.body.password;

  User.getUserByName(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: 'User not found' });
    }
    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign({ data: user }, dbConfig.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: `Bearer ${token}`,
          user: {
            id: user._id,
            name: user.name,
            email: user.email
          }
        });
      } else {
        return res.json({ success: false, msg: 'Wrong password' });
      }
    });
  });
});

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  res.json({ user: req.user });
});

module.exports = router;
