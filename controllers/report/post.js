const reportSchema = require("../../models/reportSchema");

const handleErrors = (err) => {
  let errors = {};

  if (err.message.includes("Report validation failed")) {
    Object.values(err.errors).forEach(
      ({ properties }) => (errors[properties.path] = properties.message)
    );
  }

  return errors;
};
module.exports = async (req, res) => {
  try {
    await reportSchema
      .create(req.body)
      .then((data) => res.json({ code: 200, status: "success", data }));
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({ code: 400, status: "failed", errors });
  }
};
