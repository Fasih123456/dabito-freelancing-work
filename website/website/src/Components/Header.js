import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useLocation } from "react-router-dom";

import Navigation from "./Navigation";

import { TwitterOauthButton } from "../Components/TwitterOAuthButton";

import axios, { AxiosResponse } from "axios";

function Header({ location, profileId }) {
  const [isLoading, setIsLoading] = useState(false);

  //const location = useLocation();
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const twitterLogin = async () => {
    window.open("http://localhost:3001/oauth/twitter", "_self");
  };

  const twitterLogout = async () => {
    window.open("http://localhost:3001/logout", "_self");
  };

  console.log(profileId);

  useEffect(() => {
    setIsLoading(true);

    /*fetch("/api/profile")
      .then((response) => response.json())
      .then((data) => {
        // Set the profile ID state
        setProfileId({
          id: data.profileId.id,
          username: data.profileId.profile.username,
          displayName: data.profileId.profile.displayName,
          profileImageUrl: data.profileId.profile.photos[0].value,
        });
        console.log(profileId);
      })
      .catch((error) => console.error(error));*/

    // update the viewport width state when the window is resize0d
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //TODO: display the name and profile image of the logged in user
  //TODO: add functinality to change the .active class name on the links
  return (
    <React.Fragment>
      <header id="header">
        <div class="d-flex flex-column">
          <div class="profile">
            {profileId.id ? (
              <React.Fragment>
                <img src={profileId.profileImageUrl} alt="" class="img-fluid rounded-circle" />

                <h1 class="text-light">
                  <a href="/">{profileId.displayName}</a>
                </h1>
                <button onClick={twitterLogout}>Logout</button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <p>You are not loged in!</p>
                <button onClick={twitterLogin}>Login</button>
              </React.Fragment>
            )}
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
            {profileId.id ? (
              <React.Fragment>
                <p>{profileId.displayName}</p>
                <img src={profileId.profileImageUrl} alt="profile" />
                <button onClick={twitterLogout}>Logout</button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <p>You are not loged in!</p>
                <button onClick={twitterLogin}>Login</button>
              </React.Fragment>
            )}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto" style={{ marginRight: "0px !important" }}>
              {location === "/" ? (
                // display this HTML on the home page
                <React.Fragment>
                  {viewportWidth > 800 ? (
                    <React.Fragment>
                      <Nav.Link href="#features">All(31)</Nav.Link>
                      <Nav.Link href="#features">Live(5)</Nav.Link>
                      <Nav.Link href="#features">Ongoing(2)</Nav.Link>
                      <Nav.Link href="#features">Ended(24)</Nav.Link>
                    </React.Fragment>
                  ) : (
                    <Navigation />
                  )}
                </React.Fragment>
              ) : location === "/Apply" ? (
                <React.Fragment>
                  {viewportWidth > 800 ? (
                    <React.Fragment>
                      <Nav.Link href="#features">Apply Page</Nav.Link>
                    </React.Fragment>
                  ) : (
                    <Navigation />
                  )}
                </React.Fragment>
              ) : location === "/claim" ? (
                <React.Fragment>
                  {viewportWidth > 800 ? (
                    <React.Fragment>
                      <Nav.Link href="/claim">Claim Page</Nav.Link>
                    </React.Fragment>
                  ) : (
                    <Navigation />
                  )}
                </React.Fragment>
              ) : location === "/profile" ? (
                <React.Fragment>
                  {viewportWidth > 800 ? (
                    <React.Fragment>
                      <Nav.Link href="/profile">Profile Page</Nav.Link>
                    </React.Fragment>
                  ) : (
                    <Navigation />
                  )}
                </React.Fragment>
              ) : (
                // display this HTML on all other pages
                <h1>Display on all other pages</h1>
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