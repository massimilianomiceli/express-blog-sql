function errorsHandler(err, req, res, next) {
  res.status(550);
  res.json({
    error: err.message,
  });
}

module.exports = errorsHandler;
