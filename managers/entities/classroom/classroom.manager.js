const {
  createClassroom,
  updateClassroom,
  deleteClassroom,
  getAllClassrooms,
} = require("./classroom.service");

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
    this.userExposed = [
      "post=create",
      "patch=update",
      "delete=delete",
      "get=get",
    ];
  }

  async create({ name, capacity, school, students, ...rest }) {
    const token = rest.__token;
    const adminId = token.userId;
    const classroom = { name, capacity, school, students };

    // Data validation
    let result = await this.validators.classroom.create(classroom);
    if (result) return result;

    // Creation Logic
    let createdClassroom = await createClassroom(adminId, classroom);

    // Response
    return {
      classroom: createdClassroom,
    };
  }

  async update({ name, capacity, school, students, ...rest }) {
    const query = rest.__query;
    const classroom = { name, capacity, school, students };
    const token = rest.__token;
    const adminId = token.userId;
    if (!query.id) {
      throw new Error("Classroom Id must be provided");
    }
    // Data validation
    let result = await this.validators.classroom.update(classroom);
    if (result) return result;

    const res = await updateClassroom(adminId, query.id, classroom);

    // Response
    return {
      msg: res.msg || "updated succesfully",
    };
  }

  async delete(req) {
    const query = req.__query;
    const token = req.__token;
    const adminId = token.userId;
    if (!query.id) {
      throw new Error("Classroom Id must be provided");
    }

    const deleted = await deleteClassroom(adminId, query.id);

    // Response
    return {
      msg: deleted.msg || "deleted succesfully",
    };
  }

  async get() {
    let allClassrooms = await getAllClassrooms();

    // Response
    return {
      classrooms: allClassrooms,
    };
  }
};
