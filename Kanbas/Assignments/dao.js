import Database from "../Database/index.js";

export function findAssignmentsForCourse(courseId) {
  const { assignments } = Database;
  return assignments.filter((assignment) => assignment.course === courseId);
}
export function createAssignment(assignment) {
  const newAssignment = { ...assignment, _id: Date.now().toString() };
  Database.assignments = [...Database.assignments, newAssignment];

  return newAssignment;
}

export function updateAssignment(assignmentId, courseId, assignmentUpdates) {
  const { assignments } = Database;
  const assignment = assignments.find(
    (assignment) =>
      assignment._id === assignmentId && assignment.course === courseId
  );
  if (!assignment) {
    createAssignment(assignmentUpdates);
  }
  Object.assign(assignment, assignmentUpdates);
  return assignment;
}

export function deleteAssignment(courseId, assignmentId) {
  const { assignments } = Database;
  Database.assignments = assignments.filter(
    (assignment) =>
      assignment._id !== assignmentId && courseId === assignment.course
  );
  return Database.assignments;
}