//Basic Lib Import
const express = require("express");
const router = require("./src/routes/api");
const app = new express();
const bodyParser = require("body-parser");

// Security Middleware Lib Import
const expressRateLimit = require("express-rate-limit");
const helmet = require("helmet");
const expressMongoSanitize = require("express-mongo-sanitize");
const xssClean = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");

// Database Lib Import
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");

// Security Middleware Implement
app.use(cors());
app.use(helmet());
app.use(expressMongoSanitize());
app.use(xssClean());
app.use(hpp());

// Body Parser Implement
app.use(bodyParser.json());

// Request Rate Limit
const limiter = rateLimit({ windowMs: 30 * 60 * 1000, max: 2000 });
app.use(limiter);

// Mongo DB Database Connection
let URI = "mongodb://localhost:27017/SaltSync-Internet";
let OPTION = { user: "", pass: "", autoIndex: true };
mongoose.connect(URI, OPTION, (error) => {
  console.log("Connection Success");
  console.log(error);
});

// Routing Implement
app.use("/api/v1", router);

// Undefined Route Implement
app.use("*", (req, res) => {
  res.status(404).json({ status: "Fail", data: "Not Found" });
});

module.exports = app;
