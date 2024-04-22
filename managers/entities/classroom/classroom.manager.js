const { createClassroom } = require("./classroom.service");

module.exports = class ClassroomManager {
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

  async create({ name, capacity, school, students }) {
    const classroom = { name, capacity, school, students  };

    // Data validation
    let result = await this.validators.classroom.create(classroom);
    if (result) return result;

    // Creation Logic
    let createdClassroom = await createClassroom(classroom);

    // Response
    return {
      classroom: createdClassroom,
    };
  }
};
