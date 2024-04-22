const { create } = require("./student.service");

module.exports = class StudentManager {
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
    this.userExposed = ["post=create"];
  }

  async create({ name, email, school }) {
    const student = { name, email, school };

    // Data validation
    let result = await this.validators.user.create(student);
    if (result) return result;

    // Creation Logic
    let createdStudent = await create(user);
    // Response
    return {
      student: createdStudent,
    };
  }
};
