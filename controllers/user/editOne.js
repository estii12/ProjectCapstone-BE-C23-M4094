const userSchema = require("../../models/userSchema");

module.exports = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const users = await userSchema.findByIdAndUpdate(id, body);
    res.json({ code: 200, status: "success", data: users });
  } catch (error) {
    res.status(500).send(error);
  }
};
