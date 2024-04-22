const UserModel = require("./user.model");

const createUser = async (user) => {
  const newUser = new UserModel({
    username: user.username,
    email: user.email,
    school: user.school,
    role: user.role,
  });

  var hashedPassword = await newUser.createHash(user.password);
  newUser.password = hashedPassword;

  // Save newUser object to database
  const doc = await newUser.save();
  return doc;
};

module.exports = {
  createUser,
};
