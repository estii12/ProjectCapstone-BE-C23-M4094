const { default: mongoose } = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Harap Masukan Nama Anda"],
      minlength: [3, "Username Harus Lebih Dari 2 Karakter"],
    },
    email: {
      type: String,
      required: [true, "Harap Masukan Email Anda"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "Harap Masukan Email Dengan Benar!"],
    },
    password: {
      type: String,
      required: [true, "Harap Masukan Password Anda"],
      minlength: [6, "Password Harus Lebih Dari 5 Karakter"],
    },
    role: {
      type: String,
      default: "user",
    },
    // reportIds: {
    //   type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Report" }],
    //   type: Array,
    //   default: [],
    // },
  },
  { timestamps: true }
);

// fire a function before doc saved to db
schema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

// static method to login user
schema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });

  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Password yang Anda Masukan Salah!");
  }
  throw Error("Email tidak terdaftar!");
};

const userSchema = mongoose.model("User", schema);
module.exports = userSchema;
