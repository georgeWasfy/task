const SchoolModel = require("./school.model");

const createSchool = async (school) => {
  const doc = await SchoolModel.create(school);
  return doc;
};

const updateSchool = async (id, school) => {
  Object.keys(school).forEach(key => school[key] === undefined ? delete school[key] : {});
  const doc = await SchoolModel.updateOne({ _id: id }, { $set: { ...school } });
  return doc;
};

const deleteSchool = async (id) => {
  const doc = await SchoolModel.deleteOne({ _id: id });
  return doc;
};

const getAllSchools = async () => {
  const doc = await SchoolModel.find();
  return doc;
};


module.exports = {
  createSchool,
  updateSchool,
  deleteSchool,
  getAllSchools,
};
