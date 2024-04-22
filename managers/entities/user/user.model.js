const mongoose = require("mongoose");
const validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  role: {
    type: String,
    default: "STUDENT",
    enum: ["STUDENT", "ADMIN", "SUPERADMIN"],
    },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  phoneNumber: {
    type: String,
    maxlength: 11,
    unique: true,
  },
  school: {type: mongoose.Types.ObjectId, ref: "schools"}
});

// Create a Mongoose model based on the schema
const UserModel = mongoose.model("users", usersSchema);

// Export the model for use in your application
module.exports = UserModel;
