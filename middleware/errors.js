const notFound = (req, res, next) => {
  const err = new Error(`Not Found -${req.originalUrl}`);
  res.status(400);
  next(err);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({ message: err.message });
};

module.exports = {
  notFound,
  errorHandler,
};
