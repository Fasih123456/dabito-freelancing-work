const axios = require("axios");
const express = require("express");
const router = express.Router();

router.get("/usersfollowing/:id", async (req, res) => {
  const id = req.params.id; // Get the user ID from the request parameters
  const tweetId = req.query.tweetId; // Get the tweetId from the query parameters

  console.log(id);
  console.log(tweetId);

  const YOUR_TWITTER_BEARER_TOKEN =
    "AAAAAAAAAAAAAAAAAAAAAFtUmAEAAAAAFiQy1WXpS%2BezO4LoW1Kel5uO4sE%3D3Ipt0uQnEE82eeXMUnlEPp4tidYhYL1Likop5SJaTYkN167oSw";

  try {
    const response = await axios.get(`https://api.twitter.com/2/users/${id}/following`, {
      headers: {
        Authorization: `Bearer ${YOUR_TWITTER_BEARER_TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": "YourApp/1.0.0", // Set your app's user agent here
      },
    });

    console.log(response.data);

    // Check if tweetId is present in the API response
    const isVerified = response.data.data.some((user) => user.id === "14260960");

    // Send response based on verification status
    if (isVerified) {
      res.status(200).json({ message: "Verification complete" });
    } else {
      res.status(200).json({ message: "Verification not completed" });
    }
  } catch (error) {
    // Handle any errors that occurred during the API request
    console.error("Error fetching users following:", error);
    res.status(500).json({ error: "Failed to fetch users following" });
  }
});

module.exports = router;
