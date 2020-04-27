var Asana = require('../models/asana');


module.exports = {
  index,
  show,
  new: newAsana,
  create
};

function index(req, res) {
  Asana.find({}, function(err, asanas) {
    res.render('asanas/index', { title: 'All Asanas', asanas });
  });
}

function show(req, res) {
  console.log('hello !');
  // Asana.findById(req.params.id)
  // .populate('cast').exec(function(err, movie) {
  //   // Performer.find({}).where('_id').nin(movie.cast)
  //   Performer.find({_id: {$nin: movie.cast}})
  //   .exec(function(err, performers) {
  //     console.log(performers);
  //     res.render('movies/show', {
  //       title: 'Movie Detail', movie, performers
  //     });
  //   });
  // });
}

function newAsana(req, res) {
  res.render('asanas/new', { title: 'Add Asana' });
}

function create(req, res) {
  // convert nowShowing's checkbox of nothing or "on" to boolean
  req.body.nowShowing = !!req.body.nowShowing;
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  var asana = new Asana(req.body);
  asana.save(function(err) {
    if (err) return res.redirect('/asanas/new');
    // res.redirect('/asanas');
    res.redirect(`/asanas/${asana._id}`);
  });
}
