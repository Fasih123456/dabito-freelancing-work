CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  twitter_id VARCHAR(8) NOT NULL,
  ada_balance DECIMAL(10,2) NOT NULL DEFAULT 0
);

CREATE TABLE tweets (
  tweet_id INT AUTO_INCREMENT PRIMARY KEY,
  tweeter_id INT NOT NULL,
  tweet_text TEXT NOT NULL,
  featured_tweet BOOLEAN NOT NULL DEFAULT false,
  duration_hours INT NOT NULL ,
  max_winners INT NOT NULL ,
  reward_per_winner DECIMAL(10,2) NOT NULL ,
  winners_so_far INT NOT NULL DEFAULT 0 ,
  requirements JSON NOT NULL,
  creation_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  expiry_time TIMESTAMP NOT NULL,
  hidden_tweet BOOLEAN NOT NULL DEFAULT false,
  FOREIGN KEY (tweeter_id) REFERENCES users(user_id)
);

CREATE TABLE raiders (
  raider_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  accepted_tweet_id INT NOT NULL,
  completion_time TIMESTAMP,
  completion_status VARCHAR(10) NOT NULL CHECK (completion_status IN ('Accepted', 'Completed')),
  CONSTRAINT raider_unique_tweet UNIQUE (user_id, accepted_tweet_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (accepted_tweet_id) REFERENCES tweets(tweet_id)
);



CREATE TABLE coupons (
  couponid INT PRIMARY KEY,
  coupon_code VARCHAR(255) UNIQUE NOT NULL,
  discount_type ENUM('Flat', 'Percentage') NOT NULL,
  discount_amount DECIMAL(10,2) NOT NULL
);