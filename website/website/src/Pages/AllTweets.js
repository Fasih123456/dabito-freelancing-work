import TweetPagination from "../Components/Pagination";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { myContext } from "../Components/OAuthContext";
import Tweet from "../Components/Tweet";

function AllTweets({}) {
  const [alltweets, setTweets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // State to keep track of current page
  const [tweetsPerPage] = useState(10); // Number of tweets to display per page
  const userObject = useContext(myContext);

  useEffect(() => {
    axios.get("http://localhost:3001/api/tweets").then((res) => {
      console.log(res.data);
      setTweets(res.data);
    });
  }, []);

  console.log(alltweets);

  // Get the index of the last tweet on the current page
  const indexOfLastTweet = currentPage * tweetsPerPage;
  // Get the index of the first tweet on the current page
  const indexOfFirstTweet = indexOfLastTweet - tweetsPerPage;
  // Get the tweets to display on the current page
  const currentTweets = alltweets.slice(indexOfFirstTweet, indexOfLastTweet);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <main id="main">
      <div class="section-title">
        <Row>
          <Col>
            <h2>Featured Tweets</h2>
          </Col>
        </Row>
      </div>
      <div className="row portfolio-container" style={{ width: "90%", marginLeft: "2px" }}>
        {userObject && currentTweets.length > 0
          ? currentTweets.map((tweet) => {
              return (
                <Tweet
                  key={tweet.tweet_id} // Use a unique key for each tweet item
                  id={tweet.tweet_id}
                  title={userObject.username}
                  text={tweet.tweet_text}
                  winner={tweet.max_winners}
                  amount={tweet.reward_per_winner}
                  creationTime={tweet.creation_time}
                  expiryTime={tweet.expiry_time}
                  requirements={tweet.requirements}
                  isFeatured={tweet.featured_tweet}
                  isCommunity={tweet.communityName === "EMPTY" ? false : true}
                  edit={false}
                />
              );
            })
          : "yo"}
      </div>
      <TweetPagination
        pageNumbers={Math.ceil(alltweets.length / tweetsPerPage)} // Calculate total number of pages based on total tweets and tweets per page
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </main>
  );
}

export default AllTweets;
