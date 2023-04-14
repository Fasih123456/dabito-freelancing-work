import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import { myContext } from "../OAuthContext";

import { Row, Col } from "react-bootstrap";

import Tweet from "../Tweet";
import UserModal from "../UserModal";

const CommunityTweets = () => {
  const userObject = useContext(myContext);
  const [allCurrentTweets, setAllCurrentTweets] = useState([]);
  const handleAddModal = () => setShowAddModal(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const userCommunityName = "Testing"; //This variable will be fetched dynamically from the wallet API

  useEffect(() => {
    axios.get(`http://localhost:3001/api/communitytweets/${userCommunityName}`).then((response) => {
      console.log(response);
      setAllCurrentTweets(response.data);
    });
  }, [userObject]);

  return (
    <section id="portfolio" class="portfolio section-bg">
      <div class="container">
        <div class="section-title">
          <Row>
            <Col>
              <h2>Community Tweets</h2>
            </Col>
          </Row>
        </div>

        <div class="row portfolio-container" style={{ width: "100%" }}>
          {userObject && allCurrentTweets
            ? allCurrentTweets.map((tweet) => {
                return (
                  <Tweet
                    id={tweet.tweet_id}
                    title={userObject.username}
                    text={tweet.tweet_text}
                    winner={tweet.max_winners}
                    amount={tweet.reward_per_winner}
                    creationTime={tweet.creation_time}
                    expiryTime={tweet.expiry_time}
                    requirements={tweet.requirements}
                    edit={false}
                  />
                );
              })
            : null}
        </div>
      </div>
      <UserModal
        handleClass={handleAddModal}
        setShowAddModal={setShowAddModal}
        showAddModal={showAddModal}
      />
    </section>
  );
};

export default CommunityTweets;
