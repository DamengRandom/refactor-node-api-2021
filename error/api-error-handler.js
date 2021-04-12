const ApiError = require("./ApiError");

// Error handler middleware function !!!!!
function apiErrorHandler(err, req, res, next) {
  // For developer (maybe cloudwatch ..)
  console.error(err);

  if (err instanceof ApiError) {
    res.status(err.code).json({ message: err.message });
    return;
  }

  res.status(500).json({ message: 'Server is down at moment ..' });
};

module.exports = apiErrorHandler;
