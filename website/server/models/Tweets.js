const db = require("../util/database");

module.exports = class Tweets {
  constructor(tweetid, userid, title, reward, time, winners, validtill, targetTweetId) {
    this.tweetid = tweetid;
    this.userid = userid; // update here
    this.title = title;
    this.reward = reward;
    this.time = time;
    this.winners = winners;
    this.validtill = validtill;
    this.targetTweetId = targetTweetId;
  }

  updateTweet() {
    return db.execute(
      "UPDATE UserTweets SET title = ?, reward = ?, time = ?, winners = ?, targetTweetId = ? WHERE tweetid = ?",
      [this.title, this.reward, this.time, this.winners, this.targetTweetId, this.tweetid]
    );
  }

  async save() {
    try {
      const result = await db.execute(
        "INSERT INTO UserTweets (tweetid, userid, title, reward, time, winners, validtill, targetTweetId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          this.tweetid,
          this.userid,
          this.title,
          this.reward,
          this.time,
          this.winners,
          this.validtill,
          this.targetTweetId,
        ]
      );
      console.log(result[0]);
    } catch (err) {
      console.log(err);
    }
  }

  static fetchAll() {
    return db.execute("SELECT * FROM UserTweets");
  }

  static getTweetByUserId(userid) {
    return db.execute("SELECT * FROM UserTweets WHERE userid = ?", [userid]);
  }

  static getTweetByTweetId(tweetid) {
    return db.execute("SELECT * FROM UserTweets WHERE tweetid = ?", [tweetid]);
  }

  static getTweetByTweetIdAndUserId(tweetid, userid) {
    return db.execute("SELECT * FROM UserTweets WHERE tweetid = ? AND userid = ?", [
      tweetid,
      userid,
    ]);
  }

  static deleteTweet(tweetid) {
    return db.execute("DELETE FROM UserTweets WHERE tweetid = ?", [tweetid]);
  }
};
