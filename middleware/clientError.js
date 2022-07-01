const createError = require("http-errors");

// catch 404 and forward to error handler
const client = (req, res, next) => {
  next(createError(404));
};

module.exports = {
  client,
};
