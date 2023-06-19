const userSchema = require("../../models/userSchema");
const jwt = require("jsonwebtoken");

const handleErrors = (err) => {
  console.log(`${err.message} (${err.code})`);
  let errors = { email: "" };

  // Duplicate Errors
  if (err.code === 11000) {
    errors.email = "Email yang Anda Masukan Sudah Terdaftar";
    return errors;
  }

  // Validation Erros
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(
      ({ properties }) => (errors[properties.path] = properties.message)
    );
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
  try {
    const user = await userSchema.create(req.body);

    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: expiredTime * 1000 });
    res.status(200).json({ code: 200, status: "success", userId: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ code: 400, status: "failed", errors });
  }
};
