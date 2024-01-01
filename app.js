const express = require("express");
const cors = require("cors");
const app = express();

//.env
// dotenv.config();

//middleware
app.use(cors());
app.use(express.json());

//body-parser
app.use(express.urlencoded({ extended: false }));

//routes
// app.use("/", router);

// error handler
// app.use(ErrorHandler);

module.exports = app;
