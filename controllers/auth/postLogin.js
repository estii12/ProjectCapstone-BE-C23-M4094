const userSchema = require("../../models/userSchema");
const jwt = require("jsonwebtoken");

const handleErrors = (err) => {
  console.log(`${err.message} (${err.code})`);
  let errors = { email: "", password: "" };

  if (err.message.includes("Email")) {
    errors.email = err.message;
  } else {
    errors.password = err.message;
  }

  return errors;
};

const expiredTime = 3 * 24 * 60 * 60; // 3 Days
const createToken = (id) => {
  return jwt.sign({ id }, "users secret", {
    expiresIn: expiredTime,
  });
};

module.exports = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userSchema.login(email, password);

    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: expiredTime * 1000 });
    res.status(200).json({
      code: 200,
      status: "success",
      userId: user._id,
      role: user.role,
      jwt: token,
    });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ code: 400, status: "failed", errors });
  }
};
