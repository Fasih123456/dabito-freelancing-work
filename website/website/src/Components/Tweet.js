//This card is only compatible with the homepage Card Componenet, other compatiblity test has not been done

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import moment from "moment";
import { Alert } from "react-bootstrap";
import { myContext } from "./OAuthContext";
import UserModal from "./UserModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toast notifications

function Tweet({
  id,
  title,
  text,
  winner,
  amount,
  creationTime,
  expiryTime,
  edit,
  requirements,
  isFeatured,
  isCommunity,
  verify,
}) {
  if (requirements) {
    console.log(requirements.mustComment);
  }

  const userObject = useContext(myContext);

  const deleteTweet = () => {
    axios.delete(`http://localhost:3001/api/deleteTweet/${id}`);

    toast.success("Tweet successfully deleted!", {
      onClose: () => {
        window.location.href = "/";
      },
    });
  };

  const handleAddModal = () => setShowAddModal(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [quotedTweetId, setQuotedTweetId] = useState("Please enter a tweet id");

  const hours = moment(expiryTime).diff(moment(), "hours");
  const minutes = moment(expiryTime).diff(moment(), "minutes") - hours * 60;
  const seconds = moment(expiryTime).diff(moment(), "seconds") - minutes * 60 - hours * 3600;

  const verifyRequirements = (id) => {
    console.log(id);

    axios
      .get(`http://localhost:3001/usersfollowing/${userObject.id}`, {
        params: {
          tweetId: `${id}`,

          username: userObject.username,
        },
      }) // Pass tweetId as a query parameter in the URL
      .then((response) => {
        // Handle the response
        console.log("Response:", response);
        const message = response.data.message;

        // Check if verification is complete based on API response
        const isVerificationComplete = response.data.message == "All requirements met";

        if (isVerificationComplete) {
          // Show success toast
          toast.success("Verification complete");
          axios
            .put(`http://localhost:3001/api/updateRaider/${userObject.id}`, null, {
              params: {
                tweetId: id, // Update parameter name to match server-side code
              },
            })
            .then((response) => {
              console.log(response.data);
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          // Show failure toast
          toast.error("Verification not completed");
        }
      })
      .catch((error) => {
        // Handle the error
        console.error("Error verifying requirements:", error);
      });
  };

  const enterTweet = () => {
    console.log(id);
    axios
      .post("http://localhost:3001/api/accept", {
        raider_id: userObject.id,
        accepted_tweet_id: id,
      })
      .then((response) => {
        const message = response.data.message;
        console.log(message);
        if (message == "Raider contract accepted") {
          console.log("here");
          toast.success(
            "Tweet successfully added! You can see your active tweets in My Profile. Make sure to fulfill the requirements to be eligible for the reward!",
            {
              onClose: () => {
                // You can update the URL to the correct path of the user's profile page
                window.location.href = "/profile";
              },
            }
          );
        } else if (message == "Tweet already completed") {
          toast.error("Tweet already completed");
        } else {
          toast.error("Tweet already accepted");
        }
      });
  };

  const notify = () => toast("Wow so easy!");

  return (
    <div
      class="card mb-3"
      id={id}
      style={{ marginTop: "20px" }}
      className={`row g-0 ${isFeatured ? "isFeatured" : ""} ${isCommunity ? "isCommunity" : ""}`}
    >
      <ToastContainer />
      <div class="row g-0">
        <div class="col-md-12">
          <div class="card-body">
            <h4 class="card-title">@{title}</h4>
            <h5 class="card-text">{text}</h5>

            <div class="row g-0">
              <div class="col-md-3">Reward</div>
              <div class="col-md-3">Time</div>
              <div class="col-md-3">Winners</div>
              <div class="col-md-3"></div>
            </div>
            <div class="row g-0">
              <div class="col-md-3">${winner}</div>
              <div class="col-md-3">
                {hours}h {minutes}m<span class="seconds">{seconds}s </span>
              </div>
              <div class="col-md-3">{amount}</div>
              {edit ? (
                <React.Fragment>
                  <div className="col-md-3">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={(e) => handleAddModal()}
                    >
                      Edit
                    </button>
                  </div>
                  <div className="col-md-3">
                    <button type="button" className="btn btn-danger" onClick={(e) => deleteTweet()}>
                      Delete
                    </button>
                  </div>
                  <button type="button" className="btn btn-primary" onClick={(e) => enterTweet()}>
                    Enter
                  </button>
                </React.Fragment>
              ) : (
                <div className="col-md-3">
                  {verify ? (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={(e) => verifyRequirements(id)}
                    >
                      Verify Requirements
                    </button>
                  ) : (
                    <button type="button" className="btn btn-primary" onClick={(e) => enterTweet()}>
                      Enter
                    </button>
                  )}
                </div>
              )}
            </div>
            <div class="row g-0">
              <div class="col-md-12">
                <hr />
              </div>
            </div>
            <div class="row g-0">
              <div class="col-md-3">Requirements</div>
              <div class="col-md-9">
                {requirements && (
                  <ul>
                    {requirements.mustQuoted && (
                      <React.Fragment>
                        <li>Must Post Quoted Tweet</li>
                        <h4>Requirements for Quoted Tweets</h4>
                      </React.Fragment>
                    )}

                    {requirements.requiredPhrases && (
                      <li>Must have this phrase "{requirements.requiredPhrases}"</li>
                    )}
                    {requirements.bannedPhrases && (
                      <li>Must NOT have this phrases "{requirements.bannedPhrases}"</li>
                    )}
                    {requirements.minFollowers && (
                      <li>Must have minimum follower count: {requirements.minFollowers}</li>
                    )}
                    <h4>Other Requirements</h4>
                    {requirements.mustForward && <li>Must forward</li>}
                    {requirements.mustLikeLink && <li>Must like link</li>}
                    {requirements.mustHaveMinFollowers && (
                      <li>Must have minimum followers: {requirements.minFollowers}</li>
                    )}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <UserModal
        handleClass={handleAddModal}
        setShowAddModal={setShowAddModal}
        showAddModal={showAddModal}
      />
    </div>
  );
}

/*
                <ul>
                  {requirements.mustComment && <li>Must comment</li>}
                  {requirements.mustForward && <li>Must forward</li>}
                  {requirements.mustLikeLink && <li>Must like link</li>}
                  {requirements.mustHaveMinFollowers && (
                    <li>Must have minimum followers: {requirements.minimumFollowers}</li>
                  )}
                  {requirements.mustHaveMinComment && (
                    <li>Must have minimum comment count: {requirements.commentCount}</li>
                  )}
                </ul>
*/

export default Tweet;
