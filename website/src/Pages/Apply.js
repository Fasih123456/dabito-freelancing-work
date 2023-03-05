import Header from "../Components/Header";
import Footer from "../Components/Footer";

import React, { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Button from "react-bootstrap/Button";

import "../Css/App.css";
import "../Css/Apply.css";

function Apply() {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    // update the viewport width state when the window is resized
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main id="main">
      <Header />
      <Container id="create-account" style={{ paddingTop: "30px" }}>
        <Row>
          <div class="section-title apply-div">
            <h3 id="first-header">To Apply, Create an Account here</h3>
          </div>
        </Row>
        <Row>
          <Col>
            <Button>Connect Wallet</Button>
          </Col>
          <Col>
            <Button>Apply for Sirus</Button>
          </Col>

          {viewportWidth > 800 ? (
            // display this HTML above 800px
            <Col></Col>
          ) : (
            <React.Fragment></React.Fragment>
          )}
        </Row>
      </Container>
      <Container id="apply-process">
        <div class="section-title apply-div">
          <h3 id="second-heading">Featured Tweets</h3>
        </div>
        <div class="apply-div special-div">Step 1</div>
        <div class="apply-div">Start by creating a project.</div>

        <div class="apply-div special-div">Step 2</div>
        <div class="apply-div">Through the manage tokens page, add tokens.</div>

        <div class="apply-div special-div">Step 3</div>
        <div class="apply-div">From the manage tweets page, send a tweet</div>

        <div class="apply-div special-div">Step 4</div>
        <div class="apply-div">tell your users to go on a raid and get rewards!</div>
      </Container>

      <Footer />
    </main>
  );
}

export default Apply;
