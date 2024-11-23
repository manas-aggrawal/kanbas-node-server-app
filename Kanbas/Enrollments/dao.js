import Database from "../Database/index.js";

export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;

  // Check if the user is already enrolled in the course
  const existingEnrollment = enrollments.find(
    (enrollment) => enrollment.user === userId && enrollment.course === courseId
  );

  if (existingEnrollment) {
    throw new Error("User is already enrolled in this course.");
  }

  // Add a new enrollment
  const newEnrollment = { _id: Date.now(), user: userId, course: courseId };
  enrollments.push(newEnrollment);
  return newEnrollment;
}

export function unenrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;

  // Find the enrollment index
  const enrollmentIndex = enrollments.findIndex(
    (enrollment) => enrollment.user === userId && enrollment.course === courseId
  );

  if (enrollmentIndex === -1) {
    throw new Error("Enrollment not found.");
  }

  // Remove the enrollment
  const [removedEnrollment] = enrollments.splice(enrollmentIndex, 1);
  return removedEnrollment;
}

export function findEnrollmentsByUser(userId) {
  const { enrollments } = Database;

  // Filter enrollments for the user
  return enrollments.filter((enrollment) => enrollment.user === userId);
}

export function findAllEnrollments() {
  const { enrollments } = Database;
  return enrollments;
}
