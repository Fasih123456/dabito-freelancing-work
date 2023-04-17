const axios = require("axios");
const express = require("express");
const router = express.Router();

//This function check
router.get("/usersfollowing/:id", async (req, res) => {
  const id = req.params.id; // Get the user ID from the request parameters
  const tweetId = req.query.tweetId; // Get the tweetId from the query parameters
  const minimumFollowerCount = req.query.minimumFollowerCount || 0; // Get the minimumFollowerCount from the query parameters
  const hasCommentRequirements = req.query.hasCommentRequirements || false; // Get the hasCommentRequirements from the query parameters
  const hasLikedTweet = req.query.hasLikedTweet || false; // Get the hasLikedTweet from the query parameters

  console.log(id);
  console.log(tweetId);

  let isVerified = false;

  const YOUR_TWITTER_BEARER_TOKEN =
    "AAAAAAAAAAAAAAAAAAAAAFtUmAEAAAAAFiQy1WXpS%2BezO4LoW1Kel5uO4sE%3D3Ipt0uQnEE82eeXMUnlEPp4tidYhYL1Likop5SJaTYkN167oSw";

  try {
    //Check if user has commented on tweet
    const response = await axios.get(`https://api.twitter.com/2/tweets/${tweetId}/retweeted_by`, {
      headers: {
        Authorization: `Bearer ${YOUR_TWITTER_BEARER_TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": "YourApp/1.0.0", // Set your app's user agent here
      },
    });
    //If not send back error message
    isVerified = response.data.data.some((user) => user.id === id);

    if (!isVerified && hasCommentRequirements) {
      res.status(200).json({ message: "Not commented on tweet" });
    }
    //If yes then check if user has enough followers
    response = await axios.get(`https://api.twitter.com/2/users/${id}/followers`, {
      headers: {
        Authorization: `Bearer ${YOUR_TWITTER_BEARER_TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": "YourApp/1.0.0", // Set your app's user agent here
      },
    });

    isVerified = response.data.meta.result_count >= minimumFollowerCount;
    //If not send back error message
    if (!isVerified) {
      res.status(200).json({ message: "Not enough followers" });
    }

    //If yes check if user has liked the Tweet
    response = await axios.get(`https://api.twitter.com/2/tweets/${tweetId}/liking_users`, {
      headers: {
        Authorization: `Bearer ${YOUR_TWITTER_BEARER_TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": "YourApp/1.0.0", // Set your app's user agent here
      },
    });

    isVerified = response.data.data.some((user) => user.id === id);

    if (!isVerified && hasLikedTweet) {
      res.status(200).json({ message: "Not liked tweet" });
    } else {
      res.status(200).json({ message: "All requirements met" });
    }
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
