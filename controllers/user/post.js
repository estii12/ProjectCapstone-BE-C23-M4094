const userSchema = require("../../models/userSchema");

module.exports = async (req, res) => {
  try {
    await userSchema
      .create(req.body)
      .then((data) => res.json({ code: 200, status: "success", data }));
  } catch (error) {
    res.status(500).send(error);
  }
};
