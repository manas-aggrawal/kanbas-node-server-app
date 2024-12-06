import model from "./model.js";

function generateId() {
  const length = Math.floor(Math.random() * 3) + 5; // Random length between 5 and 7
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";

  for (let i = 0; i < length; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  console.log("🚀 ~ generateId ~ id:", id);
  return id;
}

export async function findAssignmentsForCourse(courseId) {
  const assignments = await model.find();
  return assignments.filter((assignment) => assignment.course === courseId);
}

export async function createAssignment(assignment) {
  const _id = assignment?._id?.trim() || generateId();
  const newAssignment = await model.create({
    ...assignment, // Include other fields
    _id,
    course: assignment?.course, // Set the course field
  });

  return newAssignment;
}

export async function updateAssignment(
  assignmentId,
  courseId,
  assignmentUpdates
) {
  const assignment = await model.findOneAndUpdate(
    {
      _id: assignmentId, // Filter by assignmentId
      course: courseId, // Filter by courseId
    },
    {
      $set: {
        ...assignmentUpdates, // Fields to update
      },
    },
    {
      newDocument: true, // Return the updated document
      upsert: true, // Perform upsert (insert if no document matches)
      runValidators: true, // Validate the document against the schema
    }
  );
  console.log("🚀 ~ assignment:", assignment);

  return assignment;
}

export async function deleteAssignment(courseId, assignmentId) {
  return model.deleteOne({
    course: courseId, // Use dot notation for nested fields
    _id: assignmentId,
  });
}