import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useLocation } from "react-router-dom";
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { CgProfile,CgFile } from 'react-icons/cg';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineHome,AiOutlineClose } from 'react-icons/ai';
import Navigation from "./Navigation";
import { myContext } from "./OAuthContext";

import { TwitterOauthButton } from "../Components/TwitterOAuthButton";

import axios, { AxiosResponse } from "axios";

function Header({ location, profileId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [hide, setHide] = useState(false)
  
  const onHide = () => {
    setHide(!hide)
  }

  const userObject = useContext(myContext);

  //const location = useLocation();
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const twitterLogin = async () => {
    window.open("http://localhost:3001/auth/twitter", "_self");
  };

  const twitterLogout = async () => {
    window.open("http://localhost:3001/auth/logout", "_self");
  };

  let hasAdminPrivileges = true;

  axios.get(`http://localhost:3001/hasAdminPrivileges/${userObject.id}`).then((response) => {
    hasAdminPrivileges = response.data;
  });

  useEffect(() => {
    setIsLoading(true);

    // update the viewport width state when the window is resize0d
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //TODO: display the name and profile image of the logged in user
  //TODO: add functinality to change the .active class name on the links
  return (
    <React.Fragment>
      <main id="topbar">
        <Navbar collapseOnSelect expand="lg" className="n" >
          <div className="con1">
            <Navbar.Brand href="#home" id="name-title">
              {userObject.id ? (
                <React.Fragment>
                  <p>{userObject.displayName}</p>
                  <img src={userObject.photos[0].value} alt="profile" />
                  <button onClick={twitterLogout}>Logout</button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <p>You are not loged in!</p>
                  <button onClick={twitterLogin}>Login</button>
                </React.Fragment>
              )}
            </Navbar.Brand>
            {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}

            <div id="r">
              <Nav className="nav" style={{ marginRight: "0px !important" }}>
              
                {location === "/" ? (
                  // display this HTML on the home page
                  <React.Fragment>
                    {viewportWidth > 800 ? (
                      <React.Fragment>
                        <Nav.Link className="topnav" href="#features">All(31)</Nav.Link>
                        <Nav.Link className="topnav" href="#features">Live(5)</Nav.Link>
                        <Nav.Link className="topnav" href="#features">Ongoing(2)</Nav.Link>
                        <Nav.Link className="topnav" href="#features">Ended(24)</Nav.Link>

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
              <div className="hamburger" onClick={ () => { onHide()} }>
                <GiHamburgerMenu  size={"2rem"} color={ "var(--secondary)"} style={{ display: hide === false ? 'block' : 'none' }}/>
                <AiOutlineClose  size={"2rem"} color={ "var(--secondary)"} style={{ display: hide === false ? 'none' : 'block' }}/>
                
            </div>
              <Nav>
                <Form className="d-flex">
                  <Button variant="outline-info" id="search-button" href="/tweets">
                    View All Tweets
                  </Button>
                </Form>
              </Nav>
            </div>
          </div>
        </Navbar>
      </main>
      <header  className="header" style={{ left: hide === false ? '-100vw' : '0' }}>
        <div class="d-flex flex-column headerdiv">
          

          <nav id="navbar" class="navheading navbar">
            <ul>
              <li >
                <a href="/" class="nav-link scrollto active" onClick={ () => { onHide()} }>
                  <AiOutlineHome/> <span>Home</span>
                </a>
              </li>
              <li>
                <a href="/Apply" class="nav-link scrollto" onClick={ () => { onHide()} }>
                <CgProfile/> <span>Apply</span>
                </a>
              </li>
              <li>
                <a href="/claim" class="nav-link scrollto" onClick={ () => { onHide()} }>
                  <CgFile/> <span>Claim</span>
                </a>
              </li>
              <li>
                <a href="/profile" class="nav-link scrollto" onClick={ () => { onHide()} }>
                  <CgProfile/> <span>My Profile</span>
                </a>
              </li>
              {hasAdminPrivileges && (
                <li>
                  <a href="/admin" className="nav-link scrollto">
                    <MdOutlineAdminPanelSettings/> <span>Admin Panel</span>
                  </a>
                </li>
              )}
            </ul>
          </nav>
          <div class="profile">
            {userObject.id ? (
              <React.Fragment>
                <img src={userObject.photos[0].value} alt="" class="img-fluid rounded-circle" />

                <h1 class="text-light">
                  <a href="/">{userObject.displayName}</a>
                </h1>
                <button className="loginbtn" onClick={twitterLogout}>Logout</button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <p className="notloggedin">You are not loged in!</p>
                <button className="loginbtn" onClick={twitterLogin}>Login</button>
              </React.Fragment>
            )}
          </div>
        </div>
      </header>
      <header id="responsive" className="header">
        <div class="d-flex flex-column headerdiv">
          

          <nav id="navbar" class="navheading navbar">
            <ul>
              <li >
                <a href="/" class="nav-link scrollto active">
                  <AiOutlineHome/> <span>Home</span>
                </a>
              </li>
              <li>
                <a href="/Apply" class="nav-link scrollto">
                <CgProfile/> <span>Apply</span>
                </a>
              </li>
              <li>
                <a href="/claim" class="nav-link scrollto">
                  <CgFile/> <span>Claim</span>
                </a>
              </li>
              <li>
                <a href="/profile" class="nav-link scrollto">
                  <CgProfile/> <span>My Profile</span>
                </a>
              </li>
              {hasAdminPrivileges && (
                <li>
                  <a href="/admin" className="nav-link scrollto">
                    <MdOutlineAdminPanelSettings/> <span>Admin Panel</span>
                  </a>
                </li>
              )}
            </ul>
          </nav>
          <div class="profile">
            {userObject.id ? (
              <React.Fragment>
                <img src={userObject.photos[0].value} alt="" class="img-fluid rounded-circle" />

                <h1 class="text-light">
                  <a href="/">{userObject.displayName}</a>
                </h1>
                <button className="loginbtn" onClick={twitterLogout}>Logout</button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <p className="notloggedin">You are not loged in!</p>
                <button className="loginbtn" onClick={twitterLogin}>Login</button>
              </React.Fragment>
            )}
          </div>
        </div>
      </header>
      
    </React.Fragment>
  );
}

export default Header;
