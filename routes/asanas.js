var express = require('express');
var router = express.Router();
var asanasCtrl = require('../controllers/asanas');

// list of all the asanas
router.get('/', asanasCtrl.index);

// form for creating a new asana
router.get('/new', asanasCtrl.new);

// post route for creating a new asana
router.post('/', asanasCtrl.create);

// show route to display details of one asana
// router.get('/:id', asanasCtrl.show);

// Insert this middleware for routes that require a logged in user
// const isLoggedIn = (req, res, next) => {
//     if ( req.isAuthenticated() ) return next();
//     res.redirect('/auth/google');
//   };


module.exports = router;
