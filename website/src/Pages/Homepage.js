import Header from "../Components/Header";
import Footer from "../Components/Footer";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "../Css/App.css";

function Homepage() {
  return (
    <div>
      <Header />

      <main id="main">
        <section class="portfolio section-bg zero-bottom-padding">
          <ul id="portfolio-flters">
            <li data-filter="*" class="filter-active">
              All(31)
            </li>
            <li data-filter=".filter-app">Live(5)</li>
            <li data-filter=".filter-card">Ongoing(2)</li>
            <li data-filter=".filter-web">Ended(24)</li>
          </ul>
        </section>

        <section id="portfolio" class="portfolio section-bg zero-top-padding">
          <div class="container section-container">
            <div class="section-title">
              <h2>Featured Tweets</h2>
            </div>

            <div class="row portfolio-container" id="featured-tweets-contianer">
              <div class="card mb-3">
                <div class="row g-0">
                  <div
                    class="col-md-2"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src="../assets/img/profile-img.jpg"
                      class="img-fluid rounded-start homepage-icon"
                      alt="..."
                    />
                  </div>
                  <div class="col-md-10">
                    <div class="card-body">
                      <h5 class="card-title">@dummy1</h5>
                      <p class="card-text">Check out this awesome nft</p>
                      <div class="row g-0">
                        <div class="col-md-3">Reward</div>
                        <div class="col-md-3">Time</div>
                        <div class="col-md-3">Max Winner</div>
                        <div class="col-md-3"></div>
                      </div>
                      <div class="row g-0">
                        <div class="col-md-3">$45000</div>
                        <div class="col-md-3">12h 33m 24s</div>
                        <div class="col-md-3">32</div>
                        <div class="col-md-3">
                          {" "}
                          <button type="button" class="btn btn-primary" style={{ width: "80%" }}>
                            Enter
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="card mb-3">
                <div class="row g-0">
                  <div
                    class="col-md-2"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src="../assets/img/profile-img.jpg"
                      class="img-fluid rounded-start homepage-icon"
                      alt="..."
                    />
                  </div>
                  <div class="col-md-10">
                    <div class="card-body">
                      <h5 class="card-title">@dummy1</h5>
                      <p class="card-text">Check out this awesome nft</p>
                      <div class="row g-0">
                        <div class="col-md-3">Reward</div>
                        <div class="col-md-3">Time</div>
                        <div class="col-md-3">Max Winner</div>
                        <div class="col-md-3"></div>
                      </div>
                      <div class="row g-0">
                        <div class="col-md-3">$45000</div>
                        <div class="col-md-3">12h 33m 24s</div>
                        <div class="col-md-3">32</div>
                        <div class="col-md-3">
                          {" "}
                          <button type="button" class="btn btn-primary" style={{ width: "80%" }}>
                            Enter
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="portfolio" class="portfolio section-bg">
          <div class="container">
            <div class="section-title">
              <h2>Other Tweets</h2>
            </div>

            <div class="row portfolio-container" style={{ width: "100%" }}>
              <div class="card mb-3">
                <div class="row g-0">
                  <div
                    class="col-md-2"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src="../assets/img/profile-img.jpg"
                      class="img-fluid rounded-start homepage-icon"
                      alt="..."
                    />
                  </div>
                  <div class="col-md-10">
                    <div class="card-body">
                      <h5 class="card-title">@dummy1</h5>
                      <p class="card-text">Check out this awesome nft</p>
                      <div class="row g-0">
                        <div class="col-md-3">Reward</div>
                        <div class="col-md-3">Time</div>
                        <div class="col-md-3">Max Winner</div>
                        <div class="col-md-3"></div>
                      </div>
                      <div class="row g-0">
                        <div class="col-md-3">$45000</div>
                        <div class="col-md-3">12h 33m 24s</div>
                        <div class="col-md-3">32</div>
                        <div class="col-md-3">
                          {" "}
                          <button type="button" class="btn btn-primary" style={{ width: "80%" }}>
                            Enter
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="card mb-3">
                <div class="row g-0">
                  <div
                    class="col-md-2"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src="../assets/img/profile-img.jpg"
                      class="img-fluid rounded-start homepage-icon"
                      alt="..."
                    />
                  </div>
                  <div class="col-md-10">
                    <div class="card-body">
                      <h5 class="card-title">@dummy1</h5>
                      <p class="card-text">Check out this awesome nft</p>
                      <div class="row g-0">
                        <div class="col-md-3">Reward</div>
                        <div class="col-md-3">Time</div>
                        <div class="col-md-3">Max Winner</div>
                        <div class="col-md-3"></div>
                      </div>
                      <div class="row g-0">
                        <div class="col-md-3">$45000</div>
                        <div class="col-md-3">12h 33m 24s</div>
                        <div class="col-md-3">32</div>
                        <div class="col-md-3">
                          {" "}
                          <button type="button" class="btn btn-primary" style={{ width: "80%" }}>
                            Enter
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Homepage;
