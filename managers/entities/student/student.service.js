const StudetModel = require("./student.model");

const create = async (student) => {
  const doc = await StudetModel.create(student);
  return doc;
};

module.exports = {
  create,
};
