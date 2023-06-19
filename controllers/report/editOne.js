const reportSchema = require("../../models/reportSchema");

module.exports = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  console.log("done");
  try {
    const report = await reportSchema.findByIdAndUpdate(id, body);
    res.json({ code: 200, status: "success", data: report });
  } catch (error) {
    res.status(500).send(error);
  }
};