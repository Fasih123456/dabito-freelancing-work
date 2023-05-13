const axios = require("axios");
const express = require("express");
const router = express.Router();
const Tweets = require("../models/Tweets");

//This function check
router.get("/usersfollowing/:id", async (req, res) => {
  const id = req.params.id; // Get the user ID from the request parameters
  const tweetId = 164 + req.query.tweetId; // Get the tweetId from the query parameters

  //console.log("params", req.params);

  const shortTweetId = tweetId.slice(3); //All our database tweets are stored as shortTweets

  //console.log("tweetId", shortTweetId);

  //8419084504272897

  const Tweet = await Tweets.getTweetById(shortTweetId);
  console.log(Tweet);

  const Requirements = Tweet[0].requirements;
  let message = "All requirements met";

  //console.log(id);
  //console.log(tweetId);
  console.log(`https://api.twitter.com/2/tweets/${tweetId}/retweeted_by`);

  let isVerified = false;
  let maxCapacityReached = Tweet[0].winners_so_far >= Tweet[0].max_winners;

  const YOUR_TWITTER_BEARER_TOKEN =
    "AAAAAAAAAAAAAAAAAAAAAFtUmAEAAAAAFiQy1WXpS%2BezO4LoW1Kel5uO4sE%3D3Ipt0uQnEE82eeXMUnlEPp4tidYhYL1Likop5SJaTYkN167oSw";

  try {
    let response;

    if (Requirements.mustHaveMinFollowers == true && !maxCapacityReached) {
      console.log(`Followers requirement of ${Requirements.minFollowers}`);
      //If yes then check if user has enough followers
      response = await axios.get(`https://api.twitter.com/2/users/${id}/followers`, {
        headers: {
          Authorization: `Bearer ${YOUR_TWITTER_BEARER_TOKEN}`,
          "Content-Type": "application/json",
          "User-Agent": "YourApp/1.0.0", // Set your app's user agent here
        },
      });

      isVerified = response.data.meta.result_count >= Requirements.minimumFollowers;
      //If not send back error message
      if (!isVerified) {
        message = "Not enough followers";
      }
    } else {
      console.log("No followers requirement");
    }

    console.log(tweetId);

    if (Requirements.mustLikeLink == true && !maxCapacityReached) {
      console.log("Like requirement");
      //If yes check if user has liked the Tweet
      response = await axios.get(`https://api.twitter.com/2/tweets/${tweetId}/liking_users`, {
        headers: {
          Authorization: `Bearer ${YOUR_TWITTER_BEARER_TOKEN}`,
          "Content-Type": "application/json",
          "User-Agent": "YourApp/1.0.0", // Set your app's user agent here
        },
      });

      //console.log(response.data);

      if (response.data.meta.result_count == 0) {
        isVerified = false;
      } else {
        isVerified = response.data.data.some((user) => user.id == id);
      }

      //console.log(id);

      if (!isVerified) {
        message = "Not liked tweet";
      }
    } else {
      console.log("No like requirement");
    }

    if (Requirements.mustQuoted == true && !maxCapacityReached) {
      //The comment is actually for Qouted tweets
      console.log("Comment requirement");
      //Check if user has commented on tweet
      response = await axios.get(
        `https://api.twitter.com/2/tweets/${tweetId}/quote_tweets?max_results=55&expansions=author_id`,
        {
          headers: {
            Authorization: `Bearer ${YOUR_TWITTER_BEARER_TOKEN}`,
            "Content-Type": "application/json",
            "User-Agent": "YourApp/1.0.0", // Set your app's user agent here
          },
        }
      );

      let foundUser = false;
      let thisUser;
      console.log("User id", id);
      console.log(response.data);
      while (!foundUser) {
        const quoteTweets = response.data.data;
        const next_token = response.data.meta.next_token || "";
        foundUser = quoteTweets.some((quoteTweet) => quoteTweet.author_id === 1512373759851868162);
        thisUser = quoteTweets.find((quoteTweet) => quoteTweet.author_id == 1512373759851868162);

        if (next_token == undefined || next_token == "") break;

        if (!foundUser && next_token !== "") {
          response = await axios.get(
            `https://api.twitter.com/2/tweets/${tweetId}/quote_tweets?max_results=55&next_token=${next_token}&expansions=author_id`,
            {
              headers: {
                Authorization: `Bearer ${YOUR_TWITTER_BEARER_TOKEN}`,
                "Content-Type": "application/json",
                "User-Agent": "YourApp/1.0.0", // Set your app's user agent here
              },
            }
          );
        }
      }
      console.log(thisUser);
      //console.log(response.data.data);

      if (thisUser == undefined) {
        message = "Not Quoted on tweet";
      } else {
        //Check for banned phrases
        if (Requirements.bannedPhrases !== "") {
          const bannedPhrasesFound = thisUser.text.includes(Requirements.bannedPhrases);

          if (bannedPhrasesFound) {
            message = "One or More Banned Phrases has been found";
          }
        }

        //Check for required phrases
        if (Requirements.requiredPhrases !== "") {
          const requiredPhrasesFound = thisUser.text.includes(Requirements.requiredPhrases);

          if (!requiredPhrasesFound) {
            message = "All Required Phrases not found";
          }
        }

        //Check for minimum character count
        if (Requirements.minCommentWords !== 0) {
          if (thisUser.text.length < Requirements.minCommentWords) {
            message = "Not enough characters in comment";
          }
        }
      }
    } else {
      console.log("No comment requirement");
    }

    console.log(message);
    res.status(200).json({ message: message });
  } catch (error) {
    // Handle any errors that occurred during the API request
    console.error("Error fetching users following:", error);
    res.status(500).json({ error: "Failed to fetch users following" });
  }
});

//This function checks weather a tweet has been qouted, if it has then does it follow the requirements
router.get("retweet/:id", async (req, res) => {
  const id = req.params.id; // Get the user ID from the request parameters
  const tweetId = req.query.tweetId; // Get the tweetId from the query parameters
  const hasQuotes = req.query.hasQuotes || false; // Get the hasQuotes from the query parameters
  const bannedPhrases = req.query.bannedPhrases || ""; // Get the bannedPhrases from the query parameters
  const requiredPhrases = req.query.requiredPhrases || ""; // Get the requiredPhrases from the query parameters
  const minimumCharacterCount = req.query.minimumCharacterCount || 0; // Get the minimumCharacterCount from the query parameters

  console.log(id);
  console.log(tweetId);

  const YOUR_TWITTER_BEARER_TOKEN =
    "AAAAAAAAAAAAAAAAAAAAAFtUmAEAAAAAFiQy1WXpS%2BezO4LoW1Kel5uO4sE%3D3Ipt0uQnEE82eeXMUnlEPp4tidYhYL1Likop5SJaTYkN167oSw";

  try {
    let isVerified = false;
    if (!hasQuotes) {
      res.status(200).json({ message: "Verification completed" });
    }

    const response = await axios.get(
      `https://api.twitter.com/2/tweets/${tweetId}/quote_tweets?max_results=55`,
      {
        headers: {
          Authorization: `Bearer ${YOUR_TWITTER_BEARER_TOKEN}`,
          "Content-Type": "application/json",
          "User-Agent": "YourApp/1.0.0", // Set your app's user agent here
        },
      }
    );
    //Start verifying the qoutes
    let foundUser = false;
    while (!foundUser && response.data.meta.next_token) {
      const quoteTweets = response.data.data;
      const next_token = response.data.meta.next_token || "";
      foundUser = quoteTweets.some((quoteTweet) => quoteTweet.id === id);

      if (!foundUser && next_token !== "") {
        response = await axios.get(
          `https://api.twitter.com/2/tweets/${tweetId}/quote_tweets?max_results=55&next_token=${next_token}`,
          {
            headers: {
              Authorization: `Bearer ${YOUR_TWITTER_BEARER_TOKEN}`,
              "Content-Type": "application/json",
              "User-Agent": "YourApp/1.0.0", // Set your app's user agent here
            },
          }
        );
      }
    }

    if (!foundUser) {
      res.status(200).json({ message: "Verification not completed" });
    }

    //Check for banned phrases
    if (bannedPhrases !== "") {
      const bannedPhrasesArray = bannedPhrases.split(",");
      const bannedPhrasesFound = bannedPhrasesArray.some((phrase) =>
        response.data.text.includes(phrase)
      );

      if (bannedPhrasesFound) {
        res.status(200).json({ message: "One or More Banned Phrases has been found" });
      }
    }

    //Check for required phrases
    if (requiredPhrases !== "") {
      const requiredPhrasesArray = requiredPhrases.split(",");
      const requiredPhrasesFound = requiredPhrasesArray.some((phrase) =>
        response.data.text.includes(phrase)
      );

      if (!requiredPhrasesFound) {
        res.status(200).json({ message: "All Required Phrases not found" });
      }
    }

    //Check for minimum character count
    if (minimumCharacterCount !== 0) {
      if (response.data.text.length < minimumCharacterCount) {
        res.status(200).json({ message: "Minimum Character Count not maintained" });
      }
    }

    res.status(200).json({ message: "Verification completed" });
  } catch (error) {
    // Handle any errors that occurred during the API request
    console.error("Error fetching users following:", error);
    res.status(500).json({ error: "Failed to fetch users following" });
  }
});

module.exports = router;
