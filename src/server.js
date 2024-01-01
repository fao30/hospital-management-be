// require("dotenv").config();
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const router = require("./api/routes/router");

const app = express();

const PORT = process.env.PORT || 3000;

// cors
const allowedOrigins = `${process.env.ALLOWED_ORIGINS}`.split(",");

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(logger("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", router);

app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
  // await sequelize.authenticate();
  console.log(`DB connected successfully`);
});
