// the function which will be called when twitter redirects to the server at http://www.localhost:3001/oauth/twitter
async function twitterOauth(req, res) {
  const code = req.query.code; // getting the code if the user authorized the app

  // 1. get the access token with the code

  // 2. get the twitter user using the access token

  // 3. upsert the user in our db

  // 4. create cookie so that the server can validate the user

  // 5. finally redirect to the client

  return res.redirect(CLIENT_URL);
}

module.exports = {
  twitterOauth,
};
