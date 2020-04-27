var express = require('express');
var router = express.Router();
var flowsCtrl = require('../controllers/flows');

// list of all the flows
router.get('/', flowsCtrl.index);

// form for creating a new flow
router.get('/new', flowsCtrl.new);

// post route for creating a new flow
router.post('/', flowsCtrl.create);

// show route to display details of one flow
// router.get('/:id', flowsCtrl.show);

// Insert this middleware for routes that require a logged in user
const isLoggedIn = (req, res, next) => {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  };


module.exports = router;