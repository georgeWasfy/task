const SchoolModel = require("./school.model");

const createSchool = async (school) => {
    const doc = await SchoolModel.create(school);
    return doc;
};

module.exports = {
  createSchool,
};
