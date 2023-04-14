const db = require("../util/database");

/*
The raiders table stores information about each raider, including the user ID, the tweet ID they accepted, the completion time, 
and the completion status.
*/
module.exports = class Raiders {
  constructor(raider_id, user_id, accepted_tweet_id, completion_time, completion_status) {
    this.raider_id = raider_id.toString().slice(0, 8); // Accept only the first 8 digits of raider_id
    this.user_id = user_id; // This is the user ID of the user who created the tweet
    this.accepted_tweet_id = accepted_tweet_id;
    this.completion_time = 0; //User has not completed the tweet yet
    this.completion_status = "Accepted"; //Any other value other than Accepted Or Completed are not accepted
  }

  save() {
    const query =
      "INSERT INTO raiders (raider_id, user_id, accepted_tweet_id, completion_time, completion_status) VALUES (?, ?, ?, ?, ?)";
    const values = [
      this.raider_id,
      this.user_id,
      this.accepted_tweet_id,
      this.completion_time,
      this.completion_status,
    ];
    console.log(query, values);

    return db.execute(query, values);
  }

  static getAcceptedTweets(raider_id) {
    // First, fetch the accepted_tweet_id values from raiders table
    const query = "SELECT accepted_tweet_id FROM raiders WHERE raider_id = ?";
    const values = [raider_id];
    console.log(query, values);

    return db.execute(query, values).then(([rows, fieldData]) => {
      // Extract the accepted_tweet_id values from the result
      const acceptedTweetIds = rows.map((row) => row.accepted_tweet_id);

      if (acceptedTweetIds.length === 0) {
        // If acceptedTweetIds array is empty, return empty result
        return [];
      }

      // Convert the acceptedTweetIds array into a comma-separated string
      const tweetIdsString = acceptedTweetIds.join(",");

      // Then, use the comma-separated string in the IN clause of the query
      const tweetQuery = `SELECT * FROM tweets WHERE tweet_id IN (${tweetIdsString})`;
      console.log(tweetQuery);

      return db.execute(tweetQuery);
    });
  }
};
