const ClassroomModel = require("./classroom.model");
const StudentModel = require("../student/student.model");
const UserModel = require("../user/user.model");

const createClassroom = async (adminId, classroom) => {
  const { students, ...rest } = classroom;
  const admin = await UserModel.findById(adminId);
  if (admin.school === undefined) {
    return {
      msg: "Admin Cant add classrooms as he is not assigned to a school",
    };
  }
  if (admin.school.toString() !== classroom.school) {
    return { msg: "Admin isnt assigned to this school" };
  }
  const doc = await ClassroomModel.create(rest);
  if (students && students.length) {
    let existingStudents = await StudentModel.distinct("_id", {
      _id: { $in: students },
      school: rest.school,
    });
    if (students.length === existingStudents.length) {
      const updated = await ClassroomModel.updateOne(
        { _id: doc._id },
        { $set: { students } }
      );
      if (updated.modifiedCount) doc.students = students;
    }
  }

  return doc;
};

const updateClassroom = async (adminId, id, classroom) => {
  Object.keys(classroom).forEach((key) =>
    classroom[key] === undefined ? delete classroom[key] : {}
  );
  const admin = await UserModel.findById(adminId);
  if (admin.school === undefined) {
    return {msg: 'Admin Cant add classrooms as he is not assigned to a school'}
  }
  if (admin.school.toString() !== classroom.school) {
    return {msg: 'Admin isnt assigned to this school'}
    
  }
  const doc = await ClassroomModel.updateOne(
    { _id: id },
    { $set: { ...classroom } }
  );
  return doc;
};

const deleteClassroom = async (id) => {
  const admin = await UserModel.findById(adminId);
  const classroom = await ClassroomModel.findById(id);
  if (admin.school === undefined) {
    return {msg: 'Admin Cant delete classroom as he is not assigned to a school'}
  }
  if (admin.school.toString() !== classroom.school.toString()) {
    return {msg: 'Admin isnt assigned to this school'}
    
  }
  const doc = await ClassroomModel.deleteOne({ _id: id });
  return doc;
};

const getAllClassrooms = async () => {
  const doc = await ClassroomModel.find();
  return doc;
};

module.exports = {
  createClassroom,
  updateClassroom,
  deleteClassroom,
  getAllClassrooms,
};
