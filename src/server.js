// require("dotenv").config();
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./api/routes/router");
const logger = require("./api/utils/logger");

// import sequelize from model
const { sequelize } = require("./api/models");

const app = express();

const PORT = process.env.PORT || 3000;

// cors
const allowedOrigins = `${process.env.ALLOWED_ORIGINS}`.split(",");

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", router);

app.listen(PORT, async () => {
  logger.info(`Server listening on port ${PORT}`);
  await sequelize.authenticate();
  logger.info(`DB connected successfully`);
});
