const express = require("express");
const router = express.Router();
const RaidersModel = require("../models/Raiders");
const TweetsModal = require("../models/Tweets");
const axios = require("axios");

//This is the route which will handle accepting tweets and verfying they are added to the database
router.post("/api/accept", async (req, res, next) => {
  //console.log(req.body);
  const raider_id = req.body.raider_id;
  const short_raider_id = raider_id.slice(0, 8);

  const accepted_tweet_id = req.body.accepted_tweet_id;
  let user_id;

  const completion_time = "0"; //User has not completed the tweet yet
  const completion_status = "Pending";
  let message = "Raider contract accepted";
  let saveTweet = true;

  //We need to make sure this raider has not completed this already
  //console.log(short_raider_id, accepted_tweet_id);
  let response = await RaidersModel.getAlreadyCompletedTweets(short_raider_id, accepted_tweet_id);
  console.log("response", response[0]);

  if (response == "Completed") {
    message = "Tweet already completed";
    saveTweet = false;
  }

  response = await RaidersModel.getTweetAlreadyInProgress(short_raider_id, accepted_tweet_id);
  console.log("response", response[0]);

  if (response == "Accepted") {
    message = "Tweet already accepted";
    saveTweet = false;
  }

  if (saveTweet) {
    const raider = new RaidersModel(
      raider_id,
      accepted_tweet_id,
      completion_time,
      completion_status
    );
    raider.save();
  }

  res.status(200).json({ message: message });
});

router.get("/api/getAcceptedTweets/:raider_id", (req, res) => {
  const raider_id = req.params.raider_id;

  const newId = raider_id.slice(0, 8);

  RaidersModel.getAcceptedTweets(newId).then(([rows, fieldData]) => {
    console.log(rows);
    res.status(200).json(rows);
  });
});

router.put("/api/updateRaider/:raiderId", function (req, res, next) {
  const raider_id = req.params.raiderId;
  console.log(req.params); //this contains { raiderId: '1631268015512727552' }
  const tweet_id = req.query.tweetId; // Access query parameter instead of req.body

  const newId = raider_id.slice(0, 8);

  console.log("updateRaiderStatus: " + newId + " " + tweet_id);

  TweetsModal.updateTweetWinners(tweet_id).then(([rows, fieldData]) => {
    console.log(rows);
  });

  RaidersModel.updateRaiderStatus(newId, tweet_id).then(([rows, fieldData]) => {
    console.log(rows);
    res.status(200).json({ message: "Tweet updated successfully" });
  });
});

module.exports = router;
