const express = require("express");
const session = require("express-session");
const passport = require("passport");
const TwitterStrategy = require("passport-twitter").Strategy;
const { WalletServer } = require("cardano-wallet-js");

const cors = require("cors");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const OAuthRoutes = require("./routes/OAuth");
const TweetsRoutes = require("./routes/tweets");
//const WalletRoutes = require("./routes/Wallet");
const UserRoutes = require("./routes/Users");
const CouponRoutes = require("./routes/Coupons");
const RaiderRoutes = require("./routes/Raider");
const TwitterAPIRoutes = require("./routes/TwitterAPI");
//const CardanocliJs = require("cardanocli-js");
//const shelleyGenesisPath = "/home/ada/mainnet-shelley-genesis.json";

//const cardanocliJs = new CardanocliJs({ shelleyGenesisPath });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//console.log(information);

app.use("/", OAuthRoutes);
app.use("/", TweetsRoutes);
app.use("/", UserRoutes);
app.use("/", CouponRoutes);
app.use("/", RaiderRoutes);
app.use("/", TwitterAPIRoutes);
//app.use("/", WalletRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
