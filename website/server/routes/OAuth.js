//This file handles all OAtuh routes

const express = require("express");
const router = express.Router();
const session = require("express-session");
const passport = require("passport");
const TwitterStrategy = require("passport-twitter").Strategy;
require("dotenv").config();

const TWITTER_API_KEY = process.env.TWITTER_API_KEY;
const TWITTER_API_SECRET_KEY = process.env.TWITTER_API_SECRET_KEY;
const TWITTER_CONSUMER_KEY = "BIH8KotWI2JlTJML8CKllMj6S";
const TWITTER_CONSUMER_SECRET = "2RYzsLWTOqO9RwN0XJGmd40q1i7v6Jc0ylkz47LTrS7FaJHIV2";

console.log(TWITTER_CONSUMER_KEY);
console.log(TWITTER_CONSUMER_SECRET);

router.use(
  session({
    secret: "somerandomlylongstirngoffaslkfhaslkhf",
    resave: false,
    saveUninitialized: true,
  })
);

router.use(passport.initialize());
router.use(passport.session());

passport.use(
  new TwitterStrategy(
    {
      consumerKey: TWITTER_CONSUMER_KEY,
      consumerSecret: TWITTER_CONSUMER_SECRET,
      callbackURL: "http://localhost:3001/oauth/twitter/callback",
    },
    function (token, tokenSecret, profile, cb) {
      console.log(`Creating user ${profile.id}...`);
      // Set the profile object on req.user
      cb(null, { id: profile.id, profile: profile });
    }
  )
);

// Middleware function to set req.user
router.use((req, res, next) => {
  if (req.user) {
    res.locals.user = req.user.profile;
  }
  next();
});

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

router.get("/oauth/twitter", async (req, res, next) => {
  passport.authenticate("twitter")(req, res, next);
});

// Route to return the profile ID
router.get("/api/profile", (req, res) => {
  res.json({ profileId: req.user });
});

router.get("/logout", (req, res) => {
  req.logout(() => {
    // Your callback logic goes here
    res.redirect("http://localhost:3000");
  });
});

router.get(
  "/oauth/twitter/callback",
  async (req, res, next) => {
    passport.authenticate("twitter", { failureRedirect: "/" })(req, res, next);
  },
  function (req, res) {
    res.redirect("http://localhost:3000");
  }
);

module.exports = router;
