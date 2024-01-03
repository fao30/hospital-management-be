let envPath = "./src/config/.env";

process.argv.forEach((val, index) => {
  val === "-env" ? (envPath = process.argv[index + 1]) : null;
});

const dotenv = require("dotenv");
dotenv.config({ path: envPath });
