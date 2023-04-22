import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import { myContext } from "../OAuthContext";

import { Row, Col } from "react-bootstrap";

import Tweet from "../Tweet";
import UserModal from "../UserModal";

const FeaturedTweets = () => {
  const userObject = useContext(myContext);
  const [allCurrentTweets, setAllCurrentTweets] = useState([]);
  const handleAddModal = () => setShowAddModal(true);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/featuredTweets`).then((response) => {
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
              <h2>Featured Tweets</h2>
            </Col>
          </Row>
        </div>

        <div class="row portfolio-container"  style={{ width: "100%" }}>
          {userObject && allCurrentTweets
            ? allCurrentTweets.map((tweet) => {
                if (tweet.name == userObject.username) {
                  return (
                    <div className="f">
                    <Tweet 
                      id={tweet.tweet_id}
                      title={tweet.name}
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
                } else {
                  return (
                    <div className="f">
                    <Tweet 
                      id={tweet.tweet_id}
                      title={tweet.name}
                      text={tweet.tweet_text}
                      winner={tweet.max_winners}
                      amount={tweet.reward_per_winner}
                      creationTime={tweet.creation_time}
                      expiryTime={tweet.expiry_time}
                      requirements={tweet.requirements}
                      edit={false}
                      
                    />
                    </div>
                  );
                }
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

export default FeaturedTweets;
