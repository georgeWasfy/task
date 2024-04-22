const {
  createSchool,
  updateSchool,
  deleteSchool,
  getAllSchools,
} = require("./school.service");

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
    this.userExposed = [
      "post=create",
      "patch=update",
      "delete=delete",
      "get=get",
    ];
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

  async update({ name, address, phoneNumber, noOfClassrooms, ...rest }) {
    const query = rest.__query;
    const school = { name, address, phoneNumber, noOfClassrooms };
    if (!query.id) {
      throw new Error("School Id must be provided");
    }
    // Data validation
    let result = await this.validators.school.update(school);
    if (result) return result;

    await updateSchool(query.id, school);

    // Response
    return {
      msg: "updated succesfully",
    };
  }

  async delete(req) {
    const query = req.__query;
    if (!query.id) {
      throw new Error("School Id must be provided");
    }

    await deleteSchool(query.id);

    // Response
    return {
      msg: "deleted succesfully",
    };
  }

  async get() {
    let allSchools = await getAllSchools();

    // Response
    return {
      schools: allSchools,
    };
  }
};
