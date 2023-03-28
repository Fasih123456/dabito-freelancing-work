const express = require("express");
const session = require("express-session");
const passport = require("passport");
const TwitterStrategy = require("passport-twitter").Strategy;
const cors = require("cors");

const PORT = process.env.PORT || 3001;
const app = express();

const OAuthRoutes = require("./routes/OAuth");
const TweetsRoutes = require("./routes/tweets");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", OAuthRoutes);
app.use("/", TweetsRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
