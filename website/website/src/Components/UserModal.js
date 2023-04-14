import { Modal, Form, Button } from "react-bootstrap";
import React, { useState, useContext } from "react";
import axios from "axios";
import { myContext } from "./OAuthContext";

function UserModal({ handleAddModal, setShowAddModal, showAddModal }) {
  const [currentCost, setCurrentCost] = useState(0);
  const [currentUser, setCurrentUser] = useState({
    id: "",
    displayName: "",
    username: "",
    profileImageUrl: "",
  });
  const userObject = useContext(myContext);

  const [couponCode, setCouponCode] = useState("");

  let couponCodeMultipler = 1;

  const [newTweet, setNewTweet] = useState({
    userid: "",
    title: "",
    reward: "",
    time: "",
    winners: "",
    targetTweetId: "",
    mustComment: "",
    mustForward: "",
    mustLikeLink: "",
    mustHaveMinFollowers: "",
    minimumFollowers: "",
    mustHaveMinComment: "",
    commentCount: "",
    featured: "",
  });

  const handleCloseAddModal = () => setShowAddModal(false);

  const verifyCoupon = () => {
    axios.get("http://localhost:3001/api/coupons/" + couponCode).then((response) => {
      if (response.data == null) {
        alert("Invalid Coupon Code");
      } else {
        couponCodeMultipler = response.data.multiplier;
      }
    });
  };

  const handleAddNewUserModal = () => {
    if (couponCode != "") {
      verifyCoupon();
    }

    console.log(`Adding new user`);
    console.log(newTweet.featured);
    axios.post(`http://localhost:3001/api/tweets/${userObject.id}`, {
      title: newTweet.title,
      reward: newTweet.reward,
      time: newTweet.time,
      winners: newTweet.winners,
      targetTweetId: newTweet.targetTweetId,
      mustComment: newTweet.mustComment,
      mustForward: newTweet.mustForward,
      mustLikeLink: newTweet.mustLikeLink,
      mustHaveMinFollowers: newTweet.mustHaveMinFollowers,
      minimumFollowers: newTweet.minimumFollowers,
      mustHaveMinComment: newTweet.mustHaveMinComment,
      commentCount: newTweet.commentCount,
      cost: currentCost,
      featured: newTweet.featured ? newTweet.featured : false,
      communityName: "EMPTY",
    });

    //handleCloseAddModal();
  };

  const calculateCost = () => {
    console.log(newTweet.featured);
    let featureMultipler = 0;
    if (newTweet.featured == true) {
      featureMultipler = 1;
    }

    console.log(featureMultipler * 50);
    // Calculate the cost of the tweet based on the values in newTweet state
    let cost =
      (Number(newTweet.time) - 1) * 50 +
      Number(newTweet.reward) * Number(newTweet.winners) * 1.2 +
      featureMultipler * 50;
    // Add your cost calculation logic here

    setCurrentCost(cost * couponCodeMultipler);
  };

  return (
    <React.Fragment>
      <Modal show={showAddModal} onHide={handleCloseAddModal} onChange={calculateCost}>
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
              <Form.Label>Reward Amount(Per Person)</Form.Label>
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
              <Form.Range
                min={1}
                max={24}
                onChange={(e) => {
                  setNewTweet({
                    ...newTweet,
                    time: e.target.value,
                  });
                }}
              />
              <p>{newTweet.time} hours</p>
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
            <Form.Group controlId="formBasicType">
              <Form.Label>Requirements</Form.Label>
              <Form.Check
                type="checkbox"
                label="Must Comment"
                onChange={(e) => {
                  setNewTweet({
                    ...newTweet,
                    mustComment: e.target.checked,
                  });
                }}
              />
              <Form.Check
                type="checkbox"
                label="Must Forward"
                onChange={(e) => {
                  setNewTweet({
                    ...newTweet,
                    mustForward: e.target.checked,
                  });
                }}
              />
              <Form.Check
                type="checkbox"
                label="Must Like Tweet"
                onChange={(e) => {
                  setNewTweet({
                    ...newTweet,
                    mustLikeLink: e.target.checked,
                  });
                }}
              />

              <Form.Check
                type="checkbox"
                label="Must have minimum follower count"
                onChange={(e) => {
                  setNewTweet({
                    ...newTweet,
                    mustHaveMinFollowers: e.target.checked,
                  });
                }}
              />

              {newTweet.mustHaveMinFollowers && (
                <Form.Control
                  type="text"
                  placeholder="Minimum Follower Count"
                  onChange={(e) => {
                    setNewTweet({
                      ...newTweet,
                      minFollowers: e.target.value,
                    });
                  }}
                />
              )}

              <Form.Check
                type="checkbox"
                label="Must have minimum comment words count"
                onChange={(e) => {
                  setNewTweet({
                    ...newTweet,
                    mustHaveMinCommentWords: e.target.checked,
                  });
                }}
              />

              {newTweet.mustHaveMinCommentWords && (
                <Form.Control
                  type="text"
                  placeholder="Minimum Comment Words Count"
                  onChange={(e) => {
                    setNewTweet({
                      ...newTweet,
                      minCommentWords: e.target.value,
                    });
                  }}
                />
              )}

              <Form.Check
                type="checkbox"
                label="Feature this tweet"
                onChange={(e) => {
                  setNewTweet({
                    ...newTweet,
                    featured: e.target.checked,
                  });
                }}
              />

              <Form.Group controlId="formBasicType">
                <Form.Label>Coupon Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your Coupon Code"
                  onChange={(e) => {
                    setCouponCode(e.target.value);
                  }}
                />
              </Form.Group>
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
          <div className="cost">Current Cost: ADA{currentCost}</div>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default UserModal;
