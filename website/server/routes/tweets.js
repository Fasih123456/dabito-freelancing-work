const express = require("express");
const router = express.Router();
const Tweets = require("../models/Tweets");
const moment = require("moment");
const Users = require("../models/Users");

router.post("/api/tweets/:id", (req, res) => {
  const id = req.params.id.substring(0, 8);
  //console.log("id", id);
  const body = req.body;
  //console.log(body);

  const currentTimeStamp = moment().format("YYYY-MM-DD HH:mm:ss");
  const expireTimeStamp = moment(currentTimeStamp)
    .add(req.body.time, "hours")
    .format("YYYY-MM-DD HH:mm:ss");

  //TODO: create a random number tweet id
  //TODO: validtill is body.time + 1 week, (maximum of 1 month)
  const requirements = {
    mustComment: req.body.mustComment || "",
    mustForward: req.body.mustForward || "",
    mustLikeLink: req.body.mustLikeLink || "",
    mustHaveMinFollowers: req.body.mustHaveMinFollowers || "",
    minimumFollowers: req.body.minimumFollowers || "",
    mustHaveMinComment: req.body.mustHaveMinComment || "",
    commentCount: req.body.commentCount || "",
  };

  let tweet = new Tweets(
    req.body.targetTweetId,
    id,
    req.body.title,
    0,
    req.body.time,
    req.body.winners,
    req.body.reward,
    0,
    requirements,
    currentTimeStamp,
    expireTimeStamp,
    0,
    "EMPTY"
  );

  console.log(tweet);

  tweet.save();
  res.status(200).json({ message: "Tweet created successfully" });
});

router.get("/api/tweets", (req, res) => {
  Tweets.getAllTweetsUnfiltered().then(([rows, fieldData]) => {
    //console.log(rows);
    res.status(200).json(rows);
  });
});

router.get("/api/tweets/:id", (req, res) => {
  const id = req.params.id.substring(0, 8);
  //console.log("id", id);

  Tweets.getAllTweets(id).then(([rows, fieldData]) => {
    //console.log(rows);
    res.status(200).json(rows);
  });
});

router.delete("/api/deleteTweet/:tweetId", function (req, res, next) {
  const tweetId = req.params.tweetId;
  //console.log(tweetId);

  Tweets.deleteTweet(tweetId).then(([rows, fieldData]) => {
    //console.log(rows);
    res.status(200).json({ message: "Tweet deleted successfully" });
  });
  // your code to delete the tweet
});

router.put("/api/updateTweet/:tweetId", function (req, res, next) {
  const tweetId = req.params.tweetId;
  //console.log(tweetId);
  const body = req.body;
  //console.log(body);
  let tweet = new Tweets(tweetId, body.userid, body.title, body.reward, body.time, body.winners);
  tweet.updateTweet();
});

router.get("/api/featuredTweets", (req, res) => {
  Tweets.getFeaturedTweets().then(([rows, fieldData]) => {
    //console.log(rows);
    res.status(200).json(rows);
  });
});

router.get("/api/communitytweets/:communityName", (req, res) => {
  const communityName = req.params.communityName;
  //console.log(communityName);
  Tweets.getCommunityTweets(communityName).then(([rows, fieldData]) => {
    //console.log(rows);
    res.status(200).json(rows);
  });
});

//We get the userid using the tweet id
router.get("/api/getTweeterId/:tweetId", (req, res) => {
  const tweetId = req.params.tweetId;

  console.log(tweetId);
  Tweets.getTweetIdFromTweeterId(tweetId).then(([rows, fieldData]) => {
    res.status(200).json(rows);
  });
});

module.exports = router;
