const Yogi = require('../models/yogi');
const Asana = require('../models/asana');

module.exports = {
  index,
  addPose,
  delPose,
};

function index(req, res, next) {
  console.log("current user (req.user)", req.user)
  console.log(req.user.id, req.user._id)

  Yogi.
  findOne({_id: req.user.id}).then( (yogi) => {
    console.log(yogi);
  })


  // this isn't finding the yogi, even though we can see the user in line 12
  // Yogi.
  // findOne({_id: req.user.id}).
  // populate('flows').
  // exec(function (err, foundYogi) {
  //   // if (err) return handleError(err);
  //   console.log('The yogi is', foundYogi);
  //   Asana.find({createdBy: req.user._id}, (err, foundAsanas) => {
  //     console.log("foundAsanas:", foundAsanas)
  //     res.render('yogis/profile', {
  //       yogi: foundYogi,
  //       asanas: foundAsanas
  //     })
  //   })
  // });


  // console.log(req.query)
  // // Make the query object to use with Yogi.find based up
  // // the user has submitted the search form or now
  // let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
  // // Default to sorting by name
  // let sortKey = req.query.sort || 'name';
  // Yogi.find(modelQuery)
  // .sort(sortKey).exec(function(err, yogis) {
  //   if (err) return next(err);
  //   // Passing search values, name & sortKey, for use in the EJS
  //   res.render('yogis/index', { 
  //     yogis,
  //     user: req.user,
  //     name: req.query.name,
  //     sortKey 
  //   });
  // });
}

function addPose(req, res, next) {
  const newAsana = new Asana(req.body);
  console.log(newAsana);
  req.user.flows.push(newAsana);
  req.user.save( (err) => {
    res.redirect("/yogis");
  }); 
}

function delPose(req, res, next) {
  Yogi.findOne({ "flows._id": req.params.id }, 
  (err, yogi) => {
    yogi.flows.id(req.params.id).remove();
    yogi.save( (err) => {
      res.redirect("/yogis");
    });
  });
}
