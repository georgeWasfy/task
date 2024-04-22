const { createUser } = require("./user.service");

module.exports = class UserManager {
  constructor({
    utils,
    cache,
    config,
    cortex,
    managers,
    validators,
    mongomodels,
  } = {}) {
    this.config = config;
    this.cortex = cortex;
    this.validators = validators;
    this.mongomodels = mongomodels;
    this.tokenManager = managers.token;
    this.userExposed = ["post=signup"];
  }

  async signup({ username, email, password, school, role, phoneNumber }) {
    const user = { username, email, password, school, role, phoneNumber };

    // Data validation
    let result = await this.validators.user.create(user);
    if (result) return result;

    // Creation Logic
    let createdUser = await createUser(user);
    let longToken = this.tokenManager.genLongToken({
      userId: createdUser._id,
      userKey: createdUser.role,
    });

    // Response
    return {
      user: createdUser,
      longToken,
    };
  }
};
