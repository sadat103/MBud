const mongoose = require("mongoose");

const surahsSchema = mongoose.Schema(
  {
    surah_no: {
      type: Number,
    },
    ayah_no: {
      type: Number,
    },
    ayah_transliteration: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const SurahTrnslr = mongoose.model("SurahsTranslrtn", surahsSchema);

module.exports = SurahTrnslr;
