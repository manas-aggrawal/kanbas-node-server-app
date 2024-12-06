import model from "./model.js";

export async function findCoursesForUser(userId) {
  const enrollments = await model.find({ user: userId }).populate("course");
  return enrollments.map((enrollment) => enrollment.course);
}

export async function findUsersForCourse(courseId) {
  try {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.map((enrollment) => enrollment.user);
  } catch (err) {
    throw new Error(`${err}`);
  }
}
export function enrollUserInCourse(user, course) {
  return model.create({ user, course });
}
export async function unenrollUserFromCourse(user, course) {
  const data = await model.deleteOne({ user, course });
  return data;
}