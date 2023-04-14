import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { myContext } from "./OAuthContext"; // Update with the correct path to your context
import Tweet from "./Tweet"; // Update with the correct path to your Tweet component

function EnteredTweets() {
  const [acceptedTweets, setAcceptedTweets] = useState([]);
  const userObject = useContext(myContext);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/getAcceptedTweets/${userObject.id}`)
      .then((response) => {
        setAcceptedTweets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching accepted tweets:", error);
      });
  }, [userObject]);

  return (
    <div>
      <h1 style={{ paddingTop: "40px" }}>Your Accepted Tweets</h1>
      {acceptedTweets.length > 0 ? (
        // Map through acceptedTweets and render a Tweet component for each item
        acceptedTweets.map((tweet) => (
          <Tweet
            key={tweet.tweet_id} // Make sure to provide a unique key for each item
            id={tweet.tweet_id}
            title={userObject.username}
            text={tweet.tweet_text}
            winner={tweet.max_winners}
            amount={tweet.reward_per_winner}
            creationTime={tweet.creation_time}
            expiryTime={tweet.expiry_time}
            requirements={tweet.requirements}
            edit={false}
            verify={true}
          />
        ))
      ) : (
        <p>No accepted tweets found.</p>
      )}
    </div>
  );
}

export default EnteredTweets;
