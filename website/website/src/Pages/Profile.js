import Footer from "../Components/Footer";
import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import EnteredTweets from "../Components/EnteredTweets";

import "../Css/App.css";
import "../Css/Section.css";

function Profile() {
  return (
    <React.Fragment>
      <main id="main">
        <Container>
          <Row class="main-section">
            <h2>Your Wallets</h2>
            <p>
              You currently have no wallets added to your account. They will displayed here once
              added
            </p>
          </Row>
          <Row>This is the wallet section</Row>
        </Container>
        <EnteredTweets />
        <Footer />
      </main>
    </React.Fragment>
  );
}

export default Profile;
