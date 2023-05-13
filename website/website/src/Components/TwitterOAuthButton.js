import twitterIcon from "../Assets/twitter-icon.png";
const TWITTER_CLIENT_ID = "kaCfaNRiXXo2b3RbU2QgYUBRH";

function getTwitterOauthUrl() {
  const rootUrl = "https://twitter.com/i/oauth2/authorize";
  const options = {
    redirect_uri: "http://www.localhost:3001/oauth/twitter/callback", // client url cannot be http://localhost:3000/ or http://127.0.0.1:3000/
    client_id: TWITTER_CLIENT_ID, 
    state: "state",
    response_type: "code",
    code_challenge: "challenge",
    code_challenge_method: "plain",
    scope: ["users.read", "tweet.read", "follows.read"].join(" "), // add/remove scopes as needed
  };
  const qs = new URLSearchParams(options).toString();
  return `${rootUrl}?${qs}`;
}

// the component
export function TwitterOauthButton() {
  return (
    <a className="a-button row-container" href={getTwitterOauthUrl()}>
      <img src={twitterIcon} alt="twitter" />
      <p>{" twitter"}</p>
    </a>
  );
}
