import * as assignmentsDao from "./dao.js";

export default function AssignmentRoutes(app) {
  // Update assignment
  app.put("/api/assignments/:assignmentId", async (req, res) => {
    const { assignmentId } = req.params;
    const assignmentUpdates = req.body;
    const status = await assignmentsDao.updateAssignment(assignmentId, assignmentUpdates);
    res.send(status);
  });

  // Delete assignment
  app.delete("/api/assignments/:assignmentId", async (req, res) => {
    const { assignmentId } = req.params;
    const status = await assignmentsDao.deleteAssignment(assignmentId);
    res.send(status);
  });

  // Create assignment
  // app.post("/api/assignments", async (req, res) => {
  //   const assignment = req.body;
  //   const newAssignment = await assignmentsDao.createAssignment(assignment);
  //   res.status(201).send(newAssignment);
  // });

  // Retrieve assignments for a specific course
  // app.get("/api/assignments/:courseId", async (req, res) => {
  //   const { courseId } = req.params;
  //   const assignments = await assignmentsDao.findAssignmentsForCourse(courseId);
  //   res.send(assignments);
  // });

}
