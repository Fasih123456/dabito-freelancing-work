const express = require("express");
const router = express.Router();
const RaidersModel = require("../models/Raiders");
const axios = require("axios");

//This is the route which will handle accepting tweets and verfying they are added to the database
router.post("/api/accept", (req, res, next) => {
  const raider_id = req.body.raider_id;

  const accepted_tweet_id = req.body.accepted_tweet_id;
  let user_id;

  axios
    .get(`http://localhost:3001/api/getTweeterId/${accepted_tweet_id}`)
    .then((response) => {
      console.log(response.data);
      user_id = response.data[0].tweeter_id;
    })
    .then(() => {
      const completion_time = "0"; //User has not completed the tweet yet
      const completion_status = "Pending";

      const raider = new RaidersModel(
        raider_id,
        user_id,
        accepted_tweet_id,
        completion_time,
        completion_status
      );
      raider.save();
    });
});

router.get("/api/getAcceptedTweets/:raider_id", (req, res) => {
  const raider_id = req.params.raider_id;

  const newId = raider_id.slice(0, 8);

  RaidersModel.getAcceptedTweets(newId).then(([rows, fieldData]) => {
    console.log(rows);
    res.status(200).json(rows);
  });
});

module.exports = router;
