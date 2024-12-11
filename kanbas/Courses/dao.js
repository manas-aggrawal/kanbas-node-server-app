import model from "./model.js";
import enrollmentsModel from "../Enrollments/model.js";

function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export function findAllCourses() {
  return model.find();
}

export async function findCoursesForEnrolledUser(userId) {
  const enrollments = await enrollmentsModel
    .find({ user: userId })
    .populate("course")
    .populate("user");

  const enrolledCourses = enrollments.map((en) => en.course);

  return enrolledCourses;
}
export function createCourse(course) {
  // delete course._id;
  return model.create({ ...course, _id: generateRandomString(10) });
}
export function deleteCourse(courseId) {
  return model.deleteOne({ _id: courseId });
}

export function updateCourse(courseId, courseUpdates) {
  return model.updateOne({ _id: courseId }, { $set: courseUpdates });
}
