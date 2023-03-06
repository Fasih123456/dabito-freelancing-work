import Nav from "react-bootstrap/Nav";
import React, { useState, useEffect } from "react";

function Navigation() {
  return (
    <React.Fragment>
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/Apply">Apply</Nav.Link>
      <Nav.Link href="/claim">Claim</Nav.Link>
      <Nav.Link href="/profile" style={{ paddingBottom: "30px" }}>
        My Profile
      </Nav.Link>
    </React.Fragment>
  );
}

export default Navigation;
