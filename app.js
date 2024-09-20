const express = require("express");
const app = express();
const logger = require("./middleware/logger");
const { errors, errorHandler, notFound } = require("./middleware/errors");
require("dotenv").config();
const connectToDb = require("./config/db");
//connect to database
connectToDb();
const port = process.env.PORT || 8000;

//middleware
app.use(express.json());
app.use(logger);

// routes
app.use("/api/books", require("./routes/books"));
app.use("/api/authors", require("./routes/author"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));

//error handler middleware
app.use(notFound);

app.use(errorHandler);

//running server
app.listen(port, () =>
  console.log(
    `server listening in ${process.env.NODE_ENV} mode on port ${port}!`
  )
);
