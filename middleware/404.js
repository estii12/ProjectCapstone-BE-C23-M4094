const notFound = (req, res) => {
  res.status(404);

  res.send({
    code: 404,
    status: "failed",
    message: `Resource ${req.originalUrl} Not Found`,
  });
};

module.exports = notFound;
