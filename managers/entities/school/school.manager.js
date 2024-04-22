const { createSchool } = require("./school.service");

module.exports = class SchoolManager {
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
    // this.schoolsCollection = "schools";
    this.userExposed = ["post=create"];
  }

  async create({ name, address, phoneNumber, noOfClassrooms }) {
    const school = { name, address, phoneNumber, noOfClassrooms };

    // Data validation
    let result = await this.validators.school.create(school);
    if (result) return result;

    // Creation Logic
    let createdSchool = await createSchool(school);

    // Response
    return {
      school: createdSchool,
    };
  }
};
