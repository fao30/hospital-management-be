// require("dotenv").config();
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const passportInitializer = require("./api/utils/passportStrategies");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./api/routes/router");
const logger = require("./api/utils/logger");

// import sequelize from model
const { sequelize } = require("./api/models");
// import passport strategies
const passportStrategies = require("../src/api/lib/passport.strategies");
const http = require("http");
const swaggerPath = require("./config/apidocs.json");
const swaggerUI = require("swagger-ui-express");
const createSocketIO = require("./socket"); // Import the module

const app = express();

const PORT = process.env.PORT || 3000;
const allowedOrigins = `${process.env.ALLOWED_ORIGINS}`.split(",");

app.use(cors());
// app.use(
//   cors({
//     origin: allowedOrigins,
//     credentials: true,
//   })
// );

app.use(morgan("dev"));

app.use(passportStrategies.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(passportInitializer.initialize());

// Use the module to set up Socket.IO
const server = http.createServer(app);
const io = createSocketIO.setupSocketIO(server);
app.set("socketio", io); // Export io to the global level

app.use("/api", router);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerPath));

server.listen(PORT, async () => {
  logger.info(`Server listening on port ${PORT}`);
  await sequelize.authenticate();
  logger.info(`DB connected successfully`);
});
