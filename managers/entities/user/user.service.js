const UserModel = require("./user.model");

const createUser = async (user) => {
  const newUser = new UserModel({
    username: user.username,
    email: user.email,
    school: user.school
  });

  var hashedPassword = await newUser.createHash(user.password);
  newUser.password = hashedPassword;

  // Save newUser object to database
  const doc = await newUser.save();
  // const doc = await UserModel.create(user);
  return doc;
};

module.exports = {
  createUser,
};
