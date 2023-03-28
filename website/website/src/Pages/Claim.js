import Header from "../Components/Header";
import Footer from "../Components/Footer";
import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Claim() {
  return (
    <React.Fragment>
      <main id="main">
        <Container>
          <Row>There are currently no Claim, your Claims will be displayed here</Row>
        </Container>
        <Footer />
      </main>
    </React.Fragment>
  );
}

export default Claim;
