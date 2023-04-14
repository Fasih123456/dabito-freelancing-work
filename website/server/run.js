const fs = require("fs");
const yaml = require("js-yaml");

try {
  const config = yaml.load(fs.readFileSync("config.yml", "utf8"));
  const network = config.NETWORK || "testnet";
  // Use the parsed configuration to run your desired commands or scripts
  console.log(`Running with NETWORK=${network}`);
  // Your code here...
} catch (e) {
  console.error(e);
}
