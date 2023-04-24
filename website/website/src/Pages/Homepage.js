import Footer from "../Components/Footer";

import { Row, Col, Modal, Button, Form } from "react-bootstrap";

import Tweet from "../Components/Tweet";

import "../Css/App.css";
import "../Css/Homepage.css";

import axios from "axios";
import { myContext } from "../Components/OAuthContext";

import UserModal from "../Components/UserModal";

import React, { useState, useEffect, useContext } from "react";
import YourTweets from "../Components/Tweets/YourTweets";
import FeaturedTweets from "../Components/Tweets/FeaturedTweets";
import CommunityTweets from "../Components/Tweets/CommunityTweets";

function Homepage() {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const handleAddModal = () => setShowAddModal(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const userObject = useContext(myContext);

  console.log(userObject);

  return (
    <div>
      <main id="main">
        <section class="portfolio section-bg zero-bottom-padding">
          {viewportWidth > 800 ? (
            // display this HTML above 800px
            <React.Fragment></React.Fragment>
          ) : (
            // display this HTML below 800px
            //TODO: The view for this is broken need to fix it
            <ul id="portfolio-flters">
              <li data-filter="*" class="filter-active .status-tag">
                All(31)
              </li>
              <li data-filter=".filter-app status-tag">Live(5)</li>
              <li data-filter=".filter-card .status-tag">Ongoing(2)</li>
              <li data-filter=".filter-web .status-tag">Ended(24)</li>
            </ul>
          )}
        </section>
        <FeaturedTweets />

        <YourTweets />

        <CommunityTweets />
      </main>

      <Footer />
    </div>
  );
}

/*
{all allCurrentTweets.length != 0 ? (
                allCurrentTweets.map((tweet) => (
                  <Tweet
                    key={tweet.tweetid}
                    identifies={tweet.tweetid}
                    userid={tweet.userid}
                    title={currentUser.username}
                    text={tweet.title}
                    winner={tweet.winners}
                    amount={tweet.reward}
                    time={tweet.validtill}
                    edit={true}
                  />
                ))
              ) : (
                <h3>You need to logged in to see your tweets</h3>
              )}
*/

export default Homepage;
