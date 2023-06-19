const reportSchema = require("../../models/reportSchema");

module.exports = async (req, res) => {
  const { id } = req.params;

  try {
    const report = await reportSchema.findById(id).populate("userId");
    res.json({ code: 200, status: "success", data: report });
  } catch (error) {
    res.status(500).send(error);
  }
};
