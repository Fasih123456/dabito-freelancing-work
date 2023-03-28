const express = require("express");
const router = express.Router();
const Tweets = require("../models/tweets");
const monment = require("moment");

router.post("/api/tweets/:id", (req, res) => {
  const id = req.params.id.substring(0, 8);
  console.log(id);
  const body = req.body;
  console.log(body);

  const future = monment().add(body.time * 7, "days");
  //TODO: create a random number tweet id
  //TODO: validtill is body.time + 1 week, (maximum of 1 month)
  let tweet = new Tweets(
    Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000,
    id,
    body.title,
    body.reward,
    body.time,
    body.winners,
    future
  );
  tweet.save();
  res.status(200).json({ message: "Tweet created successfully" });
});

//TODO: add error handling for 0 rows returned
router.get("/api/tweets/:id", (req, res) => {
  console.log("SENDING TWEETS");
  const id = req.params.id.substring(0, 8);
  console.log(id);
  Tweets.getTweetByUserId(id)
    .then(([rows, fieldData]) => {
      console.log(rows);
      res.status(200).json({ tweets: rows });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/api/deleteTweet/:tweetId", function (req, res, next) {
  const tweetId = req.params.tweetId;
  console.log(tweetId);

  Tweets.deleteTweet(tweetId).then(([rows, fieldData]) => {
    console.log(rows);
    res.status(200).json({ message: "Tweet deleted successfully" });
  });
  // your code to delete the tweet
});

router.put("/api/updateTweet/:tweetId", function (req, res, next) {
  const tweetId = req.params.tweetId;
  console.log(tweetId);
  const body = req.body;
  console.log(body);
  let tweet = new Tweets(tweetId, body.userid, body.title, body.reward, body.time, body.winners);
  tweet.updateTweet();
});

module.exports = router;
