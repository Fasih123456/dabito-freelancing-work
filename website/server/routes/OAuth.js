//This file handles all OAtuh routes

const express = require("express");
const router = express.Router();
const session = require("express-session");
const passport = require("passport");
const TwitterStrategy = require("passport-twitter").Strategy;
const Users = require("../models/Users");
require("dotenv").config();

const TWITTER_API_KEY = process.env.TWITTER_API_KEY;
const TWITTER_API_SECRET_KEY = process.env.TWITTER_API_SECRET_KEY;
const TWITTER_CONSUMER_KEY = "MFhTe8ojilLTveO9VElA0lX5o";
const TWITTER_CONSUMER_SECRET = "L2pY0kHYDaYXqJ8Ew6E8fhVUq6ZEA6wHv901JPqW6n9aWT9U7d";

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
      callbackURL: "http://localhost:3001/auth/twitter/callback",
    },
    function (token, tokenSecret, profile, cb) {
      let twitterId = profile.id;
      let newId = twitterId.toString().slice(0, 8);

      let User = new Users(newId, profile.username, 0);
      User.findOrCreate();
      // Set the profile object on req.user
      cb(null, profile);
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

router.get("/auth/twitter", async (req, res, next) => {
  passport.authenticate("twitter")(req, res, next);
});

// Route to return the profile ID
router.get("/api/profile", (req, res) => {
  //console.log(req.session.user);
  res.send(req.session.user);
});

router.get("/auth/logout", (req, res) => {
  req.logout(() => {
    // Your callback logic goes here
    res.redirect("http://localhost:3000");
  });
});

router.get(
  "/auth/twitter/callback",
  async (req, res, next) => {
    passport.authenticate("twitter", { failureRedirect: "/" })(req, res, next);
  },
  function (req, res) {
    // Save user information to session
    req.session.user = req.user;
    res.redirect("http://localhost:3000");
  }
);

module.exports = router;
