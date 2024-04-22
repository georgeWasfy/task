const UserModel = require('./user.model');

const createUser = async (user) => {
    const doc = await UserModel.create(user);
    return doc;
};

module.exports = {
  createUser,
};
