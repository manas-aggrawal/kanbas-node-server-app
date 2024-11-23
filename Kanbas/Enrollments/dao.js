import Database from "../Database/index.js";
export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  console.log("in the dao ");
  enrollments.push({ _id: Date.now(), user: userId, course: courseId });
  return enrollments;
}

export function unenrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  const updatedEnrollments = enrollments.filter((enrollment) => enrollment.user!== userId || enrollment.course!== courseId);
  console.log("in the dao unenroll");
  Database.enrollments = updatedEnrollments;
  return enrollments;
}

export function findAllEnrollments() {
  // retrieve all enrollments from the database
  console.log("Retrieving all enrollments...", Database.enrollments);
  return Database.enrollments;
}