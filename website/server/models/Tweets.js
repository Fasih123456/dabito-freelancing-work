const db = require("../util/database");
const moment = require("moment");

/*The tweets table stores information about each tweet, including the tweeter ID, the tweet text, the duration, the reward amount,
//the number of winners, and the tweet requirements. It also has columns for keeping track of the tweet's creation and expiry times,
as well as the number of winners so far and whether the tweet is hidden.
The requirements column in the tweets table is of type JSONB and will store a JSON object that s
pecifies the tweet requirements. The structure of this object could look something like this:
*/
module.exports = class Tweets {
  constructor(
    tweet_id,
    tweeter_id,
    tweet_text,
    featured_tweet,
    duration_hours,
    max_winners,
    reward_per_winner,
    winners_so_far,
    requirements,
    creation_time,
    expiry_time,
    hidden_tweet,
    communityName
  ) {
    this.tweet_id = Number(tweet_id);
    this.tweeter_id = Number(tweeter_id);
    this.tweet_text = tweet_text;
    this.featured_tweet = Number(featured_tweet);
    this.duration_hours = Number(duration_hours);
    this.max_winners = Number(max_winners);
    this.reward_per_winner = Number(reward_per_winner);
    this.winners_so_far = Number(winners_so_far);
    this.requirements = requirements;
    this.creation_time = moment().format("YYYY-MM-DD HH:mm:ss");
    this.expiry_time = moment(creation_time)
      .add(this.duration_hours, "hours")
      .format("YYYY-MM-DD HH:mm:ss");
    this.hidden_tweet = 0;
    this.communityName = communityName;
  }

  save() {
    const requirementsString = JSON.stringify(this.requirements);
    return db.execute(
      "INSERT INTO tweets (tweet_id, tweeter_id, tweet_text, featured_tweet, duration_hours, max_winners, reward_per_winner, winners_so_far, requirements, creation_time, expiry_time, hidden_tweet, communityName) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        this.tweet_id,
        this.tweeter_id,
        this.tweet_text,
        this.featured_tweet,
        this.duration_hours,
        this.max_winners,
        this.reward_per_winner,
        this.winners_so_far,
        requirementsString,
        this.creation_time,
        this.expiry_time,
        this.hidden_tweet,
        "EMPTY",
      ]
    );
  }

  //This gets all the tweets for the current user
  static getAllTweets(id) {
    return db.execute("SELECT * FROM tweets WHERE tweeter_id = ?", [id]);
  }

  //This just gets each and every tweet
  static getAllTweetsUnfiltered() {
    return db.execute("SELECT * FROM tweets");
  }

  static getFeaturedTweets() {
    return db.execute(`
    SELECT tweets.*, users.*
    FROM tweets
    INNER JOIN users ON tweets.tweeter_id = users.user_id
    WHERE tweets.featured_tweet = 1
  `);
  }

  static getCommunityTweets(communityName) {
    return db.execute("SELECT * FROM tweets WHERE communityName = ?", [communityName]);
  }

  static deleteTweet(tweetId) {
    return db.execute("DELETE FROM tweets WHERE tweet_id = ?", [tweetId]);
  }

  static getTweetIdFromTweeterId(tweeterId) {
    return db.execute("SELECT tweeter_id FROM tweets WHERE tweet_id  = ?", [tweeterId]);
  }

  static getTweetById(tweetId) {
    return db.execute("SELECT * FROM tweets WHERE tweet_id = ?", [tweetId]).then((result) => {
      // Extract rows from result object
      const rows = result[0];
      //console.log(rows);

      // Return rows (data) only
      return rows;
    });
  }
};
