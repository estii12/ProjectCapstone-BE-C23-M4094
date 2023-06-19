module.exports = async (req, res) => {
  try {
    res.cookie("jwt", "", { httpOnly: true, maxAge: -1 });
    res.status(200).json({ code: 200, status: "logout success" });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ code: 400, message: "failed", errors });
  }
};
