const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const router = require('./routes');
const apiErrorHandler = require('./error/api-error-handler');

const app = express();
const port = process.env.PORT || '7832';
dotenv.config({
  path: './config/config.env'
});
// replacement of bodyParser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// db connection
connectDB();

// routes
app.use('/', router);

// Error handler middleware function
app.use(apiErrorHandler);

app.listen(port, () => {
  console.log(`App started with port ${port}`);
});
