const reportSchema = require("../../models/reportSchema");

module.exports = async (req, res) => {
  try {
    const reports = await reportSchema.find().populate("user");

    res.json({ code: 200, status: "success", data: reports });
  } catch (error) {
    res.status(500).send(error);
  }
};
