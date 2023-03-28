import Footer from "../Components/Footer";

import { Row, Col, Modal, Button, Form } from "react-bootstrap";

import Tweet from "../Components/Tweet";

import "../Css/App.css";
import "../Css/Homepage.css";

import axios from "axios";

import React, { useState, useEffect } from "react";

function Homepage() {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [data, setData] = useState("");
  const [newTweet, setNewTweet] = useState({
    userid: "",
    title: "",
    reward: "",
    time: "",
    winners: "",
    targetTweetId: "",
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: "",
    displayName: "",
    username: "",
    profileImageUrl: "",
  });

  const [allCurrentTweets, setAllCurrentTweets] = useState([]);

  let shortId = currentUser.id.substring(0, 8);

  const handleCloseAddModal = () => setShowAddModal(false);
  const handleAddNewUserModal = () => {
    console.log(`Adding new user`);
    console.log(currentUser);
    axios.post(`http://localhost:3001/api/tweets/${currentUser.id}`, {
      title: newTweet.title,
      reward: newTweet.reward,
      time: newTweet.time,
      winners: newTweet.winners,
    });

    handleCloseAddModal();
  };

  const handleAddModal = () => setShowAddModal(true);

  useEffect(() => {
    fetch("/api/profile")
      .then((response) => response.json())
      .then((data) => {
        setCurrentUser({
          id: data.profileId.id,
          username: data.profileId.profile.username,
          displayName: data.profileId.profile.displayName,
          profileImageUrl: data.profileId.profile.photos[0].value,
        });
        console.log(currentUser);
      })
      .catch((error) => console.error(error));

    // update the viewport width state when the window is resized
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetch(`/api/tweets/${shortId}`)
      .then((response) => {
        return response.json(); // <-- return the parsed JSON data
      })
      .then((data) => {
        console.log(data);
        setAllCurrentTweets(data.tweets); // <-- access the `tweets` property
      })
      .catch((error) => console.error(error));
  }, [shortId]);

  return (
    <div>
      <main id="main">
        <p>{!data ? "Loading..." : data}</p>
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
        <section id="portfolio" class="portfolio section-bg zero-top-padding">
          <div class="container section-container">
            <div class="section-title">
              <h2>Featured Tweets</h2>
            </div>

            <div class="row portfolio-container" id="featured-tweets-contianer">
              <Tweet
                title="Dummy"
                text="Look at this cool NFT"
                winner="24"
                amount="45000"
                hour="12"
                min="24"
                sec="25"
              />

              <Tweet
                title="Dummy"
                text="Look at this cool NFT"
                winner="24"
                amount="45000"
                hour="12"
                min="24"
                sec="25"
              />
            </div>
          </div>
        </section>
        <section id="portfolio" class="portfolio section-bg">
          <div class="container">
            <div class="section-title">
              <Row>
                <Col>
                  <h2>Your Tweets</h2>
                </Col>
                {currentUser && currentUser.id && (
                  <Col>
                    <button onClick={() => handleAddModal()}>Add Tweet</button>
                  </Col>
                )}
              </Row>
            </div>

            <div class="row portfolio-container" style={{ width: "100%" }}>
              {allCurrentTweets.length != 0 ? (
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
            </div>
          </div>
        </section>
        <Modal show={showAddModal} onHide={handleCloseAddModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Replace with your own form elements */}
            <Form>
              <Form.Group controlId="formBasicName">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Tweet Title"
                  onChange={(e) => {
                    setNewTweet({
                      ...newTweet,
                      title: e.target.value,
                    });
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formBasicName">
                <Form.Label>Reward Amount</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Reward Amount"
                  onChange={(e) => {
                    setNewTweet({
                      ...newTweet,
                      winners: e.target.value,
                    });
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formBasicName">
                <Form.Label>Valid Time</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => {
                    setNewTweet({
                      ...newTweet,
                      time: e.target.value,
                    });
                  }}
                >
                  <option value="">Select time</option>
                  <option value="1">1 day</option>
                  <option value="2">2 days</option>
                  <option value="3">3 days</option>
                  <option value="4">4 days</option>
                  <option value="5">5 days</option>
                  <option value="6">6 days</option>
                  <option value="7">7 days</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formBasicType">
                <Form.Label>Number Of Winners</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Number Of Winners"
                  onChange={(e) => {
                    setNewTweet({
                      ...newTweet,
                      reward: e.target.value,
                    });
                  }}
                />
              </Form.Group>
              <Form.Group controlId="formBasicType">
                <Form.Label>Tweet ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Target Tweet Id"
                  onChange={(e) => {
                    setNewTweet({
                      ...newTweet,
                      targetTweetId: e.target.value,
                    });
                  }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary danger" onClick={handleCloseAddModal}>
              Discard
            </Button>
            <Button variant="primary" onClick={handleAddNewUserModal}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </main>
      <Footer />
    </div>
  );
}

export default Homepage;
