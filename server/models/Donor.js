const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
  donorName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },

  bloodGroup: {
    type: String,
    required: true,
  },

  bloodDonationHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
    },
  ],

  token: {
    type: String,
  },

  accountType: {
    type: String,
    enum: ["donor", "hospital"],
    required: true,
  },

  ignoredRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
    },
  ],

  gender: {
    type: String,
    enum: ["male", "female", "other"],
    // required: true,
  },
  dateOfBirth: {
    type: Date,
  },
  pincode: {
    type: Number,
  },
  address: {
    type: String,
  },
});

module.exports = mongoose.model("Donor", donorSchema);
