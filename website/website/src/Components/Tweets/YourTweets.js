import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import { myContext } from "../OAuthContext";

import { Row, Col, Button } from "react-bootstrap";

import Tweet from "../Tweet";
import UserModal from "../UserModal";

const YourTweets = () => {
  const userObject = useContext(myContext);
  const [allCurrentTweets, setAllCurrentTweets] = useState([]);
  const handleAddModal = () => setShowAddModal(true);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/tweets/${userObject.id}`).then((response) => {
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
              <h2>Your Tweets</h2>
            </Col>
            {userObject && (
              <Col>
                <Button variant="info" className="addtweet" onClick={() => handleAddModal()} style={{ float: "right" }}>
                  Add Tweet
                </Button>
              </Col>
            )}
          </Row>
        </div>

        <div class="row portfolio-container" style={{ width: "100%" }}>
          {userObject && allCurrentTweets
            ? allCurrentTweets.map((tweet) => {
                return (
                  <div className="othertweets">
                  <Tweet
                    id={tweet.tweet_id}
                    title={userObject.username}
                    text={tweet.tweet_text}
                    winner={tweet.max_winners}
                    amount={tweet.reward_per_winner}
                    creationTime={tweet.creation_time}
                    expiryTime={tweet.expiry_time}
                    requirements={tweet.requirements}
                    edit={true}
                  />
                  </div>
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

export default YourTweets;
