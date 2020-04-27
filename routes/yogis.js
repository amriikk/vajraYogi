var express = require('express');
var router = express.Router();
var yogisCtrl = require('../controllers/yogis');


// Insert this middleware for routes that require a logged in user
const isLoggedIn = (req, res, next) => {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
};

// shows asanas and flows created by logged in yogi
router.get('/', isLoggedIn, yogisCtrl.index);

// list of all the flows
router.get('/profile', isLoggedIn, yogisCtrl.index);

// Insert this middleware for routes that require a logged in user
// const isLoggedIn = (req, res, next) => {
//     if ( req.isAuthenticated() ) return next();
//     res.redirect('/auth/google');
//   };


module.exports = router;