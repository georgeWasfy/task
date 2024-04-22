const StudetModel = require("./student.model");
const UserModel = require("../user/user.model");


const createStudent = async (adminId, student) => {
  const admin = await UserModel.findById(adminId);
  if (admin.school === undefined) {
    return {msg: 'Admin Cant add students as he is not assigned to a school'}
  }
  if (admin.school.toString() !== student.school) {
    return {msg: 'Admin isnt assigned to this school'}
    
  }
  const doc = await StudetModel.create(student);
  return doc;
};

const updateStudent = async (adminId, id, student) => {
  Object.keys(student).forEach((key) =>
    student[key] === undefined ? delete student[key] : {}
  );
  const admin = await UserModel.findById(adminId);
  if (admin.school === undefined) {
    return {msg: 'Admin Cant add students as he is not assigned to a school'}
  }
  if (admin.school.toString() !== student.school) {
    return {msg: 'Admin isnt assigned to this school'}
    
  }
  const doc = await StudetModel.updateOne({ _id: id }, { $set: { ...student } });
  return doc;
};

const deleteStudent = async (adminId, id) => {
  const admin = await UserModel.findById(adminId);
  const student = await StudetModel.findById(id);
  if (admin.school === undefined) {
    return {msg: 'Admin Cant delete students as he is not assigned to a school'}
  }
  if (admin.school.toString() !== student.school.toString()) {
    return {msg: 'Admin isnt assigned to this school'}
    
  }
  const doc = await StudetModel.deleteOne({ _id: id });
  return doc;
};

const getAllStudents = async () => {
  const doc = await StudetModel.find();
  return doc;
};

module.exports = {
  createStudent,
  updateStudent,
  deleteStudent,
  getAllStudents,
};
