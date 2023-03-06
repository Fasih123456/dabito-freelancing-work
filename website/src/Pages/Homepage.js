import Header from "../Components/Header";
import Footer from "../Components/Footer";

import Card from "react-bootstrap/Card";

import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";

import Tweet from "../Components/Tweet";

import "../Css/App.css";
import "../Css/Homepage.css";

import React, { useState, useEffect } from "react";

function Homepage() {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    // update the viewport width state when the window is resized
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <main id="main">
        <Header />
        <section class="portfolio section-bg zero-bottom-padding">
          {viewportWidth > 800 ? (
            // display this HTML above 800px
            <React.Fragment></React.Fragment>
          ) : (
            // display this HTML below 800px
            <ul id="portfolio-flters">
              <li data-filter="*" class="filter-active .status-tag">
                All(31)
              </li>
              <li data-filter=".filter-app status-tag">Live(5)</li>
              <li data-filter=".filter-card .status-tag">Ongoing(2)</li>
              <li data-filter=".filter-web .status-tag">Ended(24)</li>
            </ul>
          )}
        </section>

        <section id="portfolio" class="portfolio section-bg zero-top-padding">
          <div class="container section-container">
            <div class="section-title">
              <h2>Featured Tweets</h2>
            </div>

            <div class="row portfolio-container" id="featured-tweets-contianer">
              <Tweet
                title="Dummy"
                text="Look at this cool NFT"
                winner="24"
                amount="45000"
                hour="12"
                min="24"
                sec="25"
              />

              <Tweet
                title="Dummy"
                text="Look at this cool NFT"
                winner="24"
                amount="45000"
                hour="12"
                min="24"
                sec="25"
              />
            </div>
          </div>
        </section>
        <section id="portfolio" class="portfolio section-bg">
          <div class="container">
            <div class="section-title">
              <h2>Other Tweets</h2>
            </div>

            <div class="row portfolio-container" style={{ width: "100%" }}>
              <Tweet
                title="Dummy"
                text="Look at this cool NFT"
                winner="24"
                amount="45000"
                hour="12"
                min="24"
                sec="25"
              />

              <Tweet
                title="Dummy"
                text="Look at this cool NFT"
                winner="24"
                amount="45000"
                hour="12"
                min="24"
                sec="25"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Homepage;
