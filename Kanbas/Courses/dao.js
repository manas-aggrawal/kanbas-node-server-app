import model from "./model.js";
import enrollmentsModel from "../Enrollments/model.js";

function generateId() {
  const length = Math.floor(Math.random() * 3) + 5; // Random length between 5 and 7
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";

  for (let i = 0; i < length; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return id;
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
  return model.create({ ...course, _id: generateId() });
}
export function deleteCourse(courseId) {
  return model.deleteOne({ _id: courseId });
}

export function updateCourse(courseId, courseUpdates) {
  return model.updateOne({ _id: courseId }, { $set: courseUpdates });
}
