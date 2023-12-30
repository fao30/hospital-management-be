require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");

const PORT = process.env.PORT || 3000;

const app = express();
const { sequelize } = require("./api/models");

// setup swagger
const swaggerUI = require("swagger-ui-express");
const apiDocs = require("./config/apidocs.json");
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(apiDocs));

// cors
const allowedOrigins = `${process.env.ALLOWED_ORIGINS}`.split(",");

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(logger("dev"));

// // initialize passport
// require("./api/middlewares/passportJWT");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// // registerLogin Routes
// app.use("/api/register", require("./api/routes/registerLogin/registerRoutes"));
// app.use("/api", require("./api/routes/registerLogin/loginRoutes"));

// // singleTables Routes
// app.use("/api/cities", require("./api/routes/singleTables/citiesRoutes"));

app.get("/", (req, res) => {
  console.log("EEHEHEHEHEHHEE");
  res.send("Hello, world!");
});

app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
  // await sequelize.authenticate();
  console.log(`DB connected successfully`);
});
