const { default: mongoose } = require("mongoose");

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nama Tidak Boleh Kosong"],
    },
    caseType: {
      type: String,
      required: [true, "Tipe Kasus TIdak Boleh Kosong"],
    },
    location: {
      type: String,
      required: [true, "Lokasi Kejadian TIdak Boleh Kosong"],
    },
    caseDate: {
      type: Date,
      required: [true, "Tanggal Kejadian TIdak Boleh Kosong"],
    },
    desc: {
      type: String,
      required: [true, "Rincian Kejadian TIdak Boleh Kosong"],
    },
    status: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const reportSchema = mongoose.model("Report", schema);
module.exports = reportSchema;
