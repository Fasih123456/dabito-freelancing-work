import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";

function Header() {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    // update the viewport width state when the window is resized
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <React.Fragment>
      <header id="header">
        <div class="d-flex flex-column">
          <div class="profile">
            <img src="../assets/img/profile-img.jpg" alt="" class="img-fluid rounded-circle" />
            <h1 class="text-light">
              <a href="index.html">Alex Smith</a>
            </h1>
          </div>

          <nav id="navbar" class="nav-menu navbar">
            <ul>
              <li>
                <a href="/" class="nav-link scrollto active">
                  <i class="bx bx-home"></i> <span>Home</span>
                </a>
              </li>
              <li>
                <a href="/Apply" class="nav-link scrollto">
                  <i class="bx bx-user"></i> <span>Apply</span>
                </a>
              </li>
              <li>
                <a href="/claim" class="nav-link scrollto">
                  <i class="bx bx-file-blank"></i> <span>Claim</span>
                </a>
              </li>
              <li>
                <a href="/profile" class="nav-link scrollto">
                  <i class="bx bx-book-content"></i> <span>My Profile</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home" id="name-title">
            Alex Smith
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" style={{ marginRight: "0px !important" }}>
              {viewportWidth > 800 ? (
                <React.Fragment>
                  <Nav.Link href="#features">All(31)</Nav.Link>
                  <Nav.Link href="#features">Live(5)</Nav.Link>
                  <Nav.Link href="#features">Ongoing(2)</Nav.Link>
                  <Nav.Link href="#features">Ended(24)</Nav.Link>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/Apply">Apply</Nav.Link>
                  <Nav.Link href="/profile">Claim</Nav.Link>
                  <Nav.Link href="/claim" style={{ paddingBottom: "30px" }}>
                    My Profile
                  </Nav.Link>
                </React.Fragment>
              )}
            </Nav>
            <Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success" id="search-button">
                  Search
                </Button>
              </Form>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  );
}

export default Header;
