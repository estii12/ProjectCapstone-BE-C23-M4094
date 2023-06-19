const userSchema = require("../../models/userSchema");

module.exports = async (req, res) => {
  try {
    const users = await userSchema.find().populate("reportIds");
    res.json({ code: 200, status: "success", data: users });
  } catch (error) {
    res.status(500).send(error);
  }
};
