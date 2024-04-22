const mongoose = require("mongoose");

const schoolsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  address: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 200,
  },
  phoneNumber: {
    type: String,
    maxlength: 11,
    required: true,
    unique: true,
  },
  noOfClassrooms: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
});

module.exports = mongoose.model("schools", schoolsSchema);
