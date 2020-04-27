var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Vajra Yoga' });
});

/* The root route renders our only view */

/* Google OAuth login route */
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

/* Google OAuth callback route */
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/yogis/profile',
    failureRedirect : '/yogis' //iceBox redirect to a failure page
  }
));

/* OAuth logout route */
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/yogis');
});

module.exports = router;
