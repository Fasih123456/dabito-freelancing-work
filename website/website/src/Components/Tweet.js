//This card is only compatible with the homepage Card Componenet, other compatiblity test has not been done

import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import moment from "moment";
import { Row, Col, Modal, Button, Form } from "react-bootstrap";

function refineTime(time) {
  const refinedTime = time ? time.slice(1, -2) : "";

  return refinedTime;
}

function Tweet({ identifies, title, text, time, winner, amount, key, edit, userid }) {
  const refinedTime = time ? refineTime(time) : "";
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTweet, setEditTweet] = useState({
    userid: "",
    title: "",
    reward: "",
    time: "",
    winners: "",
    targetTweetId: "",
  });

  console.log(refinedTime);
  const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY_UNSPLASH;
  const [imageUrl, setImageUrl] = useState("");
  const url = `https://api.unsplash.com/photos/random/?client_id=${ACCESS_KEY}`;

  const deleteTweet = (tweetId) => {
    axios.delete(`http://localhost:3001/api/deleteTweet/${tweetId}`);
  };

  const timeLeft = moment.duration(moment(time, "YYYY-MM-DDTHH:mm:ss.SSS").diff(moment()));

  console.log(timeLeft);

  // Get the number of days, hours, minutes, and seconds left
  const day = Math.floor(timeLeft.asDays());
  const hour = timeLeft.hours();
  const min = timeLeft.minutes();

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = (user) => {
    setShowEditModal(true);
  };

  const handleModalSaveChanges = () => {
    handleSaveChanges(editTweet, identifies, userid);
    handleCloseEditModal();
    //handleSaveChanges(currentUser);
  };

  const handleSaveChanges = (tweetdata, tweetid, userid) => {
    console.log(tweetdata, tweetid, userid);
    axios.put(`http://localhost:3001/api/updateTweet/${tweetid}`, {
      title: tweetdata.title,
      reward: tweetdata.reward,
      time: tweetdata.time,
      winners: tweetdata.winners,
      userid: userid,
    });
    // code to send request to server to update user data with currentUser state
  };

  return (
    <div class="card mb-3" id={key}>
      <div class="row g-0">
        <div class="col-md-2" id="image-container">
          <img src={imageUrl} class="img-fluid rounded-start homepage-icon" alt="..." />
        </div>
        <div class="col-md-10">
          <div class="card-body">
            <h5 class="card-title">@{title}</h5>
            <p class="card-text">{text}</p>
            <div class="row g-0">
              <div class="col-md-3">Reward</div>
              <div class="col-md-3">Time</div>
              <div class="col-md-3">Winners</div>
              <div class="col-md-3"></div>
            </div>
            <div class="row g-0">
              <div class="col-md-3">${winner}</div>
              <div class="col-md-3">
                {day}d {hour}h <span class="seconds"> {min}m </span>
              </div>
              <div class="col-md-3">{amount}</div>
              {edit ? (
                <React.Fragment>
                  <div class="col-md-3">
                    <button
                      type="button"
                      class="btn btn-primary"
                      onClick={(e) => handleShowEditModal()}
                    >
                      Edit
                    </button>
                  </div>
                  <div class="col-md-3">
                    <button
                      type="button"
                      class="btn btn-danger"
                      onClick={(e) => deleteTweet(identifies)}
                    >
                      Delete
                    </button>
                  </div>
                </React.Fragment>
              ) : (
                <div class="col-md-3">
                  <button type="button" class="btn btn-primary">
                    Enter
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
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
                  setEditTweet({
                    ...editTweet,
                    title: e.target.value,
                  });
                }}
              />
            </Form.Group>
            <Form.Group controlId="formBasicName">
              <Form.Label>Reward Amount</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Reward Amount"
                onChange={(e) => {
                  setEditTweet({
                    ...editTweet,
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
                  setEditTweet({
                    ...editTweet,
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
                placeholder="Enter Number Of Winners"
                onChange={(e) => {
                  setEditTweet({
                    ...editTweet,
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
          <Button variant="secondary danger" onClick={handleCloseEditModal}>
            Discard
          </Button>
          <Button variant="primary" onClick={handleModalSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Tweet;
