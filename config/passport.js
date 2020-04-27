var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var Yogi = require('../models/yogi');

passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK,
      },
      function (accessToken, refreshToken, profile, cb) {
        // a user has logged in with OAuth...
        Yogi.findOne({ googleId: profile.id }, function (err, yogi) {
          if (err) return cb(err);
          if (yogi) {
            return cb(null, yogi);
          } else {
            console.log(profile);
            // we have a new yogi via OAuth!
            var newYogi = new Yogi({
              name: profile.displayName,
              email: profile.emails[0].value,
              googleId: profile.id,
            });
            newYogi.save(function (err) {
              if (err) return cb(err);
              return cb(null, newYogi);
            });
          }
        });
      }
    )
  );

  passport.serializeUser(function (yogi, done) {
    done(null, yogi.id);
  });
  
  passport.deserializeUser(function (id, done) {
    Yogi.findById(id, function (err, yogi) {
      done(err, yogi);
    });
  });