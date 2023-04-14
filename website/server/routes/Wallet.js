// Replace with your cardano node server. If you use the docker-compose file from the cardano-wallet-js repo, you can use the following url
/*const fs = require("fs");
const yaml = require("js-yaml");

try {
  const config = yaml.load(fs.readFileSync("config.yml", "utf8"));
  const network = config.NETWORK || "testnet";
  // Use the parsed configuration to run your desired commands or scripts
  console.log(`Running with NETWORK=${network}`);
  // Your code here...
} catch (e) {
  console.error(e);
}*/

const { WalletServer } = require("cardano-wallet-js");
const walletServer = WalletServer.init("http://localhost:8090/v2");
const express = require("express");
const router = express.Router();
const Seed = require("cardano-wallet-js").Seed;

let information = walletServer.getNetworkInformation();
//console.log(information);
/*
// Replace with your wallet recovery phrase . It is the deposit address wallet
let recoveryPhrase =
  "ill tourist faint bunker fix cloud custom raise toe engage tuna cart direct strike earn";

let mnemonic_sentence = Seed.toMnemonicList(recoveryPhrase);

let passphrase = "password123";

let name = "deposit_wallet";

// Initialize the wallet
let wallet;

// Create the wallet or load it if it already exists
/*
const initWallet = async () => {
  try {
    wallet = await walletServer.createOrRestoreShelleyWallet(name, mnemonic_sentence, passphrase);
  } catch (e) {
    const wallets = await walletServer.wallets();
    wallet = wallets.find((w) => w.name === name);
  }
};*/

// Route for getting network information
// http://localhost:4000/
router.get("/", async (req, res) => {
  let information = await walletServer.getNetworkInformation();
  res.send(information);
});

/*
// Route for getting wallet address
// http://localhost:4000/address
router.get("/address", async (req, res) => {
  let address = await wallet.getAddressAt(0);
  res.send(address);
});

//TODO: add the funds widthdrawed and desposited to the database Users model

// Route for getting wallet balance
// http://localhost:4000/balance
router.get("/balance", async (req, res) => {
  try {
    await wallet.refresh();
    let balance = wallet.getTotalBalance();

    res.send({
      balance: balance,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

// Route for withdrawing funds
// http://localhost:4000/withdraw
router.post("/withdraw", async (req, res) => {
  try {
    let address = req.body.address;
    let amount = req.body.amount;

    //TODO: Check claimable balance from database before withdrawing

    //TODO: Check Authentication before withdrawing

    // TODO: Verify address is authenticated user's address

    if (!address || !amount) {
      res.status(400).send("Invalid request");
    }

    let receiverAddress = [new AddressWallet(address)];
    let amounts = [amount * 1000000]; // convert to lovelace

    await wallet.refresh();

    let tx = await wallet.sendPayment(passphrase, receiverAddress, amounts);

    res.send({
      tx: tx,
    });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});
*/

module.exports = router;
