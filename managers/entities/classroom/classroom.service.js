const ClassroomModel = require("./classroom.model");
const UserModel = require("../user/user.model");


const createClassroom = async (classroom) => {
  const { students, ...rest } = classroom;
  const doc = await ClassroomModel.create(rest);
  if (students && students.length) {
    let existingStudents = await UserModel.distinct("_id", {
      "_id": { $in: students },
      "role": "STUDENT",
      "school": rest.school,
    });
    if (students.length === existingStudents.length) {
      const updated = await ClassroomModel.updateOne({ _id: doc._id }, { $set: { students } });
      if (updated.modifiedCount) doc.students = students
    }
  }

  return doc;
};

module.exports = {
  createClassroom,
};
